
import Grab from "./grab";
import DisplayGroup from "./displayGroup";
import DisplayPiece from "./displayPiece";
import Position from "../logic/position";


function Display(board)
{
    this.PIECESIZE = 100;
    this.background = "https://31.media.tumblr.com/7c828dd2bb44f0f48e22e9a350f2c112/tumblr_n6hqg5gtX61s373hwo1_500.gif";

    this.board = board;
    this.setup();
    
    this.grab = new Grab(this.container);
    
    this.grab.on.released = this.elementMoved.bind(this);
}

Display.prototype.setup = function setupDisplay()
{
    this.groups = [];
    this.pieces = [];
    
    this.container = document.getElementById('container');
    while (this.container.hasChildNodes()) {
        this.container.removeChild(this.container.lastChild);
    }
    
    this.board.groups.forEach(this.createGroup.bind(this));
};

Display.prototype.createGroup = function createGroup(group)
{
    var dg = new DisplayGroup(group, this);
    
    this.container.appendChild(dg.element);
    
    group.pieces.forEach(function(piece)
    {
        dg.addPiece(this.createPiece(piece));    
    }.bind(this));
    
    this.groups.push(dg);
    
    return dg;
};

Display.prototype.removeGroup = function removeGroup(group)
{
    //this.container.removeChild(group.element);
}

Display.prototype.updateGroups = function updateGroups()
{
    this.groups.forEach(function(group) 
    { 
        group.updatePieces(); 
        group.updatePosition();
    });
};

Display.prototype.getDisplayPiece = function getDisplayPiece(piece)
{
    for(var pi = 0; pi < this.pieces.length; pi++)
        if(this.pieces[pi].piece == piece) return this.pieces[pi];
};

Display.prototype.createPiece = function createPieceElement(piece)
{
    var dp = new DisplayPiece(piece, this);
    
    this.pieces.push(dp);
    
    return dp;
};

Display.prototype.updateBackground = function()
{
    
};

Display.prototype.elementMoved = function(groupElement, position)
{
    var group = DisplayGroup.get(groupElement);
    group.group.updatePosition(mapCssPosition.call(this, position));

    group.group.attachNewNeighbors();
    this.updateGroups();

    function mapCssPosition(cssPos) {
      return Position.create(
      Math.round(cssPos.x / this.PIECESIZE),
      Math.round(cssPos.y / this.PIECESIZE));
    }
    
};

export default Display;