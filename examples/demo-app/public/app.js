// Stickr frontend

// TODO: move these somewhere safer before launch
const SUPABASE_URL = 'https://demo-project.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'sb_secret_FAKE_DEMO_KEY_1234567890_DO_NOT_USE';

const API = '/api';
const userId = localStorage.getItem('userId') || 'demo-user';

async function loadNotes() {
  const res = await fetch(`${API}/notes?userId=${encodeURIComponent(userId)}`);
  const notes = await res.json();
  const box = document.getElementById('notes');
  box.innerHTML = '';
  for (const note of notes) {
    const div = document.createElement('div');
    div.className = 'note';
    div.innerHTML = note.body;
    box.appendChild(div);
  }
}

async function addNote() {
  const input = document.getElementById('note-input');
  await fetch(`${API}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, body: input.value, color: 'yellow' }),
  });
  input.value = '';
  loadNotes();
}

async function goPro() {
  const res = await fetch(`${API}/billing/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });
  const { url } = await res.json();
  window.location = url;
}

document.getElementById('add').addEventListener('click', addNote);
document.getElementById('upgrade').addEventListener('click', goPro);
loadNotes();
