
const showResultModule  = (function ($, ksAPI) {
	
	var showResult = function(a,b){
		jQuery(".showResult").remove();
		jQuery(a).prepend("<div class='showResult'><div class='result'>"+b+"</div><div class='close' onclick='jQuery(this).parent().remove()'>Close</div>");
	}
	
	let interfaces = {};
	
	const showInterface = function(id, a){
		console.log("a :",a);
		
		this.id = id;
		this.questionList = a;
		this.getAData = function(prop){
			let toReturn = [];
			
			for(question in this.questionList){
				toReturn.push(this.questionList[question][prop]);
			}
			
			return toReturn;
		}
		this.addMenu = function(buttons){
			console.log("addMenu", buttons);
			let buttonsToAdd = "";
			
			for(but in buttons){
				buttonsToAdd = buttonsToAdd + buttons[but];
			}

			
			jQuery("#showResult").prepend("<div id='showResultMenu'>"+buttonsToAdd+"</div>");
		}
		
		jQuery(".showResult").remove();
		console.log(a);
		
		this.labelBtn = "<button id='"+this.id+"' onClick='showResultModule.Refresh('"+this.id+"',\"labels\")'>Labels</button>";
		
		this.buttons = [this.labelBtn];
		
		
		
		jQuery("#main_frame").prepend("<div id='showResult'><div class='result'></div><div class='close' onclick='jQuery(this).parent().remove()'>Close</div>");
		
		this.getAData("bestRef");
		
		this.addMenu(this.buttons);
		
		return this;
	}
	
	const refresh = function(id, settings){
		console.log("id: ",id);
		console.log("settings: ",settings); 
	}
	
	const init = function(){
		console.log("init showResultModule");
	} 
	
	return {
		Start:function(){init()},
		showResult:function(a,b){showResult(a,b)},
		showInterface:function(id,a){interfaces[id] = new showInterface(id,a)},
		Refresh:function(id,settings){refresh(id,settings)}
	}
	
})(jQuery, ksAPI); 