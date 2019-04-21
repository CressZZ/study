const messagesLocal = {
    'property.error.message.phone': '폰번호가 이상하다.',
    'property.error.message.name': '이름이 이상하다',
    'property.error.message.what': '뭐?',
}

const messagesServer = {
    'lm.property.error.message.phone': '핸드폰이 이상하다.',
    'lm.property.error.message.name': '이름이 이상하다',
}

let messagesServerWithoutPrefix = {};

const prefix = 'lm';
const prefixRegx = new RegExp('^' + prefix + '\\.');

for (var key in messagesServer){
    let newKey = key.replace(prefixRegx, '');
    messagesServerWithoutPrefix[newKey] = messagesServer[key];
};

// console.log(messagesLocal);
// console.log(messagesServerWithoutPrefix);

Object.assign(messagesLocal, messagesServerWithoutPrefix);

// console.log(messagesLocal);
