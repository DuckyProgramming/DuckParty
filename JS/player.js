class player extends partisan{
    constructor(layer,x,y,type,distinct,id,color){
        super(layer,x,y,{main:1,trigger:true,speed:5})
        this.type=type
        this.distinct=distinct
        this.id=id
        this.color=color
        this.size=1
        this.active=true
        this.setupGraphics()
        this.setupValues()
    }
    setupValues(){
        switch(this.type){
            case 0:
                this.width=8
                this.height=24
                this.timer.invincible=0
                this.infoAnim={life:[1,1,1],dizzy:0}
                this.jump={time:0,active:0,mult:1}
                this.controlDirection={x:0,y:0}
                this.collided={wall:[0,0,0,0]}
                this.offset.position.y+=12
                this.dead={trigger:false}
                switch(this.distinct){
                    case 1:
                        this.life=3
                    break
                    case 2:
                        this.timer.attack=0
                        this.life=3
                    break
                    case 3:
                        this.timer.bomb=0
                        this.timer.bombTick=0
                        this.timer.explode=0
                    break
                }
            break
            case 1:
                this.radius=12.5
                this.timer.invincible=0
                this.timer.still=0
                this.timer.dizzy=0
                this.timer.dizzySafe=0
                this.timer.attack=0
                this.infoAnim={life:[1,1,1],dizzy:0}
                this.hijack={timer:0,direction:0,flip:0,reverse:false}
                this.controlDirection={x:0,y:0}
                switch(this.distinct){
                    case 0: case 7: case 8:
                        this.life=3
                    break
                }
                switch(this.distinct){
                    case 3: case 16:
                        this.speed=0.9
                    break
                    case 5:
                        this.choice=0
                        this.reveal=false
                        this.animSet.choice=0
                        this.animSet.reveal=0
                    break
                    case 6:
                        this.choice=-1
                        this.reveal=false
                        this.animSet.choice=0
                        this.animSet.reveal=0
                        this.rotations=0
                    break
                    case 9:
                        this.choice=0
                        this.visible=false
                        this.animSet.choice=0
                        this.animSet.visible=0
                    break
                    case 10:
                        this.reveal=false
                        this.timer.reveal=240
                        this.speed=0.4
                        if(this.id==-1){
                            this.moving=[0,0]
                        }
                    break
                    case 13:
                        this.speed=0.9
                        this.dead={trigger:false}
                    break
                    case 14:
                        this.speed=0.15
                        this.base.speed=0.15
                        this.ball=0
                    break
                    case 15:
                        this.speed=random(0.6,0.75)
                    break
                    case 17:
                        this.speed=0.75
                        this.base.radius=this.radius
                        this.timer.stuffed=0
                    break
                    case 18:
                        this.run=false
                        this.timer.reset=0
                        this.speed=0.6
                    break
                    case 20:
                        this.projectile=-1
                        this.speed=0.6
                        this.interact=0
                        this.animSet.hold=0
                    break
                    default:
                        this.speed=1.2
                    break
                }
            break
            case 2:
                this.radius=1
                this.select={trigger:false}
                this.infoAnim={select:0}
            break
            case 3:
                this.radius=12.5
                this.infoAnim={life:[1,1,1]}
                this.active=true
                switch(this.distinct){
                    case 0:
                        this.speed=1.2
                    break
                    case 1:
                        this.speed=0.8
                        this.timer.attack=0
                        this.timer.invincible=0
                        this.life=3
                    break
                    case 2:
                        this.speed=1.2
                        this.timer.attack=0
                        this.timer.invincible=0
                        this.life=3
                        this.firing={tick:0}
                    break
                }
            break
        }
    }
    scale(value){
        switch(this.type){
            case 0:
                this.size*=value
                this.width*=value
                this.height*=value
                this.offset.position.x*=value
                this.offset.position.y*=value
            break
            case 1:
                this.size*=value
                this.radius*=value
            break
        }
    }
    copyColor(color){
        return {eye:{back:color.eye.back},beak:{main:color.beak.main,mouth:color.beak.mouth,nostril:color.beak.nostril},skin:{head:color.skin.head,body:color.skin.body,legs:color.skin.legs,arms:color.skin.arms}}
    }
    setupGraphics(){
        switch(this.type){
            case 0:
                this.direction={main:-54,goal:-54}
            break
            case 1: case 3:
                this.direction={main:0,goal:0}
                switch(this.distinct){
                    case 10: case 12:
                        this.sideColor=types.color.duck[0]
                    break
                }
            break
        }
        this.skin={
            body:{fade:1,display:true,level:-9.5},
            head:{fade:1,display:true,level:-19},
            legs:[
                {fade:1,display:true,anim:{theta:24,phi:90},length:5,points:{set:{x:1.5,y:-7.5,z:0},start:{x:0,y:0,z:0},end:{x:0,y:0,z:0}}},
                {fade:1,display:true,anim:{theta:24,phi:-90},length:5,points:{set:{x:1.5,y:-7.5,z:0},start:{x:0,y:0,z:0},end:{x:0,y:0,z:0}}}
            ],arms:[
                {fade:1,display:true,anim:{theta:54,phi:90},length:this.type==0?5:12,points:{set:{x:1.5,y:-12.5,z:0},start:{x:0,y:0,z:0},end:{x:0,y:0,z:0}}},
                {fade:1,display:true,anim:{theta:54,phi:-90},length:this.type==0?5:12,points:{set:{x:1.5,y:-12.5,z:0},start:{x:0,y:0,z:0},end:{x:0,y:0,z:0}}}
            ]
        }
        this.face={
            beak:{
                main:{fade:1,display:true,level:-16.5},
                mouth:{fade:1,display:true,level:-16.5},
                nostril:{fade:1,display:true,level:-17.25}
            },eye:[
                {fade:1,display:true,anim:0,spin:-18,level:-20},
                {fade:1,display:true,anim:0,spin:18,level:-20}
            ]
        }
        switch(this.color){
            case -1:
                this.color=this.copyColor(types.color.duck[0])
            break
            default:
                this.color=types.player[this.color].color
            break
        }
        this.base.color={eye:{back:this.color.eye.back},beak:{main:this.color.beak.main,mouth:this.color.beak.mouth,nostril:this.color.beak.nostril},skin:{head:this.color.skin.head,body:this.color.skin.body,legs:this.color.skin.legs,arms:this.color.skin.arms}}
        this.animSet={loop:0,attack:0,flip:0}
    }
    calculateParts(){
        for(let a=0,la=2;a<la;a++){
            for(let b=0,lb=2;b<lb;b++){
                let subject=this.skin[['legs','arms'][b]][a]
                subject.points.start.x=subject.points.set.x*lsin(subject.anim.phi+this.direction.main)-subject.points.set.z*lcos(subject.anim.phi+this.direction.main)
                subject.points.start.y=subject.points.set.y
                subject.points.start.z=subject.points.set.x*lcos(subject.anim.phi+this.direction.main)+subject.points.set.z*lsin(subject.anim.phi+this.direction.main)
                subject.points.end.x=subject.points.start.x+lsin(subject.anim.theta)*lsin(subject.anim.phi+this.direction.main)*subject.length
                subject.points.end.y=subject.points.start.y+lcos(subject.anim.theta)*subject.length
                subject.points.end.z=subject.points.start.z+lsin(subject.anim.theta)*lcos(subject.anim.phi+this.direction.main)*subject.length
            }
        }
    }
    runAnim(type,rate){
        switch(type){
            case 0:
                this.animSet.loop+=rate
            break
            case 1:
                this.animSet.attack+=rate
            break
        }
    }
    mainAnim(){
        switch(this.type){
            case 1:
                switch(this.distinct){
                    case 20:
                        for(let a=0,la=2;a<la;a++){
                            this.skin.legs[a].anim.phi=90*(1-a*2)+lsin((this.animSet.loop+this.animSet.flip*15)*12)*75
                            this.skin.arms[a].anim.phi=90*(1-a*2)*(1-this.animSet.hold*0.6)+lsin((this.animSet.loop+this.animSet.flip*15)*12)*60*(1-this.animSet.hold)+(a==1?abs(lsin(this.animSet.attack*12))*60:0)
                        }
                    break
                    default:
                        for(let a=0,la=2;a<la;a++){
                            this.skin.legs[a].anim.phi=90*(1-a*2)+lsin((this.animSet.loop+this.animSet.flip*15)*12)*75
                            this.skin.arms[a].anim.phi=90*(1-a*2)+lsin((this.animSet.loop+this.animSet.flip*15)*12)*60+(a==1?abs(lsin(this.animSet.attack*12))*60:0)+(this.type==1&&this.distinct==14&&a==0?-abs(lsin(this.animSet.attack*12))*60:0)
                        }
                    break
                }
            break
            default:
                for(let a=0,la=2;a<la;a++){
                    this.skin.legs[a].anim.phi=90*(1-a*2)+lsin((this.animSet.loop+this.animSet.flip*15)*12)*75
                    this.skin.arms[a].anim.phi=90*(1-a*2)+lsin((this.animSet.loop+this.animSet.flip*15)*12)*60+(a==1?abs(lsin(this.animSet.attack*12))*60:0)+(this.type==1&&this.distinct==14&&a==0?-abs(lsin(this.animSet.attack*12))*60:0)
                }
            break
        }
    }
    setColor(){
        switch(this.color){
            case 0:
                this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[255,235,25],body:[255,225,15],legs:[255,210,0],arms:[255,215,5]}}
            break
            case 1:
                this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[25,85,255],body:[15,75,255],legs:[0,60,255],arms:[5,65,255]}}
            break
            case 2:
                this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[235,25,255],body:[225,15,255],legs:[210,0,255],arms:[215,5,255]}}
            break
            case 3:
                this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[55,235,25],body:[55,225,15],legs:[55,210,0],arms:[55,215,5]}}
            break
            case 4:
                this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[235,105,25],body:[225,105,15],legs:[210,105,0],arms:[215,105,5]}}
            break
            case 5:
                this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[25,245,255],body:[15,235,255],legs:[0,220,255],arms:[5,225,255]}}
            break
            case 6:
                this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[135,25,255],body:[125,15,255],legs:[110,0,255],arms:[215,5,255]}}
            break
        }
    }
    display(layer=this.layer){
        if(dev.bound){
            layer.stroke(255,0,0,this.fade.main)
            layer.strokeWeight(3)
            switch(this.type){
                case 0:
                    layer.rect(this.position.x,this.position.y,this.width,this.height)
                break
                case 1:
                    layer.ellipse(this.position.x,this.position.y,this.radius*2)
                break
            }
        }
        layer.push()
        layer.translate(this.position.x+this.offset.position.x,this.position.y+this.offset.position.y)
        layer.scale(this.size)
        layer.noStroke()
        switch(this.type){
            case 0:
                switch(this.distinct){
                    case 3:
                        if(this.timer.explode>0){
                            layer.fill(240,240,40,this.timer.explode/15)
                            layer.ellipse(0,-10,150-this.timer.explode/15*150)
                            layer.fill(240,160,40,this.timer.explode/15)
                            layer.ellipse(0,-10,100-this.timer.explode/15*100)
                            layer.fill(240,80,40,this.timer.explode/15)
                            layer.ellipse(0,-10,50-this.timer.explode/15*50)
                        }else if(this.timer.bomb>0){
                            layer.fill(175+lcos(this.timer.bomb*10)*75,60-lcos(this.timer.bomb*10)*40,60-lcos(this.timer.bomb*10)*40)
                            layer.ellipse(0,-10,14)
                            layer.fill(255,0,0,this.fade.main)
                            layer.textSize(12)
                            layer.text(ceil(this.timer.bomb/60),0,-40)
                        }
                    break
                }
                this.calculateParts()
                for(let a=0,la=2;a<la;a++){
                    if(this.skin.arms[a].display&&lcos(this.direction.main+this.skin.arms[a].anim.phi)<=0){
                        layer.fill(this.color.skin.arms[0]+lcos(this.skin.arms[a].anim.phi+this.direction.main)*20,this.color.skin.arms[1]+lcos(this.skin.arms[a].anim.phi+this.direction.main)*20,this.color.skin.arms[2]+lcos(this.skin.arms[a].anim.phi+this.direction.main)*20,this.fade.main*this.skin.arms[a].fade)
                        layer.noStroke()
                        layer.ellipse(this.skin.arms[a].points.end.x,this.skin.arms[a].points.end.y,6)
                    }
                }
                for(let a=0,la=2;a<la;a++){
                    if(this.skin.legs[a].display&&lcos(this.direction.main+this.skin.legs[a].anim.theta)<=0){
                        layer.fill(this.color.skin.legs[0]+lcos(this.skin.legs[a].anim.theta+this.direction.main)*20,this.color.skin.legs[1]+lcos(this.skin.legs[a].anim.theta+this.direction.main)*20,this.color.skin.legs[2]+lcos(this.skin.legs[a].anim.theta+this.direction.main)*20,this.fade.main*this.skin.legs[a].fade)
                        layer.noStroke()
                        layer.ellipse(this.skin.legs[a].points.end.x,this.skin.legs[a].points.end.y,6)
                    }
                }
                if(this.skin.body.display){
                    layer.fill(this.color.skin.body[0],this.color.skin.body[1],this.color.skin.body[2],this.fade.main*this.skin.body.fade)
                    layer.noStroke()
                    layer.ellipse(0,this.skin.body.level,7,12)
                }
                for(let a=0,la=2;a<la;a++){
                    if(this.skin.legs[a].display&&lcos(this.direction.main+this.skin.legs[a].anim.theta)>0){
                        layer.fill(this.color.skin.legs[0]+lcos(this.skin.legs[a].anim.theta+this.direction.main)*20,this.color.skin.legs[1]+lcos(this.skin.legs[a].anim.theta+this.direction.main)*20,this.color.skin.legs[2]+lcos(this.skin.legs[a].anim.theta+this.direction.main)*20,this.fade.main*this.skin.legs[a].fade)
                        layer.noStroke()
                        layer.ellipse(this.skin.legs[a].points.end.x,this.skin.legs[a].points.end.y,6)
                    }
                }
                if(this.face.beak.main.display){
                    layer.fill(this.color.beak.main[0],this.color.beak.main[1],this.color.beak.main[2],this.fade.main*this.face.beak.main.fade)
                    layer.noStroke()
                    layer.ellipse(lsin(this.direction.main)*6,this.face.beak.main.level,6+lcos(this.direction.main),4)
                }
                if(this.face.beak.mouth.display){
                    layer.noFill()
                    layer.stroke(this.color.beak.mouth[0],this.color.beak.mouth[1],this.color.beak.mouth[2],this.fade.main*this.face.beak.mouth.fade)
                    layer.strokeWeight(0.5)
                    layer.arc(lsin(this.direction.main)*6,this.face.beak.mouth.level,6+lcos(this.direction.main),0.5,0,180)
                }
                if(this.face.beak.nostril.display){
                    layer.noFill()
                    layer.stroke(this.color.beak.nostril[0],this.color.beak.nostril[1],this.color.beak.nostril[2],this.fade.main*this.face.beak.nostril.fade)
                    layer.strokeWeight(0.5)
                    for(let a=0,la=2;a<la;a++){
                        layer.line(lsin(this.direction.main-6+a*12)*8,this.face.beak.nostril.level,lsin(this.direction.main-6+a*12)*8,this.face.beak.nostril.level+0.25)
                    }
                }
                if(this.skin.head.display){
                    layer.fill(...this.color.skin.head,this.fade.main*this.skin.head.fade)
                    layer.noStroke()
                    layer.ellipse(0,this.skin.head.level,12.5)
                }
                for(let a=0,la=2;a<la;a++){
                    if(this.skin.arms[a].display&&lcos(this.direction.main+this.skin.arms[a].anim.phi)>0){
                        layer.fill(this.color.skin.arms[0]+lcos(this.skin.arms[a].anim.phi+this.direction.main)*20,this.color.skin.arms[1]+lcos(this.skin.arms[a].anim.phi+this.direction.main)*20,this.color.skin.arms[2]+lcos(this.skin.arms[a].anim.phi+this.direction.main)*20,this.fade.main*this.skin.arms[a].fade)
                        layer.noStroke()
                        layer.ellipse(this.skin.arms[a].points.end.x,this.skin.arms[a].points.end.y,6)
                    }
                    if(this.face.eye[a].display){
                        layer.stroke(this.color.eye.back[0],this.color.eye.back[1],this.color.eye.back[2],this.fade.main*this.face.eye[a].fade)
                        layer.strokeWeight((1.25-this.face.eye[a].anim*0.75)*constrain(lcos(this.face.eye[a].spin+this.direction.main)*5,0,1))
                        if(this.face.eye[a].anim==0){
                            layer.point(lsin(this.face.eye[a].spin+this.direction.main)*6-(a*2-1)*lcos(this.face.eye[a].spin+this.direction.main)*this.face.eye[a].anim,this.face.eye[a].level)
                        }else{
                            layer.line(lsin(this.face.eye[a].spin+this.direction.main)*6-(a*2-1)*lcos(this.face.eye[a].spin+this.direction.main)*this.face.eye[a].anim,this.face.eye[a].level,lsin(this.face.eye[a].spin+this.direction.main)*6+(a*2-1)*lcos(this.face.eye[a].spin+this.direction.main)*this.face.eye[a].anim,this.face.eye[a].level-this.face.eye[a].anim)
                            layer.line(lsin(this.face.eye[a].spin+this.direction.main)*6-(a*2-1)*lcos(this.face.eye[a].spin+this.direction.main)*this.face.eye[a].anim,this.face.eye[a].level,lsin(this.face.eye[a].spin+this.direction.main)*6+(a*2-1)*lcos(this.face.eye[a].spin+this.direction.main)*this.face.eye[a].anim,this.face.eye[a].level+this.face.eye[a].anim)
                        }
                    }
                }
                if(this.face.beak.main.display&&lcos(this.direction.main)>0){
                    layer.fill(this.color.beak.main[0],this.color.beak.main[1],this.color.beak.main[2],this.fade.main*this.face.beak.main.fade)
                    layer.noStroke()
                    layer.ellipse(lsin(this.direction.main)*6,this.face.beak.main.level,6+lcos(this.direction.main),4)
                }
                if(this.face.beak.mouth.display&&lcos(this.direction.main)>0){
                    layer.noFill()
                    layer.stroke(this.color.beak.mouth[0],this.color.beak.mouth[1],this.color.beak.mouth[2],this.fade.main*this.face.beak.mouth.fade)
                    layer.strokeWeight(0.5)
                    layer.arc(lsin(this.direction.main)*6,this.face.beak.mouth.level,6+lcos(this.direction.main),-0.5,0,180)
                }
                if(this.face.beak.nostril.display&&lcos(this.direction.main)>0){
                    layer.noFill()
                    layer.stroke(this.color.beak.nostril[0],this.color.beak.nostril[1],this.color.beak.nostril[2],this.fade.main*this.face.beak.nostril.fade)
                    layer.strokeWeight(0.5)
                    for(let a=0,la=2;a<la;a++){
                        layer.line(lsin(this.direction.main-6+a*12)*8,this.face.beak.nostril.level,lsin(this.direction.main-6+a*12)*8,this.face.beak.nostril.level+0.25)
                    }
                }
                if(this.infoAnim.dizzy>0){
                    layer.fill(255,this.fade.main*this.infoAnim.dizzy)
                    layer.noStroke()
                    for(let a=0,la=3;a<la;a++){
                        layer.ellipse(9*lsin(this.timer.main*3+a*120),this.skin.head.level-9+2.25*lcos(this.timer.main*3+a*120),1.5)
                    }
                }
            break
            case 1: case 3:
                this.calculateParts()
                layer.noStroke()
                switch(this.type){
                    case 1:
                        switch(this.distinct){
                            case 0: case 7:
                                for(let a=0,la=this.infoAnim.life.length;a<la;a++){
                                    if(this.infoAnim.life[a]>0){
                                        layer.fill(250,225,225,this.fade.main*this.infoAnim.life[a])
                                        layer.ellipse(4-la*4+a*8,-22,5)
                                    }
                                }
                            break
                            case 5:
                                layer.rotate(-this.direction.main)
                                layer.fill(240,this.fade.main)
                                layer.triangle(0,-20,-8,-44,8,-44)
                                layer.ellipse(0,-65,50)
                                layer.rotate(this.direction.main)
                                layer.textSize(25)
                                layer.fill(0,(1-this.animSet.reveal)*this.animSet.choice)
                                layer.text('✓',lsin(this.direction.main)*-65,lcos(this.direction.main)*-65)
                                layer.fill(0,(1-this.animSet.reveal)*(1-this.animSet.choice))
                                layer.text('?',lsin(this.direction.main)*-65,lcos(this.direction.main)*-65)
                                layer.fill(0,this.animSet.reveal)
                                layer.text(this.choice>=3?this.choice-2:this.choice,lsin(this.direction.main)*-65,lcos(this.direction.main)*-65)
                            break
                            case 6:
                                layer.rotate(-this.direction.main)
                                layer.fill(240,this.fade.main*(1-this.animSet.reveal))
                                layer.triangle(0,-20,-8,-44,8,-44)
                                layer.ellipse(0,-65,50)
                                layer.fill(240,(1-this.animSet.choice)*(1-this.animSet.reveal))
                                switch(this.rotations){
                                    case 2:
                                        layer.rotate(135)
                                        for(let a=0,la=3;a<la;a++){
                                            layer.ellipse(0,-40,25)
                                            layer.triangle(-5,-50,5,-50,0,-64)
                                            layer.rotate(45)
                                        }
                                        layer.rotate(90)
                                    break
                                    case 3:
                                        layer.rotate(120)
                                        for(let a=0,la=3;a<la;a++){
                                            layer.ellipse(0,-40,25)
                                            layer.triangle(-5,-50,5,-50,0,-64)
                                            layer.rotate(60)
                                        }
                                        layer.rotate(60)
                                    break
                                    case 4:
                                        layer.rotate(90)
                                        for(let a=0,la=3;a<la;a++){
                                            layer.ellipse(0,-40,25)
                                            layer.triangle(-5,-50,5,-50,0,-64)
                                            layer.rotate(90)
                                        }
                                    break
                                }
                                layer.rotate(this.direction.main)
                                layer.textSize(25)
                                layer.fill(0,this.animSet.choice*(1-this.animSet.reveal))
                                layer.text('✓',lsin(this.direction.main)*-65,lcos(this.direction.main)*-65)
                                layer.fill(0,(1-this.animSet.choice)*(1-this.animSet.reveal))
                                layer.text('?',lsin(this.direction.main)*-65,lcos(this.direction.main)*-65)
                                switch(this.rotations){
                                    case 2:
                                        displaySymbol(layer,lsin(this.direction.main)*40,lcos(this.direction.main)*40,0,-this.direction.main+90,1,[0,0,0],(1-this.animSet.choice)*(1-this.animSet.reveal))
                                        displaySymbol(layer,lsin(this.direction.main-45)*40,lcos(this.direction.main-45)*40,0,-this.direction.main+180,1,[0,0,0],(1-this.animSet.choice)*(1-this.animSet.reveal))
                                        displaySymbol(layer,lsin(this.direction.main+45)*40,lcos(this.direction.main+45)*40,0,-this.direction.main,1,[0,0,0],(1-this.animSet.choice)*(1-this.animSet.reveal))
                                    break
                                    case 3:
                                        displaySymbol(layer,lsin(this.direction.main)*40,lcos(this.direction.main)*40,0,-round(this.direction.main/90)*90+90,1,[0,0,0],(1-this.animSet.choice)*(1-this.animSet.reveal))
                                        displaySymbol(layer,lsin(this.direction.main-60)*40,lcos(this.direction.main-60)*40,0,-round(this.direction.main/90)*90+180,1,[0,0,0],(1-this.animSet.choice)*(1-this.animSet.reveal))
                                        displaySymbol(layer,lsin(this.direction.main+60)*40,lcos(this.direction.main+60)*40,0,-round(this.direction.main/90)*90,1,[0,0,0],(1-this.animSet.choice)*(1-this.animSet.reveal))
                                    break
                                    case 4:
                                        displaySymbol(layer,lsin(this.direction.main)*40,lcos(this.direction.main)*40,0,-this.direction.main+90,1,[0,0,0],(1-this.animSet.choice)*(1-this.animSet.reveal))
                                        displaySymbol(layer,lsin(this.direction.main-90)*40,lcos(this.direction.main-90)*40,0,-this.direction.main+180,1,[0,0,0],(1-this.animSet.choice)*(1-this.animSet.reveal))
                                        displaySymbol(layer,lsin(this.direction.main+90)*40,lcos(this.direction.main+90)*40,0,-this.direction.main,1,[0,0,0],(1-this.animSet.choice)*(1-this.animSet.reveal))
                                    break
                                }
                            break
                            case 9:
                                layer.rotate(-this.direction.main+120)
                                layer.fill(240,this.fade.main*(this.animSet.visible))
                                layer.triangle(0,-20,-8,-44,8,-44)
                                layer.ellipse(0,-65,50)
                                layer.rotate(this.direction.main-120)
                                layer.textSize(25)
                                layer.fill(0,(1-this.animSet.choice)*(this.animSet.visible))
                                layer.text('?',lsin(this.direction.main-120)*-65,lcos(this.direction.main-120)*-65)
                                layer.fill(0,this.animSet.choice*(this.animSet.visible))
                                layer.text(this.choice>=3?this.choice-2:this.choice,lsin(this.direction.main-120)*-65,lcos(this.direction.main-120)*-65)
                            break
                            case 11:
                                if(this.timer.attack>15){
                                    layer.noFill()
                                    layer.stroke(0,(this.timer.attack-15)/15*this.fade.main)
                                    layer.strokeWeight(0.8*(30-this.timer.attack))
                                    layer.ellipse(0,0,8*(30-this.timer.attack))
                                }
                            break
                            case 14:
                                if(this.ball>0){
                                    layer.rotate(-this.direction.main)
                                    layer.fill(200,240,250)
                                    layer.ellipse(0,14+2.5*this.ball,5*this.ball)
                                    layer.rotate(this.direction.main)
                                }
                            break
                            case 20:
                                if(this.projectile!=-1){
                                    layer.push()
                                    layer.rotate(-this.direction.main)
                                    layer.translate(0,20)
                                    this.projectile.held=true
                                    this.projectile.display()
                                    layer.pop()
                                }
                            break
                        }
                    break
                    case 3:
                        switch(this.distinct){
                            case 0:
                                layer.rotate(-this.direction.main)
                                layer.fill(180,this.fade.main)
                                layer.triangle(-6,12,6,12,0,27)
                                layer.fill(100,this.fade.main)
                                layer.arc(0,0,36,36,0,180)
                                layer.arc(0,0,36,12,-180,0)
                                layer.rotate(this.direction.main)
                            break
                            case 1:
                                layer.rotate(-this.direction.main)
                                layer.fill(120,this.fade.main)
                                layer.rect(0,18,8,6)
                                layer.fill(100,this.fade.main)
                                layer.arc(0,0,24,33,0,180)
                                layer.arc(0,0,24,12,-180,0)
                                layer.rotate(this.direction.main)
                            break
                            case 2:
                                layer.rotate(-this.direction.main)
                                layer.fill(120,this.fade.main)
                                layer.rect(-4,16,4,6)
                                layer.rect(4,16,4,6)
                                layer.rotate(this.direction.main)
                            break
                        }
                    break
                    
                }
                for(let a=0,la=2;a<la;a++){
                    if(this.skin.legs[a].display){
                        layer.fill(...this.color.skin.legs,this.fade.main*this.skin.legs[a].fade)
                        layer.noStroke()
                        layer.ellipse(this.skin.legs[a].points.end.x,this.skin.legs[a].points.end.z,12,12)
                    }
                }
                for(let a=0,la=2;a<la;a++){
                    if(this.skin.arms[a].display){
                        layer.fill(...this.color.skin.arms,this.fade.main*this.skin.arms[a].fade)
                        layer.noStroke()
                        layer.ellipse(this.skin.arms[a].points.end.x,this.skin.arms[a].points.end.z,12,12)
                    }
                }
                layer.rotate(-this.direction.main)
                if(this.face.beak.main.display){
                    layer.fill(this.color.beak.main[0],this.color.beak.main[1],this.color.beak.main[2],this.fade.main*this.face.beak.main.fade)
                    layer.noStroke()
                    layer.ellipse(0,11,14,8)
                }
                if(this.face.beak.nostril.display){
                    layer.noFill()
                    layer.stroke(this.color.beak.nostril[0],this.color.beak.nostril[1],this.color.beak.nostril[2],this.fade.main*this.face.beak.nostril.fade)
                    layer.strokeWeight(0.5)
                    for(let a=0,la=2;a<la;a++){
                        layer.line(-2+a*4,13,-2+a*4,14)
                    }
                }
                if(this.skin.head.display){
                    layer.fill(...this.color.skin.head,this.fade.main*this.skin.head.fade)
                    layer.noStroke()
                    layer.ellipse(0,0,25)
                }
                for(let a=0,la=2;a<la;a++){
                    if(this.face.eye[a].display){
                        layer.stroke(this.color.eye.back[0],this.color.eye.back[1],this.color.eye.back[2],this.fade.main*this.face.eye[a].fade)
                        layer.strokeWeight(2.5-this.face.eye[a].anim*1.5)
                        if(this.face.eye[a].anim==0){
                            layer.point(-4+a*8,7)
                        }else{
                            layer.line(-4+a*8+this.face.eye[a].anim*2,7,-4+a*8-this.face.eye[a].anim*2,7-this.face.eye[a].anim*2)
                            layer.line(-4+a*8+this.face.eye[a].anim*2,7,-4+a*8-this.face.eye[a].anim*2,7+this.face.eye[a].anim*2)
                        }
                        switch(this.type){
                            case 1:
                                switch(this.distinct){
                                    case 2:
                                        layer.strokeWeight(1)
                                        layer.arc(-4+a*8,7,5,5,-165+a*90,-105+a*90)
                                    break
                                }
                            break
                        }
                    }
                }
                if(this.infoAnim.dizzy>0){
                    layer.fill(255,this.fade.main*this.infoAnim.dizzy)
                    layer.noStroke()
                    for(let a=0,la=3;a<la;a++){
                        layer.ellipse(12*lsin(this.timer.main*3+a/la*360),-12+4*lcos(this.timer.main*3+a/la*360),3)
                    }
                }
            break
            case 2:
                if(this.skin.head.display){
                    layer.stroke(this.infoAnim.select*255,this.fade.main*this.skin.head.fade)
                    layer.strokeWeight(3)
                    layer.ellipse(-9,9,12)
                    layer.triangle(-9,5,-5,9,0,0)
                    layer.fill(...this.color.skin.head,this.fade.main*this.skin.head.fade)
                    layer.noStroke()
                    layer.ellipse(-9,9,12)
                    layer.triangle(-9,5,-5,9,0,0)
                }
            break
        }
        layer.pop()
    }
    displayOver(layer=this.layer){
        if(dev.bound){
            layer.stroke(255,0,0,this.fade.main)
            layer.strokeWeight(3)
            switch(this.type){
                case 0:
                    layer.rect(this.position.x,this.position.y,this.width,this.height)
                break
                case 1:
                    layer.ellipse(this.position.x,this.position.y,this.radius*2)
                break
            }
        }
        layer.push()
        layer.translate(this.position.x+this.offset.position.x,this.position.y+this.offset.position.y)
        layer.scale(this.size)
        layer.noStroke()
        switch(this.type){
            case 0:
                switch(this.distinct){
                    case 1:
                        for(let a=0,la=this.infoAnim.life.length;a<la;a++){
                            if(this.infoAnim.life[a]>0){
                                layer.fill(250,225,225,this.fade.main*this.infoAnim.life[a])
                                layer.ellipse(4-la*4+a*8,-36,5)
                            }
                        }
                    break
                }
            break
            case 1: case 3:
                switch(this.type){
                    case 1:
                        switch(this.distinct){
                            case 8:
                                for(let a=0,la=this.infoAnim.life.length;a<la;a++){
                                    if(this.infoAnim.life[a]>0){
                                        layer.fill(250,225,225,this.fade.main*this.infoAnim.life[a])
                                        layer.ellipse(4-la*4+a*8,-22,5)
                                    }
                                }
                            break
                        }
                    break
                    case 3:
                        switch(this.distinct){
                            case 1: case 2:
                                for(let a=0,la=this.infoAnim.life.length;a<la;a++){
                                    if(this.infoAnim.life[a]>0){
                                        layer.fill(250,225,225,this.fade.main*this.infoAnim.life[a])
                                        layer.ellipse(4-la*4+a*8,-22,5)
                                    }
                                }
                            break
                        }
                    break
                }
            break
        }
        layer.pop()
    }
    update(parent){
        super.update()
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
        let inputKeys=inputs.keys[this.id]
        let inputTap=inputs.tap[this.id]
        switch(this.type){
            case 0:
                this.controlDirection={x:0,y:0}
                if(this.distinct!=4){
                    if(inputKeys[0]&&!inputKeys[1]&&this.active){
                        this.velocity.x-=1.2
                        this.direction.goal=-54
                        this.controlDirection.x--
                    }else if(inputKeys[1]&&!inputKeys[0]&&this.active){
                        this.velocity.x+=1.2
                        this.direction.goal=54
                        this.controlDirection.x++
                    }
                }
                if(inputKeys[2]&&(this.jump.time>0||this.jump.active>0)){
                    if(this.jump.time>0){
                        this.jump.time=0
                        this.jump.active=8
                    }
                    this.velocity.y-=constrain(5*this.jump.mult+this.velocity.y*0.25,3*this.jump.mult,5*this.jump.mult)
                }else if(this.jump.time>0){
                    this.jump.time--
                }
                if(this.jump.active>0){
                    this.jump.active--
                }
                this.direction.main=spinControl(this.direction.main)
                this.direction.goal=spinControl(this.direction.goal)
                this.direction.main=spinDirection(this.direction.main,this.direction.goal,10)
                this.velocity.x*=0.8
                this.velocity.y*=0.99
                this.velocity.y+=constants.gravity*this.size
                if(this.controlDirection.x!=0||this.animSet.loop>0&&this.animSet.loop%15!=0){
                    this.runAnim(0,1)
                }else{
                    this.animSet.loop=0
                }
                this.mainAnim()
                if(this.collided.wall[0]>0&&this.collided.wall[1]>0||this.collided.wall[2]>0&&this.collided.wall[3]>0){
                    this.dead.trigger=true
                }
                for(let a=0,la=this.collided.wall.length;a<la;a++){
                    if(this.collided.wall[a]>0){
                        this.collided.wall[a]--
                    }
                }
                switch(this.distinct){
                    case 1:
                        for(let a=0,la=this.infoAnim.life.length;a<la;a++){
                            this.infoAnim.life[a]=smoothAnim(this.infoAnim.life[a],this.life>=a+1,0,1,5)
                        }
                        if(this.life<=0){
                            this.dead.trigger=true
                        }else{
                            if(this.timer.invincible>0){
                                this.timer.invincible--
                                this.fade.trigger=this.timer.main%10<5
                            }else{
                                this.fade.trigger=true
                            }
                        }
                    break
                    case 2:
                        if(this.timer.attack>0){
                            this.timer.attack--
                        }else if(inputKeys[3]||inputKeys[4]){
                            this.timer.attack=60
                            parent.entities.projectiles.push(new projectile(this.layer,
                                this.position.x+lsin(this.direction.main)*8*this.size,
                                this.position.y+2*this.size,
                                9,{direction:this.direction.main*5/3,id:this.id,color:{main:this.color.skin.body},timer:300}))
                            this.runAnim(1,1)
                        }
                        if(this.animSet.attasck>0&&this.animSet.attack%15!=0){
                            this.runAnim(1,1)
                        }else{
                            this.animSet.attack=0
                        }
                    break
                    case 3:
                        if(this.timer.bomb>0){
                            this.timer.bomb--
                            if(this.timer.bomb<=0){
                                this.active=false
                                this.dead.trigger=true
                                this.timer.explode=15
                                let possible=[]
                                for(let a=0,la=parent.entities.players.length;a<la;a++){
                                    if(parent.entities.players[a].active){
                                        possible.push(a)
                                    }
                                }
                                if(possible.length>1){
                                    parent.entities.players[possible[floor(random(0,possible.length))]].timer.bomb=600
                                }
                            }
                        }
                        if(this.timer.bombTick>0){
                            this.timer.bombTick--
                        }
                        if(this.timer.explode>0){
                            this.timer.explode--
                        }
                    break
                }
                if(this.dead.trigger){
                    this.fade.trigger=false
                    switch(this.distinct){
                        case 0: case 2:
                            if(this.fade.main<=0){
                                this.fade.trigger=true
                                this.position.x=this.base.position.x
                                this.position.y=this.base.position.y
                                this.dead.trigger=false
                            }
                        break
                        default:
                            this.active=false
                        break
                    }
                }
            break
            case 1:
                switch(this.distinct){
                    case 5:
                        this.animSet.choice=smoothAnim(this.animSet.choice,this.choice>=1&&this.choice<=2,0,1,10)
                        this.animSet.reveal=smoothAnim(this.animSet.reveal,this.reveal,0,1,30)
                        if(this.choice==0&&parent.control.cycle.phase==0){
                            if(inputKeys[2]&&!inputKeys[3]){
                                this.choice=2
                            }else if(inputKeys[3]&&!inputKeys[2]){
                                this.choice=1
                            }
                        }
                    break
                    case 6:
                        this.animSet.choice=smoothAnim(this.animSet.choice,this.choice>=0,0,1,10)
                        this.animSet.reveal=smoothAnim(this.animSet.reveal,this.reveal,0,1,10)
                        this.direction.main=spinControl(this.direction.main)
                        this.direction.goal=spinControl(this.direction.goal)
                        this.direction.main=spinDirection(this.direction.main,this.direction.goal,10)
                        if(this.choice==-1&&parent.control.cycle.phase==0){
                            let set=[]
                            switch(parent.operation.player.length){
                                case 2:
                                    switch(this.id){
                                        case 0: set=[2,1,-1,0]; break
                                        case 1: set=[2,1,0,-1]; break
                                    }
                                break
                                case 3:
                                    switch(this.id){
                                        case 0: set=[3,1,-1,0]; break
                                        case 1: set=[-1,0,3,2]; break
                                        case 2: set=[0,-1,1,2]; break
                                    }
                                break
                                case 4:
                                    switch(this.id){
                                        case 0: set=[4,1,-1,0]; break
                                        case 1: set=[-1,0,4,3]; break
                                        case 2: set=[3,2,0,-1]; break
                                        case 3: set=[0,-1,1,2]; break
                                    }
                                break
                            }
                            for(let a=0,la=set.length;a<la;a++){
                                if(inputKeys[a]&&set[a]>=0){
                                    this.choice=set[a]
                                }
                            }
                        }
                    break
                    case 9:
                        this.animSet.choice=smoothAnim(this.animSet.choice,this.choice>=1,0,1,10)
                        this.animSet.visible=smoothAnim(this.animSet.visible,this.visible,0,1,10)
                        if(this.choice==0&&dirDist(this.direction.main,0)<1&&parent.control.cycle.phase==0){
                            if(inputKeys[2]&&!inputKeys[3]){
                                this.choice=2
                            }else if(inputKeys[3]&&!inputKeys[2]){
                                this.choice=1
                            }
                        }
                        this.direction.main=spinControl(this.direction.main)
                        this.direction.goal=spinControl(this.direction.goal)
                        this.direction.main=spinDirection(this.direction.main,this.direction.goal,10)
                    break
                    case 12:
                        if(parent.control.bound.radius>0&&dist(this.position.x,this.position.y,this.layer.width*0.5,this.layer.height*0.5)>parent.control.bound.radius-this.radius){
                            this.velocity.x=0
                            this.velocity.y=0
                            this.hijack.timer=random(4,6)
                            this.hijack.flip=floor(random(0,2))
                            this.hijack.direction=atan2(this.layer.width*0.5-this.position.x,this.layer.height*0.5-this.position.y)
                        }
                        if(magVec(this.velocity)>1){
                            this.direction.goal=atan2(this.velocity.x,this.velocity.y)
                        }
                        this.direction.main=spinControl(this.direction.main)
                        this.direction.goal=spinControl(this.direction.goal)
                        this.direction.main=spinDirection(this.direction.main,this.direction.goal,10)
                        this.velocity.x*=0.9
                        this.velocity.y*=0.9
                        if(this.hijack.timer>0){
                            this.hijack.timer--
                            this.velocity.x+=this.speed*lsin(this.hijack.direction)
                            this.velocity.y+=this.speed*lcos(this.hijack.direction)
                            this.direction.goal+=(this.hijack.flip*2-1)*10
                            this.runAnim(0,1)
                            switch(this.id){
                                case -1:
                                    this.moving=[0,0]
                                break
                            }
                        }
                        this.color.skin.head=mergeColor(this.sideColor.skin.head,this.base.color.skin.head,0.25)
                        this.color.skin.body=mergeColor(this.sideColor.skin.body,this.base.color.skin.body,0.25)
                        this.color.skin.legs=mergeColor(this.sideColor.skin.legs,this.base.color.skin.legs,0.25)
                        this.color.skin.arms=mergeColor(this.sideColor.skin.arms,this.base.color.skin.arms,0.25)
                        this.mainAnim()
                    break
                    case 15:
                        this.velocity.x-=this.speed
                        this.direction.goal=-90
                        this.direction.main=spinControl(this.direction.main)
                        this.direction.goal=spinControl(this.direction.goal)
                        this.direction.main=spinDirection(this.direction.main,this.direction.goal,10)
                        this.velocity.x*=0.9
                        this.velocity.y*=0.9
                        this.runAnim(0,1)
                        this.mainAnim()
                    break
                    case 18:
                        if(dist(this.position.x,this.position.y,this.layer.width/2,this.layer.height/2)<60-this.radius){
                            if(this.size>0){
                                this.size-=0.06
                            }else{
                                this.size=0
                                this.timer.reset++
                            }
                            this.velocity.x=0
                            this.velocity.y=0
                            if(this.timer.reset>=60){
                                this.run=false
                                this.position.x=this.base.position.x
                                this.position.y=this.base.position.y
                                this.animSet.loop=0
                                this.mainAnim()
                            }
                        }else{
                            if(this.size<0.6){
                                this.size+=0.06
                            }else{
                                this.size=0.6
                                if(this.run){
                                    this.velocity.x+=lsin(this.direction.main)*this.speed
                                    this.velocity.y+=lcos(this.direction.main)*this.speed
                                    this.runAnim(0,1)
                                    this.mainAnim()
                                }else if(inputKeys[2]){
                                    this.run=true
                                    this.timer.reset=0
                                }
                                this.velocity.x*=0.8
                                this.velocity.y*=0.8
                            }
                        }
                    break
                    default:
                        if(this.hijack.reverse){
                            inputKeys=[inputKeys[1],inputKeys[0],inputKeys[3],inputKeys[2]]
                        }
                        if(this.position.x<parent.control.bound.base.x+this.radius){
                            this.position.x=parent.control.bound.base.x+this.radius
                            this.velocity.x*=-1
                            if(this.distinct!=4&&this.distinct!=21){
                                this.hijack.timer=random(30,45)*(this.distinct==19?0.2:1)
                                this.hijack.flip=floor(random(0,2))
                                this.hijack.direction=90
                            }
                        }else if(this.position.x>parent.control.bound.base.x+parent.control.bound.width-this.radius){
                            this.position.x=parent.control.bound.base.x+parent.control.bound.width-this.radius
                            this.velocity.x*=-1
                            if(this.distinct!=4&&this.distinct!=21){
                                this.hijack.timer=random(30,45)*(this.distinct==19?0.2:1)
                                this.hijack.flip=floor(random(0,2))
                                this.hijack.direction=270
                            }
                        }
                        if(this.position.y<parent.control.bound.base.y+this.radius){
                            this.position.y=parent.control.bound.base.y+this.radius
                            this.velocity.y*=-1
                            if(this.distinct!=4&&this.distinct!=21){
                                this.hijack.timer=random(30,45)*(this.distinct==19?0.2:1)
                                this.hijack.flip=floor(random(0,2))
                                this.hijack.direction=0
                            }
                        }else if(this.position.y>parent.control.bound.base.y+parent.control.bound.height-this.radius){
                            this.position.y=parent.control.bound.base.y+parent.control.bound.height-this.radius
                            this.velocity.y*=-1
                            if(this.distinct!=4&&this.distinct!=21){
                                this.hijack.timer=random(30,45)*(this.distinct==19?0.2:1)
                                this.hijack.flip=floor(random(0,2))
                                this.hijack.direction=180
                            }
                        }
                        if(parent.control.bound.radius>0&&dist(this.position.x,this.position.y,this.layer.width*0.5,this.layer.height*0.5)>parent.control.bound.radius-this.radius){
                            this.velocity.x=0
                            this.velocity.y=0
                            this.hijack.timer=random(30,45)
                            this.hijack.flip=floor(random(0,2))
                            this.hijack.direction=atan2(this.layer.width*0.5-this.position.x,this.layer.height*0.5-this.position.y)
                        }
                        this.direction.main=spinControl(this.direction.main)
                        this.direction.goal=spinControl(this.direction.goal)
                        this.direction.main=spinDirection(this.direction.main,this.direction.goal,10)
                        switch(this.distinct){
                            case 14:
                                this.velocity.x*=0.95
                                this.velocity.y*=0.95
                            break
                            case 17:
                                this.velocity.x*=0.8+(this.size-1)*0.125
                                this.velocity.y*=0.8+(this.size-1)*0.125
                            break
                            default:
                                this.velocity.x*=0.8
                                this.velocity.y*=0.8
                            break
                        }
                        this.controlDirection={x:0,y:0}
                        if(this.hijack.timer>0){
                            this.hijack.timer--
                            this.velocity.x+=this.speed*lsin(this.hijack.direction)
                            this.velocity.y+=this.speed*lcos(this.hijack.direction)
                            this.direction.goal+=(this.hijack.flip*2-1)*10
                            this.runAnim(0,1)
                            switch(this.id){
                                case -1:
                                    this.moving=[0,0]
                                break
                            }
                        }else if(this.timer.still<=0&&this.timer.dizzy<=0&&this.timer.dizzy>-100){
                            switch(this.id){
                                case -1:
                                    if(this.moving[0]==-1&&this.active){
                                        this.velocity.x-=this.speed
                                        this.controlDirection.x--
                                    }else if(this.moving[0]==1&&this.active){
                                        this.velocity.x+=this.speed
                                        this.controlDirection.x++
                                    }else if(abs(this.velocity.x)>2&&this.moving[1]!=0){
                                        this.controlDirection.x+=this.velocity.x>0?1:-1
                                    }
                                    if(this.moving[1]==-1&&this.active){
                                        this.velocity.y-=this.speed
                                        this.controlDirection.y--
                                    }else if(this.moving[1]==1&&this.active){
                                        this.velocity.y+=this.speed
                                        this.controlDirection.y++
                                    }else if(abs(this.velocity.y)>2&&this.moving[0]!=0){
                                        this.controlDirection.y+=this.velocity.y>0?1:-1
                                    }
                                    let set=this.moving[0]==0&&this.moving[1]==0?60:600
                                    if(floor(random(0,set*(this.position.x<this.layer.width*0.25?0.5:1)))==0&&this.moving[0]<=0){
                                        this.moving[0]++
                                    }
                                    if(floor(random(0,set*(this.position.x>this.layer.width*0.75?0.5:1)))==0&&this.moving[0]>=0){
                                        this.moving[0]--
                                    }
                                    if(floor(random(0,set*(this.position.y<this.layer.height*0.25?0.5:1)))==0&&this.moving[1]<=0){
                                        this.moving[1]++
                                    }
                                    if(floor(random(0,set*(this.position.y>this.layer.height*0.75?0.5:1)))==0&&this.moving[1]>=0){
                                        this.moving[1]--
                                    }
                                break
                                default:
                                    if(this.distinct!=4){
                                        if(inputKeys[0]&&!inputKeys[1]&&this.active){
                                            this.velocity.x-=this.speed
                                            this.controlDirection.x--
                                        }else if(inputKeys[1]&&!inputKeys[0]&&this.active){
                                            this.velocity.x+=this.speed
                                            this.controlDirection.x++
                                        }else if(abs(this.velocity.x)>2&&(inputKeys[2]&&!inputKeys[3]||inputKeys[3]&&!inputKeys[2])){
                                            this.controlDirection.x+=this.velocity.x>0?1:-1
                                        }
                                    }
                                    if(this.distinct!=21){
                                        if(inputKeys[2]&&!inputKeys[3]&&this.active){
                                            this.velocity.y-=this.speed
                                            this.controlDirection.y--
                                        }else if(inputKeys[3]&&!inputKeys[2]&&this.active){
                                            this.velocity.y+=this.speed
                                            this.controlDirection.y++
                                        }else if(abs(this.velocity.y)>2&&(inputKeys[0]&&!inputKeys[1]||inputKeys[1]&&!inputKeys[0])){
                                            this.controlDirection.y+=this.velocity.y>0?1:-1
                                        }
                                    }
                                    if(this.timer.attack>0){
                                        this.timer.attack--
                                    }else if(inputKeys[4]){
                                        switch(this.distinct){
                                            case 0: case 19:
                                                this.timer.attack=30
                                                for(let a=0,la=parent.entities.players.length;a<la;a++){
                                                    this.collide(1,parent.entities.players[a],parent)
                                                }
                                                this.runAnim(1,1)
                                            break
                                            case 1: case 12:
                                                this.timer.attack=30
                                                for(let a=0,la=parent.entities.players.length;a<la;a++){
                                                    this.collide(2,parent.entities.players[a],parent)
                                                }
                                                this.runAnim(1,1)
                                            break
                                            case 3:
                                                this.timer.attack=15
                                                this.timer.still=15
                                                let size=random(0.75,1.5)
                                                for(let a=0,la=12;a<la;a++){
                                                    parent.entities.projectiles.push(new projectile(this.layer,
                                                        this.position.x+this.skin.arms[1].points.end.x*0.8,
                                                        this.position.y+this.skin.arms[1].points.end.z*0.8,
                                                        2,{direction:this.direction.main+a/la*360,size:size,id:this.id,color:{main:this.color.skin.body}}))
                                                }
                                                this.runAnim(1,1)
                                            break
                                            case 7:
                                                this.timer.attack=30
                                                for(let a=0,la=parent.entities.players.length;a<la;a++){
                                                    this.collide(3,parent.entities.players[a],parent)
                                                }
                                                this.runAnim(1,1)
                                            break
                                            case 8:
                                                this.timer.attack=30
                                                parent.entities.projectiles.push(new projectile(this.layer,
                                                    this.position.x+this.skin.arms[1].points.end.x*0.8,
                                                    this.position.y+this.skin.arms[1].points.end.z*0.8,
                                                    8,{direction:this.direction.main,id:this.id,color:{main:this.color.skin.body},timer:300}))
                                                this.runAnim(1,1)
                                            break
                                            case 10:
                                                this.timer.attack=30
                                                for(let a=0,la=parent.entities.players.length;a<la;a++){
                                                    this.collide(4,parent.entities.players[a],parent)
                                                }
                                                this.runAnim(1,1)
                                            break
                                            case 11:
                                                this.timer.attack=30
                                                for(let a=0,la=parent.entities.players.length;a<la;a++){
                                                    this.collide(5,parent.entities.players[a],parent)
                                                }
                                                this.runAnim(1,1)
                                            break
                                            case 14:
                                                if(this.ball==0||this.ball>=1){
                                                    this.timer.attack=30
                                                    this.runAnim(1,0.5)
                                                    if(this.ball>0){
                                                        parent.entities.projectiles.push(new projectile(this.layer,
                                                            this.position.x+lsin(this.direction.main)*(14+2.5*this.ball),
                                                            this.position.y+lcos(this.direction.main)*(14+2.5*this.ball),
                                                            10,{direction:this.direction.main,id:this.id,size:this.ball}))
                                                        this.ball=0
                                                    }else{
                                                        this.ball+=1/60
                                                    }
                                                }
                                            break
                                            case 20:
                                                let grab=false
                                                for(let a=0,la=parent.entities.walls[this.interact].length;a<la;a++){
                                                    let result=this.collide(8,parent.entities.walls[this.interact][a],parent)
                                                    if(result[0]){
                                                        if(this.animSet.loop<=0){
                                                            this.runAnim(0,1)
                                                        }
                                                        grab=true
                                                        this.timer.attack=result[1]
                                                    }
                                                }
                                                if(!grab){
                                                    this.timer.attack=15
                                                    let grab=false
                                                    for(let a=0,la=parent.entities.walls[this.interact].length;a<la;a++){
                                                        if(this.collide(7,parent.entities.walls[this.interact][a],parent)){
                                                            grab=true
                                                        }
                                                    }
                                                    if(!grab){
                                                        this.runAnim(1,1)
                                                    }
                                                }
                                            break
                                        }
                                    }
                                break
                            }
                            if(this.controlDirection.x!=0||this.controlDirection.y!=0){
                                this.direction.goal=atan2(this.controlDirection.x,this.controlDirection.y)
                            }
                            switch(this.distinct){
                                case 14:
                                    if(this.controlDirection.x!=0&&this.ball==0||this.controlDirection.y!=0&&this.ball==0||this.animSet.loop>0&&this.animSet.loop%15!=0){
                                        this.runAnim(0,1)
                                    }else{
                                        if(this.animSet.loop%30>=15){
                                            this.animSet.flip=1-this.animSet.flip
                                        }
                                        this.animSet.loop=0
                                    }
                                break
                                default:
                                    if(this.controlDirection.x!=0||this.controlDirection.y!=0||this.animSet.loop>0&&this.animSet.loop%15!=0){
                                        this.runAnim(0,1)
                                    }else{
                                        if(this.animSet.loop%30>=15){
                                            this.animSet.flip=1-this.animSet.flip
                                        }
                                        this.animSet.loop=0
                                    }
                                break
                            }
                        }
                        switch(this.distinct){
                            case 14:
                                if(this.animSet.attack>0&&this.animSet.attack%7.5!=0){
                                    this.runAnim(1,0.5)
                                }else if(this.animSet.attack%15>=7.5){
                                    this.animSet.attack=7.5
                                }else{
                                    this.animSet.attack=0
                                }
                            break
                            default:
                                if(this.animSet.attack>0&&this.animSet.attack%15!=0){
                                    this.runAnim(1,1)
                                }else{
                                    this.animSet.attack=0
                                }
                            break
                        }
                        this.mainAnim()
                        if(this.timer.still>0){
                            this.timer.still--
                        }
                        if(this.timer.dizzy>0){
                            this.timer.dizzy--
                        }
                        if(this.timer.dizzySafe>0){
                            this.timer.dizzySafe--
                        }
                        this.infoAnim.dizzy=smoothAnim(this.infoAnim.dizzy,this.timer.dizzy>0||this.timer.dizzy<=-100,0,1,5)
                        switch(this.distinct){
                            case 0: case 7: case 8:
                                for(let a=0,la=this.infoAnim.life.length;a<la;a++){
                                    this.infoAnim.life[a]=smoothAnim(this.infoAnim.life[a],this.life>=a+1,0,1,5)
                                }
                                if(this.life<=0){
                                    if(this.active){
                                        this.active=false
                                        this.fade.trigger=false
                                    }
                                }else{
                                    if(this.timer.invincible>0){
                                        this.timer.invincible--
                                        this.fade.trigger=this.timer.main%10<5
                                    }else{
                                        this.fade.trigger=true
                                    }
                                }
                            break
                            case 10:
                                if(this.id!=-1){
                                    this.animSet.reveal=this.timer.reveal>0?0.5-lcos(this.timer.reveal*6)*0.5:smoothAnim(this.animSet.reveal,this.reveal,0,1,10)
                                    if(this.timer.reveal>=0||this.reveal){
                                        this.color.skin.head=mergeColor(this.sideColor.skin.head,this.base.color.skin.head,this.animSet.reveal)
                                        this.color.skin.body=mergeColor(this.sideColor.skin.body,this.base.color.skin.body,this.animSet.reveal)
                                        this.color.skin.legs=mergeColor(this.sideColor.skin.legs,this.base.color.skin.legs,this.animSet.reveal)
                                        this.color.skin.arms=mergeColor(this.sideColor.skin.arms,this.base.color.skin.arms,this.animSet.reveal)
                                    }
                                    if(this.timer.reveal>0){
                                        this.timer.reveal--
                                    }
                                }
                            break
                            case 13:
                                if(this.dead.trigger){
                                    this.fade.trigger=false
                                    if(this.fade.main<=0){
                                        this.fade.trigger=true
                                        this.position.x=this.base.position.x
                                        this.position.y=this.base.position.y
                                        this.dead.trigger=false
                                    }
                                }
                            break
                            case 14:
                                if(this.ball>0&&this.ball<8){
                                    this.ball+=1/60
                                }
                                this.speed=this.base.speed*(1-this.ball*0.1)
                            break
                            case 17:
                                if(this.timer.stuffed>0){
                                    this.timer.stuffed--
                                }
                                this.size=smoothAnim(this.size,this.timer.stuffed>0,1,2.5,20)
                                this.speed=0.75-(this.size-1)*0.45
                                this.radius=this.base.radius*this.size
                            break
                            case 20:
                                this.animSet.hold=smoothAnim(this.animSet.hold,this.projectile!=-1,0,1,5)
                                if(this.projectile!=-1){
                                    this.projectile.update()
                                }
                            break
                        }
                    break
                }
            break
            case 2:
                if(inputKeys[0]&&!inputKeys[1]&&this.active){
                    this.position.x-=6
                }else if(inputKeys[1]&&!inputKeys[0]&&this.active){
                    this.position.x+=6
                }
                if(inputKeys[2]&&!inputKeys[3]&&this.active){
                    this.position.y-=6
                }else if(inputKeys[3]&&!inputKeys[2]&&this.active){
                    this.position.y+=6
                }
                if(inputKeys[4]&&!this.select.trigger){
                    switch(this.distinct){
                        case 0:
                            for(let a=0,la=parent.entities.walls.length;a<la;a++){
                                if(!parent.entities.walls[a].select.trigger){
                                    this.collide(0,parent.entities.walls[a],parent)
                                }
                            }
                        break
                        case 1:
                            for(let a=0,la=parent.entities.walls[1].length;a<la;a++){
                                if(!parent.entities.walls[1][a].select.trigger){
                                    this.collide(1,parent.entities.walls[1][a],parent)
                                }
                            }
                        break
                    }
                }
                this.infoAnim.select=smoothAnim(this.infoAnim.select,this.select.trigger>0,0,1,5)
                this.position.x=constrain(this.position.x,2,this.layer.width-2)
                this.position.y=constrain(this.position.y,2,this.layer.height-2)
            break
            case 3:
                if(inputKeys[0]&&!inputKeys[1]&&this.active){
                    this.direction.goal+=6
                }else if(inputKeys[1]&&!inputKeys[0]&&this.active){
                    this.direction.goal-=6
                }
                switch(this.distinct){
                    case 2:
                        this.velocity.x+=lsin(this.direction.main)*this.speed
                        this.velocity.y+=lcos(this.direction.main)*this.speed
                    break
                    default:
                        if(inputKeys[2]&&!inputKeys[3]&&this.active){
                            this.velocity.x+=lsin(this.direction.main)*this.speed
                            this.velocity.y+=lcos(this.direction.main)*this.speed
                        }else if(inputKeys[3]&&!inputKeys[2]&&this.active){
                            this.velocity.x-=lsin(this.direction.main)*this.speed*2/3
                            this.velocity.y-=lcos(this.direction.main)*this.speed*2/3
                        }
                    break
                }
                if(this.position.x<parent.control.bound.base.x+this.radius){
                    this.position.x=parent.control.bound.base.x+this.radius
                    this.velocity.x*=-1
                    this.direction.goal=-this.direction.goal
                }else if(this.position.x>parent.control.bound.base.x+parent.control.bound.width-this.radius){
                    this.position.x=parent.control.bound.base.x+parent.control.bound.width-this.radius
                    this.velocity.x*=-1
                    this.direction.goal=-this.direction.goal
                }
                if(this.position.y<parent.control.bound.base.y+this.radius){
                    this.position.y=parent.control.bound.base.y+this.radius
                    this.velocity.y*=-1
                    this.direction.goal=180-this.direction.goal
                }else if(this.position.y>parent.control.bound.base.y+parent.control.bound.height-this.radius){
                    this.position.y=parent.control.bound.base.y+parent.control.bound.height-this.radius
                    this.velocity.y*=-1
                    this.direction.goal=180-this.direction.goal
                }
                if(parent.control.bound.radius>0&&dist(this.position.x,this.position.y,this.layer.width*0.5,this.layer.height*0.5)>parent.control.bound.radius-this.radius){
                    let direction=atan2(this.position.x-this.layer.width*0.5,this.position.y-this.layer.height*0.5)
                    let distance=dist(this.position.x,this.position.y,this.layer.width*0.5,this.layer.height*0.5)-parent.control.bound.radius+this.radius
                    this.position.x-=distance*lsin(direction)
                    this.position.y-=distance*lcos(direction)
                    let currentDirection=atan2(this.velocity.x,this.velocity.y)
                    let magnitude=magVec(this.velocity)
                    this.velocity.x=lsin(direction*2-currentDirection)*magnitude*-this.speed*2/3
                    this.velocity.y=lcos(direction*2-currentDirection)*magnitude*-this.speed*2/3
                }
                this.direction.main=spinControl(this.direction.main)
                this.direction.goal=spinControl(this.direction.goal)
                this.direction.main=spinDirection(this.direction.main,this.direction.goal,10)
                this.velocity.x*=0.8
                this.velocity.y*=0.8
                if(!this.active){
                    this.fade.trigger=false
                }
                switch(this.distinct){
                    case 1: case 2:
                        for(let a=0,la=this.infoAnim.life.length;a<la;a++){
                            this.infoAnim.life[a]=smoothAnim(this.infoAnim.life[a],this.life>=a+1,0,1,5)
                        }
                        if(this.life<=0){
                            if(this.active){
                                this.active=false
                                this.fade.trigger=false
                            }
                        }else{
                            if(this.timer.invincible>0){
                                this.timer.invincible--
                                this.fade.trigger=this.timer.main%10<5
                            }else{
                                this.fade.trigger=true
                            }
                        }
                    break
                }
                if(this.timer.attack>0){
                    this.timer.attack--
                }else if(inputKeys[4]){
                    switch(this.distinct){
                        case 1:
                            this.timer.attack=150
                            parent.entities.projectiles.push(new projectile(this.layer,
                                this.position.x+lsin(this.direction.main)*9,
                                this.position.y+lcos(this.direction.main)*9,
                                8,{direction:this.direction.main,id:this.id,color:{main:this.color.skin.body},timer:300}))
                            this.runAnim(1,1)
                        break
                        case 2:
                            this.timer.attack=15
                            parent.entities.projectiles.push(new projectile(this.layer,
                                this.position.x+lsin(this.direction.main)*9+lcos(this.direction.main)*(4-this.firing.tick*8),
                                this.position.y+lcos(this.direction.main)*9-lsin(this.direction.main)*(4-this.firing.tick*8),
                                11,{direction:this.direction.main,id:this.id,color:{main:this.color.skin.body},timer:300}))
                            this.firing.tick=(this.firing.tick+1)%2
                            this.runAnim(1,1)
                        break
                    }
                }
            break
        }
    }
    collide(type,obj,parent){
        switch(this.type){
            case 0:
                switch(type){
                    case 0:
                        if(inBoxBox(this,obj)&&this.active&&obj.active){
                            let dir=dirPos(this,obj)
                            let magnitude=[magVec(this.velocity),magVec(obj.velocity)]
                            obj.velocity.x=magnitude[0]*lsin(dir)
                            obj.velocity.y=magnitude[0]*lcos(dir)
                            this.velocity.x=-magnitude[1]*lsin(dir)
                            this.velocity.y=-magnitude[1]*lcos(dir)
                        }
                    break
                    case 1:
                        if(inBoxBox(this,obj)&&this.active&&obj.active){
                            let dir=dirPos(this,obj)
                            let magnitude=[magVec(this.velocity),magVec(obj.velocity)]
                            obj.velocity.x=magnitude[0]*lsin(dir)
                            obj.velocity.y=magnitude[0]*lcos(dir)
                            this.velocity.x=-magnitude[1]*lsin(dir)
                            this.velocity.y=-magnitude[1]*lcos(dir)
                            if(this.timer.bomb>0&&this.timer.bombTick<=0){
                                obj.timer.bomb=this.timer.bomb
                                obj.timer.bombTick=15
                                this.timer.bomb=0
                            }else if(obj.timer.bomb>0&&obj.timer.bombTick<=0){
                                this.timer.bomb=obj.timer.bomb
                                this.timer.bombTick=15
                                obj.timer.bomb=0
                            }
                        }
                    break
                }
            break
            case 1:
                switch(type){
                    case 0:
                        if(distPos(this,obj)<this.radius+obj.radius&&this.active&&obj.active){
                            let dir=dirPos(this,obj)
                            let magnitude=[max(0.01,magVec(this.velocity)),max(0.01,magVec(obj.velocity))]
                            obj.velocity.x=magnitude[0]*lsin(dir)
                            obj.velocity.y=magnitude[0]*lcos(dir)
                            this.velocity.x=-magnitude[1]*lsin(dir)
                            this.velocity.y=-magnitude[1]*lcos(dir)
                            if(this.id==-1){
                                this.moving=[0,0]
                            }
                            if(obj.id==-1){
                                obj.moving=[0,0]
                            }
                            switch(this.distinct){
                                case 17:
                                    if(this.size>2&&obj.size<=2){
                                        obj.active=false
                                        obj.fade.trigger=false
                                    }
                                    if(obj.size>2&&this.size<=2){
                                        this.active=false
                                        this.fade.trigger=false
                                    }
                                break
                            }
                        }
                    break
                    case 1:
                        if(obj!=this&&this.active&&obj.active){
                            let hand={position:{x:this.position.x+lsin(this.direction.main)*30,y:this.position.y+lcos(this.direction.main)*30}}
                            if(distPos(hand,obj)<10+obj.radius&&obj.timer.dizzySafe<=0){
                                let dir=dirPos(this,obj)
                                obj.timer.dizzy=120
                                obj.timer.dizzySafe=180
                                obj.velocity.x=4*lsin(dir)
                                obj.velocity.y=4*lcos(dir)
                            }
                        }
                    break
                    case 2:
                        if(obj!=this&&this.active&&obj.active){
                            let hand={position:{x:this.position.x+lsin(this.direction.main)*30,y:this.position.y+lcos(this.direction.main)*30}}
                            if(distPos(hand,obj)<10+obj.radius&&obj.timer.dizzySafe<=0){
                                let dir=dirPos(this,obj)
                                obj.timer.dizzy=30
                                obj.timer.dizzySafe=45
                                obj.velocity.x=4*lsin(dir)
                                obj.velocity.y=4*lcos(dir)
                                parent.payout.add[this.id]++
                                parent.payout.add[obj.id]--
                            }
                        }
                    break
                    case 3:
                        if(obj!=this&&this.active&&obj.active){
                            let hand={position:{x:this.position.x+lsin(this.direction.main)*30,y:this.position.y+lcos(this.direction.main)*30}}
                            if(distPos(hand,obj)<10+obj.radius&&obj.timer.dizzySafe<=0){
                                let dir=dirPos(this,obj)
                                obj.velocity.x=40*lsin(dir)
                                obj.velocity.y=40*lcos(dir)
                                obj.timer.dizzy=30
                                obj.timer.dizzySafe=45
                            }
                        }
                    break
                    case 4:
                        if(obj!=this&&this.active&&obj.active){
                            let hand={position:{x:this.position.x+lsin(this.direction.main)*30,y:this.position.y+lcos(this.direction.main)*30}}
                            if(distPos(hand,obj)<15+obj.radius){
                                if(obj.id==-1){
                                    this.timer.reveal=240
                                }else{
                                    obj.active=false
                                    obj.timer.dizzy=-100
                                    obj.reveal=true
                                }
                            }
                        }
                    break
                    case 5:
                        if(obj!=this&&this.active&&obj.active){
                            if(distPos(this,obj)<this.radius+60+obj.radius&&obj.timer.dizzySafe<=0){
                                let dir=dirPos(this,obj)
                                obj.velocity.x=6*lsin(dir)
                                obj.velocity.y=6*lcos(dir)
                            }
                        }
                    break
                    case 6:
                        if(distPos(this,obj)<this.radius+obj.radius&&this.active&&obj.active){
                            let dir=dirPos(this,obj)
                            let magnitude=[max(0.01,magVec(this.velocity)),max(0.01,magVec(obj.velocity))]
                            this.velocity.x=-magnitude[1]*lsin(dir)*2
                            this.velocity.y=-magnitude[1]*lcos(dir)*2
                        }
                    break
                    case 7:
                        if(this.active){
                            let hand={position:{x:this.position.x+lsin(this.direction.main)*40,y:this.position.y+lcos(this.direction.main)*40},radius:1}
                            if(inCircleBox(hand,obj)){
                                if(obj.type==21&&this.projectile==-1){
                                    this.projectile=new projectile(this.layer,0,0,16,{variant:1})
                                    return true
                                }else if(obj.type==22&&this.projectile==-1){
                                    this.projectile=new projectile(this.layer,0,0,16,{variant:2})
                                    return true
                                }else if(obj.type==22&&this.projectile!=-1&&this.projectile.variant==3){
                                    this.projectile.setupValues({variant:4})
                                    return true
                                }else if(obj.projectile!=-1&&obj.projectile!=undefined&&this.projectile==-1){
                                    this.projectile=obj.projectile
                                    obj.projectile=-1
                                    return true
                                }else if(obj.projectile==-1&&this.projectile!=-1){
                                    obj.projectile=this.projectile
                                    this.projectile=-1
                                    return true
                                }else if(obj.projectile!=-1&&obj.projectile!=undefined&&this.projectile!=-1){
                                    if(
                                        obj.projectile.variant==2&&this.projectile.variant==3||
                                        obj.projectile.variant==3&&this.projectile.variant==2
                                    ){
                                        this.projectile=-1
                                        obj.projectile.setupValues({variant:4})
                                        return true
                                    }else if(
                                        obj.projectile.variant==0&&this.projectile.variant==5||
                                        obj.projectile.variant==5&&this.projectile.variant==0
                                    ){
                                        this.projectile=-1
                                        obj.projectile.setupValues({variant:7})
                                        return true
                                    }
                                }
                            }
                        }
                    break
                    case 8:
                        if(this.active){
                            let hand={position:{x:this.position.x+lsin(this.direction.main)*40,y:this.position.y+lcos(this.direction.main)*40},radius:1}
                            if(inCircleBox(hand,obj)){
                                if(obj.type==24&&obj.projectile!=-1&&obj.projectile.variant==1){
                                    obj.projectile.process.main++
                                    if(obj.projectile.process.main>=obj.projectile.process.goal){
                                        return [true,15]
                                    }else{
                                        return [true,0]
                                    }
                                }else if(obj.type==23&&obj.projectile!=-1&&obj.projectile.variant==8){
                                    obj.projectile.process.main++
                                    if(obj.projectile.process.main>=obj.projectile.process.goal){
                                        return [true,15]
                                    }else{
                                        return [true,0]
                                    }
                                }
                            }
                        }
                        return [false,0]
                }
            break
            case 2:
                switch(type){
                    case 0:
                        if(inCircleBox(this,obj)){
                            this.select.trigger=true
                            obj.select.trigger=true
                            obj.select.color=this.color.skin.head
                            obj.select.id=this.id
                            for(let a=0,la=parent.entities.walls.length;a<la;a++){
                                if(parent.entities.walls[a].select.group==obj.select.group){
                                    parent.entities.walls[a].select.trigger=true
                                    parent.entities.walls[a].select.color=this.color.skin.head
                                }
                            }
                        }
                    break
                    case 1:
                        if(inCircleBox(this,obj)){
                            this.select.trigger=true
                            obj.select.trigger=true
                            obj.select.color=this.color.skin.head
                            obj.select.id=this.id
                        }
                    break
                }
            break
            case 3:
                switch(type){
                    case 0:
                        if(distPos(this,obj)<this.radius+obj.radius&&this.active&&obj.active){
                            let dir=dirPos(this,obj)
                            let magnitude=[magVec(this.velocity),magVec(obj.velocity)]
                            obj.velocity.x=magnitude[0]*lsin(dir)
                            obj.velocity.y=magnitude[0]*lcos(dir)
                            this.velocity.x=-magnitude[1]*lsin(dir)
                            this.velocity.y=-magnitude[1]*lcos(dir)
                        }
                    break
                    case 1:
                        let spike={position:{x:this.position.x+lsin(this.direction.main)*27,y:this.position.y+lcos(this.direction.main)*27}}
                        if(distPos(spike,obj)<obj.radius+3&&inDirArc(dirPos(spike,obj),obj.direction.main+90,obj.direction.main+270)&&this.active&&obj.active){
                            let dir=dirPos(this,obj)
                            let magnitude=[magVec(this.velocity),magVec(obj.velocity)]
                            obj.velocity.x=(magnitude[0]+magnitude[1]*0.5+5)*lsin(dir)
                            obj.velocity.y=(magnitude[0]+magnitude[1]*0.5+5)*lcos(dir)
                            this.velocity.x=-magnitude[1]*0.5*lsin(dir)
                            this.velocity.y=-magnitude[1]*0.5*lcos(dir)
                        }else if(distPos(spike,obj)<obj.radius&&this.active&&obj.active){
                            obj.active=false
                        }
                    break
                    case 2:
                        if(distPos(this,obj)<this.radius+obj.radius&&this.active&&obj.active&&this.timer.invincible<=0&&obj.timer.invincible<=0){
                            let dir=dirPos(this,obj)
                            let magnitude=[magVec(this.velocity),magVec(obj.velocity)]
                            obj.velocity.x=magnitude[0]*lsin(dir)
                            obj.velocity.y=magnitude[0]*lcos(dir)
                            this.velocity.x=-magnitude[1]*lsin(dir)
                            this.velocity.y=-magnitude[1]*lcos(dir)
                            obj.life--
                            obj.timer.invincible=30
                            this.life--
                            this.timer.invincible=30
                        }
                    break
                }
            break
        }
    }
}