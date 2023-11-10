let jumpSound;
let hitCeilingSound;
let stepcount = 0;
let music = {};
let musicVolume = 0.2;
soundAssets = [
    {
      name: "jump",
      file: "sound/jump.wav",
      volume: 0.05
    },
    {
      name: "hitCeiling",
      file: "sound/456499__soneproject__snr11.flac",
      volume: 0.1
    },
    {
      name: "landing",
      file: "sound/land.wav",
      volume: 0.1
    },
    {
      name: "step",
      file: "sound/land.wav",
      volume: 0.03
    },
    {
      name: "pickup",
      file: "sound/pickup.wav",
      volume: 0.2
    } 
  ];

musicAssets = [
  {
    name: "track1",
    file: "music/ambient.wav"
  }
];

sounds = {};

function sound(src, volume) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.volume = volume;
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.currentTime = 0;
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

  function backGroundMusic(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.setAttribute("loop", "true");
    this.sound.setAttribute("autoplay", "true");    
    this.sound.volume = musicVolume;
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.currentTime = 0;
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
    this.setVolume = function(){
      this.sound.volume = musicVolume;
    }
  }


  function setUpAudio() {
for (var i = 0; i < soundAssets.length; i++) {
  sounds[soundAssets[i].name] = new sound(soundAssets[i].file, soundAssets[i].volume);
}

music[musicAssets[0].name] = new backGroundMusic(musicAssets[0].file);

}




setUpAudio();

function startMusic(){
  music["track1"].setVolume(musicVolume)
  music["track1"].play();
}

function playWalkingSound(deltaTime){
if(!stepcount){
  stepcount = 0;
}
stepcount += deltaTime;
  if(player.isRunning){
    if(stepcount >= player.stepInterval * player.runStepMultiplier  ){
      stepcount = 0;
      sounds.step.play();
    }
  } else {
    if(stepcount >= player.stepInterval ){
      stepcount = 0;
      sounds.step.play();
    }
  }



};

