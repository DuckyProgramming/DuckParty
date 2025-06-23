class projectile extends entity{
    constructor(layer,x,y,type,control){
        super(layer,x,y,{main:0,trigger:true,speed:5})
        this.type=type
        this.control=control
        switch(this.type){
            case 0: case 1: case 3: case 5: case 6: case 7:
                this.past=elementArray({x:this.position.x,y:this.position.y},10)
                this.radius=6
                this.direction=control.direction
                switch(this.type){
                    case 0: case 1: case 7:
                        this.speed=random(4,8)
                        this.size=1
                    break
                    case 3:
                        this.speed=8
                        this.size=1
                        this.previous={position:{x:this.position.x,y:this.position.y}}
                        this.base={position:{x:this.position.x,y:this.position.y}}
                    break
                    case 5:
                        this.speed=0
                        this.size=0
                    break
                    case 6:
                        this.speed=random(4,8)
                        this.size=1
                        this.insided=false
                    break
                }
                this.velocity={x:0,y:0}
                this.velocity.x=lsin(this.direction)*this.speed
                this.velocity.y=lcos(this.direction)*this.speed
                this.active=true
            break
            case 2:
                this.direction=control.direction
                this.size=control.size
                this.id=control.id
                this.color=control.color
                this.speed=8-this.size*4
                this.radius=this.size*6
                this.velocity={x:0,y:0}
                this.velocity.x=lsin(this.direction)*this.speed
                this.velocity.y=lcos(this.direction)*this.speed
                this.active=true
            break
            case 4:
                this.direction=control.direction
                this.value=control.value
                this.size=1
                this.spots=[]
                let begin=random(0,360)
                for(let a=0,la=this.value;a<la;a++){
                    let rad=random(8,10)
                    let dir=begin+(a+random(-0.2,0.2))/la*360
                    this.spots.push({main:[lsin(dir)*rad,lcos(dir)*rad,random(10,11)],spots:[]})
                    let begin2=random(0,360)
                    for(let b=0,lb=floor(random(2.5,5.5));b<lb;b++){
                        let rad=random(2,3.5)
                        let dir=begin2+(b+random(-0.2,0.2))/lb*360
                        this.spots[a].spots.push([lsin(dir)*rad,lcos(dir)*rad,random(1.5,2.25)])
                    }
                }
            break
            case 8:
                this.direction=control.direction
                this.id=control.id
                this.color=control.color
                this.timer.active=control.timer
                this.speed=8
                this.size=1
                this.past=elementArray({x:this.position.x,y:this.position.y},10)
                this.radius=3
                this.width=6
                this.height=6
                this.velocity={x:0,y:0}
                this.velocity.x=lsin(this.direction)*this.speed
                this.velocity.y=lcos(this.direction)*this.speed
                this.previous={position:{x:this.position.x,y:this.position.y}}
                this.active=true
            break
        }
    }
    display(layer=this.layer){
        layer.push()
        layer.translate(this.position.x,this.position.y)
        layer.noStroke()
        switch(this.type){
            case 0: case 1: case 6: case 7:
                if(this.size>0){
                    for(let a=0,la=5;a<la;a++){
                        layer.fill(225,160-a*40,0,this.fade.main)
                        layer.ellipse(this.past[8-a*2].x-this.position.x,this.past[8-a*2].y-this.position.y,(7.5-a*1.5)*this.size)
                    }
                    layer.fill(225,this.fade.main)
                    layer.ellipse(0,0,12*this.size)
                }
            break
            case 2:
                for(let a=0,la=5;a<la;a++){
                    layer.fill(...this.color.main,this.fade.main*0.25)
                    layer.ellipse(0,0,(15-2.5*a)*this.size)
                }
            break
            case 3:
                if(this.size>0){
                    for(let a=0,la=5;a<la;a++){
                        layer.fill(225,160-a*40,0,this.fade.main)
                        layer.ellipse(this.past[8-a*2].x-this.position.x,this.past[8-a*2].y-this.position.y,(7.5-a*1.5)*this.size)
                    }
                    layer.fill(50,this.fade.main)
                    layer.ellipse(0,0,12*this.size)
                }
            break
            case 4:
                layer.scale(this.size)
                layer.fill(220,this.fade.main)
                layer.ellipse(0,0,36)
                if(this.value==-1){
                    layer.fill(100,this.fade.main)
                    layer.ellipse(0,0,20)
                    regStar(layer,0,0,9,14,14,8,8,this.timer.main*0.1)
                }else{
                    layer.fill(160,130,80,this.fade.main)
                    for(let a=0,la=this.spots.length;a<la;a++){
                        layer.ellipse(this.spots[a].main[0],this.spots[a].main[1],this.spots[a].main[2])
                    }
                    layer.fill(75,45,15,this.fade.main)
                    for(let a=0,la=this.spots.length;a<la;a++){
                        for(let b=0,lb=this.spots[a].spots.length;b<lb;b++){
                            layer.ellipse(this.spots[a].main[0]+this.spots[a].spots[b][0],this.spots[a].main[1]+this.spots[a].spots[b][1],this.spots[a].spots[b][2])
                        }
                    }
                }
            break
            case 5:
                if(this.size>0){
                    for(let a=0,la=5;a<la;a++){
                        layer.fill(100,160,80+a*20,this.fade.main)
                        layer.ellipse(this.past[8-a*2].x-this.position.x,this.past[8-a*2].y-this.position.y,(5-a)*this.size)
                    }
                    layer.fill(100,160,60,this.fade.main)
                    layer.ellipse(0,0,8*this.size)
                }
            break
            case 8:
                if(this.size>0){
                    for(let a=0,la=5;a<la;a++){
                        layer.fill(...mergeColor([250,250,250],this.color.main,0.5-0.5*a/la),this.fade.main)
                        layer.ellipse(this.past[8-a*2].x-this.position.x,this.past[8-a*2].y-this.position.y,(3.75-a*0.75)*this.size)
                    }
                    layer.fill(...this.color.main,this.fade.main)
                    layer.ellipse(0,0,6*this.size)
                }
            break
        }
        layer.pop()
    }
    update(parent){
        super.update()
        switch(this.type){
            case 0: case 1: case 3: case 5: case 6: case 7: case 8:
                this.past.push({x:this.position.x,y:this.position.y})
                this.past.splice(0,1)
            break
        }
        switch(this.type){
            case 0:
                this.position.x+=this.velocity.x*min(1,this.timer.main/300)
                this.position.y+=this.velocity.y*min(1,this.timer.main/300)
                if(this.position.x<parent.control.bound.base.x){
                    this.position.x=parent.control.bound.base.x
                    this.velocity.x*=-1
                }else if(this.position.x>parent.control.bound.base.x+parent.control.bound.width){
                    this.position.x=parent.control.bound.base.x+parent.control.bound.width
                    this.velocity.x*=-1
                }
                if(this.position.y<parent.control.bound.base.y){
                    this.position.y=parent.control.bound.base.y
                    this.velocity.y*=-1
                }else if(this.position.y>parent.control.bound.base.y+parent.control.bound.height){
                    this.position.y=parent.control.bound.base.y+parent.control.bound.height
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
            case 1:
                this.position.x+=this.velocity.x
                this.position.y+=this.velocity.y
                this.velocity.y+=constants.gravity*0.25
                this.velocity.x*=0.98
                this.velocity.y*=0.98
                if(!this.active&&this.size>0){
                    this.size-=0.1
                }
                if(this.position.x<-50||this.position.x>parent.control.bound.width+50||this.position.y<-50||this.position.y>parent.control.bound.height+50){
                    this.active=false
                }
            break
            case 2:
                this.position.x+=this.velocity.x
                this.position.y+=this.velocity.y
                if(!this.active&&this.size>0){
                    this.size-=0.1
                }
                if(this.position.x<-50||this.position.x>parent.control.bound.width+50||this.position.y<-50||this.position.y>parent.control.bound.height+50){
                    this.active=false
                }
            break
            case 3:
                this.previous.position.x=this.position.x
                this.previous.position.y=this.position.y
                if(abs(this.velocity.x)<0.2){
                    this.velocity.x=0.2*(floor(random(0,2))*2-1)
                }
                this.position.x+=this.velocity.x*min(1,this.timer.main/300)
                this.position.y+=this.velocity.y*min(1,this.timer.main/300)
                if(this.position.x<parent.control.bound.base.x){
                    this.position.x=this.base.position.x
                    this.position.y=this.base.position.y
                    this.timer.main=0
                    this.size=0
                    this.direction=random(0,360)
                    this.velocity.x=lsin(this.direction)*this.speed
                    this.velocity.y=lcos(this.direction)*this.speed
                    parent.result.score[1]++
                }else if(this.position.x>parent.control.bound.base.x+parent.control.bound.width){
                    this.position.x=this.base.position.x
                    this.position.y=this.base.position.y
                    this.timer.main=0
                    this.size=0
                    this.direction=random(0,360)
                    this.velocity.x=lsin(this.direction)*this.speed
                    this.velocity.y=lcos(this.direction)*this.speed
                    parent.result.score[0]++
                }
                if(this.position.y<parent.control.bound.base.y){
                    this.position.y=parent.control.bound.base.y
                    this.velocity.y*=-1
                }else if(this.position.y>parent.control.bound.base.y+parent.control.bound.height){
                    this.position.y=parent.control.bound.base.y+parent.control.bound.height
                    this.velocity.y*=-1
                }
                if((
                    intersect(
                        {x:100,y:parent.control.bound.base.y},
                        {x:100,y:parent.control.bound.base.y+parent.control.bound.height*0.5-75},
                        this.position,this.previous.position
                    )||intersect(
                        {x:100,y:parent.control.bound.base.y+parent.control.bound.height},
                        {x:100,y:parent.control.bound.base.y+parent.control.bound.height*0.5+75},
                        this.position,this.previous.position
                    )
                )&&this.position.x<100||(
                    intersect(
                        {x:parent.control.bound.width-100,y:parent.control.bound.base.y},
                        {x:parent.control.bound.width-100,y:parent.control.bound.base.y+parent.control.bound.height*0.5-75},
                        this.position,this.previous.position
                    )||intersect(
                        {x:parent.control.bound.width-100,y:parent.control.bound.base.y+parent.control.bound.height},
                        {x:parent.control.bound.width-100,y:parent.control.bound.base.y+parent.control.bound.height*0.5+75},
                        this.position,this.previous.position
                    )
                )&&this.position.x>parent.control.bound.width-100){
                    this.velocity.x*=-1
                }
                if((
                    intersect(
                        {x:0,y:parent.control.bound.base.y+parent.control.bound.height*0.5-75},
                        {x:100,y:parent.control.bound.base.y+parent.control.bound.height*0.5-75},
                        this.position,this.previous.position
                    )||intersect(
                        {x:parent.control.bound.width,y:parent.control.bound.base.y+parent.control.bound.height*0.5-75},
                        {x:parent.control.bound.width-100,y:parent.control.bound.base.y+parent.control.bound.height*0.5-75},
                        this.position,this.previous.position
                    )
                )&&this.position.y<parent.control.bound.base.y+parent.control.bound.height*0.5-75||(
                    intersect(
                        {x:parent.control.bound.width,y:parent.control.bound.base.y+parent.control.bound.height*0.5+75},
                        {x:parent.control.bound.width-100,y:parent.control.bound.base.y+parent.control.bound.height*0.5+75},
                        this.position,this.previous.position
                    )||intersect(
                        {x:0,y:parent.control.bound.base.y+parent.control.bound.height*0.5+75},
                        {x:100,y:parent.control.bound.base.y+parent.control.bound.height*0.5+75},
                        this.position,this.previous.position
                    )
                )&&this.position.y>parent.control.bound.base.y+parent.control.bound.height*0.5+75){
                    this.velocity.y*=-1
                }
                if(!this.active&&this.size>0){
                    this.size-=0.1
                }else if(this.active&&this.size<1){
                    this.size+=0.1
                }
            break
            case 5:
                if(this.size<1){
                    this.size+=1/60
                    this.speed=1/30
                }else{
                    this.speed+=constants.gravity*0.5
                }
                this.velocity.x=lsin(this.direction)*this.speed
                this.velocity.y=lcos(this.direction)*this.speed
                this.position.x+=this.velocity.x
                this.position.y+=this.velocity.y
                if(!this.active&&this.size>0){
                    this.size-=0.1
                }
            break
            case 6:
                this.position.x+=this.velocity.x
                this.position.y+=this.velocity.y
                if(!this.active&&this.size>0){
                    this.size-=0.1
                }
                if(this.size<=0){
                    this.remove=true
                }
                if((this.position.x<-50||this.position.x>parent.control.bound.width+50||this.position.y<-50||this.position.y>parent.control.bound.height+50)&&(this.insided||this.time>600)){
                    this.active=false
                }
                if(this.position.x>-50&&this.position.x<parent.control.bound.width+50&&this.position.y>-50&&this.position.y<parent.control.bound.height+50&&!this.insided){
                    this.insided=true
                }
            break
            case 7:
                this.position.x+=this.velocity.x*min(1,this.timer.main/300)
                this.position.y+=this.velocity.y*min(1,this.timer.main/300)
                if(this.position.x<parent.control.internalBound.base.x){
                    this.position.x=parent.control.internalBound.base.x
                    this.velocity.x*=-1
                }else if(this.position.x>parent.control.internalBound.base.x+parent.control.internalBound.width){
                    this.position.x=parent.control.internalBound.base.x+parent.control.internalBound.width
                    this.velocity.x*=-1
                }
                if(this.position.y<parent.control.internalBound.base.y){
                    this.position.y=parent.control.internalBound.base.y
                    this.velocity.y*=-1
                }else if(this.position.y>parent.control.internalBound.base.y+parent.control.internalBound.height){
                    this.position.y=parent.control.internalBound.base.y+parent.control.internalBound.height
                    this.velocity.y*=-1
                }
                if(!this.active&&this.size>0){
                    this.size-=0.1
                }
            break
            case 8:
                this.previous.position.x=this.position.x
                this.previous.position.y=this.position.y
                this.position.x+=this.velocity.x
                this.position.y+=this.velocity.y
                if(this.timer.active>0){
                    this.timer.active--
                }else{
                    this.active=false
                }
                if(!this.active){
                    if(this.size>0){
                        this.size-=0.1
                    }else{
                        this.remove=true
                    }
                }
            break
        
        }
    }
    collide(type,obj,parent){
        switch(this.type){
            case 0: case 1: case 2: case 3: case 6: case 7:
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
                    case 2:
                        if(inCircleBox(this,obj)&&this.size>0){
                            let dir=dirPos(this,obj)
                            let magnitude=[magVec(this.velocity),magVec(obj.velocity)]
                            obj.velocity.x+=magnitude[0]*lsin(dir)*0.5
                            obj.velocity.y+=magnitude[0]*lcos(dir)*0.5
                            this.velocity.x=-magnitude[0]*lsin(dir)
                            this.velocity.y=-magnitude[0]*lcos(dir)
                        }
                    break
                    case 3:
                        if(distPos(this,obj)<this.radius+obj.radius&&obj.id!=this.id&&obj.active&&obj.timer.invincible<=0&&this.size>0){
                            obj.life--
                            obj.timer.invincible=30
                        }
                    break
                    case 4:
                        if(distPos(this,obj)<this.radius+obj.radius){
                            let dir=dirPos(this,obj)
                            let magnitude=magVec(this.velocity)
                            this.velocity.x=-magnitude*lsin(dir)
                            this.velocity.y=-magnitude*lcos(dir)
                        }
                    break
                }
            break
            case 5:
                switch(type){
                    case 0:
                        if(inCircleBox(this,obj)&&obj.active&&obj.timer.invincible<=0&&this.size>0){
                            obj.life--
                            obj.timer.invincible=30
                        }
                    break
                }
            break
            case 8:
                switch(type){
                    case 0:
                        if(distPos(this,obj)<this.radius+obj.radius&&obj.active&&obj.timer.invincible<=0&&this.size>0&&(obj.id!=this.id||this.timer.main>60)){
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