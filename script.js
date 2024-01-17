// Get the canvas element
const canvas = document.getElementById('canvas');

// Get 2D context of the canvas
const ctx = canvas.getContext('2d');

// Set canvas width to window width
canvas.width = window.innerWidth;

// Set canvas height to window height
canvas.height = window.innerHeight;

// Create a gradient for the background
let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

// Add color stops to the gradient
gradient.addColorStop(0, 'red');
gradient.addColorStop(0.1, 'pink');
gradient.addColorStop(0.2, 'blue');
gradient.addColorStop(0.3, 'cyan');
gradient.addColorStop(0.4, 'green');
gradient.addColorStop(0.5, 'green');
gradient.addColorStop(0.6, 'yellow');
gradient.addColorStop(0.7, 'red');
gradient.addColorStop(0.8, 'orange');
gradient.addColorStop(0.9, 'pink');
gradient.addColorStop(1, 'purple');

// Symbol class
class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニ' + 
        'ヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメ' +
        'レヱゲゼデベペオォコソトホモヨョロヲゴゾドボポヴッン' +
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Character set
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.canvasHeight = canvasHeight;
    }

    draw(context) {
        // Randomly select a character
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));

        // Draw a filled rectangle (black) as the background
        context.fillStyle = 'black';
        context.fillRect((this.x * this.fontSize), (this.y * this.fontSize) - this.fontSize / 2 - 750, this.fontSize, this.fontSize);

        // Set the fill style to the gradient
        context.fillStyle = gradient; // Change gradient to '#0aff0a' for a 'Matrix green' effect

        // Draw the text
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);

        // Move the symbol down or reset if it reaches the bottom
        if (this.y * this.fontSize > canvas.height && Math.random() > 0.98) {
            this.y = 0;
        } else {
            this.y += 1;
        }
    }
}

// Effect class
class Effect {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 20;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.initialize();
        console.log(this.symbols);
    }

    initialize() {
        // Initialize symbols with random starting y positions
        for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Symbol(i, this.canvasHeight / Math.random(), this.fontSize, this.canvasHeight);
        }
    }

    resize(width, height) {
        // Update canvas dimensions and reinitialize symbols
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.initialize();
    }
}

// Create an instance of the Effect class
const effect = new Effect(canvas.width, canvas.height);

// Animation variables
let lastTime = 0;
const fps = 18;
const nextFrame = 1000 / fps;
let timer = 0;

// Animation function
function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    // Check if it's time to draw the next frame
    if (timer > nextFrame) {
        // Clear the canvas with a semi-transparent black
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.textAlign = 'center';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Set fill style to the gradient
        ctx.fillStyle = gradient;
        ctx.font = effect.fontSize + 'px monospace';
        
        // Draw symbols
        effect.symbols.forEach(symbol => symbol.draw(ctx));

        // Reset the timer
        timer = 0;
    } else {
        // Increment the timer
        timer += deltaTime;
    }

    // Request the next animation frame
    requestAnimationFrame(animate);
}

// Start the animation
animate(0);

// Resize event listener
window.addEventListener('resize', function () {
    // Update canvas dimensions and reinitialize symbols
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);
});
