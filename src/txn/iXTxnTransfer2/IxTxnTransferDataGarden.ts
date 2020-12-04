import { EventData, platform } from "../../core/core";
import { ComboItem } from "../../model/models";

const logger = platform.newLogger("IxTxnTransfer2")

const _removeNulls = <S>(value: S | undefined): value is S => value != null;
const removeNulls = (collection:any) => {
    return  Array.from(collection.values()).filter(_removeNulls);
}

class IxTxnTransferViewModel {
  payer: ComboItem[]
  payee: ComboItem[]
  amount: number
}

class IxTxnTransferDataGarden  {
  
  viewModel : IxTxnTransferViewModel

  async loadInitData() {
    const initData = await (await fetch(
      "data_ix_txn_transfer.json"
    )).json();

    this.viewModel = initData;
    logger.info(this.viewModel)
  }

  /**
   * 取得轉出帳號
   */
  getPayer(): ComboItem[] {
    return this.viewModel.payer
  }

  /**
   * 取得轉入帳號
   */
  getPayee(parent:string): ComboItem[] {
    return removeNulls(this.viewModel.payee.map(function(item) {
      return (parent !== item.parent) ? null : new ComboItem(item.label, item.value, '');
    })) as ComboItem[] ;
  }

  /** EventData */
  getEventData( event : CustomEvent) {
    logger.info(`doPayerChanged ${JSON.stringify(event.detail)}`)
    return event.detail as EventData;
  }
}

export {IxTxnTransferDataGarden, IxTxnTransferViewModel}
