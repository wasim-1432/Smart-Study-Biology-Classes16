// quiz.js — basic UI: navigation, timer, progress, auto-submit
document.addEventListener('DOMContentLoaded', () => {
  const cards = Array.from(document.querySelectorAll('.question-card'));
  const total = cards.length;
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');

  let current = 0;
  showCard(current);

  document.getElementById('nextBtn').addEventListener('click', () => {
    if (current < total - 1) { current++; showCard(current); }
  });
  document.getElementById('prevBtn').addEventListener('click', () => {
    if (current > 0) { current--; showCard(current); }
  });

  // explanation toggle
  document.querySelectorAll('.explainBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const exp = btn.nextElementSibling;
      if (exp.style.display === 'none' || !exp.style.display) { exp.style.display = 'block'; btn.textContent = 'Hide Explanation'; }
      else { exp.style.display = 'none'; btn.textContent = 'Show Explanation'; }
    });
  });

  // theme toggle
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  });

  function showCard(i){
    cards.forEach(c => c.classList.remove('active'));
    cards[i].classList.add('active');
    const pct = Math.round(((i+1)/total)*100);
    progressBar.style.width = pct + '%';
    progressText.textContent = `Question ${i+1} of ${total}`;
    // scroll to card on mobile
    cards[i].scrollIntoView({behavior:'smooth', block:'center'});
  }

  // Timer: configurable minutes
  const TEST_MINUTES = 20; // change as needed
  const timerEl = document.getElementById('timer');
  let timeLeft = TEST_MINUTES * 60; // seconds

  function updateTimer(){
    const m = Math.floor(timeLeft / 60).toString().padStart(2,'0');
    const s = (timeLeft % 60).toString().padStart(2,'0');
    timerEl.textContent = `Time: ${m}:${s}`;
    if (timeLeft <= 0) {
      // auto submit
      document.getElementById('quizForm').submit();
    }
    timeLeft--;
  }
  updateTimer();
  setInterval(updateTimer,1000);

  // share result — handled in result template using navigator.share

  // simple safeguard: warn user if they try to leave
  window.addEventListener('beforeunload', function (e) {
    // if test not submitted
    if (document.activeElement && document.activeElement.id !== 'submitBtn') {
      e.preventDefault();
      e.returnValue = '';
    }
  });

});