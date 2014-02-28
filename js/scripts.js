var Game = {

  initialize : function(player1Sign, player2Sign) {
    var player1 = Object.create(Player);
    player1.initialize(player1Sign);
    this.player1 = player1;

    var player2 = Object.create(Player);
    player2.initialize(player2Sign);
    this.player2 = player2;

    var currBoard = Object.create(Board);
    currBoard.newBoard();
    this.currBoard = currBoard;

    this.currentPlayer = 1;
  },

  nextPlayer: function() {
    if (this.currentPlayer == 1) {
      this.currentPlayer = 2;
    } else {
      this.currentPlayer = 1;
    }
  },

  move: function(buttonID) {
    if (this.currentPlayer === 1) {
      var player = this.player1;
    } else if (this.currentPlayer === 2) {
      var player = this.player2;
    }
    this.currBoard.mark(player, buttonID);
    
    if (this.currBoard.check()) {
      if (this.currentPlayer === 1) {
        this.player1.score += 1;
      } else {
        this.player2.score += 1;
      }
      console.log('We have a WINNAH!');
      console.log('Player 1\'s score is' + this.player1.score);
      console.log('Player 2\'s score is' + this.player2.score);
    }
    
    this.nextPlayer();
  },

  newGame: function() {
    this.currBoard.newBoard();
  },
  
};

var Board = {

  newBoard: function() {

    this.board = [[0,0,0],
                  [0,0,0],
                  [0,0,0]]
  },

  mark: function(player, buttonID) {
    this.board[buttonID[0]][buttonID[1]] = player.sign;
  },

  check: function() {

    for (var i = 0; i <= this.board.length - 1; i++) {
      var currRow = this.board[i].join("");
      if ((currRow === "XXX") || (currRow === "OOO")) {
        return true;
      }
    }

    var flatBoard = this.board[0].concat(this.board[1]).concat(this.board[2])

    for (var i = 0; i <= 2; i++) {
      if ((flatBoard[i] === flatBoard[i+3]) && (flatBoard[i+3] === flatBoard [i+6]) && (flatBoard[i] !== 0)){
        return true;
      }  
    }

    if ((flatBoard[0] === flatBoard[4]) && (flatBoard[4] === flatBoard [8]) && (flatBoard[0] !== 0)) {
        return true;   
   } else if ((flatBoard[2] === flatBoard[4]) && (flatBoard[4] === flatBoard [6]) && (flatBoard[2] !== 0)) {
        return true;  
   }

    return false;
    },

};

var Player = {

  initialize: function(sign) {
    this.sign = sign;
    this.score = 0;
  },
};

$(document).ready(function() {
   var currentGame = Object.create(Game);
   currentGame.initialize("X","O");

  $(".board button").click(function() {
    if (currentGame.currBoard.board[this.id[0]][this.id[1]] === 0) {
      if (currentGame.currentPlayer === 1) {
        $("#" + this.id).text("X");
      } else {
        $("#" + this.id).text("O");
      }
      currentGame.move(this.id);
      $("#player1").text("Player1's Score:" + parseInt(currentGame.player1.score));
      $("#player2").text("Player2's Score:" + parseInt(currentGame.player2.score));
    }
  });

  $("button#reset").click(function() {
    $(".board button").empty();
    currentGame.newGame();
  });

});
