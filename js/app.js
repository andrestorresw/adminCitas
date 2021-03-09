const inputMascota = document.getElementById('mascota');
const inputPropietario = document.getElementById('propietario');
const inputTel = document.getElementById('telefono');
const inputFecha = document.getElementById('fecha');
const inputHora = document.getElementById('hora');
const inputSintomas = document.getElementById('sintomas');

const form = document.getElementById('nueva-cita');
const listaCitas = document.getElementById('citas');

let editanto;

class UI{
    
    printAlert(msj){
        const mensaje = document.createElement('p');
        mensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        if(msj === 'error'){
            mensaje.classList.add('alert-danger');
            mensaje.textContent = 'Todos los campos son obligatorios';
        }else{
            mensaje.classList.add('alert-success');
            mensaje.textContent = 'Cita agregada';
        }
        
        const contenido = document.getElementById('contenido');
        contenido.insertBefore(mensaje, document.querySelector('.agregar-cita'));
        
        setTimeout(() => {
            mensaje.remove();
        }, 2000);
    }

    manageLista(){

        this.cleanLista();
        adminCita.citas.forEach( element =>{
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = element;
            
            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder"> Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder"> Telefono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder"> Fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder"> Hota: </span> ${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder"> Sintomas: </span> ${sintomas}
            `;

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';

            btnEliminar.onclick = () => deleteCita(id);

            const btnEdit = document.createElement('button');
            btnEdit.classList.add('btn','btn-info');
            btnEdit.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';

            btnEdit.onclick = () => cargarEdicion(element);

            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEdit);

            listaCitas.appendChild(divCita);
        })
    }

    cleanLista(){
        while(listaCitas.firstChild){
            listaCitas.removeChild(listaCitas.firstChild);
        }
    }
}

class Citas{
    constructor(){
        this.citas = [];
    }

    leerDatos(object){
        this.citas = [...this.citas,object];
    }

    cutCita(id){
        this.citas = this.citas.filter( e => e.id !== id);
    }

    editCita(citaActulizada){
        this.citas = this.citas.map( cita => cita.id === citaActulizada.id ? citaActulizada : cita);
    }

}

const ui = new UI();
const adminCita = new Citas();

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}

form.reset();
eventListeners();

function eventListeners(){
    inputMascota.addEventListener('change', llenarCita);
    inputPropietario.addEventListener('change', llenarCita);
    inputTel.addEventListener('change', llenarCita);
    inputFecha.addEventListener('change', llenarCita);
    inputHora.addEventListener('change', llenarCita);
    inputSintomas.addEventListener('change', llenarCita);

    form.addEventListener('submit', crearCita);
}

function llenarCita(e){
    citaObj[e.target.name] = e.target.value;
}

function crearCita(e){
    e.preventDefault();
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;
    
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' ||
    sintomas === '' || hora === ''){
        ui.printAlert('error');
        return;
    }

    ui.printAlert();

    if(editanto){
        
        adminCita.editCita({...citaObj});

        document.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        editanto = false;

    }else{
        citaObj.id = Date.now();
        adminCita.leerDatos({...citaObj});
    }

    ui.manageLista();
    reinicarObj();
    form.reset();
}

function reinicarObj(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
    citaObj.id = '';
}

function deleteCita(id){
    adminCita.cutCita(id);
    ui.manageLista();
}

function cargarEdicion(info){
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = info;

    inputMascota.value = mascota;
    inputPropietario.value = propietario;
    inputTel.value = telefono;
    inputFecha.value = fecha;
    inputHora.value = hora;
    inputSintomas.value = sintomas;

    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    editanto = true;
    document.querySelector('button[type="submit"]').textContent = 'Actualizar';
}