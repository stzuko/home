import React from 'react'
import Tensor from './Tensor'
import { loadCanvas } from './CanvasHelpers'

export default class Canvas extends React.Component {

	constructor(){
		super();
		this.state = {
			train:[],
			test: {
				raw: null,
				label: null,
				tensorx: null,
				tensory: null,
			},
			model:{},
			canvas:{
				context: null,
				x0:null,
				y0:null,
				x1:null,
				y1:null,	
			},
			result: {},
		}
		this.ctx = React.createRef();
	}

	componentDidMount() {
	    this.prepctx();
		window.addEventListener('resize',this.resizectx);
 	}

	prepctx = () => {
		this.resizectx();
		let newcontext = this.ctx.current.getContext("2d");
		this.setState({canvas.context:newcontext});
	}
	
	resizectx = () => {
		let rect = this.ctx.current.getBoundingClientRect();
        this.setState({canvas.y0:rect.top,canvas.x0:rect.left});
	}
		
	setPosition = (e) => { this.setState({canvas.x1:(e.clientX-this.state.canvas.x0),canvas.y1:(e.clientY-this.state.canvas.y0)}); }

	clearCanvas = () => { this.state.canvas.context.clearRect(0, 0, 280,280); }

	saveLabel = (e) => { this.setState({test.label:e.target.value}); }
	
	draw = (e) => {
		if (e.buttons !== 1) return; // if mouse is pressed.....
		this.state.canvas.context.beginPath(); // begin the drawing path
		this.state.canvas.context.lineWidth = 30; // width of line
		this.state.canvas.context.lineCap = "round"; // rounded end cap
		this.state.canvas.context.strokeStyle = '#ffffff'; // hex color of line
		this.state.canvas.context.moveTo(this.state.canvas.x1, this.state.canvas.y1); // from position
		this.setPosition(e);
		this.state.canvas.context.lineTo(this.state.canvas.x1, this.state.canvas.y1); // to position
		this.state.canvas.context.stroke(); // draw it!
	}
	
	submitData = () => {
		if (this.state.test.label==null || this.state.test.label=='') alert("Please identify your digit before submitting");
		const temp = loadCanvas(this.state.canvas.context.getImageData(0,0,280,280).data);
		console.log(temp);
	}

	render() {
		return (
			<div className='container elegant-color-dark'>
				<div className="row">
					<div className="col text-center">				
						<canvas 
							id="drawable"
							width={280} height={280} 
							ref={this.ctx} 
							onMouseMove={this.draw}
							onMouseDown={this.setPosition}
							onMouseEnter={this.setPosition}
						></canvas>
					</div>
				</div>
				<div className="row">
					<div className="col text-center">
						<input type="text" onChange={this.saveLabel} />
						<button onClick={this.clearCanvas}>Clear</button>
						<button onClick={this.submitData}>Submit</button>
					</div>
				</div>
				<div className="row">
				</div>
			</div>
		) 
	}
}
