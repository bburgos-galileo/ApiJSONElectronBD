
let tipo = document.getElementById('cmbTypeImage');
let filtro = document.getElementById('cmbTypeCat');

let divImagen = document.getElementById('divImage');
let imagen = document.getElementById('imgResult');

let respuesta = document.getElementById('txtRespuesta');

let boton = document.getElementById('btnBuscar');
let botonBD = document.getElementById('btnBuscarBD');
let botonGrabar = document.getElementById('btnGrabar');

let datos = {};

boton.addEventListener('click', clickBoton);
botonGrabar.addEventListener('click', clickGrabar);
botonBD.addEventListener('click', clickConsultar);

function clickBoton() {

    respuesta.value = '';

    let iTipo = tipo.value;
    let iFiltro = filtro.value;

    if (iTipo == '' && iFiltro == '') {
        fetch('https://cataas.com/cat?json=true')
            .then(response => response.json())
            .then(dato => {
                imagen.setAttribute('src', `https://cataas.com/${dato.url}`);
                divImagen.className = "";
                divImagen.className = "col-sm-6";
                datos = {};
                datos = { id: dato.id, tags: dato.tags, url: dato.url, create_at: dato.created_at, tipo: '', filtro: '' };
                botonGrabar.disabled = false;
                respuesta.value = "id: " +  dato.id + "\nurl: " + dato.url + "\ncreado el: " + dato.created_at; 
            })
    } else if (iTipo != '' && iFiltro == '') {
        fetch(`https://cataas.com/cat?type=${iTipo}&json=true`)
            .then(response => response.json())
            .then(dato => {
                imagen.setAttribute('src', `https://cataas.com/${dato.url}`)
                divImagen.className = "";
                divImagen.className = "col-sm-6";
                datos = {};
                datos = { id: dato.id, tags: dato.tags, url: dato.url, create_at: dato.created_at, tipo: iTipo, filtro: '' };
                botonGrabar.disabled = false;
                respuesta.value = "id: " +  dato.id + "\nurl: " + dato.url + "\ncreado el: " + dato.created_at; 
            })
    } else if (iTipo == '' && iFiltro != '') {
        fetch(`https://cataas.com/cat?type=${iFiltro}&json=true`)
            .then(response => response.json())
            .then(dato => {
                imagen.setAttribute('src', `https://cataas.com/${dato.url}`);
                divImagen.className = "";
                divImagen.className = "col-sm-6";
                datos = {};
                datos = { id: dato.id, tags: dato.tags, url: dato.url, create_at: dato.created_at, tipo: '', filtro: iFiltro };
                botonGrabar.disabled = false; 
                respuesta.value = "id: " +  dato.id + "\nurl: " + dato.url + "\ncreado el: " + dato.created_at;   
            })
    }


}

function clickGrabar() {
    window.comunicacion.grabar(datos);
    botonGrabar.disabled = true;
}

function clickConsultar() {

    let iTipo = tipo.value;
    let iFiltro = filtro.value;

    window.comunicacion.consultar({ tipo: iTipo, filtro: iFiltro });
}

window.comunicacion.datos(function (event, args) {
    divImagen.className = "";
    divImagen.className = "col-sm-6";
    botonGrabar.disabled = true;
    imagen.setAttribute('src', `https://cataas.com/${args.url}`)
    respuesta.value = "id: " +  args.id + "\nurl: " + args.url + "\nconsultado el: " + args.fecha_consulta; 
})