let userInput = document.getElementById('userInput');
let buttonEnter = document.getElementById('enter');
let ul = document.querySelector('ul');

function inputIsNotEmpty() {
    return userInput.value.length > 0;
}

function createTodo() {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(userInput.value));
    ul.appendChild(li);
    userInput.value = '';

    li.addEventListener('click', function() {
        li.classList.toggle('done');
    })

    let deleteButton = document.createElement('button');
    deleteButton.appendChild(document.createTextNode('X'));
    li.appendChild(deleteButton);
    deleteButton.addEventListener('click', deleteTodoItem)
    
    function deleteTodoItem() {
        li.classList.add('delete');
    }
}

function changeListAfterKeyPress(event) {
    if (inputIsNotEmpty() && event.which == 13) {
        createTodo();
    }
}

function changeListAfterButtonPress(event) {
    if (inputIsNotEmpty()) {
        createTodo();
    }
}

userInput.addEventListener('keypress', changeListAfterKeyPress);
buttonEnter.addEventListener('click', changeListAfterButtonPress);
