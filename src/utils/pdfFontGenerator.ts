//Refactor to get font from database
var opts = {
  on: {
    load: function (e, file) {
      window.loadedFile = file;
      document.getElementById('fontName').value = file.extra.nameNoExtension;

      var fileReader = new FileReader();
      fileReader.onload = function (e) {
        window.loadedFileContents = e.target.result;
        window.loadedFileContents = window.loadedFileContents.substr(window.loadedFileContents.indexOf('base64,') + 7)
      };
      fileReader.readAsDataURL(file);
    }
  }
};
FileReaderJS.setupInput(document.getElementById('file-input'), opts);

function generateJsPDFFontFile() {
  var jsFile = '';
  var fontName = document.getElementById('fontName').value;
  var fontStyle = document.getElementById('fontStyle').value;
  var moduleFormat = document.getElementById('moduleFormat').value;
  var createdFileName = fontName + '-' + fontStyle + '.ttf';

  var esHeader = 'import { jsPDF } from "jspdf"\n'
  var umdHeader = "(function (global, factory) {\n" +
      "    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jspdf')) :\n" +
      "    typeof define === 'function' && define.amd ? define(['jspdf'], factory) :\n" +
      "    (global = global || self, factory(global.jspdf));\n" +
      "}(this, (function (jspdf) { 'use strict';\nvar jsPDF = jspdf.jsPDF;\n"

  jsFile += moduleFormat === "es" ? esHeader : umdHeader
  jsFile += 'var font = \'' + window.loadedFileContents + '\';\n';
  jsFile += 'var callAddFont = function () {\n';
  jsFile += 'this.addFileToVFS(\'' + createdFileName + '\', font);\n';
  jsFile += 'this.addFont(\'' + createdFileName + '\', \'' + fontName + '\', \'' + fontStyle + '\');\n};\n';
  jsFile += 'jsPDF.API.events.push([\'addFonts\', callAddFont])\n';

  if (moduleFormat === "umd") {
    jsFile += "})));"
  }

  var newJsfile = new File([jsFile], fontName + '-' + fontStyle + '.js', { type: 'text/plain;charset=utf-8' });
  saveAs(newJsfile);
}
