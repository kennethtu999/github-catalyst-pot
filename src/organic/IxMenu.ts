import { controller, target } from "@github/catalyst";
import { platform } from "../core/core";

const logger = platform.newLogger("IxMenu")

const template = document.createElement("template");
template.innerHTML = `<style>
            ul {
              list-style-type: none;
              margin: 0;
              padding: 0;
              overflow: hidden;
              background-color: #333;
            }

            li {
              float: left;
            }

            li a {
              display: block;
              color: white;
              text-align: center;
              padding: 14px 16px;
              text-decoration: none;
            }

            li a:hover:not(.active) {
              background-color: #111;
            }

            .active {
              background-color: #4CAF50;
            }
            </style>
            
            <ul>
              <li><a href="#home" data-action="click:ix-menu#changeMenu">Home</a></li>
              <li><a href="#news" data-action="click:ix-menu#changeMenu">News</a></li>
              <li><a href="#contact" data-action="click:ix-menu#changeMenu">Contact</a></li>
              <li style="float:right"><a class="active" href="#about" data-action="click:ix-menu#changeMenu">About</a></li>
            </ul>
`;

@controller
class IxMenuElement extends HTMLElement {
  @target value: HTMLElement;

  count: number = 0;

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    this._addEventListener();
  }


  _addEventListener() {
    let listener : EventListener = ((event: CustomEvent) => {
      console.log('here');
      document.append("<div>here</div>")
      console.log(event.detail);


    }) as EventListener;

    document.addEventListener("ix-menu", listener, false);
  }

  _sendEvent(taskId:string) {
    let event = new CustomEvent('ix-platform', {detail: taskId});
    document.dispatchEvent(event);
  }

  changeMenu( event : UIEvent) {
    let taskId = (event.target as HTMLElement).getAttribute("href");
    logger.info(`changeMenu: ${taskId}`);
    this._sendEvent("" + taskId);
  }
}

export {IxMenuElement}