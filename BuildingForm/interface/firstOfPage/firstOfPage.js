const firstOfPageModule = (function ($, ksAPI) {

//let button = {};

    let menu = InterfaceModule.addMenu("search","Search","searchModule.Launch()");
    menu.buttons.push(buttonModule.New("page","firstOfPageModule.Launch()",["icon","page"],"Page Selector", true));

    var getFirstQuestionOfPages = function(){
	
        var firstpageList = [];
        var pages = vpGetStructure().questionsByVP;

        for (var item in pages){

            var firstQuestionID = pages[item][0];
            var questionName = vpGetStructure().questionsMap[pages[item][0]].name;
            
            var questionRef = getRefbyId(firstQuestionID);
            
            if(vpGetIdentifierByReference(questionRef)){
                            questionRef = vpGetIdentifierByReference(questionRef);
                        }
            
            firstpageList=firstpageList+"<br>"+questionRef+" "+questionName;
            
        }
    
        //InterfaceModule.showInterface("#main_frame",firstpageList);
        menu.content=firstpageList;
        menu.show();
        //InterfaceModule.addoptions("researchForm",search.form);
    
    }

    const init = function(){
        notif("init FirstOf Module");
        //InterfaceModule.addMenu("firstOfPage","firstOfPage","firstOfPageModule.Launch()");
        //button = buttonModule.New("page","firstOfPageModule.Launch()",["icon","pages"]);
        menu.init();
    }
    
    const launch = function(){
        notif("launch FirstOf Module");
        getFirstQuestionOfPages();
    }


	return{
        Start:function(){init()},
        Launch:function(){launch()},
        update:function(){update()},
	}
	
})(jQuery, ksAPI);












