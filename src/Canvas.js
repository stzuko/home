import React from 'react'
import Tensor from './Tensor'

export default class Canvas extends React.Component {

	constructor(){
		super();
		this.state = {
			data:null,
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

	clearCanvas(){
		this.state.context.clearRect(0, 0, 280,280);
	}

	loadCanvas() {
		let raw = this.state.context.getImageData(0,0,280,280).data;
		// courtesy https://stackoverflow.com/a/29862266/10571336
		let data1 = Array.prototype.slice.call(raw);
		// courtesy https://stackoverflow.com/a/33483070/10571336
		let data2 = data1.filter(function(val,i,Arr) {
			return i % 4 == 0;
		})
		let data3 = data2.map(x => x==0? x : 1);
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
		ret = Uint8ClampedArray.from(ret);
		return ret;	
	}
	
	submitData() {
		console.log("submitting data");
		let data = this.loadCanvas();
		this.setState({data:data});
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
						<button onClick={this.clearCanvas.bind(this)}>Clear</button>
						<button onClick={this.submitData.bind(this)}>Submit</button>
					</div>
				</div>
				<div className="row">
					<Tensor data={this.state.data}/>
				</div>
			</div>
		) 
	}
}
