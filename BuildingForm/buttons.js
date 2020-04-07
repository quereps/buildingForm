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
	
	
	const buttonObj = function(target,click,classlist,label,isMenu){

		console.log("import isMenu : ",isMenu);
		
		this.isMenu = isMenu ? isMenu : true;
		this.target = target;
		this.click = click;
		this.class= "";
		this.html="";
		this.label=label;

		this.updateclass = function(){
			let toreturn = "";
			for(let item in classlist){
				toreturn = toreturn + " " + classlist[item];
			}
			this.class = toreturn;
		}

		this.updateHTML = function(){
			this.html="<div title='"+this.label+"' class='"+this.class+"' onclick='"+this.click+"'><label>"+this.label+"</label></div>";
		}
		
		this.displayButton = function(){

			console.log("displaying button", this.class)
			this.updateclass();
			this.updateHTML();
			
			if(target=="page"){
				jQuery("#buildtoolsMain").append(this.html);
			}
			else{
				jQuery("#questionDivEntireId"+target).find(".buildtools").append(this.html);
			}

				console.log(this);
			console.log("isMenu: ",this.isMenu);

			if(this.isMenu==true){
				jQuery("#interface .menu").append(this.html);
			}
			
			

		}
		
		console.log("button :   ",this);
		return this;
	}
	
	
	//const newType = function(id,click,icon){
	//	buttonsTypes[id]=new buttonTypeObj(click,icon);
	//}
	
	const newButton = function(target,click,classlist){

		console.log("will creae button "+classlist);
		return new buttonObj(target,click,classlist);
		//buttons[id].displayButton();
	}
	
	
	return{
		//Start: function(settings){init(settings);},
		//NewType: function(id,click,icon){newType(id,click,icon)},
		New: function(target,click,classlist,label,isMenu){return newButton(target,click,classlist,label,isMenu)},
		//Show: function(idbutton){show(idbutton)}
	}
})(jQuery, ksAPI);


//buttons[getScoreFormula] = new buttonObj("page",buttonsTypes.getScoreFormula);
	//buttons[getScoreFormula].displayButton();

