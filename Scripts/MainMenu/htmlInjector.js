const content = `
    <!-- Title Card -->
    <div id="titleCard">
        <img src="../../Assets/icon.ico" alt="titleImage" class="medium-static-icon animatable" id="titleImage">
            <div id="titleCardText">
                <p class="orange-48" id="titleCardLine1">TimeScape</p>
                <p class="yellow-32" id="titleCardLine2">Control Pannel</p>
            </div>
    </div>

    <!-- Slicer Box -->
    <div id="pagePicker">
        <p class="orange-48" id="pagePickerText">Control Options</p>

            <div id="pageButtonsContainer">
                <div id="slicerContainer">
                    <img src="../../Assets/cut.png" alt="cutImage" class="large-dynamic-icon" id="cutImage">
                    <p class="yellow-24" id="slicerText">Slice a file</p>
                </div>
                <div id="displayContainer">
                    <img src="../../Assets/desktop.png" alt="monitorImage" class="large-dynamic-icon" id="monitorImage">
                    <p class="yellow-24" id="displayText">Manage Wallpaper</p>
                </div>
                <div id="folderContainer">
                    <img src="../../Assets/folder.png" alt="folderImage" class="large-dynamic-icon" id="folderImage">
                    <p class="yellow-24" id="folderText">Open Assets</p>
                </div>
            </div>
    </div>
`
const scripts = ["../MainMenu/startAnimation.js", "../MainMenu/clickManager.js"];

// Load content
const container = document.getElementById('wholePage');
container.innerHTML = content;

// Load Scripts
function loadScript(scriptSrc, targetContainer) {
    const script = document.createElement('script');
    script.src = scriptSrc;

    targetContainer.appendChild(script);
}

scripts.forEach(scriptSrc => {
    loadScript(scriptSrc, container);
});