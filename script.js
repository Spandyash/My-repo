const questions = [
    {
        question: "What is the full form of internet?",
        answers: [
            { text: "Interconnected Network", correct: true},
            { text: "Internal Network", correct: false},
            { text: "International Network", correct: false},
            { text: "Interconnectional Network", correct: false},
        ]
    },
    {
        question: "Which is the father of Computers?",
        answers: [
            { text: "Charles Babbage", correct: true},
            { text: "James Gosling", correct: false},
            { text: "Dennis Ritchie", correct: false},
            { text: "Bjarne Shroustrup", correct: false},
        ]
    },
    {
        question: "Gmail is the example of?",
        answers: [
            { text: "Database Software", correct: false},
            { text: "Email service", correct: true},
            { text: "Application Software", correct: false},
            { text: "Accounting Software", correct: false},
        ]
    },
    {
        question: "What is the full form of CPU?",
        answers: [
            { text: "Controlled Process Unit", correct: false},
            { text: "Computer Principle Unit", correct: false},
            { text: "Computer Progress Unit", correct: false},
            { text: "Central Processing Unit", correct: true},
        ]
    },
    {
        question: "Which is the smallest unit of data in a computer?",
        answers: [
            { text: "Bit", correct: true},
            { text: "Byte", correct: false},
            { text: "Nibble", correct: false},
            { text: "KB", correct: false},
        ]
    },
    {
        question: "Which of the following can access the server?",
        answers: [
            { text: "User", correct: false},
            { text: "Web Client", correct: true},
            { text: "Web Browser", correct: false},
            { text: "Web Server", correct: false},
        ]
    },
    {
        question: "A process is a_____?",
        answers: [
            { text: "Task", correct: false},
            { text: "Signal thread of execution", correct: false},
            { text: "Program in the memory", correct: false},
            { text: "Program in the execution", correct: true},
        ]
    },
    {
        question: "Which of the following is an output device?",
        answers: [
            { text: "Keyboard", correct: false},
            { text: "Mouse", correct: false},
            { text: "Light Pen", correct: false},
            { text: "VDU", correct: true},
        ]
    },
    {
        question: "What is the mean of booting in the system?",
        answers: [
            { text: "Restarting", correct: true},
            { text: "Shutdown", correct: false},
            { text: "To scan", correct: false},
            { text: "Install the program", correct: false},
        ]
    },
    {
        question: "What is the full form of RAM?",
        answers: [
            { text: "Remote Access Memory", correct: false},
            { text: "Random Access Memory", correct: true},
            { text: "Read Acessing Module", correct: false},
            { text: "Ready Access memory", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = block;
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();