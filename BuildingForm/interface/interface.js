const InterfaceModule  = (function ($, ksAPI) {

	let options = {};

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




	const refresh = function(id, settings){
        let toShow = interfaces[id].show(settings);
        jQuery(".result").html(toShow);
	}
	
	const createInterface = function(){
		console.log("createInterface");
		jQuery("#main_frame").prepend("<div id='interface' class='hide'><div class='menu'></div><div class='content'></div><div class='options'></div><div class='close' onclick='InterfaceModule.remove()'></div>");
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

	//const addcontent = function(a){
	//	jQuery('#interface .content').append("<div>"+a+"</div>");
	//}

	const addoptions = function(id, content){
		options[id] = new optionObj(id, content);
		options[id].init();
	}
	
	return {
		init:function(){createInterface()},
		create:function(){createInterface();show()},
		remove:function(){removeInterface()},
		show:function(){show()},
		hide:function(){hide()},
		addcontent:function(content){addcontent(content)},
		addoptions:function(id, content){addoptions(id, content)}
	}
	
})(jQuery, ksAPI); 