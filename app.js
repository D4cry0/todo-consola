import colors from 'colors';

import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import { inquirerMenu,
            pausa,
            leerInput,
            mostrarListado,
            listadoTareasBorrar,
            confirmar,
            mostrarListadoChecklist } from './helpers/inquirer.js';
import { Tareas } from './models/tareas.js';

console.clear();

const main = async() => {
    
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if( tareasDB ) {
        tareas.cargarTareasFromArray(tareasDB);
    }


    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción:');
                tareas.crearTarea( desc );
                break;
        
            case '2':
                mostrarListado(tareas.listadoArr, null);
                break;
            case '3':
                mostrarListado(tareas.listadoArr, true);
                break;
            case '4':
                mostrarListado(tareas.listadoArr, false);
                break;

            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas( ids );
                break;
            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if( id !== '0' ){
                    const ok = await confirmar('¿Estas seguro?');
                    if( ok ){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
            default:
                break;
        }

        guardarDB( tareas.listadoArr );

        if( opt !== '0' ) await pausa();

    } while( opt !== '0' );


    
}


main();


