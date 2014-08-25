import {px} from "./utils";
import DisplayGroup from "./displayGroup";
import Mask from "./mask";

function DisplayPiece(piece, display)
{
    this.size = display.PIECESIZE;
    this.element = document.createElement("div");
    
    this.piece = piece;
    this.group = null;
    this.mask = new Mask(piece);
    
    this.display = display;
    
    this.element.displayPiece = this;
    
    this.setup(display.background);
}

DisplayPiece.prototype.setup = function setupDisplayPiece(background)
{
    this.element.className = 'piece';
    this.element.setAttribute("title", this.piece.id);

    this.element.style.backgroundPosition = getBackgroundPosition.call(this, this.piece.correctPosition.x, this.piece.correctPosition.y);

    this.element.style.width = px(this.size);
    this.element.style.height = px(this.size);

    if (background)
    {    
        this.element.style.backgroundImage = url(background);
    }

    var clipPath = "polygon("+this.mask.createCssPathString()+')';

    this.element.style.clipPath = url("#mask"+this.piece.id);
    this.element.style.MozClipPath = url("#mask"+this.piece.id);
    this.element.style.WebkitClipPath = clipPath;
    
    this.display.container.appendChild(createSvgElement.call(this));

    function getBackgroundPosition(left, top) {
        return ["-", px(this.size * left), " -", px(this.size * top)].join("");
    }
    
    function url(value)
    {
        return ['url(', value, ')'].join("");
    }
    
    function createSvgElement()
    {
        var svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
        var defs = document.createElementNS('http://www.w3.org/2000/svg','defs');
        var clipPath = document.createElementNS('http://www.w3.org/2000/svg','clipPath');
        var path = document.createElementNS('http://www.w3.org/2000/svg','path');
        
        path.setAttribute('d', this.mask.createSvgPathString());
        
        clipPath.setAttribute('id', 'mask'+this.piece.id);
        
        clipPath.appendChild(path);
        defs.appendChild(clipPath);
        svg.appendChild(defs);
        
        return svg;
    }
    

}

DisplayPiece.prototype.updatePosition = function updatePosition()
{
    var cp = this.getCssPosition();
    this.element.style.left = cp.left;
    this.element.style.top = cp.top;
    
}

DisplayPiece.prototype.getCssPosition = function getCssPosition()
{
    return { 
        left: px(this.size * (this.piece.currentPosition.x - this.group.group.currentPosition.x)),
        top: px(this.size * (this.piece.currentPosition.y - this.group.group.currentPosition.y))
    }
}


export default DisplayPiece;