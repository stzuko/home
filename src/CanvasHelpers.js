import * as tf from '@tensorflow/tfjs';

export function loadCanvas(raw) {
	// 1; Converts typed array to regular array
	// courtesy https://stackoverflow.com/a/29862266/10571336
	let data1 = Array.prototype.slice.call(raw);
	// 2; Converts the image to single-value number per pixel (assumption: r,g,b,a are all EQ)
	// courtesy https://stackoverflow.com/a/33483070/10571336
	let data2 = data1.filter(function(val,i,Arr) { return i % 4 == 0; })
	// 3; Converts 256/0 to 1/0
	let data3 = data2.map(x => x==0? x : 1);
	// 4; Takes 10x10 chunks of the corresponding image, adds them up, then decides if compressed result is 1/0
	let rows = [];
	let ret = [];
	while (data3.length>0) { rows.push(data3.splice(0,280)); }
	while (rows.length>0) {
	  let strip = rows.splice(0,10);
	  let chunks = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	  for (let j=0;j<10;j++) {
		for (let i=0;i<28;i++) {
		  let seg = strip[j].splice(0,10);
		  let sum = seg.reduce((a,b)=>a+b,0);
		  chunks[i] += sum;			
		}
	  }
	  chunks = chunks.map(x => x>=50? 1:0);
	  ret = ret.concat(chunks);
	}	
	//ret = Uint8ClampedArray.from(ret);
	ret = Uint8Array.from(ret);
	return ret;	
}

export function createConvModel() {
	const model = tf.sequential();
	model.add(tf.layers.conv2d({
		inputShape: [28, 28, 1],
		kernelSize: 3,
		filters: 16,
		activation: 'relu'
	}));
	model.add(tf.layers.maxPooling2d({poolSize: 2, strides: 2}));
	model.add(tf.layers.conv2d({kernelSize: 3, filters: 32, activation: 'relu'}));
  	model.add(tf.layers.maxPooling2d({poolSize: 2, strides: 2}));
  	model.add(tf.layers.conv2d({kernelSize: 3, filters: 32, activation: 'relu'}));
	model.add(tf.layers.flatten({}));
	model.add(tf.layers.dense({units: 64, activation: 'relu'}));
	model.add(tf.layers.dense({units: 10, activation: 'softmax'}));
  	return model;
}

export function runModelTrain(model,images,labels) {
	let batchSize = 1;
	model.compile({
		optimizer: 'rmsprop',
		loss: 'categoricalCrossentropy',
		metrics: ['accuracy'],
 	});	
	model.fit(images, labels, { batchSize:1 }).then( ()=> {
		console.log("fitted");
	});
	
}

convertLabel(pos){
	let raw = [0,0,0,0,0,0,0,0,0,0];
	raw[pos] = 1;
	return raw;
}
	
