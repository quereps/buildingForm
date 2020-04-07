const createDMTable = (function ($, ksAPI) {

	let menu = InterfaceModule.addMenu("addHTMLTable","addHTMLTable","createDMTable.Run(this)");
	menu.buttons.push(buttonModule.New("page","createDMTable.Run(this)",["icon","addHTMLTable"],"Create HTML Table", true));
	
	let tableOutput = new tableObj("DMTable");
	
	const run = function(a){

		menu.launch();

		let qelm = jQuery(a).closest(".aDivEntireQuestion");	
		var question = structure[jQuery(qelm)[0].id.split("Id")[1]];
			let dmRef = question.question;
			if(question.identifier){
				dmRef = question.identifier;
			}

		let lines = vpGetResults(dmRef);
	
		for (var i in lines){
				let qid = lines[i].questionId;
				let aid = lines[i].answerId;
				let Ref = lines[i].expression;
				
				tableOutput.adddata(qid,aid,Ref);	
		}
		
		 tableOutput.apply();
	}
	
	const init = function(){
		   
			var onscreen = jQuery(".aDivtypeSingleline, .aDivtypeDropdownList");
			for(var i=0;i<onscreen.length;i++){
				let theID = onscreen[i].id.split("questionDivEntireId")[1];			
				menu.buttons[theID] = buttonModule.New(theID,"createDMTable.Run(this)",["icon","addHTMLTable"],"",false);
			}
			menu.init();
	}

	return{
		Remove:function(a){tableOutput.removedata(a)},
		Run:function(a){run(a)},
		Start:function(){init()}
	}
	
	
})(jQuery, ksAPI);