let total;
let timeRemaining;
let score;
let correct;
let missed;
let playing = false;
let option1 = document.createElement("button");
let option2 = document.createElement("button");
let option3 = document.createElement("button");
let option4 = document.createElement("button");
let opt = [option1, option2, option3, option4];


window.onload = GameStart();


function GameStart(){
    let game = document.querySelector("#game");

    let divTimer = document.createElement("div");
    divTimer.classList = "d-flex justify-content-between";
    game.appendChild(divTimer);

    let spanTimer = document.createElement("span");
    spanTimer.textContent = "30";
    spanTimer.id = "timer"
    spanTimer.classList = "fs-1"
    let spanScore = document.createElement("span");
    spanScore.textContent = "0";
    spanScore.id = "score"
    spanScore.classList = "fs-1"

    divTimer.appendChild(spanTimer)
    divTimer.appendChild(spanScore)

    let checkdefault = document.createElement("div")
    checkdefault.innerHTML = `<img src="media/wrong.png" alt=""></img>`
    checkdefault.id = "checkDefault";
    checkdefault.classList = "d-flex justify-content-end check me-xl-5 pe-xl-5"
    game.appendChild(checkdefault);
    

    let quest = document.createElement("div");
    quest.classList = "d-flex justify-content-evenly justify-content-sm-center mb-4"
    quest.id = "question";
    game.appendChild(quest);

    quest.insertAdjacentHTML("afterbegin", `<span class="h1 num mx-sm-3" id="spanX">1</span>
    <span class="h1 mx-sm-3 sign operator px-2 bg-warning" id="signDefault"><img src="media/minus.png"></span>
    <span class="h1 mx-sm-3 sign operator px-2 bg-info" id="Sign"><img src="media/minus.png"></span>
    <span class="h1 num mx-sm-3" id="spanY">1</span>
    <span class="h1 sign mx-sm-3">=</span>
    <span class="h1 num ans mx-sm-3" id="Total">3</span>`)
    let pinagpipilian = document.createElement("div");
    pinagpipilian.classList ="row";
    pinagpipilian.id = "pagpipilian";
    game.appendChild(pinagpipilian);


    for (let op = 0; op < opt.length; op++){
        opt[op].classList = "px-1 num col-6 col-sm-3 selection"
        opt[op].textContent = op;
        pinagpipilian.appendChild(opt[op])
    }

    let result = document.querySelector("#result");
    let gOver = document.createElement("div");
    gOver.id = "gameOver";
    gOver.classList = "row col-12";
    result.appendChild(gOver);

    gOver.insertAdjacentHTML("afterbegin",`<div class="row col-12">
    <span class="col-12">Result</span>
    <span class="col-6">Score</span>
    <span class="col-6" id="ScoreResult"> 100</span>
    <span class="col-6">Correct</span>
    <span class="col-6" id="Correct">20</span>
    <span class="col-6">Missed</span>
    <span class="col-6" id="Missed">15</span>
    <span class="col-6">Accuracy</span>
    <span class="col-6" id="Accuracy">20%</span>
    <span class="col-12"></i> <i class="fa-solid fa-house" id="home"></i></span>
    </div>`);

    let startGame =document.createElement("div");
    startGame.classList = "d-flex justify-content-center my-4"
    startGame.id = startGame;
    game.appendChild(startGame)

    startGame.insertAdjacentHTML("Afterbegin", `<button class="btn btn-start" id="start">CLICK TO START</button>`);
    
    invisible("checkDefault")
    hide("Sign");
    hide("result");
   
    let start = document.querySelector("#start");
    start.addEventListener("click", playGame);
    document.querySelector("#home").addEventListener("click", playAgain);

    
}

function playGame(){
    if(playing == true){
        location.reload()
    } else {
        playing = true;
        document.querySelector("#start").innerHTML = "RESTART THE GAME"
        score = 0;
        missed =0;
        accuracy = 0;
        correct= 0;
        document.querySelector("#score").innerHTML = score;
        timeRemaining = 30;
        countdown()
        generateNumber()
    }
}
function playAgain(){
    location.reload()
    playGame()
}

