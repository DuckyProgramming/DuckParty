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
        switch(this.type){
            case 2:
                this.anim={offset:random(0,150)}
            break
            case 3:
                this.text={main:'',size:0}
                this.select={trigger:false,disable:false,group:0,id:-1,color:[],anim:0}
                this.anim={disable:0}
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
            case 2:
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
                    case 1:
                        if(inCircleBox(obj,this)){
                            let basis={x:constrain(obj.position.x,this.position.x-this.width/2,this.position.x+this.width/2),y:constrain(obj.position.y,this.position.y-this.height/2,this.position.y+this.height/2)}
                            let dir=dirPos({position:basis},obj)
                            obj.position.x=basis.x+lsin(dir)*obj.radius
                            obj.position.y=basis.y+lcos(dir)*obj.radius
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
                }
            break
        }
        return [0,0]
    }
}