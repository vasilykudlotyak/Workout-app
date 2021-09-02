//Selectors

const workoutInput = document.querySelector('.workout-input'); 
const workoutButton = document.querySelector('.workout-button'); 
const workoutList = document.querySelector('.workout-list'); 
const filterOption = document.querySelector('.filter-workout');

//Event-Listeners
document.addEventListener('DomContentLoaded', getWorkouts);
workoutButton.addEventListener('click', addWorkout);
workoutList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterWorkout);

//Functions

function addWorkout(event) {
    event.preventDefault();
    //workout Div
    const workoutDiv = document.createElement('div');
    workoutDiv.classList.add('workout');
    //Create LI 
    const newWorkout = document.createElement('li');
    newWorkout.innerText = workoutInput.value;
    newWorkout.classList.add('workout-item');
    workoutDiv.appendChild(newWorkout);
    //Add workout to localstorage
    saveLocalWorkouts(workoutInput.value);
    //Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('completed-btn');
    workoutDiv.appendChild(completedButton);

    //Check Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    workoutDiv.appendChild(trashButton);
    //Append to list
    workoutList.appendChild(workoutDiv);
    //Clear Workout input value
    workoutInput.value = "";
}

function deleteCheck(e) {
const item = e.target;
//Delete workout
if(item.classList[0] === 'trash-btn') {
    const workout = item.parentElement;
    //Animation
    workout.classList.add('fall');
    //Remove workout
    workout.addEventListener('transitionend', function() {
        workout.remove();    
    })
}

// Check mark
if(item.classList[0] === 'completed-btn') {
    const workout = item.parentElement;
    workout.classList.toggle('completed');
    }
}

function filterWorkout(e) {
 const workouts = workoutList.childNodes;
 workouts.forEach(function(workout) {
    switch(e.target.value) {
        case 'all':
            workout.style.display = 'flex';
            break;
        case 'completed':
            if(workout.classList.contains('completed')) {
                workout.style.display = 'flex';
            }else {
                workout.style.display = 'none'
            }   
            break; 
        case 'uncompleted':
            if(!workout.classList.contains('completed')) {
                    workout.style.display = 'flex';
            } else {
                workout.style.display = 'none';
            }
    }
 });
}

function saveLocalWorkouts(workout) {
    // Check if i already have something stored
    let workouts;
    if(localStorage.getItem('workouts') === null) {
        workouts = [];
    } else {
        workouts = JSON.parse(localStorage.getItem('workouts'));
    } 

    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts));
}

function getWorkouts() {
    console.log('hello');
    let workouts;
    if(localStorage.getItem('workouts') === null) {
        workouts = [];
    } else {
        workouts = JSON.parse(localStorage.getItem('workouts'));
    } 
    workouts.forEach(function (workout){
        //workout Div
    const workoutDiv = document.createElement('div');
    workoutDiv.classList.add('workout');
    //Create LI 
    const newWorkout = document.createElement('li');
    newWorkout.innerText = workout;
    newWorkout.classList.add('workout-item');
    workoutDiv.appendChild(newWorkout);

    //Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('completed-btn');
    workoutDiv.appendChild(completedButton);
    //Check Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    workoutDiv.appendChild(trashButton);
    //Append to list
    workoutList.appendChild(workoutDiv);
    })
}
