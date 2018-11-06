import React from 'react'
import SingleJob from './SingleJob'

export default class Work extends React.Component {
	
	constructor() {
		super();
		this.state = {
			jobs: [
				{'id': 0, 'title':'Full Stack Developer', 'project':'LobbyView Database','link':'https://www.lobbyview.org','img':'lobbyview.png','desc':['A','B','C']},
				{'id': 1, 'title':'Open Source Developer', 'project':'Color Commons Installation','link':'http://www.newamericanpublicart.com/color-commons-2017','img':'ccommons.png','desc':[]},
				{'id': 2, 'title':null, 'project':'Neural Network','link':'https://github.com/stzuko/neural-network','img':'nn.png','desc':[]},
				{'id': 3, 'title':null, 'project':'Classifier Comparison','link':'https://github.com/stzuko/IBK-v-J48','img':'knn.png','desc':[]},
				{'id': 4, 'title':null, 'project':'Universal Machine','link':'https://github.com/stzuko/universal-machine','img':'um.png','desc':[]},
			]
		}
	}
	
	render() {		
		let built = [];
		for (let i=0;i<5;i++){
			built.push(<SingleJob job={this.state.jobs[i]} key={this.state.jobs[i]['id']} />);
		}
		return <div className='container elegant-color-dark'>{built}</div>
	}
}
