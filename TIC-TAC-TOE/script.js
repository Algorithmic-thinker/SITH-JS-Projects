let game_board = document.getElementById('board');
let game_page = document.getElementById('game-page');
let front_page = document.getElementById('front-page');
let player_1 = document.getElementById('player1');
let player_2 = document.getElementById('player2');
let p1_name = document.getElementById('p1-name');
let p2_name = document.getElementById('p2-name');
let p1_score = document.getElementById('p1-score');
let p2_score = document.getElementById('p2-score');
let count=1;
let cell_array = [1,0,1,0,1,0,1,0,0];

function start()
{   
    if(player_1.value != "")
    {
       p1_name.innerText = player_1.value ;
       p2_name.innerText = player_2.value ;
    }
    front_page.style.display = "none";
    game_page.style.display = "block";
}

document.querySelectorAll("#board div div").forEach( div => div.addEventListener('click', xo));
function xo(e)
{   
    a = e.target.id;
    let cell = document.getElementById(a);
    let symbol;
    if(cell.innerHTML != "X" && cell.innerHTML != "O")
    {
        if(count%2==0 && count!=0)
        {
            symbol = "O";
            count++;

        }
        else if(count!=0)
        {
            symbol= "X";
            count++;
        }    
        else
        {
            symbol="";
        }
        cell.innerHTML = symbol;
        if (symbol !="")
        {  
            let result = check(cell);
            if (result == "win")
            {   
                count = 0;
                if(symbol == "X"){
                    p1_score.innerText = parseInt(p1_score.innerText)+1;
                    setTimeout(()=>{
                        alert("X WINS !!");
                    }, 500);
                }
                else{
                    p2_score.innerText = parseInt(p2_score.innerText)+1;
                    setTimeout(()=>{
                        alert("O WINS !!");
                    }, 500);
                }
                    
            }
            else if(result=="draw")
            {   
                count = 0;
                setTimeout(()=>{
                    alert("its a draw");
                }, 500);
            }
        }
    }
}

function check(cell)
{   
    let i = cell.id.slice(4,5);
    let j = cell.id.slice(5,); 
    for(let p=1; p<=3; p++)
    {   
        cell_array[p-1] = document.getElementById("cell"+i+p).innerHTML;
    }
    if(cell_array[0]==cell_array[1] && cell_array[0] == cell_array[2])
    {   
        document.getElementById("cell"+i+"1").style.backgroundColor = "green";
        document.getElementById("cell"+i+"2").style.backgroundColor = "green";
        document.getElementById("cell"+i+"3").style.backgroundColor = "green";
        return("win");
    }
    for(let p=1; p<=3; p++)
    {   
        cell_array[p-1] = document.getElementById("cell"+p+j).innerHTML;
    }
    if(cell_array[0]==cell_array[1] && cell_array[0] == cell_array[2])
    {   for(let x = 1; x <= 3; x++)
            document.getElementById("cell"+x+j).style.backgroundColor = "green";
        return("win");
    }
    if(i==j)
    {
        for(let p=1; p<=3; p++)
        {   
            cell_array[p-1] = document.getElementById("cell"+p+p).innerHTML;
        }  
        if(cell_array[0]==cell_array[1] && cell_array[0] == cell_array[2])
        {   for(let x = 1; x <= 3; x++)
                 document.getElementById("cell"+x+x).style.backgroundColor = "green";
            return("win");
        }
    }
    if(i == parseInt(j)+2 || j == parseInt(i)+2)
    {
        cell_array[0] = document.getElementById("cell"+i+j).innerHTML;
        cell_array[1] = document.getElementById("cell"+j+i).innerHTML;
        cell_array[2] = document.getElementById("cell"+"2"+"2").innerHTML;
        if(cell_array[0]==cell_array[1] && cell_array[0] == cell_array[2])
        {   
            document.getElementById("cell"+i+j).style.backgroundColor = "green";
            document.getElementById("cell"+j+i).style.backgroundColor = "green";
            document.getElementById("cell"+"2"+"2").style.backgroundColor = "green";
            return("win");
        }
    }
    if(count==10)
    {
        return("draw");
    }
    return("0");
}

function reload()
{
    for(let i = 1; i<=3; i++)
    {
        for(let j = 1; j<=3; j++)
        {
            document.getElementById("cell"+i+j).innerHTML='';
            document.getElementById("cell"+i+j).style.backgroundColor='transparent';
        }
    }
    count = 1;
}

function restart()
{
    window.location.reload();
}

document.querySelectorAll("#board div div").forEach( div => div.addEventListener("click", changeColor) );

function changeColor(e){
    div = document.getElementById(e.target.id);
    setTimeout( function(){
        if (div.innerHTML == "X"){
            div.style.color = "#fe7792";
            div.style.textShadow = "1px 1px 20px #ff073a, 1px 1px 20px #ff073a";
        }
        else{
            div.style.color = "#7777f9";
            div.style.textShadow = "1px 1px 20px #4D4DFF, 1px 1px 20px #4D4DFF";
        }
    },10);
    
}