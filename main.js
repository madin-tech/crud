const addBtnEl = document.getElementById("add-btn");
const inputModalEl = document.getElementById("input-modal-bg");
const cardsEl = document.getElementById("cards");
const postHeaderEl = document.getElementById("posts-head");
const modalInputExitEl= document.getElementById("inputModal-exit");
const noPostEl = document.getElementById("no-post");
const formEl = document.getElementById("formEl");
const inputModal = document.getElementById("input-modal");
const createBtnEl = document.getElementById("createBtnEl");
let updatePostId = null;
const contentEl = document.getElementById("content");
const descriptionEl = document.getElementById("description");
const authorEl = document.getElementById("author");
const urlEl = document.getElementById("url");
const editBtnEl = document.getElementById("edit");
const cardInfoModalEl = document.getElementById("cardInfoModal");
const cardExit = document.getElementById("exit");
const cardModalEl = document.getElementById("cardModalEl");
const cancel = document.getElementById("cancel");

let posts = [];

addBtnEl.addEventListener("click", ()=>{
cardsEl.style.display="none";
postHeaderEl.style.display="none";
inputModalEl.style.display="flex";
})
modalInputExitEl.addEventListener("click", ()=>{
cardsEl.style.display="grid";
postHeaderEl.style.display="flex";
inputModalEl.style.display="none";
formEl.reset();
})

window.addEventListener("DOMContentLoaded",()=>{
    getData();
})
async function getData(){
try {
    const res = await fetch("https://crud-nodejs-ixa1.onrender.com/api/posts");
    const data = await res.json();
    if(data.success){
        posts = data.data;
        render();
    }else{
        throw new Error("Ma'lumot topilmadi");
    }
    
} catch (error) {
    console.log(error.message);
    
}

}

function render(){
cardsEl.innerHTML = posts.map((post)=>{
    return `
    <div class="card" onclick = "openModal(${post.id})">
<img src= "${post.imgUrl}">
<div class="card-bottom">
    <h5>${post.title}</h5>
    <h6>${post.content}</h6>
<div class="created-info">
        <div class="together">
        <img src="./images/user-solid-full.svg" class="icon" alt="">
        <b class="normal-text">${post.author}</b>
    </div>
    <div class="together">
        <img src="./images/calendar-solid-full.svg" class="icon" alt="">
        <p class="normal-text">${post.createdAt}</p>
    </div>
</div>
<div class="together">
    <img src="./images/eye-solid-full.svg" class="icon" alt="">
    <p class="normal-text">${post.viewCount} ko'rish</p>
</div>
<div class="btns">

        
    <button onclick = "event.stopPropagation(); updatePost(${post.id})">
        <img src="./images/pen-solid-full.svg" class="icon" alt="">
        tahrirlash</button>


 <button onclick = " event.stopPropagation(); deletePost(${post.id})" > 
       <img src="./images/trash-can-regular-full.svg" class="icon" alt="">
       o'chirish
 </button>
    

</div>
</div>
</div>
    `
}).join("");
}
createBtnEl.addEventListener("click", ()=>{
createPost();
cardsEl.style.display="grid";
postHeaderEl.style.display="flex";
inputModalEl.style.display="none";


})
async function createPost(){
    if(posts.length == 0){
        cardsEl.style.display="none";
         noPostEl.style.display="flex";
    }else{
        cardsEl.style.display="grid";
         noPostEl.style.display="none";   
    }




 const form = new FormData(formEl);
const newPost= {
    title:form.get("contentEl"),
    content:form.get("descriptionEl"),
    author:form.get("authorEl"),
    imgUrl:form.get("imageEl")
}

try {
    if(!updatePostId){
     const res =  await fetch("https://crud-nodejs-ixa1.onrender.com/api/posts",{
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(newPost),
     
        
    })
        if(res.ok){
    getData();
    formEl.reset();
}
    }else{
        const res =  await fetch(`https://crud-nodejs-ixa1.onrender.com/api/posts/${updatePostId}`,{
        method: 'PUT',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(newPost),
     
        
    })
        if(res.ok){
    getData();
    formEl.reset();
    updatePostId = null;
}  
    }


  

    
} catch (error) {
    console.log(error.message);
    
}





}


async function deletePost(id) {
if(confirm("Postni o'chirmoqchimisiz?")){
    try {
         const res = await fetch(`https://crud-nodejs-ixa1.onrender.com/api/posts/${id}`,{
        method: 'DELETE',
        
    });
    if(res.ok){
        getData();
    }
  
    } catch (error) {
        
    }
    
}else{
  getData();
  cardInfoModalEl.style.display="none";  
}
}
function updatePost(id){
updatePostId = id;
const updatedPost = posts.find(p=>p.id==id);

contentEl.value = updatedPost.title;
descriptionEl.value = updatedPost.content;
authorEl.value =updatedPost.author;
urlEl.value = updatedPost.imgUrl;


cardsEl.style.display="none";
postHeaderEl.style.display="none";
inputModalEl.style.display="flex";
createBtnEl.innerHTML="add";
// cardInfoModalEl.style.display="flex";
}
editBtnEl.addEventListener("click", ()=>{
    
})
function openModal(id){
const card = posts.find(c=>c.id==id);
cardsEl.style.display="none";
postHeaderEl.style.display="none";
cardInfoModalEl.style.display="flex";

cardModalEl.innerHTML = 
     `
    <div class="modal" id="cardModalEl">
<div class="modal-top">
<h3>Post Tafsilotlari</h3> 
<img src="./images/xMark-white.svg" id="exit" onclick = "exit()" alt="">
</div>
<div class="modal-bottom">
<img src="${card.imgUrl}" alt="sdfxcbv" class="post-detail-image" onerror="this.src='https://picsum.photos/800/400?random=' + 10">
<div class="modal-texts">
    <h3>${card.title}</h3>
    <h4 class="with-margin">${card.content}</h4>
    <div class="infos-box">
        <div class="infos">
            <h6>Muallif:</h6>
            <p>${card.author}</p>
        </div>
            <div class="infos">
            <h6>Yaratilgan sana:</h6>
            <p>${card.createdAt}</p>
        </div>
            <div class="infos">
            <h6>Ko'rishlar soni:</h6>
            <p>${card.viewCount}</p>
        </div>
        
    </div>
    <div class="close-btn-box">
        <button class="close-btn" onclick = "exit()">close</button>
    </div>
</div>
</div>
</div>
    `;



}
cardExit.addEventListener("click", ()=>{
    cardInfoModalEl.style.display="none";
    cardsEl.style.display="grid";
    postHeaderEl.style.display="flex";
})
function exit(){
        cardInfoModalEl.style.display="none";
    cardsEl.style.display="grid";
    postHeaderEl.style.display="flex";
}
cancel.addEventListener("click", ()=>{
cardsEl.style.display="grid";
postHeaderEl.style.display="flex";
inputModalEl.style.display="none";
})