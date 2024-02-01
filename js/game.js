const grid = document.querySelector('.grid');
const spanplayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const audio = document.querySelector('.audio');

const caracters = [
    'luffy',
    'zoro',
    'jimbe',
    'sanji',
    'franky',
    'ussop',
    'brook',
    'robin',
    'nami',
    'chopper',
    'bonney',
    'law',
];


const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;

}

let onecard = '';
let twocard = '';

const checkendgame = () => {
    const disablecards = document.querySelectorAll('.reveal-card')

    if(disablecards.length == 24){
        setTimeout(() =>{

          alert('Parabéns você conseguiu!!');
        
          window.location.reload()
        }, 500);  
    }
}

const checkcards = () => {
    const primeiroper = onecard.getAttribute('data-character');
    const segundoper = twocard.getAttribute('data-character');
    
    if (primeiroper == segundoper) {

            
            onecard = '';
            twocard = '';
            checkendgame ()

    } else {
        setTimeout(() =>{
            onecard.classList.remove('reveal-card');
            twocard.classList.remove('reveal-card');

            onecard = '';
            twocard = '';
        }, 500);
        
    }

}

const revealcard = ({target}) => {
    if(target.parentNode.className.includes('reveal-card')) {
     return;
    }

    if (onecard == ''){
    
      target.parentNode.classList.add('reveal-card');
      onecard = target.parentNode;
   
    } else if (twocard == '') {
      target.parentNode.classList.add('reveal-card');
      twocard = target.parentNode;

      checkcards();
    }
   
   
}


const createCart = (caracter) => {

    const card = createElement('div', 'card');
    const frente = createElement('div', 'frente');
    const tras = createElement('div', 'tras');
    
    frente.style.backgroundImage = `url('../img/${caracter}.jpeg')`;
    

    card.appendChild(frente);
    card.appendChild(tras);

    card.addEventListener('click', revealcard);
    card.setAttribute('data-character', caracter)

    return card;

}

const loadgame = () => {

    const duplopersonagem = [... caracters, ...caracters];

    const shuffledArrey = duplopersonagem.sort(() => Math.random() - 0.5 );

    shuffledArrey.forEach((caracter) => {

        const card = createCart(caracter);
        grid.appendChild(card);

    });
}

function playaudio() {
    let x = document.getElementById('myaudio');
    x.play();
  }

const startTimer = () => {

    setInterval(() => {

        const tempoatual = +timer.innerHTML;
        timer.innerHTML = tempoatual + 1;

    }, 1000);
}

window.onload =() => {

  spanplayer.innerHTML = localStorage.getItem('player');
  playaudio();
  startTimer();
  loadgame();
}

