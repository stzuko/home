import React from 'react'

const Work = () => (
  <AllJobs />
)

var Jobs = [
	{'src':{'text':{'role':'A','workplace':'B','desc':'C'},'img':{'path':'A','alt':'B'}},'id':0},
	{'src':{'text':{'role':'A','workplace':'B','desc':'C'},'img':{'path':'A','alt':'B'}},'id':1},
	{'src':{'text':{'role':'A','workplace':'B','desc':'C'},'img':{'path':'A','alt':'B'}},'id':2},
	{'src':{'text':{'role':'A','workplace':'B','desc':'C'},'img':{'path':'A','alt':'B'}},'id':3},
	{'src':{'text':{'role':'A','workplace':'B','desc':'C'},'img':{'path':'A','alt':'B'}},'id':4},
];

function AllJobs(){
  let built = [];
  for (let i=0;i<5;i++){
    built.push(<SingleJob props={Jobs[i]['src']} key={Jobs[i]['id']} />);
  }
  return <div className='container elegant-color-dark'>{built}</div>
}

function SingleJob(props){
  return (
    <div className='container elegant-color-dark'>
      <Title role={props.props.text.role} workplace={props.props.text.workplace} />
      <Image path={props.props.text.path} alt={props.props.text.alt} />
      <Collapsible desc={props.props.text.desc} /> 
    </div>
  )
}

function Title(props){
  return (
    <div className="container">
      <div className="row text-center">
        <h1>{props.role}</h1>
      </div>
      <div className="row text-center">
        <h2>{props.workplace}</h2>
      </div>
    </div>
  )
}

function Image(props){
  return <img src={props.path} alt={props.alt} />
}

function Collapsible(props){
  return (
    <div className="container">
      {props.desc}
    </div>
  )
}

export default Work
