<script>
  import { createEventDispatcher } from "svelte";
  import { map } from "./Utils";
  export let value;
  export let preview = false;
  export let min = 0;
  export let max = 100;
  export let onChange;
  const dispatch = createEventDispatcher();
  let uniqId = "rc-" + new Date().getTime();
  let sliderRef;
  let previewRef;
  let previewData = 0;
  let progress = map(value, min, max, 0, 100);

  let isMdown = { is: false };
  const onMDown = (e) => {
    isMdown = { is: true, id: uniqId };
    let xpos;
    if (e.type === "touchstart") {
      xpos =
        e.touches[0].pageX - e.touches[0].target.getBoundingClientRect().left;
      document.addEventListener("touchmove", globalMMove);
    } else {
      xpos = e.offsetX;
      document.addEventListener("mousemove", globalMMove);
    }

    if (!isNaN(xpos)) {
      updateValue(xpos);
    }
  };

  const globalMMove = (e) => {
    if (
      (isMdown.is && e.target.id === uniqId) ||
      (e.type === "touchmove" && e.touches[0].target.id === uniqId)
    ) {
      let newPos;
      if (e.type === "touchmove") {
        newPos =
          e.touches[0].pageX - e.touches[0].target.getBoundingClientRect().left;
      } else {
        newPos = e.offsetX;
      }
      if (newPos > 0 && newPos < sliderRef.offsetWidth) {
        updateValue(newPos);
      }
    }
  };

  const onPreview = (e) => {
    if (preview) {
      var newPos = Math.floor(e.pageX - sliderRef.getBoundingClientRect().left);
      var pos = map(newPos - 1, 0, sliderRef.offsetWidth - 2, 0, 100).toFixed(
        0
      );
      let tempVal = Number(
        map(newPos - 1, 0, sliderRef.offsetWidth - 2, min, max).toFixed(2)
      );
      pos = pos < 0 ? 0 : pos > 100 ? 100 : pos;
      let value = tempVal < 0 ? 0 : tempVal > max ? max : tempVal;
      previewData = { pos, value };
    }
  };

  document.onmouseup = (e) => {
    isMdown = false;
    document.removeEventListener("mousemove", globalMMove);
    document.removeEventListener("touchmove", globalMMove);
  };

  const handleThumb = (e) => {
    isMdown = { is: true, id: uniqId };
    if (e.type === "touchstart") {
      document.addEventListener("touchmove", globalMMove);
    } else {
      document.addEventListener("mousemove", globalMMove);
    }
    e.stopPropagation();
  };

  const updateValue = (val) => {
    let tempVal = Number(
      map(val - 1, 0, sliderRef.offsetWidth - 2, min, max).toFixed(2)
    );
    tempVal = tempVal < 0 ? 0 : tempVal > max ? max : tempVal;
    onChange(tempVal);
  };

  $: progress = map(value, min, max, 0, 100);
</script>

<style>
  .rc-slider {
    display: flex;
    align-items: center;
    width: 100%;
    margin: auto;
    height: 10px;
    cursor: pointer;
    padding: 0 20px;
    user-select: none;
  }

  .rc-slider .rc-track,
  .rc-slider .rc-progress {
    position: relative;
    width: 100%;
    height: 10px;
    background-color: wheat;
    border-radius: 0.3rem;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.25) inset;
  }

  .rc-slider .rc-progress {
    background-color: aqua;
    pointer-events: none;
    width: 0%;
  }

  .rc-slider .rc-thumb {
    display: inline-block;
    visibility: hidden;
    position: absolute;
    top: calc(50% - 11px);
    margin: 0;
    z-index: 3;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    background-color: wheat;
    box-shadow: 0 0px 3px rgba(0, 0, 0, 0.25);
  }

  .rc-slider .rc-thumb:active {
    transform: scale(1.2);
  }

  .rc-slider:hover .rc-progress,
  .rc-slider:hover .rc-track {
    height: 10px;
  }

  .rc-slider:hover .rc-thumb {
    visibility: visible;
  }

  .rc-slider .rc-preview {
    display: none;
    position: absolute;
    left: 0;
    bottom: 20px;
    height: max-content;
    width: fit-content;
    max-width: 150px;
    max-height: 200px;
    background-color: white !important;
    border-radius: 5px;
    padding: 0 8px;
    border: 1px solid black;
    z-index: 1;
  }

  .rc-track:hover .rc-preview {
    display: block;
  }

  .rc-slider .rc-preview:after {
    position: absolute;
    left: calc(50% - 10px);
  }

  .rc-slider .rc-preview-content {
    border-radius: 50%;
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    color: black;
    font-weight: 600;
  }

  .rc-slider:hover .rc-preview {
    display: inline-block;
  }

  .rc-slider .rc-thumb:hover + .rc-preview {
    display: none;
  }

  .rc-slider .rc-preview-content:after {
    content: " ";
    position: absolute;
    bottom: -5.5px;
    left: calc(50% - 7.5px);
    background-color: whitesmoke;
    height: 10px;
    width: 10px;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    transform: rotateZ(45deg);
  }
</style>

<div class="rc-slider">
  <div
    id={uniqId}
    class="rc-track"
    on:mousedown={onMDown}
    on:touchstart={onMDown}
    bind:this={sliderRef}
    on:mousemove={onPreview}>
    <div
      class="rc-progress"
      style={`border-radius: ${Math.round(progress) === 100 ? '0.3rem' : '0.3rem 0px 0px 0.3rem'}; width: ${progress > 0.3 ? progress : 0}%`} />
    <span
      class="rc-thumb"
      style={`left: calc(${progress}% - 11px)`}
      on:mousedown={handleThumb} />
    {#if preview}
      <span
        class="rc-preview"
        data-title="00:00"
        bind:this={previewRef}
        style={`left: calc(${previewData.pos}% - ${previewRef && previewRef.offsetWidth / 2}px)`}>
        <span class="rc-preview-content">
          <slot value={previewData.value} />
        </span>
      </span>
    {/if}
  </div>
</div>
