function setup(){
    createCanvas(windowWidth-50,windowHeight-50)
    setupGraphics()
    current=new operation(graphics.main)
    //current.setup('minigame',{minigame:31})
    current.setup('board',{board:0})
}
function windowResized(){
    resizeCanvas(windowWidth-50,windowHeight-50)
}