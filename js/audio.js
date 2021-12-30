
function audioStoryStopAll() {
  let d0 = parent.document.getElementById("snd-st-d-0");
  let d1 = parent.document.getElementById("snd-st-d-1");
  let d2 = parent.document.getElementById("snd-st-d-2");
  let d3 = parent.document.getElementById("snd-st-d-3");
  let maxTime = 0;
  maxTime = Math.max(d0.currentTime, d1.currentTime, d2.currentTime, d3.currentTime);
  d0.currentTime = maxTime;
  d1.currentTime = maxTime;
  d2.currentTime = maxTime;
  d3.currentTime = maxTime;
  d0.pause();
  d1.pause();
  d2.pause();
  d3.pause();
}

function audioStoryPlay(distortion) {
  parent.document.getElementById("snd-st-d-" + distortion).play();
}