const searchResultModule  = (function ($, ksAPI) {
	
	var showResult = function(a,b){
		jQuery(".showResult").remove();
		jQuery(a).prepend("<div class='showResult'><div class='result'>"+b+"</div><div class='close' onclick='jQuery(this).parent().remove()'>Close</div>");
	}
	
	let result = {};
	
	const newResult = function(idTarget, questionArray){

		this.id = idTarget;
        this.questionList = questionArray;
        
		this.getAData = function(prop){ // return a specific prop of the question object (label, identifier, Qref)
			let toReturn = [];
			
			for(question in this.questionList){
				toReturn.push(this.questionList[question][prop]);
			}
			
			return toReturn;
        }
        
		this.addMenu = function(buttons){
			console.log("addMenu2", buttons);
			let buttonsToAdd = "";
			
			for(but in buttons){
				buttonsToAdd = buttonsToAdd + buttons[but];
			}
            jQuery("#"+this.id+"Menu").remove();
			jQuery("#"+this.id).prepend("<div id="+this.id+"Menu'>"+buttonsToAdd+"</div>");
		}
		
		//jQuery("#showResult").remove();
		
        this.labelBtn = "<button class='searchButton' onClick='searchResultModule.Refresh(\"questionLabel\")'>Labels</button>";
        this.bestRefBtn = "<button class='searchButton' onClick='searchResultModule.Refresh(\"bestRef\")'>Ref</button>";
        this.pipingBtn = "<button class='searchButton' onClick='searchResultModule.Refresh(\"piping\")'>Piping</button>";
		
		this.buttons = [this.labelBtn,this.bestRefBtn,this.pipingBtn];
		
		//jQuery("#main_frame").prepend("<div id='showResult'><div class='result'></div><div class='close' onclick='jQuery(this).parent().remove()'></div>");
		
        this.addMenu(this.buttons);
        
        this.show = function(settings){
            jQuery(this.id).html(this.getAData(settings));
        }
		
		return this;
	}
	
	const refresh = function(settings){
        result.show(settings);  
	}
	
	const init = function(){
		console.log("init searchResult");
	} 

	const createResult = function(idTarget, questionArray){
		result = new newResult(idTarget, questionArray);
	}
	
	return {
		Start:function(){init()},
		createResult:function(idTarget, questionArray){createResult(idTarget, questionArray)},
		//showInterface:function(a,b){showInterface(interfaceId)},
		//createInterface:function(id,a){interfaces[id] = new createInterface(id,a)},
		Refresh:function(settings){refresh(settings)}
	}
	
})(jQuery, ksAPI); 