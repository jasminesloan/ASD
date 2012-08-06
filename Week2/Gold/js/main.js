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

		
//create select field element and populate with options.
		var makeCats = function () {
			var formTag = $("form"), //formTag is an array of all the form tags.
				selectLi = $('<select>'),
				makeSelect = $('<select>');
				makeSelect.attr("id", "locations");
		for(var i=0, j=mixtapeGenres.length; i<j; i++){
				var makeOption = $('option');
				var optText = mixtapeGenres[i];
				makeOption.attr("value", optText);
				makeOption.text(optText);
				makeSelect.append(makeOption);
			}

		};

//Find value of selected radio button.
		var getSelectedRadio = function(){
			var radios = function (){
				$('input:radio[name="purchaseDate"]:checked').val();
				return($('input:radio[name="purchaseDate"]:checked').val());

			};
		};



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
							$('#items').hide();
							break;
					default:
						return false;
				}
			};

			
			
			var storeData = function(key){
				//If there is no key, this is a brand new item and we need a new key.
					if (!key){
								var id = Math.floor(Math.random()*100000001);
					}else{
//Set the id to the existing key we're editing so that it will save our data.
//The key is the same that's been passed along from the editSubmit event handler
//to the validate function, and the passed here, into the storeData function.
							id = key;

					}

//Gather up all our form field values nd store in an object.
//Object properties contain array with the form label and input values.
			getSelectedRadio();

			var item = {};
					item.location = ["Zip Code:", $('#location').val()];
					item.purchase = ["Purchase:", purchaseDate];
					item.date = ["Date", $('#date').val()];
					item.quantity = ["Quantity", $('#quantity').val()];
					item.suggestions = ["Suggestions", $('#suggestions').val()];
//Save data into Local Storage: Use stringify to convert our object
			localStorage.setItem(id, JSON.stringify(item));
			alert("Mixtape Saved!");
			save.off("click");
				save.on("click", storeData);
			window.location.reload();
		};

//Create visiable storage
			var getData = function(){
//console.log("id");
				$("#purchpage").empty();
				toggleControls("on");
				if(localStorage.length === 0){
						alert("There is no data in Local Storage so default data was added.");
						autoFillData();
}
//Write data from local storage to browser
			var makeDiv = $('<div>');
			makeDiv.attr("id", "items");
			var makeList = $('<ul>');
			makeDiv.append(makeList);
			$("#listP").append(makeDiv);
			$('#items').show();
					for(var i=0, len=localStorage.length; i<len;i++){
					var makeLi = $('<li>');
					var linksLi = $('<li>');
					makeList.append(makeLi);
					var key = localStorage.key(i);
					var value = localStorage.getItem(key);
//Convert the string from the local storage value back to an object by using JSON.parse()
					var obj = JSON.parse(value);
					var makeSubList = $('<ul>');
					makeLi.append(makeSubList);
// getImage(obj.group[1], makeSubList);
					for(var n in obj){
						var makeSubLi = $('<li>');
						makeSubList.append(makeSubLi);
						var optSubText = obj[n][0]+" "+obj[n][1];
						makeSubLi.text(optSubText);
						makeSubLi.append(linksLi);
				}
				makeItemLinks(localStorage.key(i), linksLi); //Create our edit and delete buttons/link for each item in local storage.
		};
};

//Get the image for the right category
 /* function getImage(catName, makeSubList){
var imageLi = document.createElement('li');
makeSubList.appendChild(imageLi);
var newImg = document.createElement('img');
var setSrc = newImg.setAttribute("src", "images/" + catName + ".png");
imageLi.appendChild(newImg);
} */


//Auto Populate Local Storage
			function autoFillData(json){
			
				 	for(var n in json){
						var id = Math.floor(Math.random()*100000001);
					localStorage.setItem(id, JSON.stringify(json[n]));
			}
		}
						


//The actual JSON OBJECT data required for this to work is coming from our json.js file which is loaded from our html page
//Store JSON OBJECT into local storage
			


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
				linksLi.append(editLink);


//add line break
				var breakTag = $('<br>');
				linksLi.append(breakTag);

//Add a delete single item link
				var deleteLink = $('<a>');
				deleteLink.attr("href", "#");
				deleteLink.attr("key", key);
				var deleteText = "Delete Mixtape";
				deleteLink.on("click", deleteItem);
				deleteLink.text(deleteText);
				linksLi.append(deleteLink);
		}

			function editItem(){
				
				var thiskey = $(this).attr("key");
//Grab the data from our item from Local Storage
				var value = localStorage.getItem($(this).attr("key"));
				var item = JSON.parse(value);

//Show the form
			
			toggleControls("off");
//populate the form fields with current localStorage value.
			
			
			$('#location').val(item.location[1]);

			 var radios = $('input:radio[name="purchaseDate"]:checked').val();
			$('#date').val(item.date[1]);
			$('#quantity').val(item.quantity[1]);
			$('#suggestions').val(item.suggestions[1]);	

			
//Remove the initial listener from the input "save mixtape" button.
			save.off("click", storeData);
//Change submit button value to edit button
			$('#save').attr("value", "Edit Mixtape");
			var editSubmit = $('#save');
//Save the key value established in this function as a property of the editSubmit event
//so we can use that value when save the data we edited
			save.one("click", function(){
				//console.log("save called");
   storeData(thiskey);
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

/*function validate(e){
//Define the elements we want to check
var getGroup = $('location');
//var getEmail = $('email');
//var getPassword = $('pword');

//Reset Error Message
errMsg.innerHTML = "";
getGroup.style.border = "1px solid black";
//getEmail.style.border = "1px solid black";
//getPassword.style.border = "1px solid black";

//Get error message
var messageAry = [];
//Group Validation
if(getGroup.value=== "--Choose A Genre--"){
var groupError = "Please Chose A Genre";
getGroup.style.border = "1px solid red";
messageAry.push(groupError);
}

//Email Validation
//var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w)*(\.\w{2,3})+$/;
//if(!(re.exec(getEmail.value))){
// var emailError = "Please enter an Email Address.";
// getEmail.style.border = "1px solid red";
// messageAry.push(emailError);
//}

//Password Validation
//if(getPassword.value=== ""){
// var passwordError = "Please enter your Password.";
// getPassword.style.border = "1px solid red";
// messageAry.push(passwordError);
//}

//If there were errors, display them on the screen
if(messageAry.length >= 1){
for(var i=0, j=messageAry.length; i < j; i++){
var txt = document.createElement('li');
txt.innerHTML = messageAry[i];
errMsg.appendChild(txt);
}
e.preventDefault();
return false;
}else{
//If all is Ok, save our data! Send key value which came from the edit data function
//Remember this key value was passed through the editSubmit eventListener as a property
storeData(this.key);
}

}*/

//Variable defaults, events, and calls
var mixtapeGenres = ["--Choose A Genre--", "Dirty South", "Gospel", "Hip Hop", "Miami Bass", "Old School", "Oomp Camp Albums", "R&B/Slow Jams", "Reggae"];
var purchaseDate;
//var	wishListValue = "No";
var errMsg = $('#errors');
makeCats();
var displayLink = $('#displayLink');
displayLink.on("click", getData);
var clearLink = $('#clearLink');
clearLink.on("click", clearLocal);
var save = $("#save");
save.on("click", storeData);	

		

