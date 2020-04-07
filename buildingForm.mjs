



jQuery.getScript("https://quereps.github.io/buildingForm/BuildingForm/randexp.js", function() {
   console.log("Randexp Script loaded but not necessarily executed.");
});


const getRefbyId = function(a){
	return (_.invert(jsApiConverter))["Q"+a];
}

// Create new link Element 
////var link = document.createElement('link');  
  
// set the attributes for link element 
 ////  link.rel = 'stylesheet';  

////link.type = 'text/css'; 

////link.href = 'https://quereps.github.io/buildingForm/BuildingForm/interface/icons.css';  

// Get HTML head element to append  
// link element to it  
////document.getElementsByTagName('HEAD')[0].appendChild(link);

       

let structure = {};
 
const getSWApi = function(type,before,nb,after){
/*people/1/ or planets/3/ or starships/9/ species vehicles/14/*/ 
	let SWArray = [];

	var promise = new Promise(function(resolve, reject){
		
		let responses = [];
		
		after ? after = after : after = "";
		let last=false;
		for(let i=0;i<=nb;i++){
			fetch('https://swapi.co/api/'+type+'/'+Math.floor(Math.random() * 40))
				.then(function(response) {
					responses.push(response);
					if (!response.ok) {
						return
					}
					return response.json()
				}).then(function (data){

					if(data && data.name){
						SWArray.push(before+" "+data.name+" "+after);
						
					}
				}).catch(function(error) {
					console.log(error);
				});
				
		}
		if (responses.length==nb) {
			console.log("ok");
							resolve(SWArray);
						  }

	})
	
	promise.then(function(result){
		return result;	
	}); 
	
	

		return SWArray;
	} 

