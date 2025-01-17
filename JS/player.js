class player extends partisan{
    constructor(layer,x,y,type,id,color){
        super(layer,x,y,{main:1,trigger:true,speed:5})
        this.type=type
        this.id=id
        this.color=color
        this.size=1
        this.active=true
        this.setupValues()
        this.setupGraphics()
    }
    setupValues(){
        switch(this.type){
            case 0:
                this.width=8
                this.height=27
            break
            case 1:
                this.radius=12.5
                this.life=3
                this.timer.invincible=0
                this.infoAnim={life:[1,1,1]}
                this.hijack={timer:0,direction:0}
            break
        }
    }
    setupGraphics(){
        switch(this.type){
            case 0:
                this.direction={main:-54,goal:-54}
            break
            case 1:
                this.direction={main:0,goal:0}
            break
        }
        this.skin={
            body:{fade:1,display:true,level:-19},
            head:{fade:1,display:true,level:-38},
            legs:[
                {fade:1,display:true,anim:{theta:24,phi:90},length:10,points:{set:{x:3,y:-15,z:0},start:{x:0,y:0,z:0},end:{x:0,y:0,z:0}}},
                {fade:1,display:true,anim:{theta:24,phi:-90},length:10,points:{set:{x:3,y:-15,z:0},start:{x:0,y:0,z:0},end:{x:0,y:0,z:0}}}
            ],arms:[
                {fade:1,display:true,anim:{theta:54,phi:90},length:10,points:{set:{x:3,y:-25,z:0},start:{x:0,y:0,z:0},end:{x:0,y:0,z:0}}},
                {fade:1,display:true,anim:{theta:54,phi:-90},length:10,points:{set:{x:3,y:-25,z:0},start:{x:0,y:0,z:0},end:{x:0,y:0,z:0}}}
            ]
        }
        this.face={
            beak:{
                main:{fade:1,display:true,level:-33},
                mouth:{fade:1,display:true,level:-33},
                nostril:{fade:1,display:true,level:-34.5}
            },eye:[
                {fade:1,display:true,anim:0,spin:-18,level:-40},
                {fade:1,display:true,anim:0,spin:18,level:-40}
            ]
        }
        this.setColor()
        this.animSet={loop:0,flip:0}
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
    runAnim(rate){
        this.animSet.loop+=rate
        for(let a=0,la=2;a<la;a++){
            this.skin.legs[a].anim.phi=90*(1-a*2)+lsin((this.animSet.loop+this.animSet.flip)*12)*75
            this.skin.arms[a].anim.phi=90*(1-a*2)+lsin((this.animSet.loop+this.animSet.flip)*12)*60
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
        this.base.color={eye:{back:this.color.eye.back},beak:{main:this.color.beak.main,mouth:this.color.beak.mouth,nostril:this.color.beak.nostril},skin:{head:this.color.skin.head,body:this.color.skin.body,legs:this.color.skin.legs,arms:this.color.skin.arms}}
    }
    display(layer=this.layer){
        this.calculateParts()
        layer.push()
        layer.translate(this.position.x+this.offset.position.x,this.position.y+this.offset.position.y)
        layer.scale(this.size)
        layer.noStroke()
        switch(this.type){
            case 0:
                for(let a=0,la=2;a<la;a++){
                    if(this.skin.arms[a].display&&lcos(this.direction.main+this.skin.arms[a].anim.phi)<=0){
                        layer.fill(this.color.skin.arms[0]+lcos(this.skin.arms[a].anim.phi+this.direction.main)*20,this.color.skin.arms[1]+lcos(this.skin.arms[a].anim.phi+this.direction.main)*20,this.color.skin.arms[2]+lcos(this.skin.arms[a].anim.phi+this.direction.main)*20,this.fade.main*this.skin.arms[a].fade)
                        layer.noStroke()
                        layer.ellipse(this.skin.arms[a].points.end.x,this.skin.arms[a].points.end.y,12,12)
                    }
                }
                for(let a=0,la=2;a<la;a++){
                    if(this.skin.legs[a].display&&lcos(this.direction.main+this.skin.legs[a].anim.theta)<=0){
                        layer.fill(this.color.skin.legs[0]+lcos(this.skin.legs[a].anim.theta+this.direction.main)*20,this.color.skin.legs[1]+lcos(this.skin.legs[a].anim.theta+this.direction.main)*20,this.color.skin.legs[2]+lcos(this.skin.legs[a].anim.theta+this.direction.main)*20,this.fade.main*this.skin.legs[a].fade)
                        layer.noStroke()
                        layer.ellipse(this.skin.legs[a].points.end.x,this.skin.legs[a].points.end.y,12,12)
                    }
                }
                if(this.skin.body.display){
                    layer.fill(this.color.skin.body[0],this.color.skin.body[1],this.color.skin.body[2],this.fade.main*this.skin.body.fade)
                    layer.noStroke()
                    layer.ellipse(0,this.skin.body.level,14,24)
                }
                for(let a=0,la=2;a<la;a++){
                    if(this.skin.legs[a].display&&lcos(this.direction.main+this.skin.legs[a].anim.theta)>0){
                        layer.fill(this.color.skin.legs[0]+lcos(this.skin.legs[a].anim.theta+this.direction.main)*20,this.color.skin.legs[1]+lcos(this.skin.legs[a].anim.theta+this.direction.main)*20,this.color.skin.legs[2]+lcos(this.skin.legs[a].anim.theta+this.direction.main)*20,this.fade.main*this.skin.legs[a].fade)
                        layer.noStroke()
                        layer.ellipse(this.skin.legs[a].points.end.x,this.skin.legs[a].points.end.y,12,12)
                    }
                }
                if(this.face.beak.main.display){
                    layer.fill(this.color.beak.main[0],this.color.beak.main[1],this.color.beak.main[2],this.fade.main*this.face.beak.main.fade)
                    layer.noStroke()
                    layer.ellipse(lsin(this.direction.main)*12,this.face.beak.main.level,12+2*lcos(this.direction.main),8)
                }
                if(this.face.beak.mouth.display){
                    layer.noFill()
                    layer.stroke(this.color.beak.mouth[0],this.color.beak.mouth[1],this.color.beak.mouth[2],this.fade.main*this.face.beak.mouth.fade)
                    layer.strokeWeight(0.5)
                    layer.arc(lsin(this.direction.main)*12,this.face.beak.mouth.level,12+2*lcos(this.direction.main),1,0,180)
                }
                if(this.face.beak.nostril.display){
                    layer.noFill()
                    layer.stroke(this.color.beak.nostril[0],this.color.beak.nostril[1],this.color.beak.nostril[2],this.fade.main*this.face.beak.nostril.fade)
                    layer.strokeWeight(0.5)
                    for(let a=0,la=2;a<la;a++){
                        layer.line(lsin(this.direction.main-6+a*12)*16,this.face.beak.nostril.level,lsin(this.direction.main-6+a*12)*16,this.face.beak.nostril.level+0.5)
                    }
                }
                if(this.skin.head.display){
                    layer.fill(...this.color.skin.head,this.fade.main*this.skin.head.fade)
                    layer.noStroke()
                    layer.ellipse(0,this.skin.head.level,25)
                }
                for(let a=0,la=2;a<la;a++){
                    if(this.skin.arms[a].display&&lcos(this.direction.main+this.skin.arms[a].anim.phi)>0){
                        layer.fill(this.color.skin.arms[0]+lcos(this.skin.arms[a].anim.phi+this.direction.main)*20,this.color.skin.arms[1]+lcos(this.skin.arms[a].anim.phi+this.direction.main)*20,this.color.skin.arms[2]+lcos(this.skin.arms[a].anim.phi+this.direction.main)*20,this.fade.main*this.skin.arms[a].fade)
                        layer.noStroke()
                        layer.ellipse(this.skin.arms[a].points.end.x,this.skin.arms[a].points.end.y,12,12)
                    }
                    if(this.face.eye[a].display){
                        if(this.control==0){
                            layer.stroke(this.color.eye.back[0],this.color.eye.back[1],this.color.eye.back[2],this.fade.main*this.face.eye[a].fade)
                        }else{
                            layer.stroke(255,0,0,this.fade.main*this.face.eye[a].fade)
                        }
                        layer.strokeWeight((2.5-this.face.eye[a].anim*1.5)*constrain(lcos(this.face.eye[a].spin+this.direction.main)*5,0,1))
                        if(this.face.eye[a].anim==0){
                            layer.point(lsin(this.face.eye[a].spin+this.direction.main)*12-(a*2-1)*lcos(this.face.eye[a].spin+this.direction.main)*this.face.eye[a].anim*2,this.face.eye[a].level)
                        }else{
                            layer.line(lsin(this.face.eye[a].spin+this.direction.main)*12-(a*2-1)*lcos(this.face.eye[a].spin+this.direction.main)*this.face.eye[a].anim*2,this.face.eye[a].level,lsin(this.face.eye[a].spin+this.direction.main)*12+(a*2-1)*lcos(this.face.eye[a].spin+this.direction.main)*this.face.eye[a].anim*2,this.face.eye[a].level-this.face.eye[a].anim*2)
                            layer.line(lsin(this.face.eye[a].spin+this.direction.main)*12-(a*2-1)*lcos(this.face.eye[a].spin+this.direction.main)*this.face.eye[a].anim*2,this.face.eye[a].level,lsin(this.face.eye[a].spin+this.direction.main)*12+(a*2-1)*lcos(this.face.eye[a].spin+this.direction.main)*this.face.eye[a].anim*2,this.face.eye[a].level+this.face.eye[a].anim*2)
                        }
                    }
                }
                if(this.face.beak.main.display&&lcos(this.direction.main)>0){
                    layer.fill(this.color.beak.main[0],this.color.beak.main[1],this.color.beak.main[2],this.fade.main*this.face.beak.main.fade)
                    layer.noStroke()
                    layer.ellipse(lsin(this.direction.main)*12,this.face.beak.main.level,12+2*lcos(this.direction.main),8)
                }
                if(this.face.beak.mouth.display&&lcos(this.direction.main)>0){
                    layer.noFill()
                    layer.stroke(this.color.beak.mouth[0],this.color.beak.mouth[1],this.color.beak.mouth[2],this.fade.main*this.face.beak.mouth.fade)
                    layer.strokeWeight(0.5)
                    layer.arc(lsin(this.direction.main)*12,this.face.beak.mouth.level,12+2*lcos(this.direction.main),1,0,180)
                }
                if(this.face.beak.nostril.display&&lcos(this.direction.main)>0){
                    layer.noFill()
                    layer.stroke(this.color.beak.nostril[0],this.color.beak.nostril[1],this.color.beak.nostril[2],this.fade.main*this.face.beak.nostril.fade)
                    layer.strokeWeight(0.5)
                    for(let a=0,la=2;a<la;a++){
                        layer.line(lsin(this.direction.main-6+a*12)*16,this.face.beak.nostril.level,lsin(this.direction.main-6+a*12)*16,this.face.beak.nostril.level+0.5)
                    }
                }
            break
            case 1:
                layer.noStroke()
                for(let a=0,la=this.infoAnim.life.length;a<la;a++){
                    if(this.infoAnim.life[a]>0){
                        layer.fill(250,225,225,this.fade.main*this.infoAnim.life[a])
                        layer.ellipse(4-la*4+a*8,-20,5)
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
                if(this.face.beak.nostril.display&&lcos(this.direction.main)>0){
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
                    }
                }
            break
        }
        layer.pop()
    }
    update(){
        super.update()
        let inputKeys=inputs.keys[this.id]
        let inputTap=inputs.tap[this.id]
        switch(this.type){
            case 0:
            break
            case 1:
                if(this.position.x<0){
                    this.position.x*=-1
                    this.velocity.x=0
                    this.hijack.timer=random(30,45)
                    this.hijack.direction=90
                }else if(this.position.x>this.layer.width){
                    this.position.x=this.layer.width
                    this.velocity.x*=-1
                    this.hijack.timer=random(30,45)
                    this.hijack.direction=270
                }
                if(this.position.y<0){
                    this.position.y=0
                    this.velocity.y*=-1
                    this.hijack.timer=random(30,45)
                    this.hijack.direction=0
                }else if(this.position.y>this.layer.height){
                    this.position.y=this.layer.height
                    this.velocity.y*=-1
                    this.hijack.timer=random(30,45)
                    this.hijack.direction=180
                }
                this.direction.main=spinControl(this.direction.main)
                this.direction.goal=spinControl(this.direction.goal)
                this.direction.main=spinDirection(this.direction.main,this.direction.goal,10)
                this.velocity.x*=0.8
                this.velocity.y*=0.8
                let controlDirection={x:0,y:0}
                if(this.hijack.timer>0){
                    this.hijack.timer--
                    this.velocity.x+=1.2*lsin(this.hijack.direction)
                    this.velocity.y+=1.2*lcos(this.hijack.direction)
                    this.direction.goal+=10
                    this.runAnim(1)
                }else{
                    if(inputKeys[0]&&!inputKeys[1]&&this.active){
                        this.velocity.x-=1.2
                        controlDirection.x--
                    }else if(inputKeys[1]&&!inputKeys[0]&&this.active){
                        this.velocity.x+=1.2
                        controlDirection.x++
                    }else if(abs(this.velocity.x)>2&&(inputKeys[2]&&!inputKeys[3]||inputKeys[3]&&!inputKeys[2])){
                        controlDirection.x+=this.velocity.x>0?1:-1
                    }
                    if(inputKeys[2]&&!inputKeys[3]&&this.active){
                        this.velocity.y-=1.2
                        controlDirection.y--
                    }else if(inputKeys[3]&&!inputKeys[2]&&this.active){
                        this.velocity.y+=1.2
                        controlDirection.y++
                    }else if(abs(this.velocity.y)>2&&(inputKeys[0]&&!inputKeys[1]||inputKeys[1]&&!inputKeys[0])){
                        controlDirection.y+=this.velocity.y>0?1:-1
                    }
                    if(controlDirection.x!=0||controlDirection.y!=0){
                        this.direction.goal=atan2(controlDirection.x,controlDirection.y)
                    }
                    if(controlDirection.x!=0||controlDirection.y!=0||this.animSet.loop>0&&this.animSet.loop%15!=0){
                        this.runAnim(1)
                    }else{
                        this.animSet.loop=0
                    }
                }
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
    }
    collide(type,obj){
        switch(this.type){
            case 1:
                switch(type){
                    case 0:
                        if(distPos(this,obj)<this.radius+obj.radius){
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