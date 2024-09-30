let taskListarr      = []
let highLightListarr = []
let reminderListarr  = []
let tempTask         = []
let highLightListBtn = document.getElementById("highlightsListBtn")
let highLightList    = document.getElementById("highlightedList")
let highLightBtn     = document.getElementById("Highlight")
let reminderListBtn  = document.getElementById("remindersListBtn")
let reminderList     = document.getElementById("reminderList")
let reminderBtn      = document.getElementById("Reminder")
let todoList         = document.getElementById("todoList")
let searchInput      = document.getElementById("SearchBox")
let searchBtn        = document.getElementById("Search")
let navHighLightBtn  = document.getElementById("Highlight")
let navReminderBtn   = document.getElementById("Reminder")
let navSelectAllBtn  = document.getElementById("SelectAll")
let navDeleteBtn     = document.getElementById("Delete")
let noTask           = document.getElementById("noTask")
let backBtn          = document.getElementById("back")
let taskDiv          = document.getElementById("Task")
let taskol           = document.getElementById("taskOl")
let form             = document.getElementById("Form")
let warning          = document.getElementById("warning")
let Subject          = document.getElementById("Subject")
let Description      = document.getElementById("Description")   
let createTask       = document.getElementById("createTask")
let addTask          = document.getElementById("addTask")
let cancelTask       = document.getElementById("cancelTask")
let confirmBtn       = document.getElementById("confirm")
let sr = 0
let tempName;



createTask.addEventListener('click',()=>{
    form.style.display       = "flex"
    addTask.style.display    = "block"
    Subject.value     = ""
    Description.value = ""
    confirmBtn.style.display = "none"
    createTask.style.display = "none"
})

cancelTask.addEventListener('click',()=>{
    form.style.display = "none"
    createTask.style.display = "block"
})

addTask.addEventListener('click',addTaskarr)
function addTaskarr(){
    var sub    = Subject.value
    var desc  = Description.value
    let found = false
    for(i = 0 ; i < taskListarr.length ; i++){
        let temp = taskListarr[i]
        if(temp.Subject.trim().toLowerCase() == sub.trim().toLowerCase()){
            found = true
            break;
        }
    }
    if(Subject.value == "" || Description.value == ""){
        warning.innerText = "Input Field Cannot Be Empty!"
        // console.log("yeto chalra he")
    }else{
        if(found){
            warning.innerText = "The Task with the same Subject is Already Exist!"
        }else{

            console.log(sub,desc)
            let taskList ={
                index        : sr  ,
                Subject      : sub ,
                Description  : desc
            }
            taskListarr.push(taskList)
            Subject.value     = ""
            Description.value = ""
            warning.innerHTML = ""
            console.log(taskListarr)
            showTask()
        }
    }
}

function showTask(){
    taskDiv.innerHTML = ""
    noTask.innerText = ""
    let ol       = document.createElement("ol")
    ol.className = "taskOl"
    ol.id        = "taskol"
    for(i = 0 ; i < taskListarr.length ; i++){
        let temp = taskListarr[i]
        let li       = document.createElement("li")
        li.innerHTML = `
        <div class= "taskLi">
        <span class="sr"><input type="checkbox" id="checkBox"></span>
        <span class="taskSubject">${temp.Subject}</span>
        <button class ="editBtn">Edit</button>
        </div>
        <p class="taskDescription">${temp.Description}</p>
        `;
        ol.append(li)
        sr = i+1
        li.addEventListener('click',displayDescription)
        li.querySelector(".editBtn").addEventListener('click',editTask)
    }
    // console.log(sr)
    taskDiv.append(ol)


}

function displayDescription(event){
    let li    = event.target.closest(".taskLi")
    let desc  = li.nextElementSibling
    // console.log(li)
    // console.log(desc)
    if(desc.style.display =="none" || desc.style.display ==""){
        desc.style.display = "inline-block"
    }else{
        desc.style.display = "none"
    }
}

