import colors from 'colors';

import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import {inquirerMenu,pausa,leerInput} from './helpers/inquirer.js';
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
                console.log(tareas.listadoArr);
            default:
                break;
        }

        guardarDB( tareas.listadoArr );

        if( opt !== '0' ) await pausa();

    } while( opt !== '0' );


    
}


main();


