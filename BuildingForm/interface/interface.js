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
		this.button = "";

		this.addOption = function(){
			this.options[id] = new optionObj(id, content);
		}

		this.show = function(){
			jQuery('#interface').removeClass("hide");
			jQuery('#interface .options div').remove();
		}

		this.hide = function(){
			jQuery('#interface .options div').remove();
			jQuery('#interface .content').empty();
		}

		this.init = function(){
			console.log("adding Menu", this.name);
			jQuery("#interface .menu").append("<div onclick='"+this.onclick+"' class='"+this.name+"'>"+this.name+"</div>");
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
	}

	const hide = function(){
		jQuery('#interface').addClass("hide");
	}

	const removeInterface = function(){
		jQuery('#interface').remove();
	}

	//const addcontent = function(a){
	//	jQuery('#interface .content').append("<div>"+a+"</div>");
	//}

	const addoptions = function(id, content){
		options[id] = new optionObj(id, content);
		//options[id].init();
	}

	const addMenu = function(id, name, onclick){
		menu[id] = new menuObj(id, name, onclick);
		//menu[id].init();
	}
	
	return {
		init:function(){createInterface()},
		remove:function(){removeInterface()},
		show:function(menu){show(menu)},
		hide:function(){hide()},
		addcontent:function(content){addcontent(content)},
		addoptions:function(id, content){addoptions(id, content)},
		addMenu:function(id, name, onclick){addMenu(id, name, onclick)}
	}
	
})(jQuery, ksAPI); 