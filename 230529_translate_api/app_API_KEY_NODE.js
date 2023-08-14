const https = require('https');
// const fs = require('fs');

const options = {
  hostname: 'translation.googleapis.com',
  path: '/language/translate/v2?key=',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
};

// 요청으로 보낼 JSON 데이터를 파일로부터 읽어옵니다.
// const requestData = fs.readFileSync('request.json');

const req = https.request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    console.log(responseData); // 응답 데이터 출력
  });
});

req.on('error', (error) => {
  console.error(error);
});

// 요청 데이터를 전송합니다.
req.write(JSON.stringify({
  "q": ["Hello world", "My name is Jeff"],
  "target": "de"
}));
req.end();
