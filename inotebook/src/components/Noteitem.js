import React from 'react'
import NoteContext from "../Contex/notes/noteContext";
import { useContext } from 'react';

const Noteitem = (props) => {
  const context = useContext(NoteContext);
  const {deletNote}=context; 
const {note,updateNote}=props;
  return (
    <>
    <div className="col-md-3 ">
      <div className="card my-2 mx-2 " >
     <div className="card-body">
   <div className="d-flex align-items-center"> 
    <h5 className="card-title">{note.title}</h5>
   <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deletNote(note._id)}} ></i>
    <i className="fa fa-edit mx-2" onClick={()=>{updateNote(note)}} ></i>
    </div>
    <p className="card-text"> {note.description}</p>
  </div>
</div>
    </div>
    </>
  )
}

export default Noteitem
