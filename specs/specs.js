describe('Game', function() {
  describe('initialize', function() {
    it("Sets player1 and 2 properties with empty score and empty sign", function() {
      var testGame = Object.create(Game);
      testGame.initialize("X","O");
      testGame.player1.sign.should.equal("X");
      testGame.player2.sign.should.equal("O");
    });
    it('Make sure it creates an empty board', function() {
      var testGame = Object.create(Game);
      testGame.initialize("X","O");
      testGame.currBoard.board.should.eql([[0,0,0],[0,0,0],[0,0,0]]);
    });
  });
  describe("newGame", function() {
    it("Should change the current player to 2 for start of the new game", function() {
      var testGame = Object.create(Game);
      testGame.initialize("X","O");
      testGame.newGame(2);
      testGame.currentPlayer.should.equal(2);
    });
    it("Clears the board on new game", function() {
      var testGame = Object.create(Game);
      testGame.initialize("X","O");
      testGame.newGame(1);
      testGame.currBoard.board.should.eql([[0,0,0],[0,0,0],[0,0,0]]);
    })
  });
  describe("move", function() {
    it("marks the spot", function() {
      var testGame = Object.create(Game);
      testGame.initialize("X","O");
      testGame.move("01");
      testGame.currBoard.board.should.eql([[0,"X",0],[0,0,0],[0,0,0]]);
    });
    it("switches to the next player's turn", function() {
      var testGame = Object.create(Game);
      testGame.initialize("X","O");
      testGame.move("01");
      console.log(testGame);
      testGame.currentPlayer.should.equal(2);
    });
  });
});

describe('Board', function() {
  describe('newBoard', function() {
    it("empties the tic tac toe board for next game", function() {
      var testBoard = Object.create(Board);
      testBoard.newBoard();
      testBoard.board.should.eql([[0,0,0],[0,0,0],[0,0,0]]);
    });
  });
  describe('mark', function() {
    it("changes a position on the board", function() {
      var testBoard = Object.create(Board);
      testBoard.newBoard();

      var player1 = Object.create(Player);
      player1.initialize("X");

      testBoard.mark(player1, "00");
      testBoard.board.should.eql([["X",0,0],[0,0,0],[0,0,0]]);
    });
  });
  describe('check', function() {
    it("checks for a winning board position (3 in a row)", function() {
      var testBoard = Object.create(Board);
      testBoard.board = [[0,0,0],["X","X","X"],[0,0,0]];
      testBoard.check().should.equal(true);
    });
    it("checks for winning board position (3 in a column)", function() {
      var testBoard = Object.create(Board);
      testBoard.board = [[0,"X",0],[0,"X",0],[0,"X",0]];
      testBoard.check().should.equal(true);
    });
    it("checks for winning board position (3 diagonally)", function() {
      var testBoard = Object.create(Board);
      testBoard.board = [["X",0,0],[0,"X",0],[0,0,"X"]];
      testBoard.check().should.equal(true);
    });
  });
});
