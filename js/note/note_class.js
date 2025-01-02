class Note {
    constructor(noteId, title, date) {
        this.noteId = noteId;
        this.title = title;
        this.date = date;
    }
}

export class NoteManager {
    // Seed data
    constructor() {
        this.notes = [
            new Note(1, "Danny's Note", "[ 08/08/2002 | 11:00:00 PM ]"),
            new Note(2, "Someone's Note", "[ 08/08/2003 | 11:00:00 PM ]"),
        ]
    }

    async loadNoteContent(noteId) {
        try {
            const Note = noteManager.getNoteById(noteId);
            if (Note == null) throw new Error(`This noteId doesn't exist, Note ID: ${noteId}`);

            // Load Template
            const response = await fetch(`../../data_storage/note/noteId_${Note.noteId}.html`)
            let noteTemplate = await response.text();

            // Replace Template >> To pass in value into template
            noteTemplate = noteTemplate.replace('${noteId}', Note.noteId)
                .replace('${title}', Note.title)
                .replace('${date}', Note.date);
            
                return noteTemplate;

            } catch (error) {
            console.error(`Error: loadNoteContent() >> ${error}`)
            throw error;
        }
    }

    getAllNotes() {
        return this.notes;
    }

    getNoteById(noteId) {
        noteId = parseInt(noteId);
        if (noteId == NaN) {
            console.error(`invalid ${noteId}`);
        }
        return this.notes.find(note => note.noteId === noteId);
    }

    getNoteTitle(noteId) {
        const note = this.notes.find(note => note.noteId === noteId);
        return note ? note.title : null;
    }

    getNoteDate(noteId) {
        const note = this.notes.find(note => note.noteId === noteId);
        return note ? note.date : null;
    }
}

// Testing Purpose
const noteManager = new NoteManager();
// noteManager.loadNoteContent(1)

