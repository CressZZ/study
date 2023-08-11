let isStartAutoTranslate = false;

const observer = new MutationObserver(async (mutationsList, observer) => {
    // const MUTATED_TEXT_NODE_MAP = new Map(); 
    const maps = [];

    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            for(let node of mutation.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const TEXT_NODE_MAP = setTextNodeMap(node);
                    maps.push(TEXT_NODE_MAP);
                    // translatedAll(node);
                }
            }
        }
    }
    
    const MUTATED_TEXT_NODE_MAP = maps.reduce((acc, map) => new Map([...acc, ...map]), new Map());
    await goTranslate(MUTATED_TEXT_NODE_MAP);

});


function initAutoTranslate(targetEl){
    if(isStartAutoTranslate) return;
    isStartAutoTranslate = true;

    translatedAll(targetEl);
    observer.observe(targetEl, { childList: true, subtree: true });
}


// async function translatedAll(targetNode) {
//     const TEXT_NODE_MAP  = setTextNodeMap(targetNode);
    
//     const textValues = Array.from(TEXT_NODE_MAP.values()).map(node => node.nodeValue);
    
//     const translatedStrings = await callAPITranslateStringsWithGoogle(textValues);
//     // const translatedStrings = await MOCK_CallAPITranslateStrings(textValues);

//     const keys = Array.from(TEXT_NODE_MAP.keys());
//     translatedStrings.forEach((result, index) => {
//         TEXT_NODE_MAP.get(keys[index]).nodeValue = result;
//     });
// }


async function processChunk(chunkKeys, TEXT_NODE_MAP) {
    const textValues = chunkKeys.map(key => TEXT_NODE_MAP.get(key).nodeValue);
    const translatedStrings = await callAPITranslateStringsWithGoogle(textValues);
  
    translatedStrings.forEach((result, index) => {
      TEXT_NODE_MAP.get(chunkKeys[index]).nodeValue = result;
    });
  }
  
  async function translatedAll(targetNode) {
    const TEXT_NODE_MAP = setTextNodeMap(targetNode);
    await goTranslate(TEXT_NODE_MAP);
  }

  async function goTranslate(TEXT_NODE_MAP){
    const keys = Array.from(TEXT_NODE_MAP.keys());
    const CHUNK_SIZE = 128;
  
    const promises = [];
  
    // 128개씩 잘라서 처리
    for (let i = 0; i < keys.length; i += CHUNK_SIZE) {
      const chunkKeys = keys.slice(i, i + CHUNK_SIZE);
      promises.push(processChunk(chunkKeys, TEXT_NODE_MAP)); // 비동기로 실행할 함수를 promises 배열에 담음
    }
  
    await Promise.all(promises); // 모든 프로미스가 완료될 때까지 기다림
  }

function setTextNodeMap(targetNode) {
    const TEXT_NODE_MAP = new Map();

    const walker = document.createTreeWalker(
        targetNode,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: (node) => {
                if (node.parentNode?.nodeName.toLowerCase() === 'script') {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        },
    );

    while (walker.nextNode()) {
        const node = walker.currentNode;

        if (node.nodeValue?.trim() !== '') {
            TEXT_NODE_MAP.set(node.parentNode, node);
        }
    }

    return TEXT_NODE_MAP;
}

/**
 * API
 */
const MOCK_CallAPITranslateStrings = (textArr) => {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                resolve(textArr.map(string => {
                    return string + '_translated';
                }));
            }, 5);
        } catch (err) {
            reject(err);
        }
    });
};

/**
 * callAPITranslateStringsWithGoogle
 */




let API_KEY = '';
let API_URL = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
};

const callAPITranslateStringsWithGoogle = async (textArr, targetLang = 'en') => {
    let data = (await (await fetch(API_URL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "q": textArr,
            "target": targetLang
        }),
    })).json()).data;
    console.log(data)
    let translations = data.translations
    let translatedText = translations.map(translation => translation.translatedText);
    console.log(translatedText);

    return translatedText
}

/**
 * No Commit!
 */
API_KEY = '';
API_URL = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

let El_Btn_autoTranslate = document.createElement('div');
El_Btn_autoTranslate.innerText = '자동번역';
El_Btn_autoTranslate.style.width = '150px';
El_Btn_autoTranslate.style.height = '50px';
El_Btn_autoTranslate.style.position = 'fixed';
El_Btn_autoTranslate.style.bottom = '0';
El_Btn_autoTranslate.style.right = '0';
El_Btn_autoTranslate.style.cursor = 'pointer';
El_Btn_autoTranslate.style.backgroundColor = 'red';
El_Btn_autoTranslate.addEventListener('click',()=>{
    initAutoTranslate(document.body);
})

document.body.append(El_Btn_autoTranslate);

// initAutoTranslate(document.body);