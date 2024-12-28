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
            <div style="padding: 3em 4em;" contenteditable="false">
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
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas minima labore consequatur, tempora quos suscipit. Doloremque pariatur nemo accusantium iste nostrum deleniti consectetur, sequi harum laudantium totam? Eaque, cum perferendis.
        Facere quod incidunt nesciunt fugit nobis ab sint atque, unde eum sapiente dolor eos voluptatibus! Voluptas quo autem laborum doloremque ea! Enim cum ullam quod odit modi ducimus natus. Eius.
        Sequi veritatis architecto omnis? Cum odio, fuga voluptatibus saepe, quaerat accusamus dicta dolorum commodi earum, quo velit perspiciatis natus aliquam itaque rem sapiente? Officiis quibusdam veniam reprehenderit eum! Corporis, nisi!
        Obcaecati modi impedit asperiores dignissimos a quidem beatae debitis accusantium minus dolor qui corporis aperiam unde, doloremque ipsam molestiae cupiditate in, deleniti distinctio illum aliquid voluptates iure cumque? Ullam, expedita!
        Iure beatae doloremque adipisci perferendis explicabo nam id nobis ad incidunt. Ipsam impedit asperiores corrupti possimus veritatis perferendis, dolor saepe voluptas magnam blanditiis, distinctio, consectetur qui laudantium natus earum! Eius.
</p>
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