import Note from "../models/Note.js";

export async function getAllNotes(_, res) { //If you are not using req anywhere in the code then put _
    try {
        const notes = await Note.find().sort({createdAt: -1}) // -1 will sort in the des order
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error in the getAllNotes Controller ", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) return res.status(404).json({ message: "Note not found" })
        
        res.status(200).json(note)
    } catch (error) {
        console.error("Error in the getNoteById Controller ", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body
        const note = new Note({ title: title, content: content })
        
        const savedNote = await note.save()
        res.status(201).json(savedNote)
    } catch (error) {
        console.error("Error in the createNotes Controller ", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, {new: true})
        if (!updatedNote) return res.status(404).json({message: "Note not found"})

        res.status(200).json(updatedNote)
    } catch (error) {
        console.error("Error in the updateNotes Controller ", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function deleteNote(req, res) {
    try {
        const deleteNote = await Note.findByIdAndDelete(req.params.id)
        if (!deleteNote) return res.status(404).json({ message: "Note not found" })
        
        res.status(200).json({message: "Note deleted successfully"})
    } catch (error) {
        console.error("Error in the deleteNotes Controller ", error)
        res.status(500).json({ message: "Internal server error" })
    }
}
