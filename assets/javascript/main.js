
//SETUP FIREBASE =======================================================
var config = {
    apiKey: "AIzaSyDo8x3O1sKSsM_A9zUaEx5-I3rkw9rq-tI",
    authDomain: "click-count-14417.firebaseapp.com",
    databaseURL: "https://click-count-14417.firebaseio.com",
    projectId: "click-count-14417",
    storageBucket: "click-count-14417.appspot.com",
    messagingSenderId: "876288948213"
  };

  firebase.initializeApp(config);
  
  var database = firebase.database();

  //MAIN ACTION =========================================================

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    //  User input
    let trainName = $("#train-name-input").val().trim();
    let trainDest = $("#destination-input").val().trim();
    let arrvTime = $("#arrival-time-input").val().trim();
    let frequencyTime = $("#frequency-input").val().trim();
    // var arrvTime = moment($("#arrival-time-input").val().trim(), "MM/DD/YYYY").format("X");
  
    // Local object for holding data
    var newTrain = {
      name: trainName,
      destination: trainDest,
      arrival: arrvTime,
      frequency: frequencyTime
    };
  
    //PUSH DATA TO DB
    database.ref().push(newTrain);
  
    //CONSOLE LOG TO TEST
    // console.log(newTrain.trainName);
    // console.log(newTrain.destination);
    // console.log(newTrain.arrival);
    // console.log(newTrain.frequency);
  
    // alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#arrival-time-input").val("");
    $("#frequency-input").val("");
  });

  //After new entry added, call the snapshot from the db and populate board

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val()); // for test
  
    // Store data into variables
    let trainName = childSnapshot.val().name;
    let trainDestination = childSnapshot.val().destination;
    let arrTime = childSnapshot.val().arrival;
    let trainFrequency = childSnapshot.val().frequency;
  
    // Train Info for test
    // console.log(trainName);
    // console.log(trainDestination);
    // console.log(arrTime);
    // console.log(trainFrequency);

    //TODO: Calculate next arrival time using the moment.js script
  
    // Create the new row
    let newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(arrTime),
      $("<td>").text(trainFrequency),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