function selectText(containerid) {
    if (document.selection) { // IE
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select();
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
}




	
	const getChuck = function(a){

	let SWArray = [];

			fetch('https://www.randomtext.me/api/lorem/p-1/10-25')
			
				.then(function(response) {
					if (!response.ok) {
						return
					}
					return response.json()
				}).then(function (data){
						let toreturn = data.text_out.split("<p>")[1].split("</p>")[0];
						vpSetResults(a,toreturn);
				}).catch(function(error) {
					console.log(error);
				});

	}
	


const fromObjToHTML = function(obj){
	
	if(obj){
	
	let html = obj.start;
	
	for(let i in obj.rows){
		html=html+obj.rows[i];
	}
	
	html=html+obj.end;
	
	return html;
	}
	
}



const answerObj = function(qid,aid,ref){

		let structure = vpGetStructure().questionsMap[qid].answers[aid];

		this.qid = qid;
		this.aid = aid;
		this.label = structure.name.split("<field value")[0];
		this.type  = structure.type;
		this.ref = ref;
		this.result = vpGetTextResults(ref);
		this.piping="{"+ref+"}";
		
		return this;
	}



const tableObj = function(name){
	
	this.name = name;
	this.destination = "#interface .content";

	this.outputObj = {start:"<table id='table"+name+"' class='customTable'>",rows:{},end: "</table>"};
	this.outputTextObj = {start:"<table id='table"+name+"' class='customTable'>",rows:{},end: "</table>"};
	
	this.data = {};
	this.rows = {};
	
	this.adddata = function(qid,aid, ref){
		this.data[aid] = new answerObj(qid,aid,ref);
		
	}
	

	this.createRows = function(nbcol){
		
		this.outputObj.rows = {};
		this.outputTextObj.rows = {};
		
		let cells = [];
		let cellstxt = [];

		for(let i in this.data){
			
			let html="<th id='"+this.data[i].aid+"'>"+this.data[i].label+"</th><td>"+this.data[i].result+"</td>";
			let htmltxt="<th>"+this.data[i].label+"</th><td>"+this.data[i].piping+"</td>";
			cells.push(html);
			cellstxt.push(htmltxt);
		}
		
		let rownb=0;
		for(let i in cells){
			this.outputObj.rows[rownb] = "<tr>"+cells[i]+"</tr>";
			this.outputTextObj.rows[rownb] = "<tr>"+cellstxt[i]+"</tr>";
			rownb++;
		}
		
		

		this.updateHTML()
	};
	
	
	this.addtxtLine= function(question,num,code){
		if(!this.outputObj.txtquestions[question]){
			this.addquestion(question);
		}
		
		this.outputObj.txtquestions[question][num]=code;
		this.updateHTML()
	};
	

	this.removedata = function(id){
		let toremove=id.id.split("remove")[1];
		
		console.log(toremove);
		delete this.data[toremove];

		console.log(this);
		
		this.apply();
	};
	
	this.outputHTML = "";
	this.outputtxtHTML = "";
	
	
	this.addOptions = function(){
		let list = jQuery("#tableOutput tr");
		jQuery("td.optionsTable").remove();
		for(let i=0;i<list.length;i++){
			
			console.log(list[i]);
			let id = jQuery(list[i]).find("th")[0].id;
			jQuery(list[i]).append("<td class='optionsTable'><div id='remove"+id+"' onclick='buildingFormsModule.createDMTableRemove(this)' class='icon remove'></div></td>");
		}
	}
	
	this.updateHTML = function(){

		this.outputHTML=fromObjToHTML(this.outputObj);
		this.outputtxtHTML=fromObjToHTML(this.outputTextObj);
		
	}
	
	this.getHTML = function(){return this.outputHTML;}
	this.gettxtHTML = function(){return this.outputtxtHTML}
	
	this.updateHTML();
	
	this.apply = function(){
		
		console.log("apppplyyyy");
		this.createRows();

		jQuery(this.destination+" #tableOutput").remove();
		jQuery(this.destination+" #tableOutputText").remove();
		
		jQuery(this.destination).append("<div id='tableOutput'>"+this.getHTML()+"</div><div id='tableOutputText'></div>");
		jQuery(this.destination+" #tableOutputText").text(this.gettxtHTML());
		this.addOptions();
	}

	return this;
}

const buildingFormsModule = (function ($, ksAPI) {





var tableToText = function(a){
	
	var result="";
	
	for(var i in a){
		
		result=result+"<br>"+a[i];
		
	}
	
	return result;

}






var questionTypeRef = {
1:"MULTI_LINE",
2:"PICK_ONE_NO_OTHER",
3:"SINGLE_LINE",
4:"DROPDOWN",
5:"HEADER",
6:"CHECKALL_NO_OTHER",
7:"LISTBOX",
8:"UPLOAD_FILE"
}









var showIdentifiers = function(){
	
	let questionList = getQuestionsOnPage();
	
	for(var i in questionList){
		
		var bRef = getRefbyId(questionList[i].questionId);
		
		
		
		var idRef = "";
					if(vpGetIdentifierByReference(bRef)){
						idRef = vpGetIdentifierByReference(bRef);
					}
		
		var listOfElements = vpGetElements(bRef);

		 
		jQuery("#buildtools"+questionList[i].questionId).append("<div onclick='selectText(\"displayIdentifiers"+questionList[i].questionId+"\")' id='displayIdentifiers"+questionList[i].questionId+"' class='displayIdentifiers icon'>"+idRef+"</div><div   onclick='selectText(\"displayQID"+questionList[i].questionId+"\")' id='displayQID"+questionList[i].questionId+"' class='displayQID icon'>"+bRef+"</div>");

		
	}
	
};




const getQuestionsOnPage = function(){
	
	let questionList = vpGetStructure().questionsByVP[currentPosition];
	let result = [];
	
	for(let i in questionList){
		result.push(vpGetStructure().questionsMap[questionList[i]]);
	}
	

	return result;
	
}


const createToolBar = function(){
	
	jQuery("body").prepend("<div class='buildtools' id='buildtoolsMain'></div>");

	let questionList = getQuestionsOnPage();
		
	for(let i in questionList){
		if(jQuery("#questionDivEntireId"+questionList[i].questionId+" .fsQuestion").length>0){
			jQuery("#questionDivEntireId"+questionList[i].questionId+" .fsQuestion").prepend("<div class='buildtools' id='buildtools"+questionList[i].questionId+"'></div> ");
			
		}
		else if(jQuery("#QuestionHeaderTableId"+questionList[i].questionId)){

			jQuery("#QuestionHeaderTableId"+questionList[i].questionId).prepend("<div class='buildtools' id='buildtools"+questionList[i].questionId+"'></div> ");
		}
	}
	
};
 
 
 
const hideAlwaysModule  = (function ($, ksAPI) {
	
	let toHide = {};
	
	const addbutton = function(a){ //Special module to create
		
			if(vpGetQuestionByQuestionId(a) && vpGetQuestionByQuestionId(a).length>0){
				let theprefix = vpGetQuestionByQuestionId(a).prefix;

				console.log(theprefix);

				let htmltoadd = "<div id='addHide"+a+"' class='hideAlways icon' onclick='buildingFormsModule.addtoHide(this)'>Hide</div>";
				jQuery("#buildtools"+a).append(htmltoadd);
			}
		
	};
	
	const addtoHide = function(a){ 
		
		let id=a.id.split("addHide")[1];
		let theprefix = vpGetQuestionByQuestionId(id).prefix;
		
		vpHide(theprefix,"true");
		
		toHide[id]=theprefix;
		let temp = "";
		for(let i in toHide){
			if(temp==""){temp = toHide[i];}
			else{temp = temp+","+toHide[i];}
			
		}
		sortie = "Hide no clear "+temp+" if always";

		InterfaceModule.showInterface("#main_frame",sortie);
	};
	
	const init = function(){
		
		let questionList = getQuestionsOnPage();
	
		for(var i in questionList){
			
			addbutton(questionList[i].questionId);
			
		}
		
	}
	

	return {
		Start:function(){init()},
		addtoHide:function(a){addtoHide(a)}
	}
	
})(jQuery, ksAPI);
 
 
 

	
 
 
 
 /*const initTextToUse = function(){
	 
	 if(listOfText){
		 let finalTextToUse;
		 
		 let groups = Object.keys(listOfText);
		 
		 for(let items in groups){
			 finalTextToUse[groups[items]] = listOfText[groups[items]];
		 }
		 
		 console.log(finalTextToUse);
		 
	 }

 }*/




 
const init = function(){


   /* $("head").append("<link>");
       var css = $("head").children(":last");
       css.attr({
         rel:  "stylesheet",
         type: "text/css",
         href: "https://quereps.github.io/buildingForm/BuildingForm/interface/icons.css"
      });*/
	
	  //import { hello } from './BuildingForm/testImport.js'; // Or it could be simply `hello.js`
	 

	  //(async () => {
		  // import module for side effects
	//	  await import('./BuildingForm/testImport.js').then(hello('world'));
		  
	//  })();


	jQuery.getScript("https://quereps.github.io/buildingForm/BuildingForm/interface/interface.js", function() {
        console.log("showResult.js Script loaded but not necessarily executed.");
	   
	   InterfaceModule.init();
	});
	
	jQuery.getScript("https://quereps.github.io/buildingForm/BuildingForm/buttons.js", function() {
        console.log("buttons.js Script loaded but not necessarily executed.");
	   
	   //buttonModule.NewType("getScoreFormula","buildingFormsModule.getScoreFormula()","getScoreFormula");
	   //buttonModule.New("getScoreFormula","page","getScoreFormula");

	   let getScoreFormulaBtn = buttonModule.New("page","buildingFormsModule.getScoreFormula()",["icon","getScoreFormula"]);
	   getScoreFormulaBtn.displayButton();
	   
	   jQuery.getScript("https://quereps.github.io/buildingForm/BuildingForm/createDMTable.js", function() {
        console.log("createDMTable.js Script loaded but not necessarily executed.");
	   
	        createDMTable.Start();
	   
        });
    
        jQuery.getScript("https://quereps.github.io/buildingForm/BuildingForm/summaryTable.js", function() {
            console.log("summaryTable.js Script loaded but not necessarily executed.");
            summaryTableModule.Start();
		});
		
		jQuery.getScript("https://quereps.github.io/buildingForm/BuildingForm/interface/firstOfPage/firstOfPage.js", function() {
            console.log("firstOfPage.js Script loaded but not necessarily executed.");
            firstOfPageModule.Start();
		});
		
		jQuery.getScript("https://quereps.github.io/buildingForm/BuildingForm/interface/workflow/workflow.js", function() {
            console.log("workflow.js Script loaded but not necessarily executed.");
            workflowModule.Start();
		});
		

		jQuery.getScript("https://quereps.github.io/buildingForm/BuildingForm/interface/score/score.js", function() {
            console.log("score.js Script loaded but not necessarily executed.");
            scoreModule.Start();
        });
	   
		jQuery.getScript("https://quereps.github.io/buildingForm/BuildingForm/search/search.js", function() {
			console.log("searchModule Script loaded but not necessarily executed.");
			searchModule.Start();

			//jQuery.getScript("https://quereps.github.io/buildingForm/BuildingForm/search/searchResult.js", function() {
			//	console.log("searchResult Script loaded but not necessarily executed.");
			//	searchResultModule.Start();
			//});
	 	});
	 

	});
	
	
	
	
	createToolBar();
	$("#buildtoolsMain" ).append("<div title='Answer Randomly' class='icon random' onclick='buildingFormsModule.Random()'></div>");


	
	jQuery.getScript("https://quereps.github.io/buildingForm/BuildingForm/structure.js", function() {
        console.log("structue.js Script loaded but not necessarily executed.");
		structure = getStructure();
    });
    
    
    
     jQuery("html").append("<div id='notification'></div>");

    

	jQuery.getScript("https://quereps.github.io/buildingForm/BuildingForm/answerRandomly.js", function() {
	   notif("answerRandomly.js Script loaded but not necessarily executed.");
	   
		if (typeof listOfText != 'undefined' && listOfText) {
			answerRandomlyModule.Run(listOfText);
		}
		else{
			answerRandomlyModule.Run();
		}
	   
	});

	showIdentifiers();
	hideAlwaysModule.Start(); 
	
}


return {
	Run: function(){init()},
	CreateDMTableRun: function(a){createDMTable.Run(a)},
	createDMTableRemove: function(a){createDMTable.Remove(a)},
	Random: function(){answerRandomlyModule.Go()},
	workflow: function(){getWorkflow()},
	addtoHide: function(a){hideAlwaysModule.addtoHide(a)},
	sameKind: function(a){summaryTableModule.sameKind(a)},
	sumtable: function(a){summaryTableModule.sumtable(a)},
	getFirstQuestionOfPages: function(){getFirstQuestionOfPages()},
	tableToText: function(a){tableToText(a)}
}

})(jQuery, ksAPI);


(function($, ksAPI){ksAPI.runCustomCode(function (){ 
	
	if (!vpIsRbr()){
            buildingFormsModule.Run();
    }
	
	
	
	;})
;})(jQuery, ksAPI);





const notif = function(a){

    console.log(a);
    let nb = jQuery("#notification div").length;
    jQuery("#notification").append("<div class='notif' id='notif"+(nb+1)+"'>"+a+"</div>");
    setTimeout(function(){ 
        jQuery("#notif"+(nb+1)).remove();
     }, 3000);
}

jQuery("head").append("<style>.hide{display:none !important;}"+
".sum.icon{background-image:url(https://quereps.github.io/buildingForm/images/summary.png); }"+
".getScoreFormula.icon{background-image:url(https://quereps.github.io/buildingForm/images/grade.png);}"+
".icon.workflow{background-image:url(https://quereps.github.io/buildingForm/images/workflow.png);}"+
".icon.pages{background-image:url(https://quereps.github.io/buildingForm/images/first.png);}"+
".menu .icon {background-repeat: no-repeat;background-size: 30px;background-position: 10px 50%;text-align: left;padding-left: 50px;width: 150px !important;}"+
".buildtools .icon label {display: none;}"+
"#interface .result {margin: 30px auto;max-width: 1000px;width: 100%; }div.remove{width:20px;height:20px;background:url('https://app.keysurvey.com/User/28/769928/media/69/136869.png');display:inline-block;background-repeat:no-repeat;background-size:15px;background-position:50%;}.displayIdentifiers.icon:empty {display: none;}.aDivEntireQuestion {     position:relative; }"+
".icon.addHTMLTable {background-image: url(https://app.form.com/User/08/816008/media/77/196677.png) !important;}     div#tableOutputText {     background: white;     padding: 10px;     margin: 20px;     border: 1px dashed #6969c6;     border-radius: 15px; }  .buildtools .icon {     background-size: 20px !important;     display:inline-block;     height:25px;     width:fit-content;     min-width:30px;     text-align:center;     border-right:1px solid;     margin:0;     padding:0 5px;     font-size:14px;     vertical-align: top;     background-repeat:no-repeat !important;     background-position:50% !important;     line-height:25px !important; }  .buildtools{     height: 25px;     width: fit-content;     min-width: 10px;     position: absolute;     border:1px solid black !important;     right: 0; }  .displayIdentifiers.icon {     background:#d4d6ec; }  .displayQID.icon {     background:#f5d9d9; }  div.icon.random{     background: url(https://app.form.com/User/08/816008/media/83/196683.png);     background-size: contain; }  #buildtoolsMain{     z-index: 999999 !important;     top: 0;     right: 0;     position: absolute;     background: white; }"+

"#interface {grid-template-columns: 200px auto 200px;display:grid;height: 90vh;z-index: 99999;position: fixed;background: white;border: 1px solid black;text-align: center;width: 90%;margin: 5vh 5%;}.menu {grid-column-start: 1;grid-column-end: 2;grid-row-start: 1;grid-row-end: 1;border-right:1px solid #666;max-width:200px;}.option {grid-column-start: 3;grid-column-end: 4;grid-row-start: 1;grid-row-end: 1;border-right:1px solid #666;max-width:200px;}.content {grid-column-start: 2;grid-column-end: 3;grid-row-start: 1;grid-row-end: 1;}.close {line-height: 30px;font-weight: bold;position: absolute;width: 70px;height: 70px;top: 0;right: 0;background-image: url(https://app.keysurvey.com/User/28/769928/media/69/136869.png);background-repeat: no-repeat;background-size: 30px;background-position: 50%;}.sameKind.icon {     background: url(https://app.form.com/User/55/578055/media/89/197189.png) }  .sumtable.icon {     background: url(https://app.form.com/User/55/578055/media/91/197191.png) } "+
".icon.search{background-image: url(https://quereps.github.io/buildingForm/images/search.png)}  /* Start - Change form design for the tool */ .H2,.H22 {     width: calc(100% - 130px) !important;     display: block; }  /* End - Change form design for the tool */#notification {position: fixed;width: calc(100% - 60px);text-align: center;background: rgba(255,255,255,0.75);padding: 10px;border: 1px solid #999;bottom: 0;}#notification:empty{display:none;}html {position: relative;}"
+
".options{padding-top:70px;border-left:1px solid}.options div{padding:20px 0;width:100%;border-bottom: 1px solid #333}button.searchButton {border:none;font-size:16px;margin:5pxborder:2px solid;}"
+
".menu div {width: 100%;height: 40px;line-height: 40px;border-bottom: 1px solid grey;}"+
"table.resultTable {margin: 20px auto !important;background:#dcf0f5;border-radius:8px}"+
"table.resultTable tr td{border-bottom:2px solid black !important;line-height:40px;min-width:300px;}"+
"div#researchForm label{display:block;margin:10px 0 5px 0;font-weight:bold;}"+
"div#researchForm input{width: calc(90% - 10px);line-height:20px;height: 25px !important;border-radius:8px;border:1px solid grey;padding: 0 5px;}"+
"div#researchForm select{width: 90%;line-height:20px;height: 25px !important;border-radius:8px;border:1px solid grey;}"+
"</style>");


