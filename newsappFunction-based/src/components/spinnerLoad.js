import React, { Component } from 'react'
import spinner from './Ispinner.gif'
const spinnerLoad=()=>{
 
    return (
      <div className='text-center'>
        <img className='my-2' src={spinner} alt="spinnerLoading" />
      </div>
    )
}

export default spinnerLoad
