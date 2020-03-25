const searchResultModule  = (function ($, ksAPI) {
	
	//var showResult = function(a,b){
	//	jQuery(".showResult").remove();
	//	jQuery(a).prepend("<div class='showResult'><div class='result'>"+b+"</div><div class='close' onclick='jQuery(this).parent().remove()'>Close</div>");
	//}
	
	let result = {};
	
	const presentData = function(dataArray){
		
		let toReturn = "<table style='margin:auto;' class='resultTable'>";
		
		for(let i in dataArray){
			toReturn = toReturn + "<tr><td>"+dataArray[i]+"</td></tr>"
		}

		toReturn = toReturn + "</table>";

		return toReturn;
	}



	const newResult = function(idTarget, questionArray){

		this.id = idTarget;
        this.questionList = questionArray;
        
		this.getAData = function(prop){ // return a specific prop of the question object (label, identifier, Qref)
			let toReturn = [];
			
			for(question in this.questionList){
				toReturn.push(this.questionList[question][prop]);
			}
			
			return presentData(toReturn);
        }
        
		this.addMenu = function(buttons){
			let buttonsToAdd = "";
			
			for(but in buttons){
				buttonsToAdd = buttonsToAdd + buttons[but];
			}

			InterfaceModule.addoptions("resultBtn",buttonsToAdd);
            //jQuery("#"+this.id+" .options .Menu").remove();
			//jQuery("#"+this.id+" .options").append("<div class='Menu'>"+buttonsToAdd+"</div>");
		}

        this.labelBtn = "<button class='searchButton' onClick='searchResultModule.Refresh(\"questionLabel\")'>Labels</button>";
        this.bestRefBtn = "<button class='searchButton' onClick='searchResultModule.Refresh(\"bestRef\")'>Ref</button>";
        this.pipingBtn = "<button class='searchButton' onClick='searchResultModule.Refresh(\"piping\")'>Piping</button>";
		
		this.buttons = [this.labelBtn,this.bestRefBtn,this.pipingBtn];

		if(jQuery("#resultBtn").length==0){
			this.addMenu(this.buttons);
		}
        
        
        this.show = function(settings){
            jQuery("#"+this.id+" .content").html(this.getAData(settings));
        }
		
		return this;
	}
	
	const refresh = function(settings){
		console.log("let's refresh");
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
		Refresh:function(settings){refresh(settings)}
	}
	
})(jQuery, ksAPI); 