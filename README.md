# Japanese Course by Ms. Aulia

A comprehensive, interactive web-based Japanese language learning platform designed for JLPT N5 level students. This application provides a modern, Neo-Tokyo themed interface for learning Japanese fundamentals including Hiragana, Katakana, Kanji, grammar, vocabulary, and more.

## Features

### Learning Materials
- **16 Structured Meetings**: Complete course curriculum from basic greetings to advanced grammar
- **10 Comprehensive Lessons**: Covering Hiragana, Katakana, Particles, Verbs, Adjectives, Counters, Time expressions, and Kanji
- **1000+ N5 Vocabulary Words**: Searchable database with category filters and flashcard mode
- **Interactive Quizzes**: Self-assessment quizzes for each lesson and meeting
- **Final Exam**: 50-question comprehensive exam covering all topics

### Interactive Features
- **Flashcard System**: Study mode with card shuffling and progress tracking
- **Text-to-Speech**: Japanese pronunciation using Web Speech API
- **Handwriting Practice**: Canvas-based writing input for essay questions
- **Romaji Annotations**: Optional romaji support for learning
- **Progress Tracking**: LocalStorage-based progress saving across sessions
- **Search & Filter**: Quick vocabulary lookup and category filtering

### Technology Stack
- Pure HTML5, CSS3, and Vanilla JavaScript (no frameworks)
- Responsive design optimized for desktop and mobile
- Web Speech API for pronunciation
- Canvas API for handwriting practice
- LocalStorage for data persistence
- Google Fonts (Zen Dots, Zen Maru Gothic, Noto Sans JP)
- Material Symbols for icons

## Project Structure

```
belajaruasjepang/
├── index.html              # Main landing page
├── vocabulary.html         # Vocabulary browser with 1000+ words
├── final-exam.html        # Comprehensive final exam
├── script.js              # Main application script
├── styles.css             # Neo-Tokyo design system
├── favicon.png            # Site icon
│
├── css/
│   ├── lesson.css         # Lesson page styling
│   ├── tabs.css           # Tab navigation and flashcards
│   └── romaji.css         # Romaji annotation styles
│
├── js/
│   ├── quiz.js            # Quiz engine with progress tracking
│   ├── flashcard.js       # Flashcard system
│   ├── speech.js          # Japanese text-to-speech
│   ├── romaji.js          # Romaji conversion utility
│   └── handwriting.js     # Canvas handwriting input
│
├── data/
│   └── vocabulary.js      # N5 vocabulary database (1000+ words)
│
├── lessons/               # 10 lesson pages
│   ├── hiragana.html
│   ├── katakana.html
│   ├── partikel.html
│   ├── katakerja.html
│   ├── katasifat.html
│   ├── satuan.html
│   ├── ina.html
│   ├── waktu.html
│   ├── kanji.html
│   └── conjugation.html
│
└── meetings/              # 14 meeting pages + 2 exams
    ├── meeting-01-02.html (Hiragana & Greetings)
    ├── meeting-03-04.html (Katakana & Grammar)
    ├── meeting-05.html    (Geography & Food Vocabulary)
    ├── meeting-06.html    (Demonstratives)
    ├── meeting-07.html    (Advanced Vocabulary)
    ├── meeting-08.html    (UTS - Midterm Exam)
    ├── meeting-09.html    (Numbers & Time)
    ├── meeting-10.html    (Adjectives)
    ├── meeting-11.html    (Existence & Location)
    ├── meeting-12.html    (Time & Particles)
    ├── meeting-13.html    (Verb Conjugation)
    ├── meeting-14.html    (Dictionary Form)
    ├── meeting-15.html    (Kanji Introduction)
    └── meeting-16.html    (UAS - Final Exam with Handwriting)
```

## Getting Started

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/jepangcoy.git
   cd jepangcoy
   ```

2. Open `index.html` in a modern web browser (Chrome, Firefox, Edge, Safari)

No build process or dependencies required - this is a pure static website!

### Usage
- Navigate through lessons using the homepage
- Click on any lesson to start learning
- Use flashcard mode for active recall practice
- Take quizzes to test your knowledge
- Track your progress automatically

## Browser Compatibility

This application works best on modern browsers with support for:
- ES6 JavaScript
- CSS Grid & Flexbox
- Web Speech API (for pronunciation)
- Canvas API (for handwriting)
- LocalStorage API (for progress tracking)

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Features in Detail

### Quiz System
- Multiple choice questions with instant feedback
- Progress bar tracking
- Explanations for correct/incorrect answers
- Score calculation and performance analytics
- LocalStorage persistence

### Flashcard Mode
- Click to flip cards
- "Know" vs "Still Learning" sorting
- Randomized card order (Fisher-Yates shuffle)
- Audio pronunciation on click
- Session statistics

### Vocabulary Database
- 1000+ N5 essential words
- Categories: Verbs, Adjectives, Places, Objects, Food, People, Time
- Real-time search across Japanese, Romaji, and Indonesian
- Interactive card display with pronunciation

## Design Philosophy

The application uses a **Neo-Tokyo** design theme featuring:
- Dark mode optimized UI
- Neon accent colors (crimson, cyan)
- Smooth animations and transitions
- Glassmorphism effects
- Japanese-friendly typography

## Credits

- **Course Content**: Ms. Aulia
- **Developer**: [Rivaldi](https://www.instagram.com/rvldii__/)
- **Design System**: Neo-Tokyo inspired dark theme
- **Fonts**: Google Fonts (Zen Dots, Zen Maru Gothic, Noto Sans JP)
- **Icons**: Google Material Symbols

## License

This project is created for educational purposes. Feel free to use and modify for personal learning.

## Contributing

This is a student project, but suggestions and improvements are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## Future Enhancements

Potential improvements:
- Spaced repetition algorithm for flashcards
- Audio recordings from native speakers
- More advanced grammar lessons
- N4 level content
- User accounts and cloud sync
- Mobile app version

---

**Happy Learning! がんばって！(Ganbatte!)**
