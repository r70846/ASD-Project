// Russell Gaspard
// ASD 1307, Project 3
// Mobile Development
// Full Sail University




//$('#home').on('pageinit', function(){
//	$.couch.db("asdproject").view("bandmates/musicians", {
//		success: function(data){
//			console.log(data);
//		}
//	});
//});

	
///////////////  HOME ///////////////////////	

var globalKey = 0;

$('#home').on('pageinit', function(){

	$.couch.db("asdproject").view("bandmates/musicians", {
		success: function(data){
			console.log("Russell's couch plugin...");	
			console.log(data);
		}
	});

//console.log("Here I am couch surfing!!!");
//http://127.0.0.1:5984/asdproject/_design/app/_view/musicians

//Import RESTful Couch data
var fnImportCouch = function(){

	$.ajax({
		url      : '_view/musicians',
		type     : 'GET',
		dataType : 'json',
		success  : function(data, status) {
		
			$('#count').text(data.total_rows);
		
			$.each(data.rows, function(index, musician){
				var fname = musician.value.fname;
				var lname = musician.value.lname;
				var instr = musician.value.instr;
				var phone = musician.value.phone;
				var notes = musician.value.notes;		

				var info = '<li><a href="#"><h3>' + fname + ' ' + lname + '</h3>' +
				'<p>' + instr + '</p>' +
				'<p>' + phone + '</p>' +
				'<p>' + notes + '</p>' +				
				//'<a href="#" class="edit" id="' + key + '">Edit</a> <a href="#" class="del" id="' + key + '">Delete</a>' + 	
				'</a></li>' 	
			
				$('#list').append(info);
			});
			$('#list').listview('refresh');
		}	
	});
};


var fnDisplayData = function(){

	var list = $('#list');
	list.html('');
	
	var count = $('#count');

	if(localStorage.length === 0){
	
			var info = '<li><h3>' + 'No Musician Data Recorded' + '</h3>,</li>'
			//'<p>' + data.instr + '</p>' +
			//'<p>' + data.phone + '</p>' +
			//'<p>' + data.notes + '</p></li>' 	
			list.append(info);
			count.text('');
			//$('#clear').css("display", "hidden");
	}else{
		//console.log('hello');
		var list = $('#list');
		list.html('');
		
		for(i=0, j=localStorage.length; i<j; i++){
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var data = JSON.parse(value);
			
			var info = '<li><h3>' + data.fname + ' ' + data.lname + '</h3>' +
			'<p>' + data.instr + '</p>' +
			'<p>' + data.phone + '</p>' +
			'<p>' + data.notes + '</p>' +
			'<a href="#" class="edit" id="' + key + '">Edit</a> <a href="#" class="del" id="' + key + '">Delete</a>' + 
			'<hr/></li>' 	
			list.append(info);
		}
		count.text(i);
		//$('#clear').css("display", "inline");
	}
}


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
            //alert("JSON Musician Data Saved");
            
            //Show Data
            fnDisplayData();

		},
		error  : function(error, parseerror) {
			console.log(error)
				
            //Report to user
            alert("Error importing JSON data");
		}
	});
};

$('#home').on('pageshow', function(){

	//fnDisplayData();

});
	
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
				
				//console.log(randomID + " " + JSON.stringify(entry));
									
				//OUTPUT TO CONSOLE
				//console.log($(this).find('fname').text());
				//console.log($(this).find('lname').text());				
				//console.log($(this).find('phone').text());	
				//console.log($(this).find('instr').text());		
				//console.log($(this).find('notes').text());	
            });
                	
            //Report to user
            //alert("XML Musician Data Saved");
            
            //Show Data
            fnDisplayData();

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
    	fnDisplayData(); //Show Data
    	//window.location.reload();
	}
}

// Delete
var fnDelete = function (){
	localStorage.removeItem(this.id)
    fnDisplayData(); //Show Data
}

// Edit
var fnEdit = function (){

	alert('Edit feature coming soon!');
	//globalKey = this.id;
	//$.mobile.changePage('#add');
}
	
//Event binders	
//$('#ijson').on('click', fnImportJSON);
$('#ijson').on('click', fnImportCouch);
//$('#ixml').on('click', fnImportXML);
//$('#clear').on('click', fnClearData);


$('#list').delegate('a.edit', 'click', fnEdit);
$('#list').delegate('a.del', 'click', fnDelete);

});


///////////////  ADD  ///////////////////////	

$('#add').on('pageinit', function(){


var fnSaveData = function(){

	//Make random number key for local storage
	var randomID = Math.floor(Math.random()*100000);
						
	//Create object to hold properties.
	var entry = {};
					
	entry.fname		= $('#fname').val();
	entry.lname		= $('#lname').val();
	entry.phone		= $('#phone').val();
	entry.instr		= $('#instr').find(":selected").val();
	entry.notes		= $('#notes').val();	
	
	//OUTPUT TO CONSOLE
	//console.log($('#fname').val());
	//console.log($('#lname').val());				
	//console.log($('#phone').val());	
	//console.log($('#instr').find(":selected").val());		
	//console.log($('#notes').val());
	
								
	//Save into localStorage
	localStorage.setItem(randomID, JSON.stringify(entry));
	fnClearFields();
}

var fnClearFields = function(){
					
	$('#fname').val('');
	$('#lname').val('');
	$('#phone').val('');
	$('#notes').val('');	

	var instr = $("#instr");
	instr[0].selectedIndex = 0;
	instr.selectmenu('refresh');
}



//Event binders	
$('#save').on('click', fnSaveData);
$('#clean').on('click', fnClearFields);


});

