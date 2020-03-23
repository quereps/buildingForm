
const showResultModule  = (function ($, ksAPI) {
	
	var showResult = function(a,b){
		//jQuery(".showResult").remove();
		//jQuery(a).prepend("<div class='showResult'><div class='result'>"+b+"</div><div class='close' onclick='jQuery(this).parent().remove()'>Close</div>");
	}
	
	let interfaces = {};
	
	const createInterface = function(id, questionArray){

		this.id = id;
        this.questionList = questionArray;
        
		this.getAData = function(prop){ // return a specific prop of the question object (label, identifier, Qref)
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
            jQuery("#showResultMenu").remove();
			jQuery("#showResult").prepend("<div id='showResultMenu'>"+buttonsToAdd+"</div>");
		}
		
		jQuery("#showResult").remove();
		
        this.labelBtn = "<button class='htmlButton' id='"+this.id+"' onClick='showResultModule.Refresh(\""+this.id+"\",\"questionLabel\")'>Labels</button>";
        this.bestRefBtn = "<button class='htmlButton' id='"+this.id+"' onClick='showResultModule.Refresh(\""+this.id+"\",\"bestRef\")'>Ref</button>";
        this.pipingBtn = "<button class='htmlButton' id='"+this.id+"' onClick='showResultModule.Refresh(\""+this.id+"\",\"piping\")'>Piping</button>";
		
		this.buttons = [this.labelBtn,this.bestRefBtn,this.pipingBtn];
		
		jQuery("#main_frame").prepend("<div id='showResult'><div class='result'></div><div class='close' onclick='jQuery(this).parent().remove()'></div>");
		
        this.addMenu(this.buttons);
        
        this.show = function(settings){
            return this.getAData(settings);
        }
		
		return this;
	}
	
	const refresh = function(id, settings){
        let toShow = interfaces[id].show(settings);
        jQuery(".result").html(toShow);
	}
	
	const init = function(){
		console.log("init showResultModule");
	} 
	
	return {
		Start:function(){init()},
		showInterface:function(a,b){showInterface(interfaceId)},
		createInterface:function(id,a){interfaces[id] = new createInterface(id,a)},
		Refresh:function(id,settings){refresh(id,settings)}
	}
	
})(jQuery, ksAPI); 