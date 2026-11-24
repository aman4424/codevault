const notebookServices =require('../services/notebookServices');
const getNotebooks=async (req,res)=>{
    try {
        const { search, sortBy, order, page, limit } = req.query;
        const result = await notebookServices.getNotebooks({
            userID:req.user.userId,
            search,
            sortBy,
            order,
            page,
            limit
        });
        return res.status(200).json(result);        
    } catch (error) {
        return res.status(error.status||500).json({message:error.message||"Internal Server Error",});
    }
}
// const getNotebook=async (req,res)=>{
//     try {
//         const result = await notebookServices.getNotebook({
//             notebookID:req.params.notebookID,
//             userID:req.user._id
//         });
//         return res.status(200).json(result);        
//     } catch (error) {
//         return res.status(error.status||500).json({message:error.message||"Internal Server Error",});
//     }
// }
const createNotebook=async (req,res)=>{
    try {
        const result = await notebookServices.createNotebook({
            data:req.body,
            userID:req.user.userId,
            
        });
        return res.status(201).json(result);        
    } catch (error) {
        return res.status(error.status||500).json({message:error.message||"Internal Server Error",});
    }
}
const updateNotebook=async (req,res)=>{
    try {
        const result = await notebookServices.updateNotebook({
            notebookID: req.params.notebookID,
            userID: req.user.userId,
            updates: req.body
        });

        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.status||500).json({message:error.message||"Internal Server Error",});
    }
}
const deleteNotebook=async (req,res)=>{
    try {
        const result = await notebookServices.deleteNotebook({
            notebookID:req.params.notebookID,
            userID:req.user.userId
        });
        return res.status(200).json(result);        
    } catch (error) {
        return res.status(error.status||500).json({message:error.message||"Internal Server Error",});
    }
}
const updateLastVisited=async (req,res)=>{
    try {
        const result = await notebookServices.updateLastVisited({
            notebookID:req.params.notebookID,
            userID:req.user.userId
        });
        return res.status(200).json(result);        
    } catch (error) {
        return res.status(error.status||500).json({message:error.message||"Internal Server Error",});
    }
}


module.exports={
    getNotebooks,
    // getNotebook,
    createNotebook,
    updateNotebook,
    deleteNotebook,
    updateLastVisited
}