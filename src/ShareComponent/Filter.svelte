<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let filter = "";

  const ClearFilter = () => {
    dispatch("filter", "");
    filter = "";
  };

  const submitFilter = e => {
    if (e.keyCode === 13) {
      dispatch("filter", (filter || "").replace(/%|\?/, ""));
    }
  };

  const btnFilter = () => {
    dispatch("filter", (filter || "").replace(/%|\?/, ""));
  };
</script>

<style>
  #filter-control {
    position: relative;
    flex-shrink: 1;
    width: 250px;
    pointer-events: all;
  }
  #filter-control > * {
    height: 32px;
  }
  .filter-file {
    padding: 2px 5px;
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }
  @media screen and (max-width: 600px) {
    #filter-control {
      width: 150px;
    }
    .filter-file:not(:placeholder-shown),
    .filter-file:focus {
      position: absolute;
      left: 46px;
      height: 100%;
      width: calc(100% * 1.2);
      z-index: 1;
    }
    .filter-file:not(:placeholder-shown) + span {
      right: -70px;
    }
  }
</style>

<div id="filter-control" class="input-group">
  <div class="input-group-prepend">
    <span class="btn-filter input-group-text" on:click={btnFilter}>
      <i class="fas fa-search" />
    </span>
  </div>
  <input
    type="text"
    class="form-control filter-file"
    placeholder="Filter"
    bind:value={filter}
    on:keydown={submitFilter} />
  <span id="clear-filter" on:click={ClearFilter}>
    <i class="fas fa-times-circle" />
  </span>
</div>
