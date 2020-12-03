import { controller, target } from "@github/catalyst"

@controller
class HelloWorldElement extends HTMLElement {
  @target output: HTMLElement

  greet() {
    this.output.textContent = `Hello, Kenneth!`
  }
}