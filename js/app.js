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
  navigation.innerHTML += `<li><a class="menu__link" id="nav_${id}">${nav}</a></li>`;

});

//  is inviewport or not
const isElementInViewport  = (element) =>{

  const rect = element.getBoundingClientRect();
  const top = rect.top;
  const bottom = rect.bottom; 
  return top >= -element.offsetHeight/2 && top <element.offsetHeight/2;
 
};



// link element <==> section element
const getElement = (element) =>{
  let id = element.getAttribute("id");
  //if id includes "section", link id change to section id 
    if(id.indexOf("section")==4){
      id ="#"+id.substring(4);
    };
    if(id.indexOf("section")==0){
      id ="#"+"nav_"+id;
    };
 
 //return the element with the changed id 
  return document.querySelector(id);
  
}

//scroll listening function
const scrollAction = () =>{  

  sections.forEach(section =>{  

    // find out the section in viewport 
    if(isElementInViewport(section)){        
      section.classList.add("active-class"); 
      //  getElement(section) to get the navbar element by section
      getElement(section).classList.add("active-link"); 
    }else{
      section.classList.remove("active-class");   
      getElement(section).classList.remove("active-link"); 
    };

  }); 
};

const navbarAction = (event) =>{
  event.preventDefault();      
  const activeNav = event.target;  
  //getElement(activeNav) is to get the section  from the clicked navbar  
  if(getElement(activeNav)!=null){    
    // scroll to show it smooth        
    getElement(activeNav).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    }); 
    
  }
      
      
}  
// add listener on scroll
window.addEventListener('scroll',scrollAction);
//add listener on nav bar
navigation.addEventListener('click', navbarAction);

