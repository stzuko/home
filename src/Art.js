import React from 'react'

export default class Art extends React.Component {
	constructor(){
		super();
		this.state = {
			art: [
				{'src':'0000.jpg','alt':''},
				{'src':'0001.jpg','alt':''},
				{'src':'0002.jpg','alt':''}, 
				{'src':'0003.jpg','alt':''},
				{'src':'0004.jpg','alt':''},
				{'src':'0005.jpg','alt':''},
				{'src':'0006.jpg','alt':''},
				{'src':'0007.jpg','alt':''},
				{'src':'0008.jpg','alt':''},
			]
		}
	}

	render() {	
		return (
		<art>
    		<div className='container elegant-color-dark'>
      			Coming Soon
    		</div>
  		</art>
		);
	}
}
