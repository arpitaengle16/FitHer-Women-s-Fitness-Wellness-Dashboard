Document.addEventListener("DOMContentLoaded", function () {
    const selectedWorkouts = document.getElementById("selected-workouts");
    if (!selectedWorkouts) return; // Prevents errors if the element is missing

    function getStoredWorkouts() {
        return JSON.parse(localStorage.getItem("workouts")) || [];
    }

    function updateWorkoutList() {
        selectedWorkouts.innerHTML = "";
        const workouts = getStoredWorkouts();

        workouts.forEach(workout => {
            const li = document.createElement("li");
            li.textContent = workout;

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.onclick = () => removeWorkout(workout);
            li.appendChild(removeBtn);

            selectedWorkouts.appendChild(li);
        });
    }

    function addWorkout(workout) {
        let workouts = getStoredWorkouts();
        if (!workouts.includes(workout)) {
            workouts.push(workout);
            localStorage.setItem("workouts", JSON.stringify(workouts));
            updateWorkoutList();
        }
    }

    function removeWorkout(workout) {
        let workouts = getStoredWorkouts();
        workouts = workouts.filter(w => w !== workout); // Removes all occurrences
        localStorage.setItem("workouts", JSON.stringify(workouts));
        updateWorkoutList();
    }

    updateWorkoutList();
    
    window.addWorkout = addWorkout;
    async function sendMessage() {
        let userInput = document.getElementById("user-input").value;
        if (!userInput) return;
    
        let chatBox = document.getElementById("chat-box");
    
        // Display user message
        chatBox.innerHTML += `<div><b>You:</b> ${userInput}</div>`;
    
        // Send request to backend (ChatGPT API)
        let response = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput })
        });
    
        let data = await response.json();
    
        // Display chatbot response
        chatBox.innerHTML += `<div><b>Bot:</b> ${data.reply}</div>`;
        document.getElementById("user-input").value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    function ToggleAdvise() {
        let cardiobox = document.getElementById("cardio-box");
        
        // Toggle visibility
        if (cardiobox.style.display === "none" || cardiobox.style.display === " ") {
            cardiobox.style.display = "block";  // Show tips
        } else {
            cardiobox.style.display = "none";   // Hide tips
        }
    }   

});

    