import inquirer from 'inquirer';
import colors from 'colors';

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: '1. Crear tarea'
            },
            {
                value: '2',
                name: '2. Listar tareas'
            },
            {
                value: '3',
                name: '3. Tareas completadas'
            },
            {
                value: '4',
                name: '4. Listar tareas pendientes'
            },
            {
                value: '5',
                name: '5. Completas tarea(s)'
            },
            {
                value: '6',
                name: '6. Borrar tarea'
            },
            {
                value: '0',
                name: '0. Salir'
            },
        ]
    }
];


const inquirerMenu = async() => {
    console.clear();
    console.log('==========================='.green);
    console.log('   SELECCIONE UNA OPCION   '.green);
    console.log('===========================\n'.green);
    
    // opcion por el valor que se le dio en name
    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async() =>{
    const pausap = [
        {
            type: 'input',
            name: 'opcion',
            message: `Presione ${'ENTER'.green} para continuar`,
        }
    ];

    console.log('\n');
    await inquirer.prompt(pausap);
}

export {
    inquirerMenu,
    pausa
}