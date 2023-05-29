function createImageTag(){
    let img = document.createElement('img');
    img.src = 'https://fizz-download.playnccdn.com/download/v2/buckets/preorder/files/183e94d971b-a1058c9d-bbd4-4b53-ba66-0c3cd1233d65';
    
    document.body.append(img);
    img.onload = (async ()=>{
        console.log('[index.js] image on loaded');
        await test();
        let img = document.createElement('img');
        img.src = 'https://fizz-download.playnccdn.com/download/v2/buckets/preorder/files/183e94d971b-a1058c9d-bbd4-4b53-ba66-0c3cd1233d65';
        document.body.append(img);
    })
}

createImageTag();

let Test = 'Test'