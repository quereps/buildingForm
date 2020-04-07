const workflowModule = (function ($, ksAPI) {

    let menu = InterfaceModule.addMenu("search","Search","searchModule.Launch()");
    menu.buttons.push(buttonModule.New("page","workflowModule.Launch()",["icon","workflow"], "WorkFlow Mapping", true);
    
        var getWorkflow = function(){
	
            var identifierList = Object.keys(vpGetIdentifiersMap());
            
            var sortie = "";
            
            for(var i in identifierList){
                
                sortie=sortie+"<br>"+identifierList[i]+"="+identifierList[i];
                
            }

            menu.content=sortie;
            menu.show();
            
        }

    
        return{
            Start:function(){menu.showButtons();},
            Launch:function(){getWorkflow();},
            update:function(){update()},
        }
        
    })(jQuery, ksAPI);
    
    
    
    
    
    
    
    
    
    
    
    
    