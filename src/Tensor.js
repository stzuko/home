import React from 'react'
import * as tf from '@tensorflow/tfjs';

export default class Tensor extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			raw:null,
			pred:null,
		}
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
		let test = {xs,ys};
		//let model = createModel();
	}	

        render() {
		return (<h1>Results</h1>)
	}
}
