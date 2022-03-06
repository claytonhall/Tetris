//this represents the board
gridArray = {};

//these are available pieces
pieces = [()=>new BarPiece(), ()=>new ZPiece(), ()=>new SPiece, ()=>new TPiece];
nextPiece = null;
activePiece = null;

lastDraw = new Date();


window.onload = function(){
    //alert("loading it...");
    if(document.body)
    {
        console.log("body is not null")
    }
    else
    {
        console.log("body is null");
    }
    document.body.style.backgroundColor = "black";

    createBoard();

    //var piece = pieces[getRandomInt(3)]();


    //var x = new BarPiece();
    //piece.Draw();
    nextPiece = pieces[getRandomInt(3)]();
    activePiece = pieces[getRandomInt(3)]();
    Start();

    console.log("I ran");
};


function Start()
{
    //activePiece.Draw();
    //loop(Date.now());
    //window.requestAnimationFrame(loop);
    window.requestAnimationFrame(loop);
}


// setInterval((function(){ 
//     if(!isDrawing){
//         loop();
//     }
//  }), 1000);


//
lastMove = new Date();
totalProgress = 0;
function update(progress) {
    // Update the state of the world for the elapsed time since last render
    totalProgress += progress;
    if(activePiece && totalProgress > 1000){    
        activePiece.MoveDown();
        
        //reset!
        totalProgress = 0;
    }
}
  

  isDrawing = false;
  function draw() {

    isDrawing = true;

    // Draw the state of the world
    //if(new Date() > new Date(lastDraw.getTime() + 500))
    //{
        if(activePiece){
            console.log(`drawing: ${lastDraw}`);
            activePiece.Draw();
            //lastDraw = new Date();
        }
   // }

    isDrawing = false;
  }
  
  function loop(timestamp) {
    var progress = timestamp - lastRender
    
    update(progress)
    draw()
  
    lastRender = timestamp
    window.requestAnimationFrame(loop)
     //loop(Date.now())
  }
  var lastRender = 0
 // window.requestAnimationFrame(loop)







function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


function createBoard()
{
    var board = document.getElementById("board");
    var boardRect = board.getBoundingClientRect();


    for(var i = 0;i<10;i++)
    {
        for(var j=0;j<20;j++)
        {
            var element = document.createElement("div");
            element.className = "square";
            document.body.appendChild(element);

            var elementRect = element.getBoundingClientRect();
            
            element.style.position = "absolute";
            element.style.left = `${boardRect.left + ( i * elementRect.width)}px`;
            element.style.bottom = `${boardRect.bottom - (j * elementRect.height)}px`;

            gridArray[[i,j]] = element;

            console.log(`${element.style.left}X${element.style.bottom}`);
        }
    }
}


class Piece
{
    oldGridElements = [];
    gridElements = [];


    Draw(){
        for(var i = 0;i<this.oldGridElements.length;i++)
        {
            console.log(`this.gridOldElements[${i}] ${this.oldGridElements[i]}`);
            gridArray[this.oldGridElements[i]].style.backgroundColor = "black";
        }

        for(var i = 0;i<this.gridElements.length;i++)
        {
            console.log(`this.gridElements[${i}] ${this.gridElements[i]}`);
            gridArray[this.gridElements[i]].style.backgroundColor = "blue";
        }
    }

    MoveDown(){
        for(var i=0;i<this.gridElements.length;i++){
            var position = this.gridElements[i];
            
            
            this.oldGridElements[i] = [position[0], position[1]]

            if(position[1] < 19)
            {
                this.gridElements[i] = [position[0], position[1]+1]
            }
        }
    }

    constructor(gridElements){
        this.oldGridElements = gridElements.map((x)=>x);
        this.gridElements = gridElements.map((x)=>x);
    }


}


class ZPiece extends Piece{
    constructor(){
        super([[3,0],[4,0],[4,1],[5,1]])

        
    
    
    }
}

class SPiece extends Piece{
    constructor(){
        super([[3,1],[4,1],[4,0],[5,0]])
    }

}

class TPiece extends Piece{
    constructor(){
        super([[3,0],[4,0],[4,1],[5,0]])
    }
  
}

class BarPiece extends Piece{
    constructor(){
        super([[3,0],[4,0],[5,0],[6,0]])
    }
  
}






// var positions = [
//     `____
//    ____
//    XXXX
//    ____`,
 
//     `_X__
//    _X__
//    _X__
//    _X__`
// ];

// var currentPostion = 0;


// var lines = positions[currentPostion].split(/\r?\n/);
// var retVal = [];

// for (var i = 0; i < lines.length; i++) {
//  console.log(lines[i].trim());
 
//  for(var j = 0; j < lines[i].length; j++)
//  {
//      if(lines[i].charAt(j) === 'X')
//    {
//        retVal.push([i,j])
//    }
//  }
// }


// console.log(retVal);




