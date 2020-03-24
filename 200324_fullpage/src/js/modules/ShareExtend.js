import $ from 'jquery';
import { isObject, copyTextToClipboard } from '../common/util';

export default (() => {
  return class {
    constructor( { $wrap, shareData, haveCopyUrl, clickCallback } ) {
      this.$wrap = $wrap;
      this.shareData = shareData;
      this.haveCopyUrl = haveCopyUrl;
      this.clickCallback = clickCallback;

      this.$shareList = $('.share-list', this.$wrap);
      this.$shareKakaotalk =  $('.share-kakaotalk', this.$wrap);
      this.$shareKakaostory =  $('.share-kakaostory', this.$wrap);
      this.$shareFacebook =  $('.share-facebook', this.$wrap);
      this.$shareTwitter =  $('.share-twitter', this.$wrap);

      this.init();
    }

    init (){
      this.setShareBtns();
      this.bindingEvetn();
    }

    setShareBtns () {
      if (!isObject(this.shareData)) return false;

      this._url = this.shareData.url;

      if (this.haveCopyUrl){
        this.$shareList.append('<a class="share-copy">복사</a>');
        this.$shareCopy = $('.share-copy', this.$wrap);
        this.setCopyUrlBtn();
      }
    }

    bindingEvetn = () => {
      if (!this.clickCallback) return false;

      this.$shareKakaotalk.on('click', () => {
        this.clickCallback('kakaotalk');
      });

      this.$shareKakaostory.on('click', () => {
        this.clickCallback('kakaostory');
      });

      this.$shareFacebook.on('click', () => {
        this.clickCallback('facebook');
      });

      this.$shareTwitter.on('click', () => {
        this.clickCallback('twitter');
      });

      this.$shareCopy && this.$shareCopy.on('click', () => {
        this.clickCallback('copy');
      });
    };

    setCopyUrlBtn() {
      this.$shareCopy.on('click',  (evt) => {
        evt.preventDefault();

        const text = this._url;

        if (text.length <= 0) return;

        copyTextToClipboard(
          text,
          () => { window.alert('URL이 복사되었습니다. 친구에게 공유해보세요.'); },
          () => { window.prompt('URL을 복사하여 친구에게 공유해보세요.', text); }
        );
      });
    }

  };

})();
