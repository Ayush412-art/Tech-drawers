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
const brushSize = document.querySelector(".brushSize")

let currTool = "";
let isDrawing = "false";
let startX , startY;
let currColor = "black";
//-----------Tool selector---------
brush.addEventListener("click"  , ()=>{
    currTool = "brush";
})
function updateRange(val){
        brushSize.value = val;

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

svgSector.addEventListener("mousedown" , ({offsetX , offsetY})=>{
   isDrawing ="true";
    startX = offsetX;
    startY = offsetY;
   if (currTool === 'brush') {
    drawLine(startX, startY, startX, startY);
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
    } else if (currTool === 'circle') {
        drawCircle(startX, startY, endX, endY);
    } else if (currTool === 'eraser') {
        eraseShape(endX, endY);
    }
   
});



}
)