function generateNumber(){
    
    let sign = document.querySelector("#Sign img");
    let addSubs = ["add", "sub"];

    let addSub = addSubs[Math.floor(Math.random() * addSubs.length)];
    
    let answer = document.querySelector("#Total");
    
    invisible("Total")
    hide("signDefault")

    show("Sign")
    show("game");
    if (addSub === "add"){
        var num2 = Math.ceil(Math.random()*20);
        var num1 = Math.ceil(Math.random()*10);
        spanX. innerHTML = num1;
        spanY.innerHTML = num2;
        sign.src = "./media/plus.png"
        document.querySelector("#Sign").classList.replace("bg-warning", "bg-info")

        total = parseInt(num1) + parseInt(num2); 
    } else if (addSub === "sub"){
        var num1 = Math.ceil(Math.random()*20);
        var num2 = Math.ceil(Math.random()*20);
        document.querySelector("#Sign").classList.replace("bg-info", "bg-warning")
        sign.src = "./media/minus.png"
        if (num2 > num1){
            spanX.innerHTML = num2
            spanY.innerHTML = num1
            total = parseInt(num2) - parseInt(num1);
        } else {
            spanX.innerHTML = num1
            spanY.innerHTML = num2
            total = parseInt(num1) - parseInt(num2);
        }
    }
    answer.textContent = total


    var arr = [total];
    while(arr.length < 4){
        var r = Math.floor(Math.random() * 40) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
    }

    var choice = [];
    while(choice.length <4){
        var c = Math.floor(Math.random() * 4);
        if(choice.indexOf(c) === -1) choice.push(c);
    }

    

    let option = document.querySelectorAll(".selection");

    for (let ops = 0; ops < opt.length; ops ++ ){
        option[choice[ops]].innerHTML = arr[ops]
        opt[ops].addEventListener("click", clickAnswer)

    }
}


function clickAnswer(){
    let checkdefault = document.querySelector("#checkDefault img");
    
    if (playing === true){
        if (this.textContent === total.toString()){
            chooseRight(this);
            visible("checkDefault");
            visible("Total");
            this.style.color = "green"
            checkdefault.src = "./media/wrong.png"
            score = score + 10;
            console.log(score);
            correct = correct + 1;
            console.log(correct)
            document.querySelector("#score").innerHTML = score;
            document.querySelector("#score").style.color = "green";
            document.querySelector("#Total").style.color = "green"
            for(let o of opt){
                o.disabled = true;
                
            }
            
        } else{
            chooseWrong(this);
            visible("Total");
            checkdefault.src = "./media/check.png"
            visible("checkDefault")
            this.style.color = "red"
            missed = missed + 1;
            console.log(missed);
            document.querySelector("#Total").style.color = "red"
            document.querySelector("#score").style.color = "black";
            for(let o of opt){
                o.disabled = true;
            }
        }
        setTimeout(function(){
            for(let o of opt){
            o.style.borderColor = "black";
            o.style.color = "black"
            o.disabled = false;
            }
            invisible("Total");
            invisible("checkDefault");
            generateNumber();
        }, 1000);
        console.log(total)
    }
  
}

function countdown(){
    let countdown = setInterval(function(){
        // if the time value is greater than zero
        if(timeRemaining>0){
            timeRemaining--;
            document.querySelector("#timer").innerHTML= timeRemaining
            if(timeRemaining< 11){
                document.querySelector("#timer").style.color = "red"
            }
         } else{
            //if time value is zero
            stopcountdown()
            show("result")
            let average = Math.round(correct/(parseInt(correct) + parseInt(missed)) * 100)
            document.querySelector("#ScoreResult").innerHTML = score.toString() 
            document.querySelector("#Correct").innerHTML = correct.toString();
            document.querySelector("#Missed").innerHTML = missed.toString();
            document.querySelector("#Accuracy").innerHTML = average.toString() +"%";
            if (score < 50){
                Red("ScoreResult")
            } else if (score < 75){
                Orange("ScoreResult")
            } else if (score < 90){
                Green("ScoreResult")
            } else if (score >= 90){
                Blues("ScoreResult")
            }
            if (correct < 7){
                Red("Correct")
            } else if (correct < 13){
                Orange("Correct")
            } else if (correct < 18){
                Green("Correct")
            } else if (correct >= 18){
                Blues("Correct")
            }
            if (missed < 1){
                Blues("Missed")
            } else if (missed < 5){
                Green("Missed")
            } else if (missed < 8 ){
                Orange("Missed")
            } else if (missed >= 8){
                Red("Missed")
            }
            if (average < 70){
                Red("Accuracy")
            } else if (average < 80){
                Orange("Accuracy")
            } else if (average < 95){
                Green("Accuracy")
            } else if (average >= 95){
                Blues("Accuracy")
            }
            hide("game")
            playing = false;
        }
        },1000);
        console.log(correct)
        console.log(score)
        console.log(missed)
        
}

function stopcountdown(){
    clearInterval(countdown)
  }


function show(id){
    document.getElementById(id).style.display="block"
}

function showFlex(id){
    document.getElementById(id).style.display = "flex"
}

function invisible(id){
    document.getElementById(id).style.visibility = "hidden"
}
function visible(id){
    document.getElementById(id).style.visibility = "visible"
}

function hide(id){
    document.getElementById(id).style.display="none"
}

function chooseRight(x){
    x.style.borderColor = "green";
}
function chooseWrong(x){
    x.style.borderColor = "Red";
}

function chooseDefault(x){
    x.style.borderColor = "black";
}
function Blues(id){
    document.getElementById(id).style.color = "blue"
}

function Green(id){
    document.getElementById(id).style.color = "green"
}

function Orange(id){
    document.getElementById(id).style.color = "orange"
}

function Red(id){
    document.getElementById(id).style.color ="red"
}















