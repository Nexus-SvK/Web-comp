"use strict";
class TsType extends HTMLElement {
    constructor() {
        super();
        this.stringToBoolean = function (input) {
            switch (input.toLowerCase().trim()) {
                case "true":
                case "yes":
                case "1":
                    return true;
                case "false":
                case "no":
                case "0":
                case null:
                    return false;
                default:
                    return Boolean(input);
            }
        };
        this.attachShadow({ mode: "open" });
        this.txt = "";
    }
    // CTRL + /
    get word() {
        return String(this.getAttribute("word"));
    }
    get onoffx() {
        return String(this.getAttribute("onoffx"));
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
        let desi = this.stringToBoolean(this.onoffx);
        const fullTxt = this.word;
        // Check if deleting
        if (!desi) {
            if (this.txt != "") {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            }
        }
        else {
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
        margin: 0;
      }
  </style>
      <p class="txt">${this.txt}</p>`;
        // Initial Type Speed
        let typeSpeed = 300;
        if (!desi) {
            typeSpeed /= 2;
        }
        if (this.txt != fullTxt) {
            setTimeout(() => this.type(), typeSpeed);
        }
    }
}
customElements.define("type-writer", TsType);
//!this.txt == "" &&
