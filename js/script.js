let btnAdd = document.querySelector('.add');
let btnClear = document.querySelector('.remove');
const elemento = document.querySelector('.zona-add');
btnAdd.addEventListener('click', () => {exibeFuncaoAddNota()})
btnClear.addEventListener('click', () => {
    window.localStorage.clear();
    let espacoNota = document.querySelector('.principal');
    espacoNota.innerHTML = '';
})
let corID;
let listaTitulos = [];
let listaDescricoes = [];
let listaCores = [];
function exibeFuncaoAddNota(){
    elemento.style.display = 'block';
    elemento.classList.add('anim-in');
    selecionaCor();
}
function selecionaCor(){
    let cores = document.getElementsByClassName('box');
    for(let i = 0; i < cores.length; i++){
        cores[i].addEventListener('click',() => {
            corID = i;
        });   
    }
}
function adicionaNota(){
    let espacoNota = document.querySelector('.principal');
    let titulo = document.getElementById('txt-title');
    let descricao = document.getElementById('txt-desc');
    let titulos = '';
    let descricoes = '';
    let cores = '';
    if(window.localStorage.key('titulo')){
        titulos = window.localStorage.getItem('titulo');
        listaTitulos = titulos.split(',');

        descricoes = window.localStorage.getItem('descricao');
        listaDescricoes = descricoes.split(',');

        cores = window.localStorage.getItem('cor');
        listaCores = cores.split(',');
    }

    if(titulo.value == ''){
        titulo.focus();
    } else if(descricao.value == ''){
        descricao.focus();
    } else{
        /*let nota = `<div class="note"><div class="head"><p>${titulo.value}</p></div><div class="body"><div class="body-conteudo"><textarea readonly>${descricao.value}</textarea></div></div></div>`;*/

        let nota = `<div class="note"><div class="head"><p>${titulo.value}</p></div><div class="body"><div class="body-conteudo"><div class="nota-info"><div class="ck-finalizado"><input type="checkbox" name="finalizado" id="finalizado"><label for="finalizado">Finalizado</label></div><div class="nota-data"><span>00/00/0000</span></div></div><p>${descricao.value}</p></div></div></div>`;
        espacoNota.innerHTML += nota;
        listaTitulos.push(titulo.value);
        listaDescricoes.push(descricao.value)
        listaCores.push(corID);
        window.localStorage.setItem('titulo', listaTitulos);
        window.localStorage.setItem('descricao', listaDescricoes);
        window.localStorage.setItem('cor', listaCores);
        titulo.value = '';
        descricao.value = '';
        escondeFuncaoAddNota();
    }
}

function escondeFuncaoAddNota(){
    setTimeout(() => {elemento.style.display = 'none';}, 250);
    elemento.classList.remove('anim-in');
    elemento.classList.add('anim-out');
    setTimeout(() => {elemento.classList.remove('anim-out');}, 300);

}
function carregaNotasSalvas(){
    let titulos = '';
    let descricoes = '';
    let cores = '';
    let btnTema = document.querySelector('.theme');
    let espacoNota = document.querySelector('.principal');

    if(window.localStorage.key('titulo')){
        titulos = window.localStorage.getItem('titulo').split(',');
        descricoes = window.localStorage.getItem('descricao').split(',');
        cores = window.localStorage.getItem('cor').split(',');
        for(let i = 0; i < titulos.length; i++){
            let nota = `<div class="note"><div class="head"><p>${titulos[i]}</p></div><div class="body"><div class="body-conteudo"><div class="nota-info"> <div class="ck-finalizado"><input type="checkbox" name="finalizado" id="finalizado"><label for="finalizado">Finalizado</label></div><div class="nota-data"><span>00/00/0000</span></div></div><p>${descricoes[i]}</p></div></div></div>`;
            espacoNota.innerHTML += nota;
        }
    }

    if(window.localStorage.key('Tema-modo')){
        document.body.classList = window.localStorage.getItem('Tema-modo');
        btnTema.style.background = window.localStorage.getItem('Tema-img');
        btnTema.style.backgroundPosition = 'center';

    }

}
carregaNotasSalvas();

let btnTema = document.querySelector('.theme');
let mudouTema = false;

btnTema.addEventListener('click', () => {
    if(window.localStorage.key('Tema-mudouTema')){
        mudouTema = 'true' == window.localStorage.getItem('Tema-mudouTema') ? true : false;
    }
    mudouTema = !mudouTema;
    document.body.classList.toggle('dark-theme');

    if(mudouTema == true){
        btnTema.style.background = '#FFFFFF url(../images/icon_light.svg)';
        window.localStorage.setItem('Tema-modo', 'light-theme dark-theme');
        window.localStorage.setItem('Tema-img', '#FFFFFF url(../images/icon_light.svg)');
        window.localStorage.setItem('Tema-mudouTema', mudouTema);
        
    } else{
        
        btnTema.style.background = '#000000 url(../images/icon_dark.svg)';
        window.localStorage.setItem('Tema-modo', 'light-theme');
        window.localStorage.setItem('Tema-img','#000000 url(../images/icon_dark.svg)');
        window.localStorage.setItem('Tema-mudouTema', mudouTema);
        
    }
    btnTema.style.backgroundPosition = 'center';


    
})

