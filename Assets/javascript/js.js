var config = {  apiKey: "AIzaSyBVsGaap3e_loRKyvkKbddXWWrEf7Fa7lA",
authDomain: "crossroad-ccc2e.firebaseapp.com",
databaseURL: "https://crossroad-ccc2e.firebaseio.com",
projectId: "crossroad-ccc2e",
storageBucket: "crossroad-ccc2e.appspot.com",
messagingSenderId: "995481372079"
};

firebase.initializeApp(config);
var database = firebase.database();
<script src="https://www.gstatic.com/firebasejs/5.2.0/firebase.js"></script>

var trainname = "";

var destination = "";

var firsttime = "";

var frequency = "";

$("#addtrains").on("click", function(event){

	event.preventDefault(); 

	trainname = $("#train-input").val().trim();

	destination = $("#destination-input").val().trim();

	firsttime = $("#firsttrain-input").val().trim();

	frequency = $("#frequency-input").val().trim();



	$("#train-input").val("");

	$("#destination-input").val("");

	$("#firsttrain-input").val("");

	$("#frequency-input").val("");


	database.ref().push({

		trainname: trainname,

		destination: destination,

		firsttime: firsttime,

		frequency: frequency

	});

});

    database.ref().on("child_added", function(childSnapshot) {

      console.log(childSnapshot.val());



      trainname = childSnapshot.val().trainname;

      destination = childSnapshot.val().destination

      firsttime = childSnapshot.val().firsttime;

      frequency = childSnapshot.val().frequency;


      var firsttimeMoment = moment(firsttime, "HH:mm");

      
      var currenttime = moment();


      var minuteArrival = currenttime.diff(firsttimeMoment, 'minutes');

      var minuteLast = minuteArrival % frequency;

      var awayTrain = frequency - minuteLast;



      var nextArrival = currenttime.add(awayTrain, 'minutes');

      var arrivaltime = nextArrival.format("HH:mm");

	$("#AddTrain").append("<tr><td>" + trainname + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrivaltime + "</td><td>" + awayTrain + "</td>");