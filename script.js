/* Capturando os elementos */
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

/* Botao que gera cores aleatorias */
btnGenerationColor.addEventListener('click', () => {
  const saveColor = {
    color2: color2.style.backgroundColor = generateColor(),
    color3: color3.style.backgroundColor = generateColor(),
    color4: color4.style.backgroundColor = generateColor(),
  };

  localStorage.setItem('colorPalette', JSON.stringify(saveColor));
});

/* Botao para limpar as cores dos pixels */
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

/* Define a cor preta que e fixa, no localStorage */
localStorage.setItem('colorSelected', 'black');

/* Funcao que define o valor de input no localStorage */
function valueInputLocalStorage() {
  const valueInput = JSON.parse(localStorage.getItem('boardSize'));
  if (!valueInput) {
    localStorage.setItem('boardSize', 5);
  }
}

valueInputLocalStorage();

/* Cria o quadro de pixels */
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
const valueInput = JSON.parse(localStorage.getItem('boardSize'));
creatPixelBoard(valueInput);

/* Funcao que remove todos os parent de pixel e section-pixel */
function removeChildren() {
  for (let i = getPixel.length - 1; i >= 0; i -= 1) {
    getPixel[i].parentNode.removeChild(getPixel[i]);
  }
  for (let a = getPixelSection.length - 1; a >= 0; a -= 1) {
    getPixelSection[a].parentNode.removeChild(getPixelSection[a]);
  }
}

/* Funcao que verifica o valor do input */
function verifyInput(param) {
  if (param <= 50 && param >= 5) {
    localStorage.setItem('boardSize', param);
    const newValueInput = JSON.parse(localStorage.getItem('boardSize'));
    removeChildren();
    creatPixelBoard(newValueInput);
  } if (param > 50) {
    localStorage.setItem('boardSize', 50);
    const newValueInputBig = JSON.parse(localStorage.getItem('boardSize'));
    removeChildren();
    creatPixelBoard(newValueInputBig);
  } if (param < 5) {
    localStorage.setItem('boardSize', 5);
    const newValueInputSmall = JSON.parse(localStorage.getItem('boardSize'));
    removeChildren();
    creatPixelBoard(newValueInputSmall);
  }
}

/* Botao para criar novo quadro */
getBtnInput.addEventListener('click', () => {
  const getValueInput = document.getElementById('board-size').value;
  if (!getValueInput) {
    alert('Board inválido!');
  } else {
    verifyInput(getValueInput);
  }
});

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

/* Logica de capturar a cor selecionada no localStorage e atribuir ao pixel */
getPixelBoard.addEventListener('click', (e) => {
  const getColorSelected = localStorage.getItem('colorSelected');
  if (e.target.className === 'pixel') {
    e.target.style.backgroundColor = getColorSelected;
  }
  console.log(getPixel[0].style.backgroundColor);
  const savePixels = [];
  for (let i = 0; i < getPixel.length; i += 1) {
    savePixels.push(getPixel[i].style.backgroundColor);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(savePixels));
});

/* funcao que carrega o quadro de pixels (desenho) salvo no localStorage */
const getPixelsColors = JSON.parse(localStorage.getItem('pixelBoard'));
function loadPixels(param) {
  if (param) {
    for (let i = 0; i < getPixel.length; i += 1) {
      getPixel[i].style.backgroundColor = param[i];
    }
  }
}

loadPixels(getPixelsColors);

/* Logica que salva o desenho feito e o recarrega */
const save1 = document.getElementById('save1');
const design1 = document.getElementById('design1');
const save2 = document.getElementById('save2');
const design2 = document.getElementById('design2');
const save3 = document.getElementById('save3');
const design3 = document.getElementById('design3');

save1.addEventListener('click', () => {
  const getPixelBoardLocalStorage = localStorage.getItem('pixelBoard');
  const getBoardSizeLocalStorage = localStorage.getItem('boardSize');
  localStorage.setItem('save1-pixelBoard', getPixelBoardLocalStorage);
  localStorage.setItem('save1-boardSize', getBoardSizeLocalStorage);
  alert('Desenho 1 salvo!');
});

design1.addEventListener('click', () => {
  const newValueBoard = JSON.parse(localStorage.getItem('save1-boardSize'));
  const newValuePixel = JSON.parse(localStorage.getItem('save1-pixelBoard'));
  removeChildren();
  creatPixelBoard(newValueBoard);
  loadPixels(newValuePixel);
});

save2.addEventListener('click', () => {
  const getPixelBoardLocalStorage = localStorage.getItem('pixelBoard');
  const getBoardSizeLocalStorage = localStorage.getItem('boardSize');
  localStorage.setItem('save2-pixelBoard', getPixelBoardLocalStorage);
  localStorage.setItem('save2-boardSize', getBoardSizeLocalStorage);
  alert('Desenho 2 salvo!');
});

design2.addEventListener('click', () => {
  const newValueBoard = JSON.parse(localStorage.getItem('save2-boardSize'));
  const newValuePixel = JSON.parse(localStorage.getItem('save2-pixelBoard'));
  removeChildren();
  creatPixelBoard(newValueBoard);
  loadPixels(newValuePixel);
});

save3.addEventListener('click', () => {
  const getPixelBoardLocalStorage = localStorage.getItem('pixelBoard');
  const getBoardSizeLocalStorage = localStorage.getItem('boardSize');
  localStorage.setItem('save3-pixelBoard', getPixelBoardLocalStorage);
  localStorage.setItem('save3-boardSize', getBoardSizeLocalStorage);
  alert('Desenho 3 salvo!');
});

design3.addEventListener('click', () => {
  const newValueBoard = JSON.parse(localStorage.getItem('save3-boardSize'));
  const newValuePixel = JSON.parse(localStorage.getItem('save3-pixelBoard'));
  removeChildren();
  creatPixelBoard(newValueBoard);
  loadPixels(newValuePixel);
});
