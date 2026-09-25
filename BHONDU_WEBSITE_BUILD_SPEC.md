# BHONDU — Complete Website Build Specification

## 0. Project Directive

Build **BHONDU** as a personal static microsite for one specific person. It is not a commercial website, SaaS product, portfolio, or enterprise application.

### Non-negotiable technical stack

Use only:
- HTML
- CSS
- Vanilla JavaScript

Do not use React, Next.js, Vue, Angular, Vite, Node backend, database, authentication, API, CMS, analytics, SEO strategy, or unnecessary build tooling.

The site must deploy directly to GitHub Pages, like the previous `my-bhondu` project.

Priority order:
1. Emotional experience
2. Visual quality
3. Smooth interaction
4. Mobile experience
5. Simple maintainable code
6. Easy GitHub Pages deployment

The implementation should remain simple even though the visual experience is sophisticated.

---

# 1. Project Identity

**Website name:** BHONDU

**Subtitle:** an unfinished archive

**Secondary identity:** J × B

**Core sentence:**  
> Some things were never meant to fit inside a message.

The website should feel like a physical box of photographs, letters, notes, memories, voice recordings, plans, mistakes, and feelings translated into an interactive digital scrapbook.

It should feel personal, warm, nostalgic, mature, intimate, slightly imperfect, and quiet.

It must not feel like a generic Valentine's website, AI-generated romance template, breakup manipulation page, or commercial landing page.

Core philosophy:

> **It should feel discovered, not designed.**

---

# 2. Relationship to the Previous `my-bhondu` Project

The technical philosophy should resemble:

`https://jignesh007-code.github.io/my-bhondu/`

That project was a simple personal GitHub Pages experience.

Use the same approach:
- static files
- simple deployment
- local assets
- easy editing
- no backend
- no database
- no framework

BHONDU should simply have a more mature and story-driven visual language.

Think:

**my-bhondu technical simplicity + sophisticated scrapbook storytelling.**

---

# 3. Design Language

Translate a physical scrapbook into a digital experience.

Use:
- warm paper
- photographs
- paper edges
- subtle tape
- handwritten annotations
- slightly imperfect rotations
- faded photography
- tiny flower references
- paper shadows
- subtle film grain
- date stamps
- archive labels
- small metadata

Decorations must remain secondary to the memories.

Do not make every element animated or decorated.

---

# 4. Color System

```css
--paper: #F5F0E8;
--paper-light: #FAF7F1;
--blush: #E8C9CC;
--rose: #B9858C;
--ink: #171515;
--muted: #716B67;
--paper-line: rgba(23, 21, 21, 0.12);
```

Approximate balance:
- 60% warm cream
- 20% soft blush
- 15% charcoal/dark imagery
- 5% dusty rose accents

Pink is an accent, not the entire site.

Do not make it look like a Valentine's template.

---

# 5. Typography

Use three typefaces.

### Headings
**Cormorant Garamond**

Use for:
- BHONDU
- chapter titles
- emotional statements
- major headings

### Body
**Inter**

Use for:
- paragraphs
- buttons
- descriptions
- UI

### Metadata
**IBM Plex Mono**

Use for:
- dates
- timestamps
- archive IDs
- chapter numbers
- voice-note labels

Example:

```text
01 — THE BEGINNING
17 / 08 / 2026
VOICE NOTE 04
11:48 PM
```

Long text should have a readable maximum width, around 680px.

---

# 6. Complete Information Architecture

```text
00 — COVER
01 — THE BEGINNING
02 — THE LITTLE THINGS
03 — YOU BECAME HOME
04 — I KNOW I WASN'T PERFECT
05 — WHAT ACTUALLY HURT
06 — THE THINGS I NEVER WANTED
07 — THE ARCHIVE
08 — VOICE NOTES
09 — WHAT WE IMAGINED
10 — THE LAST PAGE
11 — BEFORE YOU GO...
```

Use normal scrolling rather than making every section a separate page.

---

# 7. Cover / Opening

Full viewport with a warm paper background and very subtle texture.

Center:

