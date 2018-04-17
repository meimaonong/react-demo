import React from 'react'
import ReactDOM from 'react-dom'

class About extends React.Component {

  constructor(props) {
    super(props)

    // this.handleClick = this.handleClick.bind(this)

    this.state = {

      list: [
        {
          name: 'qcc',
          money: 20000000000
        },
        {
          name: 'qdd',
          money: 20000000000
        }
      ],

      
    }
  }

  handleClick(e) {
    console.log(e)

    console.log(this.state.list)
  }

  render() {
    return (
      <ul>
        {
          this.state.list.map((item, i) => (
            <li key={i}>
              <div onClick={(e)=>this.handleClick(e)}>{item.name}</div>
              <div>{item.money}</div>
            </li>
          ))
        }
      </ul>
    )
  }

}

export default About