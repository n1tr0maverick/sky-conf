# SKY Conference Website Requirements

## Overview
Website for SKY Conference - an international youth event organized by youth and for youth.

---

## Main Page (Landing)

### Header
- Logo and name in the left upper corner
- Navigation menu

### Hero Section
- Teaser for **SKY '26** (upcoming edition)
- Image carousel showcasing previous editions

### Footer
- Contact information

---

## Navigation Menu Structure

### 1. About Us & Our Aim

**Tagline:** *SKY Conference - sky is not the limit*

**Content Sections:**

#### About SKY Conference
- International event organised by youth and for youth
- Safe space for teenagers and young adults from different countries/backgrounds
- Connects students, educators, scientists, artists, and changemakers
- Combines keynote talks with interactive workshops
- "Full circle of inspiration" philosophy - participants, volunteers, speakers, and organisers all inspire one another

#### Our Aim
- Empower young people to believe in their own power
- Show that despite young age, youth has influence on the world
- Highlight importance of seeking new knowledge, possibilities, and personal growth
- Encourage stepping beyond comfort zones and turning ideas into action
- Build confidence, responsibility, and sense of purpose

#### Initiators
| Name | Role |
|------|------|
| Katarzyna Chudziak | Initiator |
| Zuzanna Hofman | Initiator |
| Julia Mia Smuczynska | Initiator |

---

### 2. Previous Editions

#### 2a. SKY 2022

**Event Details:**
- **Date:** 14th May 2022
- **Location:** European Solidarity Centre, Gdańsk
- **Theme:** *Beyond*

**Description:** First edition featuring speakers exploring "beyond" through their specialties. Coffee break networking with speakers, followed by workshops.

**Speakers (with photos and bios):**
- Giuseppe Cataldo
- Ed Wollack (NASA)
- Krzysztof Zajaczkowski (Drumduan School)
- Magdalena Filcek (Vinci Power-Nap)
- Jan Hofman (Streetwear Community PL, SCPL)
- Filip Tłustochowicz (Streetwear Community PL, SCPL)
- Bogna Pazderska
- Jacek Kołtan (European Solidarity Centre)
- Valeriia Fedorova
- Olha Chystiakova
- Tymoteusz Niewiarowski
- Sara Jabłońska
- Urszula Wyrwińska

**Organisers:**
- Katarzyna Chudziak
- Zuzanna Hofman
- Julia Mia Smuczynska

**Co-organisers:**
- Klub Sportowy Gedania 1922
- Mental Arts
- III Liceum Ogólnokształcące im. Bohaterów Westerplatte w Gdańsku

**Sponsors & Partners:**
- Ziaja
- Polska Akademia Dzieci
- Wspólnota Gdańska

**Photo Gallery:** [Event photos required]

---

#### 2b. SKY 2023

**Event Details:**
- **Date:** 9-10th March 2023
- **Location:** Kino Nowe Horyzonty, Wrocław
- **Theme:** *Gratitude*

**Speakers (with photos and bios):**
- Prof. Philip Zimbardo
- Tilda Swinton
- Giuseppe Cataldo
- Krzysztof Zajaczkowski
- Magdalena Szumowska
- Magdalena Filcek
- Julia Mia Smuczynska
- Ewelina Cichoń
- Maksymilian Paczyński
- Atharva Dongre
- Jan Hofman
- Julian Wąsek
- Wojciech Czyż
- Mikołaj Hop

**Organisers:**
- Katarzyna Chudziak
- Zuzanna Hofman

**Co-organiser:**
- Dolnośląska Szkoła Wyższa

**Sponsors & Partners:**
- INVSBL
- Ziaja
- Era Psyche dr Anetta Pereświet-Sołtan

**Photo Gallery:** [Event photos required]

---

### 3. Registration

Three registration paths (external form links):
1. **Be a Speaker** → [Form link]
2. **Be a Participant** → [Form link]
3. **Be a Volunteer** → [Form link]

---

### 4. Initiators

Profile cards for each initiator:
| Name | Photo | Bio/Note |
|------|-------|----------|
| Katarzyna Chudziak | [Photo required] | [Bio required] |
| Zuzanna Hofman | [Photo required] | [Bio required] |

