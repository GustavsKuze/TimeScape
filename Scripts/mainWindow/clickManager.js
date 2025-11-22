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
