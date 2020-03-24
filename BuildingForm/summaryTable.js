
const summaryTableModule  = (function ($, ksAPI) {
	
	const init = function(){
        buttonModule.NewType("sum","summaryTableModule.Launch()","sum");
        buttonModule.New("sum","page","sum");

        let sumButton = buttonModule.New("page","summaryTableModule.Launch()",["icon","sum"]);
		sumButton.displayButton();
	} 
	
	const launch = function(){
		notif("Go Sum");
	}

	return {
		Start:function(){init()},
		Launch:function(){launch()}
	}
	
})(jQuery, ksAPI); 