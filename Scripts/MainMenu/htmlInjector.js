const mainMenuContent = `
    <!-- Title Card -->
    <div id="titleCard">
        <img src="../../Assets/icon.ico" alt="titleImage" class="medium-static-icon animatable" id="titleImage">
            <div id="titleCardText">
                <p class="orange-48 animatable" id="titleCardLine1">TimeScape</p>
                <p class="yellow-32 animatable" id="titleCardLine2">Control Pannel</p>
            </div>
    </div>

    <!-- Slicer Box -->
    <div id="pagePicker">
        <p class="orange-48 animatable" id="pagePickerText">Control Options</p>

            <div id="pageButtonsContainer">
                <div id="slicerContainer">
                    <img src="../../Assets/cut.png" alt="cutImage" class="large-dynamic-icon animatable" id="cutImage">
                    <p class="yellow-24 animatable" id="slicerText">Slice a file</p>
                </div>
                <div id="displayContainer">
                    <img src="../../Assets/desktop.png" alt="monitorImage" class="large-dynamic-icon animatable" id="monitorImage">
                    <p class="yellow-24 animatable" id="displayText">Manage Wallpaper</p>
                </div>
                <div id="folderContainer">
                    <img src="../../Assets/folder.png" alt="folderImage" class="large-dynamic-icon animatable" id="folderImage">
                    <p class="yellow-24 animatable" id="folderText">Open Assets</p>
                </div>
            </div>
    </div>
`
const mainMenuScripts = ["../MainMenu/startAnimation.js", "../MainMenu/clickManager.js"];

// Load content
const container = document.getElementById('wholePage');
container.innerHTML = mainMenuContent;

// Load Scripts
function loadScript(scriptSrc, targetContainer) {
    const script = document.createElement('script');
    script.src = scriptSrc;

    targetContainer.appendChild(script);
}

mainMenuScripts.forEach(scriptSrc => {
    loadScript(scriptSrc, container);
});