// Quiz Engine for Japanese N5 Learning Platform
class QuizEngine {
  constructor(lessonId, questions) {
    this.lessonId = lessonId;
    this.questions = questions;
    this.currentQuestion = 0;
    this.score = 0;
    this.answers = [];
    this.startTime = Date.now();
    this.isExam = lessonId === 'uts-midterm' || lessonId === 'uas-final';
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

    // For regular quizzes: always show romaji
    // For exams (UTS/UAS): hide romaji during questions
    const questionText = this.isExam ? question.question : addRomaji(question.question);
    const optionsHtml = question.options
      .map((option, index) => {
        const optionText = this.isExam ? option : addRomaji(option);
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

    // For exams: don't show feedback, just go to next or finish
    // For regular quizzes: show feedback
    if (this.isExam) {
      this.currentQuestion++;
      if (this.currentQuestion < this.questions.length) {
        this.renderQuestion();
        this.updateProgressBar();
      } else {
        // Exam finished - show review page with all answers
        this.showExamReview();
      }
    } else {
      // Regular quiz: show feedback
      this.showFeedback(isCorrect, question);
    }
  }

  showFeedback(isCorrect, question) {
    const container = document.getElementById('quiz-container');
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

    // Show romaji breakdown for wrong answers
    if (!isCorrect) {
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

  // Show exam review page with all questions and answers
  showExamReview() {
    const container = document.getElementById('quiz-container');
    const percentage = Math.round((this.score / this.questions.length) * 100);
    const passingScore = 80; // Exams require 80% to pass
    const passed = percentage >= passingScore;
    const timeSpent = Math.round((Date.now() - this.startTime) / 1000);
    const wrongCount = this.questions.length - this.score;

    // Save progress
    this.saveProgress(passed, percentage);

    let reviewContent = `
      <div class="exam-review-card">
        <div class="exam-review-header">
          <div class="review-icon ${passed ? 'passed' : 'failed'}">
            ${passed ? '🎉' : '📚'}
          </div>
          <h2 class="review-title">${passed ? 'Selamat! Ujian Selesai' : 'Ujian Selesai'}</h2>
          <p class="review-subtitle">${passed ? 'Anda telah lulus ujian!' : 'Terus semangat belajar!'}</p>
        </div>

        <div class="exam-score-section">
          <div class="score-circle ${passed ? 'passed' : 'failed'}">
            <span class="score-number">${percentage}%</span>
            <span class="score-label">${this.score}/${this.questions.length}</span>
          </div>
          <p class="passing-info">Nilai kelulusan: ${passingScore}%</p>
        </div>

        <div class="exam-stats">
          <div class="stat-item correct">
            <span class="stat-icon">✓</span>
            <span class="stat-label">Benar</span>
            <span class="stat-value">${this.score}</span>
          </div>
          <div class="stat-item wrong">
            <span class="stat-icon">✗</span>
            <span class="stat-label">Salah</span>
            <span class="stat-value">${wrongCount}</span>
          </div>
          <div class="stat-item time">
            <span class="stat-icon">⏱</span>
            <span class="stat-label">Waktu</span>
            <span class="stat-value">${timeSpent}d</span>
          </div>
        </div>

        <div class="exam-status ${passed ? 'passed' : 'failed'}">
          ${passed ? '✓ LULUS' : '✗ BELUM LULUS'}
        </div>
    `;

    // Show all questions with their answers if not passed
    if (!passed) {
      reviewContent += `
        <div class="all-questions-review">
          <h3 class="review-section-title">Review Jawaban:</h3>
          ${this.buildAllQuestionsReview()}
        </div>
      `;
    }

    reviewContent += `
        <div class="exam-actions">
          <button class="btn btn-secondary" onclick="location.reload()">
            <span class="material-symbols-outlined">replay</span>
            Coba Lagi
          </button>
          <a href="../index.html" class="btn btn-primary">
            <span class="material-symbols-outlined">home</span>
            Kembali ke Beranda
          </a>
        </div>
      </div>
    `;

    container.innerHTML = reviewContent;
  }

  // Build review for all questions
  buildAllQuestionsReview() {
    const letters = ['A', 'B', 'C', 'D'];
    let review = '';

    this.questions.forEach((question, index) => {
      const answer = this.answers[index];
      const isCorrect = answer.isCorrect;
      const userAnswer = letters[answer.selected];
      const correctAnswer = letters[answer.correct];

      review += `
        <div class="review-question-item ${isCorrect ? 'correct' : 'wrong'}">
          <div class="review-question-header">
            <span class="review-number">${index + 1}.</span>
            <span class="review-status">${isCorrect ? '✓' : '✗'}</span>
            <span class="review-question-text">${question.question}</span>
          </div>
          <div class="review-answer-details">
            <p class="your-answer ${isCorrect ? 'correct' : 'wrong'}">
              Jawaban Anda: <strong>${userAnswer}</strong> 
              ${isCorrect ? '(Benar)' : '(Salah)'}
            </p>
            ${!isCorrect ? `<p class="correct-answer">Jawaban Benar: <strong>${correctAnswer}</strong></p>` : ''}
            <div class="review-romaji">
              ${addRomaji(question.options[answer.correct])}
            </div>
            <p class="review-explanation">${question.explanation}</p>
          </div>
        </div>
      `;
    });

    return review;
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
        statusClass = 'correct-answer';
        statusIcon = '✓';
        reason = question.whyCorrect || 'Ini adalah jawaban yang tepat.';
      } else if (isSelected) {
        statusClass = 'wrong-selected';
        statusIcon = '✗';
        reason = question.whyWrong?.[index] || 'Jawaban ini tidak tepat untuk pertanyaan tersebut.';
      } else {
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
