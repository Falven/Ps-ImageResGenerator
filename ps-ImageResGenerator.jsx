// responsive-web-gen.jsx
// 2016 Francisco Aguilera
// License: none (public domain)
// v1.0
//
// This script is for Photoshop CC 2015. It outputs images of the  
// provided sizes from a source PSD.
//

// bring Photoshop into focus
#target photoshop

main();

function main() {
  if(confirm('Generate web images?')) {
    var file = File.openDialog('Select a PSD file.', 'PSD File:*.psd');
    if (null === file) {
      throw 'No file selected. Exting script.';
    }
    open(file);

    var stemsAmount = prompt('What resolutions do you need?', 12);
    app.preferences.typeUnits = TypeUnits.PIXELS;
    resize(5120);
    resize(4096);
    resize(3840);
    resize(3200);
    resize(2880);
    resize(2560);
    resize(2048);
    resize(1920);
    resize(1600);
    resize(1366);
    resize(1280);
    resize(1024);
    resize(960);
    resize(848);
    resize(720);
    resize(640);  
    resize(480);
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    if (cleanup) {
      file.remove();
    }
    alert("Done!");
  }
}

function resize(newWidth) {
  // Duplicate, resize and export
  var doc = app.activeDocument,
      width = doc.width,
      height = doc.height;
  if(width >= newWidth) {
    var resize = false;
    if(width > newWidth) {
      resize = true;
      doc = doc.duplicate();
      // (original height / original width) x new width = new height
      doc.resizeImage(newWidth + 'px', ((height / width) * newWidth) + 'px');
    }
    doc.exportDocument(
      new File(doc.path + '/' + app.activeDocument.name + '_' + newWidth),
      ExportType.SAVEFORWEB,
      new ExportOptionsSaveForWeb
      {
        format: SaveDocumentType.PNG,
        PNG8: false,
        transparency: true,
        interlaced: 0,
        includeProfile: false,
        optimized: true
      });
    if(resize) {
      doc.close(SaveOptions.DONOTSAVECHANGES);
    }
  }
}