// Angular functionality 

var app = angular.module('ToDo', ['storageService']);

app.controller('ToDoController', ['$scope', 'getLocalStorage', function($scope, getLocalStorage) {
    $scope.todos = getLocalStorage.getTodos();
     
	$scope.getTotalTodos = function () {
        return $scope.todos.length;
    };
	
	$scope.clearTodos = function () {
		$scope.todos = _.filter($scope.todos, function(todo){
		return !todo;
		});
	};
	 
    $scope.addTodo = function() {
        $scope.todos.push({'title': $scope.newTodo, hour1:$scope.ToDoHour1, hour2:$scope.ToDoHour2});
		$scope.formTodoText = '';
        $scope.ToDoHour1 = '';
        $scope.ToDoHour2 = '';
        getLocalStorage.updateTodos($scope.todos, $scope.formTodoText, $scope.ToDoHour1, $scope.ToDoHour2);
        $scope.newTodo = '';

// Percentage		
		$('.list-container .unstyled li article input[type=checkbox]').click(function()
		{
			
		var n = $( "li article" ).length; 
		var c = $( "li article.done-true" ).length;
		var m = (c*100)/n;
		var m = parseInt(m);
		
		$('#percent').html( + m + "%");
		$('.range2').css({'width': +m+ '%','transition':'0.5s'});
		
			if( m <= 15 && m <= 15 ){  
				$('.range2').css({'background':'linear-gradient(#F48F8D, #D43F3A)','filter':'progid:DXImageTransform.Microsoft.gradient(startColorStr=#F48F8D, endColorStr=#D43F3A, GradientType=1)'});	
			}
			else if( m >= 16 && m <= 50 ){
				$('.range2').css({'background':'linear-gradient(#f6b897, #E07841)','filter':'progid:DXImageTransform.Microsoft.gradient(startColorStr=#f6b897, endColorStr=#E07841, GradientType=1)'});
			}
			else if( m >= 51 && m <= 80 ){
				$('.range2').css({'background':'linear-gradient(#fce4c2, #F0AD4E)','filter':'progid:DXImageTransform.Microsoft.gradient(startColorStr=#fce4c2, endColorStr=#F0AD4E, GradientType=1)'});
			}
			else if( m >= 81){ 
				$('.range2').css({'background':'linear-gradient(#89f389, #56B256)','filter':'progid:DXImageTransform.Microsoft.gradient(startColorStr=#89f389, endColorStr=#56B256, GradientType=1)'});
			}
			window.localStorage.setItem( 'rand', 'marcat' );

			var marcat = JSON.parse( window.localStorage.getItem( 'rand' ) );
				$('.list-container .unstyled li span').addClass('done-true > span');
					
			});	
        
    };
    
    $scope.clearCompleted = function () {
        $scope.todos = _.filter($scope.todos, function(todo){ 
            return !todo.done;
		});
    };
	
	$scope.deleteTask = function(index) {
        $scope.todos.splice(index, 1);
    }
}]);

var storageService = angular.module('storageService', []);

storageService.factory('getLocalStorage', function() {
    
    var todoList = {};
        
    return {
            list: todoList,
            
        updateTodos: function (todosArr) {
            if (window.localStorage && todosArr) {
                localStorage.setItem("todos", angular.toJson(todosArr));
            }
//update the cached version
            todoList = todosArr;
        },
        
        getTodos: function () {
            todoList = angular.fromJson( localStorage.getItem("todos") );
            return todoList ? todoList : [];
        }
    };
});

// END of Angular functionality 

	document.getElementById("saveToDisk").disabled=true;
