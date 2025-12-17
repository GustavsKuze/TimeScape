// Page Resize
window.electronAPI.resizeWindow(1200, 750);

// ! Delay needed for resize duration
setTimeout(() => {
// Title Card
    startAnimation('slicerTitleImage', 1.25, 0.3);

    startAnimation('slicerTitleCardLine1', 1.2, 0.2);
    startAnimation('slicerTitleCardLine2', 1.2, 0.2);

    startAnimation('slicerBackImage', 1.25, 0.3);
}, 200); 