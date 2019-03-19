var fileContent;

function clearing(){
    document.getElementById("outputField").value = "";
    $("input").val("");
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
    var text = sortTags(text);
    inputResponse(text);  
}

function sortTags(value){
    var tab = "";
    var prTab = "";
    var start = 0;
    var sorted = "";
    
    do{
        var openTag;
        var nextOpenTag;
        var thereIsText;
        var tagStartIndex;
        var nextTagStartIndex;
        var tag;
        var rightEnd;
    
        //get brackets
        var tagStart = value.indexOf("<", start);
        var tagStEnd = value.indexOf("</", start);
        var tagEnd = tagGap(value,start);
        var nextStart = value.indexOf("<", tagEnd);
        var nextStEnd = value.indexOf("</", tagEnd);
        
        if(tagStart<tagStEnd){
            openTag = "true";
            tagStartIndex = tagStart;
        }else{
            openTag = "false";
            tagStartIndex = tagStEnd;
        }
        if(nextStart<nextStEnd){
            nextOpenTag = "true";
            nextTagStartIndex = nextStart; 
        }else{
            nextOpenTag = "false";
            nextTagStartIndex = nextStEnd;
        }
        if(nextTagStartIndex>(tagEnd+1)){
            thereIsText = "true";
        }else{
            thereIsText = "false";
        }
        //get tag name for checking
        var tgNe = getTagName(value, start);
        //checking if there is a possibility for expanding borders
        
        console.log(tgNe);
        
        if((tgNe!="input")||(tgNe!="img")||(tgNe!="param")||(tgNe!="br")||(tgNe!="br/")||(tgNe!="link")||(tgNe!="meta")||(tgNe!="!--")){
            //the tag contains two parts
            if(nextOpenTag!="true"){
                var rightEnd = tagEndFrom(tgNe, value, start);
                var nextStart = value.indexOf("<", scrEnd);
                var nextStEnd = value.indexOf("</", scrEnd);
                if(nextStart<nextStEnd){
                    nextOpenTag = "true";
                    nextTagStartIndex = nextStart; 
                }else{
                    nextOpenTag = "false";
                    nextTagStartIndex = nextStEnd;
                }
            }
            if(nextOpenTag=="true"){
                if(thereIsText=="true"){
                    var tag = value.slice(tagStartIndex, nextTagStartIndex-1);
                }else{
                    var tag = value.slice(tagStartIndex, tagEnd);
                }
            }
        }else{
            if(thereIsText=="true"){
                    var tag = value.slice(tagStartIndex, nextTagStartIndex-1);
            }else{
                    var tag = value.slice(tagStartIndex, tagEnd);
            }
        }
        var tag = value.slice(tagStartIndex, rightEnd);
        //clean and add the expanded tag
        var tag = cleanTag(tag);
        var sorted = sorted + tag;
        //spring to a new string
        var sorted = sprNstr(sorted);
        //add tab
        var prTab = tab;
        if((openTag =="true" && nextOpenTag =="true")| (openTag!="true" && nextOpenTag=="true")){
            if(tgNe!="!--"){
                var tab = plusTab(tab);
                var sorted = sorted + tab;
            }else{
                var sorted = sorted + tab;
            } 
        }
        if((openTag=="true" && nextOpenTag!="true")| (openTag!="true" && nextOpenTag!="true")){
            var tab = minusTab(tab);
            var sorted = sorted + tab;
        }
        //next start
        var start = nextStart; 
    }while(nextTagStartIndex!=-1);
    
    if(prTab!=""){
        return -1;
    }else{
        return sorted;
    }
    
    

}

function setSelection() {
    
    var text = getClass();
    var root = document.getElementById("outputField");
    
    var start = 0;
    var end = 100;
    
    if (root.createRange) {
      var rng = root.createRange();
      rng.setStart(start, 0);
      rng.setEnd(end, 0);
      alert(rng.toString());
    }else{
        if(document.createRange()){
            var range = document.createRange();
            range.setStart(startNode, startOffset);
            range.setEnd(endNode, endOffset);
        }else{
            alert("Range is not exist")   
        }
    }
    
}

function getClass(){
    var clue = $("#seartTag").val();
    if (clue!=""){
        return clue;
    }else{
        return -1;
    }
    
}

function tagGap(text, start){
    var tagEnd = text.indexOf(">", start);
    return tagEnd+1;
}

function cleanTag(tag){
    var tg = tag.replace(/\s+/g,' ').trim();
    return tg;
}

function getTagName(text, start){
    var tagStart = text.indexOf("<", start);
    var snEnd = text.indexOf(">", start);
    var spEnd = text.indexOf(" ", start);
    if(text[tagStart+1]!='!'){
        if(spEnd<snEnd){
            var tag = text.slice(tagStart+1,spEnd); 
        }else{
            var tag = text.slice(tagStart+1,snEnd);
        }
    }else{
        var esp = text.indexOf("[", start);
        if(spEnd<esp){
            var tag = text.slice(tagStart+1,spEnd); 
        }else{
            var tag = text.slice(tagStart+1,esp); 
        }
    }
    return tag;
}

function getTagEnd(text, tag, start){
    var tag = tag.replace("<", "</");
    var tagEnd = text.indexOf(tag, start);
    if(tagEnd!= -1){
        var tagEnd = tagEnd + tag.length+1;
        return tagEnd;
    }else{
        return -1;
    }
}   

function sprNstr(text){
    var text = text + "\n";
    return text;
}

function plusTab(text){
    var text = text + "| ";
    return text;
}

function minusTab(text){
    var text = text.substring(0, text.length - 2);
    return text;
}

   
    