```text
BHONDU

an unfinished archive

J × B

Some things were never meant to fit inside a message.
```

Primary button:

```text
ENTER ARCHIVE →
```

Keep it minimal.

No giant hearts, heart particles, crying animations, or excessive cinematic effects.

Clicking the button should smoothly reveal Section 01.

---

# 8. Paper Texture

Use a very subtle paper texture.

Requirements:
- extremely low opacity
- must not hurt readability
- should resemble scanned paper
- no heavy noise

If an image texture is used, keep it lightweight.

---

# 9. Film Grain

Use subtle grain mainly on:
- photographs
- dark sections
- archive imagery

Do not make the entire UI look blurry or noisy.

---

# 10. Section 01 — The Beginning

Chapter label:

```text
01 — THE BEGINNING
```

Heading:

```text
Before it became anything.
```

Purpose:
- show the beginning of the story
- establish the scrapbook language
- introduce photographs and small memory fragments

Use:
- photos
- dates
- handwritten-style captions
- short memory fragments

Do not invent dates or memories.

Until real content is supplied, use placeholders:

```text
[PHOTO]
[DATE]
[SHORT MEMORY]
```

---

# 11. Scrapbook Photo System

Create multiple visual variations.

### Variation A — Polaroid
- cream/white border
- subtle shadow
- slight rotation
- caption below

### Variation B — Tape Photo
- image directly on paper
- small tape element
- slight rotation

### Variation C — Full Photo
- large image
- tiny date beneath

### Variation D — Small Memory Card
- small image
- short text
- archive metadata

### Variation E — Overlapping Photos
- two or three photos
- controlled overlap
- different slight rotations

Do not make the entire page chaotic.

Suggested rotations:

```css
rotate(-1.5deg)
rotate(1deg)
rotate(-0.7deg)
rotate(2deg)
```

---

# 12. Photo Captions

Captions should feel handwritten and personal.

Example format:

```text
17 / 08 / 2025

I don't remember the exact
conversation anymore.

I remember laughing.
```

This is only a formatting example. Never present invented text as a real memory.

---

# 13. Section 02 — The Little Things

Chapter:

```text
02 — THE LITTLE THINGS
```

Heading:

```text
Maybe the little things were the big things.
```

Purpose:
- inside jokes
- random conversations
- college moments
- calls
- food
- places
- gifts
- funny moments
- small efforts
- little memories

Do not invent any.

Memory cards can use:

```text
ENTRY 024

[IMAGE]

[SHORT MEMORY]
```

---

# 14. Section 03 — You Became Home

Chapter:

```text
03 — YOU BECAME HOME
```

Heading:

```text
Somewhere along the way,
you became home.
```

Purpose:
- explain what she meant to the user
- highlight meaningful moments
- appreciate things she did
- show emotional impact
- show creative things she made

Do not turn this into an effort scoreboard.

Tone:

> These are the things I remember.

---

# 15. Her Websites / Creative Efforts

Known websites:

```text
https://bansiii8.github.io/for-jaggu/
https://bansiii8.github.io/for-you/
```

If screenshots are used, store local copies.

Example archive presentation:

```text
ARCHIVE ENTRY 031

THE THINGS YOU MADE FOR ME

[SCREENSHOT]

You didn't have to make this.

You did anyway.
```

Do not frame it as debt or obligation.

---

# 16. My-Bhondu Project

Include the user's `my-bhondu` project as an archive item.

It used:
- white
- pink
- tulips
- sunflowers

Use screenshots locally where appropriate.

Do not make this an effort comparison.

---

# 17. Section 04 — I Know I Wasn't Perfect

Chapter:

```text
04 — I KNOW I WASN'T PERFECT
```

Heading:

```text
I know I wasn't perfect.
```

This is the accountability section.

Keep it simple.

Approved direction:

> I made mistakes.
>
> I said things I shouldn't have said.
>
> I reacted badly sometimes.
>
> I didn't always understand what you needed.
>
> I know there were moments where I hurt you, even when hurting you was never what I wanted.

Do not add “but you also...” here.

