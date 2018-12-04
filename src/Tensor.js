import React from 'react'
import * as tf from '@tensorflow/tfjs';

// This is a helper class for loading and managing MNIST data specifically.
// It is a useful example of how you could create your own data manager class
// for arbitrary data though. It's worth a look :)
import {IMAGE_H, IMAGE_W, MnistData} from './data';

// This is a helper class for drawing loss graphs and MNIST images to the
// window. For the purposes of understanding the machine learning bits, you can
// largely ignore it
import * as ui from './ui';

export default class Tensor extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dataloaded:null,
			data:null,
			raw:null,
			pred:null,
		}
	}
	
	componentWillMount(){
		this.state.dataloaded = false;
		this.loadTrainData().then((res)=>{
			this.state.data=res
			this.state.dataloaded = true;
                	console.log("CWM done");
		});
	}
	
	async loadTrainData() {
		let data = new MnistData();
                await data.load();
		return data;
	}
	
	componentWillReceiveProps(nextProps){
		if (nextProps.data==null) return;
		if (this.state.raw==nextProps.data) return;
		this.state.raw = nextProps.data
		this.state.pred = nextProps.label
		this.runLoader();
	}

	convertLabel(){
		let raw = [0,0,0,0,0,0,0,0,0,0];
		raw[this.state.pred] = 1;
		console.log(this.state.pred);
		console.log(raw);
		return raw;
	}
	
	runLoader() {
		let xs = tf.tensor4d(this.state.raw,[1,28,28,1]);
		let ys = tf.tensor2d(this.convertLabel(),[1,10]);
		let test = {xs:xs,ys:ys};
		let model = this.createModel();
		this.train(model,test).then(()=>console.log("Train done?"));
	}
	
	createModel(){
		// Create a sequential neural network model. tf.sequential provides an API
		// for creating "stacked" models where the output from one layer is used as
		// the input to the next layer.
		const model = tf.sequential();

		// The first layer of the convolutional neural network plays a dual role:
		// it is both the input layer of the neural network and a layer that performs
		// the first convolution operation on the input. It receives the 28x28 pixels
		// black and white images. This input layer uses 16 filters with a kernel size
		// of 5 pixels each. It uses a simple RELU activation function which pretty
		// much just looks like this: __/
		model.add(tf.layers.conv2d({
		inputShape: [28, 28, 1],
		kernelSize: 3,
		filters: 16,
		activation: 'relu'
		}));

		// After the first layer we include a MaxPooling layer. This acts as a sort of
		// downsampling using max values in a region instead of averaging.
		// https://www.quora.com/What-is-max-pooling-in-convolutional-neural-networks
		model.add(tf.layers.maxPooling2d({poolSize: 2, strides: 2}));

		// Our third layer is another convolution, this time with 32 filters.
		model.add(tf.layers.conv2d({kernelSize: 3, filters: 32, activation: 'relu'}));

		// Max pooling again.
		model.add(tf.layers.maxPooling2d({poolSize: 2, strides: 2}));

		// Add another conv2d layer.
		model.add(tf.layers.conv2d({kernelSize: 3, filters: 32, activation: 'relu'}));

		// Now we flatten the output from the 2D filters into a 1D vector to prepare
		// it for input into our last layer. This is common practice when feeding
		// higher dimensional data to a final classification output layer.
		model.add(tf.layers.flatten({}));

		model.add(tf.layers.dense({units: 64, activation: 'relu'}));

		// Our last layer is a dense layer which has 10 output units, one for each
		// output class (i.e. 0, 1, 2, 3, 4, 5, 6, 7, 8, 9). Here the classes actually
		// represent numbers, but it's the same idea if you had classes that
		// represented other entities like dogs and cats (two output classes: 0, 1).
		// We use the softmax function as the activation for the output layer as it
		// creates a probability distribution over our 10 classes so their output
		// values sum to 1.
		model.add(tf.layers.dense({units: 10, activation: 'softmax'}));

		return model;	
	}
	
	async train(model,testdata) {
		// Now that we've defined our model, we will define our optimizer. The
		// optimizer will be used to optimize our model's weight values during
		// training so that we can decrease our training loss and increase our
		// classification accuracy.

		// The learning rate defines the magnitude by which we update our weights each
		// training step. The higher the value, the faster our loss values converge,
		// but also the more likely we are to overshoot optimal parameters
		// when making an update. A learning rate that is too low will take too long
		// to find optimal (or good enough) weight parameters while a learning rate
		// that is too high may overshoot optimal parameters. Learning rate is one of
		// the most important hyperparameters to set correctly. Finding the right
		// value takes practice and is often best found empirically by trying many
		// values.
		const LEARNING_RATE = 0.01;

		// We are using rmsprop as our optimizer.
		// An optimizer is an iterative method for minimizing an loss function.
		// It tries to find the minimum of our loss function with respect to the
		// model's weight parameters.
		const optimizer = 'rmsprop';
		// We compile our model by specifying an optimizer, a loss function, and a
		// list of metrics that we will use for model evaluation. Here we're using a
		// categorical crossentropy loss, the standard choice for a multi-class
		// classification problem like MNIST digits.
		// The categorical crossentropy loss is differentiable and hence makes
		// model training possible. But it is not amenable to easy interpretation
		// by a human. This is why we include a "metric", namely accuracy, which is
		// simply a measure of how many of the examples are classified correctly.
		// This metric is not differentiable and hence cannot be used as the loss
		// function of the model.
		model.compile({
		optimizer,
		loss: 'categoricalCrossentropy',
		metrics: ['accuracy'],
		});
		// Batch size is another important hyperparameter. It defines the number of
		// examples we group together, or batch, between updates to the model's
		// weights during training. A value that is too low will update weights using
		// too few examples and will not generalize well. Larger batch sizes require
		// more memory resources and aren't guaranteed to perform better.
		const batchSize = 320;

		// Leave out the last 15% of the training data for validation, to monitor
		// overfitting during training.
		const validationSplit = 0.15;

		// Get number of training epochs from the UI.
		const trainEpochs = 3;

		// We'll keep a buffer of loss and accuracy values over time.
		let trainBatchCount = 0;

		const trainData = await this.state.data.getTrainData();
		
		const totalNumBatches = Math.ceil(trainData.xs.shape[0] * (1 - validationSplit) / batchSize) * trainEpochs;
		
		let valAcc;
		
		console.log("about to model fit");
		console.log(trainData.xs);
		await model.fit(trainData.xs, trainData.labels, {
			batchSize,
			validationSplit,
			epochs: trainEpochs,
			callbacks: {
      onBatchEnd: async (batch, logs) => {
        trainBatchCount++;
        await tf.nextFrame();
      },
      onEpochEnd: async (epoch, logs) => {
        valAcc = logs.val_acc;
        await tf.nextFrame();
      }
    }
		});
		console.log("train done");
		const testResult = model.evaluate(testdata.xs, testdata.ys);
		const testAccPercent = testResult[1].dataSync()[0] * 100;
		const finalValAccPercent = valAcc * 100;
		console.log(finalValAccPercent);
	}

        render() {
		return (<h1>Results: {this.state.dataloaded}</h1>)
	}
}
