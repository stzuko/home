import React from 'react'

const Work = () => (
  <AllJobs />
)

var Jobs = [
	{'src':{'text':{'role':'Full Stack Developer','project':'LobbyView','org':'MIT Dept Political Science','desc':'xxx'},'img':{'path':'/img/work/lobbyview.png','alt':'screenshot of index page of www.lobbyview.org'}},'id':0},
	{'src':{'text':{'role':'Open Source Developer','project':'Color Commons','org':'New American Public Art','desc':'xxx'},'img':{'path':'/img/work/ccommons.png','alt':'screenshot of color commons page at www.newamericanpublicart.com'}},'id':1},
	{'src':{'text':{'role':'A','project':'B','org':'','desc':'C'},'img':{'path':'/img/work/nn.png','alt':'a bar graph showing performance of a neural network'}},'id':2},
	{'src':{'text':{'role':'A','project':'B','org':'','desc':'C'},'img':{'path':'/img/work/knn.png','alt':'a bar graph showing performance of two ML classifiers'}},'id':3},
	{'src':{'text':{'role':'A','project':'B','org':'','desc':'C'},'img':{'path':'/img/work/um.png','alt':'a screenshot of a readme for the UM code'}},'id':4},
];

function AllJobs(){
  let built = [];
  for (let i=0;i<5;i++){
    built.push(<SingleJob props={Jobs[i]['src']} key={Jobs[i]['id']} />);
  }
  return <div className='container elegant-color-dark'>{built}</div>
}

function SingleJob(props){
  console.log(props.key);
  return (
    <div className='container elegant-color-dark'>
      <Title role={props.props.text.role} project={props.props.text.project} org={props.props.text.org} />
      <Image path={props.props.img.path} alt={props.props.img.alt} />
      <Collapsible desc={props.props.text.desc} /> 
    </div>
  )
}

function Title(props){
  return (
    <div className="container">
      <div className="row text-center">
        <div className="col">
          <h1>{props.role}</h1>
        </div>
      </div>
      <div className="row text-center">
        <div className="col">
          <h2>{props.project}</h2>
        </div>
      </div>
      <div className="row text-center">
        <div className="col">
          <h3>{props.org}</h3>
        </div>
      </div>
    </div>
  )
}

function Image(props){
  return <img src={props.path} alt={props.alt} className="work-img"/>
}

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

export default Work
