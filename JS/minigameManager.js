class minigameManager{
    constructor(layer,operation){
        this.layer=layer
        this.operation=operation
        this.minigame=0
        this.generator={}
        this.entities={}
    }
    setup(){
        switch(this.minigame){
            case 0:
                this.entities={players:[],projectiles:[]}
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.entities.players.push(new player(this.layer,this.layer.width/2+100-la*100+a*200,this.layer.height/2,1,a,this.operation.player[a]))
                }
                for(let a=0,la=8;a<la;a++){
                    for(let b=0,lb=2;b<lb;b++){
                        this.entities.projectiles.push(new projectile(this.layer,this.layer.width*(a+1)/(la+1),this.layer.height*(0.1+b*0.8),0,{direction:random(0,360)}))
                    }
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
                    break
                }
            break
        }
    }
    update(scene){
        switch(scene){
            case 'minigame':
                switch(this.minigame){
                    case 0:
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].update()
                            for(let b=a+1,lb=this.entities.players.length;b<lb;b++){
                                this.entities.players[a].collide(0,this.entities.players[b])
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
                    break
                }
            break
        }
    }
}