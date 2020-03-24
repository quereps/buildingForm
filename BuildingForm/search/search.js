const searchModule = (function ($, ksAPI) {

    let search = {};


    const searchObj = function(){
        this.button = buttonModule.New("page","searchModule.Launch()",["icon","search"]);
        this.form = "<label>Identifier</label><input id='identifierInput' type='text' onkeyup='searchModule.getQIdentifierTextContain(this.value)'></input>";

        return this;
    }


    
    const getQIdentifierTextContain = function(a){
        let result=[];
        for(var i in structure){
            let string = JSON.stringify(structure[i].questionLabel);
            if(string.indexOf(a)>0){
                result.push(structure[i]);
            }
        }
        result.sort();
        console.log(result);
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
       InterfaceModule.addcontent(search.form);
    }


	const init = function(){
        notif("Search Init");
        search = new searchObj();
        search.button.displayButton();
    }
    
	return{
        Start:function(){init()},
        Launch:function(){launch()},
        getQIdentifierTextContain:function(a){getQIdentifierTextContain(a)},
	}
	
})(jQuery, ksAPI);