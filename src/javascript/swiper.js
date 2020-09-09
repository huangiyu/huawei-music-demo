/* let Swiper = (function () {
  let root = document;
  let eventHub = { swipeLeft: [], swipeRight: [] };

  function bind(node) {
    root = node;
  }
  function on(type, fn) {
    if (eventHub[type]) {
      envetHub[type].push(fn);
    }
  }

  var initX;
  var newX;
  var clock;

  root.ontouchstart = function (e) {
    initX = e.changedTouches[0].pageX;
  };

  root.ontouchmove = function (e) {
    if (clock) clearInterval(clock);
    clock = setTimeout(() => {
      newX = e.changedTouches[0].pageX;
      if (newX - initX > 0) {
        eventHub["swipRight"].forEach((fn) => fn());
      } else {
        eventHub["swipeLeft"].forEach((fn) => fn());
      }
    }, 100);
  };
  return {
      bind: bind
      on: on
  };
})();

Swiper.bind(document.querySelector("#box"));

Swiper.on("swipeLeft", function () {
  console.log("swipeLeft");
});

Swiper.on("swipeRight", function () {
  console.log("swipeRight");
});

 */

class Swiper {
  constructor(node) {
    if (!node) throw new Error("需要传递需要绑定的DOM元素");
    let root = typeof node === "string" ? document.querySelector(node) : node;
    let eventHub = { swipeLeft: [], swipeRight: [] };

    let initX;
    let newX;
    let clock;

    root.ontouchstart = function (e) {
      initX = e.changedTouches[0].pageX;
    };

    root.ontouchmove = function (e) {
      if (clock) clearInterval(clock);
      clock = setTimeout(() => {
        newX = e.changedTouches[0].pageX;
        if (newX - initX > 20) {
          eventHub["swipeRight"].forEach(fn=>fn.bind(root)());
        } else if((initX - newX > 20)){
          eventHub["swipeLeft"].forEach(fn=>fn.bind(root)());
        }
      }, 100);
    };

    this.on = function(type,fn){
        if(eventHub[type]){
            eventHub[type].push(fn)
        }
    }

    this.off= function(type,fn){
        let index = eventHub[type].indexof(fn)
        if ( index !== -1){
            eventHub[type].splice(index,1)
        }
    }
  }
}


export default Swiper
