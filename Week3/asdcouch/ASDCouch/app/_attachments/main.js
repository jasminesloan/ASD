

// JQUERY VALIDATION FORM
				var parsePurchaseForm = function(data) {
//uses form data here;

//console.log(data);
		};

		$(document).bind('pageinit', function(){

			var pform = $('#purchaseform');

//jQuery.validator.messages.required = "Required";
			pform.validate({
				invalidHandler: function(form, validator) {},
				submitHandler: function() {
					var data = pform.serializeArray();
					parsePurchaseForm(data);
				}
			});

		});



//Find value of selected radio button.
		var getSelectedRadio = function(){
			var radios = function (){
				$('input:radio[name="purchaseDate"]:checked').val();
				return($('input:radio[name="purchaseDate"]:checked').val());

			};
		};

		

			
			
			var storeData = function(key){
			console.log(key);
				//	if (!key){
								var id = Math.floor(Math.random()*100000001);
				//	}else{

				//			id = key;

				//	}

//Gather up all our form field values and store in an object.
//Object properties contain array with the form label and input values.
			
			getSelectedRadio();

			var item = {};
					 
					item._id	  			= "purchase:" + id;
				//	item._rev				= rev;
					item.location 			= ["Zip Code:", $('#location').val()];
					item.purchase 			= ["Purchase:", $('#purchaseDate').val()];
					item.date 				= ["Date", $('#date').val()];
					item.quantity 			= ["Quantity", $('#quantity').val()];
					item.suggestions 		= ["Suggestions", $('#suggestions').val()];

//Save data into Local Storage: Use stringify to convert our object
			console.log(item);
			$.couch.db('asdproject').saveDoc(item, {
					success: function (data) {
					//	console.log(item);
						alert("Mixtape Saved!");
						
						
						//window.location.reload();
		}
	});
};

//Create visiable storage
			var getData = function(){
//console.log("id");
				$.couch.db('asdproject').view("asdproject/purchases", {
  					success: function(data) {
  					console.log(data);
  					$.each(data.rows, function(index, item) { 
							var location = item.value.location;
							var purchase = item.value.purchase;
							var date = item.value.date;
							var quantity = item.value.quantity;
							var suggestions = item.value.suggestions;
								$('#purchaseData').append(
								$('<li>').text(location),
								$('<li>').text(purchase),
								$('<li>').text(date),
								$('<li>').text(quantity),
								$('<li>').text(suggestions),
								$('<p></p>')
			);
			makeItemLinks(item.value._id, $('#purchaseData')[0]);
		//	makeItemLinks(localStorage.key(i), linksLi);
		});
			
  			//		('#purchaseData').listview('refresh');
  					
  		},
  					error: function(status) {
 					 console.log(status);
 					 	$("#purchaseForm").empty();
  		}
  		
	
  		
	});
	
	var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
	//	$('items').style.display = "block";
			for(var i=0, len=localStorage.length; i<len;i++){
			var makeLi = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert the string from the local storage value back to an object by using JSON.parse()
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			getImage(obj.group[1], makeSubList);
			for(var n in obj){
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubLi.appendChild(linksLi);
			}
		}


var toggleControls = function(n){
			switch(n){
					case "on":
							$('#purchaseform').hide();
							$('#clearLink').show();
							$('#displayLink').hide();
							$('#addNew').show();
							$(".logo").removeClass("logo_min");
							break;
						case "off":
							$('#purchaseform').show();
							$('#clearLink').show();
							$('#displayLink').show();
							$('#addNew').hide();
							$('#item').hide();
							break;
					default:
						return false;
				}
			};


//Auto Populate Local Storage
			function autoFillData(jsonData){
					 	for(var n in jsonData){
						var id = Math.floor(Math.random()*100000001);
					localStorage.setItem(id, JSON.stringify(jsonData[n]));
			}
		}
						
//Make Item Links
//Create the edit and delete links for each stored item when displayed.
			function makeItemLinks(key, linksLi){
//add edit single item link
				var editLink = $('<a>');
				editLink.attr("href", "#");
				editLink.attr("key", key);
				var editText = "Edit Mixtape";
				editLink.on("click", editItem);
				editLink.text(editText);
				//console.log(linksLi);
				//console.log(editLink);
				linksLi.appendChild(editLink[0]);


//add line break
				var breakTag = $('<br>');
				linksLi.appendChild(breakTag[0]);

//Add a delete single item link
				var deleteLink = $('<a>');
				deleteLink.attr("href", "#");
				deleteLink.attr("key", key);
				var deleteText = "Delete Mixtape";
				deleteLink.on("click", deleteItem);
				deleteLink.text(deleteText);
				linksLi.appendChild(deleteLink[0]);
				
		}

			function editItem(key){

//Grab the data from our item from Local Storage
				var value = localStorage.getItem(key);
				item = JSON.parse(value);
				console.log(value);
				
			
//Show the form

			toggleControls("off");
//populate the form fields with current localStorage value.

			console.log(value);
			$('#location').value = item.location[1];
			$('#date').value = item.date[1];
			$('#quantity').value = item.quantity[1];
			$('#suggestions').value = item.suggestions[1];	

			var radios = $('input:radio[name="purchaseDate"]:checked').val();


//Remove the initial listener from the input "save mixtape" button.
			save.off("click", storeData);


//Change submit button value to edit button
			$('#save').val("Edit Mixtape");
			var editSubmit = $('#save');


//Save the key value established in this function as a property of the editSubmit event
//so we can use that value when save the data we edited
			save.one("click", function(){
				//console.log("save called");
   storeData(key);
  });
			editSubmit.attr("key", this.key);


	}

			var clearLocal = function(){
				if(localStorage.length === 0){
						alert("There is no data to clear.");
				}else{
						localStorage.clear();
						alert("All mixtapes are deleted!");
						window.location.reload();
						return false;
				}
		};

		function deleteItem(){
				var ask = confirm("Are you sure you want to delete this mixtape?");
				if(ask){
						localStorage.removeItem(this.key);
						alert("Mixtape was deleted!");
						window.location.reload();
				}else{
						alert("Mixtape was not deleted.");
				}
		}
	
};		




//Variable defaults, events, and calls
var errMsg = $('#errors');
var displayLink = $('#displayLink');
displayLink.on("click", getData);
var clearLink = $('#clearLink');
clearLink.on("click", function(){
		clear();
});
var save = $("#save");
save.on("click", storeData);	




