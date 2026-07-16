const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const addBtn = document.getElementById("addBtn");
const searchInput = document.getElementById("search");
const notesContainer = document.getElementById("notesContainer");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editingId = null;
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

    if (editingId !== null) {

        const note = notes.find(n => n.id === editingId);

        note.title = title;
        note.content = content;

        editingId = null;

        addBtn.textContent = "Add Note";

    } else {

        notes.push({
            id: Date.now(),
            title,
            content
        });

    }

    saveNotes();

    renderNotes(searchInput.value);

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

    titleInput.value = note.title;
    contentInput.value = note.content;

    editingId = note.id;

    addBtn.textContent = "Update Note";

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
