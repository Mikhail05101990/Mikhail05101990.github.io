var questionFn = function(){
    return{
        newTask:{
            date: 'Какой js-фреймворк лучше использовать?',
            text: 'Иван Иванов',
        }
		  }
};
 
app.service('questionService', questionFn);