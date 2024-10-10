import React from 'react'
import { useContext,useEffect } from 'react'
import NoteContext from '../Contex/notes/noteContext'



const About = () => {
  const a = useContext(NoteContext)

 //useEffect(()=>{
 // a.update();
 //},[])

  return (
    <div>
         this is About n class 
    </div>
  )
}

export default About;
