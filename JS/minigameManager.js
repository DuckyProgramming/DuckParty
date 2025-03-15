class minigameManager{
    constructor(layer,operation){
        this.layer=layer
        this.operation=operation
        this.minigame=0
        this.generator={}
        this.entities={}
        this.graphics={main:[]}
        this.control={timer:0,bound:[],spawner:{}}
        this.result={end:false,winner:[],anim:0,score:[]}
        this.subResult={end:false,winner:[],anim:0}
    }
    reset(){
        switch(this.minigame){
            case 0:
                this.entities={players:[],projectiles:[]}
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.entities.players.push(new player(this.layer,this.layer.width/2+100-la*100+a*200,this.layer.height/2,1,a,this.operation.player[a]))
                }
                for(let a=0,la=10;a<la;a++){
                    for(let b=0,lb=2;b<lb;b++){
                        this.entities.projectiles.push(new projectile(this.layer,this.layer.width*(a+1)/(la+1),this.layer.height*(0.1+b*0.8),0,{direction:random(0,360)}))
                    }
                }
                this.control.bound={width:this.layer.width,height:this.layer.height}
            break
            case 1:
                let extent=4
                this.graphics={main:[]}
                this.entities={players:[],walls:[[],[],[],[]],projectiles:[[],[],[],[]]}
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.graphics.main.push(createGraphics(this.layer.width/4,this.layer.height))
                    setupLayer(this.graphics.main[a])
                    this.entities.players.push(new player(this.graphics.main[a],this.layer.width/8,this.layer.height*extent-50,0,a,this.operation.player[a]))
                    this.entities.walls.push([])
                    this.entities.walls[a].push(new wall(this.graphics.main[a],120,30,200,30,1,{base:[[225,225,225],[50,50,50]]}))
                    this.entities.walls[a].push(new wall(this.graphics.main[a],10,this.layer.height*extent/2,20,this.layer.height*extent,0,{base:[100,100,100]}))
                    this.entities.walls[a].push(new wall(this.graphics.main[a],230,this.layer.height*extent/2,20,this.layer.height*extent,0,{base:[100,100,100]}))
                    this.entities.walls[a].push(new wall(this.graphics.main[a],120,this.layer.height*extent+20,200,100,0,{base:[100,100,100]}))
                    let ticker=floor(random(0,6))
                    for(let b=0,lb=24;b<lb;b++){
                        this.entities.walls[a].push(new wall(this.graphics.main[a],[75-floor(random(0,2))*30,105+floor(random(0,2))*30,165+floor(random(0,2))*30,105+floor(random(0,2))*30][b%4],this.layer.height*extent-37.5-(this.layer.height*extent-225)*(b+0.5)/lb,30,30,2,{base:[[225,75,75],[225,150,75],[225,225,75],[75,225,75],[75,150,225],[150,75,225]][ticker%6],over:[[180,60,60],[180,120,60],[180,180,60],[60,180,60],[60,120,180],[120,60,180]][ticker%6]}))
                        ticker+=floor(random(0,2))+1
                    }
                }
                this.control.bound={width:this.layer.width/4,height:this.layer.height*extent}
                this.control.spawner={tick:0,time:240,group:4}
            break
        }
    }
    setup(){
        this.control.timer=0
        switch(this.minigame){
            case 0:
                this.result.score=[]
                this.reset()
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.result.score.push(0)
                }
            break
            case 1:
                this.result.score=[]
                this.reset()
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.result.score.push(0)
                }
            break
        }
    }
    display(scene){
        switch(scene){
            case 'minigame':
                switch(this.minigame){
                    case 0:
                        this.layer.background(0)
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].display()
                        }
                        for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                            this.entities.projectiles[a].display()
                        }
                        this.layer.fill(255)
                        this.layer.textAlign(LEFT,CENTER)
                        this.layer.textSize(12)
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.layer.text(types.player[this.operation.player[a]].name+`: `+this.result.score[a],5,12+a*16)
                        }
                        this.layer.textAlign(CENTER,CENTER)
                    break
                    case 1:
                        for(let a=0,la=this.graphics.main.length;a<la;a++){
                            let layer=this.graphics.main[a]
                            layer.background(0)
                            layer.push()
                            layer.translate(0,layer.height/2-constrain(this.entities.players[a].position.y,layer.height/2,this.control.bound.height-layer.height/2))

                            this.entities.players[a].display()
                            for(let b=0,lb=this.entities.walls[a].length;b<lb;b++){
                                this.entities.walls[a][b].display()
                            }
                            for(let b=0,lb=this.entities.projectiles[a].length;b<lb;b++){
                                this.entities.projectiles[a][b].display()
                            }

                            layer.pop()

                            this.layer.image(layer,this.layer.width*(a+0.5)/la,this.layer.height/2,this.layer.width/la,this.layer.height)
                        }
                    break
                }
                if(this.result.anim>0){
                    this.layer.fill(255,this.result.anim)
                    this.layer.textSize(50)
                    let winners=``
                    for(let a=0,la=this.result.winner.length;a<la;a++){
                        winners+=(a>0?`, `:``)+types.player[this.operation.player[this.result.winner[a]]].name
                    }
                    this.layer.text((winners==``?`Nobody`:winners)+` Win!`,this.layer.width/2,this.layer.height/2)
                }else if(this.subResult.anim>0){
                    this.layer.fill(255,this.subResult.anim)
                    this.layer.textSize(50)
                    let winners=``
                    for(let a=0,la=this.subResult.winner.length;a<la;a++){
                        winners+=(a>0?`, `:``)+types.player[this.operation.player[this.subResult.winner[a]]].name
                    }
                    this.layer.text((winners==``?`Nobody`:winners)+` Win Round`,this.layer.width/2,this.layer.height/2)
                }
            break
        }
    }
    update(scene){
        switch(scene){
            case 'minigame':
                this.control.timer++
                switch(this.minigame){
                    case 0:
                        let survive=0
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].update(this)
                            for(let b=a+1,lb=this.entities.players.length;b<lb;b++){
                                this.entities.players[a].collide(0,this.entities.players[b],this)
                            }
                            if(this.entities.players[a].active){
                                survive++
                            }
                            if(this.entities.players[a].remove){
                                this.entities.players.splice(a,1)
                                a--
                                la--
                            }
                        }
                        for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                            this.entities.projectiles[a].update(this)
                            for(let b=0,lb=this.entities.players.length;b<lb;b++){
                                this.entities.projectiles[a].collide(0,this.entities.players[b],this)
                            }
                            for(let b=a+1,lb=this.entities.projectiles.length;b<lb;b++){
                                this.entities.projectiles[a].collide(1,this.entities.projectiles[b],this)
                            }
                            if(this.entities.projectiles[a].remove){
                                this.entities.projectiles.splice(a,1)
                                a--
                                la--
                            }
                        }
                        if(survive<=1){
                            this.subResult.end=true
                            this.subResult.winner=[]
                            for(let a=0,la=this.entities.players.length;a<la;a++){
                                if(this.entities.players[a].active){
                                    this.subResult.winner.push(a)
                                }
                            }
                            for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                                this.entities.projectiles[a].active=false
                            }
                        }
                        if(this.subResult.end&&!this.result.end){
                            if(this.subResult.anim<9){
                                this.subResult.anim+=0.1
                            }else{
                                for(let a=0,la=this.subResult.winner.length;a<la;a++){
                                    this.result.score[this.subResult.winner[a]]++
                                    if(this.result.score[this.subResult.winner[a]]>=5){
                                        this.result.end=true
                                    }
                                }
                                if(this.result.end){
                                    this.result.winner=[]
                                    for(let a=0,la=this.entities.players.length;a<la;a++){
                                        if(this.result.score[a]>=5){
                                            this.result.winner.push(a)
                                        }
                                    }
                                }else{
                                    this.reset()
                                    this.subResult.end=false
                                    this.subResult.anim=0
                                }
                            }
                        }
                        if(this.result.end&&this.result.anim<1){
                            this.result.anim+=0.1
                        }
                    break
                    case 1:
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].update(this)
                            if(this.entities.players[a].remove){
                                this.entities.players.splice(a,1)
                                a--
                                la--
                            }
                        }
                        for(let a=0,la=this.entities.walls.length;a<la;a++){
                            for(let b=0,lb=this.entities.walls[a].length;b<lb;b++){
                                this.entities.walls[a][b].update(this)
                                let result=this.entities.walls[a][b].collide(0,this.entities.players[a],this)
                                switch(result[0]){
                                    case 1:
                                        if(!this.result.end){
                                            this.result.end=true
                                            this.result.winner=[result[1]]
                                        }
                                    break
                                }
                            }
                        }
                        for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                            for(let b=0,lb=this.entities.projectiles[a].length;b<lb;b++){
                                this.entities.projectiles[a][b].update(this)
                                this.entities.projectiles[a][b].collide(2,this.entities.players[a],this)
                                for(let c=b+1,lc=this.entities.projectiles[a].length;c<lc;c++){
                                    this.entities.projectiles[a][b].collide(1,this.entities.projectiles[a][c],this)
                                }
                                if(this.entities.projectiles[a][b].remove){
                                    this.entities.projectiles[a].splice(b,1)
                                    b--
                                    lb--
                                }
                            }
                        }
                        if(this.control.spawner.time<=0){
                            let divider=floor(random(0,2))
                            this.entities.projectiles[this.control.spawner.tick].push(new projectile(this.graphics.main[this.control.spawner.tick],-15+divider*270,constrain(this.entities.players[this.control.spawner.tick].position.y,this.graphics.main[this.control.spawner.tick].height/2,this.control.bound.height-this.graphics.main[this.control.spawner.tick].height/2)-this.layer.height*random(0.3,0.5),1,{direction:random(45,135)+divider*180}))
                            if(this.control.spawner.group>0){
                                this.control.spawner.time=random(5,10)
                                this.control.spawner.group--
                            }else{
                                this.control.spawner.time=random(240,480)
                                this.control.spawner.group=floor(random(4,17))
                            }
                            this.control.spawner.tick=(this.control.spawner.tick+1)%this.entities.players.length
                        }else{
                            this.control.spawner.time--
                        }
                        if(this.result.end&&this.result.anim<1){
                            this.result.anim+=0.1
                        }
                    break
                }
            break
        }
    }
}