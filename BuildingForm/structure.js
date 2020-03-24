
const getStructure = function(){
	
	const pageNumber = vpGetStructure().questionsMap[(jQuery(".aDivEntireQuestion ").first()[0].id.split("Id")[1])].pageNum;
	const questionOnPage = vpGetStructure().questionsByVP[pageNumber];

	let questionObjs = {};

	const questionObjsClass = function(id){
			
			this.id = id;
			this.ref = vpGetQuestionByQuestionId(this.id).prefix;
			this.questionLabel = jQuery(vpGetLabel(this.ref)).html().split('</span>')[1];
			this.listOfText = getSWApi("people","",20,"");
			this.identifier = vpGetIdentifierByReference(this.ref);
            this.nbOfAnswers = Object.keys(vpGetStructure().questionsMap[this.id].answers).length;
            
			this.getBestRef = function(){
				let toreturn = this.ref;
				this.identifier ? toreturn = this.identifier : toreturn = this.ref;	
				return toreturn;
			}
			this.bestRef = this.getBestRef();
			this.piping = "{"+this.bestRef+"}";
			
			
			this.answers = {}
			
			for (var i=1;i<=this.nbOfAnswers;i++){
				this.answers = vpGetStructure().questionsMap[this.id].answers;
			}
			
			this.type = vpGetStructure().questionsMap[this.id].type;
			
			return this;
		}
	
	
	const getQuestions = function(){
		for(var q in questionOnPage){
			
			if(vpGetQuestionByQuestionId(questionOnPage[q])){
				
				let theid = questionOnPage[q];
				questionObjs[theid] = new questionObjsClass(questionOnPage[q]);
			}
		}
		
		
	}
	
	getQuestions();
	
	return questionObjs;
	
}

