import { controller } from "@github/catalyst";
import { EventData, platform } from "../core/core";
import { ComboItem, ComboModel} from "./../model/ComboModel";

const logger = platform.newLogger("IxCombo")
const DEFAULT_OPTION : string = "請選擇";
const EVENT_CHANGE :string = 'ichange';

const createSelectElement = (model: ComboModel) => {
  let l1 :HTMLSelectElement = document.createElement("select");
  l1.setAttribute('name', model.name);
  
  createOptionElement(l1, model.items);
  
  return l1;
};

const createOptionElement = (selectElement:HTMLSelectElement, items: ComboItem[]) => {
  //remove all options
  var element = selectElement.getElementsByTagName("option"), index;
  for (index = element.length - 1; index >= 0; index--) {
      element[index].parentNode?.removeChild(element[index]);
  }
  
  //build default option
  let l2 = document.createElement("option");
  l2.setAttribute('value','');
  l2.text = DEFAULT_OPTION;
  selectElement.appendChild(l2);

  //build all options
  items?.forEach((item) => {
    let l2 = document.createElement("option");
    l2.value = item.value;
    l2.text = item.label;
    selectElement.appendChild(l2);
  })
};


@controller
class IxComboElement extends HTMLElement {
  mainEntry : HTMLSelectElement
  
  originalVal : string = '';

  connectedCallback() {
    let model = new ComboModel("A1");
    
    this.mainEntry = createSelectElement(model);
    this._addEventListener();
    this.append(this.mainEntry);
  }

   _addEventListener() {
    let listener : EventListener = ((event: UIEvent) => {
      if (this.originalVal === (event.target as HTMLSelectElement).value) {
        return;
      }

      this.originalVal = (event.target as HTMLSelectElement).value
      this.setAttribute("value", this.originalVal);
        
      let eventData = new EventData("IxCombo");
      eventData.value = this.originalVal;

      this.dispatchEvent( new CustomEvent(EVENT_CHANGE, {detail:eventData}))
      
      logger.trace(`IxComboElement ${event} with value: ${(event.target as HTMLSelectElement).value} `)
    }) as EventListener;

    ["blur", "change"].forEach((eventName) => {
      this.mainEntry.addEventListener(eventName, listener, false);
    });
  }

  updateOption( items : ComboItem[]) {
    //add options
    createOptionElement(this.mainEntry, items);
  }
}

export { IxComboElement };
