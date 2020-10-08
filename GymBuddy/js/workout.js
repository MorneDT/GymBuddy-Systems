const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const resetBtn = document.querySelector('#reset');
const output = document.querySelector('output');



var undo = false;
var list_item_to_undo;
var time_out;
let id = 0;


$(document).ready(function () {

  document.getElementById("weight").value = 72;

  /*CLICK*/
  $('body').on('change', '.exerciseMain ul li input[type=checkbox]', function () {
    if ($(this).prop('checked')) {
      $(this).parent().addClass('checked');
    } else {
      $(this).parent().removeClass('checked');
    }
  });
  /*SORTABLE*/
  $(function () {
    $(".exerciseMain ul").sortable({
      animation: 100,
      delay: 150,
      cursor: 'move',
      handle: ".dragger",
      tolerance: "pointer",
      axis: 'y'
    });
    $("#sortable").disableSelection();
  });
});

function function_undo(list_item_to_undo, undo) {
  if (undo == true) {
    list_item_to_undo.css('height', 'auto');
    list_item_to_undo.show();
    list_item_to_undo.removeClass('temp_deleted');
  }
}
function readOnlyFunction(id){
var element = document.getElementById('label_'+ id);
console.log(element);
console.log(document.getElementById(id).checked);
if(document.getElementById(id).checked == true){
  element.querySelector("#sets_"+ id).setAttribute("readonly", true);
  element.querySelector("#reps_"+ id).setAttribute("readonly", true);
  // element.elements["#sets_"+ id].setAttribute("readonly", true);
  // element.elements["#reps_"+ id].setAttribute("readonly", true);
}else{
  element.querySelector("#sets_"+ id).removeAttribute("readonly");
  element.querySelector("#reps_"+ id).removeAttribute("readonly");
}
}
let timeRead = false;

let now = 0;
let interval = null;

function startTimer() {
  
  let elapsedMil = Date.now() - now;
  
  let mil = (elapsedMil).toFixed(0) % 100;
  let sec = Math.floor(elapsedMil/1000) % 60;
  let min = Math.floor(elapsedMil/60000) % 60;
  
  mil = padTime(mil);
  sec = padTime(sec);
  min = padTime(min);
  
  function padTime(num) {
    if (num < 10) {
      num = "0" + num;
    }
    return num;
  }
  
  output.textContent = min + ":" + sec + ":" + mil;
}

function start() {
  now = Date.now();
  interval = window.setInterval(startTimer, 10);
}

function stop() {
  window.clearInterval(interval);
}

function reset() {
  output.textContent = "00:00:00";
}

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);

const sortable = document.getElementById("sortable");
function addTodo(toDo, id) {
  const item =
    `    <li>
         <div class="dragger">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle cy="7" cx="9.5" r="1" fill="#999"></circle>
           <circle cy="7" cx="14" r="1" fill="#999"></circle><circle cy="12.5" cx="9.5" r="1" fill="#999"></circle>
           <circle cy="12.5" cx="14" r="1" fill="#999"></circle><circle cy="18" cx="9.5" r="1" fill="#999"></circle><circle cy="18" cx="14" r="1" fill="#999"></circle></svg>
         </div>
         <input type="checkbox" id="${id}" onchange="readOnlyFunction(${id})" />
         <label id="label_${id}" for="${id}" >
           <div class="checkbox"><span class="fa fa-check"></span></div>
           <span class="item-name">${toDo} </span>
           <input type="text">
           <label1 class = "RepsSets" for ="sets_${id}">Sets</label1>
           <input type="number" id="sets_${id}" min="1" max="999" placeholder="--"> 
           <label1 class = "RepsSets" for = "reps_${id}">Reps</label1>
            <input type="number" id="reps_${id}" min="1" max="999" placeholder="--">
         </label>
         <div class="actions">
           <!--<span class="fa fa-pencil"></span>-->
           <!--<span class="fa fa-trash"></span>-->
         </div>
       </li>
  `;

  const postion = "beforeend";
  sortable.insertAdjacentHTML(postion, item);
}

addTodo("Push-up", id++);
addTodo("Wide Push-up", id++);
addTodo("Diamond Push-up", id++);
addTodo("Rotating Push-up", id++);