---

# 18. Section 05 — What Actually Hurt

Chapter:

```text
05 — WHAT ACTUALLY HURT
```

Heading:

```text
There were things I never knew how to say.
```

This section communicates the user's experience without turning it into an accusation.

## Approved Lego Passage

Preserve this wording unless explicitly changed:

> No, I don't want your time.
>
> I just want to feel like those days when you used to tell me that I was yours, and you meant it.
>
> I know I don't always believe in myself. So losing you wouldn't just mean losing a lover. It would mean losing the one person with whom I felt completely like myself — and losing the part of me I thought no longer existed, the part of me that you helped me discover.
>
> I became used to living a life that had you in it.
>
> And now it feels like your life is a Lego set that keeps growing into something beautiful, while I'm just the piece that no longer fits.
>
> Am I really becoming that forgotten part of your life?
>
> Did you love me, or were you just being kind to me?
>
> I don't want to believe the signs I've been seeing. I want you to tell me yourself.
>
> Because there was only one little conversation I ever wanted to have — an honest one, where I could understand what happened between us.
>
> But when I finally called you after so long, the irritation in your voice made it difficult for me to say everything I had been carrying.
>
> And somehow, I could only get out the first line of this stupid little rhyme…

Do not rewrite this passage automatically.

---

# 19. Section 06 — The Things I Never Wanted

Chapter:

```text
06 — THE THINGS I NEVER WANTED
```

Heading:

```text
I never wanted perfect.
```

Approved structure:

> I never wanted all your time.
>
> I never wanted you to stop having friends.
>
> I never wanted you to give up your life for me.
>
> I never wanted perfection.
>
> I wanted to feel remembered.
>
> I wanted to feel safe enough to say when something hurt.
>
> I wanted us to be able to make mistakes without becoming enemies.
>
> I wanted effort to feel mutual.
>
> I wanted us to choose each other without either person having to beg.
>
> That's all.

Keep this visually simple.

---

# 20. Section 07 — The Archive

Chapter:

```text
07 — THE ARCHIVE
```

This is the main interactive scrapbook collection.

Filters:

```text
ALL
PHOTOS
LETTERS
DAYS
LITTLE THINGS
```

Vanilla JavaScript should filter the cards.

When changing filters:
- update visible cards
- use subtle animation
- preserve comfortable scroll position
- do not make the interface jump unnecessarily

Archive item shape:

```js
{
  id: 1,
  category: "photo",
  date: "[DATE]",
  title: "[TITLE]",
  image: "images/archive/example.webp",
  text: "[TEXT]",
  rotation: -1.2
}
```

Never invent content.

---

# 21. Archive Empty State

Use:

```text
Nothing here yet.

Some memories haven't been added.
```

Keep it understated.

---

# 22. Section 08 — Voice Notes

Chapter:

```text
08 — VOICE NOTES
```

Heading:

```text
Things I couldn't write.
```

Supporting line:

```text
Recorded, not sent.
```

Simple audio cards:

```text
VOICE NOTE 01
23 SEPTEMBER
11:48 PM

▶   00:00 ━━━━━●━━━━ 03:42
```

Each voice note needs:
- play/pause
- progress
- duration
- date
- time
- label

Use native HTML `<audio>` and simple vanilla JS.

---

# 23. Voice Note Behavior

Requirements:
- only one voice note plays at once
- clicking another pauses the previous
- show current time
- show duration
- allow seeking
- work on mobile
- no autoplay

When a voice note plays, background music must stop or remain off.

The real voice should be clear and unobstructed.

---

# 24. Music

Music is optional.

Do not use commercial copyrighted music without permission.

Preferred musical direction:
- soft piano
- subtle ambient texture
- warm nostalgic atmosphere
- no lyrics required

Never autoplay sound.

The user must intentionally activate music.

Control:

```text
♪ OFF
```

or:

```text
♪ ON
```

When voice notes start:
- pause background music
- do not resume unexpectedly

---

# 25. Section 09 — What We Imagined

Chapter:

```text
09 — WHAT WE IMAGINED
```

