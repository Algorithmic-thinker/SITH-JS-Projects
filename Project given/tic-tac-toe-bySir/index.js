let state = [1, 0, 1, 0, 0, 1, 1, 1, 0];
let flag = true;
const winnerDiv = document.getElementById('winner');

/*

1	0	1
0	0	1
1	1	0

winner conditions
-- row

state[0] == state[1]  && state[0] == state[2] -- row 1
state[3] == state[4]  && state[3] == state[5] -- row 2
state[6] == state[7]  && state[6] == state[8] -- row 3

-- col

state[0] == state[3]  && state[0] == state[6] -- col 1
state[1] == state[4]  && state[1] == state[7] -- col 2
state[2] == state[5]  && state[2] == state[8] -- col 3

-- dia

state[0] == state[4]  && state[0] == state[8] -- dia 1
state[2] == state[4]  && state[2] == state[6] -- dia 3

*/

document.querySelector('.container').addEventListener('click', (e) => {
	var boxId = e.target.id;
	if (boxId != "") {
		if (state[boxId] == 1 ||  state[boxId] == 0)
		{
			if (flag)
			{
				e.target.innerHTML = "X";
				state[boxId] = "X";
			}
			else
			{
				e.target.innerHTML = "O";
				state[boxId] = "O";
			}
			flag = !flag;
			// console.log(state);
			checkWinner(!flag);
		}
		// else
		// {
		// 	alert("Not Allowed !! ");
		// }
	}
});


function checkWinner(flag)
{
	if(state[0] == state[1]  && state[0] == state[2])
	{
		// alert("Row 1 Winner");
		if(flag)
			winnerDiv.innerText = "X Winner";
		else
			winnerDiv.innerText = "O Winner";
		
		setDisabled();

	}
	else if(state[3] == state[4]  && state[3] == state[5])
	{
		alert("Row 2 Winner");
	}
	else if(state[6] == state[7]  && state[6] == state[8])
	{
		alert("Row 3 Winner");
	}
	else if(state[0] == state[3]  && state[0] == state[6])
	{
		alert("Col 1 Winner");
	}
	else if(state[1] == state[4]  && state[1] == state[7])
	{
		alert("Col 2 Winner");
	}
	else if(state[2] == state[5]  && state[2] == state[8])
	{
		alert("Col 3 Winner");
	}
	else if(state[0] == state[4]  && state[0] == state[8])
	{
		alert("dia 1 Winner");
	}
	else if(state[2] == state[4]  && state[2] == state[6])
	{
		alert("dia 2 Winner");
	}
	// else
	// {
	// 	alert("Its Draw !!");
	// }
}

function setDisabled()
{
	for(let i=0; i<9; i++)
	{
		if(state[i] == 1 || state[i] == 0)
		{
			state[i] = null;
		}
	}
}

function resetUI()
{
	for(let i=0; i<9; i++)
	{
		document.getElementById(i).innerText = "";
	}

	state = [1, 0, 1, 0, 0, 1, 1, 1, 0];
	flag = true;
}

function restartGame()
{
	window.location.reload();
}