$(document).ready(function(){
var userHtml = $("#username");
var username;
//  Initialize Firebase
   var config = {
    apiKey: "AIzaSyCgQFFxv6-cd0vRQesrZUD447sO7AEYklo",
    authDomain: "clickevent-e44d0.firebaseapp.com",
    databaseURL: "https://clickevent-e44d0.firebaseio.com",
    projectId: "clickevent-e44d0",
    storageBucket: "clickevent-e44d0.appspot.com",
    messagingSenderId: "673662977249"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var ref = database.ref("user");
var signedIn;
// var preferences = signedIn.child("preferences")
// LOGIN SECTION==================================================================================
  //instance of the goggle provider object
var google = new firebase.auth.GoogleAuthProvider();
var facebook = new firebase.auth.FacebookAuthProvider();

// GOOGLE SIGNIN
var displayName;
function createAccountWithEmailandPassword() {
	displayName = $("#nameInput").val().trim();
	var email = $("#emailInput").val().trim();
	var password = $("#createPasswordInput").val().trim();

	firebase.auth().createUserWithEmailAndPassword(email, password)
	
	.then(function(user) {
		user.updateProfile({displayName: displayName})
		console.log(displayName)
		loadMainPage()
	
	})

}

function signInWithEmailAndPassword() {
	var email = $("#emailInput").val().trim();
	var password = $("#createPasswordInput").val().trim();

	firebase.auth().signInWithEmailAndPassword(email, password)
	
			 
}


function googleSignIn() {
	firebase.auth().signInWithPopup(google).then(function(result) {
			// This gives you a Google Access Token. You can use it to access the Google API.
			var token = result.credential.accessToken;
			  // The signed-in user info.
			var user = result.user;
			  // ...
           
            
			loadMainPage()
			}).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  // The email of the user's account used.
			  var email = error.email;
			  // The firebase.auth.AuthCredential type that was used.
			  var credential = error.credential;
			  // ...
			});
  }

function facebookSignIn() {
	firebase.auth().signInWithPopup(facebook).then(function(result) {
		  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
		  var token = result.credential.accessToken;
		  // The signed-in user info.
		  var user = result.user;
		
           
		  loadMainPage()
		
        }).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
			// ...
	});
  }

  $(".addUser").on("click", function(event) {
	  event.preventDefault()
	  createAccountWithEmailandPassword()
})

$(".login").on("click", function(){
	signInWithEmailAndPassword()
})

// SIGNUP ON CLICK
$(".signin").on("click", function(event) {
    event.preventDefault()
	var method = $(this).attr("data")
	console.log("hello")
        if (method === "google") {
		googleSignIn();
		
        }
	else if(method === "facebook") {
		facebookSignIn();
		
    } 
})
// Sign Out
$("#logout").on("click", function() {
firebase.auth().signOut().then(function() {
  // Sign-out successful.
  loadLoginPage();
}).catch(function(error) {
  // An error happened.
});
})

firebase.auth().onAuthStateChanged(function(firebaseUser){
	if(firebaseUser) {
       //USer is signed in
	   console.log(firebaseUser)

	   username = firebaseUser.displayName
		userHtml.html("Welcome "+ firebaseUser.displayName)
		signedIn = ref.child(firebaseUser.displayName) 
        signedIn.update({
            name: firebaseUser.displayName,
            email: firebaseUser.email
})

		// $(".name").html("<h2>Hi "+firebaseUser+"!</h2>")
	} else {
		console.log("not lgged In")
	}
})










function loadMainPage() {
     window.location.href = 'preferences.html';
	 
 }

  function loadLoginPage() {
     window.location.href = 'index.html';
	
 }

  function loadReturnUser() {
     window.location.href = 'user.html';

	 
 }
   function loadSuggestionPage() {
     window.location.href = 'suggestions.html';

	
	 userHtml.html(username+"'s Suggestions" )
 }



// var ref = firebase.database().ref("user");
// ref.once("value")
//   .then(function(snapshot) {
    
//     var name = snapshot.child("user").key;
//     var email = snapshot.child("email").val();
//     var list = snapshot.child("likes").val()
//     console.log(name, email)
//     console.log(list)
  
//   });

// LOGIN SECTION==================================================================================

// MAIN APP SECTION===============================================================================
var foodArray = [];
var drinksArray = [];
var eventsArray = [];

$(".drinks-section").hide();
$(".events-section").hide();

