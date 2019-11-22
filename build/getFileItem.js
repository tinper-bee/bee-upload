'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getFileItem;
/**
* This source code is quoted from rc-upload.
* homepage: https://github.com/react-component/upload
*/
function getFileItem(file, fileList) {
  var matchWay = !file.uid ? 'byName' : 'byUid';
  var target = fileList.filter(function (item) {
    if (matchWay === 'byName') {
      return item.name === file.name;
    }
    return item.uid === file.uid;
  })[0];
  return target;
}
module.exports = exports['default'];