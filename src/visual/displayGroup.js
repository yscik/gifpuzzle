import {px} from "./utils";

function DisplayGroup(group, display)
{
    this.element = document.createElement('div');
    this.pieces = [];
    this.group = group;
    this.pieceSize = display.PIECESIZE;
    this.display = display;
    
    this.element.displayGroup = this;
    
    this.setup();
}

DisplayGroup.prototype.setup = function setupDisplayGroup()
{
    this.element.className = 'grab pieceGroup';
    this.element.style.transform = ['rotate(', Math.random()*10-5 ,'deg)'].join('')
    
    this.updatePosition();
}

DisplayGroup.prototype.updatePieces = function updatePiece()
{
    this.group.pieces.forEach(function(piece)
    {
        var dp = this.display.getDisplayPiece(piece);
        if(this.pieces.indexOf(dp) < 0)
            this.addPiece(dp);
    }.bind(this));
}

DisplayGroup.prototype.addPiece = function addPiece(displayPiece)
{
    this.element.appendChild(displayPiece.element);
    this.pieces.push(displayPiece);
    
    if(displayPiece.group) {
        displayPiece.group.removePiece(displayPiece);
    }
    displayPiece.group = this;
    displayPiece.updatePosition();
};

DisplayGroup.prototype.removePiece = function removePiece(displayPiece)
{
    this.pieces.splice(this.pieces.indexOf(displayPiece),1);
    if(!this.pieces.length) this.display.removeGroup(this);
};


DisplayGroup.get = function getFromElement(element) {
    return element.displayGroup;
};

DisplayGroup.prototype.updatePosition = function updatePosition()
{
    var cp = this.getCssPosition();
    this.element.style.left = cp.left;
    this.element.style.top = cp.top;
    
    this.updatePiecePositions();
}

DisplayGroup.prototype.updatePiecePositions = function updatePiecePositions()
{
    this.pieces.forEach(function(displayPiece)
    {
        displayPiece.updatePosition();
    })
}

DisplayGroup.prototype.getCssPosition = function getCssPosition()
{
    return { 
        left: px(this.pieceSize * this.group.currentPosition.x),
        top: px(this.pieceSize * this.group.currentPosition.y)
    }
}

export default DisplayGroup;