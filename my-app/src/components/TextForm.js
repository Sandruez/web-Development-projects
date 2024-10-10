
import React , {useState} from 'react';
 
export default function TextForm(props) {
const handleUpClick =()=>{
  let NewText=text.toUpperCase();
  setText(NewText);
}

const handleLoClick =()=>{
    let NewText=text.toLowerCase();
    setText(NewText);
  }

const handleOnChange=(event)=>{
 setText(event.target.value);
}

const [text,setText]=useState("");

  return (
    <>
    <div>
        <h1>{props.heading}</h1>
      <div className="mb-3" >
  <textarea className="form-control" value={text} onChange={handleOnChange} id="my-box"  rows="8"  ></textarea>
</div>
  <button className="btn btn-primary mx-2" onClick={handleUpClick}>convert to uppercase</button>
  <button className="btn btn-primary mx-2" onClick={handleLoClick}>convert to Lowercase</button>
    </div>
    <div className="container">
        <h2>Your Text summary</h2>
        <p>{text.split(" ").length} Words and {text.length} characters </p>
        <h2>preview</h2>
        <p>{text}</p>
        
    </div>
  </>
  )
}
