const timerDisplay = document.getElementById("timer");
const timerDuration = 20 * 60 * 1000; // 20 minutes in milliseconds

// Set or get the global start time (either from localStorage or set a new one)
let globalStartTime = localStorage.getItem("globalStartTime");

if (!globalStartTime) {
    globalStartTime = new Date().getTime(); // Set current time as start time
    localStorage.setItem("globalStartTime", globalStartTime); // Save to localStorage
}

// Function to calculate remaining time from the global start time
function getRemainingTime() {
    const now = new Date().getTime(); // Get the current time
    const elapsed = now - globalStartTime; // Calculate the time elapsed since the timer started
    return timerDuration - (elapsed % timerDuration); // Remaining time in the current 20-minute interval
}

// Function to update the timer display
function updateTimerDisplay() {
    const timeRemaining = getRemainingTime(); // Calculate the remaining time

    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Start the timer immediately and update the display every second
function startTimer() {
    updateTimerDisplay(); // Update the timer display immediately on page load
    setInterval(updateTimerDisplay, 1000); // Update the timer display every second
}

startTimer(); // Start the countdown