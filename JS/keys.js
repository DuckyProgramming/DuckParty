function keyPressed(){
    switch(key){
        case 'ArrowLeft':
            inputs.keys[0][0]=true
            inputs.tap[0][0]=true
        break
        case 'ArrowRight':
            inputs.keys[0][1]=true
            inputs.tap[0][1]=true
        break
        case 'ArrowUp':
            inputs.keys[0][2]=true
            inputs.tap[0][2]=true
        break
        case 'ArrowDown': case 'Shift':
            inputs.keys[0][3]=true
            inputs.tap[0][3]=true
        break
        case 'a': case 'A':
            inputs.keys[1][0]=true
            inputs.tap[1][0]=true
        break
        case 'd': case 'D':
            inputs.keys[1][1]=true
            inputs.tap[1][1]=true
        break
        case 'w': case 'W':
            inputs.keys[1][2]=true
            inputs.tap[1][2]=true
        break
        case 's': case 'S':
            inputs.keys[1][3]=true
            inputs.tap[1][3]=true
        break
        case 'j': case 'J':
            inputs.keys[2][0]=true
            inputs.tap[2][0]=true
        break
        case 'l': case 'L':
            inputs.keys[2][1]=true
            inputs.tap[2][1]=true
        break
        case 'i': case 'I':
            inputs.keys[2][2]=true
            inputs.tap[2][2]=true
        break
        case 'k': case 'K':
            inputs.keys[2][3]=true
            inputs.tap[2][3]=true
        break
        case 'f': case 'F':
            inputs.keys[3][0]=true
            inputs.tap[3][0]=true
        break
        case 'h': case 'H':
            inputs.keys[3][1]=true
            inputs.tap[3][1]=true
        break
        case 't': case 'T':
            inputs.keys[3][2]=true
            inputs.tap[3][2]=true
        break
        case 'g': case 'G':
            inputs.keys[3][3]=true
            inputs.tap[3][3]=true
        break
    }
}
function keyReleased(){
    switch(key){
        case 'ArrowLeft': inputs.keys[0][0]=false; break
        case 'ArrowRight': inputs.keys[0][1]=false; break
        case 'ArrowUp': inputs.keys[0][2]=false; break
        case 'ArrowDown': case 'Shift': inputs.keys[0][3]=false; break
        case 'a': case 'A': inputs.keys[1][0]=false; break
        case 'd': case 'D': inputs.keys[1][1]=false; break
        case 'w': case 'W': inputs.keys[1][2]=false; break
        case 's': case 'S': inputs.keys[1][3]=false; break
        case 'j': case 'J': inputs.keys[2][0]=false; break
        case 'l': case 'L': inputs.keys[2][1]=false; break
        case 'i': case 'I': inputs.keys[2][2]=false; break
        case 'k': case 'K': inputs.keys[2][3]=false; break
        case 'f': case 'F': inputs.keys[3][0]=false; break
        case 'h': case 'H': inputs.keys[3][1]=false; break
        case 't': case 'T': inputs.keys[3][2]=false; break
        case 'g': case 'G': inputs.keys[3][3]=false; break
    }
}