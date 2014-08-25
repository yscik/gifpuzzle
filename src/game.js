import Board from "./logic/board";
import Display from "./visual/display";

function Game()
{
    this.board = Board.create({x: 5, y: 4});
    this.display = new Display(this.board);
}

Game.create = function()
{
    return new Game();
};

Game.isOver = function()
{
  return this.board.groups.length === 1;
};

export default Game;
