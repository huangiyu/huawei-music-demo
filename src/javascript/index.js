import "./icons.js";
import Swiper from "./swiper.js";

class Player {
  constructor(node) {
    this.root = typeof node === "string" ? document.querySelector(node) : node;
    this.$ = (selector) => document.querySelector(selector);
    this.$$ = (selector) => document.querySelectorAll(selector);
    this.songList = [];
    this.currentIndex = 0;
    this.audio = new Audio();
    this.start();
    this.bind();
    //https://huangiyu.github.io/data-mock/huawei-music/music-list.json
  }

  start() {
    fetch("https://huangiyu.github.io/data-mock/huawei-music/music-list.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.songList = data;
        this.audio.src = this.songList[this.currentIndex].url;
      });
  }

  bind() {
    let self = this;
    this.$(".btn-play-pause").onclick = function () {
      if (this.classList.contains("playing")) {
        self.audio.pause();
        this.classList.remove("playing");
        this.classList.add("pause");
        this.querySelector("use").setAttribute("xlink:href", "#icon-play");
      } else if (this.classList.contains("pause")) {
        self.audio.play();
        this.classList.remove("pause");
        this.classList.add("playing");
        this.querySelector("use").setAttribute("xlink:href", "#icon-pause");
      }
    };
    this.$(".btn-pre").onclick = function () {
      self.playPrevsong();
    };
    this.$(".btn-next").onclick = function () {
      self.playNextsong();
    };

    let swiper = new Swiper(this.$(".panels"));
    swiper.on("swipeLeft", function () {
      console.log(this);
      this.classList.remove("panel1");
      this.classList.add("panel2");
    });
    swiper.on("swipeRight", function () {
      console.log(this);
      this.classList.remove("panel2");
      this.classList.add("panel1");
    });
  }

  playPrevsong() {
    this.currentIndex =
      (this.songList.length + this.currentIndex - 1) % this.songList.length;
    this.audio.src = this.songList[this.currentIndex].url;
    this.audio.oncanplaythrough = () => this.audio.play(); //当audio可以播放的时候，再去播放。防止音频未加载好，用户点击太快出bug
  }
  playNextsong() {
    this.currentIndex = (this.currentIndex + 1) % this.songList.length;
    this.audio.src = this.songList[this.currentIndex].url;
    this.audio.oncanplaythrough = () => this.audio.play();
  }
}

new Player("#player");
