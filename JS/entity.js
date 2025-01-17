class entity{
    constructor(layer,x,y,fade){
        this.layer=layer
        this.position={x:x,y:y}
        this.timer={main:0}
        this.fade=fade
        this.remove=false
    }
    update(){
        this.timer.main++
        this.fade.main=smoothAnim(this.fade.main,this.fade.trigger,0,1,this.fade.speed)
    }
}