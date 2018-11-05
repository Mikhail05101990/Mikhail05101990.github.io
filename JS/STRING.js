function tagBgn(tagName, arr){
    var tagName = "<" + tagName;
    var pointStart = arr.indexOf(tagName);
    return pointStart;
}

function tagEnd(tagName, arr){
    var tagName = "</" + tagName;
    var tagName = tagName + ">";
    var pointEnd = arr.lastIndexOf(tagName);
    var pointEnd = pointEnd + tagName.length;
    return pointEnd;
}

function bgnEndArr(mass, tagName){
    var a = tagBgn(tagName, mass);
    var b = tagEnd(tagName, mass);
    var string = mass.slice(a,b);
    return string;
}

function getTag(mass, tagName){
    if(mass!="undefined"){
        return bgnEndArr(mass, tagName);
    }else
    {
        return 1;
    };
}