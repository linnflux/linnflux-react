import React from 'react'

/*
export default React.createClass({
  render() {
    return <div>Home</div>
  }
})
*/

class Home extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      test: "default"
    }
  }

  render(){
    return (
      <div className="center page">
        <h2>Cahaba Center</h2>
        <h4>Employee Portal</h4>
        <div className="featuring">
          <h3>featuring...</h3>
          <p><i className="material-icons">trending_flat</i><span> Flux</span></p>
          <p><i className="material-icons">trending_flat</i><span> Materialize</span></p>
          <p><i className="material-icons">trending_flat</i><span> MySQL</span></p>
          <p><i className="material-icons">trending_flat</i><span> Node</span></p>
          <p><i className="material-icons">trending_flat</i><span> PHP</span></p>
          <p><i className="material-icons">trending_flat</i><span> React</span></p>
          <p><i className="material-icons">trending_flat</i><span> React-Router</span></p>
          <p><i className="material-icons">trending_flat</i><span> SASS</span></p>
          <p><i className="material-icons">trending_flat</i><span> Webpack</span></p>
        </div>
      </div>
    )
  }
}

export default Home