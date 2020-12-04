import { controller, target } from "@github/catalyst"

import { EventData, platform } from "../../core/core";

import { ComboItem } from "../../model/models";
import { IxComboElement } from '../../atomic/components';
import { IxTxnTransferRender } from "./IxTxnTransferRender";
import { IxTxnTransferDataGarden, IxTxnTransferViewModel } from "./IxTxnTransferDataGarden";

const logger = platform.newLogger("IxTxnTransfer2")

@controller
class IxTxnTransfer2Element extends HTMLElement {
  garden : IxTxnTransferDataGarden
  render : IxTxnTransferRender
  
  @target payer: IxComboElement;
  @target payee: IxComboElement;
  @target amount: HTMLInputElement;

  @target submitDesc: HTMLSpanElement;

  async connectedCallback() {
    this.garden = new IxTxnTransferDataGarden();
    this.render = new IxTxnTransferRender();

    await this.garden.loadInitData();
    
    this.render.renderHome(this);

    await this._homeViewIint();

    this._registerEvent();

    logger.info("DONE")
  }

  /**
   * Home頁初始化
   */
  async _homeViewIint() {
    //set component default value
    this.payer.updateOption(this.garden.getPayer());
  }

  /**
   * Home頁資料取得
   */
  _homeDataFetch() {
    return {
      payee : this.payee.getAttribute("value"),
      payer : this.payer.getAttribute("value"),
      amount : parseInt(this.amount.value,10)
    }
  }

  /**
   * 事件初始化
   */
  _registerEvent() {
    this.addEventListener("loaded", ((event: CustomEvent) => {
      logger.info('EventData:' + event.detail)
      }) as EventListener);
  
      let event = new CustomEvent('loaded', {detail: 3});
      this.dispatchEvent(event);
  }

  /**
   * 轉出帳號變更
   */
  doPayerChanged(event : CustomEvent) {
    let data : EventData = this.garden.getEventData(event);
    let payee = this.garden.getPayee(data.value);
    this.payee.updateOption(payee);
  }

  /**
   * 下一步
   */
  doHomeAction() {
    var viewData = this._homeDataFetch();

    logger.info(viewData);
    this.submitDesc.textContent= JSON.stringify(viewData ,null, 2);
    this.submitDesc.hidden=false;
  }
}

export {IxTxnTransfer2Element, IxTxnTransferRender, IxTxnTransferDataGarden}
