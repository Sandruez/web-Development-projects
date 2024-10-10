import React, { Component } from 'react'
import spinner from './Ispinner.gif'
export class spinnerLoad extends Component {
  render() {
    return (
      <div className='text-center'>
        <img className='my-2' src={spinner} alt="spinnerLoading" />
      </div>
    )
  }
}

export default spinnerLoad
