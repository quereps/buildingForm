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
        this.name = "",
        this.questions = [];

        for(let qid in questionIdList){
            this.questions.push(structure[this.questionIdList[qid]]);
        }


        //let result = objArray.map(a => a.foo);

		this.getAData = function(prop){ // return a specific prop of the question object (label, identifier, Qref)
			let toReturn = [];
			/*
			for(questionId in this.questionIdList){
				let question = structure[this.questionIdList[questionId]];
				toReturn.push(question[prop]);
			}
			
            return presentData(toReturn);
             */

            for(let qobj in this.questions){
                toReturn.push(this.questions[qobj][prop]);
            }
            
            return presentData(toReturn);

        }
       
        
		if(jQuery("#resultBtn").length==0){
			menu.addResultButtons(this.buttons);
		}
        
        
        this.show = function(settings){
            jQuery("#"+this.id+" .content").html(this.getAData(settings));
        }
        
        console.log("newResult: ",this);
		return this;
    }
    

    let search = {};

    let menu = InterfaceModule.addMenu("search","Search","searchModule.Launch()");

    menu.buttons.push(buttonModule.New("page","searchModule.Launch()",["icon","search"],"Search", true));
    menu.addOption("researchForm",
        "<label>Identifier</label><input id='identifierInput' type='text' onkeyup='searchModule.update()'></input>"+
        "<label>Question Text</label><input id='questionTextInput' type='text' onkeyup='searchModule.update()'></input>"+
            "<label>Question Type:</label>"+
            "<select id='questiontype' onchange='searchModule.update()'>"+
            "<option value=''></option>"+
            "<option value='CHECKALL_NO_OTHER'>Check All</option>"+
            "<option value='HEADER'>Section Header</option>"+
            "<option value='MULTI_LINE'>Multiline</option>"+
            "<option value='PICK_ONE_WITH_OTHER'>Pick One + Other</option>"+
            "<option value='PICK_ONE_NO_OTHER'>Pick One</option>"+
            "<option value='SINGLE_LINE'>Single Line</option>"+
            "</select>"+
            "<label>Nb Answer options</label><input id='nbAnswers' type='number' onchange='searchModule.update()' onkeyup='searchModule.update()'></input>"+
            "<label>On Page #</label><input id='pageNb' type='number' onchange='searchModule.update()' onkeyup='searchModule.update()'></input>"
    );
    

    menu.labelBtn = "<button class='searchButton' onClick='searchModule.Refresh(\"current\",\"questionLabel\")'>Labels</button>";
    menu.bestRefBtn = "<button class='searchButton' onClick='searchModule.Refresh(\"current\",\"bestRef\")'>Ref</button>";
    menu.pipingBtn = "<button class='searchButton' onClick='searchModule.Refresh(\"current\",\"piping\")'>Piping</button>";
		
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
            console.log("creating results");
            result[current] = new newResult("interface",this.resultArray);
            result[current].show("bestRef");
        };
        
        this.criteria = {
            identifier:"",
            questiontype:"",
            questionText:"",
            pageNb:null,
            nbAnswers:0
        } 

        this.updateCriteria = function(){
            this.criteria.identifier = jQuery("#identifierInput").val();
            this.criteria.questionText = jQuery("#questionTextInput").val();
            this.criteria.questiontype = jQuery("#questiontype").val();
            this.criteria.nbAnswers = jQuery("#nbAnswers").val();
            this.criteria.pageNb = jQuery("#pageNb").val();
        }

        this.filter = function(){
            console.log("Filtering", this.criteria);
            this.resultArray = [];

            let initialList = vpGetStructure().questionsSorted;

            
            for(let id in initialList){

                let question = structure[initialList[id]];
                let canReturn = true;

                if(this.criteria.identifier.length>0){
                    if(question.identifier){
                        
                        let string = JSON.stringify(question.identifier);
                        if(string.indexOf(this.criteria.identifier)>0){
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


                if(this.criteria.questionText.length>0){

                    console.log("hiiii");

                    if(question.questionLabel){
                        
                        let string = JSON.stringify(question.questionLabel);
                        if(string.indexOf(this.criteria.questionText)>0){
                            console.log("hiiii3");
                            //this.resultArray.push(question.id);
                            console.log(question, "contain questionText");
                            
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

                if(this.criteria.pageNb){
                    
                    if(question.pageNum){
                        if(question.pageNum!=this.criteria.pageNb){
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


    
	return{
        Start:function(){search = new searchObj();},
        Launch:function(){menu.launch();},
        update:function(){search.update();},
        Refresh:function(obj,settings){result[obj].show(settings)},
	}
	
})(jQuery, ksAPI);