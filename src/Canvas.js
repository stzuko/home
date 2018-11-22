import React from 'react'

export default class Canvas extends React.Component {

	constructor(){
		super();
		this.state = {
			context:null,
			top_:0,
			left:0,
			x: 0,
			y: 0,
		}
		this.ctx = React.createRef();
		this.prepctx = this.prepctx.bind(this);
		this.resizectx = this.resizectx.bind(this);
	}

	componentDidMount() {
    		window.addEventListener('load', this.prepctx);
		window.addEventListener('resize',this.resizectx);
 	}

	resizectx(){
		let rect = this.ctx.current.getBoundingClientRect();
                this.setState({top_:rect.top,left:rect.left});
	}
	
	prepctx() {
		this.resizectx();
		let temp = this.ctx.current.getContext("2d");
		this.setState({context:temp});
	}
	
	draw(e) {
		if (e.buttons !== 1) return; // if mouse is pressed.....
		this.state.context.beginPath(); // begin the drawing path
		this.state.context.lineWidth = 30; // width of line
		this.state.context.lineCap = "round"; // rounded end cap
		this.state.context.strokeStyle = '#ffffff'; // hex color of line
		this.state.context.moveTo(this.state.x, this.state.y); // from position
		this.setPosition(e);
		this.state.context.lineTo(this.state.x, this.state.y); // to position
		this.state.context.stroke(); // draw it!
	}
	
	setPosition(e) {
		this.setState({x:e.clientX-this.state.left,y:e.clientY-this.state.top_});
	}

	loadCanvas() {
		let raw = this.state.context.getImageData(0,0,280,280);
		console.log(raw);
	}
	
	render() {
		return (
			<div className='container elegant-color-dark'>
				<div className="row">
					<div className="col">				
						<canvas id="drawable" width={280} height={280} ref={this.ctx} onMouseMove={this.draw.bind(this)} onMouseDown={this.setPosition.bind(this)} onMouseEnter={this.setPosition.bind(this)}></canvas>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<button onClick={this.loadCanvas.bind(this)}>Submit</button>
					</div>
				</div>
			</div>
		) 
	}
}
