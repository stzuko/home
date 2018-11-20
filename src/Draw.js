import React from 'react'

export default class Draw extends React.Component {
	
	constructor(){
		super();
		this.state = {}
	}
	
	render() {
		this.renderCanvas();
		return (
			<draw>
				<div className='container elegant-color-dark'>
      				<div className="row">
						<Canvas />
					</div>
				</div>
			</draw>
		)
	}
}
