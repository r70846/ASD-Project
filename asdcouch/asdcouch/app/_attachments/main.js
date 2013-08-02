// Russell Gaspard
// ASD 1307, Project 4
// Mobile Development
// Full Sail University

	
///////////////  HOME ///////////////////////	

$('#home').on('pageinit', function(){


//http://127.0.0.1:5984/asdproject/_design/app/_view/musicians

//http://127.0.0.1:5984/asdproject/_design/bandmates/index.html

var fnDisplayData = function(){
	$('#list').html('');
	$.couch.db("asdproject").view("bandmates/musicians", {
		success: function(data){

			$('#count').text(data.total_rows);
		
			$.each(data.rows, function(index, musician){

				var id = musician.value.id;	
				var rev = musician.value.rev;			
				var fname = musician.value.fname;
				var lname = musician.value.lname;
				var instr = musician.value.instr;
				var phone = musician.value.phone;
				var notes = musician.value.notes;		

				var info = '<li><a href="detail.html?id=' + id + '">' +
				'<h3>' + fname + ' ' + lname + '</h3>' +
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
}


$('#home').on('pageshow', function(){
	fnDisplayData();
});
	

//$('#list').delegate('a.edit', 'click', fnEdit);
//$('#list').delegate('a.del', 'click', fnDelete);

});

///////////////  DETAILS  ///////////////////////	

var urlVars = function(urlData){
	var urlParts = urlData.split('?');
	var urlPairs = urlParts[1].split('&');
	var urlValues = {};
	for (var i in urlPairs){
		var keyValue = urlPairs[i].split('=');
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		urlValues[key] = value;
	}
	return urlValues;
};

var fnDisplayDetail = function(choice){

	$.couch.db("asdproject").view("bandmates/musicians", {
		success: function(data){
	
			$.each(data.rows, function(index, musician){

				if(choice === musician.value.id){
					var id = musician.value.id;	
					var rev = musician.value.rev;					
					var fname = musician.value.fname;
					var lname = musician.value.lname;
					var instr = musician.value.instr;
					var phone = musician.value.phone;
					var notes = musician.value.notes;		

					var info = '<li><h3>' + fname + ' ' + lname + '</h3>' +
					'<li>' + instr + '<li>' +
					'<li>' + phone + '</li>' +
					'<li>' + notes + '</li>' +
					'<input type="hidden" id="key" value="' +  id + '"/>' +
					'<input type="hidden" id="rev" value="' +  rev + '"/>'
									
					//'<a href="#" class="edit" id="' + key + '">Edit</a> <a href="#" class="del" id="' + key + '">Delete</a>' + 		
					$('#display').html(info);
				};
			});
		}
	});
}

// Delete
var fnVerify = function (){
	$('#verify').css("display","block;");
	alert(id);

	//localStorage.removeItem(this.id)
    //fnDisplayData(); //Show Data
};

// Delete
var fnDelete = function (){
	var id = $('#key').val();
	var rev = $('#rev').val();
	
	var ask = confirm("Delete this entry?");
	if (ask === true) {
		$.couch.db('asdproject').removeDoc({
				_id : id,
				_rev : rev
			},{
				success: function(data){
				//alert('Deleted!');
			}
		});
  	} else {
  	}
};

// Edit
var fnEdit = function (){

	alert('Edit feature coming soon!');
	//globalKey = this.id;
	//$.mobile.changePage('#add');
};

$(document).on('pageinit', '#details', function(){
	var url =  $(this).data("url");
	var id = urlVars(url)["id"];
	fnDisplayDetail(id);


//Event binders	
$('#deleteNav').on('click', fnDelete);

});

///////////////  ADD  ///////////////////////	

$('#add').on('pageinit', function(){


var fnSaveData = function(){

	//Make random number key for local storage
	var randomID = Math.floor(Math.random()*100000);
						
	//Create object to hold properties.
	var entry = {};
					
	entry.type		= "musician";			
	entry.fname		= $('#fname').val();
	entry.lname		= $('#lname').val();
	entry.phone		= $('#phone').val();
	entry.instr		= $('#instr').find(":selected").val();
	entry.notes		= $('#notes').val();	
							
	//Save into localStorage
	//localStorage.setItem(randomID, JSON.stringify(entry));
	
	$.couch.db('asdproject').saveDoc(entry, {
	success: function(){
		alert('Musician has been saved!');
		//fnDisplayData();
	}
});
	
	
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

