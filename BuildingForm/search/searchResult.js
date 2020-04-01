const searchResultModule  = (function ($, ksAPI) {
	
	
	let result = {};
	
	



	
	
	const refresh = function(settings){
		console.log("let's refresh");
        result.show(settings);  
	}
	
	const init = function(){

		console.log("init searchResult");
		 
	} 

	const createResult = function(idTarget, questionArray){
		result = new newResult(idTarget, questionArray);
		result.show("bestRef");
	}
	
	return {
		Start:function(){init()},
		createResult:function(idTarget, questionArray){createResult(idTarget, questionArray)},
		Refresh:function(settings){refresh(settings)}
	}
	
})(jQuery, ksAPI); 