let btnCor = document.querySelector('.change');
btnCor.addEventListener('click', mudaCor);
let clicouBtnCor = false;

function mudaCor(){
    clicouBtnCor = !clicouBtnCor;
    let barraCor = document.querySelector('.barra-lateral-suspensa');

    if(clicouBtnCor){
        barraCor.style.display = 'flex';
    } else{
        barraCor.style.display = 'none';
    }

    let btnCiano = document.querySelector('.ciano');
    btnCiano.addEventListener('click', () => {
        document.querySelector('header').style.backgroundColor = 'var(--ciano)';
        document.querySelectorAll('.head').forEach(element =>{element.style.backgroundColor = 'var(--ciano)'; });
        document.querySelectorAll('.note').forEach(element =>{element.style.borderColor = 'var(--ciano)'; element.style.boxShadow = '0 0 4px var(--ciano)';});
        document.querySelectorAll('.note').forEach(element =>{element.style.borderColor = 'var(--ciano)'; }); 
    });
    let btnAzulEscuro = document.querySelector('.azul-escuro');
    btnAzulEscuro.addEventListener('click', () => {
        document.querySelector('header').style.backgroundColor = 'var(--azul-escuro)'; 
        document.querySelectorAll('.head').forEach(element =>{element.style.backgroundColor = 'var(--azul-escuro)'; });
        document.querySelectorAll('.note').forEach(element =>{element.style.borderColor = 'var(--azul-escuro)'; element.style.boxShadow = '0 0 4px var(--azul-escuro)';});
        document.querySelectorAll('.note').forEach(element =>{element.style.borderColor = 'var(--azul-escuro)'; });
    });
    let btnRoxo = document.querySelector('.roxo');
    btnRoxo.addEventListener('click', () => {
        document.querySelector('header').style.backgroundColor = 'var(--roxo)'; 
        document.querySelectorAll('.head').forEach(element =>{element.style.backgroundColor = 'var(--roxo)'; });
        document.querySelectorAll('.note').forEach(element =>{element.style.borderColor = 'var(--roxo)'; element.style.boxShadow = '0 0 4px var(--roxo)';});
        document.querySelectorAll('.note').forEach(element =>{element.style.borderColor = 'var(--roxo)'; });
    });
    let btnRosaEscuro = document.querySelector('.rosa-escuro');
    btnRosaEscuro.addEventListener('click', () => {
        document.querySelector('header').style.backgroundColor = 'var(--rosa-escuro)'; 
        document.querySelectorAll('.head').forEach(element =>{element.style.backgroundColor = 'var(--rosa-escuro)'; });
        document.querySelectorAll('.note').forEach(element =>{element.style.borderColor = 'var(--rosa-escuro)'; element.style.boxShadow = '0 0 4px var(--rosa-escuro)';});
        document.querySelectorAll('.note').forEach(element =>{element.style.borderColor = 'var(--rosa-escuro)'; });
    });
    let btnRosa = document.querySelector('.rosa');
    btnRosa.addEventListener('click', () => {
        document.querySelector('header').style.backgroundColor = 'var(--rosa)'; 
        document.querySelectorAll('.head').forEach(element =>{element.style.backgroundColor = 'var(--rosa)'; });
        document.querySelectorAll('.note').forEach(element =>{element.style.borderColor = 'var(--rosa)'; element.style.boxShadow = '0 0 4px var(--rosa)';});
        document.querySelectorAll('.note').forEach(element =>{element.style.borderColor = 'var(--rosa)'; });
    });
    let btnVermelho = document.querySelector('.vermelho');
    btnVermelho.addEventListener('click', () => {
        document.querySelector('header').style.backgroundColor = 'var(--vermelho)'; 
        document.querySelectorAll('.head').forEach(element =>{element.style.backgroundColor = 'var(--vermelho)'; });
        document.querySelectorAll('.note').forEach(element =>{element.style.borderColor = 'var(--vermelho)'; element.style.boxShadow = '0 0 4px var(--vermelho)';});
        document.querySelectorAll('.note').forEach(element =>{element.style.borderColor = 'var(--vermelho)'; });
    });
    let btnAmarelo = document.querySelector('.amarelo');
    btnAmarelo.addEventListener('click', () => {
        document.querySelector('header').style.backgroundColor = 'var(--amarelo)'; 
        document.querySelectorAll('.head').forEach(element =>{element.style.backgroundColor = 'var(--amarelo)'; });
        document.querySelectorAll('.note').forEach(element =>{element.style.borderColor = 'var(--amarelo)'; element.style.boxShadow = '0 0 4px var(--amarelo)';});
        document.querySelectorAll('.note').forEach(element =>{element.style.borderColor = 'var(--amarelo)'; });
    });
    let btnVerde = document.querySelector('.verde');
    btnVerde.addEventListener('click', () => {
        document.querySelector('header').style.backgroundColor = 'var(--verde)'; 
        document.querySelectorAll('.head').forEach(element =>{element.style.backgroundColor = 'var(--verde)'; });
        document.querySelectorAll('.note').forEach(element =>{element.style.borderColor = 'var(--verde)'; element.style.boxShadow = '0 0 4px var(--verde)';});
        document.querySelectorAll('.note').forEach(element =>{element.style.borderColor = 'var(--verde)'; });
    });
}