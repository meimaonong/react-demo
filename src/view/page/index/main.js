
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import Home from './component/home'
import About from './component/about'

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
    <Router>
      <div>

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />

      </div>
    </Router>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('app'))