// Get necessary elements from the HTML
const fileInput = document.getElementById('file-input');
const imageContainer = document.getElementById('image-container');
const clickableImage = document.getElementById('clickable-image');
const pointCounter = document.getElementById('point-counter');

// Initialize the score
let score = 0;

// Function to handle the image upload
fileInput.addEventListener('change', (event) => {
    // Get the selected file
    const file = event.target.files[0];

    if (file) {
        // Reset the environment for the new image
        resetPoints(); 
        
        // 1. Create a new FileReader object
        const reader = new FileReader();

        // 2. Define what happens when the file is successfully read
        reader.onload = (e) => {
            // e.target.result contains the data URL (base64 string) of the image
            clickableImage.src = e.target.result;
            
            // Make the image visible now that it has a source
            clickableImage.style.visibility = 'visible'; 
        };

        // 3. Read the file as a Data URL
        // This is a synchronous operation that triggers the onload event when complete
        reader.readAsDataURL(file);
    }
});

// Function to reset points when a new image is loaded
function resetPoints() {
    // Clear all existing point elements from the container
    const points = imageContainer.querySelectorAll('.point');
    points.forEach(point => point.remove());

    // Reset the counter
    score = 0;
    pointCounter.textContent = score;
}


// Event listener for adding points (remains the same)
imageContainer.addEventListener('click', (event) => {
    // Only allow clicking if an image is actually loaded (i.e., has a src)
    if (!clickableImage.src || clickableImage.style.visibility === 'hidden') {
        alert("Please upload an image first!");
        return;
    }

    if(score >= 15) {
        alert("Too Many Points. (>15)");
        return;
    }

    const x = event.offsetX;
    const y = event.offsetY;

    const newPoint = document.createElement('div');
    newPoint.classList.add('point');
    
    newPoint.style.left = `${x}px`;
    newPoint.style.top = `${y}px`;

    newPoint.style.backgroundColor = `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;

    imageContainer.appendChild(newPoint);

    score++;
    pointCounter.textContent = score;
});
