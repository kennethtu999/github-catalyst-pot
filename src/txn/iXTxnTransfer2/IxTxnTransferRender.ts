
const newPage = () => {
  let page : HTMLElement = document.createElement("div");
  page.setAttribute("id", "home");

  page.innerHTML = `
    <div class="grid-container">
        <div class='grid-item'>轉出帳號:</div>
        <div class='grid-item'>
          <ix-combo data-eid="payer" data-target="ix-txn-transfer2.payer" data-action="ichange:ix-txn-transfer2#doPayerChanged"></ix-combo></div>
    
        <div class='grid-item'>轉入帳號:</div>
        <div class='grid-item'>
          <ix-combo data-eid="payee" data-target="ix-txn-transfer2.payee" data-action="ichange:ix-txn-transfer#modelUpdate2"></ix-combo></div>
    
        <div class='grid-item'>金額: </div>
        <div class='grid-item'>
          <input data-target="ix-txn-transfer2.amount"></input></div>
    </div>
    
    <input type="button" value="下一步" data-action="click:ix-txn-transfer2#doHomeAction"></input>
    <pre class="message" hidden="true" data-target="ix-txn-transfer2.submitDesc"></pre>
  `
  return page;
}

class IxTxnTransferRender  {

  renderHome(container: HTMLElement) {
    container.append(newPage());
  }
}

export {IxTxnTransferRender}
