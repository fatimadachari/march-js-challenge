const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const completeList = document.querySelector('.list-tasks')

let itemList = [];

function addNewTask() {
    itemList.push({
        task: input.value,
        complete: false
    });
    input.value = ''
    showTasks()
}

function showTasks() {
    let newLi = '';
    itemList.forEach((item, index) => {
        newLi = newLi + `
        <li class="task ${item.complete && 'done'}">
            <i class="fa-solid fa-check" onclick="completeTask(${index})"></i>
            <p>${item.task}</p>
            <i class="fa-solid fa-trash" onclick="deleteTask(${index})"></i>
        </li>
        `
    })
    completeList.innerHTML = newLi;
    localStorage.setItem('list', JSON.stringify(itemList))
}

function completeTask(index) {
    itemList[index].complete = !itemList[index].complete
    showTasks()
}

function deleteTask(index) {
    itemList.splice(index, 1)
    showTasks()

}

function reloadTask() {
    taskLocalStorage = localStorage.getItem('list')
    if (taskLocalStorage) {
        itemList = JSON.parse(taskLocalStorage)
    }
    showTasks()
}

reloadTask()
button.addEventListener('click', addNewTask);

