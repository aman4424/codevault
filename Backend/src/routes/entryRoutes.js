const express=require('express');
const router=express.Router({mergeParams:true});
const entryController=require('../controllers/entryController');

router.get('/',entryController.getEntries);
router.get('/:entryID',entryController.getEntry);
router.post('/',entryController.createEntry);
router.patch('/:entryID',entryController.updateEntry);
router.delete('/:entryID',entryController.deleteEntry);

module.exports=router;
