// Global helper functions

// append(parent to append to, what type of element to make, [set the text], [set the class name or id])
var _tk = {
	append : function(parent, childType) {
			var child = parent.appendChild(document.createElement(childType));
			for (var i = 1; i < arguments.length; i++) {
				Object.assign(child, arguments[i]);
			}
		return child;
	},	
	
	create : function(elType){
		var createdEl = document.createElement(elType);
		for (var i = 1; i < arguments.length; i++) {
			Object.assign(createdEl, arguments[i]);
		}
		return createdEl;
	},
	
	id : function(id) {
		return document.getElementById(id);
	},
	
	node : function(id) {
		return document.querySelector(id);
	},
	
	class : function(id) {
		return document.getElementsByClassName(id);
	},
	
	//  A function to listen for the end of a transition.
	whichTransition : function(el) {
		var t,
		transitions = {
			'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
		}
		
		for(t in transitions){
			if (el) {
				if(el.style[t] !== undefined) {
				return transitions[t];
				}
			}
			
		}
	}
	
};




