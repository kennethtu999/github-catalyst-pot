import { controller, target } from "@github/catalyst"
import { IxComboElement } from '../atomic/components';
import { ComboItem } from "../model/models";


const _removeNulls = <S>(value: S | undefined): value is S => value != null;
const removeNulls = (collection:any) => {
    return  Array.from(collection.values()).filter(_removeNulls);
}
class IxTxnTransferModel {
  payer: ComboItem[]
  payee: ComboItem[]
  amount: number =0
}

@controller
class IxTxnTransferElement extends HTMLElement {
  viewModel : IxTxnTransferModel;
  
  @target payer: IxComboElement;
  @target payee: IxComboElement;
  @target amount: HTMLInputElement;

  @target submitDesc: HTMLSpanElement;
  
  async connectedCallback() {
    const initData = await (await fetch(
      "data_ix_txn_transfer.json"
    )).json();

    this.viewModel = initData;
    console.log(this.viewModel)

    this._initView();

    this._registerEvent();

    console.log("DONE")
  }

  /**
   * 頁面初始化
   */
  _initView() {
    //convert format if necessary
    let payeeItems = this.viewModel.payee.map(function(item) {
      return new ComboItem(item.label, item.value, '');
    });

    //set component default value
    this.payer.updateOption(this.viewModel.payer);
    
    this.submitDesc.hidden=true;
  }

  /**
   * 事件初始化
   */
  _registerEvent() {
    this.addEventListener("loaded", ((event: CustomEvent) => {
      console.log('EventData:' + event.detail)
      }) as EventListener);
  
      let event = new CustomEvent('loaded', {detail: 3});
      this.dispatchEvent(event);
  }

  /**
   * 轉出帳號變更
   */
  doPayerChanged(event : CustomEvent) {
    let data = event.detail;
    console.log(`doPayerChanged ${JSON.stringify(data)}`)

    //取得轉入帳號
    let payeeItems = removeNulls(this.viewModel.payee.map(function(item) {
      return (data.value !== item.parent) ? null : new ComboItem(item.label, item.value, '');
    })) as ComboItem[] ;
    
    this.payee.updateOption(payeeItems);
  }

  _fetchViewData() {
    return {
      payee : this.payee.getAttribute("value"),
      payer : this.payer.getAttribute("value"),
      amount : parseInt(this.amount.value,10)
    }
  }

  /**
   * 下一步
   */
  doAction() {
    var viewData = this._fetchViewData();
    console.log(viewData);
    this.submitDesc.textContent= JSON.stringify(viewData ,null, 2);
    this.submitDesc.hidden=false;
  }
}

export {IxTxnTransferElement}