Heading:

```text
We once imagined a future.
```

Include the known “THE DREAM TEAM — Same Chaos, Better Together” material if the user supplies the image.

Themes can include:
- career
- travel
- home
- happiness
- memories
- shared plans

Do not frame this as proof that she must stay.

Frame it as something that was once imagined together.

---

# 26. Section 10 — The Last Page

Chapter:

```text
10 — THE LAST PAGE
```

Heading:

```text
Whatever happens next...
```

Approved direction:

> I don't know where this story goes from here.
>
> Maybe we find our way back to each other.
>
> Maybe we become a beautiful memory.
>
> Maybe life surprises both of us.
>
> I don't know.
>
> And for once, I don't want to pretend that I do.
>
> I just wanted you to know what this meant to me.
>
> Thank you for being part of my life.

Do not add “I'll wait forever,” “I can't live without you,” or similar pressure-heavy language.

---

# 27. Final Button

At the bottom:

```text
Before you go…
```

This opens the final modal.

This should be the main final interaction.

---

# 28. Final “Before You Go…” Modal

## Title

```text
Before you go…
```

## Exact approved body

> Before you make your final decision to leave, I want to ask you to do one last thing for me.
>
> Think about all the beautiful moments we shared.
>
> Read my old letters.
>
> Remember the promises we made.
>
> Look at the little things we planned for the future.
>
> Remember why we began.
>
> Remember the love.
>
> Remember us.
>
> Not because I want to force you to stay.
>
> Not because I want to make you feel guilty for leaving.
>
> Just because before we let something this meaningful become a memory, I want you to look at the whole story — not only the difficult parts, but everything that existed between them.
>
> And if, after remembering all of that, your heart still tells you that leaving is what you truly need…
>
> If you still believe that our paths are better apart…
>
> Then I will respect that.
>
> Because loving someone also means having the courage to let them choose what is right for their heart, even when that choice hurts you.
>
> So if your heart truly asks you to go, I won't hold you back.
>
> I'll let you have what your heart says.

Button:

```text
CLOSE
```

---

# 29. Final Modal Design

Make it resemble a physical sheet of paper.

Use:
- cream background
- thin border
- soft shadow
- slight rounding
- generous padding
- readable body width
- close button at bottom

Do not use:
- red backgrounds
- heart rain
- emotional countdowns
- crying animations
- giant text
- forced confirmation

The modal is a final reflection, not pressure.

---

# 30. Navigation

Do not use a corporate navbar.

A tiny chapter indicator is enough:

```text
01 / 10
THE BEGINNING
```

Optional menu:

```text
BHONDU

01 The Beginning
02 The Little Things
03 You Became Home
04 I Wasn't Perfect
05 What Hurt
06 What I Never Wanted
07 The Archive
08 Voice Notes
09 What We Imagined
10 The Last Page
```

Menu should be minimal.

---

# 31. Decorative Elements

Allowed:
- paper tape
- pressed-flower style details
- tiny tulip/sunflower references
- handwritten arrows
- small pink ink marks
- paper clips
- subtle shadows
- photo borders

Rule:

**Decoration supports memory; decoration never dominates memory.**

---

# 32. Flowers

Known favorites:
- tulips
- sunflowers

Use subtly:
- tiny pressed flower beside a memory
- small illustration on a card
- corner decoration
- small flower stamp

Do not use giant flowers or animated falling flowers.

---

# 33. Animation

Use restrained animation:
- fade
- small translate
- subtle scale
- image reveal
- slight card movement

Avoid:
- excessive parallax
- cursor trails
- floating hearts
- particles
- giant transitions
- 3D effects
- constant motion
- animation on every element

Use IntersectionObserver for scroll reveals.

Suggested reveal:

```css
opacity: 0;
transform: translateY(15px);
```

to:

```css
opacity: 1;
transform: translateY(0);
```

Duration around 500–800ms.

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

and disable nonessential animation.

---

# 34. Mobile-First Rules

This site may primarily be opened on a phone.