function editTask(event){
    addTask.style.display    = "none"
    confirmBtn.style.display = "block"
    let li    = event.target.closest(".taskLi")
    let sub   = li.querySelector(".taskSubject").innerText
    let desc  = li.nextElementSibling.innerText
    Subject.value      = sub
    tempName           = sub
    Description.value  = desc
    warning.innerText  = ""
    form.style.display = "flex"
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

confirmBtn.addEventListener('click',()=>{
    let sub = Subject.value
    let desc = Description.value
    let taskFound = false
    let skipName;
    let tempNum;
    let displayUpdate = false
// this function check taskList before updating the task, that if the task with same subject 
// is exist except for the updating task it shows message that task subject is already exist.
// i create thhis functionality beacause i create a feature in which user can't create the task  
// with the same subject so when he create the task with the same subject he immediatelly remember  
// that he already have a task with that subject
    for(i = 0 ; i < taskListarr.length ; i++){
        let temp = taskListarr[i]
        if(temp.Subject.trim().toLowerCase() == tempName.trim().toLowerCase()){
            tempNum = i
            console.log("phela if , i : ",i)
        }
            for(j = 0 ; j < taskListarr.length ; j++){
                let temp1 = taskListarr[j]
                if(tempNum >=0){
                    if(j == tempNum){
                        skipName = temp.Subject
                    }else if(temp1.Subject.trim().toLowerCase() == sub.trim().toLowerCase()){
                        console.log(`tempnum = ${tempNum} and i = ${i} and j = ${j} taskListarr[${temp1.Subject}] and tempName = ${tempName} and current Subject = ${sub}`)
                        taskFound = true
                    }
                }
            }
    }
    console.log(taskFound)
    if(taskFound == false){  

            let hFound = false
            let rFound = false

            for(j = 0 ; j < highLightListarr.length ; j++){
                if(taskListarr[tempNum].Subject == highLightListarr[j]){
                    highLightListarr[j] = sub
                    hFound = true
                    break
                }
            }

            for(k = 0 ; k < reminderListarr.length ; k++){
                if(taskListarr[tempNum].Subject == reminderListarr[k]){
                    reminderListarr[k] = sub
                    console.log(`reminder list match ${reminderListarr[k]}`)
                    rFound = true
                    break
                }  
            }
            console.log(` before edit task name ${taskListarr[tempNum]}`)
            
            console.log(taskFound)
            taskListarr[tempNum].Subject = sub
            taskListarr[tempNum].Description = desc
            console.log("task array me update hogaya")
            form.style.display = "none"
            createTask.style.display = "block"
            showTask()
            if(hFound === true){
                highLightTask()
            }
            if(rFound === true){
                displayUpdate = true
                reminderTask(displayUpdate)
            }
            warning.innerText = ""

    }else{
        warning.innerText = "The Task with the same Subject is Already Exist!"
    }
    taskDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backBtn.style.display =  "none"
})

searchBtn.addEventListener('click',searchTask)

function searchTask(){
    taskDiv.innerHTML = ""
    let subject = searchInput.value
    let found = false
    if(searchInput.value == ""){
        searchInput.value = "input field cannot be empty"
    }else{

        for(i = 0 ; i < taskListarr.length ; i++){
            let temp = taskListarr[i]
        if(subject.trim().toLowerCase() == temp.Subject.trim().toLowerCase()){
            found = true
            tempTask.push(taskListarr[i])
            break
        }
    }
    if(found == false){
        noTask.innerText = "No Task found"
        backBtn.style.display =  "block"
        console.log(noTask)
    }else{
        taskDiv.innerHTML = ""
        let ol       = document.createElement("ol")
        ol.className = "taskOl"
        ol.id        = "taskol"
        for(i = 0 ; i < tempTask.length ; i++){
            let temp = tempTask[i]
            let li       = document.createElement("li")
            li.className = "liTask"
            li.innerHTML = `
            <div class= "taskLi">
            <span class="sr"><input type="checkbox" id="checkBox" class="checkBox"></span>
            <span class="taskSubject">${temp.Subject}</span>
            <button class ="editBtn">Edit</button>
            </div>
            <p class="taskDescription">${temp.Description}</p>
            `;
            ol.append(li)
            sr = i+1
            li.addEventListener('click',displayDescription)
            li.querySelector(".editBtn").addEventListener('click',editTask)
        }
        taskDiv.append(ol)
        noTask.innerText = ""
        backBtn.style.display =  "block"
        createTask.style.display = "none"
        tempTask.pop()
    }
    taskDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    form.style.display = "none"
    searchInput.value = ""
}
}
backBtn.addEventListener('click',()=>{
    showTask()
    backBtn.style.display =  "none"
    createTask.style.display = "block"
})

navSelectAllBtn.addEventListener('click',()=>{
    let checkboxTasks = document.querySelectorAll('li .taskLi input[type="checkbox"]');
    checkboxTasks.forEach(function(check){
        if(check.checked == false){
            check.checked = true
        }else{
            check.checked = false
        }
    })
})
console.log(highLightBtn)
highLightBtn.addEventListener('click',highLightTask)

function highLightTask(){
    let ol                  = document.createElement("ol")
    ol.id                   = "hOl"
    let taskiInList         = false
    let taskCanAdd          = false
    let checkboxTasks = document.querySelectorAll('li .taskLi input[type="checkbox"]');
    try {
        checkboxTasks.forEach(function(check){
            if(check.checked){
                let tasksSubject = check.closest('.taskLi').querySelector('.taskSubject');
                for(i = 0 ; i < highLightListarr.length ; i++){
                    if(highLightListarr[i] == tasksSubject.innerText){
                        alert(`This Task ${highLightListarr}  is already in HighLight List`)
                        taskiInList = true
                        break
                    }
                }
                if(taskiInList == true){
                    throw 'break'
                }
                if(taskiInList == false){
                    highLightListarr.push(tasksSubject.innerText)
                    taskCanAdd = true
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
    if(taskCanAdd == true || taskiInList == false){
        highLightList.innerHTML = ""
        for(i = 0 ; i < highLightListarr.length ; i++){
            let li = document.createElement("li")
            for(j = 0 ; j < taskListarr.length ; j++){
                if(taskListarr[j].Subject == highLightListarr[i]){
                    let temp = taskListarr[j]
                    li.className  = "hlist"
                    li.innerText  = `${temp.Subject}`
                    li.addEventListener('click',()=>{
                        let a = taskDiv.querySelectorAll(".taskSubject")
                        a.forEach((a)=>{
                            let c = a.closest(".taskLi").querySelector(".taskSubject")
                            if(li.innerText == c.innerText ){
                                c.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        })
                    })
                }      
                ol.append(li)
            }
        }
        highLightList.append(ol)
        checkboxTasks.forEach(function(check){
            if(check.checked){
                check.checked = false
            }
        })
    }
    console.log(`ye highLight list he  ${highLightListarr}`)
}

highLightListBtn.addEventListener('click',()=>{
    if(highLightList.style.display == "none" || highLightList.style.display == ""){
        highLightList.style.display = "block"
    }else{
        highLightList.style.display = "none"
    }
})

reminderListBtn.addEventListener('click',()=>{
    if(reminderList.style.display == "none" || reminderList.style.display == ""){
        reminderList.style.display = "block"
    }else{
        reminderList.style.display = "none"
    }
})

navReminderBtn.addEventListener('click',reminderTask)

function reminderTask(displayUpdate){
    let taskInList         = false
    let taskCanAdd         = false
    let ol                 = document.createElement("ol")
    ol.id                  = "rOl"
    let hour_sec_mint      = ""
    let choice             = ""
    let time               = 0
    let checkboxTasks = document.querySelectorAll('li .taskLi input[type="checkbox"]');
    try {
        checkboxTasks.forEach(function(check){
            if(check.checked ){
                let tasksSubject = check.closest('.taskLi').querySelector('.taskSubject');
                for ( i = 0 ; i < reminderListarr.length ; i++) {
                    if(reminderListarr[i] == tasksSubject.innerText){
                        alert(`This task ${reminderListarr}  is already in Reminder List`)
                        taskInList = true
                        break
                    }
                }
                if(taskInList == true){
                    throw 'break';
                }
                if(taskInList == false){
                    choice         = prompt("Select the time in which you wanted to be reminded h/m/s write any of these alphabet")
                    if(choice == null){
                        console.log("choice prompt input is empty",choice)
                    }
                    else{
                         console.log("choice prompt input is empty",choice)
                         hour_sec_mint  = prompt("Enter Time")
                     }
                    if(hour_sec_mint == null || hour_sec_mint == ""){
                        console.log("hour_sec_mint prompt is empty",hour_sec_mint)
                    }else{
                    console.log("hour_sec_mint prompt is empty",hour_sec_mint)
                    reminderListarr.push(tasksSubject.innerText)
                    console.log(reminderListarr)
                    taskCanAdd = true
                    }
                }
                
            }
        })    
    } catch (error) {
        console.log(error)
    }
    if(taskCanAdd == true || displayUpdate == true){
        reminderList.innerHTML = ""
    // if(taskCanAdd == true ){

    // }

         switch (choice.trim().toLocaleLowerCase()) {
             case "h":
                 time = hour_sec_mint*3600000
                 break;
                 case "m":
                     time = hour_sec_mint*60000
                     break;
                     case "s":
            time = hour_sec_mint*1000
            break;
            default:
                break;
    }
    // reminderListDisplay()
    for(i = 0 ; i < reminderListarr.length ; i++){
        let li = document.createElement("li")
        for(j = 0 ; j < taskListarr.length ; j++){
            if(taskListarr[j].Subject == reminderListarr[i]){
                let temp = taskListarr[j]
                li.className  = "rlist"
                li.innerText  = `${temp.Subject}`
                li.addEventListener('click',()=>{
                    let a = taskDiv.querySelectorAll(".taskSubject")
                    a.forEach((a)=>{
                        let c = a.closest(".taskLi").querySelector(".taskSubject")
                        if(li.innerText == c.innerText ){
                            c.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    })
                })
            }      
            ol.append(li)
        }
    }
    reminderList.append(ol)
    checkboxTasks.forEach(function(check){
        if(check.checked){
            check.checked = false
        }
    })

    setTimeout(()=>{
        let count = 0
        for(i = 0 ; i < reminderListarr.length ; i++){
            count = i+1
        }
        if(taskCanAdd == true){
            alert(`you have ${count} task todo`)
        }
    },time)

 }
 console.log(`ye reminder list he  ${reminderListarr}`)
}

todoList.addEventListener('click',()=>{
    taskDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
})

navDeleteBtn.addEventListener('click',deleteTask)
function deleteTask(){
    let checkboxTasks = document.querySelectorAll('li .taskLi input[type="checkbox"]');
    checkboxTasks.forEach(function(check){
        if(check.checked){
            let tasksSubject = check.closest('.taskLi').querySelector('.taskSubject');
            for(i = 0 ; i < taskListarr.length ; i++){
                if(taskListarr[i].Subject == tasksSubject.innerText){
                    taskListarr.splice(i,1)
                    showTask()
                }
            }

            for(i = 0 ; i < reminderListarr.length ; i++){
                if(reminderListarr[i] == tasksSubject.innerText){
                    reminderListarr.splice(i,1)
                    reminderTask()
                }
            }

            for(i = 0 ; i < highLightListarr.length ; i++){
                if(highLightListarr[i] == tasksSubject.innerText){
                    highLightListarr.splice(i,1)
                    highLightTask()
                }
            }

        }

    })


    checkboxTasks.forEach(function(check){
        if(check.checked){
            check.checked = false
        }
    })
}