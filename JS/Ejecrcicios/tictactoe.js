
//declaracion de variables
let jugador1 = "X";
let jugador2 = "O";
let jugadorActual = "";
let tabla = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
console.clear();
console.log("Bienvenido al juego de Tic Tac Toe\nJugador 1: " + jugador1 + "\nJugador 2: " + jugador2);

/**
 * @note validar_opcion
 * @description Esta función valida si la opción ingresada por el usuario es válida.
 * @param {*} opcion 
 * @returns boolean
 * @example validar_opcion("X"); // true
 * @example validar_opcion("O"); // true
 * @example validar_opcion("A"); // false
 */
function validar_opcion(opcion) {
  return opcion.toLowerCase() === "x" && opcion.toLowerCase() === "o";
}

/**
 * @name mostrar_tabla
 * @description Esta función muestra la tabla actual en la consola.
 * @returns void
 */
function mostrar_tabla() {
  console.log("Tabla actual:");
  for (let i = 0; i < 3; i++) {
    console.log(tabla[i].join(" | "));
  }
  console.log("\n");
}

/**
 * @note validar_posicion
 * @description Esta función valida si la posición ingresada por el usuario es válida.
 * @param {*} posicion - Posición ingresada por el usuario.
 * @returns boolean
 * @example validar_posicion(1); // true
 * @example validar_posicion(10); // false
 */
function validar_posicion(posicion) {
  return posicion >= 1 && posicion <= 9; // Verificar si la posición está entre 1 y 9  
}

/**
 * @note validar_posicion_ocupada
 * @description Esta función valida si la posición ingresada por el usuario está ocupada.
 * @param {*} posicion - Posición ingresada por el usuario.
 * @returns boolean
 * @example validar_posicion_ocupada(1); // true
 * @example validar_posicion_ocupada(10); // false
 */
function validar_posicion_ocupada(posicion) {
    let fila = parseInt((posicion - 1) / 3); // Calcular la fila con la parte entera de la división
    let columna = (posicion - 1) % 3; // Calcular la columna con el resto de la división
    return tabla[fila][columna] !== ""; // Verificar si la posición está ocupada
    // Si la posición está ocupada, devolver true; de lo contrario, devolver false
}

/**
 * @note marcar_posicion
 * @description Esta función marca la posición en la tabla con el símbolo del jugador actual.
 * @param {*} posicion - Posición ingresada por el usuario.
 * @param {*} jugador - Símbolo del jugador actual.
 * @returns void
 */
function marcar_posicion(posicion, jugador) {
    let fila = parseInt((posicion - 1) / 3); // Calcular la fila con la parte entera de la división
    let columna = (posicion - 1) % 3; // Calcular la columna con el resto de la división
    tabla[fila][columna] = jugador; // Asignar el símbolo del jugador a la posición correspondiente en la tabla
}

/**
 * @note verificar_ganador
 * @description Esta función verifica si hay un ganador en la tabla.
 * @returns boolean
 * @example verificar_ganador(); // true
 * @example verificar_ganador(); // false
 */
function verificar_ganador() {
    // Verificar filas
    for (let i = 0; i < 3; i++) {
        if (tabla[i][0] === tabla[i][1] && tabla[i][1] === tabla[i][2] && tabla[i][0] !== "") {
            return true;
        }
    }
    // Verificar columnas
    for (let i = 0; i < 3; i++) {
        if (tabla[0][i] === tabla[1][i] && tabla[1][i] === tabla[2][i] && tabla[0][i] !== "") {
            return true;
        }
    }
    // Verificar diagonales
    if (tabla[0][0] === tabla[1][1] && tabla[1][1] === tabla[2][2] && tabla[0][0] !== "") {
        return true;
    }
    if (tabla[0][2] === tabla[1][1] && tabla[1][1] === tabla[2][0] && tabla[0][2] !== "") {
        return true;
    }
    return false;     
}

/**
 * @note verificar_empate
 * @description Esta función verifica si hay un empate en la tabla.
 * @returns boolean
 */ 
function verificar_empate() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (tabla[i][j] === "") {
                return false; // Si hay al menos una posición vacía, no hay empate
            }
        }
    }
    return true;
}

/**
 * @name mostrar_menu
 * @description Esta función muestra el menú principal del juego.
 * @returns void
 */
function mostrar_menu () {
    console.log("1. Jugar");
    console.log("2. Salir");
    let opcion = parseInt(prompt("Seleccione una opción: "));
    switch (opcion) {
        case 1:
            jugar(0);
            break;
        case 2:
            console.log("Gracias por jugar. ¡Hasta luego!");
            return;
        default:
            console.log("Opción inválida. Intente de nuevo.");
            break;
    }
    mostrar_menu();
}

/*
 * @name jugar
 * @description Esta función inicia el juego y controla el flujo del mismo.
 * @param {number} turno - El turno actual del juego.
 * @returns void
 */
function jugar(turno = 0) {
  if (turno === 0){ // Si es el primer turno, asignar el jugador1 como el actual
    jugadorActual = jugador1;
  }
  let posicion = parseInt(prompt("Jugador " + jugadorActual + ", ingrese una posición (1-9): "));
  if (!validar_posicion(posicion)) { // Verificar si la posición es válida
    console.log("Posición inválida. Intente de nuevo.");
  }else if (validar_posicion_ocupada(posicion)) { // Verificar si la posición está ocupada
    console.log("Posición ocupada. Intente de nuevo.");
  }else { 
    marcar_posicion(posicion, jugadorActual);   // Marcar la posición con el símbolo del jugador actual
    mostrar_tabla();  // Mostrar la tabla actualizada
    if (verificar_ganador()) { // Verificar si hay un ganador
      console.log("¡Jugador " + jugadorActual + " gana!");
    }else if (verificar_empate()) { // Verificar si hay un empate
      console.log("¡Es un empate!");
    }
  }  
  turno++; // Incrementar el turno
  jugadorActual = turno % 2 === 0 ? jugador1 : jugador2;  // Cambiar al siguiente jugador
  // Si el turno es 9 o hay un ganador o un empate, finalizar el juego
  if (turno === 9 || verificar_ganador() || verificar_empate()){
    console.log("Fin del juego.");
    return;
  }
  jugar(turno);
}

mostrar_menu();



