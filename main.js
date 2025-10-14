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

        
    <button onclick = "updatePost(${post.id})">
        <img src="./images/pen-solid-full.svg" class="icon" alt="">
        tahrirlash</button>


 <button onclick = "deletePost(${post.id})" > 
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
}  
    }


  

    
} catch (error) {
    console.log(error.message);
    
}

console.log(newPost);



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
     console.log(res);
    } catch (error) {
        
    }
    
}
}
function updatePost(id){
updatePostId = id;
const updatedPost = posts.find(p=>p.id==id);

contentEl.value = updatedPost.title;
descriptionEl.value = updatedPost.content;
authorEl.value =updatedPost.author;
urlEl.value = updatedPost.imgUrl;

console.log(updatedPost);
cardsEl.style.display="none";
postHeaderEl.style.display="none";
inputModalEl.style.display="flex";
createBtnEl.innerHTML="add";
}
editBtnEl.addEventListener("click", ()=>{
    
})
function openModal(id){
const card = posts.find(c=>c.id==id);

}