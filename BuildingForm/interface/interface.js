
const InterfaceModule  = (function ($, ksAPI) {

	const createInterface = function(){

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
		
        //this.labelBtn = "<button class='htmlButton' id='"+this.id+"' onClick='showResultModule.Refresh(\""+this.id+"\",\"questionLabel\")'>Labels</button>";
        //this.bestRefBtn = "<button class='htmlButton' id='"+this.id+"' onClick='showResultModule.Refresh(\""+this.id+"\",\"bestRef\")'>Ref</button>";
        //this.pipingBtn = "<button class='htmlButton' id='"+this.id+"' onClick='showResultModule.Refresh(\""+this.id+"\",\"piping\")'>Piping</button>";
		
		//this.buttons = [this.labelBtn,this.bestRefBtn,this.pipingBtn];
		
		
		
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
	
	const createInterface = function(){
		console.log("createInterface");
		jQuery("#main_frame").prepend("<div id='interface'><div class='menu'></div><div class='content'></div><div class='close' onclick='jQuery(this).parent().remove()'></div>");
	} 
	
	return {
		init:function(){createInterface()}
	}
	
})(jQuery, ksAPI); 