$("#drinks-question").on("click", function(){
	$(".drinks-section").show();
	$(".food-section").hide();
	$(".events-section").hide();
	$(".section-title").html("<h2> Select the type of drinks(s) you are thirsty for: </h2> <p style='font-size: 16px;''>Select up to two (2) drinks only.</p>");
});

$("#events-question").on("click", function(){
	$(".events-section").show();
	$(".food-section").hide();
	$(".drinks-section").hide();
	$(".section-title").html("<h2> Select the type of event(s) you are interested in: </h2>");
});

$("#food-question").on("click", function(){
	$(".food-section").show();
	$(".events-section").hide();
	$(".drinks-section").hide();
	$(".section-title").html("<h2> Select the type of food(s) you are craving: </h2>");
});

function food() {
	$(".food").on("click", function(){
		if($(this).attr("data-state")=="unclicked"){
			var selection = $(this).attr("data-name");
			foodArray.push(selection);
			if($(this).attr("data-type")!="caption"){
				$(this).addClass("clicked");
				$("#caption"+$(this).attr("data-name")).attr("data-state","clicked");
			}
			else if($(this).attr("data-type")=="caption"){
				$("#"+$(this).attr("data-name")).addClass("clicked");
				$("#"+$(this).attr("data-name")).attr("data-state","clicked");
			}
			$(this).attr("data-state","clicked");
		}
		else if ($(this).attr("data-state")=="clicked"){
			var selection = $(this).attr("data-name");
			var index = foodArray.indexOf(selection);
			foodArray.splice(index, 1);

			if($(this).attr("data-type")!="caption"){
				$(this).removeClass("clicked");
				$("#caption"+$(this).attr("data-name")).attr("data-state","unclicked");
			}
			else if($(this).attr("data-type")=="caption"){
				$("#"+$(this).attr("data-name")).removeClass("clicked");
				$("#"+$(this).attr("data-name")).attr("data-state","unclicked");
			}
			$(this).attr("data-state","unclicked");
		}
		console.log(foodArray);

	});
}

function drinks() {
	$(".drinks").on("click", function(){
		if($(this).attr("data-state")=="unclicked"){
			if(drinksArray.length<2){
				var selection = $(this).attr("data-name");
				drinksArray.push(selection);

				if($(this).attr("data-type")!="caption"){
					$(this).addClass("clicked");
					$("#caption"+$(this).attr("data-name")).attr("data-state","clicked");
				}
				else if($(this).attr("data-type")=="caption"){
					$("#"+$(this).attr("data-name")).addClass("clicked");
					$("#"+$(this).attr("data-name")).attr("data-state","clicked");
				}
				$(this).attr("data-state","clicked");
			}
		}
		else if ($(this).attr("data-state")=="clicked"){
			var selection = $(this).attr("data-name");
			var index = drinksArray.indexOf(selection);
			drinksArray.splice(index, 1);
			
			if($(this).attr("data-type")!="caption"){
				$(this).removeClass("clicked");
				$("#caption"+$(this).attr("data-name")).attr("data-state","unclicked");
			}
			else if($(this).attr("data-type")=="caption"){
				$("#"+$(this).attr("data-name")).removeClass("clicked");
				$("#"+$(this).attr("data-name")).attr("data-state","unclicked");
			}
			$(this).attr("data-state","unclicked");
		}
	    console.log(drinksArray);
	});
}

function events() {
	$(".events").on("click", function(){
		if($(this).attr("data-state")=="unclicked"){
			var selection = $(this).attr("data-name");
			eventsArray.push(selection);

			if($(this).attr("data-type")!="caption"){
				$(this).addClass("clicked");
				$("#caption"+$(this).attr("data-name")).attr("data-state","clicked");
			}
			else if($(this).attr("data-type")=="caption"){
				$("#"+$(this).attr("data-name")).addClass("clicked");
				$("#"+$(this).attr("data-name")).attr("data-state","clicked");
			}
			$(this).attr("data-state","clicked");
		}
		else if ($(this).attr("data-state")=="clicked"){
			var selection = $(this).attr("data-name");
			var index = eventsArray.indexOf(selection);
			eventsArray.splice(index, 1);
			
			if($(this).attr("data-type")!="caption"){
				$(this).removeClass("clicked");
				$("#caption"+$(this).attr("data-name")).attr("data-state","unclicked");
			}
			else if($(this).attr("data-type")=="caption"){
				$("#"+$(this).attr("data-name")).removeClass("clicked");
				$("#"+$(this).attr("data-name")).attr("data-state","unclicked");
			}
			$(this).attr("data-state","unclicked");
		}
	    console.log(eventsArray);
	});
}

