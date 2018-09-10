function getSharp(){
    var bl = "false";
    var text = $("#inputField").val();
    var gotBlock = document.getElementById('outputField');
    var text = convertToVisible(text, bl);
    gotBlock.value = text;
    
    var gotBlock = document.getElementById('result');
    gotBlock.innerHTML = text;
}

function convertToVisible(string, bl)
{
    var string = string.replace(/\</g, "&lt;");
    var string = string.replace(/\>/g, "&gt;");
    if (bl == "true"){
        var string = string.replace(/\\/g, '\\\\');
    }
    
    return string;
}

function clearing(blockId){
    document.getElementById(blockId).value = "";
}

function loadFile()
{
    inputFile.onchange = function (obj) {
        var file = inputFile.files[0];
        var reader = new FileReader();
        
        reader.onloadend = function () {
            $(".inputField").text(reader.result);
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
    
    
