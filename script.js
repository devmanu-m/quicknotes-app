// ---------- Select elements ----------
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

const MAX_CHARS = 200;
let notes = loadNotes();

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
  const saved = localStorage.getItem("notes");
  if (saved === null) {
    return [];
  }
  try {
    return JSON.parse(saved);
  } catch (error) {
    return [];
  }
}

// ---------- Build one note card (textContent only, never innerHTML) ----------
function createNoteCard(note) {
  const li = document.createElement("li");
  li.classList.add("note", "category-" + note.category);

  const text = document.createElement("p");
  text.classList.add("note-text");
  text.textContent = note.text;

  const meta = document.createElement("p");
  meta.classList.add("note-meta");

  const label = document.createElement("span");
  label.classList.add("category-label");
  label.textContent =
    note.category.charAt(0).toUpperCase() + note.category.slice(1);

  const date = document.createElement("span");
  date.textContent = note.createdAt;

  meta.append(label, date);

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
    deleteNote(note.id);
  });

  li.append(text, meta, deleteBtn);
  return li;
}

// ---------- Rebuild the whole list from the array ----------
function render() {
  notesList.textContent = "";
  for (const note of notes) {
    notesList.appendChild(createNoteCard(note));
  }
  updateCount();
}

function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

function deleteNote(id) {
  notes = notes.filter(function (note) {
    return note.id !== id;
  });
  saveNotes();
  render();
}

// ---------- Add a note ----------
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }
  if (text.length > MAX_CHARS) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  const note = {
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.unshift(note); 
  saveNotes();
  noteInput.value = "";
  function render() {
  const search = searchInput.value.trim().toLowerCase();
  const visibleNotes = notes.filter(function (note) {
    return note.text.toLowerCase().includes(search);
  });

  notesList.textContent = "";

  if (visibleNotes.length === 0 && search !== "") {
    const empty = document.createElement("li");
    empty.classList.add("empty-message");
    empty.textContent = "No notes match your search.";
    notesList.appendChild(empty);
  }

  for (const note of visibleNotes) {
    notesList.appendChild(createNoteCard(note));
  }
  updateCount();
}
});
searchInput.addEventListener("input", render);
render();