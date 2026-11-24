const mongoose = require("mongoose");

const NotebookSchema = new mongoose.Schema({
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        title:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
            default:""
        },
        lastVisitedAt:{
            type:Date,
            default:null
        },
        totalEntries: {
        type: Number,
        default: 0,
        min: 0
        }   
    },
    {
        timestamps:true
    }

);

const Notebook = mongoose.model("Notebook",NotebookSchema);

module.exports=Notebook;