food();
drinks();
events();


//Submit food to firebase
function submit(){
	$("#submitBtn").on("click", function(event){
		event.preventDefault();
	    console.log(eventsArray);
	    console.log(foodArray);
	    console.log(drinksArray);

		var JSONreadyArray = JSON.stringify(username);

		localStorage.setItem("name", JSONreadyArray);

		console.log(JSON.parse(localStorage['name']))
		
		// var preferences = signedIn.child("preferences")
	   database.ref(username).set({
	   		food : foodArray,
	   		drinks : drinksArray,
	   		events : eventsArray
	   	});	   
		   
		initFoodAjax()
		loadSuggestionPage()

	});
}
console.log(JSON.parse(localStorage['name']))

 $(".suggestionsContainer").html("<h2>"+JSON.parse(localStorage['name'])+"</h2>")
//  userHtml.html("<h2>"+JSON.parse(localStorage['name'])+"</h2>")
submit();
// MAIN APP SECTION===============================================================================



// SUGGESTIONS APP SECTION===============================================================================

var mainBanner = "<div class='container'><div class='jumbotron'><h1>[username]'s Suggestions</h1><br/></div></div>"

var foodBanner = "<div class='container'><div class='row'><div class='col-md-12'><div class='suggestions-hero'><img class='hero-image' src='assets/images/restaurants.jpg' alt='restaurants hero image'><h2 class='hero-title'>Eats</h2></div></div></div>"

var drinksBanner = "<div class='container'><div class='row'><div class='col-md-12'><div class='suggestions-hero'><img class='hero-image' src='assets/images/bar.jpg' alt='bar hero image'><h2 class='hero-title'>drinks</h2></div></div></div>"


// var reultContainer = "<div class='row'><div class='col-md-12'><div class='row'></div></div></div>"
// var results = "<div class='row'><div class='col-md-12'><div class='row'><div class='col-md-6 suggestions-list-items'><div class='col-md-6'><a href='#'><img class='thumbnail-suggestions' src='"+restaurants[i].restaurant.thumb+"' alt='test'></a></div><div class='col-md-6'><h2 class='suggestions-h2'>"+estaurants[i].restaurant.name+"</h2><h4>"+restaurants[i].restaurant.location.address+"</h4><br/><p><a class='btn btn-site btn-lg' href='#' id='infoBtn' role='button' data-toggle='modal' data-target='#myModalInfo'>More Info</a></p></div></div></div></div></div>"


// var resultContainer = "<div class='row'><div class='col-md-12'><div class='row'>"+results+results+results+results+"</div></div></div>"

// $(".suggestionsContainer").append(mainBanner+foodBanner+resultContainer+drinksBanner+resultContainer)

var foodCode=[];
function initFoodAjax() {

var foodType="";
		$.ajax({
		url:"https://developers.zomato.com/api/v2.1/cuisines?city_id=278&apikey=142b97a736485a30ff5b9a92ddbb8fde",
		method:"GET"
		}).done(function(response){
		foodCode=response.cuisines;
		console.log(foodCode)
		foodAjax() 
	});
}

function foodAjax() {
    foodType="";
    for(var i=0; i<foodCode.length;i++){
        if(foodArray.indexOf(foodCode[i].cuisine.cuisine_name.toUpperCase())>-1){
            foodType=foodType+"%2C"+foodCode[i].cuisine.cuisine_id.toString();
        }
		console.log(foodType)
    }
    $.ajax({
    url:"https://developers.zomato.com/api/v2.1/search?entity_id=278&entity_type=city&apikey=142b97a736485a30ff5b9a92ddbb8fde&count=4&sort=rating&order=desc&cuisines="+foodType,
    method:"GET"
    }).done(function(response){
        var restaurants=response.restaurants;
		console.log(restaurants)
        for(var i=0; i<restaurants.length;i++){

            var restaurantList = mainBanner+foodBanner+"<div class='row'><div class='col-md-12'><div class='row'><div class='col-md-6 suggestions-list-items'><div class='col-md-6'><a href='#'><img class='thumbnail-suggestions' src='"+restaurants[i].restaurant.thumb+"' alt='test'></a></div><div class='col-md-6'><h2 class='suggestions-h2'>"+restaurants[i].restaurant.name+"</h2><h4>"+restaurants[i].restaurant.location.address+"</h4><br/><p><a class='btn btn-site btn-lg' href='#' id='infoBtn' role='button' data-toggle='modal' data-target='#myModalInfo'>More Info</a></p></div></div></div></div></div>"
        }
		$(".suggestionsContainer").append(restaurantList);
	
        // $(".suggestionsContainer").append(restaurantList);

    });

}



