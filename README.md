# QuickNotes

QuickNotes is a note-taking web app built with HTML, CSS and JavaScript. You can add short notes with a category, search them, delete them, and your notes are saved in the browser so they are still there after a refresh.

## Features

- Add notes with a category: Personal, Work or Study
- Validation: empty notes and notes over 200 characters show an error
- Delete any note
- Live search, not case-sensitive
- Note count that handles zero, one and many notes
- Notes saved with localStorage
- Responsive layout for phones

## How to run locally

1. Clone the repository: `git clone https://github.com/YOUR-USERNAME/quicknotes-app.git`
2. Open the `quicknotes-app` folder in VS Code.
3. Right-click `index.html` and choose **Open with Live Server**, or open `index.html` directly in your browser.

## What I learned

- How to build the note list from an array using `createElement` and `textContent`, and why that is safer than `innerHTML` for user text.
- How to save and load data with `localStorage`, `JSON.stringify` and `JSON.parse`, so notes survive a refresh.
- How to use Flexbox for the form and a media query to stack it on small screens.
- How to make small Git commits at each stage and push them to GitHub.

