const searchModule = (function ($, ksAPI) {

    let result = {};

    const presentData = function(dataArray){
		
		let toReturn = "<table style='margin:auto;' class='resultTable'>";
		
		for(let i in dataArray){
			toReturn = toReturn + "<tr><td>"+dataArray[i]+"</td></tr>"
		}

		toReturn = toReturn + "</table>";

		return toReturn;
	}


    const newResult = function(idTarget, questionIdArray){

		this.id = idTarget;
        this.questionIdList = questionIdArray;
        
		this.getAData = function(prop){ // return a specific prop of the question object (label, identifier, Qref)
			let toReturn = [];
			
			for(questionId in this.questionIdList){
				let question = structure[this.questionIdList[questionId]];
				toReturn.push(question[prop]);
			}
			
			return presentData(toReturn);
        }
        
		if(jQuery("#resultBtn").length==0){
			menu.addResultButtons(this.buttons);
		}
        
        
        this.show = function(settings){
            jQuery("#"+this.id+" .content").html(this.getAData(settings));
        }
		
		return this;
    }
    

    let search = {};

    let menu = InterfaceModule.addMenu("search","Search","searchModule.Launch()");

    menu.button = buttonModule.New("page","searchModule.Launch()",["icon","search"]);
    menu.addOption("researchForm",
        "<label>Identifier</label><input id='identifierInput' type='text' onkeyup='searchModule.update()'></input>"+
            "<label>Question Type:</label>"+
            "<select id='questiontype' onchange='searchModule.update()'>"+
            "<option value=''></option>"+
            "<option value='CHECKALL_NO_OTHER'>CHECKALL_NO_OTHER</option>"+
            "<option value='HEADER'>HEADER</option>"+
            "<option value='MULTI_LINE'>MULTI_LINE</option>"+
            "<option value='PICK_ONE_WITH_OTHER'>PICK_ONE_WITH_OTHER</option>"+
            "<option value='PICK_ONE_NO_OTHER'>PICK_ONE_NO_OTHER</option>"+
            "<option value='SINGLE_LINE'>SINGLE_LINE</option>"+
            "</select>"+
            "<label>Nb Answer options</label><input id='nbAnswers' type='number' onchange='searchModule.update()' onkeyup='searchModule.update()'></input>"
    );
    

    menu.labelBtn = "<button class='searchButton' onClick='searchModule.Refresh(\"questionLabel\")'>Labels</button>";
    menu.bestRefBtn = "<button class='searchButton' onClick='searchModule.Refresh(\"bestRef\")'>Ref</button>";
    menu.pipingBtn = "<button class='searchButton' onClick='searchModule.Refresh(\"piping\")'>Piping</button>";
		
    menu.resultButtons = [menu.labelBtn,menu.bestRefBtn,menu.pipingBtn];

    menu.addResultButtons = function(){
        let buttonsToAdd = "";
        
        for(but in menu.resultButtons){
            console.log(menu.resultButtons[but]);
            buttonsToAdd = buttonsToAdd + menu.resultButtons[but];
        }
        menu.addOption("resultBtn", buttonsToAdd);
    }

    menu.addResultButtons();
    

    menu.init();

    const searchObj = function(){

        this.resultArray = vpGetStructure().questionsSorted;



        this.update = function(){
            this.updateCriteria();
            this.filter();
        }
        
        this.show = function(){
            //menu.addResultButtons
            console.log("creating results");
            result = new newResult("interface",this.resultArray);
            result.show("bestRef");
        };
        
        this.criteria = {
            identifier:"",
            questiontype:"",
            nbAnswers:0
        } 

        this.updateCriteria = function(){
            this.criteria.identifier = jQuery("#identifierInput").val();
            this.criteria.questiontype = jQuery("#questiontype").val();
            this.criteria.nbAnswers = jQuery("#nbAnswers").val();
        }

        this.filter = function(){
            console.log("Filtering", this.criteria);
            this.resultArray = [];

            let initialList = vpGetStructure().questionsSorted;

            
            for(let id in initialList){

                let question = structure[initialList[id]];
                console.log(question);
                let canReturn = true;

                if(this.criteria.identifier.length>0){

                    console.log("hiiii");

                    if(question.identifier){
                        
                        let string = JSON.stringify(question.identifier);
                        console.log("string", string);
                        console.log("index", string.indexOf(this.criteria.identifier));
                        if(string.indexOf(this.criteria.identifier)>0){
                            console.log("hiiii3");
                            //this.resultArray.push(question.id);
                            console.log(question, "contain identifier");
                            
                        }
                        else{
                            canReturn=false;
                        }
                    }
                    else{
                        canReturn=false;
                    }
                }

                if(this.criteria.questiontype.length>0){
                    console.log("hiiii4");
                    if(question.type){
                        if(question.type!=this.criteria.questiontype){
                            console.log(question, "not in criteria type");
                            canReturn=false;
                        }
                    }
                }


                if(this.criteria.nbAnswers>0){
                    
                    if(question.type){
                        if(question.nbOfAnswers!=this.criteria.nbAnswers){
                            console.log("nb diff");
                            canReturn=false;
                        }
                    }
                }


                console.log(canReturn);

                if(canReturn==true){
                    console.log("add", question.id);
                    this.resultArray.push(question.id);
                }
                

            }
            
            this.show();
        }

        return this;
    }


  /*  const identifier = function(a){

        console.log(a);
        let result=[];
        for(var i in structure){
            let string = JSON.stringify(structure[i].questionLabel);
            console.log("string: "+string);
            if(string && string.indexOf(a)>0){
                result.push(structure[i]);
            }
        }
        result.sort();
        console.log(result);
        //searchResultModule.createResult("interface",result);
    }

    const getQIdentifierThatContain = function(a,b){
        var result=[];
        var listOfidentifiers = Object.keys(vpGetIdentifiersMap());
        
        for(var i in listOfidentifiers){
            var string = JSON.stringify(listOfidentifiers[i]);

            if(b){
                if(string.indexOf(a)>0 && string.indexOf(b)>0){
                    result.push(listOfidentifiers[i]);
                }
            }
            else{
                if(string.indexOf(a)>0){
                    result.push(listOfidentifiers[i]);
                }
            }
        }

        result.sort();
        console.log(result);
        tableToConsole(result);
    }


    const sameKind = function(a){
	
		let id = a.id.split("sameKind")[1];
		let type = vpGetStructure().questionsMap[id].type;
		let answers = [];
		
		let answersList = vpGetStructure().questionsMap[id].answers;
		for(let i in answersList){
			answers.push(answersList[i].name);
		}

		buildingFormsModule.showResult("#main_frame",buildingFormsModule.tableToText(getSimilarQuestion(type,answers,"ref")));
	
	}*/

    
	return{
        Start:function(){search = new searchObj();},
        Launch:function(){menu.launch();},
        update:function(){search.update();},
        Refresh:function(settings){result.show(settings)},
	}
	
})(jQuery, ksAPI);