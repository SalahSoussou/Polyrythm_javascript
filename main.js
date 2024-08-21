let myCanvas = document.getElementById("myCanvas");
const size = 800;
myCanvas.width = size;
myCanvas.height = size / 2;

const trackCenter = { x: size / 2, y: size / 2 };
let trackRadius = 50;
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
  constructor(center, radius, hue) {
    this.center = center;
    this.radius = radius;
    this.period = Math.PI;
    this.color = hue;
  }
  getPosition(offset) {
    return {
      x: this.center.x + Math.cos(offset) * this.radius,
      y: this.center.y - Math.sin(offset) * this.radius,
      round: Math.floor(offset / this.period),
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
    ctx.strokeStyle = `hsl(${this.color},100%,50%)`;
    ctx.stroke();
  }
}

class Ball {
  constructor(track, radius, speed, sound, hue) {
    this.track = track;
    this.radius = radius;
    this.speed = speed;
    this.offset = 0;
    this.sound = sound;
    this.round = 0;
    this.direction = 1;
    this.color = hue;
    this.center = this.track.getPosition(this.offset);
  }
  move() {
    this.offset += this.speed;
    const res = this.track.getPosition(this.offset);
    this.center = { x: res.x, y: res.y };
    if (res.round != this.round) {
      playSound(this.sound);
      this.round = res.round;
      // if (this.center.y > this.track.center.y) {
      //   this.direction *= -1;
      // }
    }
  }
  draw(ctx) {
    const fackY = 2 * this.track.center.y - this.center.y;
    if (fackY > this.center.y) {
      ctx.beginPath();
      ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
      // ctx.strokeStyl = `hsl(${this.color},100%,50%)`;

      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(this.center.x, fackY, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${this.color},100%,50%)`;
      ctx.stroke();
      ctx.fill();
    }
  }
}

for (let i = 0; i < N; i++) {
  const trackRadiu = trackRadius + i * 15;
  const ballSound = soundFrequencies[i];
  const hue = (i * 180) / N;
  const track = new Track(trackCenter, trackRadiu, hue);
  const ball = new Ball(
    track,
    ballRadius,
    ballSpeed + i * -0.0001,
    ballSound,
    hue
  );
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
