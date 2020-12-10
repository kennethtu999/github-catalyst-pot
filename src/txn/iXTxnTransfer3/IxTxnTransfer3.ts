import { controller, target } from "@github/catalyst"

import { EventData, platform, ApplicationInfo, ApplicationConnector} from "../../core/core";

import { ComboItem } from "../../model/models";
import { IxComboElement } from '../../atomic/components';
import { IxTxnTransferRender } from "./IxTxnTransferRender";
import { IxTxnTransferDataGarden, IxTxnTransferViewModel } from "./IxTxnTransferDataGarden";

const logger = platform.newLogger("IxTxnTransfer3")

const timeout = (ms:number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const sleep = async (ms:number) => {
  await timeout(ms);
}

/**
 * 與平台的接口
 */
class AppConnector implements ApplicationConnector {
  door : IxTxnTransfer3Element;
  constructor(door : IxTxnTransfer3Element) {
    this.door = door;
  }

  mount(): Promise<boolean> {
    logger.info('mount')
    let p = new Promise<boolean>(async (resolve) => {
      await this.door.platformMount();
        resolve(true);
    });
    return p;
  }

  unmount(): Promise<boolean> {
    logger.info('unmount')
    let p = new Promise<boolean>((resolve) => {
      platform.unmount("ix-txn-transfer3");
      resolve(false);
    });
    return p;
  }
}

/**
 * 頁面共用
 */
abstract class Ctrl {
  door : IxTxnTransfer3Element
  garden : IxTxnTransferDataGarden
  render : IxTxnTransferRender
  appConnector : AppConnector;

  constructor(door : IxTxnTransfer3Element, appConnector: AppConnector) {
    this.door = door
    this.garden = door.garden
    this.render = door.render
    this.appConnector = appConnector;
  }

  /**
   * Home頁資料取得
   */
  getFormData() {
    return {
      payee : this.door.payee.getAttribute("value"),
      payer : this.door.payer.getAttribute("value"),
      amount : parseInt(this.door.amount.value,10)
    }
  }
}

/**
 * 首頁
 */
class HomeController extends Ctrl {

  async platformMount() {
    await this.garden.loadInitData();
    
    this.render.renderLoading(this.door);
    
    //停1秒再顯示畫面
    await sleep(1000);
    
    this.render.renderHome(this.door);
    
    await this.homeViewIint();
  }

  /**
   * Home頁初始化
   */
  async homeViewIint() {
    //set component default value
    this.door.payer.updateOption(this.door.garden.getPayer());
  }

  /**
   * 下一步
   */
  async doActionHome() {
    var viewData = this.getFormData();

    if ( viewData.payer && viewData.payee && viewData.amount) {
      this.render.renderLoading(this.door);
      //停1.5秒再顯示畫面
      await sleep(1500);
      this.render.renderConfirm(this.door, viewData);
      this.door.submitDesc.hidden=true;
      
    } else {
      this.door.submitDesc.textContent= JSON.stringify(viewData ,null, 2);
      this.door.submitDesc.hidden=false;
    }
  }


  async doActionRenew() {
    this.render.renderLoading(this.door);
    //停1.5秒再顯示畫面
    await sleep(1500);

    this.render.removeAll(this.door);

    this.render.renderHome(this.door);
    
    await this.homeViewIint();

  }
}

/**
 * 確認頁
 */
class ConfirmController extends Ctrl {
  /**
   * 確認
   */
  async doActionConfirm() {
    ConfirmController
    var viewData = this.getFormData();

    this.render.renderLoading(this.door);
    //停1.5秒再顯示畫面
    await sleep(1500);
    this.render.renderResult(this.door, viewData);
  }
}


@controller
class IxTxnTransfer3Element extends HTMLElement {
  garden : IxTxnTransferDataGarden
  render : IxTxnTransferRender

  homeController : HomeController;
  confirmController : ConfirmController;
  
  appConnector : AppConnector;

  @target payer: IxComboElement;
  @target payee: IxComboElement;
  @target amount: HTMLInputElement;

  @target submitDesc: HTMLSpanElement;

  async connectedCallback() {
    this.garden = new IxTxnTransferDataGarden();
    this.render = new IxTxnTransferRender();
    this.appConnector = new AppConnector(this);
    this.homeController = new HomeController(this, this.appConnector);
    this.confirmController = new ConfirmController(this, this.appConnector);

    let info = new ApplicationInfo();
    info.appName = "ix-txn-transfer3"
    info.resourceUri = ''
    info.connector = this.appConnector
   
    platform.register(info);
  }

  async platformMount() {
    await this.homeController.platformMount();
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
  async doActionHome() {
    await this.homeController.doActionHome();
  }

  /**
   * 確認
   */
  async doActionConfirm() {
    await this.confirmController.doActionConfirm();
  }


  /**
   * 重新交易
   */
  async doActionRenew() {
    await this.homeController.doActionRenew();
  }

  /**
   * 關閉交易
   */
  async doClose() {
    this.appConnector.unmount();
  }
}

export {IxTxnTransfer3Element, IxTxnTransferRender, IxTxnTransferDataGarden}
