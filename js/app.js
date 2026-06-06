const questions = [
  {
    id: 1,
    question: "زبانی برای ساختاردهی محتوای صفحات وب",
    answer: "HTML",
    score: 1,
  },
  {
    id: 2,
    question: "زبان طراحی ظاهر و رنگ‌بندی سایت",
    answer: "CSS",
    score: 2,
  },
  {
    id: 3,
    question:
      "زبانی که به صفحات وب حرکت و تعامل (مانند کلیک، انیمیشن) اضافه می‌کند(مخفف)",
    answer: "JS",
    score: 3,
  },
  {
    id: 4,
    question:
      "محبوب ترین نرم‌افزاری که برنامه‌نویسان که در آن برنامه نویسی میکنند",
    answer: "VSCODE",
    score: 1.5,
  },
  {
    id: 5,
    question: "فرمت داده سبک برای تبادل بین سرور و کلاینت",
    answer: "JSON",
    score: 2.5,
  },
  {
    id: 6,
    question: "محبوب ترین فریم ورک جاوا اسکریپت",
    answer: "REACT",
    score: 2,
  },
  {
    id: 7,
    question: "زبانی برای برنامه‌نویسی سمت سرور که توسط راسموس لردورف ساخته شد",
    answer: "PHP",
    score: 3,
  },
  {
    id: 8,
    question:
      "نرم‌افزاری که تغییرات کد را مدیریت می‌کند و تیم‌ها از آن استفاده می‌کنند",
    answer: "GIT",
    score: 2,
  },
  {
    id: 9,
    question: "قالبی برای پاسخگو کردن وب‌سایت در موبایل، تبلت و دسکتاپ",
    answer: "RWD",
    score: 2,
  },
  {
    id: 10,
    question: "محبوب ترین فریمورک پایتون برای توسعه وب",
    answer: "DJANGO",
    score: 1,
  },
];

const nextQuestionBtn = document.querySelector(".next-btn");
const inputsContainer = document.querySelector("#inputs-container");
const nextBtn = document.querySelector("#next-btn");
const retryBtn = document.querySelector("#retry-btn");
const questionsContainer = document.querySelector("#questions-container");
const toastBox = document.querySelector("#toast-box");
const combinedWord = document.querySelector("#combined-word");
const scoreDisplay = document.querySelector("#score-display");
const gameOverModal = document.querySelector("#game-over-modal");
const restartGameBtn = document.querySelector("#restart-game-btn");
const livesContainer = document.querySelector("#lives-container");
const scoreModal = document.querySelector("#score-modal");
const modalContent = document.querySelector(".modal-content");
const modalRestartBtn = document.querySelector("#modal-restart-btn");

let currentQuestionIndex = 0;
let countQuestions = 1;
let chances = 3;
let answer = "";
let score = 0;
let toastInterval;

const restartGame = () => {
  currentQuestionIndex = 0;
  countQuestions = 1;
  chances = 3;
  answer = "";
  score = 0;
  scoreDisplay.innerHTML = "0";
  combinedWord.innerHTML = "";
  showQuestion();
  scoreModal.classList.remove("opacity-100", "pointer-events-auto");
  scoreModal.classList.add("opacity-0", "pointer-events-none");
  gameOverModal.classList.remove("modal-active");
  modalContent.classList.remove("scale-100");
  modalContent.classList.add("scale-90");
};

const showScore = () => (scoreDisplay.innerHTML = score);

const creatChances = () => {
  livesContainer.innerHTML = "";
  for (let i = 1; i <= chances; i++) {
    livesContainer.insertAdjacentHTML(
      "beforeend",
      `<svg
          class="w-7 h-7 text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)] transition-all"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
          />
      </svg>`,
    );
  }
};

const resetInput = () => {
  const otpInputs = document.querySelectorAll(".word-input");
  otpInputs.forEach((input) => {
    input.value = "";
  });
  combinedWord.innerHTML = "";
};

const creatInputsAnswer = () => {
  inputsContainer.innerHTML = "";
  const countInput = questions[currentQuestionIndex];
  const countLengthAnswer = countInput.answer.length;
  for (let i = 1; i <= countLengthAnswer; i++) {
    inputsContainer.insertAdjacentHTML(
      "beforeend",
      `<input
          type="text"
          maxlength="1"
          class="word-input w-12 h-14 md:w-14 md:h-16 bg-slate-950/80 border-2 border-slate-600 rounded-xl text-center text-2xl font-black uppercase text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all shadow-inner"
        />`,
    );
  }
};

const showQuestion = () => {
  questionsContainer.innerHTML = "";
  const mainQuestion = questions[currentQuestionIndex];
  questionsContainer.insertAdjacentHTML(
    "beforeend",
    `<div
          class="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-amber-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full px-4 py-1.5 mb-4 shadow-lg"
        >
          <span
            id="question-counter"
            class="text-blue-400 text-xs font-bold tracking-wide"
            >سوال ${countQuestions} از ${questions.length}</span
          >

          <div class="w-px h-4 bg-blue-500/30"></div>

          <div class="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-4 h-4 text-amber-400"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-amber-400/80 text-[11px] font-bold"
              >امتیاز سوال:</span
            >
            <span
              id="question-score-value"
              class="text-amber-400 font-black text-sm bg-amber-500/20 px-2 py-0.5 rounded-full transition-all duration-200 inline-block"
              >${mainQuestion.score}</span
            >
          </div>
        </div>

        <h2
          id="question-text"
          class="text-2xl md:text-3xl font-extrabold text-white leading-tight"
        >
          ${mainQuestion.question}
        </h2>`,
  );
  answer = mainQuestion.answer;
  creatInputsAnswer();
  optValue();
  creatChances();
};

