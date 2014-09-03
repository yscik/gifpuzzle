import Position from "./position";
import Edge from "./edge";

function Piece(position)
{
    this.id = [position.x,'x',position.y].join("");
    this.correctPosition = position;
    this.currentPosition = Position.create(0,0);
    this.edges = {};
    
}

Piece.create = function(board, position)
{
    var p = new Piece(position);
    p.board = board;
    return p;
}

Piece.prototype.getNeighbors = function getNeighbors() {
    return this.board.getNeighbors(this.currentPosition);
}

Piece.prototype.updatePosition = function updatePosition(currentPosition) {
    this.currentPosition = currentPosition;
    this.board.updatePiecePosition(this);
}

Piece.prototype.createEdges = function createEdges(neighbors) {
    
    var neighborsMap = {};
    for(var n in neighbors) neighborsMap[neighbors[n].direction] = neighbors[n].piece;

  this.edges.top = neighborsMap.top ? neighborsMap.top.edges.bottom : Edge.flat;
  this.edges.left = neighborsMap.left ? neighborsMap.left.edges.right : Edge.flat;

  this.edges.right = neighborsMap.right ? Edge.flat : Edge.generate();
  this.edges.bottom = neighborsMap.bottom ? Edge.flat : Edge.generate();

}


export default Piece;