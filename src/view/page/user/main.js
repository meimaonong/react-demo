
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return <div>User</div>
  }

}

ReactDOM.render(<App />, document.getElementById('app'))