// Quiz Engine for Japanese N5 Learning Platform
class QuizEngine {
  constructor(lessonId, questions) {
    this.lessonId = lessonId;
    this.questions = questions;
    this.currentQuestion = 0;
    this.score = 0;
    this.answers = [];
    this.startTime = Date.now();
  }

  init() {
    this.loadProgress();
    this.renderQuestion();
    this.updateProgressBar();
  }

  loadProgress() {
    const saved = localStorage.getItem('n5_progress');
    this.progress = saved ? JSON.parse(saved) : {};
  }

  saveProgress(completed, score) {
    if (!this.progress[this.lessonId]) {
      this.progress[this.lessonId] = { attempts: 0 };
    }

    this.progress[this.lessonId] = {
      completed: completed,
      score: score,
      attempts: this.progress[this.lessonId].attempts + 1,
      lastAttempt: new Date().toISOString(),
    };

    localStorage.setItem('n5_progress', JSON.stringify(this.progress));
  }

  renderQuestion() {
    const question = this.questions[this.currentQuestion];
    const container = document.getElementById('quiz-container');
    const isExam = this.lessonId === 'uts-midterm' || this.lessonId === 'uas-final';

    container.innerHTML = `
            <div class="question-card">
                <div class="question-header">
                    <span class="question-number">Pertanyaan ${this.currentQuestion + 1} dari ${this.questions.length}</span>
                </div>
                <h3 class="question-text">${isExam ? this.stripRomaji(question.question) : addRomaji(question.question)}</h3>
                <div class="options-container">
                    ${question.options
                      .map(
                        (option, index) => `
                        <button class="option-btn" data-index="${index}">
                            <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                            <span class="option-text">${isExam ? this.stripRomaji(option) : addRomaji(option)}</span>
                        </button>
                    `
                      )
                      .join('')}
                </div>
            </div>
        `;

    // Add click handlers
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', e => this.handleAnswer(e));
    });
  }

  // Helper function to strip romaji and show only Japanese text
  stripRomaji(text) {
    // If text contains word groups, extract just the Japanese
    if (text.includes('word-group')) {
      // Extract text content from spans with class "jp"
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = text;
      const jpSpans = tempDiv.querySelectorAll('.jp');
      return Array.from(jpSpans)
        .map(span => span.textContent)
        .join('');
    }
    // For plain text, return as-is
    return text;
  }

  handleAnswer(e) {
    const selectedIndex = parseInt(e.currentTarget.dataset.index);
    const question = this.questions[this.currentQuestion];
    const isCorrect = selectedIndex === question.correct;

    // Store answer
    this.answers.push({
      questionId: this.currentQuestion,
      selected: selectedIndex,
      correct: question.correct,
      isCorrect: isCorrect,
    });

    if (isCorrect) {
      this.score++;
    }

    // Show feedback
    this.showFeedback(isCorrect, question);
  }

  showFeedback(isCorrect, question) {
    const container = document.getElementById('quiz-container');
    const percentage = Math.round((this.score / this.questions.length) * 100);
    const isExam = this.lessonId === 'uts-midterm' || this.lessonId === 'uas-final';

    // Build feedback content
    let feedbackContent = `
            <div class="feedback-card ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="feedback-icon">
                    ${isCorrect ? '✓' : '✗'}
                </div>
                <h3 class="feedback-title">${isCorrect ? 'Benar!' : 'Salah'}</h3>
        `;

    // Show romaji breakdown for wrong answers in exams, or always in regular quizzes
    if (!isCorrect || !isExam) {
      feedbackContent += `
                <div class="feedback-romaji-section">
                    <p class="romaji-label">Jawaban yang benar:</p>
                    <div class="feedback-answer-with-romaji">
                        ${addRomaji(question.options[question.correct])}
                    </div>
                    <p class="romaji-label">Pertanyaan:</p>
                    <div class="feedback-question-with-romaji">
                        ${addRomaji(question.question)}
                    </div>
                </div>
            `;
    }

    feedbackContent += `
                <p class="feedback-explanation">${question.explanation}</p>
                <button class="btn-next" id="nextBtn">
                    ${this.currentQuestion < this.questions.length - 1 ? 'Pertanyaan Berikutnya' : 'Lihat Hasil'}
                </button>
            </div>
        `;

    container.innerHTML = feedbackContent;

    document.getElementById('nextBtn').addEventListener('click', () => {
      this.currentQuestion++;
      if (this.currentQuestion < this.questions.length) {
        this.renderQuestion();
        this.updateProgressBar();
      } else {
        this.showResults();
      }
    });
  }

  updateProgressBar() {
    const progress = (this.currentQuestion / this.questions.length) * 100;
    const progressBar = document.getElementById('quiz-progress');
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  }

  showResults() {
    const percentage = Math.round((this.score / this.questions.length) * 100);
    const passed = percentage >= 70;
    const timeSpent = Math.round((Date.now() - this.startTime) / 1000);

    // Save progress
    this.saveProgress(passed, percentage);

    const container = document.getElementById('quiz-container');
    container.innerHTML = `
            <div class="results-card">
                <div class="results-icon ${passed ? 'passed' : 'failed'}">
                    ${passed ? '🎉' : '📚'}
                </div>
                <h2 class="results-title">${passed ? 'Selamat!' : 'Terus Belajar!'}</h2>
                <div class="results-score">
                    <div class="score-circle">
                        <span class="score-number">${percentage}%</span>
                    </div>
                </div>
                <div class="results-details">
                    <div class="result-item">
                        <span class="result-label">Benar</span>
                        <span class="result-value">${this.score} / ${this.questions.length}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Waktu</span>
                        <span class="result-value">${timeSpent} detik</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Status</span>
                        <span class="result-value ${passed ? 'text-success' : 'text-warning'}">
                            ${passed ? 'Lulus' : 'Belum Lulus'}
                        </span>
                    </div>
                </div>
                <div class="results-actions">
                    <button class="btn btn-secondary" onclick="location.reload()">Coba Lagi</button>
                    <a href="../index.html" class="btn btn-primary">Kembali ke Beranda</a>
                </div>
            </div>
        `;
  }
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', () => {
  if (typeof quizData !== 'undefined') {
    const quiz = new QuizEngine(quizData.lessonId, quizData.questions);
    quiz.init();
  }
});
