import React from 'react'

export default class Canvas extends React.Component {

	constructor(){
		super();
		this.state = {
			ctx:null,
			x: 0,
			y: 0
		}
	}
	
	prepctx() {
		let temp = document.getElementById("drawable");
		temp = temp.getContext("2d");
		this.setState({ctx:temp});
	}
	
	draw(e) {
		if (e.buttons !== 1) return; // if mouse is pressed.....

		this.state.ctx.beginPath(); // begin the drawing path
		this.state.ctx.lineWidth = 20; // width of line
		this.state.ctx.lineCap = "round"; // rounded end cap
		this.state.ctx.strokeStyle = '#000000'; // hex color of line
		this.state.ctx.moveTo(this.state.x, this.state.y); // from position
		this.setPosition(e);
		this.state.ctx.lineTo(this.state.x, this.state.y); // to position
		this.state.ctx.stroke(); // draw it!
	}
	
	setPosition(e) {
		this.setState({x:e.clientX,y:e.clientY});
	}
	
	render() {
		this.prepctx();
		return (
			<canvas id="drawable" onMouseMove={this.draw.bind(this)} onMouseDown={this.setPosition.bind(this)} onMouseEnter={this.setPosition.bind(this)}></canvas>
		) 
	}
}
