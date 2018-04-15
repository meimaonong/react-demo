/**
 * App 主框架组件
 */

import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return <div>App</div>
  }

}

ReactDOM.render(<App />, document.getElementById('app'))