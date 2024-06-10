
class Ladrillo {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    isBroken = false;
    w = 128;
    h = 10;
    dibujar() {
        rect(this.x, this.y, this.w, this.h)
    }
    romper() {
        this.isBroken = true;
        powersup.push(new PowerUP);
    }

}
class Pala {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    w = 60;
    h = 10;
    dibujar() {
        rect(this.x, this.y, this.w, this.h)
    }
    moverse() {
        if (keyIsDown(37) && this.x > 0) {
            this.x = this.x - 10;
        }
        if (keyIsDown(39) && this.x < (1280 - 60)) {
            this.x = this.x + 10;
        }
    }
}
class Bola {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    w = 10;
    h = 10;
    vx = 2;
    vy = -2;
    dibujar() {
        ellipse(this.x, this.y, this.w, this.h)
    }
    moverse() {
        this.x += this.vx;
        this.y += this.vy;
    }
    comprobarSiChocaConPala(pala) {
        if (this.y == pala.y && (this.x >= pala.x && this.x <= pala.x + 60)) {
            this.vy = this.vy * -1;
            if(Math.random() >0.5){
            this.vx =this.vx*Math.random()*2+1;}
            else{this.vx = this.vx*Math.random()*2-1;}
        }
    }
    comprobarSiChocaConParedes() {
        //Aqui comprobamos si la bola choca con los bordes de la pantalla
        if (this.x <= 0 || this.x >= 1280) {
            this.vx = this.vx * -1;
        }
        if (this.y == 0) {
            this.vy = this.vy * -1;

        }
        //Recargamos la ventana cuando la bola choca con el fondo
        if (this.y == 720) {
            location.reload()
        }
    }
    comprobarSiChocaConLadrillo(ladrillo, arrayPowerups) {
        if (this.y >= ladrillo.y && this.y <= ladrillo.y+10 && (this.x >= ladrillo.x && this.x <= ladrillo.x + 128)) {
            ladrillo.romper();
            console.log(this.x);
            (Math.random()>0.5) // probabilidad de que se genere un powerup cuando se rompe un ladrillo CON LA BOLA* se hace aquí porque si lo hacemos en el ladrillo isBroken como se redibuja cada vez *EXPLOTA* 
            arrayPowerups.push(new PowerUP(ladrillo.x+64,ladrillo.y))
            this.vy = this.vy * -1;
            }
        }        
    }


class PowerUP{
    constructor(x,y){
        this.x = x;
        this.y =y;
    }
    w = 10;
    h = 10;
    vy = 4;
    dibujar (){
        ellipse (this.x,this.y,this.w,this.h);
    }
    moverse(){
        this.y += this.vy
    }
    comprobarSiChocaConPala(pala){
        if (this.y == pala.y && (this.x >= pala.x && this.x <= pala.x + 60)){
        console.log("bola chocando con palita")
        arraynuevasBolas.push(new Bola(640,690));
        }
}
}

// VARIABLES --------------------------------------------------------
var ladrillos = [];
var powersup =[];
var nuevasBolas = [];
var pala = new Pala(610, 700);
var bola = new Bola(640, 690);
var powerUpActivo = false;
// FUNCIONES APARTE------------------------------------------------

//CÓDIGO BUENO ------------------------------------
function setup() {
    background(220);

    createCanvas(1280, 720);
    var x = 0;
    var y = 0;
   //Este bucle anidado crea el array de ladrillos
    for(let j = 0; j<3;j++){
        for (let index = 0; index < 10; index++) {
            let ladrillo = new Ladrillo(x,y);
            ladrillos.push(ladrillo)
            x=x+128;   
        }
        x=0;
        y=y+10;
    }

}
function draw() {
    background(220);
    ladrillos.forEach(ladrillo => { //rd un array porque guarda los datos y aquí se llama a lo que queremos que haga con cada ladrillo 
        if(!ladrillo.isBroken){
            ladrillo.dibujar();
            bola.comprobarSiChocaConLadrillo(ladrillo,powersup);
        }
    });
        powersup.forEach(powersup=>{ // es un array porque guarda los datos y aquí se llama así porque queremos que con cada dato (powerup) haga eso
        powersup.dibujar();
        powersup.moverse();
        powersup.comprobarSiChocaConPala(pala);
            /*if (powersup.comprobarSiChocaConPala(pala)){
            nuevasbolas.push(new Bola(bola.x,bola.y))
            nuevasbolas.forEach(bolitasnuevasgeneradas=>{
                bolitasnuevasgeneradas.dibujar();
                bolitasnuevasgeneradas.moverse();
                bolitasnuevasgeneradas.comprobarSiChocaConPala(pala);
                bolitasnuevasgeneradas.comprobarSiChocaConParedes();
                ladrillos.forEach(indexLadrillo=> {
              bolitasnuevasgeneradas(indexLadrillo,arrayPowerups);
        })
    });}*/
        })
        nuevasBolas.forEach(bolitasnuevasgeneradas=>{
                bolitasnuevasgeneradas.dibujar();
                bolitasnuevasgeneradas.moverse();
                bolitasnuevasgeneradas.comprobarSiChocaConPala(pala);
                bolitasnuevasgeneradas.comprobarSiChocaConParedes();
                ladrillos.forEach(indexLadrillo=> {
              bolitasnuevasgeneradas(indexLadrillo,arrayPowerups);
        })
    });

    pala.dibujar();
    pala.moverse();
    bola.dibujar();
    bola.moverse();
    bola.comprobarSiChocaConPala(pala);
    bola.comprobarSiChocaConParedes();

}
