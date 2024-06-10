
//VARIABLES QUE NECESITO EN EL CÓDIGO
var posXPala = 610;
var posYPala = 700;
var posXBola = 640 ;
var posYBola= 690; 
var vxBola = 2;
var vyBola = -2;
var ladrillos= []; // así se DECLARA UN ARRAY, AQUÍ SE ALMACENA TODA LA INFORMACIÓN DE  LOS LADRILLOS
let vidas = 2;

// FUNCIONES QUE NECESITO PARA QUE FUNCIONE EL PREOGRAMA

function keydown(){ //movimientos de la pala a iz y derech
    if (keyIsDown(37) && posXPala > 0) {
        posXPala = posXPala-10;
      }
      if(keyIsDown(39) && posXPala < (1280-60)){
        posXPala = posXPala +10;
      }
}
function dibujarLadrillos(){
    ladrillos.forEach(ladrillo => { //para cada ladrillo
        if(!ladrillo.isBroken){ // si no está roto
        rect(ladrillo.x,ladrillo.y,128,10)} //se dibuja así
    })

}
function golpeaLadrilloRompeLadrillo(){
    ladrillos.forEach(ladrillo =>{
        if(!ladrillo.isBroken){
            if((ladrillo.y == posYBola && posXBola>=ladrillo.x) && posXBola <= ladrillo.x + 128 ){
                ladrillo.isBroken = true;
                vyBola = vyBola*-1;
            }

        }
    })
}
function contadorVidas(){
    if(posYBola==720){
        vidas--;
        posXBola = 640;
        posYBola = 690;
        posXPala = 610;
        posYPala = 700;
        alert(vidas+1);
    }
    if (vidas < 0){
        alert("Que mala suerte has perdido el juego")
        location.reload();
    }
}


//Esta funcion es la que se ejecuta una sola vez, la primera vez que ejecutamos el juego
function setup() {
    //Definimos la resolucion del canvas
    createCanvas(1280, 720);
    //Definimos el color de fondo
    background(255);   
    var x= 0; //colocar comienzo como por ejemplo en los ladrillos donde deben de ser generados
    var y= 0;

// LADRILLOS - Una vez declarado el array de ladrillos en variables, aquí lo generamos para
    for(let j=0; j<3; j++){ //creamos las filas así, y hasta que no se cumpla que j = filas sea 3, va generando los ladrillos
        for (let i=0; i<10; i++){
            rect(x,y,128,10);//genera el diseño del ladrillo
            ladrillos.push({x:x,y:y,isBroken:false}); //genera como debería de ser cada ladrillo
            x=x+128;   //donde empieza el siguiente
        }
        x=0; //donde empieza la siguiente fila en x
        y=y+10; //donde empieza la siguiente fila en y
    }

}

//Esta es la funcion principal del programa que se ejecuta cada frame
function draw() {
    background(220); 
    dibujarLadrillos();
    golpeaLadrilloRompeLadrillo();
    contadorVidas();
    //BOLA
    ellipse (posXBola,posYBola,10,10); //creacion de la bola
    posXBola = posXBola + vxBola; //movimiento de la bola en x
    posYBola = posYBola + vyBola; // movimiento de la bola en y
    //controlar los choques de la bola con las paredes
    if(posXBola== 0 || posXBola == 1280){
        vxBola = vxBola*-1 // cambia la direccion de la bola EN Z
    }
    if (posYBola <= 0 ) {
        vyBola = vyBola*-1;//pelota rebota contra el techo y cambia en Y el movimiento
    } 
    //bola golpea la pala y cambia de dirección 
    if(posYBola == posYPala && (posXBola >=posXPala && posXBola <= posXPala+60) ){
        vyBola =vyBola*-1;
    }
    //PALA
    rect(posXPala,posYPala,60,10); // creacion de la pala
    keydown();


    
}
