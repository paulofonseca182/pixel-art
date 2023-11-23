const color1 = document.getElementsByClassName('color')[0];

color1.style.backgroundColor = 'black';

const color2 = document.getElementsByClassName('color')[1];

color2.style.backgroundColor = 'blue';

const color3 = document.getElementsByClassName('color')[2];

color3.style.backgroundColor = 'yellow';

const color4 = document.getElementsByClassName('color')[3];

color4.style.backgroundColor = 'green';

const btnGenerationColor = document.getElementById('button-random-color');

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
});
