let myCanvas = document.getElementById("myCanvas");
const size = 700;
myCanvas.width = size;
myCanvas.height = size;

const trackCenter = { x: size / 2, y: size / 2 };
const trackRadius = 100;

const ctx = myCanvas.getContext("2d");
class Track {
  constructor(center, radius) {
    this.center = center;
    this.radius = radius;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();
  }
}
const track = new Track(trackCenter, trackRadius);
track.draw(ctx);
