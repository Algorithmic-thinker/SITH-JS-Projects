let game_board = document.getElementById('board');
let inner_html="";
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
let x = '<img src="x.png" class="neon"/>';
let o = '<img src="o.png" class="neon"/>'; 
for(let i = 1; i<=3; i++)
{   
    inner_html += '<div id='+'\"row'+i+'\">';
    for(let j = 1; j<=3; j++)
    {   
        a = `\"cell${i}${j}\"`;
        b =`${i},${j}`;
        inner_html += '<div id='+a+'></div>';
    }
    inner_html += `</div>`;
}
game_board.innerHTML = inner_html;

function start()
{   
    if(player_1.value != "")
    {
       p1_name.innerText = player_1.value +":";
       p2_name.innerText = player_2.value +":";
    }
    front_page.style.display = "none";
    game_page.style.display = "block";
    document.body.style.backgroundImage= "none";
}

document.querySelector("#board").addEventListener('click', (event)=>{
    xo(event.target.id);
});
function xo(a)
{   let cell = document.getElementById(a);
    let symbol;
    if(cell.innerHTML != x && cell.innerHTML != o)
    {
        if(count%2==0 && count!=0)
        {
            symbol = o;
            count++;
        }
        else if(count!=0)
        {
            symbol= x;
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
                if(symbol == x)
                    p1_score.innerText = parseInt(p1_score.innerText)+1;
                else
                    p2_score.innerText = parseInt(p2_score.innerText)+1;
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
            document.getElementById("cell"+i+j).style.backgroundColor='white';
        }
    }
    count = 1;
}

function restart()
{
    window.location.reload();
}