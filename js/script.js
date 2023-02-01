let elemento = document.querySelector('.zona-add');
let espacoNota = document.querySelector('.principal');
let barraCor = document.querySelector('.barra-lateral-suspensa');
let mudouTema = false;
let clicouBtnCor = false;

function limpaNotas(){
    localStorage.removeItem('notas');
    espacoNota.innerHTML = '';
}
function fadeIn(){
    elemento.style.display = 'flex';
    elemento.classList.add('anim-in');
}
function fadeOut(){
    setTimeout(() => {elemento.style.display = 'none';}, 250);
    elemento.classList.remove('anim-in');
    elemento.classList.add('anim-out');
    setTimeout(() => {elemento.classList.remove('anim-out');}, 300);

}

function adicionaNota(){
    let titulo = document.getElementById('txt-title');
    let descricao = document.getElementById('txt-desc');

    let notas = [];

    if(titulo.value == ''){
        titulo.focus();
    } else if(descricao.value == ''){
        descricao.focus();
    } else{

        if(localStorage.hasOwnProperty('notas')){
            notas = JSON.parse(localStorage.getItem('notas'));
            
        }
        //falta implementar data
        let dataTemporaria = new Date();
        let data = dataTemporaria.getDate() < 10 ? '0' + dataTemporaria.getDate() : dataTemporaria.getDate();
        data += (dataTemporaria.getMonth() + 1) < 10 ? '/0' + (dataTemporaria.getMonth() + 1) : '/' + dataTemporaria.getMonth() + 1;
        data += '/' + dataTemporaria.getFullYear().toString();
        console.log(data);
        notas.push({'titulo': titulo.value, 'descricao': descricao.value, 'dia': data});
        localStorage.setItem('notas', JSON.stringify(notas));
        
        let nota = `<div class="note"><div class="head"><p>${titulo.value}</p></div><div class="body"><div class="body-conteudo"><div class="nota-info"><div class="ck-finalizado"><input type="checkbox" name="finalizado" id="finalizado"><label for="finalizado">Finalizado</label></div><div class="nota-data"><span>${data}</span></div></div><p>${descricao.value}</p></div></div></div>`;

        espacoNota.innerHTML += nota;

        if(localStorage.hasOwnProperty('cor')){
            let cor = localStorage.getItem('cor');
            document.querySelector('header').style.backgroundColor = `var(--${cor})`;
            document.querySelectorAll('.head').forEach(element => {element.style.backgroundColor = `var(--${cor})`; });
            document.querySelectorAll('.note').forEach(element => {element.style.borderColor = `var(--${cor})`; element.style.boxShadow = `0 0 4px var(--${cor})`;});
            document.querySelectorAll('.note').forEach(element => {element.style.borderColor = `var(--${cor})`; }); 
        } else{
            ativaCiano();
        }
        titulo.value = '';
        descricao.value = '';
        fadeOut();
    }

}
function carregaNotas(){
    let btnTema = document.querySelector('.theme');

    if(localStorage.hasOwnProperty('notas')){
        let notas = []
        notas = JSON.parse(localStorage.getItem('notas'));
        for(let i = 0; i < notas.length; i++){
            let nota = `<div class="note"><div class="head"><p>${notas[i]['titulo']}</p></div><div class="body"><div class="body-conteudo"><div class="nota-info"> <div class="ck-finalizado"><input type="checkbox" name="finalizado" id="finalizado"><label for="finalizado">Finalizado</label></div><div class="nota-data"><span>${notas[i]['dia']}</span></div></div><p>${notas[i]['descricao']}</p></div></div></div>`;

            espacoNota.innerHTML += nota;
        }
    }

    if(localStorage.hasOwnProperty('Tema-modo')){
        document.body.classList = window.localStorage.getItem('Tema-modo');
        btnTema.style.background = window.localStorage.getItem('Tema-img');
        btnTema.style.backgroundPosition = 'center';

    } else{
        btnTema.style.background = '#000000 url(./images/icon_dark.svg)';
        btnTema.style.backgroundPosition = 'center';
    }
    carregaCor();
}
function carregaCor(){
    if(localStorage.hasOwnProperty('cor')){
        let cor = localStorage.getItem('cor');
        document.querySelector('header').style.backgroundColor = `var(--${cor})`;
        document.querySelectorAll('.head').forEach(element => {element.style.backgroundColor = `var(--${cor})`; });
        document.querySelectorAll('.note').forEach(element => {element.style.borderColor = `var(--${cor})`; element.style.boxShadow = `0 0 4px var(--${cor})`;});
        document.querySelectorAll('.note').forEach(element => {element.style.borderColor = `var(--${cor})`; });
        document.querySelector('.btn-criar button').style.color =  `var(--${cor})`;
        document.querySelector('.btn-criar button').addEventListener('mouseenter', ()=>{document.querySelector('.btn-criar button').style.color = `var(--bg-highlight)`});
        document.querySelector('.btn-criar button').addEventListener('mouseleave', ()=>{document.querySelector('.btn-criar button').style.color = `var(--${cor})`});
        document.querySelector('.btn-criar button').addEventListener('mouseenter', ()=>{document.querySelector('.btn-criar button').style.backgroundColor = `var(--${cor})`});
        document.querySelector('.btn-criar button').addEventListener('mouseleave', ()=>{document.querySelector('.btn-criar button').style.backgroundColor = `var(--bg-highlight)`});
        document.querySelector('.btn-criar div').addEventListener('mouseenter',()=>{document.querySelector('.btn-criar div').style.backgroundColor = `var(--${cor})`});
        document.querySelector('.btn-criar div').addEventListener('mouseleave',()=>{document.querySelector('.btn-criar div').style.backgroundColor = `var(--bg-highlight)`});
        document.querySelector('.btn-criar div').addEventListener('mouseenter',()=>{document.querySelector('.btn-criar div').style.backgroundImage = 'url(./images/close-hover.svg)'});
        document.querySelector('.btn-criar div').addEventListener('mouseleave',()=>{document.querySelector('.btn-criar div').style.backgroundImage = 'url(./images/close.svg)'});
    } else{
        
        document.querySelector('header').style.backgroundColor = `var(--ciano)`;
        document.querySelectorAll('.head').forEach(element => {element.style.backgroundColor = `var(--ciano)`; });
        document.querySelectorAll('.note').forEach(element => {element.style.borderColor = `var(--ciano)`; element.style.boxShadow = `0 0 4px var(--ciano)`;});
        document.querySelectorAll('.note').forEach(element => {element.style.borderColor = `var(--ciano)`; });
        document.querySelector('.btn-criar button').style.color =  `var(--ciano)`;
        document.querySelector('.btn-criar button').addEventListener('mouseenter', ()=>{document.querySelector('.btn-criar button').style.color = `var(--bg-highlight)`});
        document.querySelector('.btn-criar button').addEventListener('mouseleave', ()=>{document.querySelector('.btn-criar button').style.color = `var(--ciano)`});

        document.querySelector('.btn-criar div').addEventListener('mouseenter',()=>{document.querySelector('.btn-criar div').style.backgroundColor = `var(--ciano)`});
        document.querySelector('.btn-criar div').addEventListener('mouseleave',()=>{document.querySelector('.btn-criar div').style.backgroundColor = `var(--bg-highlight)`});
        document.querySelector('.btn-criar div').addEventListener('mouseenter',()=>{document.querySelector('.btn-criar div').style.backgroundImage = 'url(./images/close-hover.svg)'});
        document.querySelector('.btn-criar div').addEventListener('mouseleave',()=>{document.querySelector('.btn-criar div').style.backgroundImage = 'url(./images/close.svg)'});
        
    }
}

