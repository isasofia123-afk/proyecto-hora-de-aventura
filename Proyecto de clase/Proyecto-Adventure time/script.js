// ==========================================================================
// 1. FUNCIONES COMPARTIDAS Y DE MODAL PERSONALIZADO
// ==========================================================================

function showView(viewId) {
    const views = document.querySelectorAll('.app-view');
    views.forEach(v => v.style.display = 'none');
    document.getElementById(viewId).style.display = 'block';
}

// NUEVAS: Funciones para abrir y cerrar tu modal con estética cómic
function openModal(mensaje) {
    document.getElementById('modal-message').innerText = mensaje;
    document.getElementById('custom-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('custom-modal').style.display = 'none';
}


// ==========================================================================
// 2. FORMULARIOS DE ACCESO Y REGISTRO (CON TU LÓGICA MODIFICADA)
// ==========================================================================

function validarYEntrar() {
    const nombre = document.getElementById('nombre-usuario').value;

    if (nombre.trim() === "") {
        // Cambiado el alert antiguo por tu modal personalizado
        openModal("¡Debes decirnos tu nombre para empezar la aventura!");
    } else {
        // Guardamos el nombre y lo ponemos en el header del menú
        document.getElementById('nombre-display').innerText = nombre;
        
        // Saltamos al menú principal
        showView('view-menu');
    }
}

function procesarRegistro() {
    const nombre = document.getElementById('nombre-input').value;
    const tipo = document.getElementById('tipo-heroe').value;
    
    // Para los radio buttons, buscamos el que esté "checked"
    const reinoSeleccionado = document.querySelector('input[name="reino"]:checked');

    if (nombre.trim() === "") {
        // Cambiado el alert antiguo por tu modal personalizado
        openModal("¡Un héroe necesita un nombre!");
        return;
    }

    if (!reinoSeleccionado) {
        // Cambiado el alert antiguo por tu modal personalizado
        openModal("¡Debes elegir un reino de origen!");
        return;
    }

    const reino = reinoSeleccionado.value;

    // Personalizamos el saludo del menú con toda la info
    document.querySelector('#view-menu h1').innerText = `¡Bienvenido, ${nombre}!`;
    
    // Opcional: Podemos guardar un mensaje con su clase y reino
    console.log(`Héroe registrado: ${nombre}, Clase: ${tipo}, Origen: ${reino}`);
    
    showView('view-menu');
}


// ==========================================================================
// 3. SISTEMA INTERACTIVO DEL MAPA DE OOO
// ==========================================================================

// 1. Diccionario de datos de los Reinos de Ooo (¡Actualizado!)
const datosReinos = {
    hielo: {
        titulo: "Tierra de Hielo ❄️",
        descripcion: "Un lugar frío cubierto de nieve y glaciares. Hogar del Rey Hielo, sus millones de pingüinos (¡Gunter!) y prisioneras frecuentes."
    },
    chuche: {
        titulo: "Reino de Caramelo 🍬",
        descripcion: "Gobernado por la Princesa Chicle. Todo está hecho de dulce, desde los ciudadanos de gominola hasta los edificios de chocolate."
    },
    fuego: {
        titulo: "Reino del Fuego 🔥",
        descripcion: "Una tierra volcánica extremadamente inestable y caliente. Su superficie está hecha de lava viva y es el hogar de la Princesa Flama."
    },
    ooo: {
        titulo: "La Tierra de Ooo 🌿",
        descripcion: "El centro del mapa, un valle verde y lleno de colinas donde se encuentra la Casa del Árbol de Finn y Jake."
    },
    // 🚀 ¡NUEVO SITIO AÑADIDO!
    arbol: {
        titulo: "El Árbol Gigante 🏠🌳",
        descripcion: "¡La increíble casa de árbol de Finn y Jake! Llena de tesoros, armas, reliquias de sus aventuras y el lugar donde vive el pequeño BMO."
    }
};

// 2. Función principal para activar los clics del mapa
document.addEventListener("DOMContentLoaded", () => {

    // Posicionamiento de seguridad para la cara del Rey Helado
    const botonHielo = document.querySelector('button[data-reino="hielo"]');
    if (botonHielo) {
        botonHielo.style.top = "10%";
        botonHielo.style.left = "15%";
        botonHielo.style.width = "20%";
        botonHielo.style.height = "30%";
    }

    const zonas = document.querySelectorAll(".map-zone");
    const infoBox = document.getElementById("info-reino-box");
    const popupTitulo = document.getElementById("popup-titulo");
    const popupDesc = document.getElementById("popup-desc");

    zonas.forEach(zona => {
        zona.addEventListener("click", () => {
            // Conseguimos el identificador del reino pulsado
            const idReino = zona.getAttribute("data-reino");
            const info = datosReinos[idReino];

            if (info) {
                // Actualizamos los textos de la caja
                popupTitulo.textContent = info.titulo;
                popupDesc.textContent = info.descripcion;

                // Aseguramos que la caja pase de 'none' a 'block' para que sea visible
                infoBox.style.display = "block";
                
                // Pequeño salto visual de aviso
                infoBox.style.animation = "none";
                setTimeout(() => { infoBox.style.animation = "bounce 0.3s ease"; }, 10);
            }
        });
    });
});

function regresarAlFormulario() {
    // Ocultamos el apartado del menú
    document.getElementById('apartado-menu').style.display = 'none';
    
    // Mostramos el apartado del formulario
    document.getElementById('apartado-formulario').style.display = 'block';
}