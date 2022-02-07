<script>
  import { onMount } from "svelte";
  import Bar from "./components/Bar.svelte";
  import { generateRandomNumber } from "./functions/random";
  import { flashBars } from "./functions/flash";
  let bars = 5;
  let sortingBars;
  let myBars = [];
  $: canStartSorting = myBars.length;
  const barChangeHandler = (e) => {
    bars = e.target.value;
  };
  const generateBars = () => {
    let dummy = [...Array(Number(bars)).keys()];

    myBars = dummy.map((item) => {
      return generateRandomNumber();
    });
    console.log(myBars);
  };
  const startSorting = async () => {
    sortingBars = document.querySelectorAll(".bar");
    for (let i = 0; i < myBars.length - 1; i++) {
      for (let j = i + 1; j < myBars.length; j++) {
        let swap =
          sortingBars[i].clientHeight > sortingBars[j].clientHeight
            ? true
            : false;
        let data = await flashBars(
          sortingBars[i],
          sortingBars[j],
          i,
          j,
          swap,
          myBars
        );
        myBars = data;
        if (swap) {
          await new Promise((res, rej) => {
            setTimeout(() => {
              res();
            }, 500);
          });
        }
      }
    }
    alert("Array Sorted");
  };
</script>

<main>
  <h1>Bubble Sorting Visualiser</h1>
  <br />
  <input
    type="number"
    id="bars"
    placeholder="Number Of Bars"
    value={bars}
    on:change={barChangeHandler}
    min="5"
    max="25"
  />
  <button on:click={generateBars}>Generate Bars</button>

  {#if myBars.length}
    <div class="bars">
      {#each myBars as bar}
        <Bar height={bar} />
      {/each}
    </div>
  {/if}

  <button
    disabled={canStartSorting === 0}
    on:click={startSorting}
    style="margin-top: 15px;">Start Sorting</button
  >
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 100;
  }
  button {
    cursor: pointer;
  }
  .bars {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 500px;
  }
</style>
