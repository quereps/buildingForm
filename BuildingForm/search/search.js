const searchModule = (function ($, ksAPI) {

   

    const searchObj = function(){

        this.button = buttonModule.New("page","searchModule.Launch()",["icon","search"]);

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
        InterfaceModule.createInterface("searchResult",result);
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
       console.log("toto");
       InterfaceModule.create();
    }


	const init = function(){

        notif("Search Init");
        let search = new searchObj();

        //buttonModule.NewType("search","searchModule.Launch()","search");
        //buttonModule.New("search","page","search");

        //buttonModule.New("page",searchModule.Launch(),["icon","search"]);
        search.button.displayButton();
    }
    
	return{
        Start:function(){init()},
        Launch:function(){launch()}
	}
	
})(jQuery, ksAPI);