Mobile requirements:
- no horizontal overflow
- readable text
- large touch targets
- scrapbook cards remain attractive
- audio controls remain usable
- modal fits viewport
- menu can be closed easily

Do not simply shrink desktop layouts.

On mobile:
- reduce image overlap
- reduce rotations
- stack cards
- keep captions readable

Desktop may use more overlapping scrapbook compositions.

---

# 35. Responsive Breakpoints

Suggested:

```css
/* Mobile */
< 600px

/* Tablet */
600px–1024px

/* Desktop */
> 1024px
```

These are guidelines rather than rigid requirements.

---

# 36. Accessibility

Basic accessibility is required.

Use:
- semantic HTML
- buttons for interactions
- meaningful alt text
- keyboard-accessible controls
- visible focus states
- adequate contrast
- labels for audio controls

Do not over-engineer.

---

# 37. Images

Use local images.

Preferred:
- WebP for photographs
- JPG when existing photos are already JPG
- PNG for transparent graphics

Do not use enormous uncompressed files.

Use:

```html
loading="lazy"
```

for images below the initial viewport.

Do not lazy-load the main opening visual if it causes a visible delay.

---

# 38. No Fake Content

The coding agent must never invent:
- dates
- conversations
- memories
- private messages
- quotes supposedly said by her
- relationship milestones
- photos
- voice recordings
- promises
- events

Use placeholders:

```text
[ADD MEMORY HERE]
[ADD DATE]
[ADD PHOTO]
[ADD VOICE NOTE]
```

Do not use stock romantic couples as placeholders.

---

# 39. Privacy

Do not expose private conversations unless the user intentionally supplies and approves them.

Avoid:
- phone numbers
- addresses
- private account information
- passwords
- sensitive identifiers

---

# 40. Project File Structure

Keep it simple:

```text
BHONDU/
│
├── index.html
├── style.css
├── script.js
│
├── images/
│   ├── memories/
│   ├── archive/
│   ├── letters/
│   └── general/
│
├── audio/
│   ├── music.mp3
│   ├── voice-01.mp3
│   ├── voice-02.mp3
│   └── ...
│
└── assets/
    ├── paper-texture.png
    ├── tape.png
    ├── grain.png
    └── flowers/
```

Do not create unnecessary files.

---

# 41. HTML Architecture

Use semantic sections:

```html
<main>
  <section id="cover"></section>
  <section id="beginning"></section>
  <section id="little-things"></section>
  <section id="home"></section>
  <section id="accountability"></section>
  <section id="hurt"></section>
  <section id="never-wanted"></section>
  <section id="archive"></section>
  <section id="voice-notes"></section>
  <section id="future"></section>
  <section id="last-page"></section>
</main>
```

Place final modal near the end of `<body>`.

---

# 42. CSS Architecture

Use CSS variables and logically organized styles:

1. reset
2. variables
3. typography
4. base layout
5. cover
6. sections
7. scrapbook
8. archive
9. audio
10. modal
11. navigation
12. responsive
13. reduced motion

---

# 43. JavaScript Architecture

Keep it simple.

Possible functions:

```js
initNavigation();
initScrollReveal();
initArchiveFilters();
initAudioPlayers();
initMusicControl();
initFinalModal();
```

Use standard event listeners.

No frameworks.

---

# 44. Archive Data

A simple array is enough:

```js
const archiveItems = [
  {
    id: 1,
    category: "photo",
    title: "[TITLE]",
    date: "[DATE]",
    image: "images/archive/example.webp",
    text: "[MEMORY]",
    rotation: -1.2
  }
];
```

Render cards dynamically.

---

# 45. Letter Data

Example:

```js
{
  id: 1,
  title: "Letter 01",
  date: "[DATE]",
  text: "[LETTER CONTENT]"
}
```

Clicking opens a readable paper overlay.

Do not require a backend.

---

# 46. Audio Data

Example:

```js
{
  id: 1,
  title: "VOICE NOTE 01",
  date: "[DATE]",
  time: "[TIME]",
  src: "audio/voice-01.mp3"
}
```

---

# 47. Modal Behavior

