const mongoose=require('mongoose');
const mongoURI="mongodb+srv://root:root@atlascluster.lknrnmm.mongodb.net/";

const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Mongo Successfully");
    });
};

module.exports=connectToMongo;