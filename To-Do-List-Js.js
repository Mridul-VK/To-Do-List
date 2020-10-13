//span tag is being cleared
document.getElementById("errTxt").innerHTML = "";

//updating whatever is shown on the DOM
updateTasks();

//accessing the input
let input = document.getElementById("taskInput");

//accessing the Add Button
let add_btn = document.getElementById("add_btn");

//accessing the Update Button
let save_btn = document.getElementById("save_btn");

//Adding eventListners to the buttons accessed above
add_btn.addEventListener("click", validateAndAdd);
save_btn.addEventListener("click", saveTask);




//Validation, adding to Local Storage and showing on DOM
function validateAndAdd() {

    //Validation
    let checks = /^([A-Za-z0-9\ \-\_\:])+$/
    let result = checks.test(input.value.trim());
    if (result) {
        //collecting data from local storage
        let tasks = localStorage.getItem("localtask");
        if (tasks == null) {
            tasksArr = [];
        } else {
            tasksArr = JSON.parse(tasks);
        }

        //putting value into the Array.
        tasksArr.push(input.value.trim());

        // putting tasksArr into LocalStorage
        localStorage.setItem("localtask", JSON.stringify(tasksArr));

        //updating whatever is shown on the DOM
        updateTasks();

        //input border color changed
        input.style.borderColor = "lightgrey";

        //Clearing path for next input
        input.value = "";

        //Keeping the error msg box empty
        document.getElementById("errTxt").innerHTML = "";

        //Validation continue...
    } else if (input.value.trim() == "") {
        //entering msg in span tag
        document.getElementById("errTxt").innerHTML = "Task cannot be empty";
        //styling
        document.getElementById("errTxt").style.color = "red";

        //focussing on input for re-trying
        input.focus();

        //setting error border color
        input.style.borderColor = "#dc3545";
    } else {
        //entering msg in span tag
        document.getElementById("errTxt").innerHTML = "Special characters aren't allowed to be used";
        //styling
        document.getElementById("errTxt").style.color = "red";

        //focussing on input for re-trying
        input.focus();

        //setting error border color
        input.style.borderColor = "#dc3545";
    }
}









//Updating List on DOM
function updateTasks() {
    //collecting data from local storage
    let tasks = localStorage.getItem("localtask");
    if (tasks == null) {
        tasksArr = [];
    } else {
        tasksArr = JSON.parse(tasks);
    }

    //creating an empty variable
    let html = '';

    //Accessing the task list table
    let taskListTable = document.getElementById("taskListTable");

    tasksArr.forEach((userTasks, index) => {
        html += `<tr>
                    <th scope="row">${index + 1}</th>
                    <td>${userTasks}</td>
                    <td><button class="btn" onclick="editTask(${index})">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    width="24" height="24"
                    viewBox="0 0 172 172"
                    style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#2ecc71"><path d="M86,14.33333c-19.72655,0 -35.83333,16.1068 -35.83333,35.83333c0,19.72653 16.10679,35.83333 35.83333,35.83333c19.72655,0 35.83333,-16.1068 35.83333,-35.83333c0,-19.72653 -16.10679,-35.83333 -35.83333,-35.83333zM86,25.08333c13.91682,0 25.08333,11.16652 25.08333,25.08333c0,13.91681 -11.16651,25.08333 -25.08333,25.08333c-13.91682,0 -25.08333,-11.16652 -25.08333,-25.08333c0,-13.91681 11.16651,-25.08333 25.08333,-25.08333zM148.75732,86c-4.11635,0.0009 -8.22885,1.56609 -11.35889,4.69613l-43.06299,43.05599c-1.11442,1.11083 -1.92156,2.49809 -2.35156,4.01025l-5.77393,20.21224c-0.53392,1.87408 -0.01842,3.89743 1.36474,5.27702c1.02125,1.02125 2.39904,1.57471 3.80729,1.57471c0.4945,0 0.98239,-0.07021 1.46973,-0.20996l20.22624,-5.77393c1.51933,-0.43358 2.90692,-1.25148 3.99626,-2.35156l43.05599,-43.05599c3.0315,-3.03867 4.70313,-7.08005 4.70313,-11.37288c0,-4.29283 -1.67504,-8.3308 -4.71012,-11.36589c-3.13362,-3.13363 -7.24953,-4.69702 -11.36589,-4.69613zM44.79167,100.33333c-8.89025,0 -16.125,7.23475 -16.125,16.125v2.73649c0,8.43517 3.50987,16.54078 9.63021,22.24186c7.18458,6.68292 19.91701,14.50544 40.72542,15.97103c0.07525,-0.46942 0.16136,-0.93749 0.29395,-1.39974l2.62451,-9.18229c-19.0275,-0.84567 -30.19949,-7.56861 -36.31624,-13.26253c-3.94525,-3.67292 -6.20785,-8.90733 -6.20785,-14.36833v-2.73649c0,-2.96342 2.41158,-5.375 5.375,-5.375h62.08545l10.75,-10.75z"></path></g></g></svg>
                    Edit</button></td>
                    <td><button class="btn btn-primary btn-danger btn-sm" onclick="remove_task(${index})">Delete</button></td>
                </tr>`
    });

    //assigning updated variable to the task list table
    taskListTable.innerHTML = html;

}







