# value.nodeValue 를 쓴 이유가 뭐야? value를 쓰지 않고

# ChatGPT
JavaScript에서 DOM의 텍스트 노드는 nodeValue라는 프로퍼티를 가지고 있습니다. 이 nodeValue 프로퍼티는 텍스트 노드의 텍스트 내용을 가져오거나 설정하는 데 사용됩니다.

따라서 value.nodeValue는 텍스트 노드의 현재 텍스트 내용을 의미합니다.

value만 사용할 경우, value는 전체 텍스트 노드 객체를 가리키기 때문에 해당 객체의 내용을 직접 수정하거나 접근할 수 없습니다. nodeValue 프로퍼티를 사용함으로써 텍스트 노드의 내용을 가져오거나 수정할 수 있습니다.

따라서, value.nodeValue를 사용하여 텍스트 노드의 현재 내용에 '_test' 문자열을 추가하고, 이를 바탕으로 새 텍스트 노드를 생성한 후에 원래의 텍스트 노드를 이 새 텍스트 노드로 교체하는 것입니다.


```js
const observer = new MutationObserver((mutationsList, observer) => {
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            for(let node of mutation.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    translatedAll(node);
                }
            }
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });

async function translatedAll(targetNode) {
    const TEXT_NODE_MAP  = setTextNodeMap(targetNode);
    
    const textValues = Array.from(TEXT_NODE_MAP.values()).map(node => node.nodeValue);
    
    const translatedStrings = await callAPITranslateStrings(textValues);

    const keys = Array.from(TEXT_NODE_MAP.keys());
    translatedStrings.forEach((result, index) => {
        TEXT_NODE_MAP.get(keys[index]).nodeValue = result;
    });
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
const callAPITranslateStrings = (textArr) => {
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

let API_KEY = '';

const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
const headers = {
  'Content-Type': 'application/json; charset=utf-8',
};

const callAPITranslateStringsWithGoogle = (textArr, targetLang = 'de') => {
    let translatedTextArr = (await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "q": textArr,
            "target": targetLang
        }),
    })).data.translations.map(translation => translation.translatedText);

}


```