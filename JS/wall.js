
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
        this.index=constants.index
        constants.index++
    }
    setupValues(){
        let begin
        switch(this.type){
            case 2:
                this.anim={offset:random(0,150)}
            break
            case 3:
                this.text={main:'',size:0}
                this.select={trigger:false,disable:false,group:0,id:-1,color:[],anim:0}
                this.anim={disable:0}
            break
            case 4: case 5:
                this.cycle=random(120,360)
                this.offset.time=random(0,this.cycle)
                this.anim={active:0}
            break
            case 12:
                this.select={trigger:false,group:0,id:-1,color:[],anim:0}
                this.set=[]
                this.fade.main=true
            break
            case 13:
                this.select={id:-1}
                this.set=[]
                this.fall=0
            break
            case 14:
                this.hit={trigger:false,time:0}
                this.direction=0
                this.angularSpeed=0
                this.rise=20
                this.stack=0
                this.maxSpeed=2
                this.lift=0.5
            break
            case 15:
                this.rise=25
            break
            case 16:
                this.radius=this.width/2
                this.height=this.width
                this.timer.shuffle=0
                this.copy=-1
                this.player=new player(this.layer,0,45,1,1,0,-1)
            break
            case 17: case 20: case 23: case 24:
                this.projectile=-1
            break
            case 18:
                this.anim=4
                this.projectile=-1
            break
            case 19:
                this.anim=4
                this.projectile=-1
                this.saved=0
            break
            case 21:
                this.spots=[]
                begin=random(0,360)
                for(let a=0,la=10;a<la;a++){
                    let rad=random(8,10)
                    let dir=begin+(a+random(-0.2,0.2))/la*360
                    this.spots.push([lsin(dir)*rad,lcos(dir)*rad,random(4,8)])
                }
            break
            case 22:
                this.spots=[]
                begin=random(0,360)
                for(let a=0,la=10;a<la;a++){
                    let rad=sqrt(random(a%2*100,100+a%2*100))
                    let dir=begin+(a+random(-0.2,0.2))/la*360
                    this.spots.push([lsin(dir)*rad,lcos(dir)*rad,random(0,360)])
                }
            break
        }
    }
    combiner(){
        return true
    }
    ladder(step,other){
        let check
        let passed
        switch(step){
            case 0:
                //checks horizontal
                if(this.combiner()){
                    check=[]
                    passed=[]
                    for(let a=0,la=other.length;a<la;a++){
                        if(other[a].combiner()){
                            check.push(a)
                        }
                    }
                    for(let a=0,la=check.length;a<la;a++){
                        if(!other[check[a]].remove&&this.type==other[check[a]].type&&this.index!=other[a].index&&near(this.height,other[check[a]].height)&&this.position.y==other[check[a]].position.y){
                            if(near(this.position.x+this.width/2,other[check[a]].position.x-other[check[a]].width/2)){
                                this.width+=other[check[a]].width
                                this.position.x+=other[check[a]].width/2
                                other[check[a]].remove=true
                                for(let b=0,lb=passed.length;b<lb;b++){
                                    check.push(passed[b])
                                }
                                passed=[]
                            }else{
                                passed.push(a)
                            }
                        }
                    }
                }
            break
            case 1:
                //checks vertical
                if(this.combiner()){
                    check=[]
                    passed=[]
                    for(let a=0,la=other.length;a<la;a++){
                        if(other[a].combiner()){
                            check.push(a)
                        }
                    }
                    for(let a=0,la=check.length;a<la;a++){
                        if(!other[check[a]].remove&&this.type==other[check[a]].type&&this.index!=other[a].index&&near(this.width,other[check[a]].width)&&this.position.x==other[check[a]].position.x){
                            if(near(this.position.y+this.height/2,other[check[a]].position.y-other[check[a]].height/2)){
                                this.height+=other[check[a]].height
                                this.position.y+=other[check[a]].height/2
                                other[check[a]].remove=true
                                for(let b=0,lb=passed.length;b<lb;b++){
                                    check.push(passed[b])
                                }
                                passed=[]
                            }else{
                                passed.push(a)
                            }
                        }
                    }
                }
            break
            case 2:
                //forms boundary
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
            break
            case 3:
                //checks redundancy
                if(this.combiner()){
                    for(let a=0,la=other.length;a<la;a++){
                        if(!other[a].remove&&this.type==other[a].type&&this.index!=other[a].index&&other[a].combiner()){
                            if(this.boundary[0].length>0&&near(this.position.y+this.height/2,other[a].position.y-other[a].height/2)&&this.position.x-this.width/2>=other[a].position.x-other[a].width/2&&this.position.x+this.width/2<=other[a].position.x+other[a].width/2){
                                this.boundary[0]=[]
                            }else if(this.boundary[1].length>0&&near(this.position.y-this.height/2,other[a].position.y+other[a].height/2)&&this.position.x-this.width/2>=other[a].position.x-other[a].width/2&&this.position.x+this.width/2<=other[a].position.x+other[a].width/2){
                                this.boundary[1]=[]
                            }
                            if(this.boundary[2].length>0&&near(this.position.x+this.width/2,other[a].position.x-other[a].width/2)&&this.position.y-this.height/2>=other[a].position.y-other[a].height/2&&this.position.y+this.height/2<=other[a].position.y+other[a].height/2){
                                this.boundary[2]=[]
                            }else if(this.boundary[3].length>0&&near(this.position.x-this.width/2,other[a].position.x+other[a].width/2)&&this.position.y-this.height/2>=other[a].position.y-other[a].height/2&&this.position.y+this.height/2<=other[a].position.y+other[a].height/2){
                                this.boundary[3]=[]
                            }
                        }
                    }
                }
            break
            case 4:
                //check overlay
                if(this.combiner()){
                    for(let a=0,la=other.length;a<la;a++){
                        if(!other[a].remove&&this.type==other[a].type&&this.index!=other[a].index&&other[a].combiner()){
                            if(this.boundary[0].length>0&&near(this.position.y+this.height/2,other[a].position.y-other[a].height/2)&&(this.position.x+this.width/2>=other[a].position.x-other[a].width/2||this.position.x-this.width/2<=other[a].position.x+other[a].width/2)){
                                for(let b=0,lb=this.boundary[0].length;b<lb;b++){
                                    for(let c=0,lc=this.boundary[0][b].length;c<lc;c++){
                                        if(this.boundary[0][b][1-c].x<=other[a].position.x-other[a].width/2&&this.boundary[0][b][c].x>=other[a].position.x-other[a].width/2&&this.boundary[0][b][c].x<=other[a].position.x+other[a].width/2){
                                            this.boundary[0][b][c].x=other[a].position.x-other[a].width/2
                                        }else if(this.boundary[0][b][1-c].x>=other[a].position.x+other[a].width/2&&this.boundary[0][b][c].x>=other[a].position.x-other[a].width/2&&this.boundary[0][b][c].x<=other[a].position.x+other[a].width/2){
                                            this.boundary[0][b][c].x=other[a].position.x+other[a].width/2
                                        }
                                    }
                                }
                            }else if(this.boundary[1].length>0&&near(this.position.y-this.height/2,other[a].position.y+other[a].height/2)&&(this.position.x+this.width/2>=other[a].position.x-other[a].width/2||this.position.x-this.width/2<=other[a].position.x+other[a].width/2)){
                                for(let b=0,lb=this.boundary[1].length;b<lb;b++){
                                    for(let c=0,lc=this.boundary[1][b].length;c<lc;c++){
                                        if(this.boundary[1][b][1-c].x<=other[a].position.x-other[a].width/2&&this.boundary[1][b][c].x>=other[a].position.x-other[a].width/2&&this.boundary[1][b][c].x<=other[a].position.x+other[a].width/2){
                                            this.boundary[1][b][c].x=other[a].position.x-other[a].width/2
                                        }else if(this.boundary[1][b][1-c].x>=other[a].position.x+other[a].width/2&&this.boundary[1][b][c].x>=other[a].position.x-other[a].width/2&&this.boundary[1][b][c].x<=other[a].position.x+other[a].width/2){
                                            this.boundary[1][b][c].x=other[a].position.x+other[a].width/2
                                        }
                                    }
                                }
                            }
                            if(this.boundary[2].length>0&&near(this.position.x+this.width/2,other[a].position.x-other[a].width/2)&&(this.position.y+this.height/2>=other[a].position.y-other[a].height/2||this.position.y-this.height/2<=other[a].position.y+other[a].height/2)){
                                for(let b=0,lb=this.boundary[2].length;b<lb;b++){
                                    for(let c=0,lc=this.boundary[2][b].length;c<lc;c++){
                                        if(this.boundary[2][b][1-c].y<=other[a].position.y-other[a].height/2&&this.boundary[2][b][c].y>=other[a].position.y-other[a].height/2&&this.boundary[2][b][c].y<=other[a].position.y+other[a].height/2){
                                            this.boundary[2][b][c].y=other[a].position.y-other[a].height/2
                                        }else if(this.boundary[2][b][1-c].y>=other[a].position.y+other[a].height/2&&this.boundary[2][b][c].y>=other[a].position.y-other[a].height/2&&this.boundary[2][b][c].y<=other[a].position.y+other[a].height/2){
                                            this.boundary[2][b][c].y=other[a].position.y+other[a].height/2
                                        }
                                    }
                                }
                            }else if(this.boundary[3].length>0&&near(this.position.x-this.width/2,other[a].position.x+other[a].width/2)&&(this.position.y+this.height/2>=other[a].position.y-other[a].height/2||this.position.y-this.height/2<=other[a].position.y+other[a].height/2)){
                                for(let b=0,lb=this.boundary[3].length;b<lb;b++){
                                    for(let c=0,lc=this.boundary[3][b].length;c<lc;c++){
                                        if(this.boundary[3][b][1-c].y<=other[a].position.y-other[a].height/2&&this.boundary[3][b][c].y>=other[a].position.y-other[a].height/2&&this.boundary[3][b][c].y<=other[a].position.y+other[a].height/2){
                                            this.boundary[3][b][c].y=other[a].position.y-other[a].height/2
                                        }else if(this.boundary[3][b][1-c].y>=other[a].position.y+other[a].height/2&&this.boundary[3][b][c].y>=other[a].position.y-other[a].height/2&&this.boundary[3][b][c].y<=other[a].position.y+other[a].height/2){
                                            this.boundary[3][b][c].y=other[a].position.y+other[a].height/2
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            break
            case 5:
                //check split
                if(this.combiner()){
                    for(let a=0,la=other.length;a<la;a++){
                        if(!other[a].remove&&this.type==other[a].type&&this.index!=other[a].index&&other[a].combiner()){
                            if(this.boundary[0].length>0&&near(this.position.y+this.height/2,other[a].position.y-other[a].height/2)&&(this.position.x+this.width/2>=other[a].position.x-other[a].width/2||this.position.x-this.width/2<=other[a].position.x+other[a].width/2)){
                                for(let b=0,lb=this.boundary[0].length;b<lb;b++){
                                    for(let c=0,lc=this.boundary[0][b].length;c<lc;c++){
                                        if(this.boundary[0][b][c].x<=other[a].position.x-other[a].width/2&&this.boundary[0][b][1-c].x>=other[a].position.x+other[a].width/2){
                                            this.boundary[0].push([
                                                {x:other[a].position.x+other[a].width/2,y:this.boundary[0][b][c].y},
                                                {x:this.boundary[0][b][1-c].x,y:this.boundary[0][b][c].y}
                                            ])
                                            this.boundary[0][b][1-c].x=other[a].position.x-other[a].width/2
                                            lb++
                                        }
                                    }
                                }
                            }else if(this.boundary[1].length>0&&near(this.position.y-this.height/2,other[a].position.y+other[a].height/2)&&(this.position.x+this.width/2>=other[a].position.x-other[a].width/2||this.position.x-this.width/2<=other[a].position.x+other[a].width/2)){
                                for(let b=0,lb=this.boundary[1].length;b<lb;b++){
                                    for(let c=0,lc=this.boundary[1][b].length;c<lc;c++){
                                        if(this.boundary[1][b][c].x<=other[a].position.x-other[a].width/2&&this.boundary[1][b][1-c].x>=other[a].position.x+other[a].width/2){
                                            this.boundary[1].push([
                                                {x:other[a].position.x+other[a].width/2,y:this.boundary[1][b][c].y},
                                                {x:this.boundary[1][b][1-c].x,y:this.boundary[1][b][c].y}
                                            ])
                                            this.boundary[1][b][1-c].x=other[a].position.x-other[a].width/2
                                            lb++
                                        }
                                    }
                                }
                            }
                            if(this.boundary[2].length>0&&near(this.position.x+this.width/2,other[a].position.x-other[a].width/2)&&(this.position.y+this.height/2>=other[a].position.y-other[a].height/2||this.position.y-this.height/2<=other[a].position.y+other[a].height/2)){
                                for(let b=0,lb=this.boundary[2].length;b<lb;b++){
                                    for(let c=0,lc=this.boundary[2][b].length;c<lc;c++){
                                        if(this.boundary[2][b][c].y<=other[a].position.y-other[a].height/2&&this.boundary[2][b][1-c].y>=other[a].position.y+other[a].height/2){
                                            this.boundary[2].push([
                                                {x:this.boundary[2][b][c].x,y:other[a].position.y+other[a].height/2},
                                                {x:this.boundary[2][b][c].x,y:this.boundary[2][b][1-c].y}
                                            ])
                                            this.boundary[2][b][1-c].y=other[a].position.y-other[a].height/2
                                            lb++
                                        }
                                    }
                                }
                            }else if(this.boundary[3].length>0&&near(this.position.x-this.width/2,other[a].position.x+other[a].width/2)&&(this.position.y+this.height/2>=other[a].position.y-other[a].height/2||this.position.y-this.height/2<=other[a].position.y+other[a].height/2)){
                                for(let b=0,lb=this.boundary[3].length;b<lb;b++){
                                    for(let c=0,lc=this.boundary[3][b].length;c<lc;c++){
                                        if(this.boundary[3][b][c].y<=other[a].position.y-other[a].height/2&&this.boundary[3][b][1-c].y>=other[a].position.y+other[a].height/2){
                                            this.boundary[3].push([
                                                {x:this.boundary[3][b][c].x,y:other[a].position.y+other[a].height/2},
                                                {x:this.boundary[3][b][c].x,y:this.boundary[3][b][1-c].y}
                                            ])
                                            this.boundary[3][b][1-c].y=other[a].position.y-other[a].height/2
                                            lb++
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            break
            case 6:
                //check combine
                if(this.combiner()){
                    for(let a=0,la=other.length;a<la;a++){
                        if(!other[a].remove&&this.type==other[a].type&&this.index!=other[a].index&&other[a].combiner()){
                            if(this.boundary[0].length>0&&other[a].boundary[0].length>0&&near(this.position.y+this.height/2,other[a].position.y+other[a].height/2)){
                                for(let b=0,lb=this.boundary[0].length;b<lb;b++){
                                    for(let c=0,lc=this.boundary[0][b].length;c<lc;c++){
                                        for(let d=0,ld=other[a].boundary[0].length;d<ld;d++){
                                            for(let e=0,le=other[a].boundary[0][d].length;e<le;e++){
                                                if(near(this.boundary[0][b][c].x,other[a].boundary[0][d][e].x)&&near(this.boundary[0][b][c].y,other[a].boundary[0][d][e].y)){
                                                    this.boundary[0][b][c].x=other[a].boundary[0][d][1-e].x
                                                    this.boundary[0][b][c].y=other[a].boundary[0][d][1-e].y
                                                    other[a].boundary[0].splice(d,1)
                                                    d--
                                                    ld--
                                                    e=le
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if(this.boundary[1].length>0&&other[a].boundary[1].length>0&&near(this.position.y-this.height/2,other[a].position.y-other[a].height/2)){
                                for(let b=0,lb=this.boundary[1].length;b<lb;b++){
                                    for(let c=0,lc=this.boundary[1][b].length;c<lc;c++){
                                        for(let d=0,ld=other[a].boundary[1].length;d<ld;d++){
                                            for(let e=0,le=other[a].boundary[1][d].length;e<le;e++){
                                                if(near(this.boundary[1][b][c].x,other[a].boundary[1][d][e].x)&&near(this.boundary[1][b][c].y,other[a].boundary[1][d][e].y)){
                                                    this.boundary[1][b][c].x=other[a].boundary[1][d][1-e].x
                                                    this.boundary[1][b][c].y=other[a].boundary[1][d][1-e].y
                                                    other[a].boundary[1].splice(d,1)
                                                    d--
                                                    ld--
                                                    e=le
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if(this.boundary[2].length>0&&other[a].boundary[2].length>0&&near(this.position.x+this.width/2,other[a].position.x+other[a].width/2)){
                                for(let b=0,lb=this.boundary[2].length;b<lb;b++){
                                    for(let c=0,lc=this.boundary[2][b].length;c<lc;c++){
                                        for(let d=0,ld=other[a].boundary[2].length;d<ld;d++){
                                            for(let e=0,le=other[a].boundary[2][d].length;e<le;e++){
                                                if(near(this.boundary[2][b][c].x,other[a].boundary[2][d][e].x)&&near(this.boundary[2][b][c].y,other[a].boundary[2][d][e].y)){
                                                    this.boundary[2][b][c].x=other[a].boundary[2][d][1-e].x
                                                    this.boundary[2][b][c].y=other[a].boundary[2][d][1-e].y
                                                    other[a].boundary[2].splice(d,1)
                                                    d--
                                                    ld--
                                                    e=le
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if(this.boundary[3].length>0&&other[a].boundary[3].length>0&&near(this.position.x-this.width/2,other[a].position.x-other[a].width/2)){
                                for(let b=0,lb=this.boundary[3].length;b<lb;b++){
                                    for(let c=0,lc=this.boundary[3][b].length;c<lc;c++){
                                        for(let d=0,ld=other[a].boundary[3].length;d<ld;d++){
                                            for(let e=0,le=other[a].boundary[3][d].length;e<le;e++){
                                                if(near(this.boundary[3][b][c].x,other[a].boundary[3][d][e].x)&&near(this.boundary[3][b][c].y,other[a].boundary[3][d][e].y)){
                                                    this.boundary[3][b][c].x=other[a].boundary[3][d][1-e].x
                                                    this.boundary[3][b][c].y=other[a].boundary[3][d][1-e].y
                                                    other[a].boundary[3].splice(d,1)
                                                    d--
                                                    ld--
                                                    e=le
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            break
            case 7:
                //forms bounder
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
                        this.outerBounder={position:{x:(bound.x[0]+bound.x[1])/2,y:(bound.y[0]+bound.y[1])/2},width:abs(bound.x[0]-bound.x[1])+20,height:abs(bound.y[0]-bound.y[1])+20}
                    break
                }
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
            case 2: case 15:
                layer.fill(...this.color.base,this.fade.main)
                layer.rect(0,0,this.width,this.height)
                layer.fill(...this.color.over,this.fade.main)
                layer.rect(0,0,this.width-10,this.height-10)
            break
            case 3:
                layer.fill(...this.color.base,this.fade.main)
                layer.rect(0,0,this.width,this.height)
                layer.fill(this.color.over[0]*(1-this.anim.disable),this.color.over[1]*(1-this.anim.disable),this.color.over[2]*(1-this.anim.disable),this.fade.main)
                layer.rect(0,0,this.width-5,this.height-5)
                layer.fill(...this.color.text,this.fade.main)
                layer.textSize(this.text.size)
                layer.text(this.text.main,0,0)
            break
            case 4:
                layer.fill(...this.color.base,this.fade.main)
                layer.rect(0,-this.height/2+2.5,this.width*2,5)
                layer.rect(0,this.height/2-2.5,this.width*2,5)
                layer.fill(...this.color.shock,this.fade.main*this.anim.active*0.8)
                layer.rect(0,0,this.width,this.height-10)
            break
            case 5:
                layer.fill(...this.color.base,this.fade.main)
                layer.rect(-this.width/2+2.5,0,5,this.height*2)
                layer.rect(this.width/2-2.5,0,5,this.height*2)
                layer.fill(...this.color.shock,this.fade.main*this.anim.active*0.8)
                layer.rect(0,0,this.width-10,this.height)
            break
            case 6:
                layer.fill(...this.color.base,this.fade.main)
                layer.rect(0,-this.height/2+2.5,this.width*2,5)
                layer.rect(0,this.height/2-2.5,this.width*2,5)
                layer.fill(...this.color.shock,this.fade.main*0.8)
                layer.rect(0,0,this.width,this.height-10)
            break
            case 7:
                layer.fill(...this.color.base,this.fade.main)
                layer.rect(-this.width/2+2.5,0,5,this.height*2)
                layer.rect(this.width/2-2.5,0,5,this.height*2)
                layer.fill(...this.color.shock,this.fade.main*0.8)
                layer.rect(0,0,this.width-10,this.height)
            break
            case 8:
                layer.fill(...this.color.base[0],this.fade.main)
                layer.rect(0,0,this.width,this.height)
                layer.fill(...this.color.base[1],this.fade.main)
                for(let a=0,la=this.width/5;a<la;a++){
                    for(let b=0,lb=this.height/5;b<lb;b++){
                        if((a+b)%2==0){
                            layer.rect(-this.width/2+2.5+a*5,-this.height/2+2.5+b*5,5)
                        }
                    }
                }
            break
            case 9: case 10:
                layer.fill(...this.color.base[0],this.fade.main)
                layer.rect(0,0,this.width,this.height)
                layer.fill(...this.color.base[1],this.fade.main)
                layer.rect(0,0,this.width-10,this.height-10)
                layer.fill(...this.color.text,this.fade.main)
                layer.textSize(25)
                layer.text(this.text,0,0)
            break
            case 11:
                layer.fill(...this.color.base[0],this.fade.main)
                layer.rect(0,0,this.width,this.height)
                layer.fill(...this.color.base[1],this.fade.main)
                layer.rect(0,0,this.width-8,this.height-8)
                layer.stroke(...this.color.base[0],this.fade.main)
                layer.strokeWeight(4)
                layer.line(-this.width/2+2,-this.height/2+2,this.width/2-2,this.height/2-2)
                layer.line(-this.width/2+2,this.height/2-2,this.width/2-2,-this.height/2+2)
                layer.noStroke()
                layer.fill(...this.color.text,this.fade.main)
                layer.textSize(25)
                layer.text(this.text,0,0)
            break
            case 12:
                layer.fill(...this.color.base,this.fade.main)
                layer.rect(0,0,this.width,this.height,4)
                layer.fill(...this.color.internal,this.fade.main)
                layer.rect(0,0,this.width-10,this.height-10,2)
                layer.noFill()
                layer.stroke(...this.color.wire,this.fade.main)
                let cap=0
                for(let a=0,la=this.set.length;a<la;a++){
                    cap=max(this.set[a][1],cap)
                }
                layer.strokeWeight(2)
                layer.rect(0,0,60,cap*20)
                layer.rect(0,0,20,cap*20)
                switch(cap){
                    case 2:
                        layer.line(-30,0,30,0)
                    break
                    case 3:
                        layer.rect(0,0,60,20)
                    break
                }
                layer.fill(...this.color.block,this.fade.main)
                layer.stroke(...this.color.grid,this.fade.main)
                for(let a=0,la=this.set.length;a<la;a++){
                    for(let b=0,lb=this.set[a][1]-this.set[a][0];b<lb;b++){
                        layer.rect(-20+a*20,cap*10-10-this.set[a][0]*20-b*20,20)
                    }
                }
            break
            case 13:
                layer.fill(...this.color.block,this.fade.main)
                layer.stroke(...this.color.grid,this.fade.main)
                layer.strokeWeight(2)
                for(let a=0,la=this.set.length;a<la;a++){
                    for(let b=0,lb=this.set[a][1]-this.set[a][0];b<lb;b++){
                        layer.rect(-20+a*20,-10-this.set[a][0]*20-b*20,20)
                    }
                }
            break
            case 14:
                for(let a=0,la=4;a<la;a++){
                    if(lcos(this.direction+a/la*360)>=0){
                        layer.fill(...this.color.base,this.fade.main)
                        layer.rect(this.width/2*lsin(this.direction+a/la*360),0,this.width*lcos(this.direction+a/la*360),this.height)
                        layer.fill(...this.color.over,this.fade.main)
                        layer.rect(this.width/2*lsin(this.direction+a/la*360),0,(this.width-8)*lcos(this.direction+a/la*360),this.height-8)
                        layer.fill(...this.color.button,this.fade.main)
                        layer.ellipse(this.width/2*lsin(this.direction+a/la*360)-(this.width-16)/2*lcos(this.direction+a/la*360),-this.height/2+8,4*lcos(this.direction+a/la*360),4)
                        layer.ellipse(this.width/2*lsin(this.direction+a/la*360)-(this.width-16)/2*lcos(this.direction+a/la*360),this.height/2-8,4*lcos(this.direction+a/la*360),4)
                        layer.ellipse(this.width/2*lsin(this.direction+a/la*360)+(this.width-16)/2*lcos(this.direction+a/la*360),-this.height/2+8,4*lcos(this.direction+a/la*360),4)
                        layer.ellipse(this.width/2*lsin(this.direction+a/la*360)+(this.width-16)/2*lcos(this.direction+a/la*360),this.height/2-8,4*lcos(this.direction+a/la*360),4)
                        layer.fill(...(a==0?this.color.success:this.color.fail),this.fade.main)
                        layer.ellipse(this.width/2*lsin(this.direction+a/la*360),0,12*lcos(this.direction+a/la*360),12)
                    }
                }
            break
            case 16:
                layer.fill(...this.color.base[0],this.fade.main)
                layer.ellipse(0,0,this.width,this.height)
                layer.fill(...this.color.base[1],this.fade.main)
                layer.rect(0,45,80,60,5)
                this.player.display()
            break
            case 17:
                layer.fill(...this.color.base[0],this.fade.main)
                layer.rect(0,0,this.width+2,this.height+2)
                layer.fill(...this.color.base[1],this.fade.main)
                layer.rect(0,0,this.width-2,this.height-2)
                if(this.projectile!=-1){
                    this.projectile.display()
                }
            break
            case 18:
                layer.fill(...this.color.base[0],this.fade.main)
                layer.rect(0,0,this.width+2,this.height+2)
                layer.fill(...this.color.base[1],this.fade.main)
                layer.rect(0,0,this.width-2,this.height-2)
                layer.fill(...this.color.conveyor[0],this.fade.main)
                layer.rect(-6,0,this.width-10,28,4)
                layer.rect(-14,0,this.width-26,28)
                layer.fill(...this.color.conveyor[1],this.fade.main)
                for(let a=0,la=5;a<la;a++){
                    layer.rect(-19-this.anim%8+a*8,0,2,28)
                }
                layer.noFill()
                layer.stroke(...this.color.conveyor[2],this.fade.main)
                layer.strokeWeight(2)
                regTriangle(layer,-4,0,8,8,30)
                if(this.projectile!=-1){
                    this.projectile.display()
                }
            break
            case 19:
                layer.fill(...this.color.base[0],this.fade.main)
                layer.rect(0,0,this.width+2,this.height+2)
                layer.fill(...this.color.base[1],this.fade.main)
                layer.rect(0,0,this.width-2,this.height-2)
                layer.fill(...this.color.conveyor[0],this.fade.main)
                layer.rect(-6,0,this.width-10,28,4)
                layer.rect(-14,0,this.width-26,28)
                layer.fill(...this.color.conveyor[1],this.fade.main)
                for(let a=0,la=5;a<la;a++){
                    layer.rect(-27+this.anim%8+a*8,0,2,28)
                }
                layer.noFill()
                layer.stroke(...this.color.conveyor[2],this.fade.main)
                layer.strokeWeight(2)
                regTriangle(layer,-6,0,8,8,90)
                if(this.projectile!=-1){
                    this.projectile.display()
                }
            break
            case 20:
                layer.fill(...this.color.base[0],this.fade.main)
                layer.rect(0,0,this.width+2,this.height+2)
                layer.fill(...this.color.base[1],this.fade.main)
                layer.rect(0,0,this.width-2,this.height-2)
                layer.fill(...this.color.burner[0],this.fade.main)
                layer.rect(0,0,32,32,10)
                layer.noFill()
                layer.stroke(...this.color.burner[1],this.fade.main)
                layer.strokeWeight(2)
                layer.ellipse(0,0,22)
                layer.ellipse(0,0,12)
                layer.line(-6,0,-11,0)
                layer.line(0,-6,0,-11)
                layer.line(6,0,11,0)
                layer.line(0,6,0,11)
                layer.line(-8,-8,-10.5,-10.5)
                layer.line(-8,8,-10.5,10.5)
                layer.line(8,-8,10.5,-10.5)
                layer.line(8,8,10.5,10.5)
                if(this.projectile!=-1){
                    if(this.projectile.variant==4||this.projectile.variant==5){
                        this.projectile.held=false
                    }
                    this.projectile.display()
                }
            break
            case 21:
                layer.fill(...this.color.base[0],this.fade.main)
                layer.rect(0,0,this.width+2,this.height+2)
                layer.fill(...this.color.base[1],this.fade.main)
                layer.rect(0,0,this.width-2,this.height-2)
                layer.fill(...this.color.base[2],this.fade.main)
                layer.rect(0,0,32,32,10)
                layer.fill(220,220,160,this.fade.main)
                layer.ellipse(0,0,20)
                for(let a=0,la=this.spots.length;a<la;a++){
                    layer.ellipse(this.spots[a][0],this.spots[a][1],this.spots[a][2])
                }
            break
            case 22:
                layer.fill(...this.color.base[0],this.fade.main)
                layer.rect(0,0,this.width+2,this.height+2)
                layer.fill(...this.color.base[1],this.fade.main)
                layer.rect(0,0,this.width-2,this.height-2)
                layer.fill(...this.color.base[2],this.fade.main)
                layer.rect(0,0,32,32,10)
                for(let a=0,la=this.spots.length;a<la;a++){
                    layer.push()
                    layer.translate(this.spots[a][0],this.spots[a][1])
                    layer.rotate(this.spots[a][2])
                    layer.stroke(180,100,80,this.fade.main)
                    layer.strokeWeight(1)
                    layer.line(-3,-2,0,-5)
                    layer.line(3,-2,0,-5)
                    layer.noStroke()
                    layer.fill(200,0,80,this.fade.main)
                    layer.ellipse(-3.5,0,6)
                    layer.ellipse(3.5,0,6)
                    layer.fill(240,80,120,this.fade.main)
                    layer.ellipse(-3.5,0,4)
                    layer.ellipse(3.5,0,4)
                    layer.pop()
                }
            break
            case 23:
                layer.fill(...this.color.base[0],this.fade.main)
                layer.rect(0,0,this.width+2,this.height+2)
                layer.fill(...this.color.base[1],this.fade.main)
                layer.rect(0,0,this.width-2,this.height-2)
                layer.fill(...this.color.base[2],this.fade.main)
                layer.rect(0,0,32,24,6)
                layer.fill(...this.color.base[3],this.fade.main)
                layer.rect(0,-12,5,10,3)
                layer.fill(...this.color.base[4],this.fade.main)
                layer.ellipse(0,2,12)
                if(this.projectile!=-1){
                    if(this.projectile.variant==8){
                        this.projectile.held=false
                    }
                    this.projectile.display()
                }
            break
            case 24:
                layer.fill(...this.color.base[0],this.fade.main)
                layer.rect(0,0,this.width+2,this.height+2)
                layer.fill(...this.color.base[1],this.fade.main)
                layer.rect(0,0,this.width-2,this.height-2)
                layer.fill(...this.color.base[2],this.fade.main)
                layer.rect(0,0,36,28,8)
                layer.fill(...this.color.pin,this.fade.main)
                layer.rect(-10,0,6,24,3)
                layer.ellipse(-10,-14,3,8)
                layer.ellipse(-10,14,3,8)
                if(this.projectile!=-1){
                    if(this.projectile.variant==1){
                        this.projectile.held=false
                    }
                    this.projectile.display()
                }
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
                if(this.timer.main>this.anim.offset){
                    this.move(0,((this.timer.main-this.anim.offset)%150<75?-1:1)*2)
                }
            break
            case 3:
                if(this.select.trigger&&this.select.anim<1){
                    this.select.anim+=0.1
                    this.color.base[0]+=0.1*this.select.color[0]
                    this.color.base[1]+=0.1*this.select.color[1]
                    this.color.base[2]+=0.1*this.select.color[2]
                }
                this.anim.disable=smoothAnim(this.anim.disable,this.select.disable,0,1,5)
            break
            case 4: case 5:
                this.anim.active=smoothAnim(this.anim.active,(this.timer.main+this.offset.time)%this.cycle<this.cycle-90,0,1,10)
            break
            case 12:
                if(this.select.trigger&&this.select.anim<1){
                    this.select.anim+=0.1
                    this.color.base[0]+=0.1*this.select.color[0]
                    this.color.base[1]+=0.1*this.select.color[1]
                    this.color.base[2]+=0.1*this.select.color[2]
                }
                if(this.fade.main<=0&&!this.fade.trigger){
                    this.remove=true
                }
            break
            case 13:
                if(this.fall>0){
                    this.fall-=5
                    this.position.y+=5
                }
            break
            case 14:
                if(this.hit.trigger&&this.direction%90<15&&this.direction%90>=this.maxSpeed){
                    this.direction=round(this.direction-this.angularSpeed)
                    if(this.angularSpeed<this.maxSpeed){
                        this.angularSpeed+=0.2
                    }
                }else if(this.hit.trigger&&this.direction%90<this.maxSpeed){
                    this.direction=floor(this.direction%360/90)*90
                    this.hit.time++
                    if(lcos(this.direction)>=0.5){
                        if(this.hit.time==30){
                            parent.entities.walls.splice(0,0,new wall(this.layer,this.position.x,this.position.y+135,60,20,15,{base:[[225,75,75],[225,150,75],[225,225,75],[75,225,75],[75,150,225],[150,75,225]][this.stack%6],over:[[180,60,60],[180,120,60],[180,180,60],[60,180,60],[60,120,180],[120,60,180]][this.stack%6]}))
                            for(let a=0,la=8;a<la;a++){
                                parent.entities.walls[0].ladder(a,[])
                            }
                            this.stack++
                        }
                        if(this.hit.time>=40&&this.hit.time<80){
                            this.move(0,-this.lift)
                            if(this.stack>=18){
                                this.lift+=0.2
                            }
                        }
                        if(this.hit.time==90){
                            this.hit.trigger=false
                            this.hit.time=0
                            this.angularSpeed=0
                            this.maxSpeed+=0.4
                        }
                    }else{
                        if(this.hit.time==30){
                            this.hit.trigger=false
                            this.hit.time=0
                            this.angularSpeed=0
                        }
                    }
                }else{
                    this.direction=round(this.direction+this.angularSpeed)
                    if(this.angularSpeed<this.maxSpeed){
                        this.angularSpeed+=0.2
                    }
                }
            break
            case 15:
                if(this.rise>0){
                    this.rise-=0.5
                    this.move(0,-0.5)
                }
            break
            case 16:
                if(this.timer.shuffle==0){
                    this.timer.shuffle=floor(random(210,270))
                }else{
                    this.timer.shuffle--
                    if(this.timer.shuffle>=30&&this.timer.shuffle<155&&this.timer.shuffle%5==0){
                        let dir=random(0,360)
                        let r=sqrt(random(0,(this.radius-5)**2))
                        parent.entities.projectiles.push(new projectile(this.layer,
                            this.position.x+lsin(dir)*r,
                            this.position.y+lcos(dir)*r,
                            15,{direction:atan2(
                                parent.entities.players[this.copy].position.x+parent.entities.players[this.copy].velocity.x*40-this.position.x+lsin(dir)*r,
                                parent.entities.players[this.copy].position.y+parent.entities.players[this.copy].velocity.y*40-this.position.y+lcos(dir)*r
                            )+random(-10,10)}))
                    }else if(this.timer.shuffle==155){
                        this.timer.shuffle-=floor(random(0,25))
                    }else if(this.timer.shuffle>=180&&this.timer.shuffle%10==0){
                        let possible=[]
                        for(let a=0,la=parent.entities.players.length;a<la;a++){
                            if(a!=this.copy){
                                possible.push(a)
                            }
                        }
                        this.copy=possible[floor(random(0,possible.length))]
                        this.player.color=this.player.copyColor(parent.entities.players[this.copy].color)
                    }
                }
            break
            case 17: case 18: case 19: case 20: case 23: case 24:
                if(this.projectile!=-1){
                    this.projectile.update()
                    if(this.type==18){
                        this.projectile.fade.trigger=this.projectile.variant!=6&&this.projectile.variant!=7
                        if(this.projectile.variant==6||this.projectile.variant==7){
                            this.anim++
                        }
                        if(this.projectile.fade.main<=0){
                            if(this.projectile.variant==7){
                                parent.result.score[this.id]++
                                for(let a=0,la=parent.entities.walls[this.id].length;a<la;a++){
                                    if(dist(parent.entities.walls[this.id][a].position.x,parent.entities.walls[this.id][a].position.y,this.position.x,this.position.y+100)<10){
                                        parent.entities.walls[this.id][a].saved++
                                    }
                                }
                            }
                            this.projectile=-1
                        }
                    }else{
                        this.projectile.fade.trigger=true
                    }
                }
                if(this.type==19){
                    if(this.projectile==-1&&this.saved>0){
                        this.saved--
                        this.projectile=new projectile(this.layer,0,0,16,{variant:8})
                        this.projectile.fade.main=0
                        this.anim++
                    }
                    if(this.projectile!=-1&&this.projectile.fade.main<1){
                        this.anim++
                    }
                }
                if(this.type==20&&this.projectile!=-1&&(this.projectile.variant==4||this.projectile.variant==5)){
                    this.projectile.process.main++
                }
            break
        }
    }
    collide(type,obj,parent){
        switch(this.type){
            case 0: case 1: case 2: case 8: case 9: case 10: case 11: case 14: case 15: case 17:
            case 18: case 19: case 20: case 21: case 22: case 23: case 24:
                switch(type){
                    case 0:
                        if(inBoxBox(this.bounder,obj)){
                            let edge=collideBoxBox(this,obj)
                            if(edge>=0){
                                switch(this.type){
                                    case 1: case 8:
                                        return [1,obj.id]
                                    case 10: case 11:
                                        return [1,this.text]
                                    default:
                                        switch(edge){
                                            case 0:
                                                obj.position.y=this.position.y+this.height/2+obj.height/2
                                                obj.velocity.y=max(0,obj.velocity.y)+this.velocity.y
                                                obj.collided.wall[0]=max(2,obj.collided.wall[0])
                                                switch(this.type){
                                                    case 14:
                                                        this.hit.trigger=true
                                                    break
                                                }
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
                    case 1:
                        if(inCircleBox(obj,this)){
                            switch(this.type){
                                case 1: case 8:
                                    return [1,obj.id]
                                case 10: case 11:
                                    return [1,this.text]
                                default:
                                    let basis={x:constrain(obj.position.x,this.position.x-this.width/2,this.position.x+this.width/2),y:constrain(obj.position.y,this.position.y-this.height/2,this.position.y+this.height/2)}
                                    let dir=dirPos({position:basis},obj)
                                    obj.position.x=basis.x+lsin(dir)*obj.radius
                                    obj.position.y=basis.y+lcos(dir)*obj.radius
                                break
                            }
                        }
                    break
                    case 2:
                        if(inBoxBox(this.outerBounder,obj)){
                            let edge=collideBoxBox(this,obj)
                            if(edge>=0){
                                switch(this.type){
                                    default:
                                        switch(edge){
                                            case 0:
                                                if(obj.velocity.y<0){
                                                    obj.position.y=this.position.y+this.height/2+obj.height/2
                                                    obj.velocity.y*=-1
                                                }
                                            break
                                            case 1:
                                                if(obj.velocity.y>0){
                                                    obj.position.y=this.position.y-this.height/2-obj.height/2
                                                    obj.velocity.y*=-1
                                                }
                                            break
                                            case 2:
                                                if(obj.velocity.x<0){
                                                    obj.position.x=this.position.x+this.width/2+obj.width/2
                                                    obj.velocity.x*=-1
                                                }
                                            break
                                            case 3:
                                                if(obj.velocity.x>0){
                                                    obj.position.x=this.position.x-this.width/2-obj.width/2
                                                    obj.velocity.x*=-1
                                                }
                                            break
                                        }
                                    break
                                }
                            }
                        }
                    break
                    case 3:
                        if(inCircleBox(obj,this)){
                            switch(this.type){
                                case 1:
                                    return [0]
                                default:
                                    let basis={x:constrain(obj.position.x,this.position.x-this.width/2,this.position.x+this.width/2),y:constrain(obj.position.y,this.position.y-this.height/2,this.position.y+this.height/2)}
                                    let dir=dirPos({position:basis},obj)
                                    obj.position.x=basis.x+lsin(dir)*obj.radius
                                    obj.position.y=basis.y+lcos(dir)*obj.radius
                                    let magnitude=magVec(obj.velocity)
                                    let incident=atan2(obj.velocity.x,obj.velocity.y)
                                    obj.velocity.x=lsin(180+dir*2-incident)*magnitude
                                    obj.velocity.y=lcos(180+dir*2-incident)*magnitude
                                break
                            }
                        }
                    break
                }
            break
            case 4: case 5:
                switch(type){
                    case 1:
                        if(inCircleBox(obj,this)&&this.anim.active>=1){
                            obj.dead.trigger=true
                        }
                    break
                }
            break
            case 6: case 7:
                switch(type){
                    case 1:
                        if(inCircleBox(obj,this)){
                            obj.dead.trigger=true
                        }
                    break
                }
            break
            case 16:
                if(distPos(this,obj)<this.radius+obj.radius){
                    let dir=dirPos(this,obj)
                    let dist=this.radius+obj.radius-distPos(this,obj)
                    obj.position.x+=dist*lsin(dir)
                    obj.position.y+=dist*lcos(dir)
                }
            break
        }
        return [0,0]
    }
}