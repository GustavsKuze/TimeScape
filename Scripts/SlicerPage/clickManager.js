// Common
function loadScript(scriptSrc, targetContainer) {
    const script = document.createElement('script');
    script.src = scriptSrc;

    targetContainer.appendChild(script);
}

// Back Icon
const backImage = document.getElementById('slicerBackImage');
backImage.addEventListener('click', () => {
    // loadScript("../MainMenu/endAnimation.js", container);

    setTimeout(() => {
        loadScript("../MainMenu/htmlInjector.js", container);
    }, 2000); 
});
