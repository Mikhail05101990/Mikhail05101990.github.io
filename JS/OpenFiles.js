function LoadFile(value)
{  
    inputFile.onchange = function (obj) {
        var file = inputFile.files[0];
        var reader = new FileReader();
        
        reader.onloadend = function () {
            getValue(reader.result);
        };
        
        reader.readAsText(file);
    };
}

function copyIntoBuffer(containerid){

try {
    // современный объект Selection
    window.getSelection().removeAllRanges();
  } catch (e) {
    // для IE8-
    document.selection.empty();
  }
    if (document.selection) { 
    var range = document.body.createTextRange();
    range.moveToElementText(document.getElementById(containerid));
    range.select().createTextRange();
    document.execCommand("Copy"); 
} else if (window.getSelection) {
    var range = document.createRange();
     range.selectNode(document.getElementById(containerid));
     window.getSelection().addRange(range);
     document.execCommand("Copy");
}

}