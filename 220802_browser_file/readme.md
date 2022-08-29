# 브라우저에서 파일 다루기
https://developer.mozilla.org/ko/docs/Web/API/File_API/Using_files_from_web_applications#%EC%98%88%EC%8B%9C_%EA%B0%9D%EC%B2%B4_url%EC%9D%84_%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC_%EC%9D%B4%EB%AF%B8%EC%A7%80_%ED%91%9C%EC%8B%9C%ED%95%98%EA%B8%B0


# File / FileList
```html

<input type="file" id="fileElem" multiple accept="image/*" class="visually-hidden">
<input type="file" id="fileElem" accept="image/*" class="visually-hidden">

<script>
  const file1List = document.querySelector('#fileElem').files; // FileList 객체 나옴
  const file2List = document.querySelector('#fileElem2').files; // FileList 객체 나옴
  
  const file1 = file1List[0];

  // 아무튼 파일 객체를 사용하려면, 파일 리더가 있어야 하는듯.
  var reader = new FileReader();
  reader.addEventListener('load', e=>console.log(e.target.result));

  // API로 파일 보낼때 바이너리로 보낼때
  reader.readAsBinaryString(document.querySelector('#fileSelect2').file1[0]);

  // 이미지 같은거 DataURL로 뽑을때
  reader.readAsDataURL(document.querySelector('#fileSelect2').file1[0]); 


</script>

```
## readAsBinaryString
- raw binary data from the file.

## readAsDataURL
- dataURL


https://github.com/MicrosoftEdge/DevTools/issues/24



#
https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors/43268098#43268098