export default 
{
    create: function createPosition(x,y) { 
        return {x: x, y: y};
    },
    
    isEqual: function isPositionEqual(pos1, pos2) {
        return pos1.x == pos2.x && pos1.y == pos2.y;
    },
    
    arePiecesMatching: function arePiecesMatching(pieceA, pieceB)
    {
        var diff = {x: pieceA.correctPosition.x - pieceB.correctPosition.x, 
                    y: pieceA.correctPosition.y - pieceB.correctPosition.y, };
        var res = (diff.y == 0 && (diff.x == 1 || diff.x == -1) && pieceA.currentPosition.x - pieceB.currentPosition.x == diff.x)
            || (diff.x == 0 && (diff.y == 1 || diff.y == -1) && pieceA.currentPosition.y - pieceB.currentPosition.y == diff.y);
        
        console.log('[Match]', res, pieceA.id, pieceB.id, pieceA.currentPosition, pieceB.currentPosition);
        
        return res;
        
    }
};