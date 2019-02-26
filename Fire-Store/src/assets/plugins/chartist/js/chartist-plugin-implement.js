var implementAndDocumentFunctionByClass = function(implementation,className){
	 implementation();
	 var implementationAsString = implementation.toString().replace('function (){','').slice(0, -1);
	 if(implementationAsString.slice(-1).match(/\n/)){
		 implementationAsString = implementationAsString.slice(0, -1);
	 }
	 if(implementationAsString.charAt(0).match(/\n/)){
		 implementationAsString = implementationAsString.substring(1);
	 }
	 var lineWhiteSpaceArray = [];
	 var smallestWhitespace = Infinity;
	 var lineArray = implementationAsString.split('\n');
	 lineArray.forEach(function(line,index){
		if(line.match(/^\s*$/)){
			delete lineArray[index];
		}
		else{
			var whiteSpaces = (line.match(/^\s+/)[0] || '').length;
			lineWhiteSpaceArray.push(whiteSpaces);
			if(smallestWhitespace > whiteSpaces){
				smallestWhitespace = whiteSpaces;
			}
		}
	 });
	 
  }