jQuery.getScript("https://quereps.github.io/buildingForm/BuildingForm/randexp.js", function() {
   console.log("Randexp Script loaded but not necessarily executed.");
});


// Create new link Element 
var link = document.createElement('link');  
  
// set the attributes for link element 
   link.rel = 'stylesheet';  

link.type = 'text/css'; 

link.href = 'https://quereps.github.io/buildingForm/BuildingForm/interface/icons.css';  

// Get HTML head element to append  
// link element to it  
document.getElementsByTagName('HEAD')[0].appendChild(link);

var getQIdentifierTextContain = function(a){
	
	var result=[];
	

	for(var i in structure){

		var string = JSON.stringify(structure[i].questionLabel);
		
		if(string.indexOf(a)>0){
			result.push(structure[i]);
		}
		
		
	}
	
	result.sort();
	
	showResultModule.showInterface("searchResult",result);
	
}



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

const randomNumber = function(a){
	return Math.floor(Math.random() * a);
};


	
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
	


var events = {
  events: {},
  on: function (eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },
  off: function(eventName, fn) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      };
    }
  },
  emit: function (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function(fn) {
        fn(data);
      });
    }
  }
};



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
		
		for(let i=0;i<list.length;i++){
			console.log(list[i]);
			let id = jQuery(list[i]).find("th")[0].id;
			jQuery(list[i]).append("<div class='options buildtools'><div id='remove"+id+"' onclick='buildingFormsModule.createDMTableRemove(this)' class='icon remove'></div></div>");
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
		this.createRows();
		showResultModule.showResult("#main_frame","<div id='tableOutput'>"+this.getHTML()+"</div><div id='tableOutputText'></div>");
		jQuery("#tableOutputText").text(this.gettxtHTML());
		this.addOptions();
	}

	return this;
}

