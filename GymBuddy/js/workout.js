var undo = false;
var list_item_to_undo;
var time_out;
let id = 0;

$(document).ready(function () {

  // /*DELETE*/
  // $('body').on('click', '.fa-trash', function () {

  //   if ($('.exerciseMain ul li').hasClass("temp_deleted")) {
  //     $('.exerciseMain ul li.temp_deleted').remove();
  //   }

  //   list_item_to_undo = $(this).parent().parent();
  //   var undo_time = 10000;

  //   list_item_to_undo.animate({
  //     height: "0px"
  //   }, 200, function () {
  //     $(this).addClass('temp_deleted').hide();
  //   });

  //   function_undo(list_item_to_undo, undo);

  //   //undo
  //   $('.undo').addClass('active');

  //   clearTimeout(time_out);

  //   time_out = setTimeout(function () {
  //     $('.undo').removeClass('active');
  //     if (undo === false) {
  //       $('.exerciseMain ul li.temp_deleted').remove();
  //     }
  //   }, undo_time);

  // });
  // /*DELETE*/


  // /*UNDO*/
  // $('.undo div').click(function () {
  //   undo = true;
  //   function_undo(list_item_to_undo, undo);
  //   $(this).parent().removeClass('active');
  // });


  // /*EDIT*/
  // $('body').on('click', '.fa-pencil', function () {
  //   var current = $(this).parent().parent().find('span').text();
  //   $(this).parent().parent().find('input[type=text]').val(current).show().select();
  // });


  // $('body').on('keypress', '.exerciseMain ul li input[type=text]', function (e) {
  //   if (e.which == 13) {
  //     //hide undo
  //     $('.undo').removeClass('active');

  //     var newvalue = $(this).val();
  //     $(this).parent().parent().find('label span.item-name').text(newvalue);
  //     $(this).hide();
  //     return false;    //<---- Add this line
  //   }
  // });


  // $(document).on('blur', 'input[type=text]', function () {
  //   $(this).hide();
  // });





  /*ADD NEW*/
  // $('.add').click(function () {
  //   $(this).find('input[type=text]').val('Add new').show().select();
  // });


  // $('body').on('keypress', '.add input[type=text]', function (e) {
  //   if (e.which == 13) {

  //     //hide undo
  //     $('.undo').removeClass('active');

  //     var newvalue = $(this).val();

  //     var clone = $(".exerciseMain ul li:first").clone();
  //     clone.find('label span.item-name').text(newvalue);

  //     var random_num = Math.floor(Math.random() * 1000) + 1
  //     var id = newvalue.replace(/\s/g, '');
  //     var ids = id + random_num;

  //     clone.find('input').attr({
  //       id: ids
  //     });
  //     clone.find('label').attr('for', ids);
  //     clone.find("input[type=checkbox]").prop('checked', false);
  //     clone.removeClass('priority priority1 priority2 checked');
  //     clone.show();
  //     clone.appendTo(".exerciseMain ul");

  //     $('.add').trigger("click");
  //     return false;    //<---- Add this line
  //   }
  // });


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

addTodo("Push-ups", id++);
addTodo("Wide Push-ups", id++);
addTodo("Diamond Push-ups", id++);

