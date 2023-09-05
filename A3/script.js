let t = 0; // time variable
let movementOption = 'Circular'; // Default movement option
let particleShape = 'Circle'; // Default particle shape
let sizeSlider; // Particle size slider
let rSlider, gSlider, bSlider; // RGB sliders
let movementSpeed = 0.005; // Default speed
let audioSunny, audioRainy, audioWindy; // Audio elements

function setup() {
    let cnv = createCanvas(500,500);
    cnv.parent('column-one');
    noStroke();
    fill(40, 200, 40);
    
    let radioText = createP('1. Choose the direction in which you wish to channel these feelings.');
  radioText.parent('column-two');
  radioText.class('LabelText');

    // Create radio buttons for movement options
  let movementRadio = createRadio();
  movementRadio.option('Horizontal');
  movementRadio.option('Vertical');
  movementRadio.option('Circular');
  movementRadio.option('Diagonal'); // Add diagonal movement option
  movementRadio.selected('Circular'); // Default selection
  movementRadio.changed(changeMovement); // Call changeMovement function when radio changes
  movementRadio.parent('column-two');
  movementRadio.class('Radio');

  let shapeText = createP('2. Which one of these shapes embody you right now?');
  shapeText.parent('column-two');
  shapeText.class('LabelText');

     // Create a dropdown menu for particle shapes
  let shapeDropdown = createSelect();
  shapeDropdown.option('Circle');
  shapeDropdown.option('Square');
  shapeDropdown.option('Triangle');
  shapeDropdown.changed(changeShape); // Call changeShape function when dropdown changes
  shapeDropdown.parent('column-two');
  shapeDropdown.class('Dropdown');

  let sizeText = createP('3. How large are these emotions?');
  sizeText.parent('column-two');
  sizeText.class('LabelText');

  // Create a slider for particle size
  sizeSlider = createSlider(5, 50, 10); // Particle size slider
  sizeSlider.parent('column-two');
  sizeSlider.class('Sliders');

  let speedText = createP('4. What is the intensity of this feeling?');
  speedText.parent('column-two');
  speedText.class('LabelText');

  // Create a speed slider
  speedSlider = createSlider(0.001, 0.02, 0.005, 0.001); // Speed slider
  speedSlider.parent('column-two');
  speedSlider.class('Sliders');

  let rsliderText = createP('5. Which colour would best describe your mood at the moment?');
  rsliderText.parent('column-two');
  rsliderText.class('LabelText');

  // Create RGB sliders
  rSlider = createSlider(0, 255, 40); // Red slider
  rSlider.parent('column-two');
  rSlider.class('Sliders');

  gSlider = createSlider(0, 255, 200); // Green slider
  gSlider.parent('column-two');
  gSlider.class('Sliders');

  bSlider = createSlider(0, 255, 40); // Blue slider
  bSlider.parent('column-two');
  bSlider.class('Sliders');

  let audioText = createP('6. Pick an audio that suits your emotions.');
  audioText.parent('column-two');
  audioText.class('LabelText');


   // Create audio elements
   audioSunny = createAudio('sound/summer.mp3');
   audioRainy = createAudio('sound/rain.mp3');
   audioWindy = createAudio('sound/wind.mp3');
   audioSunny.hide();
   audioRainy.hide();
   audioWindy.hide();
 
   // Create buttons for audio
   let sunnyButton = createButton('Sunny Day');
   sunnyButton.parent('column-two');
   sunnyButton.class('Buttons');
   sunnyButton.mousePressed(() => playAudio(audioSunny));
 
   let rainyButton = createButton('Rainy Day');
   rainyButton.parent('column-two');
   rainyButton.class('Buttons')
   rainyButton.mousePressed(() => playAudio(audioRainy));
 
   let windyButton = createButton('Windy Day');
   windyButton.parent('column-two');
   windyButton.class('Buttons');
   windyButton.mousePressed(() => playAudio(audioWindy));
  
  }
  
  function draw() {
      background(10, 10); // translucent background (creates trails)

      // Set the fill color based on the RGB sliders
  fill(rSlider.value(), gSlider.value(), bSlider.value());

    
     // make an x and y grid of particles
  for (let x = 0; x <= width; x = x + 30) {
    for (let y = 0; y <= height; y = y + 30) {
      let myX, myY;

      // Calculate particle position based on the selected movement option
      if (movementOption === 'Horizontal') {
        myX = x + 20 * cos(2 * PI * t); // Move horizontally
        myY = y;
      } else if (movementOption === 'Vertical') {
        myX = x;
        myY = y + 20 * cos(2 * PI * t); // Move vertically
      } else if (movementOption === 'Diagonal') {
        myX = x + 20 * cos(2 * PI * t); // Combine horizontal and vertical movement
        myY = y + 20 * cos(2 * PI * t);
      } else {
        myX = x + 20 * cos(2 * PI * t); // Move circularly
        myY = y + 20 * sin(2 * PI * t);
      }

      // Draw particles based on the selected shape and size
      if (particleShape === 'Circle') {
        ellipse(myX, myY, sizeSlider.value()); // draw circle with size
      } else if (particleShape === 'Square') {
        rect(myX, myY, sizeSlider.value(), sizeSlider.value()); // draw square with size
      } else if (particleShape === 'Triangle') {
        triangle(
          myX, myY - sizeSlider.value() / 2,
          myX + sizeSlider.value() / 2, myY + sizeSlider.value() / 2,
          myX - sizeSlider.value() / 2, myY + sizeSlider.value() / 2
        ); // draw triangle with size
      }
    }
  }
    
  t = t + speedSlider.value(); // update time with movement speed
    }
    function changeMovement() {
      // Change the movement option based on the selected radio button
      movementOption = this.value();
    }
    function changeShape() {
      // Change the particle shape based on the selected dropdown option
      particleShape = this.value();
    }
    function playAudio(audioElement) {
      audioSunny.stop();
      audioRainy.stop();
      audioWindy.stop();
      audioElement.play();
    }
    
