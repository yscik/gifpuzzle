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
    
    var directionPairs = [['top','bottom'], ['left', 'right']];
    for(var dpi in directionPairs)
    {
        var directionPair = directionPairs[dpi];
        for(var d in  directionPair)
        {
            var pair = d ? 1 : 0;
            var dir = directionPair[d];
            this.edges[dir] = neighborsMap[dir] ? neighborsMap[dir].edges[directionPair[pair]] : Edge.generate();
            console.log('[Edge]', this.id, dir, neighborsMap[dir] ? neighborsMap[dir].id + " " + directionPair[pair] : "new");
        }
    }
}


export default Piece;