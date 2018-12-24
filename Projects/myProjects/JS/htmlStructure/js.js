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

function fetchTagLimited(tagName, number){
    var text = getTag(fileContent, tagName);
    var text = sortTagsLimited(text, number);
    inputResponse(text);  
}

function sortTags(value){
    var tab = "";
    var prTab = "";
    var start = 0;
    var sorted = "";
    
    do{
        //evaluate current and next tag
        var tagStart = value.indexOf("<", start);
        var tagStEnd = value.indexOf("</", start);
        var tagEnd = tagGap(value,start);
        var nextStart = value.indexOf("<", tagEnd);
        var nextStEnd = value.indexOf("</", tagEnd);
        //add tag
        //it is the end tag
        if(tagStEnd<=tagStart){
            var tag = value.slice(tagStEnd,tagEnd);
        }else{
            //it is the start tag
            var tgNe = getTagName(value, start);
            //get tag
            var tag = value.slice(tagStart,tagEnd);
        }
        if(tgNe=="link"){
            console.log(tag);
        }
        
        var sorted = sorted+tag;
        //add text
        if((nextStEnd>tagEnd+1)&&(nextStart>tagEnd+1)){
            //calculation of text range
            if(tgNe=="script"){
                var scrEnd = tagEndFrom(tgNe, value, start);
                var text = value.slice(tagEnd, scrEnd);
                var sorted = sorted + text;
                
                var start = scrEnd +1;
                var tagStart = value.indexOf("<", start);
                var tagStEnd = value.indexOf("</", start);
                var tagEnd = tagGap(value,start);
                var nextStart = value.indexOf("<", tagEnd);
                var nextStEnd = value.indexOf("</", tagEnd);
            }else{
                if(nextStart<nextStEnd){
                    var text = value.slice(tagEnd, nextStart);
                } else{
                    var text = value.slice(tagEnd, nextStEnd);
                }
                var sorted = sorted + text;
            }
        }
        //spring to a new string
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
        var prTab = tab;
        if((nextStart<nextStEnd) && (tagStart<tagStEnd)){
            //check for comments
            if(tgNe[0]=='!'){
                var comTruth = "true";
            }else{
                var comTruth = "false";
            }    
            //check for single tags 
            if((tgNe=="input")|(tgNe=="img")|(tgNe=="param")|(tgNe=="br")|(tgNe=="link")|(tgNe=="script")|(comTruth =="true")){
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
    
    if(prTab!=""){
        return -1;
    }else{
        return sorted;
    }
    
    

}

function sortTagsLimited(value){
    var tab = "";
    var prTab = "";
    var start = 0;
    var sorted = "";
    
    do{
        //evaluate current and next tag
        var tagStart = value.indexOf("<", start);
        var tagStEnd = value.indexOf("</", start);
        var tagEnd = tagGap(value,start);
        var nextStart = value.indexOf("<", tagEnd);
        var nextStEnd = value.indexOf("</", tagEnd);
        //add tag
        //it is the end tag
        if(tagStEnd<=tagStart){
            var tag = value.slice(tagStEnd,tagEnd);
            var tag = cleanTag(tag);
        }else{
            //it is the start tag
            var tgNe = getTagName(value, start);
            //get tag
            var tag = value.slice(tagStart,tagEnd);
            var tag = cleanTag(tag);   
        }
        var sorted = sorted+tag;

        //add text
        if((nextStEnd>tagEnd+1)&&(nextStart>tagEnd+1)){
            if(tgNe=="script"){
                var scrEnd = tagEndFrom(tgNe, value, start);
                var text = value.slice(tagEnd, scrEnd);
                var text = cleanTag(text);
                var sorted = sorted + text;
                
                var tagEnd = scrEnd;
                var nextStart = value.indexOf("<", scrEnd);
                var nextStEnd = value.indexOf("</", scrEnd);
            }else{
                if((tagStart<tagStEnd)&&(nextStEnd<=nextStart)){
                    var text = value.slice(tagEnd, nextStEnd);
                    var text = cleanTag(text);
                }

                if(nextStEnd<=nextStart){
                    var text = value.slice(tagEnd, nextStEnd);
                    var text = cleanTag(text);
                }else{
                    var text = value.slice(tagEnd, nextStart);
                    var text = cleanTag(text);
                }
                var sorted = sorted + text; 
            }
        }
        //spring to a new string
        if((tgNe=="input")|(tgNe=="img")|(tgNe=="param")|(tgNe=="br")|(tgNe=="br/")|(tgNe=="link")|(tgNe=="script")|(tgNe=="meta")){
            var sorted = sprNstr(sorted);
        }else{
            if(tagStEnd<=tagStart){
                var sorted = sprNstr(sorted);
            }
            if((tagStart<tagStEnd)&&(nextStart<nextStEnd)){
                var sorted = sprNstr(sorted);
            }
        }        
        //add tab
        var prTab = tab;
            //check for comments
        if(tgNe[0]=='!'){
            var comTruth = "true";
        }else{
            var comTruth = "false";
        } 
        if((tgNe=="input")|(tgNe=="img")|(tgNe=="param")|(tgNe=="br")|(tgNe=="br/")|(tgNe=="link")|(tgNe=="script")|(tgNe=="meta")|(comTruth =="true")){
            if(nextStEnd<=nextStart){
                var tab = minusTab(tab);
                var sorted = sorted + tab;
            }else{
                var sorted = sorted + tab;   
            }
        }else{
            if((tagStart<tagStEnd)&&(nextStart<nextStEnd)){
                var tab = plusTab(tab);
                var sorted = sorted + tab;
            }
            if((tagStEnd<=tagStart) && (nextStart<nextStEnd)){
                var sorted = sorted + tab;
            }
            if((tagStEnd<=tagStart) && (nextStEnd<=nextStart)){
                var tab = minusTab(tab);
                var sorted = sorted + tab;
            }
        }
        //next start
        var start = nextStart; 
    }while((nextStart!=-1)&&(nextStEnd!=-1));
    
    return sorted;
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

    
    
