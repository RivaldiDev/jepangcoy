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

    // For regular quizzes: always show romaji
    // For exams (UTS/UAS): hide romaji during questions
    const questionText = isExam ? question.question : addRomaji(question.question);
    const optionsHtml = question.options
      .map((option, index) => {
        const optionText = isExam ? option : addRomaji(option);
        return `
        <button class="option-btn" data-index="${index}">
          <span class="option-letter">${String.fromCharCode(65 + index)}</span>
          <span class="option-text">${optionText}</span>
        </button>
      `;
      })
      .join('');

    container.innerHTML = `
      <div class="question-card">
        <div class="question-header">
          <span class="question-number">Pertanyaan ${this.currentQuestion + 1} dari ${this.questions.length}</span>
        </div>
        <h3 class="question-text">${questionText}</h3>
        <div class="options-container">
          ${optionsHtml}
        </div>
      </div>
    `;

    // Add click handlers
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', e => this.handleAnswer(e));
    });
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
    const selectedAnswer = this.answers[this.answers.length - 1].selected;

    let feedbackContent = `
      <div class="feedback-card ${isCorrect ? 'correct' : 'incorrect'}">
        <div class="feedback-icon">
          ${isCorrect ? '✓' : '✗'}
        </div>
        <h3 class="feedback-title">${isCorrect ? 'Benar!' : 'Salah'}</h3>
    `;

    // Show detailed answer breakdown
    feedbackContent += `
      <div class="feedback-answers-breakdown">
        <h4 class="breakdown-title">Analisis Jawaban:</h4>
        ${this.buildAnswerBreakdown(question, selectedAnswer, isCorrect)}
      </div>
    `;

    // For exams: show romaji breakdown after wrong answer
    // For regular quizzes: always show romaji in feedback
    if (!isCorrect && isExam) {
      // Exams: only show romaji after wrong answer
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
    } else if (!isExam && !isCorrect) {
      // Regular quizzes when wrong: show romaji breakdown
      feedbackContent += `
        <div class="feedback-romaji-section">
          <p class="romaji-label">Jawaban yang benar:</p>
          <div class="feedback-answer-with-romaji">
            ${addRomaji(question.options[question.correct])}
          </div>
        </div>
      `;
    }

    feedbackContent += `
        <div class="feedback-explanation-box">
          <h4>Penjelasan:</h4>
          <p>${question.explanation}</p>
        </div>
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

  // Build detailed answer breakdown showing why each option is correct or wrong
  buildAnswerBreakdown(question, selectedIndex, isCorrect) {
    const letters = ['A', 'B', 'C', 'D'];
    let breakdown = '';

    question.options.forEach((option, index) => {
      const letter = letters[index];
      const isSelected = index === selectedIndex;
      const isTheCorrectAnswer = index === question.correct;

      let statusClass = '';
      let statusIcon = '';
      let reason = '';

      if (isTheCorrectAnswer) {
        // This is the correct answer
        statusClass = 'correct-answer';
        statusIcon = '✓';
        reason = question.whyCorrect || 'Ini adalah jawaban yang tepat.';
      } else if (isSelected) {
        // User selected this but it's wrong
        statusClass = 'wrong-selected';
        statusIcon = '✗';
        reason = question.whyWrong?.[index] || 'Jawaban ini tidak tepat untuk pertanyaan tersebut.';
      } else {
        // Not selected and not correct
        statusClass = 'other-option';
        statusIcon = '○';
        reason = question.whyWrong?.[index] || 'Bukan jawaban yang tepat.';
      }

      breakdown += `
        <div class="answer-item ${statusClass} ${isSelected ? 'selected' : ''}">
          <div class="answer-header">
            <span class="answer-letter ${statusClass}">${letter}</span>
            <span class="answer-status-icon">${statusIcon}</span>
            <span class="answer-text">${option}</span>
          </div>
          <div class="answer-reason">
            <span class="reason-label">${isTheCorrectAnswer ? '✓ Benar:' : isSelected ? '✗ Salah:' : '○'}</span>
            <span class="reason-text">${reason}</span>
          </div>
        </div>
      `;
    });

    return breakdown;
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
