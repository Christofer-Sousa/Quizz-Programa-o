// Declaração variáveis
import  questions_list from "./questions.js"
let questions = questions_list;
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quiz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;



function init() {
      //Cria a primeira pergunta
      createQuestion(0);
}

  //Cria uma pergunta
function createQuestion(i) {
      //Limpar a questão anterior
    const oldButtons = answersBox.querySelectorAll("button")

    oldButtons.forEach(function(btn) {
        btn.remove();
    })

    //Alterar o texto da pergunta
    const questionText = question.querySelector("#question-text")
    const questionNumber = question.querySelector("#question-number")

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    //Insere as alternativas
   questions[i].answers.forEach(function(answer, i){

    //Cria o template do botão quizz
    const answerTemplate = document.querySelector(".answer-template").cloneNode(true)

    const letterBtn = answerTemplate.querySelector(".btn-letter")
    const answerText = answerTemplate.querySelector(".question-answer")

    letterBtn.textContent = letters[i]
    answerText.textContent = answer["answer"]

    answerTemplate.setAttribute("correct-answer", answer["correct"])

    answerTemplate.classList.remove("hide")
    answerTemplate.classList.remove("answer-template");

    answersBox.appendChild(answerTemplate)

    answerTemplate.addEventListener("click", function(){
        checkAnswer(this)
    })  
   })

   actualQuestion++;

}

//Verificando resposa do usuario
function checkAnswer(btn){

    const buttons = answersBox.querySelectorAll("button")

    buttons.forEach(function(button){

        if(button.getAttribute("correct-answer") === "true"){

            button.classList.add("correct-answer")

            if(btn === button){
                points++
            }
        } else{

            button.classList.add("wrong-answer")
        }
    })

    nextQuestion(); 
}

function nextQuestion(){

    setTimeout(function(){

        if(actualQuestion >= questions.length) {
            showSucccessMessage()
            return
        }

        createQuestion(actualQuestion)
    },800)
}

function showSucccessMessage(){
    quizzContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");

    const score = ((points / questions.length) * 100).toFixed(2)

    const displayScore = document.querySelector("#display-score span")

    displayScore.textContent = score.toString();

    const correctAnswers = document.querySelector("#correct-answers")
    correctAnswers.textContent = points;

    const totalQuestions = document.querySelector("#questions-qty");
    totalQuestions.textContent = questions.length;
}

const restartBtn = document.querySelector("#restart")

restartBtn.addEventListener("click", function(){

    actualQuestion = 0;
    points = 0;
    quizzContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
    init();

})

//Inicialização do quizz
init();


