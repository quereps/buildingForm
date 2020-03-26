
const answerRandomlyModule = (function ($, ksAPI) {
	
	const toCheckOnce = ["PICK_ONE_NO_OTHER","DROPDOWN"];
	const toCheckMultiple = ["LISTBOX","CHECKALL_NO_OTHER","CHECKALL_WITH_OTHER"];
	const toFillWithText = ["SINGLE_LINE","MATRIX_3D"];
	const toFillWithCom = ["MULTI_LINE"];
	const toCheckColumns = ["RANK_GRID_INDEPENDENT"];
	const toLookup = ["LOOKUP"];

	const answerLookup = function (question){

					let Qref = question.ref;
					let nbOfAnswers = question.nbOfAnswers;
					let the_id = question.id;
					let the_ref = Qref; 

					jQuery("#lookupFinalSelect_"+the_id+"_cursor").click();
					
					setTimeout(function(){
						
						let choiceList = jQuery("#lookupFinalSelect_"+the_id+" .lq_resList li");

						jQuery(choiceList[Math.floor(Math.random() * choiceList.length)]).click();
											
					}, 900);
					
					
							
				}
				
				
	const answerCheckOnce = function (question){
		
		
		let Qref = question.ref;
		let nbOfAnswers = question.nbOfAnswers;
		
		console.log(Qref);

		var toCheck = Math.floor((Math.random() * nbOfAnswers) + 1);
					
					if(vpGetResults(Qref).length==0){
						vpSetResults(Qref+".A"+toCheck);
					}

	}
	
	const answerCheckColumns = function (question){
		let Qref = question.ref;
		let nbOfAnswers = question.nbOfAnswers;
		
		for(var i=0;i<nbOfAnswers;i++){
						let nbcol = vpGetStructure().questionsMap[question.id].columnsSorted.length;
						let randomCol = Math.ceil(Math.random() * nbcol);
							vpSetResults(Qref+".A"+(i+1)+".C"+randomCol);

					}

	}
	
	const answerCheckMultiple = function (question){
		console.log(question);
		let Qref = question.ref;
		let nbOfAnswers = question.nbOfAnswers;
		
					for(var i=0;i<nbOfAnswers;i++){
						if(Math.round(Math.random())==1){
							vpSetResults(Qref+".A"+i);
						}
						
					}
				
	}
	
	
	
	const answerFillWithText = function (question){

		notif("Answering "+question.bestRef+" - "+question.ref);

		console.log(question);

		let id = question.id;
		let Qref = question.ref;
		let nbOfAnswers = question.nbOfAnswers;
		let listOfText = question.listOfText;

					for(var i=0;i<nbOfAnswers;i++){
						
						if(vpGetResults(Qref+".A"+(i+1)).length==0){ 
						
							let answerID = vpGetStructure().questionsMap[id].answersSorted[i];
							
							let answerStruc = vpGetStructure().questionsMap[id].answers[answerID];
	
							if(answerStruc.valueType){ 
							
								let valueType = answerStruc.valueType;
								let pattern = valueType.pattern;
								let formatType = valueType.valType;
								
								console.log(valueType);
	 
								if(formatType=="DATE"){
									
									const day = 86400000;
									let nbDays = Math.ceil(Math.random() * 400);
									let shift = nbDays*day;
									
									let format = valueType.format.toUpperCase();
									
									let newDate = moment().subtract(shift).format(format);
									console.log(newDate);
									vpSetResults(Qref+".A"+(i+1),newDate);
								}
								
								else if(valueType.valType=="NUMBER"){
									console.log("it is a number");
									vpSetResults(Qref+".A"+(i+1),Math.ceil(Math.random() * 20));
								}
								
								else if(pattern.length>0){
									console.log("test");
									vpSetResults(Qref+".A"+(i+1),new RandExp(pattern).gen());
								}
								
								

							}

							else{
								console.log(listOfText);
								vpSetResults(Qref+".A"+(i+1),listOfText[Math.floor(Math.random() * listOfText.length)]);

							}

							
						}
						
					}
					
				}
	
	
	const answerFillWithCom = function (question){
					
					let id = question.id;
					let Qref = question.ref;
					let nbOfAnswers = question.nbOfAnswers;
					let listOfText = question.listOfText;

					let listOfCom = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam orci odio, sollicitudin eu euismod eu, eleifend in magna. Pellentesque ac arcu vel lectus laoreet placerat.",
					"Fusce fermentum odio lacus, non pellentesque ex hendrerit volutpat. Etiam eget rutrum quam. Vestibulum quis metus dictum.",
					"Nulla efficitur, sapien vitae aliquet pellentesque, elit ipsum dictum tortor, aliquam ullamcorper diam neque sed eros. Donec.",
					"Cras interdum odio vel efficitur auctor. Cras pretium arcu et metus gravida, et pharetra turpis sodales. Duis."];
						
						if(jQuery("#questionDivEntireId"+id).hasClass("pluginSignatureArea")){
							vpSetResults(Qref,"data:image/png;base64,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");
						}
						
						if(vpGetResults(Qref).length==0){ 
								
								getChuck(Qref)
							
								
							}

							
				}
	
	
	const goDroid = function(question){
		
		console.log(question);

		if(jQuery("#questionDivEntireId"+question.id).is(":visible")){
			if(toCheckOnce.indexOf(question.type) in toCheckOnce){
				answerCheckOnce(question);
			}
			
			else if(toCheckMultiple.indexOf(question.type) in toCheckMultiple){
				 answerCheckMultiple(question);
			}
			
			else if(toFillWithText.indexOf(question.type) in toFillWithText){
				 answerFillWithText(question);
			}
			
			else if(toFillWithCom.indexOf(question.type) in toFillWithCom){
				 answerFillWithCom(question);
			}
			
			else if(toLookup.indexOf(question.type) in toLookup){
				 answerLookup(question);
			}
			
			else if(toCheckColumns.indexOf(question.type) in toCheckColumns){
				 answerCheckColumns(question);
			}
		}			
	}
	
	
	const answerRandomly = function(){
			
		structureKeys = Object.keys(structure);
		
		for(obj in structureKeys){
		//	if(structureKeys[obj].onPage){
				goDroid(structure[structureKeys[obj]]);
		//	}
			
		}
		
	}
	
    const randomNumber = function(a){
        return Math.floor(Math.random() * a);
    };

	const init = function(settings){
		
		if (typeof listOfText != 'undefined' && listOfText) {
			let listOfTextKeys = Object.keys(listOfText);
			
			for(let questions in listOfTextKeys){
				let currentList = listOfTextKeys[questions];
				
				if(vpFindQuestion(currentList)){
					let idQuestion = vpFindQuestion(currentList).id
					structure[idQuestion].listOfText = listOfText[listOfTextKeys];
				}
				
				

			}
		}
		else{
			let listOfText = {};
		}
			
					
	}

	return{
		Run: function(settings){init(settings);},
		Go: function(){answerRandomly();}
	}
})(jQuery, ksAPI);