(function main() {

  const longWaveformCanvas = document.getElementById('waveform-long');
  const longSoundPlayButton = document.getElementById('play-button-long');
  const shortWaveformCanvas = document.getElementById('waveform-short');
  const shortSoundPlayButton = document.getElementById('play-button-short');

  const longSound = new SC.Sound(SC.longSound);
  const shortSound = new SC.Sound(SC.shortSound);

  const longWaveform = new SC.Waveform({
    canvas: longWaveformCanvas,
    sound: longSound
  });

  const shortWaveform = new SC.Waveform({
    canvas: shortWaveformCanvas,
    sound: shortSound
  });

  longWaveform.render();
  shortWaveform.render();
  
//====================================
//=========Added by Me================
//===listener on canvas for seek(time)
//====================================
  longWaveform.canvas.addEventListener('click', (event) => {
    const xCord = event.pageX - longWaveformCanvas.getBoundingClientRect().x;
    const value = (longSound.duration * xCord) / longWaveformCanvas.width;
    //the above value is caclulated using the formula used in ctx.fillStyle in waveform.js
    longSound.seek(value);
  });

  shortWaveform.canvas.addEventListener('click', () => {
    const xCord = event.pageX - shortWaveformCanvas.getBoundingClientRect().x;
    const value = (shortSound.duration * xCord) / shortWaveformCanvas.width;
    shortSound.seek(value);
  });
//====================================
//====================================
//====================================

  longSoundPlayButton.addEventListener('click', () => {
    longSound.toggle();
    longSoundPlayButton.classList.toggle('sc-button-play');
    longSoundPlayButton.classList.toggle('sc-button-pause');
  });

  shortSoundPlayButton.addEventListener('click', () => {
    shortSound.toggle();
    shortSoundPlayButton.classList.toggle('sc-button-play');
    shortSoundPlayButton.classList.toggle('sc-button-pause');
  });

})();
