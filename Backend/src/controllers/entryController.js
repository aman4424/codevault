const entryServices=require('../services/entryServices');
const getEntries=async(req,res)=>{
    try {
        const { search, sortBy, order, page, limit} = req.query;
        
        const response= await entryServices.getEntries({
            search, sortBy, order, page, limit,
            userID:req.user.userId,
            notebookID:req.params.notebookID
        });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(error.status||500).json({message:error.message||"Internal Server Error",});
    }
}
const getEntry=async(req,res)=>{
    try {
        
        const response= await entryServices.getEntry({
            userID:req.user.userId,
            notebookID:req.params.notebookID,
            entryID:req.params.entryID
        });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(error.status||500).json({message:error.message||"Internal Server Error",});
    }
}
const updateEntry=async(req,res)=>{
    try {
        
        const response= await entryServices.updateEntry({
            userID:req.user.userId,
            notebookID:req.params.notebookID,
            entryID:req.params.entryID,
            updates:req.body
        });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(error.status||500).json({message:error.message||"Internal Server Error",});
    }
}
const createEntry=async(req,res)=>{
    try {
        const response= await entryServices.createEntry({
            userID:req.user.userId,
            notebookID:req.params.notebookID,
            data:req.body
        });
        return res.status(201).json(response);
    } catch (error) {
        return res.status(error.status||500).json({message:error.message||"Internal Server Error",});
    }
}
const deleteEntry=async(req,res)=>{
    try {
        const response= await entryServices.deleteEntry({
            userID:req.user.userId,
            notebookID:req.params.notebookID,
            entryID:req.params.entryID
        });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(error.status||500).json({message:error.message||"Internal Server Error",});
    }
}

module.exports={
    getEntries,getEntry,createEntry,updateEntry,deleteEntry
}