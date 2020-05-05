export const IndexOfUndefined = function (arr, from, dir) {
  var i = from < 0 ? 0 : from;
  while (true) {
    if (!arr[i]) {
      return i;
    }
    i += dir;
  }
};

var lastEl = null;
export const setfullscreen = (element) => {
  try {
    if (lastEl && element.tagName !== "BODY") {
      if (document.fullscreenElement.tagName === "BODY") {
        document.exitFullscreen().then(() => {
          element.requestFullscreen();
        });
      } else {
        document.exitFullscreen().then(() => {
          lastEl.requestFullscreen();
        });
      }
    } else {
      if (!document.fullscreenElement) {
        element.requestFullscreen();
        if (element.tagName === "BODY") lastEl = element;
      } else {
        document.exitFullscreen();
        lastEl = null;
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const KeyMap = {
  PrevFile: {
    name: "PageUp",
    keyCode: 33,
    isctrl: false,
    action: null,
  },
  NextFile: {
    name: "PageDown",
    keyCode: 34,
    isctrl: false,
    action: null,
  },
  SkipForward: {
    name: "ArrowRight",
    keyCode: 39,
    isctrl: false,
    action: null,
  },
  SkipBack: {
    name: "ArrowLeft",
    keyCode: 37,
    isctrl: false,
    action: null,
  },
  Fullscreen: {
    name: "Enter",
    keyCode: 13,
    isctrl: false,
    action: null,
  },
  VolumeUp: {
    name: "ArrowUp",
    keyCode: 38,
    isctrl: false,
    action: null,
  },
  VolumeDown: {
    name: "ArrowDown",
    keyCode: 40,
    isctrl: false,
    action: null,
  },
  PlayOrPause: {
    name: "Space",
    keyCode: 32,
    isctrl: false,
    action: null,
  },
  ShowList: {
    name: "L",
    keyCode: 30,
    isctrl: false,
    action: null,
  },
};

export const handleKeyboard = (e) => {
  console.log(e.keyCode);
  for (let key of Object.keys(KeyMap)) {
    if (KeyMap[key].keyCode === e.keyCode) {
      let action = KeyMap[key].action;
      if (action) action(e.ctrlKey);
      break;
    }
  }
};
