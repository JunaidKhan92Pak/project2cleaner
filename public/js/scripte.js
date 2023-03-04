
let Register = document.querySelector("#register")
let registerForm = document.querySelector("#registerForm")
const password = document.querySelector("#password")
const cpassword = document.querySelector("#cpassword")
const allPost = document.querySelector(".allPost");



//------[function for close and open registeation form]----->
function closeRegister() {
  Register.style.display = "none"
}
function openRegister() {
  Register.style.display = "flex"
}
//------------------------------------------>

//-------[Function For openNav and close navbar]--------->
function openNav() {
  document.getElementById("myNav").style.width = "100%";
}
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}
//--------------------------------------->

//------[function to check password and Cpassword]--->
// registerForm.addEventListener('submit', (e) => {
//   validator();
//   e.preventDefault();
// });

// const validator = () => {
//   const passwordValue = password.value.trim();
//   const cpasswordValue = cpassword.value.trim();

//   if (passwordValue === cpasswordValue) {
//     cpassword.classList.remove('Error')
    
//   }
//   else {
//     cpassword.classList.add('Error')
//   }
// };
//------------------------>

// function postBlog() {
//   const BlogInputValue =  document.querySelector("#BlogInput").value
//   if (BlogInputValue) {
//     const postBox =  document.createElement('div');
//     const BLog = document.createElement('p')
//     allPost.appendChild(postBox);
//     postBox.appendChild(BLog)
//     BLog.innerText = BlogInputValue;
//     postBox.className="postBox"  
  
//   }
//   else{
//     window.alert("enter BLog ")
//   }
// }
function  EditBlog(id , Titel , shortDescri, description) {
  document.querySelector(".EditBlogContainer").style.display="flex";
  const BlogId = document.querySelector("#blogId");
  const BlogTitel = document.querySelector("#titel");
  const BlogshortDescri = document.querySelector("#shortDescri");
  const BlogDescri = document.querySelector("#descri");
  BlogTitel.value = Titel
  BlogshortDescri.value = shortDescri
  BlogDescri.value = description
  BlogId.value=id
}
function  closeBlog() {
  document.querySelector(".EditBlogContainer").style.display="none"
}
function deleteBlogOption(id) {
  document.querySelector(".DeleteBlogBox").style.display="flex"
  const BlogId = document.querySelector("#delBlogId");
  BlogId.value=id
}
function deleteBlog() {
  document.querySelector(".DeleteBlogBox").style.display="none"
}