class wall extends partisan{
    constructor(layer,x,y,width,height,type,color){
        super(layer,x,y,{main:1,trigger:true,speed:5})
        this.width=width
        this.height=height
        this.color=color
        this.type=type
        this.boundary=[]
        this.bounder={}
        this.setupValues()
        this.setupBoundary()
        this.setupBounder()
    }
    setupValues(){
        switch(this.type){
            case 2:
                this.animOffset=random(0,150)
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
    setupBounder(){
        switch(this.type){
            default:
                let bound={x:[this.position.x+this.width/2,this.position.x-this.width/2],y:[this.position.y+this.height/2,this.position.y-this.height/2]}
                for(let a=0,la=this.boundary.length;a<la;a++){
                    for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                        for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                            if(this.boundary[a][b][c].x<bound.x[0]){
                                bound.x[0]=this.boundary[a][b][c].x
                            }
                            if(this.boundary[a][b][c].x>bound.x[1]){
                                bound.x[1]=this.boundary[a][b][c].x
                            }
                            if(this.boundary[a][b][c].y<bound.y[0]){
                                bound.y[0]=this.boundary[a][b][c].y
                            }
                            if(this.boundary[a][b][c].y>bound.y[1]){
                                bound.y[1]=this.boundary[a][b][c].y
                            }
                        }
                    }
                }
                this.bounder={position:{x:(bound.x[0]+bound.x[1])/2,y:(bound.y[0]+bound.y[1])/2},width:abs(bound.x[0]-bound.x[1]),height:abs(bound.y[0]-bound.y[1])}
            break
        }
    }
    display(layer=this.layer){
        layer.push()
        layer.translate(this.position.x+this.offset.position.x,this.position.y+this.offset.position.y)
        layer.noStroke()
        switch(this.type){
            case 0:
                layer.fill(...this.color.base,this.fade.main)
                layer.rect(0,0,this.width,this.height)
            break
            case 1:
                layer.fill(...this.color.base[0],this.fade.main)
                layer.rect(0,0,this.width,this.height)
                layer.fill(...this.color.base[1],this.fade.main)
                for(let a=0,la=this.width/10;a<la;a++){
                    for(let b=0,lb=this.height/10;b<lb;b++){
                        if((a+b)%2==0){
                            layer.rect(-this.width/2+5+a*10,-this.height/2+5+b*10,10)
                        }
                    }
                }
            break
            case 2:
                layer.fill(...this.color.base,this.fade.main)
                layer.rect(0,0,this.width,this.height)
                layer.fill(...this.color.over,this.fade.main)
                layer.rect(0,0,this.width-10,this.height-10)
            break
        }
        layer.pop()
    }
    move(x,y){
        this.velocity.x=x
        this.velocity.y=y
        this.position.x+=x
        this.position.y+=y
        this.bounder.position.x+=x
        this.bounder.position.y+=y
        for(let a=0,la=this.boundary.length;a<la;a++){
            for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                    this.boundary[a][b][c].x+=x
                    this.boundary[a][b][c].y+=y
                }
            }
        }
    }
    update(parent){
        super.update(1)
        this.velocity.x=0
        this.velocity.y=0
        switch(this.type){
            case 2:
                if(this.timer.main>this.animOffset){
                    this.move(0,((this.timer.main-this.animOffset)%150<75?-1:1)*2)
                }
            break
        }
    }
    collide(type,obj,parent){
        switch(this.type){
            case 0: case 1: case 2:
                switch(type){
                    case 0:
                        if(inBoxBox(this.bounder,obj)){
                            let edge=collideBoxBox(this,obj)
                            if(edge>=0){
                                switch(this.type){
                                    case 1:
                                        return [1,obj.id]
                                    default:
                                        switch(edge){
                                            case 0:
                                                obj.position.y=this.position.y+this.height/2+obj.height/2
                                                obj.velocity.y=max(0,obj.velocity.y)+this.velocity.y
                                                obj.collided.wall[0]=max(2,obj.collided.wall[0])
                                            break
                                            case 1:
                                                obj.position.y=this.position.y-this.height/2-obj.height/2
                                                obj.velocity.y=min(0,obj.velocity.y)+this.velocity.y
                                                obj.collided.wall[1]=max(2,obj.collided.wall[1])
                                                obj.jump.time=max(obj.jump.time,5)
                                            break
                                            case 2:
                                                obj.position.x=this.position.x+this.width/2+obj.width/2
                                                obj.velocity.x=max(0,obj.velocity.x)+this.velocity.x
                                                obj.collided.wall[2]=max(2,obj.collided.wall[2])
                                            break
                                            case 3:
                                                obj.position.x=this.position.x-this.width/2-obj.width/2
                                                obj.velocity.x=min(0,obj.velocity.x)+this.velocity.x
                                                obj.collided.wall[3]=max(2,obj.collided.wall[3])
                                            break
                                        }
                                    break
                                }
                            }
                        }
                    break
                }
            break
        }
        return [0,0]
    }
}