const buildingFormsModule = (function ($, ksAPI) {
	/*
	let buttonsTypes = {};
	let buttons = {};
	
	
	const buttonTypeObj = function(click,icon){
		
		this.click = click;
		this.icon = icon;
		
		return this;
	}
	
	
	const buttonObj = function(qid,type){
		
		this.qid = qid;
		this.type=type;
		this.html="";
		
		this.updateHTML = function(){
			this.html="<div class='"+this.type.icon+" icon' onclick='"+this.type.click+"'></div>";
			return this.html;
		}
		
		this.displayButton = function(){
			this.updateHTML();
			//console.log(this.html);
			//console.log(jQuery("questionDivEntireId"+qid));
			
			if(qid=="page"){
				jQuery("#buildtoolsMain").append(this.html);
			}
			else{
				jQuery("#questionDivEntireId"+qid).find(".buildtools").append(this.html);
			}
		}
		
		return this;
	}

*/





var getWorkflow = function(){
	
	var identifierList = Object.keys(vpGetIdentifiersMap());
	
	var sortie = "";
	
	for(var i in identifierList){
		
		sortie=sortie+"<br>"+identifierList[i]+"="+identifierList[i];
		
	}
	console.log("test");
	showResultModule.showResult("#main_frame",sortie);
	
}






var tableToText = function(a){
	
	var result="";
	
	for(var i in a){
		
		result=result+"<br>"+a[i];
		
	}
	
	return result;

}



var getQIdentifierThatContain = function(a,b){
	
	
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




var getRefbyId = function(a){
	return (_.invert(jsApiConverter))["Q"+a];
}


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

	showResultModule.showResult("#main_frame",firstpageList);

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
	
	jQuery("#main_frame").prepend("<div class='buildtools' id='buildtoolsMain'></div>");

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

		showResultModule.showResult("#main_frame",sortie);
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

	showResultModule.showResult("#main_frame",result);
	
}
	
	
 
 
 
 const initTextToUse = function(){
	 
	 if(listOfText){
		 let finalTextToUse;
		 
		 let groups = Object.keys(listOfText);
		 
		 for(let items in groups){
			 finalTextToUse[groups[items]] = listOfText[groups[items]];
		 }
		 
		 console.log(finalTextToUse);
		 
	 }

 }

 
const init = function(){
	
	jQuery.getScript("https://quereps.github.io/buildingForm/BuildingForm/showResult.js", function() {
	   console.log("showResult.js Script loaded but not necessarily executed.");
	   
	   showResultModule.Start();
	});
	
	jQuery.getScript("https://quereps.github.io/buildingForm/BuildingForm/buttons.js", function() {
	   console.log("buttons.js Script loaded but not necessarily executed.");
	   
	   buttonModule.NewType("getScoreFormula","buildingFormsModule.getScoreFormula()","getScoreFormula");
	   buttonModule.New("getScoreFormula","page","getScoreFormula");
	   
	   jQuery.getScript("https://quereps.github.io/buildingForm/BuildingForm/createDMTable.js", function() {
	   console.log("createDMTable.js Script loaded but not necessarily executed.");
	   
	   createDMTable.Start();
	   
	});
	   
	});
	
	
	
	
	createToolBar();
	$("#buildtoolsMain" ).append("<div title='Answer Randomly' class='icon random' onclick='buildingFormsModule.Random()'></div>");
	$("#buildtoolsMain" ).append("<div title='Get Workflow' class='icon workflow' onclick='buildingFormsModule.workflow()'>Qx=Qx</div>");
	$("#buildtoolsMain" ).append("<div title='Get Page Selector' class='icon pages' onclick='buildingFormsModule.getFirstQuestionOfPages()'>1st</div>");
	
	//buttonsTypes["getScoreFormula"]=new buttonTypeObj("buildingFormsModule.getScoreFormula()","getScoreFormula");
	
	
	//buttons[getScoreFormula] = new buttonObj("page",buttonsTypes.getScoreFormula);
	//buttons[getScoreFormula].displayButton();
	 
	
	jQuery.getScript("https://quereps.github.io/buildingForm/BuildingForm/structure.js", function() {
	   console.log("structue.js Script loaded but not necessarily executed.");
		structure = getStructure();
	});
	
	
	jQuery.getScript("https://quereps.github.io/buildingForm/BuildingForm/summaryTable.js", function() {
	   console.log("summaryTable.js Script loaded but not necessarily executed.");
		summaryTableModule.Start();
	});
	
	
	
	

	jQuery.getScript("https://quereps.github.io/buildingForm/BuildingForm/answerRandomly.js", function() {
	   console.log("answerRandomly.js Script loaded but not necessarily executed.");
	   
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
	getScoreFormula: function(){getScoreFormula()},
	tableToText: function(a){tableToText(a)}
}

})(jQuery, ksAPI);


(function($, ksAPI){ksAPI.runCustomCode(function (){ 
	
	jQuery("body").append("<style>.showResult .result {margin: 30px auto;max-width: 1000px;width: 100%;}div.remove{width:20px;height:20px; background:url('https://app.keysurvey.com/User/28/769928/media/69/136869.png');display:inline-block;background-repeat:no-repeat;background-size:15px;background-position:50%;}.displayIdentifiers.icon:empty {display: none;}.addHTMLTable {width: 50px;height: 50px;background: url(https://app.form.com/User/08/816008/media/77/196677.png) !important;background-size:contain !important;margin-left:10px;}div#tableOutputText {background: white;padding: 10px;margin: 20px;border: 1px dashed #6969c6;border-radius: 15px;}.buildtools .icon {     background-size: 20px !important;display:inline-block;     height:25px;     width:fit-content;     min-width:30px;     text-align:center;     border-right:1px solid;     margin:0;     padding:0 5px;     font-size:14px;     vertical-align: top;     background-repeat:no-repeat !important;     background-position:50% !important;     line-height:25px !important;     }  .buildtools{     height: 25px;     width: fit-content;     min-width: 10px;     float: right;     border:1px solid black !important;     }  .displayIdentifiers.icon {     background:#d4d6ec; }  .displayQID.icon {     background:#f5d9d9; }div.icon.random{background: url(https://app.form.com/User/08/816008/media/83/196683.png);background-size: contain;}#buildtoolsMain{z-index: 999999 !important;top: 0;right: 0;position: absolute;background: white;}.showResult {display: block !important;z-index: 99999;position: relative;background: white;border: 1px solid black;text-align:center;}.close {height: 30px;background: grey;margin-top: 10px;line-height: 30px;color: white;font-weight: bold;}.close:hover {background: brown;}.sameKind.icon {background: url(https://app.form.com/User/55/578055/media/89/197189.png)}.sumtable.icon {background: url(https://app.form.com/User/55/578055/media/91/197191.png)}</style>");
	
	if (!vpIsRbr()){
            buildingFormsModule.Run();
    }
	
	
	
	;})
;})(jQuery, ksAPI);




