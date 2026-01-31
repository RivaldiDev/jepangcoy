// Drag and Drop Sentence Builder for Japanese Exams
// Duolingo-style word ordering exercise

class DragDropQuiz {
  constructor(containerId, exercises) {
    this.container = document.getElementById(containerId);
    this.exercises = exercises;
    this.currentExercise = 0;
    this.userAnswers = [];
    this.score = 0;
  }

  init() {
    this.renderExercise();
  }

  renderExercise() {
    const exercise = this.exercises[this.currentExercise];
    const shuffledWords = this.shuffleArray([...exercise.words]);

    this.container.innerHTML = `
      <div class="drag-drop-exercise">
        <div class="exercise-header">
          <span class="exercise-number">Soal ${this.currentExercise + 1} dari ${this.exercises.length}</span>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${(this.currentExercise / this.exercises.length) * 100}%"></div>
          </div>
        </div>

        <div class="sentence-prompt">
          <p class="prompt-text">${exercise.prompt}</p>
          <p class="prompt-translation">${exercise.translation}</p>
        </div>

        <div class="drop-zone" id="dropZone">
          <p class="drop-hint">Tarik kata ke sini untuk membuat kalimat</p>
        </div>

        <div class="word-bank" id="wordBank">
          ${shuffledWords
            .map(
              (word, index) => `
            <div class="draggable-word" draggable="true" data-word="${word}" data-index="${index}">
              <span class="word-jp">${word}</span>
            </div>
          `
            )
            .join('')}
        </div>

        <div class="exercise-actions">
          <button class="btn-check" id="checkBtn" disabled>Cek Jawaban</button>
          <button class="btn-skip" id="skipBtn">Lewati</button>
        </div>
      </div>
    `;

    this.setupDragAndDrop();
    this.setupButtons();
  }

