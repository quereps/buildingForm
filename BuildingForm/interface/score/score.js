



const scoreModule = (function ($, ksAPI) {

    //let button = {};
    
        let menu = InterfaceModule.addMenu("score","score","scoreModule.Launch()");
        menu.buttons.push(buttonModule.New("page","scoreModule.Launch()",["icon","getScoreFormula"],"Score", true));
    
        const getScoreFormula = function(){ //USE TABLE SOME TIME

            let pagesStructure = vpGetStructure().questionsByVP;
            
            let result = "";
            
            for(let page in pagesStructure){
        
                let label = vpGetStructure().questionsMap[pagesStructure[page][0]].name;
                let firstNum = getRefbyId(pagesStructure[page][0]).split("Q")[1];
                let lastNum = getRefbyId(pagesStructure[page][pagesStructure[page].length-1]).split("Q")[1];
                
                result = result+label+"     -       "+"SCORE("+firstNum+","+lastNum+")/MAX_SCORE("+firstNum+","+lastNum+")*100<br>"
                console.log(label);
            }
        
        menu.content=result;
        menu.show();
        
        }

    
        const init = function(){
            notif("init FirstOf Module");
            menu.init();
        }
        
        const launch = function(){
            notif("launch FirstOf Module");
            getScoreFormula();
        }
    
    
        return{
            Start:function(){init()},
            Launch:function(){launch()},
            update:function(){update()},
        }
        
    })(jQuery, ksAPI);
    
    
    
    
    
    
    
    
    
    
    
    
    