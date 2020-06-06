document.addEventListener("DOMContentLoaded", function(event) { 
    var points = [];
    var lines = [];
    
    var clickTitle = document.getElementById('click');
    var clickList = document.getElementById('coordinates');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");
    var rect = canvas.getBoundingClientRect(canvas);

    function registerMouseClick(e){
      clickX = e.pageX - rect.left;
      clickY= e.pageY - rect.top;
      clickTitle.innerHTML = "clickX: " + clickX + ", clickY: " + clickY;
      var newPoint = [clickX, clickY];
      points.push(newPoint);

      //Visual rendering
      var n = points.length;
      if(n > 1) {
        var max = n - 1;
        var curr = points[max]; 
        var prev = points[max - 1];
        lines.push([prev, curr]);

        context.beginPath();
        context.moveTo(prev[0], prev[1]);
        context.lineTo(curr[0], curr[1]);
        context.strokeStyle = "#fff";
        context.stroke();
      }
      clickList.innerHTML += "<li>[" + clickX + ", " + clickY + "]</li>";
      checkIntersects();
    }

    function checkIntersects() {
      var number_of_lines = lines.length;
      var last_line = lines[number_of_lines -1];
      lines.map(
        line => {
          if(intersects(last_line[0][0], last_line[0][1], last_line[1][0], last_line[1][1], line[0][0], line[0][1], line[1][0], line[1][1])) {
            alert("Intersect!");
          }
        }
      );
    }

    function intersects(a,b,c,d,p,q,r,s) {
      var det, gamma, lambda;
      det = (c - a) * (s - q) - (r - p) * (d - b);
      if (det === 0) {
        return false;
      } else {
        lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
        gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
      }
    };

    document.addEventListener('click', registerMouseClick, true);
});