  setupDragAndDrop() {
    const draggables = this.container.querySelectorAll('.draggable-word');
    const dropZone = this.container.querySelector('#dropZone');
    const wordBank = this.container.querySelector('#wordBank');
    let draggedElement = null;

    draggables.forEach(draggable => {
      draggable.addEventListener('dragstart', e => {
        draggedElement = draggable;
        draggable.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      });

      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
        draggedElement = null;
        this.updateCheckButton();
      });

      // Touch events for mobile
      draggable.addEventListener(
        'touchstart',
        e => {
          draggedElement = draggable;
          draggable.classList.add('dragging');
        },
        { passive: true }
      );

      draggable.addEventListener('touchend', () => {
        draggable.classList.remove('dragging');
        draggedElement = null;
        this.updateCheckButton();
      });
    });

    [dropZone, wordBank].forEach(zone => {
      zone.addEventListener('dragover', e => {
        e.preventDefault();
        zone.classList.add('drag-over');
      });

      zone.addEventListener('dragleave', () => {
        zone.classList.remove('drag-over');
      });

      zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('drag-over');

        if (draggedElement) {
          zone.appendChild(draggedElement);

          // Remove hint if words are in drop zone
          const hint = dropZone.querySelector('.drop-hint');
          if (hint && dropZone.children.length > 1) {
            hint.style.display = 'none';
          }

          this.updateCheckButton();
        }
      });
    });
  }

  updateCheckButton() {
    const dropZone = this.container.querySelector('#dropZone');
    const checkBtn = this.container.querySelector('#checkBtn');
    const wordsInDropZone = dropZone.querySelectorAll('.draggable-word').length;

    checkBtn.disabled = wordsInDropZone === 0;
  }

  setupButtons() {
    const checkBtn = this.container.querySelector('#checkBtn');
    const skipBtn = this.container.querySelector('#skipBtn');

    checkBtn.addEventListener('click', () => this.checkAnswer());
    skipBtn.addEventListener('click', () => this.skipExercise());
  }

  checkAnswer() {
    const exercise = this.exercises[this.currentExercise];
    const dropZone = this.container.querySelector('#dropZone');
    const userWords = Array.from(dropZone.querySelectorAll('.draggable-word')).map(
      w => w.dataset.word
    );
    const userSentence = userWords.join('');
    const isCorrect = userSentence === exercise.correct;

    if (isCorrect) {
      this.score++;
    }

    this.userAnswers.push({
      exercise: this.currentExercise,
      userAnswer: userWords,
      correct: exercise.correct,
      isCorrect: isCorrect,
    });

    this.showFeedback(isCorrect, exercise, userWords);
  }

  showFeedback(isCorrect, exercise, userWords) {
    const dropZone = this.container.querySelector('#dropZone');

    // Highlight correct/incorrect
    const words = dropZone.querySelectorAll('.draggable-word');
    words.forEach((word, index) => {
      if (isCorrect) {
        word.classList.add('correct');
      } else {
        word.classList.add('incorrect');
      }
    });

    // Show feedback message
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = `drag-drop-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    feedbackDiv.innerHTML = `
      <div class="feedback-icon">${isCorrect ? '✓' : '✗'}</div>
      <div class="feedback-content">
        <h4>${isCorrect ? 'Benar!' : 'Salah'}</h4>
        ${
          !isCorrect
            ? `
          <p class="your-answer">Jawaban Anda: ${userWords.join(' ')}</p>
          <p class="correct-answer">Jawaban benar: ${exercise.correct}</p>
        `
            : ''
        }
        <p class="explanation">${exercise.explanation}</p>
      </div>
      <button class="btn-next" id="nextExerciseBtn">
        ${this.currentExercise < this.exercises.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil'}
      </button>
    `;

    this.container.appendChild(feedbackDiv);

    document.getElementById('nextExerciseBtn').addEventListener('click', () => {
      this.currentExercise++;
      if (this.currentExercise < this.exercises.length) {
        this.renderExercise();
      } else {
        this.showFinalResults();
      }
    });

    // Disable check and skip buttons
    this.container.querySelector('#checkBtn').disabled = true;
    this.container.querySelector('#skipBtn').disabled = true;
  }

  skipExercise() {
    const exercise = this.exercises[this.currentExercise];

    this.userAnswers.push({
      exercise: this.currentExercise,
      userAnswer: [],
      correct: exercise.correct,
      isCorrect: false,
      skipped: true,
    });

    this.currentExercise++;
    if (this.currentExercise < this.exercises.length) {
      this.renderExercise();
    } else {
      this.showFinalResults();
    }
  }

  showFinalResults() {
    const percentage = Math.round((this.score / this.exercises.length) * 100);
    const passingScore = 80;
    const passed = percentage >= passingScore;

    this.container.innerHTML = `
      <div class="drag-drop-results">
        <div class="results-icon ${passed ? 'passed' : 'failed'}">
          ${passed ? '🎉' : '📚'}
        </div>
        <h2 class="results-title">${passed ? 'Selamat!' : 'Terus Belajar!'}</h2>
        
        <div class="results-score">
          <div class="score-circle ${passed ? 'passed' : 'failed'}">
            <span class="score-number">${percentage}%</span>
            <span class="score-label">${this.score}/${this.exercises.length}</span>
          </div>
          <p class="passing-score">Nilai kelulusan: ${passingScore}%</p>
        </div>

        <div class="results-breakdown">
          <div class="breakdown-item correct">
            <span class="icon">✓</span>
            <span class="label">Benar</span>
            <span class="value">${this.score}</span>
          </div>
          <div class="breakdown-item wrong">
            <span class="icon">✗</span>
            <span class="label">Salah/Dilewati</span>
            <span class="value">${this.exercises.length - this.score}</span>
          </div>
        </div>

        <div class="pass-status ${passed ? 'passed' : 'failed'}">
          ${passed ? '✓ LULUS' : '✗ BELUM LULUS'}
        </div>

        <div class="results-actions">
          <button class="btn btn-secondary" onclick="location.reload()">
            <span class="material-symbols-outlined">replay</span>
            Coba Lagi
          </button>
          <a href="../index.html" class="btn btn-primary">
            <span class="material-symbols-outlined">home</span>
            Kembali
          </a>
        </div>
      </div>
    `;
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DragDropQuiz };
}
