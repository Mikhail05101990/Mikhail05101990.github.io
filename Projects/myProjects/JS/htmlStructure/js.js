var stringSource;

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






function reqListener () {
  console.log(this.responseText);
}

function getData(){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://mikhail05101990.github.io/', true);
    request.responseType = 'document';
    request.onload = function () {
  if (xhr.readyState === xhr.DONE) {
    if (xhr.status === 200) {
      alert(request.response);
      alert(request.responseXML);
    }
  }
};
}

function getStringSource(){
    reqListener ();
    getData();
    alert(stringSource);

}



    
    
