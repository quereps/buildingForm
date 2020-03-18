const buttonModule = (function ($, ksAPI) {
	
	let buttonsTypes = {};
	let buttons = {};
	
	
	const buttonTypeObj = function(click,icon){
		
		this.click = click;
		this.icon = icon;
		
		return this;
	}
	
	
	const buttonObj = function(qid,type){
		
		console.log(buttonsTypes);
		console.log(type);
		console.log(buttonsTypes[type]);
		
		this.qid = qid;
		this.type=buttonsTypes[type];
		this.html="";
		
		console.log(this.type);
		
		this.updateHTML = function(){
			this.html="<div class='"+this.type.icon+" icon' onclick='"+this.type.click+"'></div>";
			return this.html;
		}
		
		this.displayButton = function(){
			this.updateHTML();
			
			if(qid=="page"){
				jQuery("#buildtoolsMain").append(this.html);
			}
			else{
				jQuery("#questionDivEntireId"+qid).find(".buildtools").append(this.html);
			}
		}
		
		return this;
	}
	
	
	const newType = function(id,click,icon){
		buttonsTypes[id]=new buttonTypeObj(click,icon);
	}
	
	const newButton = function(id, qid,type){
		buttons[id] = new buttonObj(qid,type);
		buttons[id].displayButton();
	}
	
	
	return{
		//Start: function(settings){init(settings);},
		NewType: function(id,click,icon){newType(id,click,icon)},
		New: function(id,qid,type){newButton(id,qid,type)},
		Show: function(idbutton){show(idbutton)}
	}
})(jQuery, ksAPI);


//buttons[getScoreFormula] = new buttonObj("page",buttonsTypes.getScoreFormula);
	//buttons[getScoreFormula].displayButton();

