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

    if(window.localStorage.key('titulo')){
        titulos = window.localStorage.getItem('titulo').split(',') || '';
        descricoes = window.localStorage.getItem('descricao').split(',') || '';
        cores = window.localStorage.getItem('cor').split(',') || '';
        for(let i = 0; i < titulos.length; i++){
            let nota = `<div class="note"><div class="head"><p>${titulos[i]}</p></div><div class="body"><div class="body-conteudo"><div class="nota-info"> <div class="ck-finalizado"><input type="checkbox" name="finalizado" id="finalizado"><label for="finalizado">Finalizado</label></div><div class="nota-data"><span>00/00/0000</span></div></div><p>${descricoes[i]}</p></div></div></div>`;
            espacoNota.innerHTML += nota;
        }
    }

    let espacoNota = document.querySelector('.principal');
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

function mudaCor(){

}