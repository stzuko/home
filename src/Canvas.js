import React from 'react'
import Tensor from './Tensor'
import { loadCanvas } from './CanvasHelpers'

export default class Canvas extends React.Component {

	constructor(){
		super();
		this.state = {
			train:[],
			test_raw:null,
			test_label: null,
			test_tensorx: null,
			test_tensory: null,
			model:null,
			canvas_context: null,
			c_x0:null,
			c_y0:null,
			c_x1:null,
			c_y1:null,
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
		this.setState({canvas_context:newcontext});
	}
	
	resizectx = () => {
		let rect = this.ctx.current.getBoundingClientRect();
        this.setState({c_y0:rect.top,c_x0:rect.left});
	}
		
	setPosition = (e) => { this.setState({c_x1:(e.clientX-this.state.c_x0),c_y1:(e.clientY-this.state.c_y0)}); }

	clearCanvas = () => { this.state.canvas_context.clearRect(0, 0, 280,280); }

	saveLabel = (e) => { this.setState({test_label:e.target.value}); }
	
	draw = (e) => {
		if (e.buttons !== 1) return; // if mouse is pressed.....
		this.state.canvas_context.beginPath(); // begin the drawing path
		this.state.canvas_context.lineWidth = 30; // width of line
		this.state.canvas_context.lineCap = "round"; // rounded end cap
		this.state.canvas_context.strokeStyle = '#ffffff'; // hex color of line
		this.state.canvas_context.moveTo(this.state.c_x1, this.state.c_y1); // from position
		this.setPosition(e);
		this.state.canvas_context.lineTo(this.state.c_x1, this.state.c_y1); // to position
		this.state.canvas_context.stroke(); // draw it!
	}
	
	submitData = () => {
		if (this.state.test_label==null || this.state.test_label=='') alert("Please identify your digit before submitting");
		const temp = loadCanvas(this.state.canvas_context.getImageData(0,0,280,280).data);
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
