function startAnimation(elementId, durationSeconds = 1, delaySeconds = 0) {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Set the function inputs into the class
    element.style.setProperty('--slide-duration-var', `${durationSeconds}s`);
    element.style.setProperty('--slide-delay-var', `${delaySeconds}s`); 

    // force the browser to refesh
    const _ = element.offsetHeight; 
    
    // Change the class
    setTimeout(() => {
        element.classList.add('postAnimation');
    }, 0); 
}