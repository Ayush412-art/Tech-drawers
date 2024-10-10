//--------- floating toolbar-------
const toolbar = document.querySelector(".components");

// toolbar.style.display = "none";

const dragElement = ({movementX , movementY})=>{
let getstyle = window.getComputedStyle(toolbar)
let left = parseInt(getstyle.left);
let top = parseInt(getstyle.top);
toolbar.style.left = `${left + movementX}px`;
toolbar.style.top = `${top + movementY}px`;

}

toolbar.addEventListener("mousedown" , ()=>{
    toolbar.addEventListener("mousemove" , dragElement);
} )

toolbar.addEventListener("mouseup" , ()=>{
    toolbar.removeEventListener("mousemove" , dragElement)
})


document.addEventListener("DOMContentLoaded", function() {
const svgSector = document.getElementById("DrawingArea");
const brush = document.getElementById("brush-icon"); 
const eraser = document.getElementById("eraser-icon"); 
const rectangle = document.getElementById("rectangle-icon"); 
const circle = document.getElementById("circle-icon"); 
const triangle = document.getElementById("triangle-icon");
const line  = document.getElementById("line-icon");  
const EraserRange = document.querySelector(".EraserRange")
const brushSize = document.querySelector(".brushSize")

let currTool = "";
let isDrawing = false;
let startX , startY;
let currColor = "red";
let currcircle = null;
//-----------Tool selector---------

brush.addEventListener("click"  , ()=>{
    currTool = "brush";
})

function updatebrushRange(val){
        brushSize.value = val;

}
function updateEraserRange(val){
        EraserRange.value = val;
}

eraser.addEventListener("click"  , ()=>{
    currTool = "eraser";
})
rectangle.addEventListener("click"  , ()=>{
    currTool = "rectangle";
})
circle.addEventListener("click"  , ()=>{
    currTool = "circle";
})
line.addEventListener("click"  , ()=>{
    currTool = "line";

})
triangle.addEventListener("click"  , ()=>{
    currTool = "triangle";
})
//<-------------------------------Required functions------------------------------------>

function drawLine(x1, y1, x2, y2) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', currColor);
    line.setAttribute('stroke-width', brushSize.value);
    svgSector.appendChild(line);
}
function eraseShape(x1,y1,x2,y2){
    const eraserLine = document.createElementNS("http://www.w3.org/2000/svg" , "line")
    eraserLine.setAttribute('x1' ,x1);
    eraserLine.setAttribute('y1', y1);
    eraserLine.setAttribute('x2', x2);
    eraserLine.setAttribute('y2', y2);

    eraserLine.setAttribute('stroke' , "white")
    eraserLine.setAttribute('stroke-width' , EraserRange.value)    
    svgSector.appendChild(eraserLine);

}
function drawStrightLine(x1, y1, x2, y2) {
    const  line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', currColor);
    line.setAttribute('stroke-width', 10);
    svgSector.appendChild(line);   
}
function drawCircleElement(cx , cy , r){
     currcircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
currcircle.setAttribute('cx' , cx);
currcircle.setAttribute('cy' , cy);
currcircle.setAttribute('r' , r);
currcircle.setAttribute('stroke' , currColor);
currcircle.setAttribute('stroke-width' , '5');
currcircle.setAttribute('fill', 'transparent');
svgSector.appendChild(currcircle);

}


svgSector.addEventListener("mousedown" , ({offsetX , offsetY})=>{
   isDrawing = true;
    startX = offsetX;
    startY = offsetY;
   if (currTool === 'brush') {
    drawLine(startX, startY, startX, startY);
   }
    else if(currTool == 'eraser'){
        eraseShape(startY , startY , startX , startY)
    }
    else if(currTool == 'line'){
        drawStrightLine(startX , startY , startX , startY)
    }
    else if(currTool == 'circle' ){
        drawCircleElement(startX , startY , 0);
    }

})

svgSector.addEventListener("mousemove" , ({offsetX , offsetY})=>{
    if(isDrawing){
        let mouseX = offsetX;
        let mouseY = offsetY;

        if(currTool == "brush"){
            drawLine(startX, startY, mouseX, mouseY);
            startX = mouseX;
            startY = mouseY;
        }
        else if(currTool == "eraser"){
            eraseShape(startX ,startY , mouseX , mouseY)
            startX = mouseX;
            startY = mouseY;
        }
        else if(currTool == "circle" ){
            const radius = Math.sqrt(Math.pow(mouseX - startX, 2) + Math.pow(mouseY - startY, 2))
           currcircle.setAttribute("r" , radius);
            
        }
        // else if(currTool === 'line'){
        //    line.setAttribute("x2" , mouseX)
        //    line.setAttribute("y2" , mouseY)
         
        // }

    }
    else{
        return ;
    }
})

svgSector.addEventListener('mouseup', ({offsetX , offsetY}) => {
   
    isDrawing = false;
    const endX = offsetX;
    const endY = offsetY;

    if (currTool === 'rectangle') {
        drawRect(startX, startY, endX - startX, endY - startY);
    } else if (currTool =='circle') {
        const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        currcircle.setAttribute('r', radius);
       
        
    } else if(currColor == "line"){
        line.setAttribute("x2" , endX)
        line.setAttribute("y2" , endY)
    }
     else{
return ; 
     }
});



}
)