function mudaTema() {
    let btnTema = document.querySelector('.theme');

    if(localStorage.hasOwnProperty('Tema-mudouTema')){
        mudouTema = 'true' == window.localStorage.getItem('Tema-mudouTema') ? true : false;
    }
    mudouTema = !mudouTema;
    document.body.classList.toggle('dark-theme');

    if(mudouTema == true){
        btnTema.style.background = '#FFFFFF url(./images/icon_light.svg)';
        localStorage.setItem('Tema-modo', 'light-theme dark-theme');
        localStorage.setItem('Tema-img', '#FFFFFF url(./images/icon_light.svg)');
        localStorage.setItem('Tema-mudouTema', mudouTema);
        
    } else{
        
        btnTema.style.background = '#000000 url(./images/icon_dark.svg)';
        localStorage.setItem('Tema-modo', 'light-theme');
        localStorage.setItem('Tema-img','#000000 url(./images/icon_dark.svg)');
        localStorage.setItem('Tema-mudouTema', mudouTema);
        
    }
    btnTema.style.backgroundPosition = 'center';

}
function fecha(){
    fadeOut();
}

function ativaSelecaoCor(){
    clicouBtnCor = !clicouBtnCor;

    if(clicouBtnCor){
        barraCor.style.display = 'flex';
    } else{
        barraCor.style.display = 'none';
    }

}
function ativaCiano() {
    localStorage.setItem('cor','ciano');
    carregaCor();
};
function ativaAzulEscuro() {
    localStorage.setItem('cor','azul-escuro');
    carregaCor();
};
function ativaRoxo() {
    localStorage.setItem('cor','roxo');
    carregaCor();
};
function ativaRosaEscuro() {
    localStorage.setItem('cor','rosa-escuro');
    carregaCor();
};
function ativaRosa() {
    localStorage.setItem('cor','rosa');
    carregaCor();
};
function ativaVermelho() {
    localStorage.setItem('cor','vermelho');
    carregaCor();
};
function ativaAmarelo() {
    localStorage.setItem('cor','amarelo');
    carregaCor();
};
function ativaVerde() {
    localStorage.setItem('cor','verde');
    carregaCor();
};