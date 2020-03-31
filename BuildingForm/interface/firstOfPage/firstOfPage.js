const firstOfPageModule = (function ($, ksAPI) {

let button = {};

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
        InterfaceModule.create();
        //InterfaceModule.addoptions("researchForm",search.form);
    
    }

    const init = function(){
        notif("init FirstOf Module");
        //InterfaceModule.addMenu("firstOfPage","firstOfPage","firstOfPageModule.Launch()");
        button = buttonModule.New("page","firstOfPageModule.Launch()",["icon","pages"]);
        button.displayButton();
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












