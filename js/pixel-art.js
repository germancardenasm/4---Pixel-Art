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
var colorSeleccionado = "black";
var estadoDelMouse = false;
// Variable para guardar el elemento 'color-personalizado'..
// Es decir, el que se elige con la rueda de color.
var colorPersonalizado = document.getElementById('color-personalizado');

colorPersonalizado.addEventListener('change', 
  (function() {
    // Se guarda el color de la rueda en colorActual
    colorActual = colorPersonalizado.value;
    // Completar para que cambie el indicador-de-color al colorActual


  })
);

/*Funcion que genera la paleta de colores que se podran seleccionar para dibujar
  Recibe un arreglo de colores y genera una grilla con "Pixeles" de 15x15 px que continen los colores del arreglo*/
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
  var visualizadorDePincel = document.querySelector("#indicador-de-color  ");
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

/*funciones que detectan si el boton del mouse esta oprimido o no*/
function mouseOprimido(e){
  console.log("detecto mouse oprimido");
  estadoDelMouse = true;
  pintarColor(e);
} 
function mouseLiberado(e){
  console.log("detecto libero mouse");
  estadoDelMouse = false;
} 


//LLamado de funciones principales de genracion de Paleta y grilla
generarPaleta(nombreColores);
generarGrilla();
agregarUnEventListenerPixeles();


/*Eventos generados por el mouse*/
var pixelesEnGrilla =  document.querySelectorAll(".pixeles");
paleta.addEventListener("mousedown",seleccionarColor);
grilla.addEventListener("mousedown", mouseOprimido);
window.addEventListener("mouseup", mouseLiberado);