var canvas = document.getElementById("myCanvas");
var circles = [], circleShrink = [];
var sounds = ['bubbles','clay','confetti','corona','dotted-spiral','flash-1','flash-2','flash-3','glimmer','moon','pinwheel','piston-1','piston-2','piston-3','prism-1','prism-2','prism-3','splits','squiggle','strike','suspension','timer','ufo','veil','wipe','zig-zag'];
var colors = ['#0000ff', '#ff00ee', '#ff0066', '#ff0000', '#00eeff', '#40ffa6', '#40a6ff', '#ffbffb', '#ffbfbf', '#bfd9ff', '#e2f200', '#f26100', '#f20000', '#f2c200', '#9d3df2', '#f28979', '#f2ca79', '#00b8e6', '#7373e6', '#e6bbac', '#ace2e6', '#62d936', '#d98d36', '#cc0088', '#0000cc', '#b8cc66', '#cc6681', '#66ccb8', '#ccbb99', '#0000bf', '#bf3030', '#b960bf'];
var keyData = {};

//populate keyData map
for(var i=0;i<26;i++){
  var entry = String.fromCharCode(65+i).toLowerCase();
  var obj = {
    color : colors[i],
    sound : new Howl({
      src: ["assets/sounds/"+sounds[i]+".mp3"]
    })
  };
  keyData[entry] = obj;
};

function onKeyDown(event) {
  //if entry for key exists, set color and play sound
  if(keyData[event.key]){
      keyData[event.key].sound.play();
      var maxPoint = new Point(view.size.width, view.size.height);
      var randomPoint = Point.random();
      var point = maxPoint * randomPoint;
      var newCircle = new Path.Circle(point, 10); //500
      newCircle.fillColor = keyData[event.key].color;
      circleShrink.push(false);
      circles.push(newCircle);
  }
};

//update animations from circle array
function onFrame(event) {
  for(var i=0; i <circles.length; i++){
    circles[i].fillColor.hue += 3;
    var circleWidth = circles[i].bounds.width;
    if(circleWidth > 300){
      circleShrink[i] = true;
    };
    circleShrink[i] === false ? circles[i].scale(1.2) : circles[i].scale(0.8);
    if(circleWidth < 0.1){
      circles[i].remove();
      circles.splice(i, 1);
      circleShrink.splice(i, 1);
      i-=1;
    };
  }
};
