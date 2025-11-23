// Link
const basicButton = document.getElementById('basic');
const complexButton = document.getElementById('complex');
const container = document.getElementById('slicerSettingsContainer');

// Content
const basicContent = `
    <p>Test</p>
`;

const complexContent = `
    <p>Test2</p>
`;

// Basic
basicButton.addEventListener('click', () => {
    // Get the content from data attribute and set it as the div's content
    container.innerHTML = basicContent;
});

// Advanced
complexButton.addEventListener('click', () => {
    // Get the content from data attribute and set it as the div's content
    container.innerHTML = complexContent;
});