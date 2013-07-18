// Russell Gaspard
// ASD 1307, Project 2
// Mobile Development
// Full Sail University


	
///////////////  HOME ///////////////////////	

$('#home').on('pageinit', function(){


var fnDisplayData = function(){

	if(localStorage.length === 0){
		//alert("No musician data has been saved.");
	}else{

	}
}

fnDisplayData();

//Import JSON
var fnImportJSON = function(){

  
	$.ajax({
		url      : 'data/musicians.js',
		type     : 'GET',
		dataType : 'json',
		success  : function(data, status) {
			//console.log(data)
				
			//Loop through Musicians in JSON data & save to local storage
			for(var i=0; i< data.length; i++){  
				
				//Make random number key for local storage
				var randomID = Math.floor(Math.random()*100000);
				
				//Save into localStorage
				localStorage.setItem(randomID, JSON.stringify(data[i]));
				console.log(randomID + " " + JSON.stringify(data[i]));
				
				//OUTPUT TO CONSOLE
				//console.log(data[i].fname)
				//console.log(data[i].lname)	
				//console.log(data[i].phone)
				//console.log(data[i].instr)
				//console.log(data[i].notes)
			}
				
            //Report to user
            alert("JSON Musician Data Saved");
		},
		error  : function(error, parseerror) {
			console.log(error)
				
            //Report to user
            alert("Error importing JSON data");
		}
	});
};
	
	
//Import XML
var fnImportXML = function(){
  
	$.ajax({
		url      : 'data/musicians.xml',
		type     : 'GET',
		dataType : 'xml',
		success  : function(data, status) {
			
			//Navigate to root element & then each child in XML data
			//Looping through Musicians data & save to local storage
					
			$(data).children(0).children().each(function(){ 
						
				//Make random number key for local storage
				var randomID = Math.floor(Math.random()*100000);
						
				//Create object to hold properties.
				var entry = {};
					
				entry.fname		= $(this).find('fname').text();
				entry.lname		= $(this).find('lname').text();
				entry.phone		= $(this).find('phone').text();
				entry.instr		= $(this).find('instr').text();
				entry.notes		= $(this).find('notes').text();	
								
				//Save into localStorage
				localStorage.setItem(randomID, JSON.stringify(entry));
				console.log(randomID + " " + JSON.stringify(entry));
									
				//OUTPUT TO CONSOLE
				//console.log($(this).find('fname').text());
				//console.log($(this).find('lname').text());				
				//console.log($(this).find('phone').text());	
				//console.log($(this).find('instr').text());		
				//console.log($(this).find('notes').text());	
            });
                	
            //Report to user
            alert("XML Musician Data Saved");

		},
		error  : function(error, parseerror) {
			console.log(error)
				
        	//Report to user
        	alert("Error importing XML data");
		}
	});

};	


// Clear all data from local storage
var fnClearData	= function (){
	if(localStorage.length === 0){
		alert("No musician data has been saved.");
	}else{
		localStorage.clear();
		alert("All Musicians Deleted");
		//window.location.reload();
		return false;
	}
}
	
	
	function saveData(key){
		if(!key){
			var randomID = Math.floor(Math.random()*100000); //Make new key
		}else{
			var randomID = key; //reuse previos key to overwrite for "edit"
		}
		
		//Compile form data into an object - properties include array with label and value.
		var entry		={};

		entry.fname		= ["First Name:", id("fname").value];
		entry.lname		= ["Last Name:", id("lname").value];
		entry.phone		= ["Phone:", id("phone").value];
		entry.email		= ["Email:", id("email").value];
		entry.primary	= ["Primary Instrument:", id("primary").value];
		entry.all		= getAllInstruments();
		entry.rating	= ["Rating:", id("rating").value];
		entry.lgig		= ["Last Gig:", id("lgig").value];
		entry.notes		= ["Notes:", id("notes").value];
		
		//Save into localStorage
		localStorage.setItem(randomID, JSON.stringify(entry));
		console.log(randomID + " " + JSON.stringify(entry));
		alert("Musician Data Saved");	
	};
	
	
	
$('#ijson').on('click', fnImportJSON);
$('#ixml').on('click', fnImportXML);
$('#clear').on('click', fnClearData);
	
	
	
});