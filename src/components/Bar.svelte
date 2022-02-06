<script>
  export let height = 0;
</script>

<div class="bar" style="height: {height * 10}px;" />

<style>
  .bar {
    width: 50px;
    background-color: rgb(8, 255, 160);
    margin-right: 5px;
    transition: all 0.5s;
  }
</style>
