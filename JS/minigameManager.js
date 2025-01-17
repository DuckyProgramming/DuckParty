class minigameManager{
    constructor(layer,operation){
        this.layer=layer
        this.operation=operation
        this.minigame=0
        this.generator={}
        this.entities={}
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
            break
        }
    }
    setup(){
        switch(this.minigame){
            case 0:
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
                switch(this.minigame){
                    case 0:
                        let survive=0
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].update()
                            for(let b=a+1,lb=this.entities.players.length;b<lb;b++){
                                this.entities.players[a].collide(0,this.entities.players[b])
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
                            this.entities.projectiles[a].update()
                            for(let b=0,lb=this.entities.players.length;b<lb;b++){
                                this.entities.projectiles[a].collide(0,this.entities.players[b])
                            }
                            for(let b=a+1,lb=this.entities.projectiles.length;b<lb;b++){
                                this.entities.projectiles[a].collide(1,this.entities.projectiles[b])
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
                }
            break
        }
    }
}