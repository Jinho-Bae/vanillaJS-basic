const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");

let toDos = [];
const TODO_KEY = "todos";

// const img_love = '"https://ibb.co/6ymQ9JJ"';
// const img_miss = '"https://ibb.co/ScmCSyW"';
// const img_thx = '"https://ibb.co/Jxd0y6H"';

const img_love = "BEDF26E8-DE1B-425E-808B-674840CDB6E2.jpeg";
const img_miss = "CB560871-C5B9-4FBA-9648-ECDDAD27D2EE.jpeg";
const img_thx = "EE6756AC-6A9A-40B4-842A-27EFD941F425.jpeg";

const LOVE = "love";
const MISS = "miss";
const THANKS = "thanks";

function saveToDos() {
  localStorage.setItem(TODO_KEY, JSON.stringify(toDos));
}

function toDoFilter(item) {
  return item.id !== id;
}

function deleteToDoById(id) {
  const savedToDoArr = JSON.parse(localStorage.getItem(TODO_KEY));
  savedToDoArr.filter(toDoFilter);
}

function deleteToDo(event) {
  const parent = event.target.parentElement;
  parent.remove();
  toDos = toDos.filter((todo) => todo.id !== parseInt(parent.id));
  saveToDos();
}

function paintToDo(obj) {
  const li = document.createElement("li");
  li.id = obj.id;
  const span = document.createElement("span");
  const button = document.createElement("button");
  button.innerText = "X";
  button.addEventListener("click", deleteToDo);

  li.appendChild(span);
  li.appendChild(button);
  span.innerText = obj.text;
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();

  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const todoObj = {
    text: newTodo,
    id: Date.now()
  };

  toDos.push(todoObj);

  paintToDo(todoObj);

  saveToDos();

  setBackgroundImage(newTodo);
}

function setBackgroundImage(todo) {
  let imgVar;
  if (todo.includes(LOVE)) imgVar = img_love;
  else if (todo.includes(THANKS)) imgVar = img_thx;
  else if (todo.includes(MISS)) imgVar = img_miss;

  if (imgVar) document.body.style.backgroundImage = `url(img/${imgVar})`;
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODO_KEY);

if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos);
  parsedToDos.forEach(paintToDo);
  toDos = parsedToDos;
}
