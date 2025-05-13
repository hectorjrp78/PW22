/**
 * @fileoverview Este archivo contiene un programa de lista de tareas (To-Do List) que permite al usuario
 *              agregar, modificar, eliminar y mostrar tareas. Utiliza funciones para organizar el código
 *              y mejorar la legibilidad. El programa incluye validaciones para asegurar que las entradas del usuario
 *              sean correctas y maneja errores comunes. 
 * @version 1.0
 * @author [Hector J Rodriguez]
 */

//Declaracion de variables
//Definición de la lista de tareas
let listaDeTareas = [
  { id: 1, tarea: "Hacer la compra", estatus: "Pendiente" },
  { id: 2, tarea: "Llamar al médico", estatus: "Completado" },
  { id: 3, tarea: "Estudiar para el examen", estatus: "En progreso" },
];

// ejecucion del programa 
mostrar_Menu();

/** 
* @name mostrar_Menu
* @description Esta función muestra un menú de acciones al usuario y permite seleccionar una opción para 
*     realizar una acción específica. Llama a otras funciones según la opción seleccionada.
* @returns {void} 
* @example mostrar_Menu();
*/
function mostrar_Menu() {
  console.log("\n--- Menú de Acciones ---");
  console.log("1. Agregar nueva tarea");
  console.log("2. Modificar estatus de tarea");
  console.log("3. Eliminar tarea");
  console.log("4. Mostrar todas las tareas");
  console.log("5. Salir");

  let opcion_menu = prompt("Seleccione una opción: ");
  if (validar_opcion(opcion_menu)) {
    switch (opcion_menu) {
      case '1':
        agregar_Tarea();
        break;
      case '2':
        modificar_Estatus();
        break;
      case '3':
        eliminar_Tarea();
        break;
      case '4':
        mostrar_Tareas();
        break;
      case '5':
        console.log("¡Hasta luego!");
        return;
    }
  }else {
    console.log("Opción inválida. Por favor, intente de nuevo.");
  }
  mostrar_Menu(); // Llama a la función nuevamente para mostrar el menú después de realizar una acción
}

/**
* @name validar_opcion
* @description Esta función valida si la opción seleccionada por el usuario está dentro del rango permitido.
*              Se define el valor Maximo a 5 para las opciones del menu y se reutiliza para validar el ID de la tarea.
* @param {number} opcion - La opción seleccionada por el usuario.
* @param {number} [valormaximo=5] - El valor máximo permitido para la opción del menu.
* @returns {boolean} - Retorna true si la opción es válida, de lo contrario false.
* @example validar_opcion(3); // true
* @example validar_opcion(-1); // false
*/
function validar_opcion(opcion, valormaximo = 5) {
  return opcion >= 1 && opcion <= valormaximo;
}


/**
* @name agregar_Tarea
* @description Esta función permite al usuario agregar una nueva tarea a la lista de tareas.
*              Solicita al usuario el nombre de la tarea y su estatus, y valida que ambos sean válidos.
* @returns {void}
* @example agregar_Tarea();
*/
function agregar_Tarea() {
  let nuevaTarea = prompt("Ingrese la nueva tarea: ");
  let nuevoEstatus = prompt("Ingrese el estatus de la tarea (Pendiente, En progreso): ");
  if (!nuevaTarea || !validar_Estatus(nuevoEstatus) ) {
    console.log("Error: Debe ingresar tanto la tarea como el estatus valido.");
    agregar_Tarea();
  }else {
    let idTarea = listaDeTareas.length + 1;
    listaDeTareas.push({ id: idTarea, tarea: nuevaTarea, estatus: nuevoEstatus });
    console.log(`Tarea "${nuevaTarea}" agregada con éxito.`);
    return;
  }
}

/**
* @name validar_Estatus
* @description Esta función valida si el estatus de la tarea es uno de los estatus válidos.
* @param {string} estatus - El estatus de la tarea a validar.
* @returns {boolean} - Retorna true si el estatus es válido, de lo contrario false.
* @example validar_Estatus("Pendiente"); // true
* @example validar_Estatus("Pendientes"); // false
*/
function validar_Estatus(estatus) {
  const estatusValidos = ["Pendiente", "En progreso", "Completado"];
  return estatusValidos.includes(estatus);
}

/**
 * @name mostrar_Tareas
 * @description Esta función muestra todas las tareas en la lista, incluyendo su ID, nombre y estatus.
 * @returns {void}
 */
function mostrar_Tareas() {
  if (listaDeTareas.length === 0) {
    console.log("No hay tareas en la lista.");
    return;
  }
  console.log("\n--- Lista de Tareas ---");
  listaDeTareas.forEach(tarea => {
    console.log(`ID: ${tarea.id}, Tarea: ${tarea.tarea}, Estatus: ${tarea.estatus}`);
  });
}

/**
 * @name eliminar_Tarea
 * @description Esta función permite al usuario eliminar una tarea de la lista de tareas. 
 *              Solicita al usuario el ID de la tarea a eliminar y valida que sea un ID válido.
 * @returns {void}
 * @example eliminar_Tarea();
 */
function eliminar_Tarea(){
  let idTarea = prompt("Ingrese el ID de la tarea a eliminar: ");
  if (validar_opcion(idTarea, listaDeTareas.length)) {
    listaDeTareas = listaDeTareas.filter(tarea => tarea.id != idTarea);
    console.log(`Tarea con ID ${idTarea} eliminada con éxito.`);
    actualizar_Ids_Tareas();
  } else {
    console.log("ID inválido. Por favor, intente de nuevo.");
  }
}

/**
 * @name actualizar_Ids_Tareas
 * @description Esta función actualiza los IDs de las tareas en la lista después de eliminar una tarea.
 *              Asigna un nuevo ID a cada tarea basado en su posición en la lista.
 * @returns {void}
 * @example actualizar_Ids_Tareas();
 */
function actualizar_Ids_Tareas() {
  listaDeTareas.forEach((tarea, index) => {
    tarea.id = index + 1;
  });
  console.log("IDs de tareas actualizados.");
}

/**
 * @name modificar_Estatus
 * @description Esta función permite al usuario modificar el estatus de una tarea existente en la lista de tareas.
 *              Solicita al usuario el ID de la tarea y el nuevo estatus, y valida ambos.
 *              Si el ID es válido, se actualiza el estatus de la tarea siempre y cuando no sea el mismo estatus.  
 * @returns {void}
 * @example modificar_Estatus();
 */
function modificar_Estatus() {
  let idTarea = prompt("Ingrese el ID de la tarea a modificar: ");
  if (validar_opcion(idTarea, listaDeTareas.length)) {
    let nuevoEstatus = prompt("Ingrese el nuevo estatus de la tarea (Pendiente, En progreso, Completado): ");
    if (validar_Estatus(nuevoEstatus)) {
      listaDeTareas.forEach(tarea => {
        if (tarea.id == idTarea) {
          if (tarea.estatus != nuevoEstatus){
            tarea.estatus = nuevoEstatus;
            console.log(`Estatus de la tarea con ID ${idTarea} modificado a "${nuevoEstatus}".`);
          }else {
            console.log(`El estatus de la tarea con ID ${idTarea} ya es "${nuevoEstatus}".`);
          }
        }
      });
    } else {
      console.log("Estatus inválido. Por favor, intente de nuevo.");
    }
  } else {
    console.log("ID de tare inválido. Por favor, intente de nuevo.");
  }
}