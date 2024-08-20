const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(frequency = 440, duration = 1) {
  const osc = audioCtx.createOscillator();
  osc.connect(audioCtx.destination);

  osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);

  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}
