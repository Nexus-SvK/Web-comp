let val = false;
const btn = document.querySelector("#push");
const type = document.querySelector("#type");
btn.addEventListener("click", () => {
  val = !val;
  if (val) {
    type.setAttribute("onoffx", "true");
  } else {
    type.setAttribute("onoffx", "false");
  }
});
