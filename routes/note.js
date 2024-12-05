const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.post('/', jwtMiddleware, noteController.createNote);
router.get('/getnotes',jwtMiddleware, noteController.getNotesById);
router.put('/:id', jwtMiddleware, noteController.updateNote);
router.delete('/:id', jwtMiddleware, noteController.deleteNote);

module.exports = router;
