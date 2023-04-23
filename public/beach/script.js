const h1 = document.getElementsByTagName("h1")[0];
const h1Text = h1.textContent.trim();
const h1Child = h1.firstChild;
h1.removeChild(h1Child);

const yellows = [...Array(10).keys()].map((v,i) => i*100)
yellows[0] = 50;

const colorRatio = yellows.length / h1Text.length;

for (let i in h1Text) {
    const letter = h1Text[i];
    const colorIndex = Math.floor(i * colorRatio);
    const div = document.createElement("div");
    div.innerHTML = (letter == ' ') ? '&nbsp;' : letter;
    div.className=`text-yellow-${yellows[colorIndex]}`;
    h1.appendChild(div);
}