---

### 5. Contact

**Email:** skyyouthconference@gmail.com

**Phone:**
- Katarzyna Chudziak: +48 663 176 020
- Zuzanna Hofman: +48 537 732 237

---

## Assets Required

### Images
- [ ] SKY Conference logo
- [ ] SKY '26 teaser graphics
- [ ] Carousel images from previous editions
- [ ] SKY 2022 event photos
- [ ] SKY 2023 event photos
- [ ] Speaker headshots (all editions)
- [ ] Initiator photos
- [ ] Sponsor/partner logos

### External Links
- [ ] Speaker registration form URL
- [ ] Participant registration form URL
- [ ] Volunteer registration form URL

---

## Design Notes
- Modern, youth-oriented aesthetic
- International appeal
- Mobile responsive
- Carousel/slider for event photos
- Clean navigation structure

---

## Feedback & Revisions (February 2026)

### 1. About Us Section - Emoji Changes
**Status:** Pending
- Current: Uses emoji icons (🌍, 🔗, 💫) for the three about cards
- Request: Replace with different, more suitable icons (user to specify preference)
- Note: Awaiting user's preferred icon style/selection

### 2. Edition Sections (SKY 2022 & 2023) - Emoji Changes  
**Status:** Pending
- Current: Uses emojis (📅, 📍, 🎯) for date/location/theme metadata
- Request: Replace with simpler icons
- Note: Awaiting user's example for preferred style

### 3. SKY 2023 - INVSBL Family Photo
**Status:** Pending
- Request: Add 'invsbl family' photo to SKY 2023 section
- Location: /public/images/invsbl-family.jpg (awaiting upload)

### 4. Edition Context Clarity When Scrolling
**Status:** To Implement
- Issue: Users may not realize speakers/sponsors shown belong to a specific edition when scrolling
- Solution Options:
  - Add sticky edition indicator header that stays visible while scrolling
  - Add edition badge/label near speaker grids and sponsor sections
  - Visual differentiation between editions with colors/themes
- Note: Awaiting user's visual reference/sketch

### 5. Registration Section - Replace Emojis with Photos
**Status:** Pending
- Current: Uses emoji icons (🎤, 🎫, 🤝) for speaker/participant/volunteer cards
- Request: Replace with actual photos from previous editions showing:
  - "Be a Speaker" → Photo of a speaker from previous edition
  - "Be a Participant" → Photo of participants
  - "Be a Volunteer" → Photo of volunteers
- Note: Awaiting photo uploads

### 6. Contact Section - Add Surnames
**Status:** ✅ Implemented
- Request: Add full names to contact section
- Change: "Katarzyna" → "Katarzyna Chudziak", "Zuzanna" → "Zuzanna Hofman"

### 7. Interactive Carousel Feature
**Status:** To Implement
- Current: Carousel auto-scrolls through images with manual navigation
- Request: Make carousel items clickable to open relevant sections:
  - "Interactive Workshops" → Opens workshops section with details and photos
  - "Inspiring Speakers" → Opens all speakers from all editions + "Become a Speaker" button
  - Edition slides → Could link to respective edition sections
- Implementation needs:
  - Add click handlers to carousel slides
  - Create expanded content sections/modals for each carousel item
  - Add "All Speakers" compilation section
  - Add workshop highlight section

---

## Assets Required (Updated)

### Images
- [ ] SKY Conference logo
- [ ] SKY '26 teaser graphics
- [ ] Carousel images from previous editions
- [ ] SKY 2022 event photos
- [ ] SKY 2023 event photos
- [ ] **INVSBL Family photo** (for SKY 2023 section)
- [ ] Speaker headshots (all editions)
- [ ] Initiator photos
- [ ] Sponsor/partner logos
- [ ] **Speaker photo** (for "Be a Speaker" registration card)
- [ ] **Participants photo** (for "Be a Participant" registration card)
- [ ] **Volunteers photo** (for "Be a Volunteer" registration card)

### External Links
- [ ] Speaker registration form URL
- [ ] Participant registration form URL
- [ ] Volunteer registration form URL
