import React from 'react'

export default class Art extends React.Component {
	constructor(){
		super();
		this.state = {
			art: 29,
			pos: 29,
			carousel: null,
		}
	}

	componentDidMount() {
		let list = [];
		for (let i=this.state.art;i>0;i--) {
			const img = document.createElement('img');
			img.src = this.createValidLink(i);
			let panel = (<div className="art-wrapper"><a href={this.createValidLink(i)} target="_blank"><img src={this.createValidLink(i)}></img></a></div>);
			list.push(panel);
		}
		this.state.carousel = list;
	}
	
	createValidLink(str){
		return '/img/art/' + ('0000'+str).slice(-4) + '.jpg';	
	}

	showNext(){
		if (this.state.pos>1) {
			this.setState({pos:this.state.pos-1});
		} else { // Pos is at 1; reset to top
			this.setState({pos:27});
		}
	}

	showPrev(){
		if (this.state.pos<this.state.art){
			this.setState({pos:this.state.pos+1});
		} else { // Pos is at highest, reset to 1st
			this.setState({pos:1});
		}
	}

	render() {	
		this.componentDidMount();
		return ( 
    		<div className='container elegant-color-dark'>
                <div className='row'>
                    <div id="carousel-wrapper" className='col text-center'>
						{this.state.carousel}                        
                    </div>
                </div>
                <div className='row'>
                    <div className='col text-center'>
                        Click to expand image
                    </div>
                </div>
			</div>
		);
	}
}
