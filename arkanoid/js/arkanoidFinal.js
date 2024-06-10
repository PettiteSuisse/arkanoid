
 //-----------------------------------------------------------------------------------------------------------------------------------------------------
 
 
 
 //OBJETO PALA -------------------------------------------------------------------------------------------------------------------
class Pala {
    constructor(posXPala,posYPala,largo,ancho){
        this.x = posXPala;
        this.y = posYPala; 
        this.largo = largo;
        this.ancho = ancho;
    
    }

    dibujarPala(){
        rect(this.x,this.y,this.largo,this.ancho);
    }
    movimientosPala()
    {
        if (keyIsDown(37) && (this.x > 0) ) {
            this.x = this.x -10;
        }
    
         if( keyIsDown(39) && (this.x < (1280-this.largo))){
            this.x =this.x+10;
            }
    }
}
// OBJETOS LADRILLO -------------------------------------------------------------------------------------------------------------
class Ladrillo {
    constructor (posXLadrillo,posYLadrillo){
        this.x = posXLadrillo;
        this.y = posYLadrillo;
        //this.durabilidad = durabilidad;

    }
    ancho = 128;
    alto = 10;
    dibujarLadrillo(){
        rect(this.x,this.y, this.ancho, this.alto)
    }
    generarLadrillos(){
    for (let filas= 0; filas <3; filas++ ){
        for(let columnas =0; columnas >10; columnas++){
            rect(this.x,this.y, this.ancho, this.alto);
            ladrillos.push(this.x:x,this.y:this.y,ancho,alto)
        }
    }
   
}
}
//-------------------------------------------------------------------------------------------------------------------------------
var palaprincipal= new Pala (610,700,60,10);
var ladrillos= [];
/*var ladrilloprueba= new Ladrillo (10,10);*/
//-------------------------------------------------------------------------------------------------------------------------------
function setup() {
    //Definimos la resolucion del canvas
    createCanvas(1280, 720);
    //Definimos el color de fondo
    background(255);
    

 }

//Esta es la funcion principal del programa que se ejecuta cada frame
function draw() {
    background(255);
    palaprincipal.dibujarPala();
    palaprincipal.movimientosPala();
    /*ladrilloprueba.dibujarLadrillo();*/
  
}

