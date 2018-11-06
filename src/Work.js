import React from 'react'

export default class Work extends React.Component {
	
	constructor() {
		super();
		this.state = {
			jobs: [
				{'id': 0, 'title':'Full Stack Developer', 'project':'LobbyView Database','link':'https://www.lobbyview.org','img':'lobbyview.png','desc':''},
				{'id': 1, 'title':'Open Source Developer', 'project':'Color Commons Installation','link':'http://www.newamericanpublicart.com/color-commons-2017','img':'ccommons.png','desc':''},
				{'id': 2, 'title':null, 'project':'Neural Network','link':'https://github.com/stzuko/neural-network','img':'nn.png','desc':''},
				{'id': 3, 'title':null, 'project':'Classifier Comparison','link':'https://github.com/stzuko/IBK-v-J48','img':'knn.png','desc':''},
				{'id': 4, 'title':null, 'project':'Universal Machine','link':'https://github.com/stzuko/universal-machine','img':'um.png','desc':''},
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

export default class SingleJob extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: false;	
		}
	}
			
	toggleCollapse(){
		this.setState({expanded: (this.state.expanded? false : true)})
	}
			
	render() {
	  return (
		<div className='container elegant-color-dark'>
		  <Image src={this.props.job.img} />
		  <Title title={this.props.job.title} project={this.props.job.project} />
		  <button onClick={this.toggleCollapse.bind(this)}>Click me</button>
		  {expanded && <Collapsible text={this.props.job.desc} link={this.props.job.link} />}
		</div>
	  );
	}
}

function Title(props){
  return (
    <div className="container">
      <div className="row text-center">
        <div className="col">
          <h1>{props.title}</h1>
        </div>
      </div>
      <div className="row text-center">
        <div className="col">
          <h2>{props.project}</h2>
        </div>
      </div>
    </div>
  )
}

function Image(props){
  return (
	  <div className='container img-container'>
	  	<img src={window.location.origin + props.path} alt="related image" className="work-img"/>
	  </div>
  )
}

// Needs link
function Collapsible(props){
  return (
    <div className="container">
      <div className="row text-center">
        <div className="col">
          {props.desc}
        </div>
      </div>
    </div>
  )
}
