const slides = document.querySelectorAll('.slide');
const botaoCarrossel = document.querySelector("#btn-carrossel-proximo");

let carrosselAtual = 0;

botaoCarrossel.addEventListener('click', function(){

    slides[carrosselAtual].classList.remove('ativo');
    carrosselAtual++;
    
    if(carrosselAtual >= slides.length){
        carrosselAtual = 0;
    }
    slides[carrosselAtual].classList.add('ativo');

});