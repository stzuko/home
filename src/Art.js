import React from 'react'

export default class Art extends React.Component {
	constructor(){
		super();
		this.state = {
			art: 27,
			pos: 27
		}
	}

	componentDidMount() {
		for (let i=this.state.art;i>0;i--) {
			const img = document.createElement('img');
			img.src = this.createValidLink(i);
		}
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
      			<div className='row button-span'>
					<button onClick={this.showPrev.bind(this)} className="show-more">
						<i className="fas fa-caret-left"></i>
					</button>
					<button onClick={this.showNext.bind(this)} className="show-more">
						<i className="fas fa-caret-right"></i>
					</button>	
				</div>
				<div className='row'>
					<img src={this.createValidLink(this.state.pos)} className='art-img'></img>
    			</div>
			</div>
		);
	}
}
