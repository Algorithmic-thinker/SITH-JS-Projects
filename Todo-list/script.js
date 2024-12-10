document.querySelector('input[type="submit"]').addEventListener("click", addTask);

function addTask(){

    let keys= Object.keys(localStorage);
    let task = document.querySelector('input[type="text"]').value;
    let description =  document.querySelector('textarea').value;
    let status = "pending";
    if (description == undefined)
    {
        description = "";
    }

    let details = {
        task : task,
        description : description , 
        status : status
    };

    if (task != "")
    {   
        if(localStorage.length == 0){
            localStorage.setItem(localStorage.length, JSON.stringify(details));
        }
        else{
            if(keys.map(key => JSON.parse(localStorage.getItem(key))["task"]).includes(task))
            {
                alert("Duplicate task");
            }
            else{
                localStorage.setItem(localStorage.length, JSON.stringify(details));
            }
        }
        
        
    }
}

function show(keys){

    if (keys == undefined)
    {
        keys= Object.keys(localStorage).sort((a,b)=> a - b );
    }
    if(keys == "")
    {
        document.getElementById("task-list").innerHTML = `<h2> <span id="list-name"></span> Tasks</h2>`;
    }
    document.getElementById("task-list").innerHTML = `<h2> <span id="list-name"></span> Tasks</h2>`;
    keys.forEach(key => {

        let details = localStorage.getItem(key);

        details = JSON.parse(details);
        let task = details["task"];
        let description = details["description"];
        let status = details["status"];

        let color = "crimson";
        if (status == "on-going")
        {
            color = "aquamarine"
        }
        else if( status == "completed") {
            color = "forestgreen";
        }

        document.getElementById("task-list").innerHTML += 
        `<div>
            <li style =" background-color: ${color}"> 
                <span> ${task} </span>
                <span> ${description} </span>
            </li>
            <div>
                <i class="fa-solid fa-trash-can delete"></i>
                <i class="fa-solid fa-play start"></i>
                <i class="fa-regular fa-circle-check complete"></i>
            </div>
        </div>`;

    });
    
}

show();

document.querySelectorAll(".delete").forEach(iTag => iTag.addEventListener("click", remove));
document.querySelectorAll(".start").forEach(iTag => iTag.addEventListener("click", start));
document.querySelectorAll(".complete").forEach(iTag => iTag.addEventListener("click", complete));

function remove(event){

    let task = event.target.parentNode.parentNode.querySelector("li span:nth-child(1)").innerText;
    let keys= Object.keys(localStorage).sort((a,b)=> a - b );
    for(let i = 0 ; i < keys.length; i++ ){
        
        let details = localStorage.getItem(keys[i]);
        details = JSON.parse(details);
        console.log(details);
        let keyTask = details["task"];
        
       if(keyTask != undefined)
       {
            if(keyTask == task)
            {
                localStorage.removeItem(keys[i]);
                reset(keys[i]);
                break;
            }
       }

    }
    window.location.reload();
}
function reset(key){
    let oldKeys= Object.keys(localStorage).sort((a,b)=> a - b );
                counter = key - 1 ;
                oldKeys.forEach(function(oldKey){
                    if(oldKey > key)
                    {
                        let oldDetails = localStorage.getItem(oldKey);
                        localStorage.removeItem(oldKey);
                        localStorage.setItem(++counter,oldDetails);
                    }
                });
}

function start(event){
    let task = event.target.parentNode.parentNode.querySelector("li span:nth-child(1)").innerText;
    let keys= Object.keys(localStorage).sort((a,b)=> a - b );
    for(let i = 0 ; i < keys.length; i++ ){
        
        let details = localStorage.getItem(keys[i]);
        details = JSON.parse(details);
        let keyTask = details["task"];
        
       if(keyTask != undefined)
       {
            if(keyTask == task)
            {
                details["status"] = "on-going";
                localStorage.setItem(keys[i], JSON.stringify(details));
                break;
            }
       }

    }
    window.location.reload();
}

function complete(event){
    let task = event.target.parentNode.parentNode.querySelector("li span:nth-child(1)").innerText;
    let keys= Object.keys(localStorage).sort((a,b)=> a - b );
    for(let i = 0 ; i < keys.length; i++ ){
        
        let details = localStorage.getItem(keys[i]);
        details = JSON.parse(details);
        let keyTask = details["task"];
        
       if(keyTask != undefined)
       {
            if(keyTask == task)
            {
                details["status"] = "completed";
                localStorage.setItem(keys[i], JSON.stringify(details));
                break;
            }
       }

    }
    window.location.reload();
}

document.getElementsByClassName("all")[0].addEventListener("click", filterTask);
document.getElementsByClassName("on-going")[0].addEventListener("click", filterTask);
document.getElementsByClassName("pending")[0].addEventListener("click", filterTask);
document.getElementsByClassName("completed")[0].addEventListener("click", filterTask);

function filterTask(event){
    let status;
    console.log(event.target.classList);
    
    if(event.target.classList.length == 0)
    {
        status = event.target.parentNode.classList;
    }
    else{
        status = event.target.classList;
    }

    let keys= Object.keys(localStorage).sort((a,b)=> a - b );
    if(status[1] != 'all')
    {
        keys = keys.filter(key => JSON.parse(localStorage.getItem(key)).status == status[1] );
        show(keys);
    }
    else{
        window.location.reload();
    }
    document.querySelectorAll(".delete").forEach(iTag => iTag.addEventListener("click", remove));
    document.querySelectorAll(".start").forEach(iTag => iTag.addEventListener("click", start));
    document.querySelectorAll(".complete").forEach(iTag => iTag.addEventListener("click", complete));
}