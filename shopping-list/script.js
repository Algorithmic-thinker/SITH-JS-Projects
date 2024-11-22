// to show exisiting items
function show(keys){
    if(keys == undefined)
    {
        keys = Object.keys(localStorage);
    }
    
    document.getElementById("item-list").innerHTML = "";
    keys.forEach(
        function (key)
        { 
            let item = localStorage.getItem(key);
            document.getElementById("item-list").innerHTML += 
            `
            <li>
            ${item}
            <button class="remove-item btn-link text-red">
                <i class="fa-solid fa-xmark"></i>
            </button>
            </li>

            `
        }
    );
}
show();

// to add items
document.querySelector('button[type="submit"]').addEventListener("click",add);
function add(){
    let item = document.getElementById("item-input").value;
    document.getElementById("item-input").value = "";
    if(item != "")
    {
        localStorage.setItem(localStorage.length, item);
        show();
    }
    
}

// remove items
document.querySelectorAll('.fa-xmark').forEach(
    (item) => item.addEventListener('click', removeElement)
);

function removeElement(e)
{
    let targetElement = e.target.parentElement.parentElement;
    targetElement.remove();
    localStorage.clear();
    let liElements = document.querySelectorAll("#item-list li");
    liElements.forEach(
        (liElement)=>localStorage.setItem(localStorage.length, liElement.innerText)
    );
}

// filter items
document.getElementById("filter").addEventListener("keyup", filterShoppingList);

function filterShoppingList(e){
    let userInput = e.target.value;
    let keys = Object.keys(localStorage);
    let itemKey = keys.filter(
        (key) => localStorage.getItem(key).toLowerCase().search(userInput.toLowerCase()) == 0
    );
    show(itemKey);
    document.querySelectorAll('.fa-xmark').forEach(
        (item) => item.addEventListener('click', removeElement)
    );
}

//clear all

document.getElementById("clear").addEventListener("click", clearAll);

function clearAll(){
    localStorage.clear();
    show();
}