const createDMTable = (function ($, ksAPI) {
	
	let tableOutput = new tableObj("DMTable");
	
	const run = function(a){
	
	
	
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
		   
			//buttonModule.NewType("addHTMLTable","buildingFormsModule.CreateDMTableRun(this)","addHTMLTable");
			let buttons = {};

			var onscreen = jQuery(".aDivtypeSingleline, .aDivtypeDropdownList");
			for(var i=0;i<onscreen.length;i++){
			let theID = onscreen[i].id.split("questionDivEntireId")[1];			
				console.log(theID);
				//buttonModule.New(theID,theID,"addHTMLTable");
				buttons[theID] = buttonModule.New(theID,"buildingFormsModule.CreateDMTable.Run(this)",["icon","addHTMLTable"]);
				buttons[theID].displayButton();
			}

	}

		
	return{
		Remove:function(a){tableOutput.removedata(a)},
		Run:function(a){run(a)},
		Start:function(){init()}
	}
	
	
})(jQuery, ksAPI);