//Edit Button
function editTask(x) {
    //getting the index of selected task
    let saveIndex = document.getElementById("saveIndex");
    saveIndex.value = x;

    //collecting data from local storage
    let tasks = localStorage.getItem("localtask");
    tasksArr = JSON.parse(tasks);

    //collecting value into the input area
    let task_At_Selected_Index = tasksArr[x]
    input.value = task_At_Selected_Index;

    //additional help
    input.focus();

    //changing button
    save_btn.style.display = "block";
    add_btn.style.display = "none";

    //clearing the error msg
    document.getElementById("errTxt").innerHTML = "";
}








//Update Button
function saveTask() {
    //collecting data from local storage
    let tasks = localStorage.getItem("localtask");
    tasksArr = JSON.parse(tasks);

    //collecting stored index of selected element
    let saveIndex = document.getElementById("saveIndex").value;

    //Validating whatever the person has entered
    let checks = /^([A-Za-z0-9\ ])+$/
    let result = checks.test(input.value.trim());
    if (result) {
        //replacing the task name in Array at selected index by the new value inside the input
        tasksArr[saveIndex] = input.value.trim();

        //replacing the task name in Local Storage at selected index by the new value inside the input
        localStorage.setItem("localtask", JSON.stringify(tasksArr));

        //updating whatever is shown on the DOM
        updateTasks();

        //clearing the error msg
        document.getElementById("errTxt").innerHTML = "";

        //input border color changed
        input.style.borderColor = "lightgrey";

        //Clearing path for next input
        input.value = "";

        //Changing button
        save_btn.style.display = "none";
        add_btn.style.display = "block";

        //Validation
    } else if (input.value.trim() == "") {
        //Changing button
        save_btn.style.display = "block";
        add_btn.style.display = "none";

        //entering msg in span tag
        let errMsg1 = "Task cannot be empty";
        document.getElementById("errTxt").innerHTML = errMsg1;
        document.getElementById("errTxt").style.color = "red";

        //Help for the user
        input.focus();

        //setting error colour
        input.style.borderColor = "#dc3545";
    } else {
        //Changing button
        save_btn.style.display = "block";
        add_btn.style.display = "none";

        //entering msg in span tag
        let errMsg2 = "Special characters aren't allowed to be used";
        document.getElementById("errTxt").innerHTML = errMsg2;
        document.getElementById("errTxt").style.color = "red";

        //Help for the user
        input.focus();

        //setting error colour
        input.style.borderColor = "#dc3545";
    }
}








//Single Task Delete Button
function remove_task(x) {
    //collecting data from local storage
    let tasks = localStorage.getItem("localtask");
    tasksArr = JSON.parse(tasks);

    //start deleting from "x" and end deleting as soon as 1 element is deleted
    tasksArr.splice(x, 1);

    //updating storage
    localStorage.setItem("localtask", JSON.stringify(tasksArr));

    //updating whatever is shown on the DOM
    updateTasks();
    document.getElementById("errTxt").innerHTML = "";
}







//DeleteAll button
let deleteAll_btn = document.getElementById("deleteAll_btn");
deleteAll_btn.addEventListener("click", deleteAll);

function deleteAll() {
    //collecting data from local storage
    let tasks = localStorage.getItem("localtask");
    tasksArr = JSON.parse(tasks);

    //emptying Array in Local Storage
    if (tasks == null) {
        tasksArr = [];
    } else {
        tasksArr = JSON.parse(tasks);
        tasksArr = [];
    }

    //updating storage
    localStorage.setItem("localtask", JSON.stringify(tasksArr));

    //Empty table
    let errMsg3 = "<b>Woala! No more tasks left to be done</b>";
    document.getElementById("errTxt").innerHTML = errMsg3;
    document.getElementById("errTxt").style.color = "darkcyan";

    //Clearing path for next input
    input.value = "";

    //Changing button
    save_btn.style.display = "none";
    add_btn.style.display = "block";

    //updating whatever is shown on the DOM
    updateTasks();
}







//Search Bar
let searchBar = document.getElementById("searchBar");
searchBar.addEventListener("input", findTask);


function findTask() {
    let searchBarValue = searchBar.innerText.toLowerCase();

    let taskList = document.querySelectorAll("tr");

    Array.from(taskList).forEach((item) => {
        let taskNames = item.getElementsByTagName("td")[0].innerText.toLowerCase();
        if (taskNames.includes(searchBarValue)) {
            item.style.display = "table-row";
        } else {
            item.style.display = "none";
        }
    })
}