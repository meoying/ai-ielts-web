const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');

const obfuscationResult = JavaScriptObfuscator.obfuscate(
  fs.readFileSync('timestamp.js', 'utf8'),
  {
    compact: true,
    controlFlowFlattening: true,
    // 你可以根据需要添加其他选项
  },
);

fs.writeFileSync('timestamp.min.js', obfuscationResult.getObfuscatedCode());
