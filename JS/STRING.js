function tagBgn(tagName, arr){
    var name = "<" + tagName;
    var pointStart = arr.indexOf(name);
    return pointStart;
}

function tagEnd(tagName, arr){
    var name = "</" + tagName;
    var nm = name + ">";
    var point = arr.lastIndexOf(nm);
    pointEnd = point + name.length+1;
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