// Rest of functionality
	$(document).ready(function()
	{
		$('#refresh').click(function(){
			location.reload();
		});
		
// Side menu		
		$('#social-drop').click(function(){
			$('.dropdown-socials').toggle(200);
		});
		$('#apps-drop').click(function(){
			$('.dropdown-apps').toggle(200);
		});

// Sortable UI		
	 $(function() {
		$( "#sortable" ).sortable({ handle: '.handle' });
	  });
	  
  
// Scrollbar
	(function($) {  
		$(window).load(function() {  
		$(".list-container").mCustomScrollbar({   
			scrollEasing:"easeOutCirc",  
			mouseWheel:"auto",   
			autoDraggerLength:true,   
			advanced:{  
			updateOnBrowserResize:true,   
			updateOnContentResize:true   
			} 
			}); 
		});  
	})(jQuery);
	
// Timepicker	
		$('.timepicker').timepicker(); 	
			$('.add').mousedown(function(){
			$('input[type=text].timepicker').focus();
			$('#ui-timepicker-div').hide();
		});
		
// Tooltip
		$(function () {
			$('[data-toggle="tooltip"]').tooltip()
		});

		window.onbeforeunload = confirmExit;

// Confirm exit	
		function confirmExit()
		{
			return "Daca parasiti pagina, datele introduse nu vor fi salvate!";
		}
		
// Drop area highlight		
		$('.mark-icon-area .mark-icon').mouseenter(function()
			{
				$('.mark-drop').css({'border':'1px solid #7E858E','transition':'0.2s'});
			});
			$('.mark-icon').mouseleave(function()
			{
				$('.mark-drop').css({'border':'1px solid #e5e5e5','transition':'0.2s'});
			});

// Drop credentials
		$('#activate-input-dropdown').click(function(){
				$('.project-input-area').slideDown(200);
			});
		$('.input-select').click(function(){
				$('.project-input-area').slideUp(200);
			});
		$('.cancel-log').click(function(){
			$('.log-time').fadeOut(1);
			$('.log-time-2').css({'display':'inline-block','vertical-align':'top'});
		});
		$('.log-time-2').click(function(){
		$(this).fadeOut(1, function(){
			$('.log-time').fadeIn(100);
			});	
		});

// E-mail validation		
	$('#email-to').blur(function()
		{ 
			var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	 
			var emailaddressVal = $("#email-to").val(); 
			
			if(!emailReg.test(emailaddressVal)) {
				alert("Enter a valid e-mail adress");
				document.getElementById("saveToDisk").disabled=true;					
			}
			else if($("#email-to").val() == 0){
				alert("Enter an e-mail adress"); 
				document.getElementById("saveToDisk").disabled=true;	
			}
			else {
				document.getElementById("saveToDisk").disabled=false;	 
			}
		});  
	});  
	
// Drag and drop mark-icons	
		function allowDrop(ev) {
			ev.preventDefault();
		}

		function drag(ev) {
			ev.dataTransfer.setData("text", ev.target.id);
		}

		function drop(ev) {
			ev.preventDefault();
			var data = ev.dataTransfer.getData("text");
			ev.target.appendChild(document.getElementById(data));
			$('.mark-drop').click(function(){
				$(this).find('.mark-icon').hide(100);
			});
				$('article .mark-drop').css('border','1px solid #A12762 !important');
		}

// Edit task	
	function editare(){
		
		$(document).ready(function(){
		
			$(".unstyled li article span").click(function(){
				$(this).parent().parent().find(".text-area").slideDown(200);
				$(this).parent().parent().parent().find("textarea").text( $(this).text() ).focus();	
			});
			
			$(".unstyled li article label.display-start-time").click(function(){
				$(this).parent().parent().find(".text-area").slideDown(200);
				$(this).parent().parent().parent().find(".text-area-time .start-time-input").val( $(this).text() ).focus();	
				$(this).parent().parent().parent().find("textarea").text( $(this).parent().parent().find('span').text());  
			});
			
			$(".unstyled li article label.display-end-time").click(function(){
				$(this).parent().parent().find(".text-area").slideDown(200);
				$(this).parent().parent().parent().find(".text-area-time .end-time-input").val( $(this).text() ).focus(); 	
				$(this).parent().parent().parent().find("textarea").text( $(this).parent().parent().find('span').text());  
			});
	
// Character count textarea		
			$(".textarea").keyup(function(){
				el = $(this);
				if(el.val().length >= 430){ 
					el.val( el.val().substr(0, 430) ); 
				} else {
				$(this).parent().find(".count").text(430-el.val().length);
				}
			});

		});
	}
		
// Character count input-text	
	$("input[type=text].task-insert").keyup(function(){
		el2 = $(this);
		if(el2.val().length >= 220){
			el2.val( el2.val().substr(0, 220) );
		} else {
		$(".count2").text(220-el2.val().length);
		}
	});

//Save edited text	
	function saved(){ 
	
		$(".unstyled li article .text-area button").click(function(){
			$(this).parent().slideUp(200);
			$(this).parent().parent().find("span").text( $(this).parent().find('textarea').val() );		
			$(this).parent().parent().find("label.display-start-time").text( $(this).parent().find('.start-time-input').val() );		
			$(this).parent().parent().find("label.display-end-time").text( $(this).parent().find('.end-time-input').val() );		
		});
		 
	}
	
