let myCanvas = document.getElementById("myCanvas");
const size = 700;
myCanvas.width = size;
myCanvas.height = size;

const trackCenter = { x: size / 2, y: size / 2 };
const trackRadius = 100;
const ballRadius = 10;
const ballSpeed = 0.01;

const ctx = myCanvas.getContext("2d");
class Track {
  constructor(center, radius) {
    this.center = center;
    this.radius = radius;
  }
  getPosition(offset) {
    return {
      x: this.center.x + Math.cos(offset) * this.radius,
      y: this.center.y - Math.sin(offset) * this.radius,
    };
  }
  draw(ctx) {
    ctx.beginPath();
    for (let a = 0; a < Math.PI * 2; a += 0.01) {
      const pos = this.getPosition(a);
      ctx.lineTo(pos.x, pos.y);
    }
    ctx.closePath();
    // ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();
  }
}

class Ball {
  constructor(track, radius, speed) {
    this.track = track;
    this.radius = radius;
    this.speed = speed;
    this.offset = 0;
    this.direction = 1;
    this.center = this.track.getPosition(this.offset);
  }
  move() {
    this.offset += this.speed * this.direction;
    this.center = this.track.getPosition(this.offset);
    if (this.center.y > this.track.center.y) {
      this.direction *= -1;
      playSound();
    }
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();
  }
}

const track = new Track(trackCenter, trackRadius);
const ball = new Ball(track, ballRadius, ballSpeed);

animate();

function animate() {
  ctx.clearRect(0, 0, size, size);
  // for (let i = 0; i < 5; i++) {
  //   const track = new Track(trackCenter, trackRadius + i * 30);
  //   const ball = new Ball(track, ballRadius, ballSpeed);
  //   track.draw(ctx);
  //   ball.move();
  //   ball.draw(ctx);
  // }
  track.draw(ctx);
  ball.move();
  ball.draw(ctx);
  requestAnimationFrame(animate);
}
