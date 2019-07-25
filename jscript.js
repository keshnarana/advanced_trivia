$(document).ready(function () {
    var options = [
        {
            question:  "Who is the current president of the United States of America?", 
            choice: ["Trump", "Jefferson", "Madison", "Obama"],
            answer: 0,
          pic: "https://media.giphy.com/media/2Y7vjKwsZ9tpBSuNL4/giphy.gif",
         },
        {
             question: "complete the  following: Big ______ theory", 
            choice: ["Scientific", "Caviar", "bang", "fat" ],
            answer: 2,
            pic: "https://media.giphy.com/media/Q8tXT1ERyOklG/giphy.gif",
        }, 
        {
            question: "What is the most widely eaten fish in the world?", 
            choice: ["Tilapia", "Herring", "Sardine", "Tuna" ],
            answer: 1,
            pic: "https://media.giphy.com/media/LP6aTy8LKALrlG9vpI/giphy.gif",
        }, 
        {
            question: "8 + 7 is how much?", 
            choice: ["12", "16", "24", "15" ],
            answer: 3,
            pic: "https://media3.giphy.com/media/26gJA9SSe4m54MYec/giphy.gif",
        }, 
        {
            question: "Which fruit does not ripen once it has been picked?", 
            choice: ["Banana", "Lemon", "Mango", "Apple" ],
            answer: 1,
            pic: "https://media.tenor.com/images/99a61ef9ddb3d4f71afb1b015830b01c/tenor.gif",
        }
       ];
    
    var TimeU = "https://media2.giphy.com/media/jaeVsQl5zGdIB51c6O/source.gif"   
    var wrongPic ="https://thumbs.gfycat.com/BlaringLimpingBluet-max-1mb.gif"
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 10;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    const SoundR = new Audio("party_horn-Mike_Koenig-76599891.mp3");
    const SoundW = new Audio("Buzzer-SoundBible.com-188422102.mp3");
    const SoundT = new Audio("Gavel Banging-SoundBible.com-264538562.mp3");
    
    
    $("#reset").hide();
    
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
       
       }
        )
   
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
   
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            TimeUp();
        }	

        function TimeUp(){
            SoundT.play();
            $("#answerblock").append("<img src=" + TimeU + ">");
            TimAgain();
        }
    
    }

   
    function stop() {
        running = false;
        clearInterval(intervalId);
    }

   
    function displayQuestion() {
     
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
   
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
              
                userChoice.attr("data-guess", i);
                $("#answerblock").append(userChoice);

    }
    
    
    
  
    $(".answerchoice").on("click", function () {
       
        userGuess = parseInt($(this).attr("data-guess"));
    
    
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
          
            $("#answerblock").html("<p>Correct!</p>");
            rightP();
    
        } else {
            stop();
            wrongCount++;
        $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
           wrongP();
        }
    })
    }
    
    function wrongP(){
        SoundW.play();
        $("#answerblock").append("<img src=" + wrongPic + ">");
        TimAgain();
    }

     
    function rightP(){
        SoundR.play();
        $("#answerblock").append("<img src=" + pick.pic + ">");
        TimAgain();
    }

    function TimAgain () {
   
        var again = setTimeout(function() {
            $("#answerblock").empty();
            timer= 10;
    
       
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h2>Game Over! </h2>");
            $("#answerblock").append("<h3> Correct: " + correctCount + "</h3>" );
            $("#answerblock").append("<h3> Incorrect: " + wrongCount + "</h3>" );
            $("#answerblock").append("<h3> Unanswered: " + unanswerCount + "</h3>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 2000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        runTimer();
        displayQuestion();
    
    })
    
    })