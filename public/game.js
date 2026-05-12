var map = L.map("map", {
  center: [20, 0],
  zoom: 2,
  minZoom: 2,
  maxZoom: 12,
  zoomControl: false,
  worldCopyJump: true,
  maxBounds: [[-90, -180], [90, 180]],
  maxBoundsViscosity: 1.0,
});

var points = 0;

/* L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO'
}).addTo(map);

/* L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    // Adding this sometimes fixes CORS issues
    maxZoom: 19 
}).addTo(map); */

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
	maxZoom: 12
}).addTo(map);

var questionElement = document.getElementById("question");
var scoreElement = document.getElementById("score");
var nextButton = document.getElementById("next-question");
var timerElement = document.getElementById("timer");

let currentQuestionIdx = 0;
let questions = []; // Will be populated from the server
let isClickable = true;
let timer;
let timeLeft = 30; //seconds

// Fetch questions from the server
fetch(`/api/questions?tag=${tagId}`)
  .then(response => response.json())
  .then(data => {
    questions = data.questions;
    loadQuestion();
  })
  .catch(error => console.error('Error fetching questions:', error));

var startTimer = () => {
  clearInterval(timer);
  timeLeft = 30;
  updateTimer();

  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      handleTimeout();
    }
  },1000);
};
var updateTimer = () => {
  timerElement.textContent = `Time: ${timeLeft}s`;
};

var handleTimeout = () => {
  isClickable = false;
  clearInterval(timer);
  var currentQuestion = questions[currentQuestionIdx]
  currentQuestionIdx++;
  questionElement.textContent = `Time is up! Answer was ${currentQuestion.Answer}`;
  showCorrectLocation(null , currentQuestion.lat, currentQuestion.lng);
}

var loadQuestion = () => {
  if (questions.length === 0) return;

  if (currentQuestionIdx >= questions.length) {
    clearInterval(timer);
    questionElement.textContent = `Game Finished!`;

    document.getElementById("final-score-display").textContent = points;
    document.getElementById("end-game-modal").style.display = "flex";

    if(currentUser !== "") {
      saveScore(points);
    }
    updateTimer();
  }
  else{
    map.setZoom(2, { animate: true });
    isClickable = true;
    var currentQuestion = questions[currentQuestionIdx];
    questionElement.textContent = currentQuestion.question;
    startTimer();
  }
}

var showCorrectLocation = (e, lat, lng) => {
  var marker = L.marker([lat, lng], {
    icon: L.divIcon({
      className: "correct-location",
      html: '<div style="background: red; width: 15px; height: 15px; border-radius: 50%; border-style: solid; border-color:white;"></div>',
      iconSize: [15, 15],
      iconAnchor: [8, 6]
    }),
  }).addTo(map);

  if (e == null) {
    //no answer, so only look at correct location
    map.setView([lat,lng], 6, {animated: true});
    setTimeout(() => {
      map.removeLayer(marker);
      loadQuestion();
    }, 3000)
    
  } else {
    var guesslat = e.latlng.lat;
    var guesslng = e.latlng.lng;
    var guessMarker = L.marker([guesslat, guesslng], {
      icon: L.divIcon({
        className: "guess-location",
        html: '<div style="background: yellow; width: 15px; height: 15px; border-radius: 50%; border-style: solid; border-color:white;"></div>',
        iconSize: [15, 15],
        iconAnchor: [8, 6]
      }),
    }).addTo(map);

    var polyline = L.polyline([
      [guesslat, guesslng], [lat, lng]
    ], {
      color: 'black'
    }).addTo(map);

    map.fitBounds(polyline.getBounds(), { padding: [50,50], animate: true } );

    setTimeout(() => {
      map.removeLayer(marker);
      map.removeLayer(guessMarker);
      map.removeLayer(polyline);
      loadQuestion();
    }, 3000)
  }
}

function scoreMultiplier(timeRemaining, minimum) {
  if (timeRemaining <= minimum) return minimum / 30;
  return timeRemaining / 30;
}

var checkAnswer = (e) => {
  if(!isClickable) return;

  isClickable = false;
  clearInterval(timer);
  var currentQuestion = questions[currentQuestionIdx];
  var lat = e.latlng.lat;
  var lng = e.latlng.lng;

  var distance = map.distance(
    [lat, lng],
    [currentQuestion.lat, currentQuestion.lng]
  )

  // currentPoints is calculated via an exponential decay function.
  // Assuming the average city has a radius of 30km, guessing at the edge gives a score of ~740, which we think is fair.
  // It is then scaled by a time multiplier which floors at (score * 1.3) with <=10s remaining
  var currentPoints = Math.round(1000 * Math.exp(-distance / 100000) * scoreMultiplier(timeLeft, 10));
  points += currentPoints;
  scoreElement.textContent = `Score: ${points}`;
  showCorrectLocation(e, currentQuestion.lat, currentQuestion.lng);

  questionElement.textContent = "The Answer was " + currentQuestion.Answer + ". You got " + currentPoints + " points!";

  
  currentQuestionIdx = (currentQuestionIdx + 1);
}

function saveScore(finalPoints) {
  fetch('api/save-score', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ score : finalPoints }),
  })
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch((error) => console.error('Error:', error));
}

map.on("click", checkAnswer);
// Maybe good for confimation picks (really close to geoguesser honestly) -- not high priority
//nextButton.addEventListener("click", () => {
//  currentQuestionIdx = (currentQuestionIdx + 1) % questions.length;
//  loadQuestion();
//})
