class Type extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.txt = "";
    this.wait = parseInt(10000, 10);
    this.onoffx;
    this.type();
  }
  // CTRL + /
  get word() {
    return String(this.getAttribute("word"));
  }

  get onoffx() {
    return Boolean(this.getAttribute("onoffx"));
  }

  static get observedAttributes() {
    return ["word", "onoffx"];
  }

  attributeChangedCallback(prop, oldVal, newVal) {
    if (prop === "onoffx") {
      this.type();
    }
  }

  type() {
    const fullTxt = this.word;

    // Check if deleting
    if (!this.onoffx) {
      if (this.txt != "") {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      }
    } else {
      if (this.txt != fullTxt) {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
    }

    // Insert txt into element
    this.shadowRoot.innerHTML = `
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Sniglet:wght@800&display=swap');
    .txt{
      font-family: 'Sniglet', cursive;
      font-size: 64px;
    }
</style>
    <p class="txt">${this.txt}</p>`;

    // Initial Type Speed
    let typeSpeed = 300;

    if (!this.onoffx) {
      typeSpeed /= 2;
    }
    if (!this.txt == "" && this.txt != fullTxt) {
      setTimeout(() => this.type(), typeSpeed);
    }
  }
}
customElements.define("type-writer", Type);
