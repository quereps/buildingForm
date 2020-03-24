const buttonModule = (function ($, ksAPI) {
	
	//let buttonsTypes = {};
	//let buttons = {};
	
	
	//const buttonTypeObj = function(click,icon){
	//	
	//	this.click = click;
	//	this.icon = icon;
	//	
	//return this;
	//}
	
	
	const buttonObj = function(target,click,classlist){
		
		this.target = target;
		this.click = click;
		this.class=classlist;
		this.html="";
		
		this.updateHTML = function(){
			this.html="<div class='"+this.class+" onclick='"+this.click+"'></div>";
			//return this.html;
		}
		
		this.displayButton = function(){
			this.updateHTML();
			
			if(target=="page"){
				jQuery("#buildtoolsMain").append(this.html);
			}
			else{
				jQuery("#questionDivEntireId"+target).find(".buildtools").append(this.html);
			}
		}
		
		return this;
	}
	
	
	//const newType = function(id,click,icon){
	//	buttonsTypes[id]=new buttonTypeObj(click,icon);
	//}
	
	const newButton = function(target,click,classlist){
		return new buttonObj(qid,type);
		//buttons[id].displayButton();
	}
	
	
	return{
		//Start: function(settings){init(settings);},
		//NewType: function(id,click,icon){newType(id,click,icon)},
		New: function(target,click,classlist){newButton(target,click,classlist)},
		//Show: function(idbutton){show(idbutton)}
	}
})(jQuery, ksAPI);


//buttons[getScoreFormula] = new buttonObj("page",buttonsTypes.getScoreFormula);
	//buttons[getScoreFormula].displayButton();