// Drink Suggestions Part

var drinkArray=["Bar", "Coffee shop", "Wine Bar","Juice Bar", "Beer Garden", "Brewery", "Lounge"]
var drinkPickedArray= [];
var drinkCode=[];
var drinkType="";

$.ajax({
    url:"https://developers.zomato.com/api/v2.1/establishments?city_id=278&apikey=142b97a736485a30ff5b9a92ddbb8fde",
    method:"GET"
}).done(function(response){
    drinkCode=response.establishments;
});

for(var i=0; i<drinkArray.length;i++){
    createDrinkButton(drinkArray[i]);
};


$(document).on("click",".drinkButton", function(){
    if($(this).attr("data-state")=="unclicked"){
        if(drinkPickedArray.length<2){
            var drink = $(this).attr("id");
            drinkPickedArray.push(drink.toUpperCase());
            $(this).removeClass("unclicked");
            $(this).attr("data-state","clicked");
        }
        else{alert("You can only pick up to 2 drinks at a time")}
    }
    else if($(this).attr("data-state")=="clicked"){
        var drink = $(this).attr("id");
        var index = drinkPickedArray.indexOf(drink.toUpperCase());
        drinkPickedArray.splice(index,1);
        $(this).addClass("unclicked");
        $(this).attr("data-state","unclicked");
    }
})


$("#drinkSuggestion").on('click',function (event){
    event.preventDefault();
    drinkType="";
    var drinkTypeArray=[];

    for(var i=0; i<drinkCode.length;i++){
        if(drinkPickedArray.indexOf(drinkCode[i].establishment.name.toUpperCase())>-1){
            drinkTypeArray.push(drinkCode[i].establishment.id);
        }
    }

    if(drinkTypeArray.length==1){
       $.ajax({
        url:"https://developers.zomato.com/api/v2.1/search?entity_id=278&entity_type=city&apikey=142b97a736485a30ff5b9a92ddbb8fde&sort=rating&count=4&order=des&establishment_type="+drinkTypeArray[0],
        method:"GET"
        }).done(function(response){
            drink=response.restaurants;
            var drinkList = $("<div>");
            for(var i=0; i<drink.length;i++){
                drinkList.append("<div><p>"+drink[i].restaurant.name+"</p>"+"<p>"+drink[i].restaurant.location.address+"</p>"+"<img src='"+drink[i].restaurant.thumb+"'></div>"+"<br/>")
            }
            $("#DrinkSuggestionResults").html(drinkList);
        }); 
    }
    else if (drinkTypeArray.length==2){
        $("#DrinkSuggestionResults").html("");
        for(var j =0; j < drinkTypeArray.length; j++){
            drinkType=drinkTypeArray[j];
            $.ajax({
            url:"https://developers.zomato.com/api/v2.1/search?entity_id=278&entity_type=city&apikey=142b97a736485a30ff5b9a92ddbb8fde&sort=rating&count=2&order=des&establishment_type="+drinkType,
            method:"GET"
            }).done(function(response){
                drink=response.restaurants;
                var drinkList = $("<div>");
                for(var i=0; i<drink.length;i++){
                    drinkList.append("<div><p>"+drink[i].restaurant.name+"</p>"+"<p>"+drink[i].restaurant.location.address+"</p>"+"<img src='"+drink[i].restaurant.thumb+"'></div>"+"<br/>")
                }
                $("#DrinkSuggestionResults").append(drinkList);
            });
        }
    }
})

function createDrinkButton(drink){
    var button = $("<button>");
    button.addClass("drinkButton");
    button.addClass("unclicked");
    button.attr("id",drink);
    button.attr("data-state","unclicked");
    button.html(drink);
    $("#likeDrink").append(button);
}


// SUGGESTIONS APP SECTION===============================================================================




// Login APP SECTION===============================================================================

// var userData = 
$(".login").on("click", function(event) {
	event.preventDefault()
	var method = $(this).attr("data")
	console.log("hello")
        if (method === "google") {
		googleSignIn();
	
        }
	else if(method === "facebook") {
		facebookSignIn();
		loadReturnUser()
    } 

})




// Login APP SECTION===============================================================================
});