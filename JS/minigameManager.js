class minigameManager{
    constructor(layer,operation){
        this.layer=layer
        this.operation=operation
        this.minigame=0
        this.generator={}
        this.entities={}
        this.graphics={main:[]}
        this.control={timer:0,bound:[],spawner:{},endRound:{}}
        this.teams={split:[]}
        this.result={end:false,winner:[],anim:0,score:[],timer:[]}
        this.payout={main:[],root:10,mult:1,add:[]}
        this.subResult={end:false,winner:[],anim:0}
    }
    arbitraryTeams(){
        this.teams.split=[]
        switch(types.minigame[this.minigame].player){
            case 2:
                let possible=range(0,this.operation.player.length)
                for(let a=0,la=floor(this.operation.player.length/2);a<la;a++){
                    let index=floor(random(0,possible.length))
                    this.teams.split.push(possible[index])
                    possible.splice(index,1)
                }
            break
            case 3:
                this.teams.split.push(floor(random(0,this.operation.player.length)))
            break
        }
    }
    reset(){
        this.payout.main=[]
        this.payout.add=[]
        for(let a=0,la=this.operation.player.length;a<la;a++){
            this.payout.add.push(0)
        }
        let ticker
        let spawnable
        switch(this.minigame){
            case 0:
                this.entities={players:[],projectiles:[]}
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.entities.players.push(new player(this.layer,this.layer.width/2+100-la*100+a*200,this.layer.height/2,1,0,a,this.operation.player[a]))
                }
                for(let a=0,la=10;a<la;a++){
                    for(let b=0,lb=2;b<lb;b++){
                        this.entities.projectiles.push(new projectile(this.layer,this.layer.width*(a+1)/(la+1),this.layer.height*(0.1+b*0.8),0,{direction:random(0,360)}))
                    }
                }
                this.control.bound={base:{x:0,y:0},width:this.layer.width,height:this.layer.height,radius:0}
            break
            case 1:
                let extent=4
                this.graphics={main:[]}
                this.entities={players:[],walls:[],projectiles:[]}
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.graphics.main.push(createGraphics(this.layer.width/4,this.layer.height))
                    setupLayer(this.graphics.main[a])
                    this.entities.players.push(new player(this.graphics.main[a],this.layer.width/8,this.layer.height*extent-50,0,0,a,this.operation.player[a]))
                    this.entities.walls.push([])
                    this.entities.projectiles.push([])
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
                this.control.bound={base:{x:0,y:0},width:this.layer.width/4,height:this.layer.height*extent,radius:0}
                this.control.spawner={tick:0,time:240,group:4}
            break
            case 2:
                ticker=0
                this.entities={players:[]}
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    if(this.teams.split.includes(a)){
                        this.entities.players.push(new player(this.layer,this.layer.width/2,this.layer.height/2-100,1,2,a,this.operation.player[a]))
                    }else{
                        this.entities.players.push(new player(this.layer,this.layer.width/2+150-la*75+ticker*150,this.layer.height/2+100,1,1,a,this.operation.player[a]))
                        ticker++
                    }
                }
                this.control.bound={base:{x:0,y:0},width:this.layer.width,height:this.layer.height,radius:this.layer.height*0.45}
            break
            case 3:
                this.entities={players:[],walls:[]}
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.entities.players.push(new player(this.layer,this.layer.width/2+100-la*100+a*200,this.layer.height*0.9,2,0,a,this.operation.player[a]))
                }
                let gridWidth=18
                let gridHeight=10
                let grid=[]
                let remain=[]
                for(let a=0,la=gridWidth;a<la;a++){
                    grid.push([])
                    for(let b=0,lb=gridHeight;b<lb;b++){
                        grid[a].push(-1)
                        remain.push([a,b])
                    }
                }
                let size=shuffleArray([19,20,21,22,23,24,25,26])
                let set=0
                while(remain.length>0){
                    let sizing=size[set]
                    let loc=[]
                    loc.push(remain[floor(random(0,remain.length))])
                    while(sizing>0){
                        grid[loc[0][0]][loc[0][1]]=set
                        for(let a=0,la=remain.length;a<la;a++){
                            if(remain[a][0]==loc[0][0]&&remain[a][1]==loc[0][1]){
                                remain.splice(a,1)
                                a=la
                            }
                        }
                        sizing--
                        let move=[]
                        while(move.length==0&&loc.length>0){
                            if(loc[0][0]>0&&grid[loc[0][0]-1][loc[0][1]]==-1){
                                move.push(0)
                            }
                            if(loc[0][0]<gridWidth-1&&grid[loc[0][0]+1][loc[0][1]]==-1){
                                move.push(1)
                            }
                            if(loc[0][1]>0&&grid[loc[0][0]][loc[0][1]-1]==-1){
                                move.push(2)
                            }
                            if(loc[0][1]<gridHeight-1&&grid[loc[0][0]][loc[0][1]+1]==-1){
                                move.push(3)
                            }
                            if(move.length==0){
                                loc.splice(0,1)
                            }
                        }
                        if(move.length>0){
                            switch(move[floor(random(0,move.length))]){
                                case 0: loc.splice(0,0,[loc[0][0]-1,loc[0][1]]); break
                                case 1: loc.splice(0,0,[loc[0][0]+1,loc[0][1]]); break
                                case 2: loc.splice(0,0,[loc[0][0],loc[0][1]-1]); break
                                case 3: loc.splice(0,0,[loc[0][0],loc[0][1]+1]); break
                            }
                        }else{
                            loc.push(remain[floor(random(0,remain.length))])
                        }
                    }
                    set++
                }
                let offset=floor(random(0,size.length))
                for(let a=0,la=grid.length;a<la;a++){
                    for(let b=0,lb=grid[a].length;b<lb;b++){
                        this.entities.walls.push(new wall(this.layer,this.layer.width*0.5+a*36-la*18+18,this.layer.height*0.5+b*36-lb*18+18,32,32,3,{base:[0,0,0],over:[[225,0,0],[225,125,0],[225,225,0],[0,225,0],[0,225,225],[0,0,225],[225,0,225],[255,125,125]][(grid[a][b]+offset)%size.length],text:[0,0,0]}))
                        this.entities.walls[this.entities.walls.length-1].select.group=grid[a][b]
                    }
                }
                this.control.endRound={trigger:false,tick:0,timer:0,left:[]}
            break
            case 4:
                ticker=0
                this.entities={players:[],projectiles:[]}
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    if(this.teams.split.includes(a)){
                        this.entities.players.push(new player(this.layer,this.layer.width/2,this.layer.height/2-100,1,3,a,this.operation.player[a]))
                    }else{
                        this.entities.players.push(new player(this.layer,this.layer.width/2+150-la*75+ticker*150,this.layer.height/2+100,1,0,a,this.operation.player[a]))
                        ticker++
                    }
                }
                this.control.bound={base:{x:0,y:0},width:this.layer.width,height:this.layer.height,radius:0}
            break
            case 5:
                ticker=[floor(random(0,this.teams.split.length)),floor(random(0,this.operation.player.length-this.teams.split.length))]
                this.entities={players:[],projectiles:[]}
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    if(this.teams.split.includes(a)){
                        for(let b=0,lb=this.operation.player.length==3?2:1;b<lb;b++){
                            this.entities.players.push(new player(this.layer,this.layer.width/2-250+ticker[0]*100,this.layer.height/2-100+ticker[0]*200,1,4,a,this.operation.player[a]))
                            last(this.entities.players).direction.main=90
                            last(this.entities.players).direction.goal=90
                            ticker[0]=1-ticker[0]
                            last(this.entities.players).scale(1.5)
                            if(b==1){
                                last(this.entities.players).hijack.reverse=true
                            }
                        }
                    }else{
                        this.entities.players.push(new player(this.layer,this.layer.width/2+250-ticker[1]*100,this.layer.height/2+100-ticker[1]*200,1,4,a,this.operation.player[a]))
                        last(this.entities.players).direction.main=-90
                        last(this.entities.players).direction.goal=-90
                        ticker[1]=1-ticker[1]
                        last(this.entities.players).scale(1.5)
                    }
                }
                this.control.bound={base:{x:0,y:100},width:this.layer.width,height:this.layer.height-200,radius:0}
                this.entities.projectiles.push(new projectile(this.layer,this.layer.width*0.5,this.layer.height*0.5,3,{direction:random(0,360)}))
            break
            case 6:
                this.entities={players:[]}
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.entities.players.push(new player(this.layer,this.layer.width/2-this.layer.height*0.3*lsin(a/la*360),this.layer.height/2-this.layer.height*0.3*lcos(a/la*360),3,0,a,this.operation.player[a]))
                    last(this.entities.players).direction.main=a/la*360
                    last(this.entities.players).direction.goal=a/la*360
                }
                this.control.bound={base:{x:0,y:0},width:this.layer.width,height:this.layer.height,radius:this.layer.height*0.45}
            break
            case 7:
                this.entities={players:[],projectiles:[]}
                this.control.cycle={phase:0,time:0,total:0}
                spawnable=range(0,this.operation.player.length)
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.entities.players.push(new player(this.layer,this.layer.width/2-this.layer.height*0.2*lsin(a/la*360),this.layer.height/2-this.layer.height*0.2*lcos(a/la*360),1,5,a,this.operation.player[a]))
                    last(this.entities.players).direction.main=a/la*360
                    last(this.entities.players).direction.goal=a/la*360
                    let index=floor(random(0,spawnable.length))
                    this.entities.projectiles.push(new projectile(this.layer,this.layer.width/2-65*lsin(a/la*360),this.layer.height/2-65*lcos(a/la*360),4,{direction:a/la*360,value:spawnable[index]}))
                    spawnable.splice(index,1)
                }
            break
            case 8:
                this.entities={players:[],projectiles:[]}
                this.control.cycle={phase:0,time:0,choices:[]}
                spawnable=[[1,1],[1,1,2],[1,1,2,2]][this.operation.player.length-2]
                for(let a=0,la=this.operation.player.length+1;a<la;a++){
                    this.control.cycle.choices.push([])
                }
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.entities.players.push(new player(this.layer,this.layer.width/2-this.layer.height*0.2*lsin(a/la*360),this.layer.height/2-this.layer.height*0.2*lcos(a/la*360),1,6,a,this.operation.player[a]))
                    last(this.entities.players).rotations=la
                    last(this.entities.players).direction.main=a/la*360
                    last(this.entities.players).direction.goal=a/la*360
                    let index=floor(random(0,spawnable.length))
                    this.entities.projectiles.push(new projectile(this.layer,this.layer.width/2-this.layer.height*0.2*lsin((a+0.5)/la*360)*(la==4?constants.sqrt2:1),this.layer.height/2-this.layer.height*0.2*lcos((a+0.5)/la*360)*(la==4?constants.sqrt2:1),4,{direction:a/la*360,value:spawnable[index]}))
                    spawnable.splice(index,1)
                }
                this.entities.projectiles.push(new projectile(this.layer,this.layer.width/2,this.layer.height/2,4,{direction:0,value:[2,3,3][this.operation.player.length-2]}))
            break
            case 9:
                this.control.sender=0
                this.entities={players:[],walls:[],projectiles:[]}
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.entities.players.push(new player(this.layer,this.layer.width/2+100-la*100+a*200,this.layer.height*0.9,0,1,a,this.operation.player[a]))
                }
                this.entities.walls.push(new wall(this.layer,this.layer.width/2,15,this.layer.width,30,0,{base:[100,100,100]}))
                this.entities.walls.push(new wall(this.layer,this.layer.width/2,this.layer.height-15,this.layer.width,30,0,{base:[100,100,100]}))
                this.entities.walls.push(new wall(this.layer,15,this.layer.height/2,30,this.layer.height-30,0,{base:[100,100,100]}))
                this.entities.walls.push(new wall(this.layer,this.layer.width-15,this.layer.height/2,30,this.layer.height-30,0,{base:[100,100,100]}))
                this.control.bound={base:{x:0,y:0},width:this.layer.width,height:this.layer.height,radius:0}
            break
            case 10:
                this.control.sender=0
                this.entities={players:[],projectiles:[]}
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.entities.players.push(new player(this.layer,this.layer.width/2-this.layer.height*0.2*lsin(a/la*360),this.layer.height/2-this.layer.height*0.2*lcos(a/la*360),1,7,a,this.operation.player[a]))
                    last(this.entities.players).direction.main=a/la*360
                    last(this.entities.players).direction.goal=a/la*360
                }
                this.control.bound={base:{x:0,y:0},width:this.layer.width,height:this.layer.height,radius:0}
            break
        }
    }
    setup(){
        this.control.timer=0
        switch(this.minigame){
            case 0: case 3: case 6: case 7: case 8: case 9: case 10:
                this.result.score=[]
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.result.score.push(0)
                }
                this.reset()
            break
            case 2:
                this.result.timer=[]
                this.result.timer.push(3600)
                this.reset()
            break
            case 4:
                this.result.timer=[]
                this.result.timer.push(1800)
                this.reset()
            break
            case 5:
                this.result.score=[0,0]
                this.reset()
            break
            default:
                this.reset()
            break
        }
    }
    display(scene){
        switch(scene){
            case 'minigame':
                this.layer.noStroke()
                switch(this.minigame){
                    case 0: case 10:
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
                        this.layer.background(100)
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
                            this.layer.image(layer,this.layer.width*(2.5-la/2+a)/4,this.layer.height/2,this.layer.width/4,this.layer.height)
                        }
                    break
                    case 2:
                        this.layer.background(100)
                        this.layer.fill(0)
                        this.layer.ellipse(this.layer.width/2,this.layer.height/2,this.layer.height*0.9)
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].display()
                        }
                        this.layer.fill(255)
                        this.layer.textAlign(LEFT,CENTER)
                        this.layer.textSize(12)
                        this.layer.text(formatTime(this.result.timer[0]),5,12)
                        this.layer.textAlign(CENTER,CENTER)
                    break
                    case 3:
                        this.layer.background(100)
                        for(let a=0,la=this.entities.walls.length;a<la;a++){
                            this.entities.walls[a].display()
                        }
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].display()
                        }
                        this.layer.fill(255)
                        this.layer.textAlign(LEFT,CENTER)
                        this.layer.textSize(12)
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.layer.text(types.player[this.operation.player[a]].name+`: `+this.result.score[a],5,12+a*16)
                        }
                        this.layer.textAlign(CENTER,CENTER)
                    break
                    case 4:
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
                        this.layer.text(formatTime(this.result.timer[0]),5,12)
                        this.layer.textAlign(CENTER,CENTER)
                    break
                    case 5:
                        this.layer.background(100)
                        this.layer.fill(200)
                        this.layer.rect(this.layer.width*0.5,this.layer.height*0.5,this.layer.width,150)
                        this.layer.rect(this.layer.width*0.5,this.layer.height*0.5,this.layer.width-200,this.layer.height-200)
                        this.layer.fill(150)
                        this.layer.rect(this.layer.width*0.5-250,this.layer.height*0.5,5,this.layer.height-200)
                        this.layer.rect(this.layer.width*0.5+250,this.layer.height*0.5,5,this.layer.height-200)
                        if(this.operation.player.length>=3){
                            this.layer.rect(this.layer.width*0.5-150,this.layer.height*0.5,5,this.layer.height-200)
                            this.layer.rect(this.layer.width*0.5+150,this.layer.height*0.5,5,this.layer.height-200)
                        }
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].display()
                        }
                        for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                            this.entities.projectiles[a].display()
                        }
                        this.layer.fill(255)
                        this.layer.textAlign(LEFT,CENTER)
                        this.layer.textSize(12)
                        this.layer.text('Score: '+this.result.score[0],5,12)
                        this.layer.textAlign(RIGHT,CENTER)
                        this.layer.text('Score: '+this.result.score[1],this.layer.width-5,12)
                        this.layer.textAlign(CENTER,CENTER)
                    break
                    case 6:
                        this.layer.background(100)
                        this.layer.fill(0)
                        this.layer.ellipse(this.layer.width/2,this.layer.height/2,this.layer.height*0.9)
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].display()
                        }
                        this.layer.fill(255)
                        this.layer.textAlign(LEFT,CENTER)
                        this.layer.textSize(12)
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.layer.text(types.player[this.operation.player[a]].name+`: `+this.result.score[a],5,12+a*16)
                        }
                        this.layer.textAlign(CENTER,CENTER)
                    break
                    case 7:
                        this.layer.background(100)
                        this.layer.fill(0)
                        this.layer.ellipse(this.layer.width/2,this.layer.height/2,this.layer.height*0.5)
                        this.layer.stroke(150)
                        this.layer.strokeWeight(50)
                        this.layer.ellipse(this.layer.width/2,this.layer.height/2,130)
                        this.layer.noStroke()
                        for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                            this.entities.projectiles[a].display()
                        }
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].display()
                        }
                        this.layer.fill(255)
                        this.layer.textAlign(LEFT,CENTER)
                        this.layer.textSize(12)
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.layer.text(types.player[this.operation.player[a]].name+`: `+this.result.score[a],5,12+a*16)
                        }
                        this.layer.textAlign(CENTER,CENTER)
                    break
                    case 8:
                        this.layer.background(0)
                        this.layer.fill(100)
                        this.layer.ellipse(this.layer.width/2,this.layer.height/2,this.layer.height*0.15)
                        for(let a=0,la=this.operation.player.length*2;a<la;a++){
                            this.layer.ellipse(this.layer.width/2+lsin(a/la*360)*this.layer.height*0.2*(la==8&&a%2==1?constants.sqrt2:1),this.layer.height/2+lcos(a/la*360)*this.layer.height*0.2*(la==8&&a%2==1?constants.sqrt2:1),this.layer.height*0.15)
                        }
                        for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                            this.entities.projectiles[a].display()
                        }
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].display()
                        }
                        this.layer.fill(255)
                        this.layer.textAlign(LEFT,CENTER)
                        this.layer.textSize(12)
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.layer.text(types.player[this.operation.player[a]].name+`: `+this.result.score[a],5,12+a*16)
                        }
                        this.layer.textAlign(CENTER,CENTER)
                    break
                    case 9:
                        this.layer.background(0)
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].display()
                        }
                        for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                            this.entities.projectiles[a].display()
                        }
                        for(let a=0,la=this.entities.walls.length;a<la;a++){
                            this.entities.walls[a].display()
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
                    this.layer.stroke(0,this.result.anim)
                    this.layer.strokeWeight(2)
                    this.layer.textSize(this.result.winner.length>=3?40:50)
                    let winners=``
                    for(let a=0,la=this.result.winner.length;a<la;a++){
                        winners+=(a>0?`, `:``)+types.player[this.operation.player[this.result.winner[a]]].name
                    }
                    this.layer.text((winners==``?`Nobody`:winners)+` Win!`,this.layer.width/2,this.layer.height/2)
                }else if(this.subResult.anim>0){
                    this.layer.fill(255,this.subResult.anim)
                    this.layer.stroke(0,this.result.anim)
                    this.layer.strokeWeight(2)
                    this.layer.textSize(this.result.winner.length>=3?40:50)
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
                let survive
                switch(this.minigame){
                    case 0:
                        survive=0
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
                                        this.payout.main.push((this.result.score[a]>=5?1:0)*this.payout.root*this.payout.mult+this.payout.add[a])
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
                                            for(let c=0,lc=this.entities.players.length;c<lc;c++){
                                                this.payout.main.push((a==result[1]?1:0)*this.payout.root*this.payout.mult+this.payout.add[a])
                                            }
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
                    case 2:
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].update(this)
                            for(let b=a+1,lb=this.entities.players.length;b<lb;b++){
                                this.entities.players[a].collide(0,this.entities.players[b],this)
                            }
                            if(this.entities.players[a].remove){
                                this.entities.players.splice(a,1)
                                a--
                                la--
                            }
                        }
                        if(this.result.timer[0]>0){
                            if(!this.result.end){
                                this.result.timer[0]--
                            }
                        }else{
                            this.result.end=true
                            if(this.payout.add[0]==0&&this.payout.add[1]==0&&this.payout.add[2]==0&&this.payout.add[3]==0){
                                this.result.winner=[this.teams.split[0]]
                            }else{
                                this.result.winner=range(0,this.operation.player.length)
                                if(this.result.winner.includes(this.teams.split[0])){
                                    this.result.winner.splice(this.result.winner.indexOf(this.teams.split[0]),1)
                                }
                            }
                        }
                        if(this.result.end&&this.result.anim<1){
                            this.result.anim+=0.1
                        }
                    break
                    case 3:
                        let done=true
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].update(this)
                            if(this.entities.players[a].remove){
                                this.entities.players.splice(a,1)
                                a--
                                la--
                            }
                            if(!this.entities.players[a].select.trigger){
                                done=false
                            }
                        }
                        for(let a=0,la=this.entities.walls.length;a<la;a++){
                            this.entities.walls[a].update(this)
                        }
                        if(done){
                            if(!this.control.endRound.trigger){
                                this.control.endRound.trigger=true
                                this.control.endRound.left=range(0,this.operation.player.length)
                            }
                            if(this.control.endRound.left.length==1){
                                this.subResult.end=true
                                this.subResult.winner=[]
                                this.subResult.winner.push(this.control.endRound.left[0])
                            }else if(this.control.endRound.timer>0){
                                this.control.endRound.timer--
                            }else{
                                this.control.endRound.tick++
                                this.control.endRound.timer=this.control.endRound.tick>=18?30:10
                                for(let a=0,la=8;a<la;a++){
                                    let total=0
                                    for(let b=0,lb=this.entities.walls.length;b<lb;b++){
                                        if(this.entities.walls[b].select.group==a&&!this.entities.walls[b].select.disable){
                                            if(total==0){
                                                this.entities.walls[b].select.disable=true
                                            }
                                            total++
                                        }
                                    }
                                    if(total<=1){
                                        for(let b=0,lb=this.entities.walls.length;b<lb;b++){
                                            if(this.entities.walls[b].select.group==a&&this.entities.walls[b].select.id>=0){
                                                if(this.control.endRound.left.includes(this.entities.walls[b].select.id)){
                                                    this.control.endRound.left.splice(this.control.endRound.left.indexOf(this.entities.walls[b].select.id),1)
                                                }
                                                b=lb
                                            }
                                        }
                                    }
                                }
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
                                        this.payout.main.push((this.result.score[a]>=5?1:0)*this.payout.root*this.payout.mult+this.payout.add[a])
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
                    case 4:
                        survive=0
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].update(this)
                            if(this.entities.players[a].remove){
                                this.entities.players.splice(a,1)
                                a--
                                la--
                            }
                            if(this.entities.players[a].active){
                                survive++
                            }
                        }
                        for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                            this.entities.projectiles[a].update(this)
                            for(let b=0,lb=this.entities.players.length;b<lb;b++){
                                this.entities.projectiles[a].collide(3,this.entities.players[b],this)
                            }
                            if(this.entities.projectiles[a].remove){
                                this.entities.projectiles.splice(a,1)
                                a--
                                la--
                            }
                        }
                        if(survive==1){
                            this.result.end=true
                            this.result.winner=[this.teams.split[0]]
                        }else if(this.result.timer[0]>0){
                            if(!this.result.end){
                                this.result.timer[0]--
                            }
                        }else{
                            this.result.end=true
                            this.result.winner=range(0,this.operation.player.length)
                            if(this.result.winner.includes(this.teams.split[0])){
                                this.result.winner.splice(this.result.winner.indexOf(this.teams.split[0]),1)
                            }
                        }
                        if(this.result.end&&this.result.anim<1){
                            this.result.anim+=0.1
                        }
                    break
                    case 5:
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].update(this)
                            if(this.entities.players[a].remove){
                                this.entities.players.splice(a,1)
                                a--
                                la--
                            }
                        }
                        for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                            this.entities.projectiles[a].update(this)
                            for(let b=0,lb=this.entities.players.length;b<lb;b++){
                                this.entities.projectiles[a].collide(4,this.entities.players[b],this)
                            }
                            if(this.entities.projectiles[a].remove){
                                this.entities.projectiles.splice(a,1)
                                a--
                                la--
                            }
                        }
                        if(this.result.score[0]>=5){
                            this.result.end=true
                            this.result.winner=[]
                            for(let a=0,la=this.teams.split.length;a<la;a++){
                                this.result.winner.push(this.teams.split[a])
                            }
                        }else if(this.result.score[1]>=5){
                            this.result.end=true
                            this.result.winner=range(0,this.operation.player.length)
                            for(let a=0,la=this.teams.split.length;a<la;a++){
                                if(this.result.winner.includes(this.teams.split[a])){
                                    this.result.winner.splice(this.result.winner.indexOf(this.teams.split[a]),1)
                                }
                            }
                        }
                        if(this.result.end&&this.result.anim<1){
                            this.result.anim+=0.1
                        }
                    break
                    case 6:
                        survive=0
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].update(this)
                            for(let b=a+1,lb=this.entities.players.length;b<lb;b++){
                                this.entities.players[a].collide(0,this.entities.players[b],this)
                            }
                            for(let b=0,lb=this.entities.players.length;b<lb;b++){
                                this.entities.players[a].collide(1,this.entities.players[b],this)
                            }
                            if(this.entities.players[a].remove){
                                this.entities.players.splice(a,1)
                                a--
                                la--
                            }
                            if(this.entities.players[a].active){
                                survive++
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
                                        this.payout.main.push((this.result.score[a]>=5?1:0)*this.payout.root*this.payout.mult+this.payout.add[a])
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
                    case 7:
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].update(this)
                        }
                        for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                            this.entities.projectiles[a].update()
                        }
                        switch(this.control.cycle.phase){
                            case 0:
                                let undecided=0
                                for(let a=0,la=this.entities.players.length;a<la;a++){
                                    if(this.entities.players[a].choice==0){
                                        undecided++
                                    }
                                }
                                if(undecided==0){
                                    this.control.cycle.phase=1
                                    this.control.cycle.time=0
                                    this.control.cycle.total=0
                                }
                            break
                            case 1:
                                this.control.cycle.time++
                                if(this.control.cycle.time==30){
                                    for(let a=0,la=this.entities.players.length;a<la;a++){
                                        this.entities.players[a].reveal=true
                                        this.control.cycle.total+=this.entities.players[a].choice
                                    }
                                }
                                if(this.control.cycle.time>=90){
                                    if(this.control.cycle.time<90+120/this.operation.player.length*this.control.cycle.total){
                                        for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                                            this.entities.projectiles[a].direction-=3
                                            this.entities.projectiles[a].position.x=this.layer.width/2-65*lsin(this.entities.projectiles[a].direction)
                                            this.entities.projectiles[a].position.y=this.layer.height/2-65*lcos(this.entities.projectiles[a].direction)
                                        }
                                    }else{
                                        this.control.cycle.phase=2
                                        this.control.cycle.time=0
                                    }
                                }
                            break
                            case 2:
                                this.control.cycle.time++
                                if(this.control.cycle.time>=30){
                                    if(this.control.cycle.time<this.layer.height*0.2-35){
                                        for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                                            this.entities.projectiles[a].size-=0.01
                                            this.entities.projectiles[a].position.x=this.layer.width/2-(35+this.control.cycle.time)*lsin(this.entities.projectiles[a].direction)
                                            this.entities.projectiles[a].position.y=this.layer.height/2-(35+this.control.cycle.time)*lcos(this.entities.projectiles[a].direction)
                                        }
                                    }else if(this.control.cycle.time==this.layer.height*0.2-35){
                                        for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                                            this.entities.projectiles[a].fade.trigger=false
                                            for(let b=0,lb=this.entities.players.length;b<lb;b++){
                                                if(distPos(this.entities.projectiles[a],this.entities.players[b])<10){
                                                    this.result.score[this.entities.players[b].id]+=this.entities.projectiles[a].value
                                                    if(this.result.score[this.entities.players[b].id]>=10){
                                                        this.result.end=true
                                                    }
                                                }
                                            }
                                        }
                                    }else{
                                        if(this.result.end){
                                            this.result.winner=[]
                                            for(let a=0,la=this.entities.players.length;a<la;a++){
                                                if(this.result.score[a]>=10){
                                                    this.result.winner.push(a)
                                                }
                                                this.payout.main.push((this.result.score[a]>=10?1:0)*this.payout.root*this.payout.mult+this.payout.add[a])
                                            }
                                        }else{
                                            let spawnable=range(0,this.operation.player.length)
                                            this.entities.projectiles=[]
                                            for(let a=0,la=this.operation.player.length;a<la;a++){
                                                this.entities.players[a].choice+=2
                                                this.entities.players[a].reveal=false
                                                let index=floor(random(0,spawnable.length))
                                                this.entities.projectiles.push(new projectile(this.layer,this.layer.width/2-65*lsin(a/la*360),this.layer.height/2-65*lcos(a/la*360),4,{direction:a/la*360,value:spawnable[index]}))
                                                spawnable.splice(index,1)
                                            }
                                            this.control.cycle.phase=3
                                            this.control.cycle.time=0
                                        }
                                    }
                                }
                            break
                            case 3:
                                this.control.cycle.time++
                                if(this.control.cycle.time>=30){
                                    for(let a=0,la=this.entities.players.length;a<la;a++){
                                        this.entities.players[a].choice=0
                                    }
                                    this.control.cycle.phase=0
                                }
                            break
                        }
                        if(this.result.end&&this.result.anim<1){
                            this.result.anim+=0.1
                        }
                    break
                    case 8:
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].update(this)
                        }
                        for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                            this.entities.projectiles[a].update()
                        }
                        switch(this.control.cycle.phase){
                            case 0:
                                let undecided=0
                                for(let a=0,la=this.entities.players.length;a<la;a++){
                                    if(this.entities.players[a].choice==-1){
                                        undecided++
                                    }
                                }
                                if(undecided==0){
                                    this.control.cycle.phase=1
                                    this.control.cycle.time=0
                                }
                            break
                            case 1:
                                this.control.cycle.time++
                                if(this.control.cycle.time==30){
                                    for(let a=0,la=this.entities.players.length;a<la;a++){
                                        this.entities.players[a].reveal=true
                                        this.control.cycle.choices[this.entities.players[a].choice].push(a)
                                    }
                                }
                                if(this.control.cycle.time==40){
                                    for(let a=0,la=this.entities.players.length;a<la;a++){
                                        let pos={x:0,y:0}
                                        if(this.entities.players[a].choice==0){
                                            pos={x:this.layer.width/2,y:this.layer.height/2}
                                        }else{
                                            pos={x:this.layer.width/2+lsin((this.entities.players[a].choice-0.5)/la*360)*this.layer.height*0.2*(la==4?constants.sqrt2:1),y:this.layer.height/2-lcos((this.entities.players[a].choice-0.5)/la*360)*this.layer.height*0.2*(la==4?constants.sqrt2:1)}
                                        }
                                        this.entities.players[a].direction.goal=dirPos(this.entities.players[a],{position:pos})
                                    }
                                }
                                if(this.control.cycle.time>=60&&this.control.cycle.time<90||this.control.cycle.time>=120&&this.control.cycle.time<=150){
                                    for(let a=0,la=this.control.cycle.choices.length;a<la;a++){
                                        if(this.control.cycle.choices[a].length==1){
                                            let pos={x:0,y:0}
                                            if(a==0){
                                                pos={x:this.layer.width/2,y:this.layer.height/2}
                                            }else{
                                                pos={x:this.layer.width/2+lsin((a-0.5)/(la-1)*360)*this.layer.height*0.2*(la==5?constants.sqrt2:1),y:this.layer.height/2-lcos((a-0.5)/(la-1)*360)*this.layer.height*0.2*(la==5?constants.sqrt2:1)}
                                            }
                                            let c=this.entities.players[this.control.cycle.choices[a][0]]
                                            c.position.x=map((1-(abs(this.control.cycle.time-105)-15)/30),0,1,c.base.position.x,pos.x)
                                            c.position.y=map((1-(abs(this.control.cycle.time-105)-15)/30),0,1,c.base.position.y,pos.y)
                                        }
                                    }
                                }
                                if(this.control.cycle.time>=60&&this.control.cycle.time<=120){
                                    for(let a=0,la=this.control.cycle.choices.length;a<la;a++){
                                        if(this.control.cycle.choices[a].length>=2){
                                            let pos={x:0,y:0}
                                            if(a==0){
                                                pos={x:this.layer.width/2,y:this.layer.height/2}
                                            }else{
                                                pos={x:this.layer.width/2+lsin((a-0.5)/(la-1)*360)*this.layer.height*0.2*(la==5?constants.sqrt2:1),y:this.layer.height/2-lcos((a-0.5)/(la-1)*360)*this.layer.height*0.2*(la==5?constants.sqrt2:1)}
                                            }
                                            for(let b=0,lb=this.control.cycle.choices[a].length;b<lb;b++){
                                                let c=this.entities.players[this.control.cycle.choices[a][b]]
                                                c.position.x=map((1-abs(this.control.cycle.time-90)/30)*0.95,0,1,c.base.position.x,pos.x)
                                                c.position.y=map((1-abs(this.control.cycle.time-90)/30)*0.95,0,1,c.base.position.y,pos.y)
                                            }
                                        }
                                    }
                                }
                                if(this.control.cycle.time==105){
                                    for(let a=0,la=this.control.cycle.choices.length;a<la;a++){
                                        if(this.control.cycle.choices[a].length==1){
                                            let c=this.entities.players[this.control.cycle.choices[a][0]]
                                            for(let b=0,lb=this.entities.projectiles.length;b<lb;b++){
                                                if(distPos(this.entities.projectiles[b],c)<10){
                                                    this.entities.projectiles[b].fade.trigger=false
                                                    this.result.score[c.id]+=this.entities.projectiles[b].value
                                                }
                                            }
                                        }
                                    }
                                }
                                if(this.control.cycle.time==165){
                                    for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                                        this.entities.projectiles[a].fade.trigger=false
                                    }
                                }
                                if(this.control.cycle.time>=180){
                                    for(let a=0,la=this.entities.players.length;a<la;a++){
                                        if(this.result.score[a]>=10){
                                            this.result.end=true
                                        }
                                    }
                                    if(this.result.end){
                                        this.result.winner=[]
                                        for(let a=0,la=this.entities.players.length;a<la;a++){
                                            if(this.result.score[a]>=10){
                                                this.result.winner.push(a)
                                            }
                                            this.payout.main.push((this.result.score[a]>=10?1:0)*this.payout.root*this.payout.mult+this.payout.add[a])
                                        }
                                    }else{
                                        this.entities.projectiles=[]
                                        this.control.cycle.choices=[]
                                        let spawnable=[[1,1],[1,1,2],[1,1,2,2]][this.operation.player.length-2]
                                        for(let a=0,la=this.operation.player.length+1;a<la;a++){
                                            this.control.cycle.choices.push([])
                                        }
                                        for(let a=0,la=this.operation.player.length;a<la;a++){
                                            this.entities.players[a].reveal=false
                                            this.entities.players[a].direction.goal=a/la*360
                                            let index=floor(random(0,spawnable.length))
                                            this.entities.projectiles.push(new projectile(this.layer,this.layer.width/2-this.layer.height*0.2*lsin((a+0.5)/la*360)*(la==4?constants.sqrt2:1),this.layer.height/2-this.layer.height*0.2*lcos((a+0.5)/la*360)*(la==4?constants.sqrt2:1),4,{direction:a/la*360,value:spawnable[index]}))
                                            spawnable.splice(index,1)
                                        }
                                        this.entities.projectiles.push(new projectile(this.layer,this.layer.width/2,this.layer.height/2,4,{direction:0,value:[2,3,3][this.operation.player.length-2]}))
                                        this.control.cycle.phase=2
                                        this.control.cycle.time=0
                                    }
                                }
                            break
                            case 2:
                                this.control.cycle.time++
                                if(this.control.cycle.time>=30){
                                    for(let a=0,la=this.entities.players.length;a<la;a++){
                                        this.entities.players[a].choice=-1
                                    }
                                    this.control.cycle.phase=0
                                }
                            break
                        }
                        if(this.result.end&&this.result.anim<1){
                            this.result.anim+=0.1
                        }
                    break
                    case 9:
                        survive=0
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].update(this)
                            for(let b=a+1,lb=this.entities.players.length;b<lb;b++){
                                this.entities.players[a].collide(0,this.entities.players[b],this)
                            }
                            if(this.entities.players[a].active){
                                survive++
                            }
                        }
                        for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                            this.entities.projectiles[a].update(this)
                            for(let b=0,lb=this.entities.players.length;b<lb;b++){
                                this.entities.projectiles[a].collide(0,this.entities.players[b],this)
                            }
                        }
                        for(let a=0,la=this.entities.walls.length;a<la;a++){
                            this.entities.walls[a].update()
                            for(let b=0,lb=this.entities.players.length;b<lb;b++){
                                this.entities.walls[a].collide(0,this.entities.players[b],this)
                            }
                        }
                        this.control.sender+=0.1+this.control.timer/6000
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
                        }else if(this.control.sender>0){
                            this.control.sender--
                            this.entities.projectiles.push(new projectile(this.layer,random(30,this.layer.width-30),30,5,{direction:0}))
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
                                        this.payout.main.push((this.result.score[a]>=5?1:0)*this.payout.root*this.payout.mult+this.payout.add[a])
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
                    case 10:
                        survive=0
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].update(this)
                            for(let b=a+1,lb=this.entities.players.length;b<lb;b++){
                                this.entities.players[a].collide(0,this.entities.players[b],this)
                            }
                            if(this.entities.players[a].active){
                                survive++
                            }
                        }
                        for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                            this.entities.projectiles[a].update(this)
                            for(let b=0,lb=this.entities.players.length;b<lb;b++){
                                this.entities.projectiles[a].collide(0,this.entities.players[b],this)
                            }
                            if(this.entities.projectiles[a].remove){
                                this.entities.projectiles.splice(a,1)
                                a--
                                la--
                            }
                        }
                        this.control.sender+=0.2+this.control.timer/3000
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
                        }else{
                            while(this.control.sender>0){
                                this.control.sender--
                                let dir=random(0,360)
                                let r=random(this.layer.width*0.2,this.layer.width)
                                this.entities.projectiles.push(new projectile(this.layer,this.layer.width/2+lcos(dir)*r-lsin(dir)*this.layer.width,this.layer.height/2-lsin(dir)*r-lcos(dir)*this.layer.width,6,{direction:dir}))
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
                                        this.payout.main.push((this.result.score[a]>=5?1:0)*this.payout.root*this.payout.mult+this.payout.add[a])
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