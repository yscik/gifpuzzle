function Mask(piece)
{
    this.piece = piece;
    this.size = 80;
}

Mask.prototype.createSvgPathString = function()
{
    return "M 0, 0 " + createPath.call(this, ", ", " ", noop); 
    
    function noop(value) { return value; }
}

Mask.prototype.createCssPathString = function()
{
    return createPath.call(this, " ", ", ", pc); 
    
    function pc(value) { return [value, '%'].join(""); }

}

function createPath(sep_coord, sep_point, format_value)
{
    var path = [];
    
    this.piece.edges.top.points.forEach(function(point) {
        path.push([format_value(point.p), format_value(point.d)].join(sep_coord));
    }.bind(this));

    this.piece.edges.right.points.forEach(function(point) {
        path.push([format_value(this.size + point.d), format_value(point.p)].join(sep_coord));
    }.bind(this));

    this.piece.edges.bottom.points.slice(0).reverse().forEach(function(point) {
        path.push([format_value(point.p), format_value(this.size + point.d)].join(sep_coord));
    }.bind(this));

    this.piece.edges.left.points.slice(0).reverse().forEach(function(point) {
        path.push([format_value(point.d), format_value(point.p)].join(sep_coord));
    }.bind(this));
    
    return path.join(sep_point);
}

export default Mask;