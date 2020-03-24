
const InterfaceModule  = (function ($, ksAPI) {

	/*const createInterface = function(){

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
	}*/
	
	const refresh = function(id, settings){
        let toShow = interfaces[id].show(settings);
        jQuery(".result").html(toShow);
	}
	
	const createInterface = function(){
		console.log("createInterface");
		jQuery("#main_frame").prepend("<div id='interface' class='hide'><div class='menu'></div><div class='content'></div><div class='close' onclick='InterfaceModule.remove()'></div>");
	} 

	const show = function(){
		jQuery('#interface').removeClass("hide");
	}

	const hide = function(){
		jQuery('#interface').addClass("hide");
	}

	const removeInterface = function(){
		jQuery('#interface').remove();
	}

	const addcontent = function(a){
		jQuery('#interface .content').append(a);
	}
	
	return {
		init:function(){createInterface()},
		create:function(){createInterface();show()},
		remove:function(){removeInterface()},
		show:function(){show()},
		hide:function(){hide()},
		addcontent:function(){addcontent(content)}
	}
	
})(jQuery, ksAPI); 