let myCanvas = document.getElementById("myCanvas");
const size = 800;
myCanvas.width = size;
myCanvas.height = size;

const trackCenter = { x: size / 2, y: size / 2 };
let trackRadius = 100;
const ballRadius = 8;
const ballSpeed = 0.01;

const soundFrequencies = [
  1760, 1567.98, 1396.91, 1318.51, 1174.66, 1046.5, 987.77, 880, 783.99, 698.46,
  659.25, 587.33, 523.25, 493.88, 440, 392, 349.23, 329.63, 293.66, 261.63,
];

const tracks = [];
const balls = [];
const N = 20;

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
  constructor(track, radius, speed, sound) {
    this.track = track;
    this.radius = radius;
    this.speed = speed;
    this.offset = 0;
    this.sound = sound;
    this.direction = 1;
    this.center = this.track.getPosition(this.offset);
  }
  move() {
    this.offset += this.speed * this.direction;
    this.center = this.track.getPosition(this.offset);
    if (this.center.y > this.track.center.y) {
      this.direction *= -1;
      playSound(this.sound);
    }
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();
  }
}

for (let i = 0; i < N; i++) {
  const trackRadiu = trackRadius + i * 15;
  const track = new Track(trackCenter, trackRadiu);
  const ballSound = soundFrequencies[i];
  const ball = new Ball(track, ballRadius, ballSpeed + i * -0.0001, ballSound);
  tracks.push(track);
  balls.push(ball);
}

animate();

function animate() {
  ctx.clearRect(0, 0, size, size);
  for (let i = 0; i < tracks.length; i++) {
    tracks[i].draw(ctx);
    balls[i].move();
    balls[i].draw(ctx);
  }
  requestAnimationFrame(animate);
}
