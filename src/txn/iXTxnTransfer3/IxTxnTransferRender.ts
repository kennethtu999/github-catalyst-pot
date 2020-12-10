import { findTargets } from "@github/catalyst";


const genPageLoading = () => {
  let page : HTMLElement = document.createElement("div");
  page.setAttribute("class", "_page_ _page_loading_");

  page.innerHTML = `
    <style>
      .loader {
        border: 16px solid #f3f3f3; /* Light grey */
        border-top: 16px solid #3498db; /* Blue */
        border-radius: 50%;
        width: 60px;
        height: 60px;
        animation: spin 2s linear infinite;

        position: absolute;
        left: 50%;
        margin-left: -30px;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
    <div class="loader"></div>
  `
  return page;
}

const genPageHome = () => {
  let page : HTMLElement = document.createElement("div");
  page.setAttribute("class", "_page_ _page_home_");

  page.innerHTML = `
    <div class="grid-container">
        <div class='grid-item'>轉出帳號:</div>
        <div class='grid-item'>
          <ix-combo data-id="payer" data-target="ix-txn-transfer3.payer" data-action="ichange:ix-txn-transfer3#doPayerChanged"></ix-combo></div>
    
        <div class='grid-item'>轉入帳號:</div>
        <div class='grid-item'>
          <ix-combo data-id="payee" data-target="ix-txn-transfer3.payee" data-action="ichange:ix-txn-transfer#modelUpdate2"></ix-combo></div>
    
        <div class='grid-item'>金額: </div>
        <div class='grid-item'>
          <input data-target="ix-txn-transfer3.amount"></input></div>
    </div>
    
    <input type="button" value="下一步" data-action="click:ix-txn-transfer3#doActionHome"></input>
    <input type="button" value="關閉" data-action="click:ix-txn-transfer3#doClose"></input>
    <pre class="message" hidden="true" data-target="ix-txn-transfer3.submitDesc"></pre>
  `
  return page;
}

const genPageConfirm = (data : any) => {
  let page : HTMLElement = document.createElement("div");
  page.setAttribute("class", "_page_ _page_confirm_");

  page.innerHTML = `
    <div class="grid-container">
        <div class='grid-item'>轉出帳號:</div>
        <div class='grid-item'>
          <span data-eid="payer">${data.payer}</span></div>
    
        <div class='grid-item'>轉入帳號:</div>
        <div class='grid-item'>
          <span data-eid="payer">${data.payee}</span></div>
    
        <div class='grid-item'>金額: </div>
        <div class='grid-item'>
          <span data-eid="payer">${data.amount}</span></div>
    </div>
    
    <input type="button" value="確認" data-action="click:ix-txn-transfer3#doActionConfirm"></input>
    <pre class="message" hidden="true" data-target="ix-txn-transfer3.submitDesc"></pre>
  `
  return page;
}


const genPageResult = (data : any) => {
  let page : HTMLElement = document.createElement("div");
  page.setAttribute("class", "_page_ _page_result_");

  page.innerHTML = `
    <div class="grid-container">
        <div class='grid-item'>交易狀態</div>
        <div class='grid-item'>
          <span data-eid="payer" style="color:blue;">成功</span></div>

        <div class='grid-item'>轉出帳號:</div>
        <div class='grid-item'>
          <span data-eid="payer">${data.payer}</span></div>
    
        <div class='grid-item'>轉入帳號:</div>
        <div class='grid-item'>
          <span data-eid="payer">${data.payee}</span></div>
    
        <div class='grid-item'>金額: </div>
        <div class='grid-item'>
          <span data-eid="payer">${data.amount}</span></div>
    </div>
    
    <input type="button" value="再做一筆" data-action="click:ix-txn-transfer3#doActionRenew"></input>
    <input type="button" value="關閉" data-action="click:ix-txn-transfer3#doClose"></input>
    
  `
  return page;
}

class IxTxnTransferRender  {
  pages : Map<String, HTMLElement> = new Map();

  removeAll(container: HTMLElement) {
    this.pages.forEach(( v, k, map) => {
      if ( k !== 'loading') {
        v.remove();
        map.delete(k);
      }
    });
  }

  _hideAll(container: HTMLElement, exceptPage: string) {
    this.pages.forEach(( v, k, map) => {
      v.hidden = (k === exceptPage) ? false : true;
    });
  }

  renderLoading(container: HTMLElement) {
    if (!this.pages.get("loading")) {
      let page = genPageLoading();
      this.pages.set('loading', page);
      container.append(page);
    } else {
      this._hideAll(container, 'loading');
    }
  }

  renderHome(container: HTMLElement) {
    let page = genPageHome();
    this.pages.set('home', page);
    container.append(page);
    this._hideAll(container, 'home');
  }

  renderConfirm(container: HTMLElement, data : any) {
    let page = genPageConfirm(data);
    this.pages.set('confirm', page);
    container.append(page);
    this._hideAll(container, 'confirm');
  }

  renderResult(container: HTMLElement, data : any) {
    let page = genPageResult(data);
    this.pages.set('result', page);
    container.append(page);
    this._hideAll(container, 'result');
  }

}

export {IxTxnTransferRender}