const optValue = () => {
  const otpInputs = document.querySelectorAll(".word-input");

  const updateCombinedWord = () => {
    let word = "";
    otpInputs.forEach((input) => {
      word += input.value.toUpperCase();
    });
    combinedWord.innerHTML = word;
  };

  otpInputs.forEach((input, index) => {
    input.addEventListener("input", (event) => {
      const { target } = event;

      let cleanValue = target.value.replace(/[^A-Za-z]/g, "");

      if (cleanValue.length > 1) {
        cleanValue = cleanValue.slice(-1);
      }

      target.value = cleanValue.toUpperCase();

      if (target.value.length && index + 1 < otpInputs.length) {
        otpInputs[index + 1].focus();
      }

      updateCombinedWord();
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Backspace") {
        if (input.value === "" && index > 0) {
          otpInputs[index - 1].focus();
          otpInputs[index - 1].value = "";
        } else {
          input.value = "";
        }
        updateCombinedWord();
      }
    });
  });
};

const showNextQuestion = () => {
  const wordInputs = document.querySelectorAll(".word-input");
  const allFilled = Array.from(wordInputs).every((input) => input.value !== "");
  if (allFilled) {
    let answerUser = "";
    Array.from(wordInputs).forEach((input) => {
      answerUser += input.value.toUpperCase();
    });
    if (answerUser === answer) {
      if (currentQuestionIndex + 1 === questions.length) {
        score += questions[currentQuestionIndex].score;
        showScoreModal();
      } else {
        const prevQuestion = questions[currentQuestionIndex];
        score += prevQuestion.score;
        currentQuestionIndex++;
        countQuestions++;
        showQuestion();
        successToastBox();
        showScore();
        resetInput();
      }
    } else {
      if (chances - 1 > 0) {
        chances--;
        score -= 4;
        warningToastBox("جواب اشتباه است!");
        resetInput();
        creatChances();
      } else {
        gameOverModal.classList.add("modal-active");
      }
    }
  } else {
    warningToastBox("لطفاً همه باکس‌ها رو پر کنید!");
  }
};

const warningToastBox = (text) => {
  toastBox.innerHTML = "";
  toastBox.insertAdjacentHTML(
    "beforeend",
    `<div class="w-8 h-8 rounded-full flex items-center justify-center bg-red-500/20 text-red-400 shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
    </div>
    
    <span id="toast-message" class="text-sm font-medium text-slate-200">${text}</span>

    <div class="absolute bottom-0 left-0 w-full h-1 bg-slate-700/50">
        <div id="toast-progress" class="h-full bg-red-500 w-full"></div>
    </div>`,
  );
  toastBox.classList.add("toast-enter");
  setTimerToToast();
};

const successToastBox = () => {
  toastBox.innerHTML = "";
  toastBox.insertAdjacentHTML(
    "beforeend",
    `<div class="w-8 h-8 rounded-full flex items-center justify-center bg-emerald-500/20 text-emerald-400 shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
    </div>
    
    <span id="toast-message" class="text-sm font-medium text-slate-200">آفرین! کلمه رو درست حدس زدی.</span>

    <div class="absolute bottom-0 left-0 w-full h-1 bg-slate-700/50">
        <div id="toast-progress" class="h-full bg-emerald-500 w-full"></div>
    </div>`,
  );
  toastBox.classList.add("toast-enter");
  setTimerToToast();
};

const setTimerToToast = () => {
  let progressSteps = 0;
  const toastProgress = document.querySelector("#toast-progress");

  clearInterval(toastInterval);

  toastInterval = setInterval(() => {
    progressSteps++;
    toastProgress.style.width = `${progressSteps}%`;
    if (progressSteps > 105) {
      toastProgress.style.width = "1%";
      toastBox.classList.remove("toast-enter");
      clearInterval(toastInterval);
    }
  }, 25);
};

const showScoreModal = () => {
  document.getElementById("final-score").textContent = score;

  const feedbackTag = document.getElementById("score-feedback");
  if (score >= 15) {
    feedbackTag.textContent = "فوق‌العاده بود!";
    feedbackTag.className =
      "mt-4 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full inline-block";
  } else {
    feedbackTag.textContent = "بیشتر تلاش کن!";
    feedbackTag.className =
      "mt-4 text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full inline-block";
  }

  scoreModal.classList.remove("opacity-0", "pointer-events-none");
  scoreModal.classList.add("opacity-100", "pointer-events-auto");
  modalContent.classList.remove("scale-90");
  modalContent.classList.add("scale-100");
};

const enterShowQuestion = (event) => {
  if (event.key === "Enter") {
    const isGameOverOpen = gameOverModal.classList.contains("modal-active");
    const isScoreModalOpen = scoreModal.classList.contains("opacity-100");

    if (!isGameOverOpen && !isScoreModalOpen) {
      showNextQuestion();
    }
  }
};

window.addEventListener("load", showQuestion);
window.addEventListener("keydown", enterShowQuestion);
nextBtn.addEventListener("click", showNextQuestion);
restartGameBtn.addEventListener("click", restartGame);
retryBtn.addEventListener("click", restartGame);
modalRestartBtn.addEventListener("click", restartGame);
