/* Archivo creado para el manejo del Sidebar y mostrarlo o no según el rol */

// Definimos que mostrar en el Menú Lateral según el ROL del Usuario que se Loguea
const getMenuLateral = (role = 'USER_ROLE') => {

    const menu = [

        {
            titulo: 'Dashboard',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Main', url: '/' },
                { titulo: 'ProgressBar', url: 'progress' },
                { titulo: 'Gráficas', url: 'grafica1' },
                { titulo: 'Promesas', url: 'promesas' },
                { titulo: 'Rxjs', url: 'rxjs' },
            ]
        },

        {
            titulo: 'Mantenimiento',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [

                // No permitimos que ningún Usuario logueado pueda ver la opción de Mantenimiento de Usuario
                //{ titulo: 'Usuarios', url: 'usuarios' },
                { titulo: 'Hospitales', url: 'hospitales' },
                { titulo: 'Médicos', url: 'medicos' },
            ]
        },
    ];

    // permitimos a los Usuarios de Role "Admin" que pueda ver la opción de Mantenimiento de Usuario
    if (role === 'ADMIN_ROLE') {

        // agregamos a la 2° posición del arreglo "menu" la opción
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' });
    }

    // retornamos el arreglo
    return menu;
}

// Exportamos los métodos
module.exports = {
    getMenuLateral
};