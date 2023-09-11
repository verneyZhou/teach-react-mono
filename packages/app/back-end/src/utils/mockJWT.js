const crypto = require('crypto');


/**
 * 
 * JWT鉴权
 * 由三段 base64 组成：header payload  signature
 */
function sign(payload, salt) {
  let headers = {
    typ: 'JWT',
    alg: 'HS256'
  };
  const tokenArr = [];

  tokenArr.push(base64UrlEncode(JSON.stringify(headers)));
  tokenArr.push(base64UrlEncode(JSON.stringify(payload)));

  const signStr = crypto
  .createHmac("SHA256", salt)
  .update(tokenArr.join('.'))
  .digest('base64');

  return [...tokenArr, signStr].join('.');
}



// 验证
function verify(token, salt) {
  const [header, payload, sign] = token.split('.');
  const signStr = crypto
    .createHmac("SHA256", salt)
    .update([header, payload].join('.'))
    .digest('base64');

    return signStr === sign;


}

function base64UrlEncode(str) {
    return Buffer.from(str).toString('base64')
}

console.log('====sign', sign({user: 'test'}, "test123456"))

// node ./src/utils/mockJWT.js

// ====sign====sign eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoidGVzdCJ9.alKEJT4ICZTqIqCMfSBbdibg8mNlDYqVFBhz0b3t3c0=

// Authorization: 'Bearer .....'



console.log('====verify', verify('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoidGVzdCJ9.alKEJT4ICZTqIqCMfSBbdibg8mNlDYqVFBhz0b3t3c0=', "test123456"))
// true






