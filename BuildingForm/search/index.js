const searchModule = (function ($, ksAPI) {
    
    const getQIdentifierTextContain = function(a){
	
        let result=[];
        
    
        for(var i in structure){
    
            let string = JSON.stringify(structure[i].questionLabel);
            
            if(string.indexOf(a)>0){
                result.push(structure[i]);
            }
            
            
        }
        
        result.sort();
        
        showResultModule.showInterface("searchResult",result);
        
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

	const init = function(){

	}

		
	return{
		Start:function(){init()}
	}
	
	
})(jQuery, ksAPI);