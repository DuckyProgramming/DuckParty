function displaySymbol(layer,x,y,type,direction,size,color,fade){
    layer.push()
    layer.translate(x,y)
    layer.rotate(direction)
    layer.scale(size)
    layer.noFill()
    layer.noStroke()
    switch(type){
        case 0:
            layer.fill(...color,fade)
            regTriangle(layer,2,0,6,6,90)
            layer.rect(-4,0,8,4)
        break


    }
    layer.pop()
}