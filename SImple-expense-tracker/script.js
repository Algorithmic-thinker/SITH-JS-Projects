var a = document.getElementById('text');
var b = document.getElementById('amount');
function add()
{   if(document.getElementById('text').value.length !=0 && document.getElementById('amount').value.length !=0)
    {
        var x = a.value;
        var y = b.value;
        if(y>0)
        {
            income(y);
            history(x,y);
        }
        else
        {
            expense(y);
        }
        balance(y);
    }
    else
    {
        alert("Please Enter Values");
    }
}
function income(y)
{
    var c = document.getElementsByClassName('income')[0];
    var d = parseInt(c.innerText);
    d += parseInt(y);
    c.innerText = d;  
}
function expense(y)
{
    var c = document.getElementsByClassName('expense')[0];
    var d = -parseInt(c.innerText);
    d += parseInt(-y);
    c.innerText = d;  
}
function history(x,y)
{
    var c = document.getElementById('history');
    c.innerHTML += `<button style="font-size: 13px; padding: 0px; margin-left:5px;">
                    <span>${x}</span><br>
                    <span>${y}</span>
                </button>`;
}
function balance(y)
{
    var c = document.getElementsByClassName('balance')[0];
    var d = parseInt(c.innerText);
    d += parseInt(y);
    c.innerText = d;  
}