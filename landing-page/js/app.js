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
const sectionList=Array.from(sections);
// get the active section
let active_d = document.querySelector(".your-active-class");  

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
const isElementInViewport  = (element) =>{

  const rect = element.getBoundingClientRect();
  const top = rect.top; 
  const bottom = rect.bottom;
  //flag = 1:scroll down 
  //flag = -1:scroll up
  let flag = 0 ;
  // if is inviewport ,return true  and flag
  const isInView = top < 200  && bottom > element.offsetHeight/3;
  if(bottom<=element.offsetHeight/3){
    flag = 1 ;
  };
  if(top > 200){
    flag = -1 ;
  };    
  return {'inview':isInView, 'flag':flag} ;
};

// remove the active class
const removeActive = (element) => {
  element.classList.remove('your-active-class');
  element.style.cssText = "background: linear-gradient(0deg, rgba(255,255,255,.1) 0%, rgba(255,255,255,.2) 100%);";
};

// adding the active class
const addActive = (element) => {
  element.classList.add('your-active-class');
  element.style.cssText = "background-color: burlywood";
  
};

//scroll listening function
const scrollAction = () =>{
  
  // get the active element index in divlist
  let index = sectionList.indexOf(active_d);
  const InView = isElementInViewport(active_d);

  //if is inviewport , add active class
  if(InView.inview){  
    addActive(active_d);

  //if is not inviewport , remove active class
  }else{  
    removeActive(active_d) ; 

    //check scroll up or down: (flag > 0)-> scroll down , (flag < 0)->scroll up 
    if(InView.flag>0 && index < sectionList.length-1){
      index=index+1; 
    }; 
    if(InView.flag < 0 && index >= 1){
      index=index-1;
    };
    
    active_d = sectionList[index];
    addActive(active_d);
    return;
  };
  // change the active section
  active_d = sectionList[index];
}

const navbarAction = (event) =>{
  //get the clicked navbar element
  const activeNav = event.target；
  //if the navbar has "link_click" (has been clicked) ,remove the class 
  if(document.querySelector(".link_click")!= null){
    document.querySelector(".link_click").classList.remove("link_click")；
  }； 
  // add the "link_click" class to clicked navbar  
  activeNav.classList.add("link_click")；
 
  //get the  clicked navbar's "href" value, "href" is the active section's id, use it to set the section to active
  const section_id = activeNav.getAttribute("href");
  addActive( document.querySelector(section_id))；

}
// add listener on scroll
window.addEventListener('scroll',scrollAction);
//add listener on nav bar
navigation.addEventListener('click', navbarAction);
