const searchbox = document.querySelector("#searchbox");
const weather = document.querySelector("#weather");
const submit = document.querySelector("#sub");
let searchvalue = "";
searchbox.addEventListener("change", function (e) {
  searchvalue = e.target.value;
});
submit.addEventListener("click", function () {
  weather.setAttribute("loc", searchvalue);
  searchbox.setAttribute("value", "");
});
document.addEventListener("keypress", function (e) {
  let name = e.key;
  console.log(e.key);
  if (name === "Enter") {
    e.preventDefault();
    weather.setAttribute("loc", searchvalue);
    searchbox.setAttribute("value", " fuck");
  }
});
