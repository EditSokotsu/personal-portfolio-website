/* 
@AUTH: EditSokotsu
@PROJ: Quiz Game Webpage
@COMM: this page implements the interativity of the quiz game.

@TODO:  - disable next button on question 10
        - disable finish button until question 10
        - finish button doesn't work in some cases -> handle last question?
<--------------------------------------------------------------------->
        - start screen -> name -> player data object
        - storing profile names -> localStorage profile objects
        - leaderboard feature
        - randomize options
*/

const readyScreen = document.getElementById("ready-screen")
const mainGameScreen = document.getElementById("main-game-screen")
const finishScreen = document.getElementById("finish-screen")

const playerNameOutput = document.getElementById("player-name");
const questionNumberOutput = document.getElementById("question-number");
const playerScoreOutput = document.getElementById("score");
const finalScoreOutput = document.getElementById("final-score")
const quizQuestion = document.getElementById("question-container");
const answer = document.querySelectorAll("input[name='option'")
const answerLabel = document.querySelectorAll(".answer")
const submitBtn = document.getElementById("player-name-submit-btn")
const startBtn = document.getElementById("start-game-btn")
const prevBtn = document.getElementById("prev-btn")
const nextBtn = document.getElementById("next-btn")
const finishBtn = document.getElementById("finish-btn")
const endMsg = document.getElementById("end-msg")
const playAgainBtn = document.getElementById("play-again-btn")
const quitBtn = document.getElementById("quit-btn")

//stores the player profiles in localStorage
const playerData = []

const playerProfile = {
    name: "",
    score: null
}

let questionNumber = 1
let score = 0
let playerName = ""

const questionBank = [
    {
        question: "How many totems exist in the Shona culture?",
        optionA: "25",
        optionB: "5",
        optionC: "19",
        optionD: "7",
        answer: "25"
    },

    {
        question: "How many days makes a week ?",
        optionA: "10 days",
        optionB: "14 days",
        optionC: "5 days",
        optionD: "7 days",
        answer: "7 days"
    },

    {
        question: "How many players are allowed on a soccer pitch ?",
        optionA: "10 players",
        optionB: "11 players",
        optionC: "9 players",
        optionD: "12 players",
        answer: "11 players"
    },

    {
        question: "Who was the first President of USA ?",
        optionA: "Donald Trump",
        optionB: "Barack Obama",
        optionC: "Abraham Lincoln",
        optionD: "George Washington",
        answer: "George Washington"
    },

    {
        question: "30 days has ______ ?",
        optionA: "January",
        optionB: "December",
        optionC: "June",
        optionD: "August",
        answer: "June"
    },

    {
        question: "How manay hours can be found in a day ?",
        optionA: "30 hours",
        optionB: "38 hours",
        optionC: "48 hours",
        optionD: "24 hours",
        answer: "24 hours"
    },

    {
        question: "Which is the longest river in the world ?",
        optionA: "River Nile",
        optionB: "Long River",
        optionC: "River Niger",
        optionD: "Lake Chad",
        answer: "River Nile"
    },

    {
        question: "_____ is the hottest Continent on Earth ?",
        optionA: "Oceania",
        optionB: "Antarctica",
        optionC: "Africa",
        optionD: "North America",
        answer: "Africa"
    },

    {
        question: "Which country is the largest in the world ?",
        optionA: "Russia",
        optionB: "Canada",
        optionC: "Africa",
        optionD: "Egypt",
        answer: "Russia"
    },

    {
        question: "Which of these numbers is an odd number ?",
        optionA: "Ten",
        optionB: "Twelve",
        optionC: "Eight",
        optionD: "Eleven",
        answer: "Eleven"
    },

    {
        question: `"You Can't see me" is a popular saying by`,
        optionA: "Eminem",
        optionB: "Bill Gates",
        optionC: "Chris Brown",
        optionD: "John Cena",
        answer: "John Cena"
    },

    {
        question: "Where is the world tallest building located ?",
        optionA: "Africa",
        optionB: "California",
        optionC: "Dubai",
        optionD: "Italy",
        answer: "Dubai"
    },

    {
        question: "The longest river in the United Kingdom is ?",
        optionA: "River Severn",
        optionB: "River Mersey",
        optionC: "River Trent",
        optionD: "River Thames",
        answer: "River Severn"
    },


    {
        question: "How many permanent teeth does a dog have ?",
        optionA: "38",
        optionB: "42",
        optionC: "40",
        optionD: "36",
        answer: "42"
    },

    {
        question: "Which national team won the football World cup in 2018 ?",
        optionA: "England",
        optionB: "Brazil",
        optionC: "Germany",
        optionD: "France",
        answer: "France"
    },

    {
        question: "Which US state was Donald Trump Born ?",
        optionA: "New York",
        optionB: "California",
        optionC: "New Jersey",
        optionD: "Los Angeles",
        answer: "New York"
    },

    {
        question: "How man states does Nigeria have ?",
        optionA: "24",
        optionB: "30",
        optionC: "36",
        optionD: "37",
        answer: "36"
    },

    {
        question: "____ is the capital of Nigeria ?",
        optionA: "Abuja",
        optionB: "Lagos",
        optionC: "Calabar",
        optionD: "Kano",
        answer: "Abuja"
    },

    {
        question: "Los Angeles is also known as ?",
        optionA: "Angels City",
        optionB: "Shining city",
        optionC: "City of Angels",
        optionD: "Lost Angels",
        answer: "City of Angels"
    },

    {
        question: "What is the capital of Germany ?",
        optionA: "Georgia",
        optionB: "Missouri",
        optionC: "Oklahoma",
        optionD: "Berlin",
        answer: "Berlin"
    },

    {
        question: "How many sides does an hexagon have ?",
        optionA: "Six",
        optionB: "Sevene",
        optionC: "Four",
        optionD: "Five",
        answer: "Six"
    },

    {
        question: "How many planets are currently in the solar system ?",
        optionA: "Eleven",
        optionB: "Seven",
        optionC: "Nine",
        optionD: "Eight",
        answer: "Eight"
    },

    {
        question: "Which Planet is the hottest ?",
        optionA: "Jupitar",
        optionB: "Mercury",
        optionC: "Earth",
        optionD: "Venus",
        answer: "Mercury"
    },

    {
        question: "where is the smallest bone in human body located?",
        optionA: "Toes",
        optionB: "Ears",
        optionC: "Fingers",
        optionD: "Nose",
        answer: "Ears"
    },

    {
        question: "How many hearts does an Octopus have ?",
        optionA: "One",
        optionB: "Two",
        optionC: "Three",
        optionD: "Four",
        answer: "Three"
    },

    {
        question: "How many teeth does an adult human have ?",
        optionA: "28",
        optionB: "30",
        optionC: "32",
        optionD: "36",
        answer: "32"
    }

];

