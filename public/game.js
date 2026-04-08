// Initialize map
//const map = L.map("map").setView([20, 0], 2);
var map = L.map("map", {
  center: [20, 0],
  zoom: 2,
  zoomControl: false,
  worldCopyJump: true
})
var points = 0;

/* L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO'
}).addTo(map);

/* L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    // Adding this sometimes fixes CORS issues
    maxZoom: 19 
}).addTo(map); */

L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
fetch('/api/questions')
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
  showCorrectLocation(currentQuestion.lat, currentQuestion.lng);
}


var loadQuestion = () => {
  if (questions.length === 0) return;
  if (currentQuestionIdx >= questions.length) {
    clearInterval(timer);
    questionElement.textContent = `Your Final Score: ${points}`
    updateTimer();
    //alert(`Your final score is ${points}.`);
  }
  else{
    isClickable = true;
    var currentQuestion = questions[currentQuestionIdx];
    questionElement.textContent = currentQuestion.question;
    startTimer();
  }
}

var showCorrectLocation = (lat, lng) => {
  var marker = L.marker([lat, lng], {
    icon: L.divIcon({
      className: "correct-location",
      html: '<div style="background: red; width: 15px; height: 15px; border-radius: 50%; border-style: solid; border-color:white;"></div>',
      iconSize: [15, 15],
      iconAnchor: [8, 6]
    }),
  }).addTo(map);
  map.flyTo([lat, lng], 6, {
    animate: true,
    duration: 1,
  });

  setTimeout(() => {
    map.removeLayer(marker);
    loadQuestion();
  }, 3000)
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
  //maybe add timer options for extra points? KINDA PUNISHING FOR BIG CITIES!
  var currentPoints = Math.max(0, 1000 - Math.floor(distance / 15000) * 100);
  points +=  currentPoints;
  scoreElement.textContent = `Score: ${points}`;
  showCorrectLocation(currentQuestion.lat, currentQuestion.lng);
  questionElement.textContent = "The Answer was " + currentQuestion.Answer + ". You got " + currentPoints + " points!";

  
  currentQuestionIdx = (currentQuestionIdx + 1);
}

map.on("click", checkAnswer);
// Maybe good for confimation picks (really close to geoguesser honestly) -- not high priority
//nextButton.addEventListener("click", () => {
//  currentQuestionIdx = (currentQuestionIdx + 1) % questions.length;
//  loadQuestion();
//})