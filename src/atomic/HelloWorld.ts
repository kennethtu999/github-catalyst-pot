import { controller, target } from "@github/catalyst";


@controller
class HelloWorldElement extends HTMLElement {
  @target output: HTMLElement;
  
  cnt:number = 1;

  greet() {
    this.output.textContent = `Hello Counter ${this.cnt++} times!`;
  }
}

export {HelloWorldElement}