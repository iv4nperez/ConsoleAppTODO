
require('colors');

const { guardarDB ,leerDB } = require('./helpers/guardarArchivo');
// mis importaciones
// const { mostrarMenu , pausa} = require('./helpers/mensajes');
const { inquirerMenu, pausa ,leerInput,listadoTareasBorrar,confirmar,mostrarListadoChecklist } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

//limpiar consola
console.clear();

//inicia el main 
const main = async () => {
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB){
        tareas.cargarTareasFromArray( tareasDB );
    }

    // await pausa();

    do{
        opt = await inquirerMenu();
        switch(opt){
            case '1':
                const desc = await leerInput('Descripción:');
                tareas.crearTarea( desc );
            break;
            case '2':
                // console.log( tareas.listadoArr );
                tareas.listadoCompleto();
            break;
            case '3' :
                tareas.listarPendientesCompletadas(true);
            break;
            case '4' :
                tareas.listarPendientesCompletadas(false);
            break;
            case '5' :
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;
            case '6' :
                const id = await listadoTareasBorrar(tareas.listadoArr);
                //TODO: preguntar confirmación
                if( id !== '0' ){
                    const ok = await confirmar('¿Estas seguro?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada')
                    } 
                }  

            break;
        }

        guardarDB( tareas.listadoArr );

        await pausa();
    } while ( opt  !== '0');

    
}


main();