const gameQuestions = []
const usedQuestionsIndexes = new Set()

/* 
@func: chooseQuestions()
@para: arr
@comm: the function populates an array with a subset of questions from the question bank. Each elemnt is choosen at random.
*/
function chooseQuestions(arr){
    let randNum = Math.floor(Math.random() * questionBank.length)
    
    while(arr.length < 10){
        if(usedQuestionsIndexes.has(randNum) || randNum > questionBank.length){
            randNum = Math.floor(Math.random() * questionBank.length)
        }
        else{
            arr[arr.length] = questionBank[randNum]
            usedQuestionsIndexes.add(randNum)
            arr.filter(lmnt => lmnt)
        }
    }
    return arr
}

/* 
@func: updateHUD()
@para: n/a
@comm: updates the HUD elements, namely the question number and score.
*/
const updateHUD = () => {
    questionNumberOutput.innerText = questionNumber
    playerScoreOutput.innerText = score
}


/* 
@func: getQuestion()
@para: n/a
@comm: writes a question and it's answer options to the DOM. This is meant to be done after the question number and score have been updated
*/
function getQuestion(){
    quizQuestion.innerText = gameQuestions[questionNumber-1].question
    answerLabel[0].innerText = gameQuestions[questionNumber-1].optionA
    answerLabel[1].innerText = gameQuestions[questionNumber-1].optionB
    answerLabel[2].innerText = gameQuestions[questionNumber-1].optionC
    answerLabel[3].innerText = gameQuestions[questionNumber-1].optionD
}

/* 
@func: checkAnswer()
@para: n/a
@comm: this function handles how the game determines a correct answer.
*/
function checkAnswer(){
    const correctAnswer = gameQuestions[questionNumber-1].answer

    //assigns the text of the answers' labels as the value of the input element. This enables us to compare the input's value to the correct answer directly. This due to the method in which the game is implemented visa vi the question objects.
    for(let i = 0; i < answer.length; i++){
        answer[i].value = `${answerLabel[i].innerText}`
    }

    //check to see if an answer is checked and correct
    for(let i = 0; i < answer.length; i++){
        if(answer[i].checked === true && answer[i].value === correctAnswer){
            score++
            questionNumber++
            return
        }
        else if(answer[i].checked === true && answer[i].value !== correctAnswer){ //case if it is checked and incorrect
            questionNumber++
            return
        }
    }
}

/* 
@comm: implements the next button. If no options are picked and the next button is clicked, an alert should ab
*/
nextBtn.addEventListener("click",() => {
    
    //check to see if an answer option is checked
    if(answer[0].checked === false && answer[1].checked === false && answer[2].checked === false && answer[3].checked === false){
        //print some error message [and return?]
        alert("Please select an option")
        return
    }
    else if(questionNumber <= 9){ //check if answer is correct for questions 1-9
        checkAnswer()
        updateHUD()
        answer.forEach((input) => {
            input.checked = false
        })
        //load next question
        setTimeout(getQuestion(), 100)
        return
    }
    else if(questionNumber == 10){
        checkAnswer()
        finishGame()
    }
})

function initGame(){
    chooseQuestions(gameQuestions)
    updateHUD()
    getQuestion()
}

function finishGame(){
    mainGameScreen.classList.add("hidden")
    finishScreen.classList.remove("hidden")
    finalScoreOutput.innerText = score

    if(score === 10){
        endMsg.innerText = `Excellent, you're a real brain box!`
    }
    else if(score < 10 && score >= 7){
        endMsg.innerText = `Well done. There's always room for improvement, but good show old sport!`
    }
    else if(score < 7 && score >= 5){
        endMsg.innerText = `Nice try, you got a ways to go though.`
    }
    else if(score <= 4 && score >=3){
        endMsg.innerText = `You gotta read more Bucko. Get outside, touch grass, do something!`
    }
    else{
        endMsg.innerText = `Just...Wow. Try again.`
    }
    return
}

startBtn.addEventListener("click", () => {
    readyScreen.classList.add("hidden")
    mainGameScreen.classList.remove("hidden")
    answer.forEach((input) => {
        input.checked = false
    })
    setTimeout(initGame(), 2500)
})

playAgainBtn.addEventListener("click", () => {
    finishScreen.classList.add("hidden")
    questionNumber = 1
    score = 0
    mainGameScreen.classList.remove("hidden")
    answer.forEach((input) => {
        input.checked = false
    })
    initGame()
})

quitBtn.addEventListener("click", () => {
    answer.forEach((input) => {
        input.checked = false
    })
    finishScreen.classList.add("hidden")
    readyScreen.classList.remove("hidden")
})