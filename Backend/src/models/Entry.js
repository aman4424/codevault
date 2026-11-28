const mongoose=require('mongoose');

// problem details Schema

const problemDetailsSchema= new mongoose.Schema({
    platform:{
        type:String,
        trim:true
    },
    problemUrl:{
        type:String,
        trim:true
    },
    externalProblemId:{
        type:String,
        trim:true
    },
    difficulty:{
        type:String,
        trim:true
    },
    rating:{
        type:Number,
        min:0
    },
    solvedAt:{
        type:Date 
    },
    solutionLanguage:{
        type:String,
        trim:true
    },
    trigger: { type: String, trim: true },
    mistake: { type: String, trim: true },
    keyInsight: { type: String, trim: true },
    pattern: { type: String, trim: true },
    revisionNote: { type: String, trim: true }
    },
{
    _id:false
});

// Resource Schema
const resourceDetailsSchema = new mongoose.Schema({
    url: {
        type: String,
        trim: true
    },
    platform: {
        type: String,
        trim: true
    },
    resourceType: {
        type: String,
        enum: [
            'video',
            'article',
            'documentation',
            'course',
            'repository',
            'other'
        ]
    }
}, {
    _id: false
});

// Embedded attachment schema
const  attachmentSchema= new mongoose.Schema({
    fileName:{
        type:String,
        required:true,
        trim:true
    },
    mimeType:{
        type:String,
        required:true,
        trim:true 
    },
    size:{
        type:Number,
        required:true,
        min:0
    },
    storageKey:{
        type:String,
        required:true,
        trim:true 
    },
    uploadedAt:{
        type:Date,
        default:Date.now 
    }
});

const EntrySchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    notebook:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Notebook",
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        default:"",
        trim:true,

    },
    content:{
        type:String,
        default:"",
        trim:true
    },
    contentFormat:{
        type:String,
        default:"markdown",
        required:true,
        enum:['markdown']
    },
    kind:{
        type:String,
        enum:['note','problem','resource'],
        required:true
    },
    tags:{
        type:[{type:mongoose.Schema.Types.ObjectId,ref:"Tag"}],
        default:[]
    },
    isFavorite:{
        type:Boolean,
        default:false 
    },
    attachments:{
        type:[attachmentSchema],
        default:[]
    },
    problemDetails:{
        type:problemDetailsSchema,
        default:undefined,
        required: function (){
            return this.kind==="problem";
        }
    },
    resourceDetails: {
    type: resourceDetailsSchema,
    default: undefined,
    required: function () {
        return this.kind === 'resource';
        }
    }

},
{
    timestamps:true ,
    minimize:false
}

);
const Entry=mongoose.model("Entry",EntrySchema);
module.exports=Entry;