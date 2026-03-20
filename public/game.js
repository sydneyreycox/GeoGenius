// Initialize map
const map = L.map("map").setView([20, 0], 2);
var points = 0;

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const questionElement = document.getElementById("question");
const scoreElement = document.getElementById("score");
const nextButton = document.getElementById("next-question");

let currentQuestionIdx = 0;
let questions = []; // Will be populated from the server

// Fetch questions from the server
fetch('/api/questions')
  .then(response => response.json())
  .then(data => {
    questions = data.questions;
    //currentQuestionIdx = Math.random() * questions.length | 0; // Start with a random question
    loadQuestion();
  })
  .catch(error => console.error('Error fetching questions:', error));

const loadQuestion = () => {
  if (questions.length === 0) return;
  if (currentQuestionIdx >= questions.length) {
    alert(`Your final score is ${points}.`);
  }
  else{
    const currentQuestion = questions[currentQuestionIdx];
    questionElement.textContent = currentQuestion.question;
  }
}

const showCorrectLocation = (lat, lng) => {
  const marker = L.marker([lat, lng], {
    icon: L.divIcon({
      className: "correct-location",
      html: '<div style="background: red; width: 12px; height: 12px; border-radius: 50%;"></div>',
      iconSize: [12, 12],
      iconAnchor: [8, 6]
    }),
  }).addTo(map);

  setTimeout(() => {
    map.removeLayer(marker);
    loadQuestion();
  }, 3000)
}

const checkAnswer = (e) => {
  const currentQuestion = questions[currentQuestionIdx];
  const lat = e.latlng.lat;
  const lng = e.latlng.lng;

  const distance = map.distance(
    [lat, lng],
    [currentQuestion.lat, currentQuestion.lng]
  )

  var currentPoints = Math.floor(distance / 15000) * 100;
  points +=  Math.max(0, 1000 - (currentPoints));
  //alert(`you got ${points}!`)
  scoreElement.textContent = `Score: ${points}`;
  showCorrectLocation(currentQuestion.lat, currentQuestion.lng);

  
  currentQuestionIdx = (currentQuestionIdx + 1); //% questions.length;
}

map.on("click", checkAnswer);
//
//nextButton.addEventListener("click", () => {
//  currentQuestionIdx = (currentQuestionIdx + 1) % questions.length;
//  loadQuestion();
//})
