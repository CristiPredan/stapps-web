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

	

