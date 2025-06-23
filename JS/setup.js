function setup(){
    createCanvas(windowWidth-50,windowHeight-50)
    setupGraphics()
    current=new operation(graphics.main)
    current.setup('minigame',{minigame:18})
}
function windowResized(){
    resizeCanvas(windowWidth-50,windowHeight-50)
}