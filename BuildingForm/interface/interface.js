const InterfaceModule  = (function ($, ksAPI) {
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

	const addcontent = function(a){
		jQuery('#interface .content').append(a);
	}

	const addoptions = function(a){
		jQuery('#interface .options').append(a);
	}
	
	return {
		init:function(){createInterface()},
		create:function(){createInterface();show()},
		remove:function(){removeInterface()},
		show:function(){show()},
		hide:function(){hide()},
		addcontent:function(content){addcontent(content)},
		addoptions:function(content){addoptions(content)}
	}
	
})(jQuery, ksAPI); 