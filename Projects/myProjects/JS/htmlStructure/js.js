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
    var text = sortTags(text);
    inputResponse(text);  
}

function sortTags(value){
    var tab = "";
    var start = 0;
    var sorted = "";
    
    do{
        var tagName = ""; 
        //evaluate current and next tag
        var tagStart = value.indexOf("<", start);
        var tagStEnd = value.indexOf("</", start);
        var tagEnd = tagGap(value,start);
        var nextStart = value.indexOf("<", tagEnd);
        var nextStEnd = value.indexOf("</", tagEnd);
        //add tag
        if(tagStEnd<=tagStart){
            var tag = value.slice(tagStEnd,tagEnd);
        }else{
            //check for single tags
            var tgNe = getTagName(value, start);
            //get tag
            var tag = value.slice(tagStart,tagEnd);
        }
        var sorted = sorted+tag;
        //add text
        if((nextStEnd>tagEnd+1)&&(nextStart>tagEnd+1)){
            if(nextStart<nextStEnd){
                var start = nextStart;
                var text = value.slice(tagEnd, nextStart);
            } else{
                var text = value.slice(tagEnd, nextStEnd);
                var start = nextStEnd;
            }
            var sorted = sorted + text;
            continue;
        }
        //add space
        if((nextStEnd<nextStart) || (nextStart<nextStEnd)){
            var sorted = sprNstr(sorted);
        }
        if((nextStEnd==nextStart) && (tagStart==tagStEnd)){
            var sorted = sprNstr(sorted);
        }
        if((tagStart<tagStEnd)&&(nextStEnd<=nextStart)){
            if((tgNe=="input")|(tgNe=="img")|(tgNe=="param")){
                var sorted = sprNstr(sorted);
            }
        }
        //change tab
        if((nextStart<nextStEnd) && (tagStart<tagStEnd)){
            //check for input 
            if((tgNe=="input")|(tgNe=="img")|(tgNe=="param")){
                var sorted = sorted + tab;
            }else{
                //add tab
                var tab = plusTab(tab);
                var sorted = sorted + tab;
            }
        }
        if((tagStart==tagStEnd) && (nextStart<nextStEnd)){
            var sorted = sorted + tab;
        }
        if((tagStart==tagStEnd) && (nextStart==nextStEnd)){
            var tab = minusTab(tab);
            var sorted = sorted + tab;
        }
        if((tagStart<tagStEnd)&&(nextStEnd<=nextStart)){
            if((tgNe=="input")|(tgNe=="img")|(tgNe=="param")){
                var tab = minusTab(tab);
                var sorted = sorted + tab;
            }
        }
        //next start
        var start = nextStart; 
    }while((nextStart!=-1)&&(nextStEnd!=-1));
    
    
    
    
    
    

    

    
    return sorted;
}

function isStart(text){
    
}

function tagGap(text, start){
    var tagEnd = text.indexOf(">", start);
    return tagEnd+1;
}

function getTagName(text, start){
    var tagStart = text.indexOf("<", start);
    var snEnd = text.indexOf(">", start);
    var spEnd = text.indexOf(" ", start);
    if(spEnd<snEnd){
       var tag = text.slice(tagStart+1,spEnd); 
    }else{
       var tag = text.slice(tagStart+1,snEnd);
    }
    return tag;
}

function getTagEnd(text, tag, start){
    var tag = tag.replace("<", "</");
    var tagEnd = text.indexOf(tag, start);
    var tagEnd = tagEnd + tag.length+1;
    return tagEnd;
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

    
    
