const path = require('path');

// 拼接目录路径
function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  resolve
};
