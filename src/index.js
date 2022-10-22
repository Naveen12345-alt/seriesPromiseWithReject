import "./styles.css";
const rejectTime = 3000;
const delays = [5000, 2000, 1000, 2000, 2000];

//Thorough Pseudo-Code
const delayedP = (delay) => {
  return new Promise((resolve, reject) => {
    const id = (Math.random() * 100).toFixed(0);
    let timerId = null;
    const pasTime = Date.now();
    setInterval(() => {
      const now = Date.now();
      if (now - pasTime > rejectTime) {
        clearTimeout(timerId);
        reject();
      }
    }, 500);
    timerId = setTimeout(() => {
      console.log(`delay: ${delay} ${id}`);
      resolve();
    }, delay);
  });
};

function seriesPromiseExecution() {
  return delays.reduce((acc, delay, idx) => {
    return new Promise((res, reject) => {
      return acc
        .then((_) => {
          return delayedP(delay);
        })
        .then((_) => res())
        .catch((e) => res());
    });
  }, Promise.resolve());
}

seriesPromiseExecution();
// for (const delay of delays) {
//   delayedP(delay);
// }

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;
