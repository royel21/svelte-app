<script>
  import Filter from "../../ShareComponent/Filter.svelte";
  import Pagination from "../../ShareComponent/Pagination.svelte";
  export let title;
  export let items;
  export let folderId;
  export let page = 1;
  export let totalPages = 0;
  export let totalItems = 0;
</script>

<style>
  .list-container {
    height: calc(100% - 85px);
    overflow-y: auto;
  }
  .controls {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    border: none;
    height: 45px;
  }
  .controls h4 {
    flex-grow: 1;
    width: 100%;
    user-select: none;
  }
  .col-6 {
    flex-grow: 1;
    position: relative;
    width: 50%;
    padding: 0 15px;
  }
  .col-6:first-child {
    border-right: 1px solid;
  }
  .list-controls {
    margin-top: 5px;
    text-align: center;
    width: 100%;
  }
  .list-group-item {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .empty-list:only-child {
    text-align: center;
  }
  i {
    font-size: 20px;
    margin-right: 6px;
  }
  .active i:not(.fa-trash-alt) {
    color: white;
  }
</style>

<div id={title} class="file-list col-6">
  <div class="controls">
    <Filter on:filter />
    <h4 class="text-center">{`${totalItems} - ${title}`}</h4>
  </div>
  <div class="list-container">
    <ul class="list-group text-dark">
      {#if items.length < 1}
        <li class="list-group-item empty-list">{`Not ${title} Found`}</li>
      {:else}
        {#each items as { Id, Name, Type }}
          <li
            id={Id}
            title={Name}
            class="list-group-item"
            class:active={folderId === Id}
            on:click>
            {#if Type.includes('Folder')}
              <i class="fas fa-sync" />
            {/if}
            <i class="fas fa-edit" />
            <i class="fas fa-trash-alt" />
            {Name}
          </li>
        {/each}
      {/if}
    </ul>
  </div>
  <div class="list-controls">
    <Pagination {page} {totalPages} on:gotopage />
  </div>
</div>
