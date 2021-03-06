import { updateToggleMenu } from "../../ShareComponent/ToggleMenu";
let tStart, tEnd;
let point = {};
let touching = false;
let drag = false;
let moveY = { dis: 0, dir: 0 };
let moveX = { dis: 0, dir: 0 };

let controls = { nextPage: "", prevPage: "", nextFile: "", prevFile: "" };
export const onTouchStart = (e) => {
    touching = true;
    tStart = e.timeStamp;
    let { pageX, pageY } = (e.touches && e.touches[0]) || e;
    point = { x: pageX, y: pageY };
};

export const onTouchMove = (e) => {
    if (touching) {
        let { pageX, pageY } = e.touches[0];
        moveX.dir = pageX - point.x;
        moveY.dir = pageY - point.y;
        moveY.dis = Math.abs(moveY.dir);
        moveX.dis = Math.abs(moveX.dir);
        drag = true;
    }
};

export const onTouchEnd = (e) => {
    touching = false;
    let {
        file: { CurrentPos, Duration },
        webtoon,
        nextFile,
        nextPage,
        prevFile,
        prevPage,
        fullScreen,
    } = controls;
    if (!drag) {
        tEnd = e.timeStamp;
        let elapsed = tEnd - tStart;
        if (elapsed > 70) {
            let ww = window.innerWidth;
            let wh = window.innerHeight;
            if (point.y < wh * 0.33) {
                if (point.x < ww * 0.33) {
                    console.log("left Y25%");
                } else if (point.x < ww * 0.66) {
                    // center
                    console.log("center Y25%");
                } else {
                    // right
                    console.log("right Y25%");
                }
            } else if (point.y < wh * 0.8) {
                if (point.x < ww * 0.33) {
                    console.log("left Y50%");
                    nextPage();
                } else if (point.x < ww * 0.66) {
                    fullScreen();
                    console.log("center Y50%");
                } else {
                    // right
                    console.log("right Y50%");
                    nextPage();
                }
                // 25% from the bottom
            } else {
                if (point.x < ww * 0.33) {
                    //left
                    prevFile();
                } else if (point.x < ww * 0.66) {
                    // center
                    updateToggleMenu();
                    console.log("center x");
                } else {
                    // right
                    nextFile();
                    console.log("right x");
                }
            }
        }
    } else {
        if (moveX.dis > 100) {
            if (moveX.dir > 0) {
                prevPage();
            } else {
                nextPage();
            }
        } else if (moveY.dis > 180) {
            if (moveY.dir > 0) {
                console.log("down");
                if (webtoon && CurrentPos === 0) {
                    prevFile();
                }
            } else {
                console.log("up");

                console.log(webtoon, CurrentPos, Duration - 1);
                if (webtoon && CurrentPos === Duration - 1) {
                    nextFile();
                }
            }
        }
    }
    drag = false;
};

export default controls;
