const color1 = document.getElementsByClassName('color')[0];
const color2 = document.getElementsByClassName('color')[1];
const color3 = document.getElementsByClassName('color')[2];
const color4 = document.getElementsByClassName('color')[3];
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

function generateColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

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
