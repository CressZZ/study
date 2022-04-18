

let ElTabPurchaseWrap: HTMLElement | null = document.querySelector('.tab-purchase-wrap');

ElTabPurchaseWrap?.addEventListener('click', (e: MouseEvent)=>{
  if(e.target instanceof HTMLElement){
    let ElTargetTab = e.target.closest('.tab-purchase');
    if(ElTargetTab instanceof HTMLElement) {
      showTabContPurchase(ElTargetTab);
    }
  }
});

function showTabContPurchase(ElTargetTab: HTMLElement){
  Array.prototype.forEach.call(document.querySelectorAll('.tab-purchase'), (ElTab: HTMLElement)=>{
    ElTab.classList.remove('tab-active');

  });

  Array.prototype.forEach.call(document.querySelectorAll('.cont-purchase'), (ElCont: HTMLElement)=>{
    ElCont.classList.remove('cont-active');
  });

  ElTargetTab.classList.add('tab-active');
  document.querySelector(`.${ElTargetTab.dataset.cont}`)?.classList.add('cont-active');
}

if (module.hot) {
  module.hot.accept();
}
