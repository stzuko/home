import React from 'react'

export default class Tensor extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			raw:null,
		}
	}

	componentWillReceiveProps(nextProps){
		if (this.state.raw==nextProps.data) return;
		console.log("update");
		this.setState({raw:nextProps.data});
	}	

        render() {
		return (<h1>Results</h1>)
	}
}
