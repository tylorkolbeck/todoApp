
var todoList = {
  todos : [
		{todoText : "Feed The Dog", completed : true, extraDrawerOpen : false, extras : '1 Cup of food per dog.'}, 
		{todoText : "Water The plants", completed : false, extraDrawerOpen : false, extras : 'Make Sure you use only 1 quart of water per plant.'},		
		{todoText : "pay bills", completed : true, extraDrawerOpen : false, extras : 'Pay the water bill first.'}, 
		{todoText : "pick up milk", completed : false, extraDrawerOpen : false, extras : 'Go to Vons to get the Milk.'},
		{todoText : "do the laundry", completed : false, extraDrawerOpen : false, extras : ''},
		{todoText : "pick up the kids at 5", completed : false, extraDrawerOpen : false, extras : 'console.log\("HAHAHAHA"\);'}	
	],
      
  // FUNCTION ADD
  addTodos : function(todoText) {
    this.todos.push({
      todoText : todoText,
      completed : false,
			extraDrawerOpen : false,
			extras : []
    });
  },
  
  // FUNCTION CHANGE
  changeTodo : function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  
  // FUNCTION DELETE
  deleteTodo : function(ref) {
    this.todos.splice(ref, 1);
  },
  
  // FUNCTION TOGGLE
  toggleCompleted : function(position) {
		handlers.extrasDrawer(position);
    var todo = this.todos[position];
    todo.completed = !todo.completed;
		//  Reset extraDrawerOpen to false incase the item is toggled complete while 
		//  the drawer is open.
		todo.extraDrawerOpen = false;
  },
  
  // FUNCTION TOGGLE ALL
  toggleAll: function() {
		view.displayTodos();
    var totalTodos = this.todos.length;  
    var completedTodos = 0;
			
		this.todos.forEach(function(todo) {
			if (todo.completed === true) {
				completedTodos++;
			}
		});
			
		this.todos.forEach(function(todo) {
			//  Case 1: If everything's true, make everything false.
			if (completedTodos === totalTodos) {
				todo.completed = false;
			} else {
				//  Case 2: Otherwise, make everything true.
				todo.completed = true;
			}
		});
   }
 };
  
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// HANDLER METHODS /////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
var handlers = {
	
  addTodo : function() {
    var addTodoTextInput = document.getElementById('listInput');
    todoList.addTodos(addTodoTextInput.value);
		view.displayTodos();	
  },
      
  changeTodo : function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
		view.displayTodos();
  },
  
  deleteTodo : function(deletePosition) {
    todoList.deleteTodo(deletePosition);
		view.displayTodos();
  },
  
	todoCompleted : function(position) {
		todoList.toggleCompleted(position);
		view.displayTodos();
	},
    
	toggleAll : function() {
		todoList.toggleAll();
		view.displayTodos();
  },
	
	//  Handler to determine wether to run drawer opened or closed handler.
	extrasDrawer : function(parentNodeId) {
		//  Get array object
		var textareaCheck = document.getElementById('textareaValue');
		
		if (textareaCheck) {
			var parentNodeId = textareaCheck.parentNode.parentNode.id;
		} else if (!parentNodeId) {
			console.log('*******FAILED TO GRAB PARENT NODE ID************');
		}
		
		var drawerOpenBool = todoList.todos[parentNodeId].extraDrawerOpen;
		
		// Drawer is closed and is being opened.
		if (drawerOpenBool === false) {
			todoList.todos[parentNodeId].extraDrawerOpen = true;
			
			view.openDrawer(todoList.todos[parentNodeId]);
			
		// Drawer is open and is being closed.
		} else if (drawerOpenBool === true) {
			todoList.todos[parentNodeId].extraDrawerOpen = false;
			view.closeDrawer(todoList.todos[parentNodeId]);
		}
	},
	
	editTodoTitle : function(event){
		if(event.target.className === 'list-item' || event.target.className === 'line-through') {
			//  Get the text from the title.
			let originalTitle = event.target.childNodes[1].textContent;
			//  Set the Visible title to nothing.
			event.target.childNodes[1].textContent = "";
			//  Append the input with the original title as the value
			_tk.append(event.target, 'input', {value : originalTitle}, {className : 'editTodoTitle'}, {id : 'editTodoTitle'}).focus();
		}
	},
	
	updateTitle : function(event) {
		var titleId = event.target.parentNode.id;
		var newTitle = event.target.value;
		todoList.todos[titleId].todoText = newTitle; 
		view.displayTodos();
	},
	
	filterCompleted : function(event) {
		view.showCompleted();
	},
	
	filterRemaining : function(event) {
		view.showRemaining();
	},
	
	updateExtraInfo : function(event) {
		var textareaId = event.target.parentNode.parentNode.id;
		var newExtraInfo = event.target.value;
		todoList.todos[textareaId].extras = newExtraInfo;
	}

	
};

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// VIEW METHODS ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
var view = {
	displayTodoCount : function() {
		//  Variables for displayTodoCount Method
		var totalCompletedTodos = 0,
		totalRemainingTodos = 0;
		
		// Add up completed and remaining
		todoList.todos.forEach(function(todo) {
			if (todo.completed === true) {
				totalCompletedTodos++;
			} else {
				totalRemainingTodos++;
			}
		});
		
		//  Create Info Bar
		_tk.append(_tk.node('ul'), 'li', {id : 'liInfoBar'}, {className : 'liInfoBar'});
		//  ToggleAll Button
		//	_tk.append(_tk.id('liInfoBar'), 'span', {textContent: 'Toggle All'}, {className: 'toggleAllButton'});
		
		_tk.append(_tk.id('liInfoBar'), 'span', {textContent : 'Show All'}, {className : 'showAllButton'});
		
		
		//  Display Number Completed
		var todosCompletedSpan = _tk.append(_tk.id('liInfoBar'), 'span', {textContent:'Completed: '}, {id:'showCompletedButton'})
		
		_tk.append(todosCompletedSpan, 'span', {textContent : totalCompletedTodos}, {className : 'numberSpan'}, {id:'showCompletedButton'});
		
		//  Display Number Remaining
		var todosRemainingSpan = _tk.append(_tk.id('liInfoBar'), 'span', {textContent: 'Remaining: '}, {id: 'showRemainingButton'});
		
		_tk.append(todosRemainingSpan, 'span', {textContent : totalRemainingTodos}, {className : 'numberSpan'})
		
	},
	
	displayAddTodoInput : function() {
		// Input box for adding new todos
		_tk.append(_tk.node('ul'), 'li', {id : 'inputTodoBox'});
		_tk.append(_tk.id('inputTodoBox'), 'input', {id : 'listInput'}, {className : 'listInput'}, {type : 'text'}, {placeholder : 'Add To Do...'});
	},	
	
  displayTodos : function() {
		
		//  Clear out whats already showing before showing again
    _tk.node('ul').innerHTML = '';
		
		// Input box for adding new todos
		this.displayAddTodoInput();
		
		// Function to count remaining todos
		this.displayTodoCount();
		
			//  forEach to determine if its needs to be lined through for completion
			todoList.todos.forEach(function(todo, position){
				var todosLi = _tk.create('li',{className:'list-item'},{id:position});
		
				
				//  Small arrow next to list item titles.
				var editDiv = view.editTodoImg();

				if (todo.completed === true) {
					todosLi.className = "line-through";
					todosLi.textContent = todo.todoText;
					
				} else {
					todosLi.className = "list-item";
					todosLi.textContent = todo.todoText;
					
				}
		
				//  Add the Li to the Ul element
				_tk.node('ul').appendChild(todosLi);
				// Add a div to the begining of the LI element
				todosLi.insertAdjacentElement('afterbegin', editDiv);
				//  Run createDeleteButton which returns a button with id as position
				todosLi.appendChild(this.createDeleteButton());
			}, this);
  },
	
	createDeleteButton : function(){
		var deleteButton = document.createElement('span');
		deleteButton.textContent = 'X';
		deleteButton.className = 'deleteButton';
		return deleteButton;
	},
	
	//  Open Drawer Method.
	openDrawer : function(listObject) {
		view.displayTodos();
		// Get Index of list object.
		let todoObjectIndex = todoList.todos.indexOf(listObject);
		//  Insert an LI.
		let todoExtraNode = _tk.append(document.getElementById(todoObjectIndex), 'li', {className : 'extrasLi'}, {id : 'extrasLi' + todoObjectIndex});

		//  Insert textarea to extra li
		let todoExtraTextareaNode = _tk.append(todoExtraNode, 'textarea', {id : 'textareaValue'});
		
		if (todoList.todos[todoObjectIndex].extras.length === 0) {
			todoExtraTextareaNode.placeholder = 'Add note...';
		} else {
			// Set textarea value to todo extra string
		todoExtraTextareaNode.value = todoList.todos[todoObjectIndex].extras;
		}
	},
	
	// Close Drawer Method.
	closeDrawer : function(listObject) {

		// Get Index of list object.
		var todoObjectIndex = todoList.todos.indexOf(listObject);
		
				//  The text area value
		var todoExtraTextareaNode = document.getElementById('textareaValue');
		if (todoExtraTextareaNode) {
			console.log(todoExtraTextareaNode);
					// Set extras string in the todo object.
			if (todoExtraTextareaNode.length !== 0) {
					todoList.todos[todoObjectIndex].extras = todoExtraTextareaNode.value;
			}
			
			//  Remove the text area first or it looks weird when it closes.
			todoExtraTextareaNode.parentNode.removeChild(todoExtraTextareaNode);	
		}
		
		// Get the todo node.
		var todoObjectNode = document.getElementById(todoObjectIndex);
	
		// Remove the li when closed. 
		var extraLi = document.getElementById('extrasLi' + todoObjectIndex);
		
//		Transition Effect - STILL BUGGY
//		if (extraLi !== null) {
//			extraLi.style.transition = "height .5s ease-in-out";
//			extraLi.style.height = "0px";
//		} 
//		
//
//		var transitionEnd = _tk.whichTransition(extraLi);
//		extraLi.addEventListener(transitionEnd, theFunctionToInvoke, false);

		todoObjectNode.removeChild(todoObjectNode.lastChild);
			view.displayTodos();
		
//		Function for the buggy transition effect
//		function theFunctionToInvoke() {
//			todoObjectNode.removeChild(todoObjectNode.lastChild);
//			view.displayTodos();
//		}
	},
		
	showCompleted : function() {
		const completedTodos = todoList.todos.filter (
		x => x.completed === true
		);
		
		//  Clear out whats already showing before showing again
    _tk.node('ul').innerHTML = '';
		
		// Input box for adding new todos
		this.displayAddTodoInput();
		
		// Function to count remaining todos
		this.displayTodoCount();
		//  FOR EACH LOOP HERE TO DISPLAY ALL THE COMPLETED TODOS
		completedTodos.forEach(function(todo, position){
				
				// Create the li element.
			  var todosLi = _tk.create('li',{className:"line-through"},{id:position}, {textContent:todo.todoText});

				//  Small circle next to list item titles.
				var editDiv = view.editTodoImg();
			
				//  Add the Li to the Ul element
				_tk.node('ul').appendChild(todosLi);
			
				// Add a div to the begining of the LI element
				todosLi.insertAdjacentElement('afterbegin', editDiv);
			
				//  Run createDeleteButton which returns a button with id as position
				todosLi.appendChild(view.createDeleteButton());
		});
		
	},
	
	showRemaining : function() {
		const remainingTodos = todoList.todos.filter(
		x => x.completed === false
		)
		
		//  Clear out whats already showing before showing again
    _tk.node('ul').innerHTML = '';
		
		// Input box for adding new todos
		this.displayAddTodoInput();
		
		// Function to count remaining todos
		this.displayTodoCount();
		
		//  FOR EACH LOOP HERE TO DISPLAY ALL THE COMPLETED TODOS
	remainingTodos.forEach(function(todo, position){
				
				// Create the li element.
			  var todosLi = _tk.create('li',{className:"list-item"},{id:position}, {textContent:todo.todoText});

				//  Small circle next to list item titles.
				var editDiv = view.editTodoImg();
			
				//  Add the Li to the Ul element
				_tk.node('ul').appendChild(todosLi);
			
				// Add a div to the begining of the LI element
				todosLi.insertAdjacentElement('afterbegin', editDiv);
			
				//  Run createDeleteButton which returns a button with id as position
				todosLi.appendChild(view.createDeleteButton());
		});
		
		
	},
	
	
editTodoImg : function(){
	var editTodoImg = _tk.create('img', {src:'images/down_arrow.svg'},{className:'extrasButton'});
	return editTodoImg;
},
	
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// EVENT LISTENERS /////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
	//  START OF EVENT LISTENERS
	setUpEventListeners : function() {
		// Timer for the double click
		var timer = 0;
		var delay = 250;
		var prevent = false;
		
		//  Select the Unordered list 
		var todosUl = document.querySelector('ul');
		
		todosUl.addEventListener('focusout', function(event) {
			if(event.target.className === 'editTodoTitle') {
				handlers.updateTitle(event);
			} else if (event.target.id === 'textareaValue') {
				
				handlers.updateExtraInfo(event);
			} 				
		});
		
		
		// Double click event listener for edit input
		todosUl.addEventListener('dblclick', function(event) {
			if (event.detail == 2) {
				event.preventDefault();
				//  Call the editTodo function in handlers.
				handlers.editTodoTitle(event);
				
				// Reset the timeout.
				clearTimeout(timer);
				prevent = true;
				 
			}
		}, false); 
		
		// Delete button event listener.
		todosUl.addEventListener('click', function(event) {
			
			//  Get the element that was clicked on
			// Check if elementClicked is a delete button
			if(event.target.className === 'deleteButton'){
				handlers.deleteTodo(parseInt(event.target.parentNode.id));
			}
			
			else if(event.target.className === 'list-item' || event.target.className === 'line-through') {
				timer = setTimeout(function() {
					if (!prevent) {
						handlers.todoCompleted(event.target.id);
					}
					prevent = false;
				}, delay);	
			}
			
			else if(event.target.className === 'toggleAllButton') {
				var textareaVisibleCheck = document.getElementById('textareaValue');
					if (textareaVisibleCheck) {	handlers.extrasDrawer(document.getElementById('textareaValue').parentNode.parentNode.id);
						handlers.toggleAll();
				} else {
				handlers.toggleAll();
				}

			}
			
			else if (event.target.className === "showAllButton") {
				view.displayTodos();
			}
			
			else if (event.target.id === "showCompletedButton") {
				handlers.filterCompleted();
			}
			
			else if (event.target.id === "showRemainingButton") {
				console.log('remain');
				handlers.filterRemaining();
			}
			
			// Extras Button Listener
			else if(event.target.className === 'extrasButton'  ) {
				handlers.extrasDrawer(event.target.parentNode.id);
				
				
				
//				if (todoList.todos[event.target.parentNode.id].extraDrawerOpen === true) {
//					console.log(event.target.parentNode.id);
//					todoList.todos[event.target.parentNode.id].extras = event.target.value;
//					view.showExtras(event.target.parentNode.id);
//				} else { 
//					handlers.showExtraDrawer(event.target.parentNode.id);
//				}

			}
			
		});
		
		// Keyup listener for add todo item input
		todosUl.addEventListener('keyup', function(event) {

			//  Key Code 13 is the "Enter" key.
			if (event.keyCode === 13 && event.target.id === 'listInput') {
				handlers.addTodo();
			} 
			
			else if (event.keyCode === 13 && event.target.id === 'editTodoTitle') {
				handlers.updateTitle(event);
			}		
			
		});
		
	},
	
};

view.displayTodos();
view.setUpEventListeners();







