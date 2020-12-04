import { controller, target } from "@github/catalyst"
import { IxComboElement } from '../atomic/components';

@controller
class IxTxnTransferElement extends HTMLElement {
  @target payer: IxComboElement;
  @target payee: IxComboElement;

  connectedCallback() {
    console.log("HERE") 
    console.log(this.payer)
    console.log(this.payer.className)

    this.addEventListener("loaded", ((event: CustomEvent) => {
    console.log('EventData:' + event.detail)
    }) as EventListener);

    let event = new CustomEvent('loaded', {detail: 3});
    this.dispatchEvent(event);

    console.log("DONE")
  }

  modelUpdate(e: UIEvent) {
    console.log(e.detail);
    let event = new CustomEvent('loaded', {detail: 3});
    this.dispatchEvent(event);
    
  }
  modelUpdate2(e: CustomEvent) {
    console.log('EventData2:' + JSON.stringify(e.detail))

  }
}

export {IxTxnTransferElement}
