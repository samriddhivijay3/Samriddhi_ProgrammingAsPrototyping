let image1;
let image2;
let image3;
let image4;
let selectedImage;
let userInput;
let textSizeSlider;
let textColorSliders = [];
let fontRadio;
let addedTexts = [];
let textColor = [0, 0, 0];
let textSizeValue = 20;
let selectedFont = 'Arial';
let isPlacingText = false; 

function preload() {
  image1 = loadImage('https://i.imgur.com/mj4bgel.jpg');
  image2 = loadImage('https://i.imgur.com/Xg6owXd.jpg');
  image3 = loadImage('https://i.imgur.com/aykpWzD.jpg');
  image4 = loadImage('https://i.imgur.com/ZDEvUs0.png');
}

function setup() {
  
  let cnv = createCanvas(400, 400);
  cnv.parent('column-two');

  selectedImage = image1;

  let columnOneContainer = createDiv();
  columnOneContainer.parent('column-one');

  userInput = createInput().parent(columnOneContainer);

  createP('Text Size').parent(columnOneContainer);
  textSizeSlider = createSlider(10, 60, textSizeValue).parent(columnOneContainer);

  createP('Text Color (RGB)').parent(columnOneContainer);
  for (let i = 0; i < 3; i++) {
    textColorSliders.push(createSlider(0, 255, textColor[i]).parent(columnOneContainer));
  }

  createP('Font').parent(columnOneContainer);
  fontRadio = createRadio().parent(columnOneContainer);
  fontRadio.option('Arial');
  fontRadio.option('Verdana');
  fontRadio.option('Comic Sans MS');
  fontRadio.selected(selectedFont);
  fontRadio.changed(changeFont);

  let imageSelector = createSelect().parent(columnOneContainer);
  imageSelector.option('Image 1', 'image1');
  imageSelector.option('Image 2', 'image2');
  imageSelector.option('Image 3', 'image3');
  imageSelector.option('Image 4', 'image4');
  imageSelector.changed(changeImage);

  let saveButton = createButton('Save Image').parent(columnOneContainer);
  saveButton.id('save-button');
  saveButton.mousePressed(saveCanvasImage);
}

function draw() {
  background(66, 30, 34);

  let aspectRatio = selectedImage.width / selectedImage.height;
  let imgWidth = width;
  let imgHeight = width / aspectRatio;

  if (imgHeight > height) {
    imgHeight = height;
    imgWidth = height * aspectRatio;
  }

  let imgX = (width - imgWidth) / 2;
  let imgY = (height - imgHeight) / 2;

  image(selectedImage, imgX, imgY, imgWidth, imgHeight);

  fill(textColor);
  textSize(textSizeValue);
  textAlign(LEFT, TOP);
  textFont(selectedFont);

  if (isPlacingText) {
    
    text(userInput.value(), mouseX, mouseY);
  } else {
    
    for (let i = 0; i < addedTexts.length; i++) {
      let textPosition = addedTexts[i].position;
      text(addedTexts[i].text, textPosition.x, textPosition.y);
    }
  }
}

function changeImage() {
  let selectedOption = this.value();
  if (selectedOption === 'image1') {
    selectedImage = image1;
  } else if (selectedOption === 'image2') {
    selectedImage = image2;
  } else if (selectedOption === 'image3') {
    selectedImage = image3;
  } else if (selectedOption === 'image4') {
    selectedImage = image4;
  }
}

function mouseClicked() {
  if (isPlacingText) {

    addedTexts.push({
      text: userInput.value(),
      position: createVector(mouseX, mouseY),
    });
    userInput.value('');
    isPlacingText = false;
  } 
  else {
    isPlacingText = true; 
  }
}

function updateSliders() {
  textSizeValue = textSizeSlider.value();
  for (let i = 0; i < 3; i++) {
    textColor[i] = textColorSliders[i].value();
  }
}

function changeFont() {
  selectedFont = this.value();
}

function saveCanvasImage() {
  saveCanvas('edited_image', 'png');
}