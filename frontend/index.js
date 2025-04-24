//DropDownMenu
const userIcon = document.getElementById("userIcon");
const dropdown = document.getElementById("loginDropdown");

userIcon.addEventListener("click", () => {
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
});

window.addEventListener("click", (e) => {
  if (!userIcon.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = "none";
  }
});

// SwitchPhotos
const photoDiv = document.getElementById("photoDiv");
const images = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1508264165352-258db2ebd59b?auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80",
  "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
];

let currentImage = 0;

const updatePhoto = () => {
  photoDiv.style.backgroundImage = `url('${images[currentImage]}')`;
};

document.getElementById("prevBtn").addEventListener("click", () => {
  currentImage = (currentImage - 1 + images.length) % images.length;
  updatePhoto();
});

document.getElementById("nextBtn").addEventListener("click", () => {
  currentImage = (currentImage + 1) % images.length;
  updatePhoto();
});

updatePhoto();
// Backend 
import config from './config.js';

console.log('API URL:', config.API_URL);
