const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const addBtn = document.getElementById("addBtn");
const searchInput = document.getElementById("search");
const notesContainer = document.getElementById("notesContainer");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

renderNotes();

addBtn.addEventListener("click", addNote);

searchInput.addEventListener("input", () => {
    renderNotes(searchInput.value);
});

function addNote() {

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (title === "" || content === "") {
        alert("Please enter a title and content.");
        return;
    }

    notes.push({
        id: Date.now(),
        title,
        content
    });

    saveNotes();

    renderNotes();

    titleInput.value = "";
    contentInput.value = "";

}

function renderNotes(search = "") {

    notesContainer.innerHTML = "";

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
    );

    filteredNotes.forEach(note => {

        const noteCard = document.createElement("div");

        noteCard.className = "note";

        noteCard.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>

            <div class="note-buttons">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        noteCard.querySelector(".edit-btn").addEventListener("click", () => {

            const newTitle = prompt("Edit title:", note.title);

            if (newTitle === null) return;

            const newContent = prompt("Edit content:", note.content);

            if (newContent === null) return;

            note.title = newTitle.trim();
            note.content = newContent.trim();

            saveNotes();
            renderNotes(searchInput.value);

        });

        noteCard.querySelector(".delete-btn").addEventListener("click", () => {

            notes = notes.filter(n => n.id !== note.id);

            saveNotes();

            renderNotes(searchInput.value);

        });

        notesContainer.appendChild(noteCard);

    });

}

function saveNotes() {

    localStorage.setItem("notes", JSON.stringify(notes));

}
