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
  if(confirm('Generate web images for current document?')) {
    var reses = prompt('What resolution widths do you need?', '1920, 1600');
    if(reses) {
      app.preferences.typeUnits = TypeUnits.PIXELS;
      for(var i = 0; i < reses.length; ++i) {
        resize(reses[i]);
      }
      alert('Done!');
    }
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
    var options = new ExportOptionsSaveForWeb();
    options.format = SaveDocumentType.PNG;
    options.PNG8 = false;
    options.transparency = true;
    options.interlaced = 0;
    options.includeProfile = false;
    options.optimized = true;
    doc.exportDocument(
      new File(doc.path + '/' + app.activeDocument.name + '_' + newWidth),
      ExportType.SAVEFORWEB,
      options
    );
    if(resize) {
      doc.close(SaveOptions.DONOTSAVECHANGES);
    }
  }
}