const slicerMenuContent = `
    <div id="titleCard">
        <img src="../../Assets/cut.png" alt="cutImage" class="cutImage">

        <div id="titleCardText">
            <p class="titleCardLine1">TimeScape</p>
            <p class="titleCardLine2">Image Slicer</p>
        </div>
    </div>

    <!-- Simple/Advanced -->
    <div id="complexitySelection">
        <p class="basic" id="basic">Basic</p>
        <p class="complex" id="complex">Complex</p>
    </div>

    <!-- Control -->
    <div id="slicerSettingsContainer">
        <p class="unchosenTextBasic">Basic complexity syncs the background to the time of day based on the set midnight.</p>
        <p class="unchosenTextComplex">Complex syncs the background to major parts of the day based on the set timestamps and slows down and speeds up to sync to your locations time cycle.</p>
    </div>

    <div id="slicerOptions">
    </div>
`
const slicerMenuScripts = ["../SlicerPage/startAnimation.js"];

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