const express= require("express");
const router=express.Router();
const verifyToken=require("../middleware/verifyToken")
const notebookController =require("../controllers/notebookController")

router.use(verifyToken);

router.get('/',notebookController.getNotebooks);
// router.get('/:notebookID',notebookController.getNotebook);
router.post('/',notebookController.createNotebook);
router.patch('/:notebookID',notebookController.updateNotebook);
router.patch('/:notebookID/visit',notebookController.updateLastVisited);
router.delete('/:notebookID',notebookController.deleteNotebook);

module.exports=router;