When the final modal opens:
- lock background scrolling
- allow ESC to close
- close button works
- clicking outside may close if appropriate
- restore scrolling after close

Letter modals should behave similarly.

---

# 48. Music Behavior

Never autoplay sound.

The browser may block autoplay.

Music requires intentional activation.

No cookies are required.

When voice notes start:
- pause music
- do not unexpectedly resume it

---

# 49. Loading

Avoid artificial loading screens.

Render the page immediately.

Use lazy loading for lower images.

Do not create a fake:

> Loading our memories...

screen.

---

# 50. Error Handling

Missing image:

show a tasteful placeholder instead of a broken icon.

Missing audio:

```text
Audio unavailable.
```

Do not let one missing asset break the entire page.

---

# 51. Empty States

Archive:

```text
Nothing here yet.

Some memories haven't been added.
```

Voice notes:

```text
No voice notes have been added yet.
```

Letters:

```text
No letters have been added yet.
```

---

# 52. Footer

Do not create a commercial footer.

A tiny ending is enough:

```text
BHONDU
J × B
```

No business links, marketing CTA, or social icons.

---

# 53. Performance

Keep it lightweight:
- compressed images
- lazy loading
- minimal JavaScript
- no huge libraries
- no unnecessary network requests
- no heavy animation library

---

# 54. GitHub Pages Deployment

The site must work by simply pushing:

```text
index.html
style.css
script.js
images/
audio/
assets/
```

to a GitHub repository.

GitHub Pages should serve the root `index.html`.

Do not require:

```text
npm install
npm run build
npm start
```

for deployment.

---

# 55. Paths

Always use relative paths:

```text
images/memories/photo1.webp
audio/voice-01.mp3
```

Never use local computer paths.

---

# 56. Browser Support

Target modern:
- Chrome
- Edge
- Safari
- Firefox

Especially:
- Android Chrome
- iPhone Safari

Do not rely on experimental APIs for core functionality.

---

# 57. No Tracking

This is a personal microsite.

Do not add:
- analytics
- trackers
- advertising
- user accounts
- data collection

---

# 58. Design Don'ts

Never use:
- generic heart rain
- floating-heart cursor
- excessive pink
- Valentine's aesthetic
- generic couple stock images
- cheesy romantic templates
- giant “I LOVE YOU” animations
- guilt-inducing counters
- countdowns
- “you owe me” language
- forced confirmation dialogs
- autoplay audio
- fake typing effects everywhere
- excessive parallax
- unnecessary 3D
- excessive glassmorphism
- corporate navigation
- commercial footer

---

# 59. Emotional Rules

Never imply:
- she owes the user a relationship
- she must stay because of effort
- she will regret leaving
- she is responsible for the user's emotional survival
- the website is a test
- she must respond

The final experience must preserve her freedom to choose.

---

# 60. Emotional Flow

The experience should move approximately:

```text
curiosity
    ↓
nostalgia
    ↓
warmth
    ↓
appreciation
    ↓
accountability
    ↓
honesty
    ↓
understanding
    ↓
memories
    ↓
reflection
    ↓
choice
```

Never turn it into:

```text
cute
↓
sad
↓
guilt
↓
begging
```

---

# 61. Content Priority

If visual design conflicts with readability:

**readability wins.**

If animation conflicts with performance:

**performance wins.**

If decoration conflicts with a photograph:

**photograph wins.**

If emotional drama conflicts with respect:

**respect wins.**

---

# 62. Implementation Phases

## Phase 1 — Foundation
Build:
- HTML structure
- CSS variables
- typography
- paper background
- responsive system
- basic JavaScript

## Phase 2 — Cover
Build:
- BHONDU title
- subtitle
- J × B
- supporting line
- Enter button

## Phase 3 — Scrapbook
Build:
- photo cards
- paper cards
- tape
- captions
- rotations
- responsive layout

## Phase 4 — Main Sections
Build:
- Beginning
- Little Things
- You Became Home
- I Wasn't Perfect
- What Hurt
- What I Never Wanted

