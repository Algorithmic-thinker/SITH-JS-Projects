var input_val = document.getElementById('inputVal');
var sub_val = document.getElementById('subVal');
var b = document.getElementById('history');
b.innerHTML=`<p>There is no history yet..</p>
                <div id="his">
                    
                </div>`;
var c = document.querySelectorAll('#history #his')[0];

function getValue(val)
{
    let value = input_val.value[input_val.value.length-1];
    if (input_val.value == '0')
    {
        input_val.value=val;
    }
    else if(value =="+" || value =="-"|| value == "." || value =="*" || value =="/") 
    {  
        if(val =="+" || val =="-"|| val == "." || val =="*" || val =="/")
        {
            let a = input_val.value.slice(0 , input_val.value.length-1);
            input_val.value = a + val;
        }
        else
        {
            input_val.value += val;
        }
    }
    else
    {
        input_val.value += val;
    }
    if(input_val.value[input_val.value.length-1]==".")
    {   
        let x = input_val.value;
        let symbol;
        let position;
        for(i=0;i<x.length;i++)
        {   console.log(x[i]);
            if (!Number.isInteger(parseInt(x[i])) && x[i] !=".")
            {
                symbol = x[i];
                position = i;
            }
        }
        let a = x.slice(0,position);
        let b = x.slice(position+1,);
        if(symbol == null)
        {
            let p = input_val.value.slice(0 , input_val.value.length-1);
            p = parseFloat(p);
            if(!Number.isInteger(p))
            {
                console.log(p);
                input_val.value = p;
            }
        }
        else
        {
            let c = b.slice(0,b.length-1);
             c = parseFloat(c);
            if(!Number.isInteger(c))
                input_val.value = a + symbol + c;
        }
        
    }
}

function solve()
{
    var x = input_val.value;
    sub_val.value=x+"=";
    var ans = eval(x);
    input_val.value= ans; 
    showHistory(sub_val.value, ans);
}

function clearAll()
{
    input_val.value="0";
    sub_val.value="";
}
 
function deletelast(){
    if(input_val.value.length > 1)
        input_val.value = input_val.value.slice(0,-1);
    else
    {
        input_val.value = input_val.value.slice(0,-1);
        input_val.value = 0;
    }
}

function myHistory()
{   
    const element = document.getElementsByClassName('right')[0];
    if (element) {
        const currentVisibility = getComputedStyle(element).visibility;
        element.style.visibility = currentVisibility === "hidden" ? "visible" : "hidden";
    }
}

function showHistory(y, ans)
{
    c.innerHTML += `<p style="border-bottom: 2px solid grey;">${y}</p>
                    <p style="border-bottom: 2px solid black;">${ans}</p>`;
    var history = c.innerHTML;
    if(c.length != 0)
    {
        b.innerHTML=`<p></p>
                    <div id="his">
                        ${history}
                    </div>`
    }
}

function clearHistory()
{   var choice = confirm("are you sure you want to delete history");
    if(choice)
    {
        b.innerHTML=`<p>There is no history yet..</p>
                <div id="his" style="border-top: 2px solid black;
                ">
                    
                </div>`;
        c = document.querySelectorAll('#history #his')[0];
        c.innertHTML = "";
    }
}
function root()
{
   var x =  input_val.value;
   sub_val.value = x;
   ans = x ** 0.5;
   input_val.value = ans;
   showHistory(sub_val.value + "=",ans);
}
function percentage(){
    let x = input_val.value;
    let symbol;
    let position;
    for(i=0;i<x.length;i++)
    {   console.log(x[i]);
        if (!Number.isInteger(parseInt(x[i])) && x[i] !=".")
        {
            symbol = x[i];
            position = i;
        }
    }
    let a = x.slice(0,position);
    let b = x.slice(position+1,);
    let c = a * b / 100;
    input_val.value = a+symbol+c;
}
