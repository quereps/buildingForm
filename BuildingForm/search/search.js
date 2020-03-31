const searchModule = (function ($, ksAPI) {

    //let search = {};

    let menu = InterfaceModule.addMenu("search","Search","searchModule.Launch()");

    menu.button = buttonModule.New("page","searchModule.Launch()",["icon","search"]);
    menu.options.push(menu.addOption("researchForm",
        "<label>Identifier</label><input id='identifierInput' type='text' onkeyup='searchModule.update()'></input>"+
            "<label>Question Type:</label>"+
            "<select id='questiontype' onchange='searchModule.update()'><option value='CHECKALL_NO_OTHER'>CHECKALL_NO_OTHER</option>"+
            "<option value='HEADER'>HEADER</option>"+
            "<option value='MULTI_LINE'>MULTI_LINE</option>"+
            "<option value='PICK_ONE_WITH_OTHER'>PICK_ONE_WITH_OTHER</option>"+
            "<option value='PICK_ONE_NO_OTHER'>PICK_ONE_NO_OTHER</option>"+
            "<option value='SINGLE_LINE'>SINGLE_LINE</option></select>"
    ));

    //InterfaceModule.addoptions("researchForm",search.form);


    const searchObj = function(){

        this.resultArray = vpGetStructure().questionsSorted;



        this.update = function(){
            this.updateCriteria();
            this.filter();
        }
        
        this.show = function(){searchResultModule.createResult("interface",this.resultArray)};
        
        this.criteria = {
            identifier:"",
            questiontype:""
        } 

        this.updateCriteria = function(){
            this.criteria.identifier = jQuery("#identifierInput").val();
            this.criteria.questiontype = jQuery("#questiontype").val();
        }

        this.filter = function(){
            this.resultArray = [];

            let initialList = vpGetStructure().questionsSorted;

            for(let id in initialList){
                let question = structure[initialList[id]];

                if(question.identifier){
                    let string = JSON.stringify(question.identifier);
                    if(string.indexOf(this.criteria.identifier)>0){
                        this.resultArray.push(question.id);
                    }

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

    const launch = function(){
       notif("launching Search Module");
       InterfaceModule.show("search");
       
    }


	const init = function(){
        notif("Search Init");
        search = new searchObj();
        search.button.displayButton();
    }

    const update = function(settings){
        search.update();
    }
    
	return{
        Start:function(){init()},
        Launch:function(){launch()},
        update:function(){update()},
        //getQIdentifierTextContain:function(a){getQIdentifierTextContain(a)},
        //Create:function(settings){createSearchTool(settings)}
	}
	
})(jQuery, ksAPI);