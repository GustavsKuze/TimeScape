const slicerMenuContent = `
    <div id="slicerTitleCard">
        <img src="../../Assets/cut.png" alt="titleImage" class="medium-static-icon animatable" id="slicerTitleImage">
            <div id="slicerTitleCardText">
                <p class="orange-48 animatable" id="slicerTitleCardLine1">Slicer</p>
                <p class="yellow-32 animatable" id="slicerTitleCardLine2">Wallpaper Creator</p>
            </div>

        <img src="../../Assets/back.png" alt="backImage" class="medium-dynamic-icon animatable" id="slicerBackImage">
    </div>
`
const slicerMenuScripts = ["../SlicerPage/startAnimation.js", "../SlicerPage/clickManager.js"];

// Load content
container.innerHTML = slicerMenuContent;

// Load Scripts
function loadScript(scriptSrc, targetContainer) {
    const script = document.createElement('script');
    script.src = scriptSrc;

    targetContainer.appendChild(script);
}

slicerMenuScripts.forEach(scriptSrc => {
    loadScript(scriptSrc, container);
});