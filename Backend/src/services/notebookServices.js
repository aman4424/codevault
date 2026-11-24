const Notebook=require('../models/Notebook');



const validateText=(title,value)=>{
    if(typeof title!=='string'||title.trim().length===0){
        const error=new Error(`Please enter a valid ${value}.`); 
        error.status=400;
        throw error; 
    }
    if(title.trim().length>50){
        const error=new Error(`${value} should not be more than 50 characters long.`);
        error.status=400;
        throw error;
    }
}



const getNotebooks= async (notebookData)=>{
    const {
        userID,
        search="",
        sortBy="",
        order="desc",
        page="",
        limit=""}=notebookData;
        // filter
        const filter={user:userID};
        // key word searching 
       if (search.trim()) {
            const escapedSearch = search.trim().replace(
                /[.*+?^${}()|[\]\\]/g,
                '\\$&'
            );

            filter.title = {
                $regex: escapedSearch,
                $options: "i"
            };
       }
        //sorting and ordering 
        const allowedSortFields = [
    'createdAt',
    'updatedAt',
    'lastVisitedAt',
    'title'
];
        const field=allowedSortFields.includes(sortBy)?sortBy:'lastVisitedAt';
        const sortOptions={
            [field]:order==='asc'?1:-1,
            _id:-1
        }
        // skip
        const currentPage = Math.max(1, Number(page) || 1);
        const pageSize = Math.min(50, Math.max(1, Number(limit) || 10));

        const skip=(currentPage-1)*pageSize;
        
        
            const [notebooks,total]=await Promise.all([
                Notebook.find(filter).sort(sortOptions).skip(skip).limit(pageSize),
                Notebook.countDocuments(filter)]
            );
            return{
                notebooks,
                pagination:{
                    total,
                    page:currentPage,
                    limit:pageSize,
                    totalPages:Math.ceil(total/pageSize)
                }
            }
        
}



const createNotebook =async(notebookData)=>{
    const {data,userID}=notebookData;
   validateText(data.title,"title");
    const titleOfNotebook=data.title.trim();
    
    
    const notebookObject={
        user:userID,
        title:titleOfNotebook,
        description:data.description||"",
        lastVisitedAt:null
    }
    const notebook =await Notebook.create(notebookObject);
    return {
        notebook:notebook,
        message:"Notebook Created Successfully."
    }
}


const updateNotebook= async (notebookData)=>{
    const {notebookID,userID,updates}=notebookData;

    const notebookQuery=await Notebook.findOne({_id:notebookID,user:userID});
    if(!notebookQuery){
        const error= new Error("Notebook does not exist.");
        error.status=404;
        throw error;
    }
    const {
        title,
        description,
        lastVisitedAt
    }=updates;
    const updateField={};
     if (title !== undefined) {
        validateText(title, "title");
        updateField.title = title.trim();
    }

    if (description !== undefined) {
        if (typeof description !== "string") {
            const error = new Error("Description must be a string.");
            error.status = 400;
            throw error;
        }

        if (description.length > 300) {
            const error = new Error("Description cannot exceed 300 characters.");
            error.status = 400;
            throw error;
        }

        updateField.description = description.trim();
    }
    if(lastVisitedAt!==undefined){
        updateField.lastVisitedAt=lastVisitedAt;
    }
    if(Object.keys(updateField).length===0){
        const error=new Error("No valid fields provided for update.");
        error.status=400;
        throw error;
    }
    const notebook=await Notebook.findOneAndUpdate({
        user:userID,
        _id:notebookID
    },
    {$set:updateField},
    {
        returnDocument:"after",
        runValidators:true
    }
    );
    return {
        notebook,
        message:"Notebook Updated Successfully"
    }
}

const updateLastVisited=async (notebookData)=>{
    const{notebookID,userID}=notebookData;
    const notebookQuery=await Notebook.findOne({_id:notebookID,user:userID});
    if(!notebookQuery){
        const error= new Error("Notebook does not exist.");
        error.status=404;
        throw error;
    }
    const notebook=await Notebook.findOneAndUpdate({
        user:userID,
        _id:notebookID
    },
    {
        lastVisitedAt:new Date()
    },
    {
       returnDocument:"after",
       runValidators:true 
    }
    )
    return {
        notebook,
        message:"lastVisitedAt updated successfully"
    }

}

const deleteNotebook=async (notebookData)=>{
    const{notebookID,userID}=notebookData;
     const notebookQuery=await Notebook.findOne({_id:notebookID,user:userID});
    if(!notebookQuery){
        const error= new Error("Notebook does not exist.");
        error.status=404;
        throw error;
    }
    const result =await Notebook.findOneAndDelete({user:userID,_id:notebookID});
    return {
        result,
        message:"notebook deleted successfully"
    }

}


module.exports={
    getNotebooks,
    createNotebook,
    updateNotebook,
    updateLastVisited,
    deleteNotebook
}