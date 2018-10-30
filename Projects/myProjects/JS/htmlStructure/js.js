var fileContent;

function clearing(){
    document.getElementById("outputField").value = "";
}

function wChoose(){
    alert("Source is not loaded");
}
function getValue(text){
    fileContent = text;
    inputResponse(fileContent);
}

function inputResponse(text){
    $("#outputField").text(text);
}

function fetchTag(tagName){
    var text = getTag(fileContent, tagName);
    inputResponse(text);  
}





   





    
    