## Phase 5 — Archive
Build:
- category filters
- archive cards
- image overlays
- letters

## Phase 6 — Voice Notes
Build:
- audio list
- controls
- exclusive playback
- music interaction

## Phase 7 — Future
Build:
- Dream Team material
- future plans
- scrapbook presentation

## Phase 8 — Ending
Build:
- Last Page
- Before You Go button
- final modal

## Phase 9 — Mobile Polish
Test:
- phone
- tablet
- desktop

## Phase 10 — Final Content
Replace placeholders with actual:
- photos
- dates
- memories
- letters
- voice notes
- music

---

# 63. Testing Checklist

## Visual
- [ ] Cover looks correct
- [ ] Typography loads
- [ ] Paper background looks natural
- [ ] Photos are not stretched
- [ ] Rotations are subtle
- [ ] Pink accents are restrained
- [ ] Text is readable

## Interaction
- [ ] Enter button works
- [ ] Navigation works
- [ ] Archive filters work
- [ ] Letters open
- [ ] Letters close
- [ ] Voice notes play
- [ ] Only one voice note plays at once
- [ ] Music toggle works
- [ ] Music pauses for voice notes
- [ ] Final modal opens
- [ ] Final modal closes

## Mobile
- [ ] No horizontal overflow
- [ ] Buttons are easy to tap
- [ ] Text is readable
- [ ] Photos fit
- [ ] Audio works
- [ ] Modal fits
- [ ] Navigation closes

## Technical
- [ ] No console errors
- [ ] No missing asset errors
- [ ] Relative paths work
- [ ] GitHub Pages works
- [ ] Refresh works
- [ ] Direct page URL works

---

# 64. Acceptance Criteria

The project is complete when:

1. It runs directly from `index.html`.
2. It uses only HTML, CSS, and vanilla JavaScript.
3. It works on GitHub Pages.
4. It feels like a personal scrapbook rather than a commercial site.
5. The cover clearly establishes BHONDU.
6. Every planned section exists.
7. The scrapbook system works.
8. Photos can be added easily.
9. Letters can be added easily.
10. Voice notes can be added easily.
11. Background music is optional.
12. Voice notes do not autoplay.
13. Archive filtering works.
14. The final “Before you go…” modal works.
15. Mobile experience is excellent.
16. No fake memories are invented.
17. No unnecessary frameworks are used.
18. No tracking or analytics are included.
19. No backend is required.
20. The files can be pushed directly to GitHub Pages.

---

# 65. Most Important Instruction to Antigravity

Do not over-engineer this project.

The user intentionally chose a simple static implementation.

The target is:

> **simple code, sophisticated experience.**

Build it like a carefully handcrafted personal GitHub Pages project.

The technical implementation should remain easy for the user to understand and edit later.

The emotional design should feel much more sophisticated than the underlying code.

---

# 66. Final Design Summary

```text
PROJECT
BHONDU

TYPE
Personal static microsite

TECH
HTML
CSS
Vanilla JavaScript

HOSTING
GitHub Pages

STYLE
Digital scrapbook / personal archive

COLORS
Warm cream
Soft pink
Dusty rose
Charcoal

TYPE
Cormorant Garamond
Inter
IBM Plex Mono

MEDIA
Personal photographs
Letters
Voice notes
Optional ambient instrumental music

STRUCTURE
Cover
Beginning
Little Things
You Became Home
I Wasn't Perfect
What Actually Hurt
What I Never Wanted
Archive
Voice Notes
What We Imagined
Last Page
Before You Go modal

CORE FEELING
Personal
Warm
Nostalgic
Mature
Honest
Quiet
Handmade

CORE RULE
It should feel discovered, not designed.
```

# 67. Final Build Rule

Build the visual and functional system first.

Do not fill missing personal information with invented content.

Once the system is complete, the user will provide the real:
- photographs
- dates
- memories
- letters
- voice notes
- music

Those should be inserted into the existing structure.

The final website should feel like something that could only have been made for **Bhondu**, while remaining technically simple enough to live comfortably as a GitHub Pages project.
