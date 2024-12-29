class Note {
    constructor(noteId, title, date, contentURL, URL) {
        this.noteId = noteId;
        this.title = title;
        this.date = date;
        this.contentURL = contentURL;
        this.URL = URL
    }

    async loadNoteContent() {
        try {
            // Load Template
            const response = await fetch(`../../data_storage/note/noteId_${this.noteId}.html`)
            let template = await response.text();

            // Replace Template >> To pass in value into template
            template = template.replace('${noteId}', this.noteId)
                            .replace('${title}', this.title)
                            .replace('${date}', this.date)
        } catch (error) {
            
        }
    }
}


// TODO: Move the contentURL into an URL for better clarity
export class NoteManager {
    // Seed data    
    constructor() {
        this.notes = [
            new Note(1, "Danny's Note", "[ 08/08/2002 | 11:00:00 PM ]", `
                <div style="padding: 3em 4em;" contenteditable="false; font-size: var(--font-size-medium)">
                    <div style="font-family: var(--font-family-special); font-size: var(--font-size-medium);">
                        <h1>[ Danny's Note ]</h1>
                        <h2>[ 08/08/2002 | 11:00:00 PM ]</h2>
                        <hr>
                    </div>
                    <div>
                        <img src="../img/night.gif" alt="Image" style="object-fit: contain; width: 100%;">
                    </div>
                    <p>Original content here...</p>
                </div>
            `),
            new Note(2, "Someone's Else Note", "[ 08/08/2002 | 11:00:00 PM ]", `
                <div style="padding: 3em 4em;" contenteditable="false; font-size: var(--font-size-medium)">
                    <div style="font-family: var(--font-family-special); font-size: var(--font-size-medium);">
                        <h1>[ Someone's Else Note ]</h1>
                        <h2>[ 08/08/2002 | 11:00:00 PM ]</h2>
                        <hr>
                    </div>
                    <div>
                        <img src="../img/nature.gif" alt="Image" style="object-fit: contain; width: 100%;">
                    </div>
                </div>
            `),
            new Note(3, "Profile Picture", "[ 09/08/2002 | 12:00:00 PM ]", `
                <div style="padding: 3em 4em;" contenteditable="false; font-size: var(--font-size-medium)">
                    <div style="font-family: var(--font-family-special); font-size: var(--font-size-medium);">
                        <h1>[ Profile Picture ]</h1>
                        <h2>[ 09/08/2002 | 12:00:00 PM ]</h2>
                        <hr>
                    </div>
                    <div>
                        <img src="../img/Hewwo.png" alt="Image" style="object-fit: contain; width: 100%;">
                    </div>
                </div>
            `),
            new Note(4, "Background Image", "[ 10/08/2002 | 01:00:00 PM ]", `
                <div style="padding: 3em 4em;" contenteditable="false; font-size: var(--font-size-medium)">
                    <div style="font-family: var(--font-family-special); font-size: var(--font-size-medium);">
                        <h1>[ Background Image ]</h1>
                        <h2>[ 10/08/2002 | 01:00:00 PM ]</h2>
                        <hr>
                    </div>
                    <div>
                        <img src="../img/ferret_background.jpg" alt="Image" style="object-fit: contain; width: 100%;">
                    </div>
                </div>
            `),
            new Note(5, "Night View", "[ 11/08/2002 | 02:00:00 PM ]", `
                <div style="padding: 3em 4em;" contenteditable="false; font-size: var(--font-size-medium)">
                    <div style="font-family: var(--font-family-special); font-size: var(--font-size-medium);">
                        <h1>[ Night View ]</h1>
                        <h2>[ 11/08/2002 | 02:00:00 PM ]</h2>
                        <hr>
                    </div>
                    <div>
                        <img src="../img/night.gif" alt="Image" style="object-fit: contain; width: 100%;">
                    </div>
                </div>
            `),
            new Note(6, "Nature Scene", "[ 12/08/2002 | 03:00:00 PM ]", `
                <div style="padding: 3em 4em;" contenteditable="false; font-size: var(--font-size-medium)">
                    <div style="font-family: var(--font-family-special); font-size: var(--font-size-medium);">
                        <h1>[ Nature Scene ]</h1>
                        <h2>[ 12/08/2002 | 03:00:00 PM ]</h2>
                        <hr>
                    </div>
                    <div>
                        <img src="../img/nature.gif" alt="Image" style="object-fit: contain; width: 100%;">
                    </div>
                </div>
            `),
            new Note(7, "Profile Display", "[ 13/08/2002 | 04:00:00 PM ]", `
                <div style="padding: 3em 4em;" contenteditable="false; font-size: var(--font-size-medium)">
                    <div style="font-family: var(--font-family-special); font-size: var(--font-size-medium);">
                        <h1>[ Profile Display ]</h1>
                        <h2>[ 13/08/2002 | 04:00:00 PM ]</h2>
                        <hr>
                    </div>
                    <div>
                        <img src="../img/Hewwo.png" alt="Image" style="object-fit: contain; width: 100%;">
                    </div>
                </div>
            `),
            new Note(8, "Background View", "[ 14/08/2002 | 05:00:00 PM ]", `
                <div style="padding: 3em 4em;" contenteditable="false; font-size: var(--font-size-medium)">
                    <div style="font-family: var(--font-family-special); font-size: var(--font-size-medium);">
                        <h1>[ Background View ]</h1>
                        <h2>[ 14/08/2002 | 05:00:00 PM ]</h2>
                        <hr>
                    </div>
                    <div>
                        <img src="../img/ferret_background.jpg" alt="Image" style="object-fit: contain; width: 100%;">
                    </div>
                </div>
            `),
            new Note(9, "Evening Notes", "[ 15/08/2002 | 06:00:00 PM ]", `
                <div style="padding: 3em 4em;" contenteditable="false; font-size: var(--font-size-medium)">
                    <div style="font-family: var(--font-family-special); font-size: var(--font-size-medium);">
                        <h1>[ Evening Notes ]</h1>
                        <h2>[ 15/08/2002 | 06:00:00 PM ]</h2>
                        <hr>
                    </div>
                    <div>
                        <img src="../img/night.gif" alt="Image" style="object-fit: contain; width: 100%;">
                    </div>
                </div>
            `),
            new Note(10, "Natural Beauty", "[ 16/08/2002 | 07:00:00 PM ]", `
                <div style="padding: 3em 4em;" contenteditable="false; font-size: var(--font-size-medium)">
                    <div style="font-family: var(--font-family-special); font-size: var(--font-size-medium);">
                        <h1>[ Natural Beauty ]</h1>
                        <h2>[ 16/08/2002 | 07:00:00 PM ]</h2>
                        <hr>
                    </div>
                    <div>
                        <img src="../img/nature.gif" alt="Image" style="object-fit: contain; width: 100%;">
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
const note = new Note(1, "Test Title", "Test Date", "Test Content", "Test URL");
console.log(note.loadNoteContent());
