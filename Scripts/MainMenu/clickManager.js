// Common
function loadScript(scriptSrc, targetContainer) {
    const script = document.createElement('script');
    script.src = scriptSrc;

    targetContainer.appendChild(script);
}

// Slicer Icon
const cutImage = document.getElementById('cutImage');
cutImage.addEventListener('click', () => {
    loadScript("../SlicerPage/htmlInjector.js", container);
});


// Folder Icon
const folderImage = document.getElementById('folderImage');
folderImage.addEventListener('click', () => {
    const folderPath = window.electronAPI.resolvePath('..', '..', 'Sliced Wallpapers');
    window.electronAPI.openPathInExplorer(folderPath);
});
