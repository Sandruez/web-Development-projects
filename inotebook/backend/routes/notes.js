const express = require("express");
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//Route1:Get All the Notes  using Get "/api/notes/getuser". login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server Error ");
    }
 
});

//Router2:Add a new note using post "/api/notes/addnote". login required
router.post(
  "/addnote",
  fetchuser,
  [
    //express_validations
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //if there are errors,return BAd request and the errors
    try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
      const { title, description, tag } = req.body;
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
        console.log(error.message);
      res.status(500).send("Internal server Error ");
    }
  }
);
//Router3:Update an existing note using put "/api/notes/updatenote". login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
        const { title, description, tag } = req.body;
        //Create a newNote ooject
     let newNote={};
     if(title){newNote.title=title}
     if(description){newNote.description=description}
     if(tag){newNote.tag=tag}
       
     //find the note to be updated and update it
     let note=await Notes.findById(req.params.id)
     if(!note){return res.status(404).send("Not Found")}
      //this is for security purpose
     if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
     }

      note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
      res.json(note)
    })

    //Router4:Deleting an existing note using delete "/api/notes/deletenote". login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  
try {
  //find the note to delet it
let note=await Notes.findById(req.params.id)
if(!note){return res.status(404).send("Not Found")}
//this is for security purpose
if(note.user.toString()!==req.user.id){
  return res.status(401).send("Not Allowed");
}

note=await Notes.findByIdAndDelete(req.params.id)
res.json({"success":"note has been deeleted"})
} catch (error) {
  console.log(error.message);
  res.status(500).send("Internal server Error ");
}

})

module.exports = router;
