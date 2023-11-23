const color1 = document.getElementsByClassName('color')[0];
const color2 = document.getElementsByClassName('color')[1];
const color3 = document.getElementsByClassName('color')[2];
const color4 = document.getElementsByClassName('color')[3];
const pixelFrame = document.getElementById('pixel-board');
const getBtnInput = document.getElementById('generate-board');
const getPixelBoard = document.getElementById('pixel-board');
const getPixelSection = document.getElementsByClassName('pixel-section');
const getCollorPalette = document.getElementById('color-palette');
const getClassSelected = document.getElementsByClassName('selected');
const btnClear = document.getElementById('clear-board');
const getPixel = document.getElementsByClassName('pixel');
const btnGenerationColor = document.getElementById('button-random-color');

/* Definindo as cores dos elemento */
color1.style.backgroundColor = 'black';
const getColor = JSON.parse(localStorage.getItem('colorPalette'));
if (!getColor) {
  color2.style.backgroundColor = 'blue';
} else {
  color2.style.backgroundColor = getColor.color2;
}
if (!getColor) {
  color3.style.backgroundColor = 'yellow';
} else {
  color3.style.backgroundColor = getColor.color3;
}
if (!getColor) {
  color4.style.backgroundColor = 'green';
} else {
  color4.style.backgroundColor = getColor.color4;
}

/* Funcao que gera cores aleatorias */
function generateColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

/* Define a cor preta que e fixa, no localStorage */
localStorage.setItem('colorSelected', 'black');

/* Logica de atribuir a cor selecionada na paleta e salvar no localStorage */
getCollorPalette.addEventListener('click', (e) => {
  for (let index = 0; index < getClassSelected.length; index += 1) {
    getClassSelected[index].classList.remove('selected');
  }
  if (e.target.className === 'color') {
    e.target.classList.add('selected');
    localStorage.setItem('colorSelected', e.target.style.backgroundColor);
  }
});

/* Botao que gera cores aleatorias */
btnGenerationColor.addEventListener('click', () => {
  color2.style.backgroundColor = generateColor();
  color3.style.backgroundColor = generateColor();
  color4.style.backgroundColor = generateColor();

  const saveColor = {
    color2: color2.style.backgroundColor = generateColor(),
    color3: color3.style.backgroundColor = generateColor(),
    color4: color4.style.backgroundColor = generateColor(),
  };

  localStorage.setItem('colorPalette', JSON.stringify(saveColor));
});

/* Logica para limpar as cores dos pixels */
btnClear.addEventListener('click', () => {
  for (let i = 0; i < getPixel.length; i += 1) {
    getPixel[i].style.backgroundColor = 'white';
  }

  const getPixelsColors = JSON.parse(localStorage.getItem('pixelBoard'));
  const savePixels = [];
  for (let i = 0; i < getPixelsColors.length; i += 1) {
    savePixels.push(getPixelsColors[i] = 'white');
  }
  localStorage.setItem('pixelBoard', JSON.stringify(savePixels));
});

/* Logica de capturar a cor selecionada no localStorage e atribuir ao pixel */
getPixelBoard.addEventListener('click', (e) => {
  const getColorSelected = localStorage.getItem('colorSelected');
  if (e.target.className === 'pixel') {
    e.target.style.backgroundColor = getColorSelected;
  }
  const savePixels = [];
  for (let i = 0; i < getPixel.length; i += 1) {
    savePixels.push(getPixel[i].style.backgroundColor);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(savePixels));
});

/* Cria o quadro de pixels */
function valueInputLocalStorage() {
  const valueInput = JSON.parse(localStorage.getItem('valueInput'));
  if (!valueInput) {
    localStorage.setItem('valueInput', 5);
  }
}

valueInputLocalStorage();

const creatPixelBoard = (value) => {
  for (let a = 0; a < value; a += 1) {
    const pixelSection = document.createElement('div');
    pixelFrame.appendChild(pixelSection);
    pixelSection.className = 'pixel-section';
    for (let i = 0; i < value; i += 1) {
      const element = document.createElement('div');
      pixelSection.appendChild(element);
      element.className = 'pixel';
      element.style.backgroundColor = 'white';
    }
  }
};

const valueInput = JSON.parse(localStorage.getItem('valueInput'));
creatPixelBoard(valueInput);

/* Funcao que remove todos os pixels */
function removeChildren() {
  for (let i = getPixel.length - 1; i >= 0; i -= 1) {
    getPixel[i].parentNode.removeChild(getPixel[i]);
  }
  for (let a = getPixelSection.length - 1; a >= 0; a -= 1) {
    getPixelSection[a].parentNode.removeChild(getPixelSection[a]);
  }
}

/* Botao para criar novo quadro */
getBtnInput.addEventListener('click', () => {
  const getValueInput = document.getElementById('board-size').value;
  if (!getValueInput) {
    alert('Board inválido!');
  } if (getValueInput > 0) {
    localStorage.setItem('valueInput', getValueInput);
    const newValueInput = JSON.parse(localStorage.getItem('valueInput'));
    removeChildren();
    creatPixelBoard(newValueInput);
  }
});

/* funcao que carrega o quadro de pixels (desenho) salvo no localStorage */
function loadPixels() {
  const getPixelsColors = JSON.parse(localStorage.getItem('pixelBoard'));
  if (getPixelsColors) {
    for (let i = 0; i < getPixel.length; i += 1) {
      getPixel[i].style.backgroundColor = getPixelsColors[i];
    }
  }
}

loadPixels();