// Timeouts

	function alert150000() {
		$('.label-danger').click(function(){
		$(this).parent().parent().fadeOut(100);
		var alertaContent = $(this).parent().parent().parent().parent().find('span').text();
		setTimeout( function(){  
			alert("Odo alert for task : \n" + alertaContent);
			$('.reminder-box ul').fadeIn(100); 
			$('.reminder').removeClass("alert-set");  
		}, 1000*60*15);
		});
	}
	function alert300000() {
		$('.label-danger').click(function(){
		$(this).parent().parent().fadeOut(100);
		var alertaContent = $(this).parent().parent().parent().parent().find('span').text();
		setTimeout( function(){  
			alert("Odo alert for task : \n" + alertaContent);
			$('.reminder').removeClass("alert-set");  
			$('.label-danger').fadeIn(100);
		}, 1000*60*30); 
	});
	}
	function alert450000() {
		$('.label-danger').click(function(){
		$(this).parent().parent().fadeOut(100);
		var alertaContent = $(this).parent().parent().parent().parent().find('span').text();
		setTimeout( function(){  
			alert("Odo alert for task : \n" + alertaContent);
			$('.reminder').removeClass("alert-set");  
			$('.label-danger').fadeIn(100);
		}, 1000*60*45); 
	});
	}
	function alert600000() {
		$('.label-danger').click(function(){
		$(this).parent().parent().fadeOut(100);
		var alertaContent = $(this).parent().parent().parent().parent().find('span').text();
		setTimeout( function(){  
			alert("Odo alert for task : \n" + alertaContent);
			$('.reminder').removeClass("alert-set");
			$('.label-danger').fadeIn(100);			
		}, 1000*60*60); 
	});
	}
	function alert900000() {
		$('.label-danger').click(function(){
		$(this).parent().parent().fadeOut(100);
		var alertaContent = $(this).parent().parent().parent().parent().find('span').text();
		setTimeout( function(){  
			alert("Odo alert for task : \n" + alertaContent);
			$('.reminder').removeClass("alert-set"); 
			$('.label-danger').fadeIn(100);
		}, 1000*60*90);
	});
	}
	function alert1200000() {
		$('.label-danger').click(function(){
		$(this).parent().parent().fadeOut(100);
		var alertaContent = $(this).parent().parent().parent().parent().find('span').text();
		setTimeout( function(){  
			alert("Odo alert for task : \n" + alertaContent);
			$('.reminder').removeClass("alert-set"); 
			$('.label-danger').fadeIn(100);
		}, 1000*60*120); 
	});
	}
	
// Text color	
	function colorRed(){
		$(".color-red").click(function(){
			$(this).parent().parent().find("span").text( $(this).parent().find('textarea').val() ).css('color','#C93F30'); 
		});
	}	
	
	function colorGreen(){
		$(".color-green").click(function(){
			$(this).parent().parent().find("span").text( $(this).parent().find('textarea').val() ).css('color','#56B256');
		});
	}
	
	function colorBlue(){
		$(".color-blue").click(function(){
			$(this).parent().parent().find("span").text( $(this).parent().find('textarea').val() ).css('color','#4965b5');
		});
	}
	
	function colorBlack(){
		$(".color-black").click(function(){
			$(this).parent().parent().find("span").text( $(this).parent().find('textarea').val() ).css('color','#333');
		});
	}

// Reminder
	function reminder(){
		$(document).ready(function()
		{
			$(".reminder").click(function(){
				$(this).parent().parent().find(".reminder-box").slideDown(200);	

			setTimeout(function(){  
				$(".reminder-box").slideUp(200); 			
			}, 5000);				
			});
			
			$(".reminder-box ul li label").click(function(){
				$(this).parent().parent().parent().parent().find(".reminder-box").slideUp(200);
				$(this).parent().parent().parent().parent().find(".reminder").addClass("alert-set");

			});
		});
	}

// Screenshot 
	$(function() { 
		$("#screen-shot").click(function() 
		{ 
			$(".btn-custom, .reminder-box ul li label, .reminder-box, .text-area button, .cancel-log, .reminder, .handle, .log-time").hide(100);
			html2canvas($("#list"), {
				onrendered: function(canvas) {
					theCanvas = canvas;
					document.body.appendChild(canvas);
					canvas.setAttribute('class','canvas');
					document.getElementById('canvas').src = dataURL;
					canvas.toBlob(function(blob) {
						saveAs(blob, "quicklist.jpg");
					});
				}
			});
			$('.toggle-panel').slideDown(200);
			$("#screen-shot").fadeOut(100);
				$("#close-toggle-panel").click(function(){
					$(".btn-custom, .reminder-box ul li label, .text-area button, .cancel-log, .reminder, .handle, .log-time").fadeIn(100);
					$('.toggle-panel').slideUp(200);
					$(".canvas").fadeOut(100, function(){
					$("#screen-shot").fadeIn(100);
					});
				});
		});
	});
	
 //List
function list(){
//$('.ng-scope').unbind('click');
	$('em').click(function(){
		if($(this).hasClass('fa-arrow-right')){  
			$(this).removeClass("fa-arrow-right");
			$(this).addClass("fa-arrow-left");
			$(this).parent().css('padding','10px 10px 10px 65px')
			$(this).parent().find('span').css('font-size','11px').addClass('aliniat'); 
		}
		else{
			$(this).removeClass("fa-arrow-left");
			$(this).parent().parent().removeClass('aliniat');
			$(this).addClass("fa-arrow-right");
			$(this).parent().css('padding','10px').removeClass('aliniat');
			//$(this).parent().removeClass('list-class');
			$(this).parent().find('span').css('font-size','12px').removeClass('aliniat'); 
		}  
			window.localStorage.setItem( 'tras', 'tras2' );

			var tras2 = JSON.parse( window.localStorage.getItem( 'tras' ) );
			$('.list-container .unstyled li span').css('color','red');
	}); 
}

	
	
	

