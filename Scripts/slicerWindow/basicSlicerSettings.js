// athat starting one
const mainContainer = document.getElementById('slicerSettingsContainer');
const basicButton = document.getElementById('basic');

const basicContent = `
    <div id="fileSelection">
        <p class="filePath" id="filePath">No file selected (.mp4)</p>
        <img src="../../Assets/folder.png" alt="folderImage" class="folderImage" id="folderImage">
    </div>
`;

// HTML
const container = document.getElementById('slicerOptions');

const errorContent = `
    <div id="errorBlock">
        <img src="../../Assets/error.png" alt="errorImage" class="errorImage" id="errorImage">
        <p class="filePath" id="filePath">Invalid file type selected. Please select a .mp4 file.</p>
    </div>
`;

const validContent = `
    <div id="validContent">
        <video id="videoPlayer" width="640" height="360" controls></video>

    </div>
`

// Get FilePath
basicButton.addEventListener('click', () => {
    mainContainer.innerHTML = basicContent;
    container.innerHTML = ``;

    const folderImage = document.getElementById('folderImage');
    if (folderImage) {
        folderImage.addEventListener('click', async () => {
            const filePath = await window.electronAPI.openFileDialog();
            if (filePath) {
                // Check if the file extension is .mp4 (case-insensitive)
                if (filePath.toLowerCase().endsWith('.mp4')) {
                    document.getElementById('filePath').textContent = filePath;

                    // Display HTML for valid mp4 file
                    container.innerHTML = validContent;

                    const videoPlayer = document.getElementById('videoPlayer');
                    videoPlayer.src = `file://${filePath}`;
                } else {
                    // If not an mp4 file, show error content
                    document.getElementById('filePath').textContent = 'No file selected (.mp4)';
                    container.innerHTML = errorContent;
                }
            } else {
                document.getElementById('filePath').textContent = 'No file selected (.mp4)';
                container.innerHTML = errorContent;
            }
        });
    }
});
