import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState=(props)=>{
  const host="http://localhost:5000"
  const notesInitial=[];
  const [notes,setNotes]=useState(notesInitial);
   
  //Get All Notes 
  const getNotes= async( )=>{
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5YWYwNzYzOWVjZDRhNDNhYTk2ZjBhIn0sImlhdCI6MTY4Nzg3NTcyNn0.6Moz6k3Bx2jO2XZ4hAVbph3BzvbOeujm91qfbRa2DCk"
      },
     
    });
    const json=await  response.json()
    console.log(json)
    setNotes(json)
  }

  //Add a note 
 const addNote= async( title,description,tag)=>{
  //API Call
  const response = await fetch(`${host}/api/notes/addnote`, {
    method: "POST",
    
    headers: {
      "Content-Type": "application/json",
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5YWYwNzYzOWVjZDRhNDNhYTk2ZjBhIn0sImlhdCI6MTY4Nzg3NTcyNn0.6Moz6k3Bx2jO2XZ4hAVbph3BzvbOeujm91qfbRa2DCk"
    },
   
    body: JSON.stringify({title,description,tag})
  });
 


    const note={"_id": "649c2806cd8f6c8bb1d1ceedfe8",
    "user": "649af07639ecd4a43aa96f0a",
    "title": title,
    "description":description ,
    "tage": tag,
    "date": "2023-06-28T12:31:02.473Z",
    "__v": 0};
    setNotes(notes.concat(note)) 
   } 
  
  //Delete a Note
const deletNote=async(id)=>{
    console.log("deleting note  with id"+id)
   const newNotes=notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes);

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5YWYwNzYzOWVjZDRhNDNhYTk2ZjBhIn0sImlhdCI6MTY4Nzg3NTcyNn0.6Moz6k3Bx2jO2XZ4hAVbph3BzvbOeujm91qfbRa2DCk"
      },
     
     
    });
    const json= response.json()
    console.log(json)
   } 

  //Edit a note
  const editNote= async(id,title,description,tag)=>{
    //API Call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "POST",
        
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5YWYwNzYzOWVjZDRhNDNhYTk2ZjBhIn0sImlhdCI6MTY4Nzg3NTcyNn0.6Moz6k3Bx2jO2XZ4hAVbph3BzvbOeujm91qfbRa2DCk"
        },
       
        body: JSON.stringify({title,description,tag})
      });
      const json= response.json(); 
    

    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if(element._id==id){
         element.title=title;
         element.description=description;
         element.tag=tag;
      }
    }
  }
  
return(
   <NoteContext.Provider value={{notes,addNote,deletNote,editNote,getNotes}}>
      {props.children}   
   </NoteContext.Provider>
)

}

export default NoteState;