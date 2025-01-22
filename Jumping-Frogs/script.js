let GAME = document.getElementById("game");
document.querySelectorAll('#level-selector button').forEach(button => button.addEventListener('click', changeLevel));
document.getElementById('reset').addEventListener('click', restart);
function changeLevel(event){

    if(event.target.innerText == "+"){

        let number = parseInt(document.getElementById("level").innerText);
        document.getElementById("level").innerText = number + 1;
    }
    else if(event.target.innerText == "-"){

        document.getElementById("level").innerText -= 1;
    }

    start();
}

function restart(){
    start();
}

function start(){

    const LEVEL = document.getElementById("level");
    document.getElementsByClassName('container')[0].innerHTML =  `<div id="game">
            
    </div> `;
    GAME = document.getElementById("game");
    GAME.innerHTML = "";

    for(let i=0; i < LEVEL.innerText; i++ ){

        GAME.innerHTML += 
        `<div class="frog" >
            <i class="fa-solid fa-frog" style="color: red"></i>
        </div>`;

    }
     
    GAME.innerHTML += 
    `<div class="frog"></div>`;

    for(let i=0; i < LEVEL.innerText; i++ ){

        GAME.innerHTML += 
        `<div class="frog" >
            <i class="fa-solid fa-frog" style="color: blue; transform: scalex(-1);"></i>
        </div>`;

    }

    document.querySelectorAll('.frog i').forEach(frog => frog.addEventListener('click', jump));
    
    function jump(event){

        if(getComputedStyle(event.target).color == "rgb(255, 0, 0)"){
            
            let jumpValidity = checkJump(event);

            if(jumpValidity == 1 ){

                event.target.parentNode.nextSibling.innerHTML =
                ` <i class="fa-solid fa-frog" style="color: red"></i>`;
                event.target.parentNode.innerHTML = "";

            } 
            else if(jumpValidity == 2){
                
                event.target.parentNode.nextSibling.nextSibling.innerHTML =
                ` <i class="fa-solid fa-frog" style="color: red"></i>`;
                event.target.parentNode.innerHTML = "";
                
            }
        }
        else if(getComputedStyle(event.target).color == "rgb(0, 0, 255)"){
            
            let jumpValidity = checkJump(event);
            console.log(jumpValidity);
            if(jumpValidity == 1 ){

                event.target.parentNode.previousSibling.innerHTML =
                `  <i class="fa-solid fa-frog" style="color: blue; transform: scalex(-1);"></i>`;
                event.target.parentNode.innerHTML = "";

            } 
            else if(jumpValidity == 2){
                
                event.target.parentNode.previousSibling.previousSibling.innerHTML =
                `  <i class="fa-solid fa-frog" style="color: blue; transform: scalex(-1);"></i>`;
                event.target.parentNode.innerHTML = "";
                
            }
        }

        document.querySelectorAll('.frog i').forEach(frog => frog.addEventListener('click', jump));
        
        jumpValidity = checkJump();

        if (jumpValidity == false){
            let winner = true; 
            let event = document.querySelectorAll('.frog');

            for(i=0; i < LEVEL.innerText ; i++){

                if(getComputedStyle(event[i]).color == "rgb(255, 0, 0)"){
                    winner = false;
                }

            }

            for(i=LEVEL.innerText + 1; i < document.querySelectorAll('.frog i').length ; i++){

                if(getComputedStyle(event[i]).color == "rgb(0, 0, 255)"){
                    winner = false;
                }

            }

            if(event[LEVEL.innerText].childNodes.length != 0){
                winner = false;
            }

            if (winner == true){
                document.getElementsByClassName('container')[0].innerHTML += `<p>You WON !!</p>`
            }
            else{
                document.getElementsByClassName('container')[0].innerHTML += `<p>No Valid move left</p>`
            }
            
        }

    }

    function checkJump(event){
        if(event == undefined)
        {   
            event = document.querySelectorAll('.frog i');
            
            for(i=0; i < event.length; i++){

                if(getComputedStyle(event[i]).color == "rgb(255, 0, 0)" && (i != LEVEL.innerText * 2 - 1 || document.querySelectorAll('.frog')[LEVEL.innerText * 2].childNodes.length == 0 )){

                    const nextSibling = event[i].parentNode.nextSibling;

                    if (nextSibling.innerHTML == "" ){
                        return true;
                    }

                    try {
                        if (nextSibling.nextSibling.innerHTML == "" ){
                            return true;
                        }
                    } catch (error) {
                        
                    }

                }

                if(getComputedStyle(event[i]).color == "rgb(0, 0, 255)" && (i != 0 || document.querySelectorAll('.frog')[0].childNodes.length == 0 ) ){

                    const previousSibling = event[i].parentNode.previousSibling;

                    if (previousSibling.innerHTML== "" ){
                        return true;
                    }

                    try {

                        if (previousSibling.previousSibling.innerHTML == "" ){
                            return true;
                        }
    
                    } catch (error) {
                        
                    }
                }
                
            }

            return false;
        }
        else{

            if(getComputedStyle(event.target).color == "rgb(255, 0, 0)"){

                try {

                    const nextSibling = event.target.parentNode.nextSibling;
                    if (nextSibling.innerHTML == ""){
                        return 1;
                    }
                    else if(nextSibling.nextSibling.innerHTML == "" ){
                        return 2;
                    }
                    return false;
                    
                } catch (error) {
                    return false;
                }

            }

            if(getComputedStyle(event.target).color == "rgb(0, 0, 255)"){

                try {

                    const previousSibling = event.target.parentNode.previousSibling;
                    if (previousSibling.innerHTML == ""){
                        return 1;
                    }
                    else if(previousSibling.previousSibling.innerHTML == "" ){
                        return 2;
                    }
                    return false;
                    
                } catch (error) {
                    return false;
                }

            }
            
        }
        
    }
}

start();