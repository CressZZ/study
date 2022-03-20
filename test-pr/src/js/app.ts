import {setFlatpickr, selectedDatesForApi, selectedPriceForAPi} from './setFlatpickr';

window.addEventListener('DOMContentLoaded', ()=>{


  // date picker
  let datePicker = setFlatpickr();

  window.openPurchaseLayer = openPurchaseLayer;
  window.datePicker = datePicker;

  window.openPurchaseLayer();
  console.log(window.openPurchaseLayer);

  document.querySelector('.open-layer')!.addEventListener('click', openPurchaseLayer);

  // 레이어 오픈
  function openPurchaseLayer(){
    let ElPurchaseBannerLayer = document.querySelector('.purchase-banner-layer');
    if(ElPurchaseBannerLayer instanceof HTMLElement){
      ElPurchaseBannerLayer.style.display = 'block';
    }
  }


  function clasePurchaseLayer(){
    let ElPurchaseBannerLayer = document.querySelector('.purchase-banner-layer');

    if(ElPurchaseBannerLayer instanceof HTMLElement){
      ElPurchaseBannerLayer.style.display = 'none';
    }
  }

  // 닫기 버튼
  let ElBtnClose = document.querySelector('.purchase-banner-section-top .close');
  if(ElBtnClose instanceof HTMLElement){
    ElBtnClose.addEventListener('click', clasePurchaseLayer);
  }

  // 서버 선택 셀렉트 박스
  let ElInfoServer =  document.querySelector('#infoServer');
  if(ElInfoServer instanceof HTMLElement){
    ElInfoServer.addEventListener('change', (e)=>{
      console.log(e.currentTarget);
      if (e.currentTarget instanceof HTMLElement){
        e.currentTarget.style.color = 'black';
      }
    });
  }

  let ElBtnPurchase = document.querySelector('.btn-purchase');
  if(ElInfoServer instanceof HTMLElement){
    ElBtnPurchase?.addEventListener('click', ()=>{

      let data: Record<string, unknown> = {
        price : selectedPriceForAPi,
        date: selectedDatesForApi,
        type: getBannerType(),
        server: getSelectedServer(),
        name: getGuildName(),
        desc: getGuildDesc(),
        url: getGuildUrl()
      };

      if(!isValid(data)){

        return false;
      }

      console.log('Call API ', data);
    });

  }
  function isValid(data: Record<string, unknown>){
    let isValid = true;

    for (const key in data){
      console.log(key, ':', data[key]);
      if(!data[key]){
        isValid = false;
      }
    }

    return isValid;
  }

  function getBannerType(){
    let ElInfoBannerType = document.querySelector('input[name="bannertype"]:checked');
    if(ElInfoBannerType instanceof HTMLInputElement){
      return ElInfoBannerType.value;
    }else{
      return null;
    }
  }
  function getSelectedServer(){
    let ElInfoServer = document.querySelector('#infoServer');
    if(ElInfoServer instanceof HTMLSelectElement){
      return ElInfoServer.value;
    }else{
      return null;
    }
  }

  function getGuildName(){
    let ElInfoName = document.querySelector('#infoName');
    console.log(typeof ElInfoName);
    if(ElInfoName instanceof HTMLInputElement){
      return ElInfoName.value;
    }else{
      return null;
    }
  }

  function getGuildDesc(){
    let ElInfoDesc = document.querySelector('#infoDesc');
    console.log(typeof ElInfoDesc);
    if(ElInfoDesc instanceof HTMLTextAreaElement){
      return ElInfoDesc.value;
    }else{
      return null;
    }
  }

  function getGuildUrl(){
    let ElInfoUrl = document.querySelector('#guildUrl');
    if(ElInfoUrl instanceof HTMLInputElement){
      return ElInfoUrl.value;
    }else{
      return null;
    }
  }
});


if (module.hot) {
  module.hot.accept();
}
