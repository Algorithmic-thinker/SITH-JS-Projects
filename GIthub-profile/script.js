const frontPage = document.getElementsByClassName("front-page")[0];
const profilePage = document.getElementsByClassName("profile-page")[0];
const inputBox = document.querySelector(".search-box .input-box");
const searchBtn = document.querySelector(".search-box .search-btn");
const profileImage = document.querySelector(".profile-page img");
const userName = document.querySelector(".profile-page .name");
const userLogin = document.querySelector(".profile-page .login");
const userBio = document.querySelector(".profile-page .bio");
const userFollowers = document.querySelector(".profile-page .followers");
const userFollowing = document.querySelector(".profile-page .following");
const userCompany = document.querySelector(".profile-page .company");
const userLocation = document.querySelector(".profile-page .location");
const repos = document.querySelector(".repository");
const reposDiv = document.querySelector("div div:has(.repository)");

searchBtn.addEventListener('click', getUserData);

async function getUserData(){
    const url = "https://api.github.com/users/";
    const userId = inputBox.value;
    const response = await fetch(url + userId);
    
    if(response.status == 200)
    {
        frontPage.style.display = "none";
        profilePage.style.display = "block";
        reposDiv.style.display = "block";
        const userData = await response.json();       

        profileImage.src = userData.avatar_url;
        userName.innerHTML = userData.name;
        userLogin.innerHTML = userData.login;
        userBio.innerHTML = userData.bio;
        userFollowers.innerHTML = userData.followers;
        userFollowing.innerHTML = userData.following;
        userCompany.innerHTML = userData.company;
        userLocation.innerHTML = userData.location;

        const reposResponse = await fetch(userData.repos_url);
        if(reposResponse.status == 200)
        {
            const reposData = await reposResponse.json();
             console.log(reposData);
             repos.innerHTML = "";
             for(let i = 0; i < reposData.length; i++ )
             {
                repos.innerHTML += 
                `<div class="repo-body">
                    <a href=${reposData[i].html_url}>${reposData[i].name}</a>
                    <p>${reposData[i].description}</p>
                </div>`
             }
             
        }
        
    }
}