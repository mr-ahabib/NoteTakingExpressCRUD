const Note = require('../models/note');


//create note
exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = await Note.create({ title, content, userId: req.userId });
    res.status(201).json({ message: 'Note created successfully', note });
  } catch (err) {
    res.status(500).json({ message: 'Error creating note', error: err });
  }
};


//get note
exports.getNotesById = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.userId } });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const notes = await Note.findAll({ where: { userId: user.id } });

    if (notes.length === 0) {
      return res.status(404).json({ message: 'No notes found for this user' });
    }

    res.status(200).json({ message: 'Notes fetched successfully', notes });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notes', error: err });
  }
};
  
//update
exports.updateNote = async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.findOne({ where: { id: req.params.id, userId: req.userId } });

  if (!note) return res.status(404).json({ message: 'Note not found' });

  note.title = title || note.title;
  note.content = content || note.content;

  await note.save();
  res.status(200).json({ message: 'Note updated successfully', note });
};


//delete
exports.deleteNote = async (req, res) => {
  const note = await Note.findOne({ where: { id: req.params.id, userId: req.userId } });

  if (!note) return res.status(404).json({ message: 'Note not found' });

  await note.destroy();
  res.status(200).json({ message: 'Note deleted successfully' });
};
