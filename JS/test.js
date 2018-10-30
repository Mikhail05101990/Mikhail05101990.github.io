function addEventListeners(){
    var buttons = $(":button");
    [].forEach.call(buttons,function(el){
        el.addEventListener('click', function (e) {
            console.log("Button works");
        })
    });
} 

