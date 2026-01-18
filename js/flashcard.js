// Flashcard System
class FlashcardEngine {
    constructor(cards, containerId) {
        this.cards = this.shuffleCards([...cards]); // Shuffle for random order
        this.container = document.getElementById(containerId);
        this.currentIndex = 0;
        this.knownCards = new Set();
        this.learningCards = new Set();
        this.isFlipped = false;

        this.loadProgress();
        this.render();
    }

    // Shuffle cards randomly using Fisher-Yates algorithm
    shuffleCards(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    loadProgress() {
        const saved = localStorage.getItem(`flashcard_${this.cards[0]?.category || 'default'}`);
        if (saved) {
            const data = JSON.parse(saved);
            this.knownCards = new Set(data.known || []);
            this.learningCards = new Set(data.learning || []);
        }
    }

    saveProgress() {
        const data = {
            known: Array.from(this.knownCards),
            learning: Array.from(this.learningCards),
            lastStudied: new Date().toISOString()
        };
        localStorage.setItem(`flashcard_${this.cards[0]?.category || 'default'}`, JSON.stringify(data));
    }

    render() {
        if (!this.container || this.cards.length === 0) return;

        const card = this.cards[this.currentIndex];
        const progress = `${this.currentIndex + 1} / ${this.cards.length}`;
        const knownCount = this.knownCards.size;

        this.container.innerHTML = `
            <div class="flashcard-wrapper">
                <div class="flashcard-progress">
                    <span>${progress}</span>
                    <span>Dikuasai: ${knownCount}</span>
                </div>
                
                <div class="flashcard ${this.isFlipped ? 'flipped' : ''}" id="flashcard">
                    <div class="flashcard-front">
                        <div class="flashcard-character">${card.front}</div>
                        <button class="flashcard-speaker" id="speakerBtn" title="Dengar pengucapan">🔊</button>
                        <div class="flashcard-hint">Klik kartu untuk melihat jawaban</div>
                    </div>
                    <div class="flashcard-back">
                        <div class="flashcard-romaji">${card.romaji || ''}</div>
                        <div class="flashcard-meaning">${card.back}</div>
                        ${card.example ? `<div class="flashcard-example">${card.example}</div>` : ''}
                        <button class="flashcard-speaker" id="speakerBtnBack" title="Dengar pengucapan">🔊</button>
                        <div class="flashcard-hint">Klik kartu untuk kembali</div>
                    </div>
                </div>

                <div class="flashcard-actions">
                    <button class="btn-flashcard btn-learning" id="stillLearning">
                        😕 Masih Belajar
                    </button>
                    <button class="btn-flashcard btn-know" id="knowIt">
                        ✓ Sudah Tahu
                    </button>
                </div>

                <div class="flashcard-navigation">
                    <button class="btn-nav" id="prevCard" ${this.currentIndex === 0 ? 'disabled' : ''}>
                        ← Sebelumnya
                    </button>
                    <button class="btn-nav" id="nextCard">
                        Berikutnya →
                    </button>
                </div>
            </div>
        `;

        // Attach events after DOM is ready
        setTimeout(() => this.attachEvents(), 0);
    }

    attachEvents() {
        const flashcard = document.getElementById('flashcard');
        const speakerBtn = document.getElementById('speakerBtn');
        const speakerBtnBack = document.getElementById('speakerBtnBack');
        const stillLearning = document.getElementById('stillLearning');
        const knowIt = document.getElementById('knowIt');
        const prevCard = document.getElementById('prevCard');
        const nextCard = document.getElementById('nextCard');

        // Flashcard flip
        if (flashcard) {
            flashcard.onclick = (e) => {
                if (e.target.tagName === 'BUTTON') return;
                this.flipOptimized();
            };
        }

        // Speaker buttons
        if (speakerBtn) {
            speakerBtn.onclick = (e) => {
                e.stopPropagation();
                if (typeof japaneseSpeech !== 'undefined') {
                    japaneseSpeech.speak(this.cards[this.currentIndex].front);
                }
            };
        }

        if (speakerBtnBack) {
            speakerBtnBack.onclick = (e) => {
                e.stopPropagation();
                if (typeof japaneseSpeech !== 'undefined') {
                    japaneseSpeech.speak(this.cards[this.currentIndex].front);
                }
            };
        }

        // Action buttons
        if (stillLearning) {
            stillLearning.onclick = (e) => {
                e.stopPropagation();
                this.markAsLearning();
            };
        }

        if (knowIt) {
            knowIt.onclick = (e) => {
                e.stopPropagation();
                this.markAsKnown();
            };
        }

        // Navigation
        if (prevCard) prevCard.onclick = () => this.previous();
        if (nextCard) nextCard.onclick = () => this.next();
    }

    flipOptimized() {
        this.isFlipped = !this.isFlipped;
        const flashcard = document.getElementById('flashcard');
        if (flashcard) {
            if (this.isFlipped) {
                flashcard.classList.add('flipped');
            } else {
                flashcard.classList.remove('flipped');
            }
        }
    }

    markAsKnown() {
        this.knownCards.add(this.currentIndex);
        this.learningCards.delete(this.currentIndex);
        this.saveProgress();
        this.next();
    }

    markAsLearning() {
        this.learningCards.add(this.currentIndex);
        this.knownCards.delete(this.currentIndex);
        this.saveProgress();
        this.next();
    }

    next() {
        if (this.currentIndex < this.cards.length - 1) {
            this.currentIndex++;
            this.isFlipped = false;
            this.render();
        } else {
            this.showComplete();
        }
    }

    previous() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.isFlipped = false;
            this.render();
        }
    }

    showComplete() {
        const knownPercent = Math.round((this.knownCards.size / this.cards.length) * 100);
        this.container.innerHTML = `
            <div class="flashcard-complete">
                <div class="complete-icon">🎉</div>
                <h2>Sesi Selesai!</h2>
                <div class="complete-stats">
                    <div class="stat-item">
                        <div class="stat-value">${this.knownCards.size}</div>
                        <div class="stat-label">Dikuasai</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${this.learningCards.size}</div>
                        <div class="stat-label">Masih Belajar</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${knownPercent}%</div>
                        <div class="stat-label">Progress</div>
                    </div>
                </div>
                <div class="complete-actions">
                    <button class="btn btn-primary" onclick="location.reload()">Ulangi</button>
                    <a href="../index.html" class="btn btn-secondary">Kembali</a>
                </div>
            </div>
        `;
    }

    reset() {
        this.currentIndex = 0;
        this.isFlipped = false;
        this.render();
    }
}

// Helper to initialize flashcards
function initFlashcards(cards, containerId = 'flashcard-container') {
    return new FlashcardEngine(cards, containerId);
}
