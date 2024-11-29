function uploadProject()
{
    fetch("https://randomuser.me/api/").then((data)=>{
        let res = data.json();
        return res;
     }).then((res)=> {
        console.log(res.results[0]);
        let user = res.results[0];
        let fullName = "Name : " + user.name.title + " " + user.name.first + " " + user.name.last;
        document.getElementById("name").innerText = fullName;

        let photo = user.picture.large;
        document.getElementById('profile-pic').src = photo;
        console.log(photo);

        let email = user.email;
        document.getElementById('email').innerText = email;

        let userDob = new Date(user.dob.date);
        userDob = `${userDob.getDate()}/${userDob.getMonth()+1}/${userDob.getFullYear()}`
        document.getElementById('dob').innerText = userDob;

        let phone = user.phone;
        document.getElementById('phone').innerText = phone;

        let address = user.location.postcode + " " + user.location.street.name;
        document.getElementById('address').innerText = address;

        let password = user.login.password;
        document.getElementById('password').innerText = password;
    })
    .catch((err)=>{
        console.log("ERR in API",err);
    });
}
uploadProject();

document.querySelectorAll("#icons i").forEach( icon => icon.addEventListener("mouseover", showContent));
let previousId = "nameDiv";
let previousEventId = "nameIcon";

document.getElementById(previousId).style.display = "block";
document.getElementById(previousEventId).style.color = "green";

function showContent(e){
    let eventId = e.target.id;
    let contentId = eventId.replace("Icon", "Div");
    document.getElementById(contentId).style.display = "block";
    document.getElementById(eventId).style.color = "green";
    if(contentId != previousId)
    {
        document.getElementById(previousId).style.display = "none";
        document.getElementById(previousEventId).style.color = "black";
    }
    
    previousId = contentId;
    previousEventId = eventId;
}