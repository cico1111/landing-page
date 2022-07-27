/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
//get the nav bar ul
const navigation = document.getElementById('navbar__list');
// get all of the sections by classname
const sections = document.querySelectorAll('section');
// turn to arr  
const sectionList=Array.from(sections)
// get the active section
let active_d = document.querySelector(".your-active-class")  


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
// creat navBar

sections.forEach(section => {

  const nav = section.getAttribute("data-nav");   
  const id = section.getAttribute("id");  
  navigation.innerHTML += `<li><a class="menu__link" href="#${id}">${nav}</a></li>`;

});


// Add class 'active' to section when near top of viewport 

//  is inviewport or not
const isElementInViewport  = (el) =>{

  const rect = el.getBoundingClientRect();
  const top = rect.top 
  const bottom = rect.bottom 
  //flag = 1:scroll down 
  //flag = -1:scroll up
  let flag = 0 
  // if is inviewport ,return true  and flag
  const isInView = top < 200  && bottom > el.offsetHeight/3
  if(bottom<=el.offsetHeight/3){
    flag = 1 
  }
  if(top > 200){
    flag = -1 
  }    
  return {'inview':isInView, 'flag':flag} 

}


window.addEventListener('scroll',(e) => {
  // get the active element index in divlist
  let index = sectionList.indexOf(active_d)
  const InView = isElementInViewport(active_d)  
  //if is inviewport , add active class
  if(InView.inview){   
    active_d.classList.add("your-active-class")  
  //if is not inviewport , remove active class
  }else{              
    active_d.classList.remove("your-active-class")
    
  // flag > 0 , scroll down , (index+1) element is active
  if(InView.flag>0 && index < sectionList.length-1) index=index+1 
  // flag < 0 , scroll up , (index-1) element is active
  if(InView.flag < 0 && index >= 1) index=index-1
  
  active_d = sectionList[index]
  active_d.classList.add("your-active-class")
  return
  }
  // change the active section
  active_d = sectionList[index]


})
