// ==UserScript==
// @name     Youtube Scroll Back to Timestamp Comment
// @author   VeryVince
// @version  1
// @match    *://www.youtube.com/watch*
// @grant    none
// @run-at document-end
// ==/UserScript==

let lastClickedAnchor = null;
let backButton = null;

//https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
function waitForElmById(id) {
    return new Promise(resolve => {
        if (document.getElementById(id)) {
          //console.debug('found id right away:',id);
            return resolve(document.getElementById(id));
        }

        const observer = new MutationObserver(mutations => {
            if (document.getElementById(id)) {
              	//console.debug('observer found id:',id)
                observer.disconnect();
                resolve(document.getElementById(id));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
      //console.debug('observer set for id:',id);
    });
}


function createBackButton() {    
  const button = document.createElement('button');
  button.id = 'backToAnchor';
  button.innerText = 'Back to Comment';
  button.style.position = 'fixed';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.padding = '10px';
  button.style.backgroundColor = 'black';
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.cursor = 'pointer';
  button.style.display = 'none';  // Initially hidden

  // scrolls and hids the button on click
  button.addEventListener('click', function() {
    if (lastClickedAnchor) {
      lastClickedAnchor.scrollIntoView({ behavior: 'smooth', block: 'end' });
      button.style.display = 'none'
    }
  });
  
  // Append the button to the body
  waitForElmById('page-manager').then(x => {x.appendChild(button);});
  return button;
}


backButton = createBackButton();


// Function to handle anchor tag clicks
document.addEventListener('click', function(event) {
	if (event.target.tagName.toLowerCase() === 'a') {   // Check if the clicked element is an anchor tag

    backButton.style.display = 'block';
    lastClickedAnchor = event.target;

    //event.preventDefault();  // Prevent default navigation (optional)
    //console.debug('clicked link element:', event.target);
  }
});
