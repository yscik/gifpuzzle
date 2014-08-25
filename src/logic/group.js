import Position from "./position";
import Piece from "./piece";

function Group() {
    this.pieces = [];
    this.currentPosition = Position.create(0, 0);
}

Group.prototype.mergeGroup = function mergeGroup(group)
{
    group.pieces.slice(0).forEach(this.addPiece.bind(this));
}

Group.prototype.addPiece = function(piece)
{
    if(piece.group) piece.group.removePiece(piece);
    piece.group = this;

    this.pieces.push(piece);
    this.currentPosition.x = Math.min(this.currentPosition.x, piece.currentPosition.x);
    this.currentPosition.y = Math.min(this.currentPosition.y, piece.currentPosition.y);
};

Group.prototype.removePiece = function removePiece(piece)
{
    this.pieces.splice(this.pieces.indexOf(piece),1);
};

Group.prototype.updatePosition = function(position)
{
    var diff = Position.create(this.currentPosition.x - position.x, this.currentPosition.y - position.y);
    
    this.currentPosition = position;
    this.pieces.forEach(function(piece)
    {
        piece.updatePosition(Position.create(
            piece.currentPosition.x - diff.x,
            piece.currentPosition.y - diff.y
            ));
    });
};

Group.prototype.attachNewNeighbors = function()
{
    this.pieces.forEach(checkPieceNeighbors.bind(this));
    
    function checkPieceNeighbors(piece)
    {
        var neighbors = piece.getNeighbors();
        neighbors.forEach(checkMatch.bind(this, piece));

    }
        
    function checkMatch(piece, neighbor)
    {
        if(neighbor.piece.group != this && Position.arePiecesMatching(piece, neighbor.piece))
        {
            this.mergeGroup(neighbor.piece.group);
        }
    }
    
};



export default Group;