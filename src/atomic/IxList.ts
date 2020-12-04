import { controller, target, targets } from "@github/catalyst";

class Util {
  CreateElement(label:string) {
    var li = document.createElement("li");
    var element = document.createElement("input");
    li.appendChild(element);

    element.setAttribute("type", "button");
    element.setAttribute("data-targets", "ix-list.items");
    element.setAttribute("data-action", "click:ix-list#removeItem");
    element.setAttribute("value", label);
    element.setAttribute("style", "color:Red");
    return li;
  }
}

@controller
class IxListElement extends HTMLElement {
  @target container: HTMLElement;
  @target input: HTMLInputElement;
  @targets items: HTMLElement[];
  
  addItem(event:UIEvent) {
    if (event instanceof KeyboardEvent && (event as KeyboardEvent).key !== 'Enter') {
      return;
    }

    let val = this.input.value;
    if (val === '') {
      return; 
    }
    
    var util = new Util();  
    this.container.appendChild(util.CreateElement(val));
    this.input.value = '';
  }
  
  removeItem(event: { target: HTMLElement; }) {
    if (event.target.parentElement) {
      event.target.parentElement.remove();
    }
  }
}

export { IxListElement };
