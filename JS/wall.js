class wall extends partisan{
    constructor(layer,x,y,width,height,color){
        super(layer,x,y,1)
        this.width=width
        this.height=height
        this.color=color
        this.boundary=[]
        this.setupValues()
        this.setupBoundary()
    }
    setupValues(){
        switch(this.type){
            case 0:
                
            break
        }
    }
    setupBoundary(){
        switch(this.type){
            default:
                this.boundary=[
                    [[{x:this.position.x-this.width/2,y:this.position.y+this.height/2},{x:this.position.x+this.width/2,y:this.position.y+this.height/2}]],
                    [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y-this.height/2}]],
                    [[{x:this.position.x+this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y+this.height/2}]],
                    [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x-this.width/2,y:this.position.y+this.height/2}]],
                    [],
                    [],
                    [],
                    [],
                ]
            break
        }
    }
    display(layer=this.layer){
        layer.push()
        layer.translate(this.position.x+this.offset.position.x,this.position.y+this.offset.position.y)
        layer.noStroke()
        switch(this.type){
            case 0:
                layer.fill(...this.color.base,this.fade)
                layer.rect(0,0,this.width,this.height)
            break
        }
        layer.pop()
    }
    update(parent){
        switch(this.type){
        }
    }
    collide(type,obj){
        switch(this.type){
            case 0:
                switch(type){
                    case 0:
                        switch(collideBoxBox(this,obj)){
                            case 0:
                                obj.position.y=this.position.y+this.height/2+obj.height/2
                                obj.velocity.y=max(0,obj.velocity.y)
                            break
                            case 1:
                                obj.position.y=this.position.y-this.height/2-obj.height/2
                                obj.velocity.y=min(0,obj.velocity.y)
                            break
                            case 2:
                                obj.position.x=this.position.x+this.width/2+obj.width/2
                                obj.velocity.x=max(0,obj.velocity.x)
                            break
                            case 3:
                                obj.position.y=this.position.x-this.width/2-obj.width/2
                                obj.velocity.x=min(0,obj.velocity.x)
                            break
                        }
                    break
                }
            break
        }
    }
}