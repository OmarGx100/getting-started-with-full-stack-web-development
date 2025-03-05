const fs = require("fs");

function parseFileIntoJsObject(filePath) {
  const fileData = fs.readFileSync(filePath);
  const JsDataObject = JSON.parse(fileData);
  return JsDataObject;
}

function rawTextFromJsObject(filePath, JsObject) {
  const rawTextData = JSON.stringify(JsObject);
  fs.writeFileSync(filePath, rawTextData);
}

module.exports = {
    parseFileIntoJsObject: parseFileIntoJsObject,
    rawTextFromJsObject : rawTextFromJsObject
}