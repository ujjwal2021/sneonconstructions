let navbar = document.querySelector('.header .navbar');
let loginForm = document.querySelector('.header .login-form');
let contactInfo = document.querySelector('.contact-info');
let aboutUsContent = document.querySelector(".about .row .content");

let navItems = navbar.querySelectorAll("a");

// contact
let nameInput = document.querySelector("#name-input");
let emailInput = document.querySelector("#email-input");
let numberInput = document.querySelector("#number-input");
let messageInput = document.querySelector("#message-input");
let contactBtn = document.querySelector("#contact-btn")

let messageText = document.querySelector(".api-message");

let contactForm = document.querySelector("#contact-form");


for(let i=0; i< navItems.length; i++){
   navItems[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("nav-item active");
      if (current.length > 0) {
        current[0].className = current[0].className.replace("active", "");
      }
      this.className += " active";
   })
}
document.querySelector('#menu-btn').onclick = () =>{
   navbar.classList.toggle('active');
};

document.querySelector('#info-btn').onclick = () =>{
   contactInfo.classList.add('active');
}

document.querySelector('#close-contact-info').onclick = () =>{
   contactInfo.classList.remove('active');
}

document.querySelector(".read-more-btn").onclick = () => {
   aboutUsContent.classList.toggle("active")
}
document.querySelector(".read-less-btn").onclick = () => {
   aboutUsContent.classList.toggle("active")
}
window.onscroll = () =>{
   navbar.classList.remove('active');
   contactInfo.classList.remove('active');
}


const validEmail = (email) => {
   let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return email.match(validRegex);
}



const disableButton = () => {
   contactBtn.disabled = true;
   contactBtn.classList.add("disabled")
}

const enableButton = () => {
   contactBtn.disabled = false;
   contactBtn.classList.remove("disabled");
}
const handleMessage = (message, status) => { 
   messageText.innerHTML = message; 
   messageText.classList.add(status);
   enableButton();

   setTimeout(()=>{
      messageText.classList.remove(status);
      messageText.innerHTML = ""
   }, 3000);

}
async function handleFormInput(e){
   e.preventDefault();
   disableButton();
   let name = nameInput.value;
   let email = emailInput.value;
   let number = numberInput.value;
   let message = messageInput.value;

   if(name.length < 3){
      handleMessage("Invalid name", "error");
      return;
   }
   if(!validEmail(email)){
      handleMessage("Invalid email", "error");
      return;
   }
   if(number.length != 10){
      handleMessage("invalid phone", "error");
      return;
   }
   if(message.length < 3){
      handleMessage("Invalid message", "error");
      return;
   }

   let data = {
      name,
      email,
      phone: number,
      message
   };


   let response = await fetch("https:/www.sneonconstruction.com/api/v1/contact", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
         "Content-Type": "application/json",
       },

   }) 

   if(response.status == 200){
      handleMessage("Message sent successfully", "success");
      enableButton();
   } else {
      handleMessage("Message couldnot be sent. Please try again later", "error")
      setTimeout(()=> {
         enableButton();
      }, 3000)
   }
   contactForm.reset();
}

contactForm.addEventListener("submit", handleFormInput);









var swiper = new Swiper(".home-slider", {
   loop:true,
   grabCursor:true,
   navigation: {
     nextEl: ".swiper-button-next",
     prevEl: ".swiper-button-prev",
   },
});

var swiper = new Swiper(".reviews-slider", {
   loop:true,
   grabCursor:true,
   spaceBetween: 20,
   breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 3,
      },
   },
});

var swiper = new Swiper(".blogs-slider", {
   loop:true,
   grabCursor:true,
   spaceBetween: 20,
   breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 3,
      },
   },
});

var swiper = new Swiper(".logo-slider", {
   loop:true,
   grabCursor:true,
   spaceBetween: 20,
   breakpoints: {
      450: {
         slidesPerView: 2,
       },
      640: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      1000: {
        slidesPerView: 5,
      },
   },
});



