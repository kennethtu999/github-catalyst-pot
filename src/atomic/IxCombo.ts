import { controller, target, targets } from "@github/catalyst";

class ComboItem {
  label:string
  value:string
  parent: ComboItem
  childs: ComboItem[]

  addItem(item : ComboItem) {
    item.parent = this;
    this.childs.push(item);
  }
}

class DropdownMenu {
  dropdownMenu: HTMLSelectElement;
  options: HTMLOptionsCollection;

  constructor(dropdown: HTMLSelectElement) {
      this.dropdownMenu = dropdown;
      this.options = dropdown.options;
  }

  addOption(label:string, value: string) {
    let option = document.createElement("option");
    option.setAttribute('value',value);
    option.text = label;
    this.options.add(option);
  }

  OnChange() {
      alert(this.options[this.options.selectedIndex].value);
      document.location.href = this.options[this.options.selectedIndex].value;
  }
}

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
class IxComboElement extends HTMLElement {
  @target model: ComboItem[]
  
  menu : DropdownMenu
  
  originalVal : string = '';

  connectedCallback() {
    
    let select = document.createElement("select");
    this.menu = new DropdownMenu(select);
    this.menu.addOption("Label1", "Value1");
    this.menu.addOption("Label2", "Value2");
    
    let listener : EventListener = ((event: UIEvent) => {
      if (this.originalVal !== (event.target as HTMLSelectElement).value) {
        this.originalVal = (event.target as HTMLSelectElement).value

        let ce = new CustomEvent('ichange', {detail: {
          eid: this.getAttribute("data-eid"),
          value: this.originalVal
        }});
        this.dispatchEvent(ce);
      }

      console.log(`IxComboElement ${event} with value: ${(event.target as HTMLSelectElement).value} `)
    }) as EventListener;

    ["blur", "change"].forEach((eventName) => {
      select.addEventListener(eventName, listener, false);
    });

    this.append(select);
  }

  update(e: UIEvent) {
    //let event = new CustomEvent('loaded', {detail: 3});
    //this.dispatchEvent(event);
  }
}

export { IxComboElement };
