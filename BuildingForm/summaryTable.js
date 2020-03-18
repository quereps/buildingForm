
const summaryTableModule  = (function ($, ksAPI) {
	
	const init = function(){

		   buttonModule.NewType("sum","summaryTableModule.Launch()","sum");

			buttonModule.New("sum","page","sum");

		
	} 
	
	const launch = function(){
		console.log("Go Sum");
	}
	

	return {
		Start:function(){init()},
		Launch:function(){launch()}
	}
	
})(jQuery, ksAPI); 