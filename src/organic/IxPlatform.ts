import { controller } from "@github/catalyst";
import { ApplicationInfo, platform } from "../core/core";

const logger = platform.newLogger("PlatformTracking")

declare global {
  interface Window {
    dataLayer?: object[];
    _ga_cun ?: string
  }
}

export type DataLayerEventName =
  | 'customUser'
  | 'customEvent'
  | 'customPage'
  | 'DataLayerObject'
  | 'pageviewCustomEvent';
  
interface UserData {
  userId: string | undefined;
}

interface EventData {
  category: string;
  action: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
}

interface PageData {
  path: string;
}

interface DataLayerObject {
  event: DataLayerEventName;
  userId ?: string,
  userData?: UserData;
  eventData?: EventData;
  pageData?: PageData;
}

const pushToDataLayer = (obj: DataLayerObject) => {
  logger.info("pushToDataLayer")
  logger.info(obj)

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(obj);

  logger.info(window.dataLayer)
};

@controller
class IxPlatformElement extends HTMLElement {
  mainEntry : HTMLSelectElement
  
  originalVal : string = '';

  connectedCallback() {
    window._ga_cun="A123456789"

    let obj: DataLayerObject = {
      event: 'customUser',
      userId : "A123456789"
    };
    pushToDataLayer(obj);
    
    this._addEventListener();
    this._addEventListener2();
    this._addEventListener3();
  }

  _addEventListener() {
    let listener : EventListener = ((event: CustomEvent) => {
      logger.info("info");
      this.append(document.createElement("ix-txn-transfer3"))
    }) as EventListener;

    document.addEventListener("ix-platform", listener, false);
  }

  _addEventListener2() {
    let listener : EventListener = ((event: CustomEvent) => {
      logger.info("hihie33333");
      let info : ApplicationInfo = event.detail;
      if (info != null) {
        info.connector.mount().then(() => {
          logger.info("success mount");
        });
       
      }
    }) as EventListener;
    document.addEventListener("ix-platform-app", listener, false);
    
  }

  _addEventListener3() {
    let listener : EventListener = ((event: CustomEvent) => {
      let appName = event.detail;
      logger.info(`unmount ${appName}`)
      
      let collection = this.getElementsByTagName(appName);
      for (let idx = collection.length-1 ; idx>=0 ; idx--) {
        this.removeChild(collection.item(idx));
        //(collection.item(idx) as HTMLElement).remove();
      }
    }) as EventListener;
    document.addEventListener("ix-platform-unmount", listener, false);
    
  }

  tracking(event:Event) {
    let obj: DataLayerObject = {
      event: 'pageviewCustomEvent',
      eventData: {
        category : "mf" ,
        action : "save" + (event.target as HTMLElement).tagName,
        value : 0
      },
    };
    pushToDataLayer(obj);
  }
}

export { IxPlatformElement };
