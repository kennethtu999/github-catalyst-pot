import { controller, target } from "@github/catalyst";

const template = document.createElement("template");
template.innerHTML = `<style>
          * {
            font-size: 200%;
          }

          span {
            width: 4rem;
            display: inline-block;
            text-align: center;
          }

          button {
            width: 4rem;
            height: 4rem;
            border: none;
            border-radius: 10px;
            background-color: seagreen;
            color: white;
          }
        </style>
        <button data-action="click:ix-counter#dec">-</button>
        <span data-target="ix-counter.value"></span>
        <button data-action="click:ix-counter#inc">+</button>`;

@controller
class IxCounterElement extends HTMLElement {
  @target value: HTMLElement;

  count: number = 0;

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    this.update();
  }

  inc() {
    this.count++;
    this.update();
  }

  dec() {
    this.count--;
    this.update();
  }

  update() {
    this.value.textContent = "" + this.count;
  }
}

export {IxCounterElement}