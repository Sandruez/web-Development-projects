
import { useContext, useEffect  } from "react";
import NoteContext from "../Contex/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNotes from "./AddNote";
import { useRef } from "react";



const Notes = () => {
    const context = useContext(NoteContext);
   const {notes,getNotes}=context; 
   useEffect(()=>{
    getNotes();
   },[])

   const myref=useRef(null);
   
   const updateNote=(note)=>{
     myref.current.click();
     console.log("you are in")
    }
    
    return (
      <>
      
      <AddNotes/>
<button ref={myref} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
  Launch demo modal
</button>


<div  className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>


    <div className="row my-3">
      <h2>Your Notes</h2>
      {notes.map((note)=>{
        return <Noteitem key={note._id} note={note} updateNote={updateNote}/> 
      })}
      </div>
      </>
  )
}

export default Notes
