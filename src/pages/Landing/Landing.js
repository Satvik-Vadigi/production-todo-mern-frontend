import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../../assets/images/hero.jpg'
import './Landing.css'

const Landing = () => {
  return (
    <div className="hero">
      <div className='intro-text'>
        <h1>
          <span className='tagline1'>Organize work and life</span> <br />
          <span className='tagline2'>Finally</span>
        </h1>
        <p>
          type just into the task field and Todolist <br />
          on-of-its-kind natural language recognition will instantly fill your to-do list
        </p>
        <Link className='btn red' to='/register'>Register Now!</Link>
        <Link className='btn blue' to='/login'>Login here!</Link> 
      </div>
      <div className='hero-image'>
        <img src={Hero} alt="Hero-Image" width={"100%"} height={515}/>
      </div>
    </div>
  )
}

export default Landing
