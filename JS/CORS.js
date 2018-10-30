var method = "GET";
var link = function(){
    var link = $("#link").text();
    return link;
};

function AddRequestListeners(XHR){
    if(XHR){
        XHR.addEventListener("progress", updateProgress);
        XHR.addEventListener("load", getResponse);
        XHR.addEventListener("error", transferFailed);
        XHR.addEventListener("abort", transferCanceled);
    }
}

function CORSRequest(method, link){
    var request = new XMLHttpRequest();
    if ("withCredentials" in request){
        request.open(method, link, true);
    } else {
        request = null;
    }
    return request;
}

function CORSrtInform(method, link){
    var request = new XMLHttpRequest();
    if ("withCredentials" in request){
        request.open(method, link, true);
    } else {
        request = null;
    }
    
    AddRequestListeners(request);
    
    return request;
}

function getBody(){
    var bodyRequest = CORSrtInform(method, link);
    if(bodyRequest) {    
        bodyRequest.onload = getResponse();
        bodyRequest.send(); 
    }
}

function updateProgress (event) {
  if (event.lengthComputable) {
    var percentComplete = event.loaded / event.total * 100;
    // ...
  } else {
    console.log("Unable to compute progress information since the total size is unknown"); 
  }
}

function getResponse(evt) {
    inputResponse(this.responseText);
    console.log("The transfer is complete.");
    
}

function transferFailed(evt) {
  console.log("An error occurred while transferring the file.");
    alert("The app cannot achieve a secure http!");
}

function transferCanceled(evt) {
  console.log("The transfer has been canceled by the user.");
}