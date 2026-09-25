# BHONDU — an unfinished archive (J × B)

> *“Some things were never meant to fit inside a message.”*

A personal digital scrapbook and memory archive built specifically for **Bhondu**.

---

## 🌸 Overview & Technical Philosophy

This website is built with non-negotiable simplicity and paginated storytelling inspired by Bansi's site:
- **Pure HTML5, CSS3, and Vanilla JavaScript**
- **Step-by-step paginated journey** (each section is its own page/slide with smooth transitions)
- **Zero frameworks** (no React, Next.js, Vue, Vite, or npm dependencies)
- **Zero backend or database**
- **Zero trackers, ads, or analytics**
- **Direct GitHub Pages deployment** (just push and activate)

---

## 📁 File Structure

```text
BHONDU/
├── index.html                   # Core semantic markup & 11 sections
├── style.css                    # Complete scrapbook design system & responsive styling
├── script.js                    # Navigation, audio player, archive filtering, modals
├── BHONDU_WEBSITE_BUILD_SPEC.md # Full design and emotional specification
│
├── images/
│   ├── memories/                # Put your Beginning and Little Things photos here
│   ├── archive/                 # Put your Archive photos here (photo-01.webp, etc.)
│   ├── letters/                 # Scanned notes or letter images (optional)
│   └── general/                 # Dream Team sketches, special memories
│
├── audio/
│   ├── music.mp3                # Optional gentle ambient background music
│   ├── voice-01.mp3             # First voice note recording
│   └── voice-02.mp3             # Second voice note recording
│
└── assets/
    └── flowers/                 # Delicate pressed botanical SVGs (tulip, sunflower)
```

---

## 🛠️ How to Add Your Real Content

### 1. Adding Your Real Photographs
Just drop your photos directly into the `images/memories/` folder with these exact names (the website will detect them automatically):
- `images/memories/photo-1.jpg` → First memory / talk
- `images/memories/photo-2.jpg` → Second memory / first moment
- `images/memories/photo-3.jpg` → Third memory / unforgotten day
- `images/memories/photo-4.jpg` → Fourth memory / her smile
- `images/memories/lego.jpg` → **Your LEGO picture for Section 05 ("What Actually Hurt")**
- `images/memories/gift-1.jpg` → First thing/gift she gave you
- `images/memories/gift-2.jpg` → Second thing/gift she gave you

*(If any image is not added yet, the site gracefully shows an aesthetic placeholder instead of a broken image icon).*

### 2. Updating Dates & Memories
- Search for `[DATE]`, `[SHORT MEMORY]`, and `[TIME]` in `index.html` and replace with your real moments.
- Never feel pressured to add fake memories.

### 3. Adding Real Voice Notes
- Place your audio files inside `audio/`:
  - `audio/voice-01.mp3`
  - `audio/voice-02.mp3`
- The site automatically hooks up the play/pause button, progress scrubbing, and duration counters.
- Only one voice note plays at a time. Playing a voice note will politely pause background music.

### 4. Adding Ambient Music
- Place a soft piano or calm instrumental track at `audio/music.mp3`.
- The user can click the **`♪ OFF / ON`** button in the top right to start or pause it. (It will never autoplay unprompted).

### 5. Adding Letters
- Open `script.js` and modify or add entries to `ARCHIVE_ITEMS` with `category: 'letters'` and your personal letter text in `letterContent`.
- Clicking "Read Letter →" opens an overlay resembling a folded paper sheet.

---

## 🚀 How to Run Locally

You can preview the site immediately by simply double-clicking `index.html` in your file explorer.

Or run a local static server:
```bash
python -m http.server 8000
```
Then visit: `http://localhost:8000`

---

## 🌐 How to Deploy to GitHub Pages

1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for BHONDU archive"
   ```
2. Create a repository on GitHub (e.g. `bhondu`).
3. Link and push your repository:
   ```bash
   git remote add origin https://github.com/<your-username>/bhondu.git
   git branch -M main
   git push -u origin main
   ```
4. Go to **Repository Settings** > **Pages**:
   - Source: **Deploy from a branch**
   - Branch: **`main`** / Folder: **`/ (root)`**
   - Click **Save**.
5. Your archive will be live at `https://<your-username>.github.io/bhondu/`!
