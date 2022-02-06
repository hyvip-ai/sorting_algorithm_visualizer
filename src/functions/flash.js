export async function flashBars(first, second, i, j, swap, array) {
  return new Promise((resolve) => {
    first.classList.add("active");
    second.classList.add("active");
    setTimeout(() => {
      first.classList.remove("active");
      second.classList.remove("active");
      setTimeout(() => {
        if (swap) {
          first.classList.add("swapping");
          second.classList.add("swapping");
          setTimeout(() => {
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            first.classList.remove("swapping");
            second.classList.remove("swapping");
            resolve(array);
          }, 1000);
        } else {
          resolve(array);
        }
      }, 500);
    }, 1000);
  });
}
