
import Position from "./position";
import Group from "./group";
import Piece from "./piece";

function Board()
{
    this.size;
    this.groups = [];
    this.pieceMap = {};
}

Board.prototype.createPieces = function createPieces()
{
    var _b = this;

    for(var sx = 0; sx < this.size.x; sx++)
        for(var sy = 0; sy < this.size.y; sy++)
        {
            var piece = createPiece(sx, sy);
            this.pieceMap[getPositionIndex(piece.correctPosition)] = piece;
            
            piece.createEdges(this.getNeighbors(piece.correctPosition));
            
            createGroup().addPiece(piece);
        }

    function createPiece(x, y)
    {
        var piece = Piece.create(_b, Position.create(x, y));
        
        return piece;
    }
    
    function createGroup()
    {
        var group = new Group();
        _b.groups.push(group);
        
        return group;
    }
    
};

Board.prototype.shuffle = function shuffleGroups()
{
    this.pieceMap = [];

    this.groups.forEach(function (group)
    {
        var position;
        do
        {
          position = Position.create(Math.round(Math.random() * this.size.x), Math.round(Math.random() * this.size.y))
        } while (this.on(position));

        group.updatePosition(position);

    }.bind(this));
};

Board.prototype.on = function getPieceOnPosition(position)
{
  return this.pieceMap[getPositionIndex(position)];
}

Board.create = function createBoard(size)
{
    var b = new Board();
    b.size = size;
    b.createPieces();
    b.shuffle();
    return b;
};

Board.prototype.updatePiecePosition = function updatePiecePosition(piece)
{
    this.pieceMap[getPositionIndex(piece.currentPosition)] = piece;
};

Board.prototype.getNeighbors = function getPieceNeighbors(position)
{
    var directions = {
        "-1": {"0": 'left'},
        "1": {"0": 'right'},
        "0": {"-1": 'top',
            "1": 'bottom'}
    };
    
    var neighbors = [];
    for(var d = -1; d <= 1; d += 2)
    {
        checkPiece.call(this, d, 0);
        checkPiece.call(this, 0, d);
    }
    
    function checkPiece(x,y)
    {
        var neighbor = this.on(
            {x: position.x + x,
            y: position.y + y}
        );
        
        if(neighbor) neighbors.push({direction: directions[x][y], piece: neighbor});
    }

    return neighbors;
};

function getPositionIndex(pos) { return [pos.x, pos.y].join("_"); }

export default Board;