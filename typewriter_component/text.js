let val = true;
const btn = document.querySelector("#push");
const type = document.querySelector("#type");
btn.addEventListener("click", () => {
  val = !val;
  if (val) {
    type.setAttribute("onoffx", "1");
  } else {
    type.setAttribute("onoffx", "");
  }
});
