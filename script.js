let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

function renderWorkouts() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  workouts.forEach((workout, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = workout.completed;

    const span = document.createElement("span");
    span.innerText = " " + workout.name;

    if (workout.completed) {
      span.style.textDecoration = "line-through";
      span.style.color = "gray";
    }

    checkbox.onchange = () => {
      workouts[index].completed = checkbox.checked;
      localStorage.setItem("workouts", JSON.stringify(workouts));
      renderWorkouts();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    deleteBtn.onclick = () => {
      workouts.splice(index, 1);
      localStorage.setItem("workouts", JSON.stringify(workouts));
      renderWorkouts();
    };

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";

    editBtn.onclick = () => {
      const newName = prompt("Enter new workout name:");

      if (!newName) return;

      workouts[index].name = newName;

      localStorage.setItem("workouts", JSON.stringify(workouts));
      renderWorkouts();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);

    list.appendChild(li);
  });
}

function addWorkout() {
  const input = document.getElementById("workoutInput");
  const value = input.value;

  if (value === "") return;

  workouts.push({
    name: value,
    completed: false
  });

  localStorage.setItem("workouts", JSON.stringify(workouts));

  input.value = "";
  renderWorkouts();
}

// Load saved data
renderWorkouts();