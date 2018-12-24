function tagBgn(tagName, arr){
    var tagName = "<" + tagName;
    var pointStart = arr.indexOf(tagName);
    return pointStart;
}

function tagBgnFrom(tagName, arr, start){
    var tagName = "<" + tagName;
    var pointStart = arr.indexOf(tagName, start);
    return pointStart;
}

function tagEnd(tagName, arr){
    var tagName = "</" + tagName;
    var tagName = tagName + ">";
    var pointEnd = arr.lastIndexOf(tagName);
    var pointEnd = pointEnd + tagName.length;
    return pointEnd;
}

function tagEndFrom(tagName, arr, start){
    var tagName = "</" + tagName;
    var tagName = tagName + ">";
    var pointEnd = arr.indexOf(tagName, start);
    var pointEnd = pointEnd + tagName.length;
    return pointEnd;
}

function bgnEndArr(mass, tagName){
    var a = tagBgn(tagName, mass);
    var b = tagEnd(tagName, mass);
    var string = mass.slice(a,b);
    return string;
}

function bgnEndArrFrom(mass, tagName, start){
    var a = tagBgnFrom(tagName, mass, start);
    var b = tagEndFrom(tagName, mass, start);
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

function getTagFrom(mass, tagName, start){
    if(mass!="undefined"){
        return bgnEndArrFrom(mass, tagName, start);
    }else
    {
        return 1;
    };
}