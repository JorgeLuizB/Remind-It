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
    elemento.style.display = 'block';
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
        let data = dataTemporaria.getDate() < 10 ? '0' + dataTemporaria.getDay() : dataTemporaria.getDate();
        data += (dataTemporaria.getMonth() + 1) < 10 ? '0' + (dataTemporaria.getMonth() + 1) : dataTemporaria.getMonth() + 1;
        data += dataTemporaria.getFullYear().toString();

        notas.push({'titulo': titulo.value, 'descricao': descricao.value});
        localStorage.setItem('notas', JSON.stringify(notas));
        
        let nota = `<div class="note"><div class="head"><p>${titulo.value}</p></div><div class="body"><div class="body-conteudo"><div class="nota-info"><div class="ck-finalizado"><input type="checkbox" name="finalizado" id="finalizado"><label for="finalizado">Finalizado</label></div><div class="nota-data"><span>00/00/0000</span></div></div><p>${descricao.value}</p></div></div></div>`;

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
            let nota = `<div class="note"><div class="head"><p>${notas[i]['titulo']}</p></div><div class="body"><div class="body-conteudo"><div class="nota-info"> <div class="ck-finalizado"><input type="checkbox" name="finalizado" id="finalizado"><label for="finalizado">Finalizado</label></div><div class="nota-data"><span>00/00/0000</span></div></div><p>${notas[i]['descricao']}</p></div></div></div>`;

            espacoNota.innerHTML += nota;
        }
    }

    if(localStorage.hasOwnProperty('Tema-modo')){
        document.body.classList = window.localStorage.getItem('Tema-modo');
        btnTema.style.background = window.localStorage.getItem('Tema-img');
        btnTema.style.backgroundPosition = 'center';

    } else{
        btnTema.style.background = '#000000 url(../images/icon_dark.svg)';
        btnTema.style.backgroundPosition = 'center';
    }
    if(localStorage.hasOwnProperty('cor')){
        let cor = localStorage.getItem('cor');
        document.querySelector('header').style.backgroundColor = `var(--${cor})`;
        document.querySelectorAll('.head').forEach(element => {element.style.backgroundColor = `var(--${cor})`; });
        document.querySelectorAll('.note').forEach(element => {element.style.borderColor = `var(--${cor})`; element.style.boxShadow = `0 0 4px var(--${cor})`;});
        document.querySelectorAll('.note').forEach(element => {element.style.borderColor = `var(--${cor})`; }); 
    } else{
        ativaCiano();
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
        btnTema.style.background = '#FFFFFF url(../images/icon_light.svg)';
        localStorage.setItem('Tema-modo', 'light-theme dark-theme');
        localStorage.setItem('Tema-img', '#FFFFFF url(../images/icon_light.svg)');
        localStorage.setItem('Tema-mudouTema', mudouTema);
        
    } else{
        
        btnTema.style.background = '#000000 url(../images/icon_dark.svg)';
        localStorage.setItem('Tema-modo', 'light-theme');
        localStorage.setItem('Tema-img','#000000 url(../images/icon_dark.svg)');
        localStorage.setItem('Tema-mudouTema', mudouTema);
        
    }
    btnTema.style.backgroundPosition = 'center';

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
    document.querySelector('header').style.backgroundColor = 'var(--ciano)';
    document.querySelectorAll('.head').forEach(element => {element.style.backgroundColor = 'var(--ciano)'; });
    document.querySelectorAll('.note').forEach(element => {element.style.borderColor = 'var(--ciano)'; element.style.boxShadow = '0 0 4px var(--ciano)';});
    document.querySelectorAll('.note').forEach(element => {element.style.borderColor = 'var(--ciano)'; }); 
};
function ativaAzulEscuro() {
    localStorage.setItem('cor','azul-escuro');
    document.querySelector('header').style.backgroundColor = 'var(--azul-escuro)'; 
    document.querySelectorAll('.head').forEach(element => {element.style.backgroundColor = 'var(--azul-escuro)'; });
    document.querySelectorAll('.note').forEach(element => {element.style.borderColor = 'var(--azul-escuro)'; element.style.boxShadow = '0 0 4px var(--azul-escuro)';});
    document.querySelectorAll('.note').forEach(element => {element.style.borderColor = 'var(--azul-escuro)'; });
};
function ativaRoxo() {
    localStorage.setItem('cor','roxo');
    document.querySelector('header').style.backgroundColor = 'var(--roxo)'; 
    document.querySelectorAll('.head').forEach(element => {element.style.backgroundColor = 'var(--roxo)'; });
    document.querySelectorAll('.note').forEach(element => {element.style.borderColor = 'var(--roxo)'; element.style.boxShadow = '0 0 4px var(--roxo)';});
    document.querySelectorAll('.note').forEach(element => {element.style.borderColor = 'var(--roxo)'; });
};
function ativaRosaEscuro() {
    localStorage.setItem('cor','rosa-escuro');
    document.querySelector('header').style.backgroundColor = 'var(--rosa-escuro)'; 
    document.querySelectorAll('.head').forEach(element => {element.style.backgroundColor = 'var(--rosa-escuro)'; });
    document.querySelectorAll('.note').forEach(element => {element.style.borderColor = 'var(--rosa-escuro)'; element.style.boxShadow = '0 0 4px var(--rosa-escuro)';});
    document.querySelectorAll('.note').forEach(element => {element.style.borderColor = 'var(--rosa-escuro)'; });
};
function ativaRosa() {
    localStorage.setItem('cor','rosa');
    document.querySelector('header').style.backgroundColor = 'var(--rosa)'; 
    document.querySelectorAll('.head').forEach(element => {element.style.backgroundColor = 'var(--rosa)'; });
    document.querySelectorAll('.note').forEach(element => {element.style.borderColor = 'var(--rosa)'; element.style.boxShadow = '0 0 4px var(--rosa)';});
    document.querySelectorAll('.note').forEach(element => {element.style.borderColor = 'var(--rosa)'; });
};
function ativaVermelho() {
    localStorage.setItem('cor','vermelho');
    document.querySelector('header').style.backgroundColor = 'var(--vermelho)'; 
    document.querySelectorAll('.head').forEach(element => {element.style.backgroundColor = 'var(--vermelho)'; });
    document.querySelectorAll('.note').forEach(element => {element.style.borderColor = 'var(--vermelho)'; element.style.boxShadow = '0 0 4px var(--vermelho)';});
    document.querySelectorAll('.note').forEach(element => {element.style.borderColor = 'var(--vermelho)'; });
};
function ativaAmarelo() {
    localStorage.setItem('cor','amarelo');
    document.querySelector('header').style.backgroundColor = 'var(--amarelo)'; 
    document.querySelectorAll('.head').forEach(element => {element.style.backgroundColor = 'var(--amarelo)'; });
    document.querySelectorAll('.note').forEach(element => {element.style.borderColor = 'var(--amarelo)'; element.style.boxShadow = '0 0 4px var(--amarelo)';});
    document.querySelectorAll('.note').forEach(element => {element.style.borderColor = 'var(--amarelo)'; });
};
function ativaVerde() {
    localStorage.setItem('cor','verde');
    document.querySelector('header').style.backgroundColor = 'var(--verde)'; 
    document.querySelectorAll('.head').forEach(element => {element.style.backgroundColor = 'var(--verde)'; });
    document.querySelectorAll('.note').forEach(element => {element.style.borderColor = 'var(--verde)'; element.style.boxShadow = '0 0 4px var(--verde)';});
    document.querySelectorAll('.note').forEach(element => {element.style.borderColor = 'var(--verde)'; });
};