
var MARGIN = Edge.MARGIN = 10;

function Edge(points)
{
    this.points = points || [];
}

Edge.generate = function generateEdge()
{

    var points = [{d: MARGIN, p: MARGIN}, {d: MARGIN, p: MARGIN + 15}];

      for(var i = 35; i <= 65; i+= 10)
          points.push({d: MARGIN + Math.ceil(MARGIN * 2 * (Math.random()-0.5)), p: i})

    points.push({d: MARGIN, p: 100 - 15 - MARGIN});
    points.push({d: MARGIN, p: 100 - MARGIN});

  return new Edge(points);

};

Edge.flat = new Edge([{d: MARGIN, p: MARGIN}, {d: MARGIN, p: 100 - MARGIN}]);

export default Edge;