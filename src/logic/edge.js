function Edge(points)
{
    this.points = points || [];
}

Edge.generate = function()
{
    var points = [{d: 0, p: 10}];
    for(var i = 1; i <= 3; i++)
        points.push({d: Math.floor(Math.random() * 20), p: i * 20})
    
    points.push({d: 0, p: 80});
    return new Edge(points);
}

export default Edge;