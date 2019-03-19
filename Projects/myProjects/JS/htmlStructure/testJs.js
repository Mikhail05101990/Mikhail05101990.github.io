function fetchTagLimited(tagName, number){
    var text = getTag(fileContent, tagName);
    var text = sortTagsLimited(text, number);
    inputResponse(text);  
}

function sortTagsLimited(value, count){
    var tab = "";
    var prTab = "";
    var start = 0;
    var sorted = "";
    
    do{
        count--;
        var openTag = null;
        var nextOpenTag = null;
        var thereIsText = null;
        var tagStartIndex = null;
        var nextTagStartIndex = null;
        var tag = null;
    
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
        
        
        
        if((tgNe!="input")||(tgNe!="img")||(tgNe!="param")||(tgNe!="br")||(tgNe!="br/")||(tgNe!="link")||(tgNe!="meta")){
            //the tag contains two parts
            if(nextOpenTag!="true"){
                var scrEnd = tagEndFrom(tgNe, value, start);
                var tag = value.slice(tagStartIndex, scrEnd);
                                
                var tagEnd = scrEnd;
                var nextStart = value.indexOf("<", scrEnd);
                var nextStEnd = value.indexOf("</", scrEnd);
                openTag = "false";
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
    }while((nextTagStartIndex!=-1)|count>0);
    
    return sorted;
}