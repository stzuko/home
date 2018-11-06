import React from 'react'

export default class SingleJob extends React.Component {
        constructor(props) {
                super(props);
                this.state = {
                        expanded: false
                }
        }

        toggleCollapse(){
                this.setState({expanded: (this.state.expanded? false : true)})
        }

        render() {
          return (
                <div className='container elegant-color-dark text-center'>
                  <Image src={this.props.job.img} />
                  <Title title={this.props.job.title} project={this.props.job.project} />
                  <button onClick={this.toggleCollapse.bind(this)}>Click me</button>
                  {this.state.expanded && <Collapsible text={this.props.job.desc} link={this.props.job.link} />}
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
                <img src={'/img/work/' + props.src} alt="related image" className="work-img"/>
          </div>
  )
}

// Needs link
function Collapsible(props){
  return (
    <div className="container">
      <div className="row text-center">
        <div className="col">
          <a href={props.link}><i class="fas fa-link"></i></a>
	  <hr />
          {props.text}
        </div>
      </div>
    </div>
  )
}
