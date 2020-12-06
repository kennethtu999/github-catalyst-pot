import { controller } from "@github/catalyst";
import { platform } from "../core/core";

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
class PlatformTrackingElement extends HTMLElement {
  mainEntry : HTMLSelectElement
  
  originalVal : string = '';

  connectedCallback() {
    window._ga_cun="A123456789"

    let obj: DataLayerObject = {
      event: 'customUser',
      userId : "A123456789"
    };
    pushToDataLayer(obj);
  }

  save(event:Event) {
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

export { PlatformTrackingElement };
