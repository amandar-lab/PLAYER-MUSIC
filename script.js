let songs = [
    { 
        src: "musicas/angel numbers.mp3", 
        cover: "images/Grupo 13.png",
        bgColor: "#96C1C1"  
      },
      { 
        src: "musicas/down.mp3", 
        cover: "images/down-cover.png",
        bgColor: "#F5B7B1"  
      },
      { 
        src: "musicas/desire.mp3", 
        cover: "images/Grupo 15.png",
        bgColor: "#B576F1"  
      },

      { 
        src: "musicas/mania.mp3", 
        cover: "images/Grupo 30.png",
        bgColor: "#F0DACC"  
      }


    ];
  
  let currentSongIndex = 0;
  document.body.style.backgroundColor = songs[0].bgColor;
  
  const song = document.getElementById("song");
  const ctrlIcon = document.getElementById("ctrlIcon");
  const progress = document.getElementById("progress");
  const proximaBtn = document.querySelector(".proxima");
  const voltaBtn = document.querySelector(".volta");
  const phone = document.querySelector(".phone");
  

  function setPhoneCover(index) {
    const cover = songs[index].cover;
    phone.style.backgroundImage = `url("${cover}")`;
    phone.style.backgroundRepeat = "no-repeat";
    phone.style.backgroundPosition = "center";
    phone.style.backgroundSize = "cover";
  }
  
  
  setPhoneCover(currentSongIndex);
  
  
  function loadSong(index, autoplay = true) {
    currentSongIndex = index;
    song.src = songs[index].src;
    setPhoneCover(index);
  
    
    document.body.style.backgroundColor = songs[index].bgColor;

  
    if (autoplay) {
      const promise = song.play();
      if (promise !== undefined) {
        promise.then(() => { ctrlIcon.src = "images/pause.png"; })
               .catch(() => {  ctrlIcon.src = "images/Grupo 18.png"; });
      } else {
        ctrlIcon.src = "images/pause.png";
      }
    } else {
      ctrlIcon.src = "images/Grupo 18.png";
    }
  }
  
  
  song.onloadedmetadata = function () {
    progress.max = song.duration || 0;
    progress.value = song.currentTime || 0;
  };
  
  song.addEventListener("timeupdate", () => {
    progress.value = song.currentTime;
  });
  
  progress.oninput = function () {
    song.currentTime = progress.value;
  };
  
  
  function playPause() {
    if (song.paused) {
      const p = song.play();
      if (p !== undefined) {
        p.then(() => ctrlIcon.src = "images/pause.png").catch(() => {});
      } else {
        ctrlIcon.src = "images/pause.png";
      }
    } else {
      song.pause();
      ctrlIcon.src = "images/Grupo 18.png";
    }
  }
  
  
  proximaBtn.addEventListener("click", () => {
    let next = currentSongIndex + 1;
    if (next >= songs.length) next = 0;
    loadSong(next, true);
  });
  
  
  voltaBtn.addEventListener("click", () => {
    let prev = currentSongIndex - 1;
    if (prev < 0) prev = songs.length - 1;
    loadSong(prev, true);
  });
  

  function mudarPlaylist(url) {
  if (!url.includes("/embed/")) {
    url = url.replace("open.spotify.com/", "open.spotify.com/embed/");
  }

  document.getElementById('spotify-iframe').src = url;
}

