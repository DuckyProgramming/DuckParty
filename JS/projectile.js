class projectile extends entity{
    constructor(layer,x,y,type,control){
        super(layer,x,y,{main:0,trigger:true,speed:5})
        this.type=type
        this.control=control
        switch(this.type){
            case 0:
                this.past=elementArray({x:this.position.x,y:this.position.y},10)
                this.radius=10
                this.direction=control.direction
                this.velocity={x:0,y:0}
                this.speed=random(4,8)
                this.velocity.x=lsin(this.direction)*this.speed
                this.velocity.y=lcos(this.direction)*this.speed
                this.active=true
                this.size=1
            break
        }
    }
    display(layer=this.layer){
        layer.push()
        layer.translate(this.position.x,this.position.y)
        layer.noStroke()
        switch(this.type){
            case 0:
                if(this.size>0){
                    for(let a=0,la=5;a<la;a++){
                        layer.fill(225,160-a*40,0,this.fade.main)
                        layer.ellipse(this.past[8-a*2].x-this.position.x,this.past[8-a*2].y-this.position.y,(7.5-a*1.5)*this.size)
                    }
                    layer.fill(225,this.fade.main)
                    layer.ellipse(0,0,12*this.size)
                }
            break
        }
        layer.pop()
    }
    update(){
        super.update()
        switch(this.type){
            case 0:
                this.past.push({x:this.position.x,y:this.position.y})
                this.past.splice(0,1)
            break
        }
        switch(this.type){
            case 0:
                this.position.x+=this.velocity.x*min(1,this.timer.main/300)
                this.position.y+=this.velocity.y*min(1,this.timer.main/300)
                if(this.position.x<0){
                    this.position.x=0
                    this.velocity.x*=-1
                }else if(this.position.x>this.layer.width){
                    this.position.x=this.layer.width
                    this.velocity.x*=-1
                }
                if(this.position.y<0){
                    this.position.y=0
                    this.velocity.y*=-1
                }else if(this.position.y>this.layer.height){
                    this.position.y=this.layer.height
                    this.velocity.y*=-1
                }
                if(floor(random(0,60))==0){
                    this.direction=random(0,360)
                    this.velocity.x=lsin(this.direction)*this.speed
                    this.velocity.y=lcos(this.direction)*this.speed
                }
                if(!this.active&&this.size>0){
                    this.size-=0.1
                }
            break
        }
    }
    collide(type,obj){
        switch(this.type){
            case 0:
                switch(type){
                    case 0:
                        if(distPos(this,obj)<this.radius+obj.radius&&obj.active&&obj.timer.invincible<=0&&this.size>0){
                            obj.life--
                            obj.timer.invincible=30
                            let dir=dirPos(this,obj)
                            let magnitude=[magVec(this.velocity)*0.16+magVec(obj.velocity)*0.6,magVec(this.velocity)*0.6,magVec(obj.velocity)]
                            obj.velocity.x=magnitude[0]*lsin(dir)
                            obj.velocity.y=magnitude[0]*lcos(dir)
                            this.velocity.x=-magnitude[1]*lsin(dir)
                            this.velocity.y=-magnitude[1]*lcos(dir)
                        }
                    break
                    case 1:
                        if(distPos(this,obj)<this.radius*this.size+obj.radius&&this.size>0){
                            let dir=dirPos(this,obj)
                            let magnitude=[magVec(this.velocity),magVec(obj.velocity)]
                            obj.velocity.x=magnitude[0]*lsin(dir)
                            obj.velocity.y=magnitude[0]*lcos(dir)
                            this.velocity.x=-magnitude[1]*lsin(dir)
                            this.velocity.y=-magnitude[1]*lcos(dir)
                        }
                    break
                }
            break
        }
    }
}