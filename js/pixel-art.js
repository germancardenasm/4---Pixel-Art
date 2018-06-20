

var nombreColores = ['White', 'LightYellow',
  'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan',
  'Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed', 'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed',
  'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon',
  'Brown', 'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown',
  'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
  'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine',
  'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen',
  'Chartreuse', 'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen',
  'LightGreen', 'PaleGreen', 'PaleTurquoise',
  'AquaMarine', 'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue',
  'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan',
  'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue',
  'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue',
  'MediumSlateBlue', 'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue',
  'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
  'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid',
  'BlueViolet', 'DarkViolet', 'DarkOrchid',
  'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray',
  'DimGray', 'LightSlateGray', 'DarkSlateGray', 'Black'
];

//Variables globales paleta y grilla-pixeles
var paleta = document.querySelector("#paleta");
var grilla = document.querySelector("#grilla-pixeles")
var colorSeleccionado = "black"
var $pixeles = 0;
var estadoDelMouse = false;
var visualizadorDePincel = document.querySelector("#indicador-de-color");

$(document).ready( function(){
  $pixeles = $(".pixeles");
});

// Variable para guardar el elemento 'color-personalizado'..
// Es decir, el que se elige con la rueda de color.
var colorPersonalizado = document.getElementById('color-personalizado');

colorPersonalizado.addEventListener('change', 
  (function() {
    // Se guarda el color de la rueda en directamente en la variable del color seleccionado para pintar 
    colorSeleccionado = colorPersonalizado.value;
    // Cambio el color de la ventanilla que muestra el color seleccionado.
    visualizadorDePincel.style.backgroundColor = colorSeleccionado;
  })
);

/*Funcion que genera la paleta de colores que se podran seleccionar para dibujar
  Recibe un arreglo de colores y genera una grilla con "Pixeles" de 15x15 px que 
  continen los colores del arreglo*/
function generarPaleta(listaDeColores){
  for(var i=0; i<listaDeColores.length; i++){
     var nuevoDiv = document.createElement("div");
     nuevoDiv.style.backgroundColor = listaDeColores[i];
     nuevoDiv.className = "color-paleta";
     paleta.appendChild(nuevoDiv);
  }

  //Establece el negro como el color inicial para dibujar al inciar la aplicacion.
  document.getElementById("indicador-de-color").style.backgroundColor="black";
}

/*Funcion que genera el canvas cuadriculado sobre el que se va a dibujar en cuadricula de 15x15 px.*/
function generarGrilla(){
  for(var i=0; i<1750; i++){
     var nuevoDiv = document.createElement("div");
     nuevoDiv.id = "pixel"+i;
     nuevoDiv.className="pixeles"
     grilla.appendChild(nuevoDiv);
  }
}

/*Funcion encargada de seleccionar un color de la paleta segun la decision del usuario al 
hacer click sobre la paleta*/
function seleccionarColor(e){
  colorSeleccionado = e.target.style.backgroundColor;
  visualizadorDePincel.style.backgroundColor = colorSeleccionado;
}

/*Funcion encargada de pintar en la grilla segun el color seleccionado por el usuario*/
function pintarColor(e){
   if(estadoDelMouse == true){
    e.target.style.backgroundColor = colorSeleccionado;
  }
} 

/*Funcion encargada de generar un eventListener por cada pixel*/
function agregarUnEventListenerPixeles(){
  for(var i = 0; i < 1750; i++){
    var pixel = document.querySelector("#pixel"+i);
    pixel.addEventListener("mouseover",pintarColor);
  }
}

/*funciones que detectan si el boton del mouse fue oprimido */
function mouseOprimido(e){
  estadoDelMouse = true;
  pintarColor(e);
} 

/*funciones que detectan si el boton del mouse fue liberado */
function mouseLiberado(e){
  estadoDelMouse = false;
} 


//LLamado de funciones principales de genracion de Paleta y grilla
generarPaleta(nombreColores);
generarGrilla();
agregarUnEventListenerPixeles();


/*  -----Eventos generados por el mouse-----   */

/*Funcion que permite seleccionar un color de la paleta de colores para pintar los pixeles*/
paleta.addEventListener("mousedown",seleccionarColor);

/*Funcion que detecta cuando el mouse es oprimido dentro de la grilla 
y guarda el estado en la variable "estadoDelMouse", ademas inicia la funcion 
"pintaColor(w)" para empezar a pintar los pixeles del color seleccionado*/
grilla.addEventListener("mousedown", mouseOprimido);

/*Funcion que detecta cuando el boton del mouse es liberado y guarda el estado 
en la variable "estadoDelMouse"*/
window.addEventListener("mouseup", mouseLiberado);

// Borra los pixeles al dar click en el boton Borrar con efecto 
$("#borrar").click(function(){
  $pixeles.animate({"backgroundColor":"white"},1000);
});

//funcion a que detecta que imagen se le dio click.
$(".imgs").click(function(event){  
         var $imagen = window[event.target.id];
         cargarSuperheroe($imagen);
    });



function downloadCanvas(canvasId, filename) {
  // Obteniendo la etiqueta la cual se desea convertir en imagen
  var domElement = document.getElementById(canvasId);

  // Utilizando la función html2canvas para hacer la conversión
  html2canvas(domElement, {
      onrendered: function(domElementCanvas) {
          // Obteniendo el contexto del canvas ya generado
          var context = domElementCanvas.getContext('2d');

          // Creando enlace para descargar la imagen generada
          var link = document.createElement('a');
          link.href = domElementCanvas.toDataURL("image/png");
          link.download = filename;

          // Chequeando para browsers más viejos
          if (document.createEvent) {
              var event = document.createEvent('MouseEvents');
              // Simulando clic para descargar
              event.initMouseEvent("click", true, true, window, 0,
                  0, 0, 0, 0,
                  false, false, false, false,
                  0, null);
              link.dispatchEvent(event);
          } else {
              // Simulando clic para descargar
              link.click();
          }
      }
  });
}

// Haciendo la conversión y descarga de la imagen al presionar el botón
$("#guardar").click(function() {
  downloadCanvas('grilla-pixeles', 'imagen.png');
});