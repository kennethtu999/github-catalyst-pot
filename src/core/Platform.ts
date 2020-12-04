class Platform {
  newLogger(name:string) {
    return new Logger(name);
  }
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

let platform = new Platform();

export {platform, Logger}