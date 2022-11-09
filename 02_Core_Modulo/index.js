const path = require('path');
const os = require('os');

const extention = path.extname('arquivo.html');
const totalMem = os.totalmem()
const type = os.type()

console.log(extention);

console.log(totalMem);
console.log(type);