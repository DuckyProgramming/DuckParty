class projectile extends entity{
    constructor(layer,x,y,type,control){
        super(layer,x,y,{main:0,trigger:true,speed:5})
        this.type=type
        this.control=control
        this.setupValues(control)
    }
    setupValues(control){
        let begin
        switch(this.type){
            case 0: case 1: case 3: case 5: case 6: case 7: case 15:
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
                    case 15:
                        this.speed=random(3,5)
                        this.timer.accel=45
                        this.size=1
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
            case 4: case 13:
                this.direction=control.direction
                this.value=control.value
                this.size=1
                this.radius=18*this.size
                this.spots=[]
                begin=random(0,360)
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
                this.active=true
            break
            case 8: case 9: case 11:
                this.direction=control.direction
                this.id=control.id
                this.color=control.color
                this.timer.active=control.timer
                this.size=1
                this.past=elementArray({x:this.position.x,y:this.position.y},10)
                switch(this.type){
                    case 8:
                        this.speed=8
                        this.radius=3
                        this.width=6
                        this.height=6
                    break
                    case 9:
                        this.speed=4
                        this.radius=2
                        this.width=4
                        this.height=4
                    break
                    case 11:
                        this.speed=12
                        this.radius=2
                        this.width=4
                        this.height=4
                    break
                }
                this.velocity={x:0,y:0}
                this.velocity.x=lsin(this.direction)*this.speed
                this.velocity.y=lcos(this.direction)*this.speed
                this.previous={position:{x:this.position.x,y:this.position.y}}
                this.active=true
            break
            case 10:
                this.direction=control.direction
                this.id=control.id
                this.size=control.size
                this.speed=8-control.size*0.8
                this.radius=2.5*control.size
                this.velocity={x:0,y:0}
                this.velocity.x=lsin(this.direction)*this.speed
                this.velocity.y=lcos(this.direction)*this.speed
                this.previous={position:{x:this.position.x,y:this.position.y}}
                this.fade.main=1
                this.active=true
            break
            case 12:
                this.speed=3
                this.radius=random(7.5,8.25)
                this.insided=false
                this.direction=atan2(this.layer.width/2-this.position.x,this.layer.height/2-this.position.y)+random(-30,30)
                this.velocity={x:0,y:0}
                this.velocity.x=lsin(this.direction)*this.speed
                this.velocity.y=lcos(this.direction)*this.speed
                this.spots=[]
                begin=random(0,360)
                for(let a=0,la=floor(random(2.5,5.5));a<la;a++){
                    let rad=random(3,5.25)
                    let dir=begin+(a+random(-0.2,0.2))/la*360
                    this.spots.push([lsin(dir)*rad,lcos(dir)*rad,random(2.25,3.375)])
                }
                this.active=true
            break
            case 14:
                this.radius=15
                this.direction=0
                this.velocity={x:0,y:0}
                this.spots=[]
                begin=random(0,360)
                for(let a=0,la=floor(random(10,16));a<la;a++){
                    let dir=begin+(a+random(-0.4,0.4))/la*360
                    this.spots.push([lsin(dir),lcos(dir),random(1.5,2.5),random(90,270),(random(0,(this.radius-1)**3))**(1/3),(random(0,(this.radius-1)**3))**(1/3),random(0,360)])
                }
                this.image=createGraphics(30,30)
                setupLayer(this.image)
                this.image.translate(15,15)
            break
            case 16:
                this.variant=control.variant
                if(this.variant!=8){
                    this.fade.main=1
                }
                this.fade.speed=15
                this.direction=random(0,360)
                this.process={main:0}
                this.held=false
                switch(this.variant){
                    case 1:
                        this.process.goal=120
                    break
                    case 4:
                        this.process.goal=300
                    break
                    case 5:
                        this.process.goal=240
                    break
                    case 8:
                        this.process.goal=90
                    break
                    default:
                        this.process.goal=0
                    break
                }
            break
        }
    }
    display(layer=this.layer){
        layer.push()
        layer.translate(this.position.x,this.position.y)
        layer.noStroke()
        switch(this.type){
            case 0: case 1: case 6: case 7: case 15:
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
            case 4: case 13:
                layer.scale(this.size)
                layer.rotate(-this.direction)
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
            case 9:
                if(this.size>0){
                    for(let a=0,la=5;a<la;a++){
                        layer.fill(...mergeColor([250,250,250],this.color.main,0.5-0.5*a/la),this.fade.main)
                        layer.ellipse(this.past[8-a*2].x-this.position.x,this.past[8-a*2].y-this.position.y,(2.5-a*0.5)*this.size)  
                    }
                    layer.fill(...this.color.main,this.fade.main)
                    layer.ellipse(0,0,4*this.size)
                }
            break
            case 10:
                if(this.size>0){
                    layer.fill(200,240,250,this.fade.main)
                    layer.ellipse(0,0,5*this.size)
                }
            break
            case 11:
                if(this.size>0){
                    for(let a=0,la=5;a<la;a++){
                        layer.fill(...mergeColor([250,250,250],this.color.main,0.5-0.5*a/la),this.fade.main)
                        layer.ellipse(this.past[9-a].x-this.position.x,this.past[9-a].y-this.position.y,(2.5-a*0.5)*this.size)  
                    }
                    layer.fill(...this.color.main,this.fade.main)
                    layer.ellipse(0,0,4*this.size)
                }
            break
            case 12:
                layer.rotate(this.timer.main)
                layer.fill(160,130,80,this.fade.main)
                layer.ellipse(0,0,this.radius*2)
                layer.fill(75,45,15,this.fade.main)
                for(let a=0,la=this.spots.length;a<la;a++){
                    layer.ellipse(this.spots[a][0],this.spots[a][1],this.spots[a][2])
                }
            break
            case 14:
                layer.image(this.image,0,0)
                if(magVec(this.velocity)>0.01||this.timer.main==1){
                    this.image.noStroke()
                    this.image.clear()
                    this.image.fill(20)
                    this.image.ellipse(0,0,30)
                    this.image.fill(10)
                    this.image.ellipse(0,0,24)
                    this.image.fill(0)
                    this.image.ellipse(0,0,18)
                    this.image.rotate(this.direction)
                    for(let a=0,la=this.spots.length;a<la;a++){
                        let c=HSVtoRGB(this.spots[a][3],1,0.8)
                        this.image.fill(c[0]*255,c[1]*255,c[2]*255)
                        let rad=map(0.5+0.5*lsin(this.spots[a][6]+this.direction),0,1,this.spots[a][4],this.spots[a][5])
                        this.image.ellipse(this.spots[a][0]*rad,this.spots[a][1]*rad,this.spots[a][2])
                    }
                    this.image.rotate(-this.direction)
                    this.image.noFill()
                    this.image.stroke(255,0.4)
                    this.image.strokeWeight(2.5)
                    this.image.arc(0,0,24,24,-75,-15)
                }
            break
            case 16:
                layer.rotate(this.direction)
                switch(this.variant){
                    case 0:
                        layer.fill(220,this.fade.main)
                        layer.ellipse(0,0,24)
                        layer.fill(200,this.fade.main)
                        layer.ellipse(0,0,20)
                    break
                    case 1:
                        layer.fill(220,220,160,this.fade.main)
                        layer.ellipse(0,0,12)
                    break
                    case 2:
                        layer.stroke(180,100,80,this.fade.main)
                        layer.strokeWeight(1)
                        layer.line(-3,-1,0,-4)
                        layer.line(3,-1,0,-4)
                        layer.noStroke()
                        layer.fill(200,0,80,this.fade.main)
                        layer.ellipse(-3.5,1,6)
                        layer.ellipse(3.5,1,6)
                        layer.fill(240,80,120,this.fade.main)
                        layer.ellipse(-3.5,1,4)
                        layer.ellipse(3.5,1,4)
                    break
                    case 3:
                        layer.fill(220,220,160,this.fade.main)
                        layer.ellipse(0,0,16)
                        layer.fill(200,180,120,this.fade.main)
                        layer.ellipse(0,0,13)
                        layer.stroke(220,220,160,this.fade.main)
                        layer.strokeWeight(1.5)
                        layer.line(0,-7.25,0,7.25)
                        layer.line(-7.25,0,7.25,0)
                        layer.line(-3.25,-6,-3.25,6)
                        layer.line(3.25,-6,3.25,6)
                        layer.line(-6,-3.25,6,-3.25)
                        layer.line(-6,3.25,6,3.25)
                    break
                    case 4:
                        layer.fill(220,220,160,this.fade.main)
                        layer.ellipse(0,0,16)
                        layer.fill(200,180,120,this.fade.main)
                        layer.ellipse(0,0,13)
                        layer.stroke(180,100,80,this.fade.main)
                        layer.strokeWeight(1)
                        layer.line(-3,-1,0,-4)
                        layer.line(3,-1,0,-4)
                        layer.noStroke()
                        layer.fill(200,0,80,this.fade.main)
                        layer.ellipse(-3.5,1,6)
                        layer.ellipse(3.5,1,6)
                        layer.fill(240,80,120,this.fade.main)
                        layer.ellipse(-3.5,1,4)
                        layer.ellipse(3.5,1,4)
                        layer.stroke(220,220,160,this.fade.main)
                        layer.strokeWeight(1.5)
                        layer.line(0,-7.25,0,7.25)
                        layer.line(-7.25,0,7.25,0)
                        layer.line(-3.25,-6,-3.25,6)
                        layer.line(3.25,-6,3.25,6)
                        layer.line(-6,-3.25,6,-3.25)
                        layer.line(-6,3.25,6,3.25)
                    break
                    case 5:
                        layer.fill(200,180,120,this.fade.main)
                        layer.ellipse(0,0,16)
                        layer.fill(160,0,60,this.fade.main)
                        layer.ellipse(0,0,13)
                        layer.stroke(200,180,120,this.fade.main)
                        layer.strokeWeight(1.5)
                        layer.line(0,-7.25,0,7.25)
                        layer.line(-7.25,0,7.25,0)
                        layer.line(-3.25,-6,-3.25,6)
                        layer.line(3.25,-6,3.25,6)
                        layer.line(-6,-3.25,6,-3.25)
                        layer.line(-6,3.25,6,3.25)
                    break
                    case 6:
                        layer.fill(30,this.fade.main)
                        layer.ellipse(0,0,16)
                        layer.fill(0,this.fade.main)
                        layer.ellipse(0,0,13)
                        layer.stroke(30,this.fade.main)
                        layer.strokeWeight(1.5)
                        layer.line(0,-7.25,0,7.25)
                        layer.line(-7.25,0,7.25,0)
                        layer.line(-3.25,-6,-3.25,6)
                        layer.line(3.25,-6,3.25,6)
                        layer.line(-6,-3.25,6,-3.25)
                        layer.line(-6,3.25,6,3.25)
                    break
                    case 7:
                        layer.fill(220,this.fade.main)
                        layer.ellipse(0,0,24)
                        layer.fill(200,this.fade.main)
                        layer.ellipse(0,0,20)
                        layer.fill(200,180,120,this.fade.main)
                        layer.ellipse(0,0,16)
                        layer.fill(160,0,60,this.fade.main)
                        layer.ellipse(0,0,13)
                        layer.stroke(200,180,120,this.fade.main)
                        layer.strokeWeight(1.5)
                        layer.line(0,-7.25,0,7.25)
                        layer.line(-7.25,0,7.25,0)
                        layer.line(-3.25,-6,-3.25,6)
                        layer.line(3.25,-6,3.25,6)
                        layer.line(-6,-3.25,6,-3.25)
                        layer.line(-6,3.25,6,3.25)
                    break
                    case 8:
                        layer.fill(220,this.fade.main)
                        layer.ellipse(0,0,24)
                        layer.fill(200,this.fade.main)
                        layer.ellipse(0,0,20)
                        layer.fill(200,180,120,this.fade.main)
                        layer.ellipse(-4,0,5)
                        layer.ellipse(1,-4,3.5)
                        layer.fill(160,0,60,this.fade.main)
                        layer.ellipse(3.5,2,4)
                    break
                }
                layer.rotate(-this.direction)
                if(this.process.main>0&&this.process.goal>0&&!this.held){
                    layer.noStroke()
                    layer.fill(40)
                    layer.rect(0,-16,36,8,3)
                    switch(this.variant){
                        case 5:
                            layer.fill(240,20,20,this.fade.main)
                            layer.rect(-16.5*(1-this.process.main/this.process.goal),-16,33*this.process.main/this.process.goal,5,2)
                        break
                        default:
                            layer.fill(20,240,20,this.fade.main)
                            layer.rect(-16.5*(1-this.process.main/this.process.goal),-16,33*this.process.main/this.process.goal,5,2)
                        break
                    }
                }
            break
        }
        layer.pop()
    }
    update(parent){
        super.update()
        switch(this.type){
            case 0: case 1: case 3: case 5: case 6: case 7: case 8: case 9: case 11: case 15:
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
                if(this.position.x<0){
                    this.position.x=this.base.position.x
                    this.position.y=this.base.position.y
                    this.timer.main=0
                    this.size=0
                    this.direction=random(0,360)
                    this.velocity.x=lsin(this.direction)*this.speed
                    this.velocity.y=lcos(this.direction)*this.speed
                    parent.result.score[1]++
                    parent.result.score[2]++
                }else if(this.position.x>this.layer.width){
                    this.position.x=this.base.position.x
                    this.position.y=this.base.position.y
                    this.timer.main=0
                    this.size=0
                    this.direction=random(0,360)
                    this.velocity.x=lsin(this.direction)*this.speed
                    this.velocity.y=lcos(this.direction)*this.speed
                    parent.result.score[0]++
                    parent.result.score[2]++
                }
                if(parent.entities.players.length==3){
                    if(this.position.y<0){
                        this.position.x=this.base.position.x
                        this.position.y=this.base.position.y
                        this.timer.main=0
                        this.size=0
                        this.direction=random(0,360)
                        this.velocity.x=lsin(this.direction)*this.speed
                        this.velocity.y=lcos(this.direction)*this.speed
                        parent.result.score[0]++
                        parent.result.score[1]++
                    }else if(this.position.y>parent.control.bound.base.y+parent.control.bound.height-this.radius){
                        this.position.y=parent.control.bound.base.y+parent.control.bound.height-this.radius
                        this.velocity.y*=-1
                    }
                    if((
                        intersect(
                            {x:100+this.radius,y:parent.control.bound.base.y},
                            {x:100+this.radius,y:parent.control.bound.base.y+parent.control.bound.height*0.5-15+this.radius},
                            this.position,this.previous.position
                        )||intersect(
                            {x:100+this.radius,y:parent.control.bound.base.y+parent.control.bound.height},
                            {x:100+this.radius,y:parent.control.bound.base.y+parent.control.bound.height*0.5+135-this.radius},
                            this.position,this.previous.position
                        )
                    )&&this.position.x<100+this.radius||(
                        intersect(
                            {x:this.layer.width-100-this.radius,y:parent.control.bound.base.y},
                            {x:this.layer.width-100-this.radius,y:parent.control.bound.base.y+parent.control.bound.height*0.5-15+this.radius},
                            this.position,this.previous.position
                        )||intersect(
                            {x:this.layer.width-100-this.radius,y:parent.control.bound.base.y+parent.control.bound.height},
                            {x:this.layer.width-100-this.radius,y:parent.control.bound.base.y+parent.control.bound.height*0.5+135-this.radius},
                            this.position,this.previous.position
                        )
                    )&&this.position.x>this.layer.width-100-this.radius||
                        intersect(
                            {x:this.layer.width/2-75+this.radius,y:0},
                            {x:this.layer.width/2-75+this.radius,y:parent.control.bound.base.y},
                            this.position,this.previous.position
                        )&&this.position.x<this.layer.width/2-75+this.radius||
                        intersect(
                            {x:this.layer.width/2+75-this.radius,y:0},
                            {x:this.layer.width/2+75-this.radius,y:parent.control.bound.base.y},
                            this.position,this.previous.position
                        )&&this.position.x>this.layer.width/2+75-this.radius){
                        this.velocity.x*=-1
                    }
                    if((
                        intersect(
                            {x:0,y:parent.control.bound.base.y+parent.control.bound.height*0.5-15+this.radius},
                            {x:100+this.radius,y:parent.control.bound.base.y+parent.control.bound.height*0.5-15+this.radius},
                            this.position,this.previous.position
                        )||intersect(
                            {x:this.layer.width,y:parent.control.bound.base.y+parent.control.bound.height*0.5-15+this.radius},
                            {x:this.layer.width-100-this.radius,y:parent.control.bound.base.y+parent.control.bound.height*0.5-15+this.radius},
                            this.position,this.previous.position
                        )
                    )&&this.position.y<parent.control.bound.base.y+parent.control.bound.height*0.5-15+this.radius||(
                        intersect(
                            {x:this.layer.width,y:parent.control.bound.base.y+parent.control.bound.height*0.5+135-this.radius},
                            {x:this.layer.width-100-this.radius,y:parent.control.bound.base.y+parent.control.bound.height*0.5+135-this.radius},
                            this.position,this.previous.position
                        )||intersect(
                            {x:0,y:parent.control.bound.base.y+parent.control.bound.height*0.5+135-this.radius},
                            {x:100+this.radius,y:parent.control.bound.base.y+parent.control.bound.height*0.5+135-this.radius},
                            this.position,this.previous.position
                        )
                    )&&this.position.y>parent.control.bound.base.y+parent.control.bound.height*0.5+135-this.radius||
                        intersect(
                            {x:100,y:100+this.radius},
                            {x:this.layer.width/2-75+this.radius,y:100+this.radius},
                            this.position,this.previous.position
                        )&&this.position.y<100+this.radius||
                        intersect(
                            {x:this.layer.width/2+75-this.radius,y:100+this.radius},
                            {x:this.layer.width-100,y:100+this.radius},
                            this.position,this.previous.position
                        )&&this.position.y<100+this.radius){
                        this.velocity.y*=-1
                    }
                }else{
                    if(this.position.y<parent.control.bound.base.y+this.radius){
                        this.position.y=parent.control.bound.base.y+this.radius
                        this.velocity.y*=-1
                    }else if(this.position.y>parent.control.bound.base.y+parent.control.bound.height-this.radius){
                        this.position.y=parent.control.bound.base.y+parent.control.bound.height-this.radius
                        this.velocity.y*=-1
                    }
                    if((
                        intersect(
                            {x:100+this.radius,y:parent.control.bound.base.y},
                            {x:100+this.radius,y:parent.control.bound.base.y+parent.control.bound.height*0.5-75+this.radius},
                            this.position,this.previous.position
                        )||intersect(
                            {x:100+this.radius,y:parent.control.bound.base.y+parent.control.bound.height},
                            {x:100+this.radius,y:parent.control.bound.base.y+parent.control.bound.height*0.5+75-this.radius},
                            this.position,this.previous.position
                        )
                    )&&this.position.x<100+this.radius||(
                        intersect(
                            {x:this.layer.width-100-this.radius,y:parent.control.bound.base.y},
                            {x:this.layer.width-100-this.radius,y:parent.control.bound.base.y+parent.control.bound.height*0.5-75+this.radius},
                            this.position,this.previous.position
                        )||intersect(
                            {x:this.layer.width-100-this.radius,y:parent.control.bound.base.y+parent.control.bound.height},
                            {x:this.layer.width-100-this.radius,y:parent.control.bound.base.y+parent.control.bound.height*0.5+75-this.radius},
                            this.position,this.previous.position
                        )
                    )&&this.position.x>this.layer.width-100-this.radius){
                        this.velocity.x*=-1
                    }
                    if((
                        intersect(
                            {x:0,y:parent.control.bound.base.y+parent.control.bound.height*0.5-75+this.radius},
                            {x:100+this.radius,y:parent.control.bound.base.y+parent.control.bound.height*0.5-75+this.radius},
                            this.position,this.previous.position
                        )||intersect(
                            {x:this.layer.width,y:parent.control.bound.base.y+parent.control.bound.height*0.5-75+this.radius},
                            {x:this.layer.width-100-this.radius,y:parent.control.bound.base.y+parent.control.bound.height*0.5-75+this.radius},
                            this.position,this.previous.position
                        )
                    )&&this.position.y<parent.control.bound.base.y+parent.control.bound.height*0.5-75+this.radius||(
                        intersect(
                            {x:this.layer.width,y:parent.control.bound.base.y+parent.control.bound.height*0.5+75-this.radius},
                            {x:this.layer.width-100-this.radius,y:parent.control.bound.base.y+parent.control.bound.height*0.5+75-this.radius},
                            this.position,this.previous.position
                        )||intersect(
                            {x:0,y:parent.control.bound.base.y+parent.control.bound.height*0.5+75-this.radius},
                            {x:100+this.radius,y:parent.control.bound.base.y+parent.control.bound.height*0.5+75-this.radius},
                            this.position,this.previous.position
                        )
                    )&&this.position.y>parent.control.bound.base.y+parent.control.bound.height*0.5+75-this.radius){
                        this.velocity.y*=-1
                    }
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
            case 8: case 9: case 11:
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
                if((this.position.x<-50||this.position.x>parent.control.bound.width+50||this.position.y<-50||this.position.y>parent.control.bound.height+50)&&(this.insided||this.time>600)){
                    this.active=false
                }
            break
            case 10:
                this.previous.position.x=this.position.x
                this.previous.position.y=this.position.y
                this.position.x+=this.velocity.x
                this.position.y+=this.velocity.y
                if(!this.active&&this.fade<=0){
                    this.remove=true
                }
                if(!this.active&&this.fade.trigger){
                    if(this.size>0){
                        this.size-=0.1
                    }else{
                        this.remove=true
                    }
                }
                if((this.position.x<-50||this.position.x>parent.control.bound.width+50||this.position.y<-50||this.position.y>parent.control.bound.height+50)&&(this.insided||this.time>600)){
                    this.active=false
                }
                if(dist(this.position.x,this.position.y,this.layer.width/2,this.layer.height/2)>parent.control.bound.projectileRadius+this.radius){
                    this.active=false
                    this.velocity.x*=0.5
                    this.velocity.y*=0.5
                }
            break
            case 12:
                this.position.x+=this.velocity.x
                this.position.y+=this.velocity.y
                if(this.fade<=0){
                    this.remove=true
                }
                if(this.position.x>-50&&this.position.x<parent.control.bound.width+50&&this.position.y>-50&&this.position.y<parent.control.bound.height+50&&!this.insided){
                    this.insided=true
                }
                if(this.insided){
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
                }
            break
            case 13:
                this.direction+=0.5
                let r=dist(this.position.x,this.position.y,this.layer.width/2,this.layer.height/2)
                this.position.x=this.layer.width/2+lsin(this.direction)*r
                this.position.y=this.layer.height/2+lcos(this.direction)*r
                if(!this.active){
                    if(this.size>0){
                        this.size-=0.1
                    }else{
                        this.remove=true
                    }
                }
            break
            case 14:
                this.position.x+=this.velocity.x
                this.position.y+=this.velocity.y
                this.velocity.x*=0.99
                this.velocity.y*=0.99
                this.direction+=magVec(this.velocity)*4
                if(magVec(this.velocity)<=0.1){
                    this.velocity.x=0
                    this.velocity.y=0
                }
            break
            case 15:
                this.position.x+=this.velocity.x
                this.position.y+=this.velocity.y
                if(this.timer.accel>0){
                    this.timer.accel--
                    this.velocity.x*=1.03
                    this.velocity.y*=1.03
                }
                if((this.position.x<-50||this.position.x>parent.control.bound.width+50||this.position.y<-50||this.position.y>parent.control.bound.height+50)&&(this.insided||this.time>600)){
                    this.remove=true
                }
            break
            case 16:
                if(this.process.goal>0&&this.process.main>=this.process.goal){
                    switch(this.variant){
                        case 1:
                            this.setupValues({variant:3})
                        break
                        case 4:
                            this.setupValues({variant:5})
                        break
                        case 5:
                            this.setupValues({variant:6})
                        break
                        case 8:
                            this.setupValues({variant:0})
                        break
                    }
                }
            break
        
        }
    }
    collide(type,obj,parent){
        switch(this.type){
            case 0: case 1: case 2: case 3: case 6: case 7: case 15:
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
                            let bar=this.radius+obj.radius-distPos(this,obj)
                            let dir=dirPos(this,obj)
                            let magnitude=magVec(this.velocity)
                            this.velocity.x=-magnitude*lsin(dir)
                            this.velocity.y=-magnitude*lcos(dir)
                            this.position.x-=lsin(dir)*bar
                            this.position.y-=lcos(dir)*bar
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
            case 8: case 9: case 11:
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
                    case 2:
                        if(inCircleBox(this,obj)&&this.size>0&&(obj.id!=this.id||this.timer.main>60)){
                            let dir=dirPos(this,obj)
                            let magnitude=[magVec(this.velocity),magVec(obj.velocity)]
                            obj.velocity.x+=magnitude[0]*lsin(dir)
                            obj.velocity.y+=magnitude[0]*lcos(dir)
                            this.velocity.x=-magnitude[0]*lsin(dir)
                            this.velocity.y=-magnitude[0]*lcos(dir)
                            this.active=false
                        }
                    break
                }
            break
            case 10:
                switch(type){
                    case 0:
                        if(distPos(this,obj)<this.radius+obj.radius&&this.active&&obj.active&&(obj.id!=this.id||this.timer.main>60)){
                            let dir=dirPos(this,obj)
                            let magnitude=[magVec(this.velocity)*0.4,magVec(this.velocity)*0.6]
                            obj.velocity.x=magnitude[0]*lsin(dir)*this.size/(1-this.size*0.1)
                            obj.velocity.y=magnitude[0]*lcos(dir)*this.size/(1-this.size*0.1)
                            this.velocity.x=-magnitude[1]*lsin(dir)
                            this.velocity.y=-magnitude[1]*lcos(dir)
                            this.active=false
                            this.fade.trigger=false
                            if(obj.ball>0){
                                obj.runAnim(1,0.5)
                                obj.timer.attack=30
                                obj.ball=0
                            }
                        }
                    break
                    case 1:
                        if(distPos(this,obj)<this.radius+obj.radius&&this.active&&obj.activesss){
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
            case 12:
                switch(type){
                    case 0:
                        if(distPos(this,obj)<this.radius+obj.radius&&this.active&&obj.active){
                            obj.timer.stuffed+=360
                            this.active=false
                            this.fade.trigger=false
                        }
                    break
                    case 1:
                        if(distPos(this,obj)<this.radius+obj.radius&&this.active&&obj.active){
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
            case 13:
                switch(type){
                    case 0:
                        if(distPos(this,obj)<this.radius+obj.radius&&this.active){
                            parent.result.score[obj.id]+=this.value
                            parent.control.total-=this.value
                            this.active=false
                        }
                    break
                }
            break
            case 14:
                switch(type){
                    case 0:
                        if(distPos(this,obj)<this.radius+obj.radius){
                            let dir=dirPos(this,obj)
                            let magnitude=[magVec(this.velocity)*0.6,magVec(obj.velocity)*0.6]
                            obj.velocity.x=magnitude[0]*lsin(dir)
                            obj.velocity.y=magnitude[0]*lcos(dir)
                            this.velocity.x=-magnitude[1]*lsin(dir)
                            this.velocity.y=-magnitude[1]*lcos(dir)
                        }
                    break
                    case 1:
                        if(distPos(this,obj)<this.radius+obj.radius){
                            let dir=dirPos(this,obj)
                            let magnitude=[magVec(this.velocity)*0.6+magVec(obj.velocity)*0.2,magVec(obj.velocity)*0.6+magVec(this.velocity)*0.2]
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