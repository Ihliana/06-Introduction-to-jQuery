$(document).ready(function(){

  let game = $("#game")

  //show reset button
  function resetBtn(rollB, resetB){
    rollB.css("display", "none")
    resetB.css("display", "block")
  }


//main game
$("#btn").on("click", function(){

    //set the number of players
    let nmbOfPlayers = Number($("input").val())

    while(!([2,3].includes(nmbOfPlayers))){
      if (nmbOfPlayers > 3){
        nmbOfPlayers  = +prompt("The number of players you set is too high")
      } else if (nmbOfPlayers < 2){
        nmbOfPlayers  = +prompt("The number of players you set is too low")

      }

    }

    //we playe the game
    $("#intro").hide()
    game.show()

    game.css({display: "flex",
                width: "80%",
                margin: "0 auto",
                fontFamily: "sans-serif"
              })

      //which player's Turn
      let message = $("#player")
      message.css({margin: "1em auto",
                        color: "#fff",
                      fontSize: "3rem"})


      //different players
      game.after($("<div/>", {id: "players"}))
      let players = $("#players")
      players.css({display: "flex", width: "80%", margin: "1em auto"})

      for (let i = 0; i < nmbOfPlayers; i++){

        players.append($("<div/>", {id: `player${i+1}`}))

      }//for loop end

      //creating buttons

      players.after($("<button/>", {id: "resetGame"}).text("Reset Game"))
      players.after($("<button/>", {id: "rollDice"}).text("Roll Dice"))

      //catching buttons
      rollingB = $("#rollDice")
      resetB = $("#resetGame")


      if (nmbOfPlayers === 2){
            $("#players").children().css({width: "49%", textAlign: "center"})

            $("#player1").append("<h1>Score: <span id='player1Score'>0<span></h1>")
            $("#player1").append("<div id='player1Dice' class='dice active'>-</div>")


            $("#player2").append("<h1>Score: <span id='player2Score'>0<span></h1>")
            $("#player2").append("<div id='player2Dice' class='dice'>-</div>")

            $("#player1 h1").add($("#player2 h1")).css({color: "#fff", fontSize: "3rem;"})



      } else if (nmbOfPlayers === 3){

        //creating the html visuals for players
            $("#players").children().css({width: "33%", textAlign: "center"})

            $("#player1").append("<h1>Score: <span id='player1Score'>0<span></h1>")
            $("#player1").append("<div id='player1Dice' class='dice active'>-</div>")


            $("#player2").append("<h1>Score: <span id='player2Score'>0<span></h1>")
            $("#player2").append("<div id='player2Dice' class='dice'>-</div>")

            $("#player3").append("<h1>Score: <span id='player3Score'>0<span></h1>")
            $("#player3").append("<div id='player3Dice' class='dice'>-</div>")

            $("#player1 h1").add($("#player2 h1")).add($("#player3 h1")).css({color: "#fff", fontSize: "3rem;"})

      }

      //get the player's stats
      let pl1Score =  $("#player1Score")
      let pl1Dice = $("#player1Dice")

      let pl2Score =  $("#player2Score")
      let pl2Dice = $("#player2Dice")

      let pl3Score =  $("#player3Score")
      let pl3Dice = $("#player3Dice")

      let player1Score = 0
      let player2Score = 0
      let player3Score = 0
      let player1Turn = true


      if (nmbOfPlayers === 2) {

        //two players logic
        rollingB.on("click", function(){
          //random dice number
          let rndNmber = Math.floor(Math.random() * 6) + 1


          if (player1Turn){

            pl1Dice.text(rndNmber)
            pl1Dice.removeClass("active")
            pl2Dice.addClass("active")
            message.text("Player 2 Turn")

            player1Score += rndNmber
            pl1Score.text(player1Score)
            player1Turn = false


          } else {

            pl2Dice.text(rndNmber)
            pl2Dice.removeClass('active')
            pl1Dice.addClass("active")
            message.text("Player 1 Turn")

            player2Score += rndNmber
            pl2Score.text(player2Score)
            player1Turn = true

          }



          if(player1Score >= 21){
            message.text("Player 1 has won this round!")
            resetBtn(rollingB, resetB)
          } else if (player2Score >= 21){
            message.text("Player 2 has won this round!")
            resetBtn(rollingB, resetB)
          }


        }) //rolling function

            //rolling for two players
      } else if (nmbOfPlayers === 3){

        //three players logic
        rollingB.on("click", function(){
          //random dice number
          let rndNmber = Math.floor(Math.random() * 6) + 1


          if (player1Turn){

            pl1Dice.text(rndNmber)
            pl1Dice.removeClass("active")
            pl2Dice.addClass("active")
            message.text("Player 2 Turn")

            player1Score += rndNmber
            pl1Score.text(player1Score)
            player1Turn = false
            player2Turn = true


          } else if (player2Turn) {

            pl2Dice.text(rndNmber)
            pl2Dice.removeClass('active')
            pl3Dice.addClass("active")
            message.text("Player 3 Turn")

            player2Score += rndNmber
            pl2Score.text(player2Score)
            player1Turn = false
            player2Turn = false

          } else {

            pl3Dice.text(rndNmber)
            pl3Dice.removeClass('active')
            pl1Dice.addClass("active")
            message.text("Player 1 Turn")

            player3Score += rndNmber
            pl3Score.text(player3Score)

            player1Turn = true
          }



          if(player1Score >= 21){
            message.text("Player 1 has won this round!")
            resetBtn(rollingB, resetB)
          } else if (player2Score >= 21){
            message.text("Player 2 has won this round!")
            resetBtn(rollingB, resetB)
          } else if (player3Score >= 21){
            message.text("Player 3 has won this round!")
            resetBtn(rollingB, resetB)
          }

        }) //rolling function


      }



      //reset function
      resetB.on("click", function(){
        reset()
      })


    function reset(){
        player1Score = 0
        player2Score = 0
        player3Score = 0
        player1Turn = true

        message.text("Player 1 Turn")
        pl1Dice.text("-").addClass("active")
        pl2Dice.text("-").removeClass('active')
        pl3Dice.text("-").removeClass('active')

        pl1Score.text(0)
        pl2Score.text(0)
        pl3Score.text(0)

        rollingB.css("display", "block")
        resetB.css("display","none")

      }

  })//btn click end

})//ready end
