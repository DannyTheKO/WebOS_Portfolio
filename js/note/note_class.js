class Note {
    constructor(noteId, title, date, contentURL) {
        this.noteId = noteId;
        this.title = title;
        this.date = date;
        this.contentURL = contentURL;
    }
}

export class NoteManager {
    // Seed data
    constructor() {
        this.notes = [
            new Note(1, "Danny's Note", "[ 08/08/2002 | 11:00:00 PM ]", `
            <div style="padding: 24px 4em;" contenteditable="false">
                <div style="
                    font-family: var(--font-family-special);
                    font-size: var(--font-size-medium);">
                    <h1>[ Danny's Note ]</h1>
                    <h2>[ 08/08/2002 | 11:00:00 PM ]</h2>
                    <hr>
                </div>
                <div>
                    <img src="../img/night.gif" alt="Image"
                    style="
                    object-fit: contain;
                    width: 100%;">
                </div>
                <p>Hi, this is a note</p>
            </div>
                `),
            new Note(2, "Someone's Else Note", "[ 08/08/2002 | 11:00:00 PM ]", `
            <div style="padding: 24px 4em;" contenteditable="false">
                <div style="
                    font-family: var(--font-family-special);
                    font-size: var(--font-size-medium);">
                    <h1>[ Someone's Else Note ]</h1>
                    <h2>[ 08/08/2002 | 11:00:00 PM ]</h2>
                    <hr>
                </div>
                <div>
                    <img src="../img/nature.gif" alt="Image"
                    style="
                    object-fit: contain;
                    width: 100%;">
                </div>
            </div>
                `)
        ];
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

    getNoteContent(noteId) {
        const note = this.notes.find(note => note.noteId === noteId);
        return note ? note.contentURL : null;
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