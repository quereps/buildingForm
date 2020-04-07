const InterfaceModule  = (function ($, ksAPI) {

	const optionObj = function(id, content){
		
		this.id = id;
		this.content = content;

		this.init = function(){
			jQuery('#interface .options').append("<div id='"+this.id+"'>"+this.content+"</div>");
		}

		this.refresh = function(){
			jQuery('#'+this.id).html(this.content);
		}
		return this;
	}

	const menuObj = function(id, name, onclick){
		this.id = id;
		this.name = name;
		this.onclick = onclick;
		this.options = {};
		this.buttons = [];
		this.content = "";

		this.addOption = function(id, content){
			this.options[id] = new optionObj(id, content);
		}

		this.showButtons= function(){
			for(item in this.buttons){
				this.buttons[item].displayButton();
			}
		}

		this.hide = function(){
			jQuery('#interface .options div').remove();
			jQuery('#interface .content').empty();
		}

		this.init = function(){
			this.showButtons();
		}

		this.launch = function(){

			console.log("Launching ... ", this.id);

			jQuery('#interface').removeClass("hide");
			jQuery('#interface .options div').remove();

			for(let i in this.options){
				this.options[i].init();
			}
			
		}

			console.log("initMenu",this);
		return this;
	}

	
	const createInterface = function(){
		console.log("createInterface");
		jQuery("#main_frame").prepend("<div id='interface' class='hide'><div class='menu'></div><div class='content'></div><div class='options'></div><div class='close' onclick='InterfaceModule.hide()'></div>");
	} 

	const show = function(menu){
		console.log("Menu: ", menu);
		jQuery('#interface').removeClass("hide");
		jQuery('#interface .content').html(this.content);
	}

	const hide = function(){
		jQuery('#interface').addClass("hide");
	}

	const removeInterface = function(){
		jQuery('#interface').remove();
	}
	
	return {
		init:function(){createInterface()},
		remove:function(){removeInterface()},
		show:function(menu){show(menu)},
		hide:function(){hide()},
		addcontent:function(content){addcontent(content)},
		//addoptions:function(id, content){return new optionObj(id, content);},
		addMenu:function(id, name, onclick){return new menuObj(id, name, onclick)}
	}
	
})(jQuery, ksAPI); 