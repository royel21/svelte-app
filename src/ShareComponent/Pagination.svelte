<script>
  import { createEventDispatcher } from "svelte";
  import paginationInput from "./PageInput";

  const dispatch = createEventDispatcher();

  export let page = 1;
  export let totalPages = 0;
  let showinput = false;

  const pagerClick = (e) => {
    window.localStorage.setItem("selected", 0);
    let li = e.target;
    switch (e.target.id) {
      case "prev-page": {
        dispatch("gotopage", page - 1);
        break;
      }
      case "next-page": {
        dispatch("gotopage", page + 1);
        break;
      }
      case "first-page": {
        dispatch("gotopage", 1);
        break;
      }
      case "last-page": {
        dispatch("gotopage", totalPages);
        break;
      }
      case "current-page": {
        paginationInput(li, page, totalPages, dispatch);
        break;
      }
      default: {
      }
    }
  };
  const onShowinput = () => {
    showinput = true;
  };

  const hideInput = () => {
    showinput = false;
  };
  const init = (el) => {
    el.focus();
  };
  const handleChange = (event) => {
    let pg = parseInt(event.target.value);
    if (!isNaN(pg)) {
      pg = pg < 1 ? 1 : pg > totalPages ? totalPages : pg;
      dispatch("gotopage", pg);
    }
  };
</script>

<style>
  #pager {
    display: inline-block;
    width: fit-content;
    padding: 0;
    pointer-events: all;
    user-select: none;
  }
  .pagination {
    display: flex;
    padding-left: 0;
    list-style: none;
    border-radius: 0.25rem;
    font-weight: bold;
    margin: 0;
  }
  #pager li {
    height: 32px;
    cursor: pointer;
  }
  #pager li:not(#current-page) {
    line-height: 2;
    padding: 0 15px;
  }
  #pager #current-page {
    min-width: 70px;
    max-width: 85px;
    text-align: center;
    font-size: 14px;
    padding: 0 4px;
    line-height: 2;
    font-weight: 700;
  }
  .page-link {
    position: relative;
    display: block;
    padding: 0.5rem 0.75rem;
    margin-left: -1px;
    line-height: 1.25;
    color: #007bff;
    background-color: #fff;
    border: 1px solid #dee2e6;
  }
  .fas {
    pointer-events: none;
  }
  #current-page {
    user-select: none;
  }
  @media screen and (max-width: 600px) {
    #last-page,
    #first-page {
      display: none;
    }
    #prev-page {
      border-top-left-radius: 0.25rem;
      border-bottom-left-radius: 0.25rem;
    }

    #next-page {
      border-top-right-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
    }
  }
</style>

{#if totalPages > 1}
  <div id="pager" on:click={pagerClick}>
    <ul class="pagination">
      <li id="first-page" class="page-link">
        <i class="fas fa-angle-double-left" />
      </li>
      <li id="prev-page" class="page-link">
        <i class="fas fa-angle-left" />
      </li>
      <li id="current-page" class="page-link" on:click={onShowinput}>
        {#if showinput}
          <input
            on:blur={hideInput}
            type="text"
            value={page}
            class="form-control"
            on:change={handleChange}
            use:init />
        {:else}{page + '/' + totalPages}{/if}
      </li>
      <li id="next-page" class="page-link">
        <i class="fas fa-angle-right" />
      </li>
      <li id="last-page" class="page-link">
        <i class="fas fa-angle-double-right" />
      </li>
    </ul>
  </div>
{/if}
