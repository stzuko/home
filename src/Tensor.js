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
		if (this.state.raw==nextProps.data) return;
		console.log("update");
		this.state.raw = nextProps.data
		//this.state.pred = nextProps.pred
		this.runLoader();
	}
	
	runLoader() {
		let xs = tf.tensor4d(this.state.raw,[1,28,28,1]);
		//let ys = tf.tensor1d(
	}	

        render() {
		return (<h1>Results</h1>)
	}
}
