const searchModule = (function ($, ksAPI) {

    let search = {};


    const searchObj = function(){
        this.button = buttonModule.New("page","searchModule.Launch()",["icon","search"]);
        this.form = 
            "<label>Identifier</label><input id='identifierInput' type='text' onkeyup='searchModule.identifier(this.value)'></input>"+
            "<label>Question Type:</label>"+
            "<select onchange='searchModule.getQIdentifierTextContain()'><option value='CHECKALL_NO_OTHER'>CHECKALL_NO_OTHER</option>"+
            "<option value='HEADER'>HEADER</option>"+
            "<option value='MULTI_LINE'>MULTI_LINE</option>"+
            "<option value='PICK_ONE_WITH_OTHER'>PICK_ONE_WITH_OTHER</option>"+
            "<option value='PICK_ONE_NO_OTHER'>PICK_ONE_NO_OTHER</option>"+
            "<option value='SINGLE_LINE'>SINGLE_LINE</option></select>";
        
        this.resultArray = vpGetStructure().questionsSorted;
        
        this.show = function(){searchResultModule.createResult("interface",this.resultArray)};
        
        this.filter = function(func,array){
            this.resultArray = func(array);
        }

        return this;
    }

    /*const searchTool = function(){
        
        this.resultArray = vpGetStructure().questionsSorted;

        this.filter = function(func,array){
            this.resultArray = func(array);
        }

        this.show = function(){searchResultModule.createResult("interface",this.resultArray)};

        return this;
    }*/

    const identifier = function(a){

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
	
	}

    const launch = function(){
       notif("launching Search Module");
       InterfaceModule.create();
       InterfaceModule.addoptions("researchForm",search.form);
    }


	const init = function(){
        notif("Search Init");
        search = new searchObj();
        search.button.displayButton();
    }

    const createSearchTool = function(settings){
        let thesearchTool = new searchTool(settings);
        thesearchTool.show();
    }
    
	return{
        Start:function(){init()},
        Launch:function(){launch()},
        //getQIdentifierTextContain:function(a){getQIdentifierTextContain(a)},
        //Create:function(settings){createSearchTool(settings)}
	}
	
})(jQuery, ksAPI);