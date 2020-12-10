class ApplicationInfo {
  /** 應用程式名稱 */
  appName :string
  /** 應用程式位置 */
  resourceUri :string
  /** 該應用程式啟用後所必須用到的子應用程式 */
  dependsApplication : String[];
  connector: ApplicationConnector
}

interface ApplicationConnector {
  
  /** 資源載入完成後會呼叫這個啟動 */
  mount() : Promise<boolean>;

  /** 要關閉這個資源時 */
  unmount() : Promise<boolean>;
}


class Logger {
  name:string
  constructor(name:string) {
    this.name = name;
  }
  
  toStr(data:any) {
    return `[${this.name}] ${data instanceof Object ? JSON.stringify(data,null,2) : data}`;
  }

  info(data:any) {
    console.log(this.toStr(data));
  }
  
  debug(data:any) {
    console.log(this.toStr(data));
  }

  trace(data:any) {
    console.log(this.toStr(data));
  }
}

class Platform {
  newLogger(name:string) {
    return new Logger(name);
  }

  register(appInfo : ApplicationInfo) {
    console.log("platform.register")
    let event = new CustomEvent('ix-platform-app', {detail: appInfo});
    document.dispatchEvent(event);
  }

  unmount(appName : string) {
    console.log("platform.unmount")
    let event = new CustomEvent('ix-platform-unmount', {detail: appName});
    document.dispatchEvent(event);

  }
}
let platform = new Platform();

export {platform, Logger, ApplicationInfo, ApplicationConnector}