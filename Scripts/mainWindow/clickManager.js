// Slicer Icon
const transitionWidth = 1000;
const transitionHeight = 1000;

function slicerIncreasePageHeight() {
  let pageWidth = window.innerWidth;
  let pageHeight = window.innerHeight;
  let change = false;

  let x = pageWidth
  let y = pageHeight

  if (pageWidth < transitionWidth) {
    x = (pageWidth + 5);
    change = true;
  }

  if (pageHeight < transitionHeight) {
    y = (pageHeight + 5);
    change = true;
  }

  window.electronAPI.resizeWindow(x,y);

  if (change) {
    setTimeout(() => {
      requestAnimationFrame(slicerIncreasePageHeight);
    }, 10);
  }
}


window.addEventListener('DOMContentLoaded', () => {
  const folderImage = document.getElementById('cutImage');
  const wholePage = document.getElementById('wholePage'); // Make sure this exists

  folderImage.addEventListener('click', () => {
    // Animation
    wholePage.style.transform = 'translateY(100vh)';

    setTimeout(() => {
      // Page Size Increase
      window.electronAPI.resizeWindow(1000,1000);

      window.location.href = '../slicerWindow/index.html';
    }, 750);
  });
});


// Folder Icon
window.addEventListener('DOMContentLoaded', () => {
  const folderImage = document.getElementById('folderImage');
  if (folderImage) {
    folderImage.addEventListener('click', () => {
      const folderPath = window.electronAPI.resolvePath('..', 'Sliced Wallpapers');
      window.electronAPI.openPathInExplorer(folderPath);
    });
  } else {
    console.error('folderImage element not found');
  }
});
