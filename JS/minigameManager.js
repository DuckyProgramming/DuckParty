class minigameManager{
    constructor(layer,operation){
        this.layer=layer
        this.operation=operation
        this.minigame=0
        this.generator={}
        this.entities={}
        this.graphics={main:[]}
        this.control={timer:0}
        this.teams={split:[]}
        this.result={end:false,winner:[],anim:0,score:[],timer:[]}
        this.subResult={end:false,winner:[],anim:0}
        this.payout={main:[],root:10,mult:1,add:[]}
    }
    arbitraryTeams(){
        this.teams.split=[]
        switch(types.minigame[this.minigame].player){
            case 2:
                if(this.operation.player.length/2%1==0){
                    let possible=range(0,this.operation.player.length)
                    for(let a=0,la=floor(this.operation.player.length/2);a<la;a++){
                        let index=floor(random(0,possible.length))
                        this.teams.split.push(possible[index])
                        possible.splice(index,1)
                    }
                }
            break
            case 3:
                this.teams.split.push(floor(random(0,this.operation.player.length)))
            break
        }
    }
    reset(){
        this.control.timer=0
        this.payout.main=[]
        this.payout.add=[]
        for(let a=0,la=this.operation.player.length;a<la;a++){
            this.payout.add.push(0)
        }
        let extent
        let set
        let ticker
        let spawnable
        let cellWidth
        let cellHeight
        let cells
        let walls
        let survivorWalls
        let mapping
        let spent
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
                extent=4
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
                    for(let b=0,lb=8;b<lb;b++){
                        for(let c=0,lc=this.entities.walls[a].length;c<lc;c++){
                            this.entities.walls[a][c].ladder(b,this.entities.walls[a])
                        }
                        for(let c=0,lc=this.entities.walls.length;c<lc;c++){
                            if(this.entities.walls[a][c].remove){
                                this.entities.walls[a].splice(c,1)
                                c--
                                lc--
                            }
                        }
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
                set=0
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
                this.entities={players:[],projectiles:[]}
                if(this.operation.player.length==3){
                    this.control.playerSet=shuffleArray(range(0,3))
                }else{
                    this.control.playerSet=[this.teams.split[0],1-this.teams.split[0]]
                    ticker=[floor(random(0,this.teams.split.length)),floor(random(0,this.operation.player.length-this.teams.split.length))]
                }
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    if(this.operation.player.length==3){
                        switch(this.control.playerSet[a]){
                            case 0:
                                this.entities.players.push(new player(this.layer,this.layer.width/2-250,this.layer.height/2,1,4,a,this.operation.player[a]))
                                last(this.entities.players).direction.main=90
                                last(this.entities.players).direction.goal=90
                                last(this.entities.players).scale(1.5)
                            break
                            case 1:
                                this.entities.players.push(new player(this.layer,this.layer.width/2+250,this.layer.height/2,1,4,a,this.operation.player[a]))
                                last(this.entities.players).direction.main=-90
                                last(this.entities.players).direction.goal=-90
                                last(this.entities.players).scale(1.5)
                            break
                            case 2:
                                this.entities.players.push(new player(this.layer,this.layer.width/2,this.layer.height/2-120,1,21,a,this.operation.player[a]))
                                last(this.entities.players).direction.main=0
                                last(this.entities.players).direction.goal=0
                                last(this.entities.players).scale(1.5)
                            break
                        }
                    }else if(this.teams.split.includes(a)){
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
                this.control.bound={base:{x:100,y:100},width:this.layer.width-200,height:this.layer.height-200,radius:0}
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
                for(let a=0,la=8;a<la;a++){
                    for(let b=0,lb=this.entities.walls.length;b<lb;b++){
                        this.entities.walls[b].ladder(a,this.entities.walls)
                    }
                    for(let b=0,lb=this.entities.walls.length;b<lb;b++){
                        if(this.entities.walls[b].remove){
                            this.entities.walls.splice(b,1)
                            b--
                            lb--
                        }
                    }
                }
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
            case 11:
                this.control.turn=0
                this.entities={players:[],projectiles:[]}
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.entities.players.push(new player(this.layer,this.layer.width/2+50-la*50+a*100,this.layer.height/2,1,0,a,this.operation.player[a]))
                }
                this.entities.projectiles.push(new projectile(this.layer,this.layer.width*0.5-230,this.layer.height*0.5-130,7,{direction:random(0,360)}))
                this.entities.projectiles.push(new projectile(this.layer,this.layer.width*0.5+230,this.layer.height*0.5+130,7,{direction:random(0,360)}))
                this.control.bound={base:{x:0,y:0},width:this.layer.width,height:this.layer.height,radius:0}
                this.control.internalBound={base:{x:this.layer.width/2-250,y:this.layer.height/2-150},width:500,height:300,radius:0}
            break
            case 12:
                cellWidth=11
                cellHeight=7
                cells=[]
                for(let a=0,la=cellHeight;a<la;a++){
                    cells.push([])
                    for(let b=0,lb=cellWidth;b<lb;b++){
                        cells[a].push(a*lb+b)
                    }
                }
                walls=[]
                for(let a=0,la=cellHeight;a<la;a++){
                    for(let b=0,lb=cellWidth-1;b<lb;b++){
                        walls.push([[a,b],[a,b+1]])
                    }
                }
                for(let a=0,la=cellHeight-1;a<la;a++){
                    for(let b=0,lb=cellWidth;b<lb;b++){
                        walls.push([[a,b],[a+1,b]])
                    }
                }
                survivorWalls=[]
                while(walls.length>0){
                    let index=floor(random(0,walls.length))
                    if(cells[walls[index][0][0]][walls[index][0][1]]==cells[walls[index][1][0]][walls[index][1][1]]){
                        if(floor(random(0,
                            walls[index][0][0]==0&&walls[index][1][0]==0||
                            walls[index][0][1]==0&&walls[index][1][1]==0||
                            walls[index][0][0]==cellHeight-1&&walls[index][1][0]==cellHeight-1||
                            walls[index][0][1]==cellWidth-1&&walls[index][1][1]==cellWidth-1
                            ?2:10))!=0){
                            survivorWalls.push(walls[index])
                        }
                    }else{
                        let setter=cells[walls[index][1][0]][walls[index][1][1]]
                        for(let a=0,la=cells.length;a<la;a++){
                            for(let b=0,lb=cells[a].length;b<lb;b++){
                                if(cells[a][b]==setter){
                                    cells[a][b]=cells[walls[index][0][0]][walls[index][0][1]]
                                }
                            }
                        }
                    }
                    walls.splice(index,1)
                }
                mapping=[]
                for(let a=0,la=cellHeight*2+1;a<la;a++){
                    mapping.push([])
                    for(let b=0,lb=cellWidth*2+1;b<lb;b++){
                        mapping[a].push(a==0||a==la-1||b==0||b==lb-1?1:0)
                    }
                }
                for(let a=0,la=survivorWalls.length;a<la;a++){
                    if(survivorWalls[a][0][0]==survivorWalls[a][1][0]){
                        mapping[survivorWalls[a][0][0]*2+1][survivorWalls[a][0][1]+survivorWalls[a][1][1]+1]=1
                    }else{
                        mapping[survivorWalls[a][0][0]+survivorWalls[a][1][0]+1][survivorWalls[a][0][1]*2+1]=1
                    }
                }
                for(let a=0,la=cellHeight-1;a<la;a++){
                    for(let b=0,lb=cellWidth-1;b<lb;b++){
                        if(
                            mapping[a*2+1][b*2+2]==1||
                            mapping[a*2+3][b*2+2]==1||
                            mapping[a*2+2][b*2+1]==1||
                            mapping[a*2+2][b*2+3]==1
                        ){
                            mapping[a*2+2][b*2+2]=1
                        }
                    }
                }
                spent=[]
                for(let a=0,la=mapping.length;a<la;a++){
                    spent.push([])
                    for(let b=0,lb=mapping[a].length;b<lb;b++){
                        spent[a].push(false)
                    }
                }
                this.entities={players:[],walls:[],projectiles:[]}
                this.control.bound={base:{x:0,y:0},width:this.layer.width,height:this.layer.height,radius:0}
                for(let a=0,la=mapping.length;a<la;a++){
                    for(let b=0,lb=mapping[a].length;b<lb;b++){
                        if(!spent[a][b]){
                            spent[a][b]=true
                            switch(mapping[a][b]){
                                case 1:
                                    let total=1
                                    for(let c=0,lc=la-a-1;c<lc;c++){
                                        if(mapping[a][b]==mapping[a+c+1][b]){
                                            total++
                                            spent[a+c+1][b]=true
                                        }else{
                                            c=lc
                                        }
                                    }
                                    this.entities.walls.push(new wall(this.layer,40*(b+0.5)+(b==0?10:b==lb-1?30:20),40*(a+total*0.5),b==0||b==lb-1?60:40,40*total,0,{base:[100,100,100]}))
                                break
                            }
                        }
                    }
                }
                for(let a=0,la=8;a<la;a++){
                    for(let b=0,lb=this.entities.walls.length;b<lb;b++){
                        this.entities.walls[b].ladder(a,this.entities.walls)
                    }
                    for(let b=0,lb=this.entities.walls.length;b<lb;b++){
                        if(this.entities.walls[b].remove){
                            this.entities.walls.splice(b,1)
                            b--
                            lb--
                        }
                    }
                }
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    switch(a){
                        case 0:
                            this.entities.players.push(new player(this.layer,80,60,1,8,a,this.operation.player[a]))
                            last(this.entities.players).direction.main=45
                            last(this.entities.players).direction.goal=45
                        break
                        case 1:
                            this.entities.players.push(new player(this.layer,880,540,1,8,a,this.operation.player[a]))
                            last(this.entities.players).direction.main=225
                            last(this.entities.players).direction.goal=225
                        break
                        case 2:
                            this.entities.players.push(new player(this.layer,80,540,1,8,a,this.operation.player[a]))
                            last(this.entities.players).direction.main=135
                            last(this.entities.players).direction.goal=135
                        break
                        case 3:
                            this.entities.players.push(new player(this.layer,880,60,1,8,a,this.operation.player[a]))
                            last(this.entities.players).direction.main=315
                            last(this.entities.players).direction.goal=315
                        break
                    }
                }
            break
            case 13:
                this.entities={players:[],projectiles:[]}
                this.control.cycle={phase:0,time:0,pushing:0,id:0}
                this.control.spawnTick=floor(random(6,11))
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.entities.players.push(new player(this.layer,this.layer.width/2+50*lsin(a/la*360),this.layer.height*0.3+50*lcos(a/la*360),1,9,a,this.operation.player[a]))
                    last(this.entities.players).direction.main=a/la*360
                    last(this.entities.players).direction.goal=a/la*360
                }
                for(let a=0,la=8;a<la;a++){
                    this.control.spawnTick--
                    if(this.control.spawnTick>0){
                        this.entities.projectiles.push(new projectile(this.layer,this.layer.width/2,this.layer.height*0.3+110+a*45,4,{direction:a/la*360,value:floor(random(1,5))}))
                    }else{
                        this.entities.projectiles.push(new projectile(this.layer,this.layer.width/2,this.layer.height*0.3+110+a*45,4,{direction:a/la*360,value:-1}))
                        this.control.spawnTick=floor(random(6,11))
                    }
                }
                this.control.bound={base:{x:0,y:0},width:this.layer.width,height:this.layer.height,radius:0}
            break
            case 14:
                this.entities={players:[]}
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.entities.players.push(new player(this.layer,[100,this.layer.width-100,this.layer.width-100,100][a],[100,this.layer.height-100,100,this.layer.height-100][a],1,10,a,this.operation.player[a]))
                    last(this.entities.players).direction.main=floor(random(0,8))*45
                    last(this.entities.players).direction.goal=last(this.entities.players).direction.main
                    last(this.entities.players).scale(1.5)
                }
                for(let a=0,la=25;a<la;a++){
                    this.entities.players.push(new player(this.layer,random(25,this.layer.width-25),random(25,this.layer.height-25),1,10,-1,-1))
                    last(this.entities.players).direction.main=floor(random(0,8))*45
                    last(this.entities.players).direction.goal=last(this.entities.players).direction.main
                    last(this.entities.players).scale(1.5)
                }
                this.control.bound={base:{x:0,y:0},width:this.layer.width,height:this.layer.height,radius:0}
            break
            case 15:
                cellWidth=11
                cellHeight=7
                cells=[]
                for(let a=0,la=cellHeight;a<la;a++){
                    cells.push([])
                    for(let b=0,lb=cellWidth;b<lb;b++){
                        cells[a].push(a*lb+b)
                    }
                }
                walls=[]
                for(let a=0,la=cellHeight;a<la;a++){
                    for(let b=0,lb=cellWidth-1;b<lb;b++){
                        walls.push([[a,b],[a,b+1]])
                    }
                }
                for(let a=0,la=cellHeight-1;a<la;a++){
                    for(let b=0,lb=cellWidth;b<lb;b++){
                        walls.push([[a,b],[a+1,b]])
                    }
                }
                survivorWalls=[]
                while(walls.length>0){
                    let index=floor(random(0,walls.length))
                    if(cells[walls[index][0][0]][walls[index][0][1]]==cells[walls[index][1][0]][walls[index][1][1]]){
                        if(floor(random(0,
                            walls[index][0][0]==0&&walls[index][1][0]==0||
                            walls[index][0][1]==0&&walls[index][1][1]==0||
                            walls[index][0][0]==cellHeight-1&&walls[index][1][0]==cellHeight-1||
                            walls[index][0][1]==cellWidth-1&&walls[index][1][1]==cellWidth-1
                            ?3:15))!=0){
                            survivorWalls.push(walls[index])
                        }
                    }else{
                        let setter=cells[walls[index][1][0]][walls[index][1][1]]
                        for(let a=0,la=cells.length;a<la;a++){
                            for(let b=0,lb=cells[a].length;b<lb;b++){
                                if(cells[a][b]==setter){
                                    cells[a][b]=cells[walls[index][0][0]][walls[index][0][1]]
                                }
                            }
                        }
                    }
                    walls.splice(index,1)
                }
                mapping=[]
                for(let a=0,la=cellHeight*4+1;a<la;a++){
                    mapping.push([])
                    for(let b=0,lb=cellWidth*4+1;b<lb;b++){
                        mapping[a].push(a==0||a==la-1||b==0||b==lb-1?1:0)
                    }
                }
                for(let a=0,la=survivorWalls.length;a<la;a++){
                    for(let b=0,lb=3;b<lb;b++){
                        if(survivorWalls[a][0][0]==survivorWalls[a][1][0]){
                            mapping[survivorWalls[a][0][0]*4+1+b][survivorWalls[a][0][1]*2+survivorWalls[a][1][1]*2+2]=1
                        }else{
                            mapping[survivorWalls[a][0][0]*2+survivorWalls[a][1][0]*2+2][survivorWalls[a][0][1]*4+1+b]=1
                        }
                    }
                }
                for(let a=0,la=cellHeight-1;a<la;a++){
                    for(let b=0,lb=cellWidth-1;b<lb;b++){
                        if(
                            mapping[a*4+3][b*4+4]==1||
                            mapping[a*4+5][b*4+4]==1||
                            mapping[a*4+4][b*4+3]==1||
                            mapping[a*4+4][b*4+5]==1
                        ){
                            mapping[a*4+4][b*4+4]=1
                        }
                    }
                }
                spent=[]
                for(let a=0,la=mapping.length;a<la;a++){
                    spent.push([])
                    for(let b=0,lb=mapping[a].length;b<lb;b++){
                        spent[a].push(false)
                    }
                }
                this.entities={players:[],walls:[],projectiles:[]}
                this.control.bound={base:{x:0,y:0},width:this.layer.width,height:this.layer.height,radius:0}
                for(let a=0,la=mapping.length;a<la;a++){
                    for(let b=0,lb=mapping[a].length;b<lb;b++){
                        if(!spent[a][b]){
                            spent[a][b]=true
                            switch(mapping[a][b]){
                                case 1:
                                    let total=1
                                    for(let c=0,lc=la-a-1;c<lc;c++){
                                        if(mapping[a][b]==mapping[a+c+1][b]){
                                            total++
                                            spent[a+c+1][b]=true
                                        }else{
                                            c=lc
                                        }
                                    }
                                    this.entities.walls.push(new wall(this.layer,20*(b+0.5+1.5),20*(a+total*0.5+0.5),20,20*total,0,{base:[100,100,100]}))
                                break
                            }
                        }
                    }
                }
                this.entities.walls.push(new wall(this.layer,15,this.layer.height*0.5,30,this.layer.height,0,{base:[100,100,100]}))
                this.entities.walls.push(new wall(this.layer,this.layer.width-15,this.layer.height*0.5,30,this.layer.height,0,{base:[100,100,100]}))
                this.entities.walls.push(new wall(this.layer,this.layer.width*0.5,5,this.layer.width-60,10,0,{base:[100,100,100]}))
                this.entities.walls.push(new wall(this.layer,this.layer.width*0.5,this.layer.height-5,this.layer.width-60,10,0,{base:[100,100,100]}))
                for(let a=0,la=8;a<la;a++){
                    for(let b=0,lb=this.entities.walls.length;b<lb;b++){
                        this.entities.walls[b].ladder(a,this.entities.walls)
                    }
                    for(let b=0,lb=this.entities.walls.length;b<lb;b++){
                        if(this.entities.walls[b].remove){
                            this.entities.walls.splice(b,1)
                            b--
                            lb--
                        }
                    }
                }
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    switch(a){
                        case 0:
                            this.entities.players.push(new player(this.layer,80,60,3,1,a,this.operation.player[a]))
                            last(this.entities.players).direction.main=45
                            last(this.entities.players).direction.goal=45
                        break
                        case 1:
                            this.entities.players.push(new player(this.layer,880,540,3,1,a,this.operation.player[a]))
                            last(this.entities.players).direction.main=225
                            last(this.entities.players).direction.goal=225
                        break
                        case 2:
                            this.entities.players.push(new player(this.layer,80,540,3,1,a,this.operation.player[a]))
                            last(this.entities.players).direction.main=135
                            last(this.entities.players).direction.goal=135
                        break
                        case 3:
                            this.entities.players.push(new player(this.layer,880,60,3,1,a,this.operation.player[a]))
                            last(this.entities.players).direction.main=315
                            last(this.entities.players).direction.goal=315
                        break
                    }
                }
            break
            case 16:
                cellWidth=11
                cellHeight=7
                cells=[]
                for(let a=0,la=cellHeight;a<la;a++){
                    cells.push([])
                    for(let b=0,lb=cellWidth;b<lb;b++){
                        cells[a].push(a*lb+b)
                    }
                }
                walls=[]
                for(let a=0,la=cellHeight;a<la;a++){
                    for(let b=0,lb=cellWidth-1;b<lb;b++){
                        walls.push([[a,b],[a,b+1]])
                    }
                }
                for(let a=0,la=cellHeight-1;a<la;a++){
                    for(let b=0,lb=cellWidth;b<lb;b++){
                        walls.push([[a,b],[a+1,b]])
                    }
                }
                survivorWalls=[]
                let fakeWalls=[]
                let lostWalls=[]
                while(walls.length>0){
                    let index=floor(random(0,walls.length))
                    if(cells[walls[index][0][0]][walls[index][0][1]]==cells[walls[index][1][0]][walls[index][1][1]]){
                        if(!(walls[index][0][0]==0&&walls[index][0][1]==0)&&
                        floor(random(0,
                            walls[index][0][0]==0&&walls[index][1][0]==0||
                            walls[index][0][1]==0&&walls[index][1][1]==0||
                            walls[index][0][0]==cellHeight-1&&walls[index][1][0]==cellHeight-1||
                            walls[index][0][1]==cellWidth-1&&walls[index][1][1]==cellWidth-1
                            ?1.2:1.5))!=0){
                            if(floor(random(0,2))==0){
                                fakeWalls.push(walls[index])
                            }else{
                                survivorWalls.push(walls[index])
                            }
                        }else{
                            lostWalls.push(walls[index])
                        }
                    }else{
                        let setter=cells[walls[index][1][0]][walls[index][1][1]]
                        for(let a=0,la=cells.length;a<la;a++){
                            for(let b=0,lb=cells[a].length;b<lb;b++){
                                if(cells[a][b]==setter){
                                    cells[a][b]=cells[walls[index][0][0]][walls[index][0][1]]
                                }
                            }
                        }
                        lostWalls.push(walls[index])
                    }
                    walls.splice(index,1)
                }
                mapping=[]
                for(let a=0,la=cellHeight*4+1;a<la;a++){
                    mapping.push([])
                    for(let b=0,lb=cellWidth*4+1;b<lb;b++){
                        mapping[a].push(a==0||a==la-1||b==0||b==lb-1?1:0)
                    }
                }
                for(let a=0,la=survivorWalls.length;a<la;a++){
                    for(let b=0,lb=3;b<lb;b++){
                        if(survivorWalls[a][0][0]==survivorWalls[a][1][0]){
                            mapping[survivorWalls[a][0][0]*4+1+b][survivorWalls[a][0][1]*2+survivorWalls[a][1][1]*2+2]=1
                        }else{
                            mapping[survivorWalls[a][0][0]*2+survivorWalls[a][1][0]*2+2][survivorWalls[a][0][1]*4+1+b]=1
                        }
                    }
                }
                for(let a=0,la=lostWalls.length;a<la;a++){
                    for(let b=0,lb=3;b<lb;b++){
                        if(lostWalls[a][0][0]==lostWalls[a][1][0]){
                            mapping[lostWalls[a][0][0]*4+1+b][lostWalls[a][0][1]*2+lostWalls[a][1][1]*2+2]=2
                        }else{
                            mapping[lostWalls[a][0][0]*2+lostWalls[a][1][0]*2+2][lostWalls[a][0][1]*4+1+b]=3
                        }
                    }
                }
                for(let a=0,la=fakeWalls.length;a<la;a++){
                    for(let b=0,lb=3;b<lb;b++){
                        if(fakeWalls[a][0][0]==fakeWalls[a][1][0]){
                            mapping[fakeWalls[a][0][0]*4+1+b][fakeWalls[a][0][1]*2+fakeWalls[a][1][1]*2+2]=4
                        }else{
                            mapping[fakeWalls[a][0][0]*2+fakeWalls[a][1][0]*2+2][fakeWalls[a][0][1]*4+1+b]=5
                        }
                    }
                }
                for(let a=0,la=cellHeight-1;a<la;a++){
                    for(let b=0,lb=cellWidth-1;b<lb;b++){
                        mapping[a*4+4][b*4+4]=1
                    }
                }
                spent=[]
                for(let a=0,la=mapping.length;a<la;a++){
                    spent.push([])
                    for(let b=0,lb=mapping[a].length;b<lb;b++){
                        spent[a].push(false)
                    }
                }
                this.entities={players:[],walls:[],projectiles:[]}
                this.control.bound={base:{x:0,y:0},width:this.layer.width,height:this.layer.height,radius:0}
                for(let a=0,la=mapping.length;a<la;a++){
                    for(let b=0,lb=mapping[a].length;b<lb;b++){
                        if(!spent[a][b]){
                            spent[a][b]=true
                            switch(mapping[a][b]){
                                case 1:
                                    let total=1
                                    for(let c=0,lc=la-a-1;c<lc;c++){
                                        if(mapping[a][b]==mapping[a+c+1][b]){
                                            total++
                                            spent[a+c+1][b]=true
                                        }else{
                                            c=lc
                                        }
                                    }
                                    this.entities.walls.push(new wall(this.layer,20*(b+0.5+1.5),20*(a+total*0.5+0.5),20,20*total,0,{base:[100,100,100]}))
                                break
                                case 2:
                                    this.entities.walls.push(new wall(this.layer,20*(b+2),20*(a+1),6,20,4,{base:[125,125,125],shock:[250,225,100]}))
                                break
                                case 3:
                                    this.entities.walls.push(new wall(this.layer,20*(b+2),20*(a+1),20,6,5,{base:[125,125,125],shock:[250,225,100]}))
                                break
                                case 4:
                                    this.entities.walls.push(new wall(this.layer,20*(b+2),20*(a+1),6,20,6,{base:[125,125,125],shock:[250,225,100]}))
                                break
                                case 5:
                                    this.entities.walls.push(new wall(this.layer,20*(b+2),20*(a+1),20,6,7,{base:[125,125,125],shock:[250,225,100]}))
                                break
                            }
                        }
                    }
                }
                this.entities.walls.push(new wall(this.layer,15,this.layer.height*0.5,30,this.layer.height,0,{base:[100,100,100]}))
                this.entities.walls.push(new wall(this.layer,this.layer.width-15,this.layer.height*0.5,30,this.layer.height,0,{base:[100,100,100]}))
                this.entities.walls.push(new wall(this.layer,this.layer.width*0.5,5,this.layer.width-60,10,0,{base:[100,100,100]}))
                this.entities.walls.push(new wall(this.layer,this.layer.width*0.5,this.layer.height-5,this.layer.width-60,10,0,{base:[100,100,100]}))
                this.entities.walls.push(new wall(this.layer,this.layer.width-82.5,this.layer.height-62.5,30,30,1,{base:[[225,225,225],[50,50,50]]}))
                for(let a=0,la=8;a<la;a++){
                    for(let b=0,lb=this.entities.walls.length;b<lb;b++){
                        this.entities.walls[b].ladder(a,this.entities.walls)
                    }
                    for(let b=0,lb=this.entities.walls.length;b<lb;b++){
                        if(this.entities.walls[b].remove){
                            this.entities.walls.splice(b,1)
                            b--
                            lb--
                        }
                    }
                }
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.entities.players.push(new player(this.layer,67.5+a%2*30,47.5+floor(a/2)*30,1,13,a,this.operation.player[a]))
                    last(this.entities.players).direction.main=45
                    last(this.entities.players).direction.goal=45
                }
            break
            case 17:
                this.entities={players:[]}
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.entities.players.push(new player(this.layer,this.layer.width/2-lsin(a/la*360)*this.layer.height*0.4,this.layer.height/2-lcos(a/la*360)*this.layer.height*0.4,1,11,a,this.operation.player[a]))
                    last(this.entities.players).direction.main=a/la*360
                    last(this.entities.players).direction.goal=a/la*360
                }
                this.entities.players.push(new player(this.layer,this.layer.width/2,this.layer.height/2,1,12,-1,-1))
                for(let a=0,la=6;a<la;a++){
                    this.entities.players.push(new player(this.layer,this.layer.width/2+lsin(a/la*360)*75,this.layer.height/2+lcos(a/la*360)*75,1,12,-1,-1))
                    last(this.entities.players).direction.main=a/la*360
                    last(this.entities.players).direction.goal=a/la*360
                }
                for(let a=0,la=12;a<la;a++){
                    this.entities.players.push(new player(this.layer,this.layer.width/2+lsin(a/la*360)*150,this.layer.height/2+lcos(a/la*360)*150,1,12,-1,-1))
                    last(this.entities.players).direction.main=a/la*360
                    last(this.entities.players).direction.goal=a/la*360
                }
                this.control.bound={base:{x:0,y:0},width:this.layer.width,height:this.layer.height,radius:this.layer.height*0.45}
            break
            case 18:
                extent=1
                this.entities={players:[],walls:[],projectiles:[]}
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.entities.players.push(new player(this.layer,this.layer.width*(0.5+a/4-la/8+1/8),this.layer.height*extent-50,0,2,a,this.operation.player[a]))
                    last(this.entities.players).scale(0.6)
                    last(this.entities.players).jump.mult=0.5
                    this.entities.walls.push(new wall(this.layer,this.layer.width*(0.5+a/4-la/8)+120,15,220,10,8,{base:[[225,225,225],[50,50,50]]}))
                    this.entities.walls.push(new wall(this.layer,this.layer.width*(0.5+a/4-la/8)+5,this.layer.height*extent/2,10,this.layer.height*extent,0,{base:[100,100,100]}))
                    this.entities.walls.push(new wall(this.layer,this.layer.width*(0.5+a/4-la/8)+235,this.layer.height*extent/2,10,this.layer.height*extent,0,{base:[100,100,100]}))
                    this.entities.walls.push(new wall(this.layer,this.layer.width*(0.5+a/4-la/8)+120,this.layer.height*extent+20,220,100,0,{base:[100,100,100]}))
                    let nudge=floor(random(0,4))
                    for(let b=0,lb=27;b<lb;b++){
                        this.entities.walls.push(new wall(this.layer,this.layer.width*(0.5+a/4-la/8)+[60-floor(random(0,3))*20,80+floor(random(0,5))*20,180+floor(random(0,3))*20,80+floor(random(0,5))*20][(b+nudge)%4],this.layer.height*extent-32.5-b*20,20+floor(random(0,3))*5,5,0,{base:[100,100,100]}))
                    }
                }
                for(let a=0,la=2;a<la;a++){
                    for(let b=0,lb=this.entities.walls.length;b<lb;b++){
                        this.entities.walls[b].ladder([2,7][a],this.entities.walls)
                    }
                    for(let b=0,lb=this.entities.walls.length;b<lb;b++){
                        if(this.entities.walls[b].remove){
                            this.entities.walls.splice(b,1)
                            b--
                            lb--
                        }
                    }
                }
                this.control.bound={base:{x:0,y:0},width:this.layer.width,height:this.layer.height*extent,radius:0}
            break
            case 19:
                let nums=[floor(random(3,13)),floor(random(3,13)),floor(random(3,13)),floor(random(3,13))]
                let operation=floor(random(0,6))
                this.control.result=[
                    nums[0]+nums[1]*nums[2]*nums[3],
                    nums[0]*nums[1]+nums[2]*nums[3],
                    nums[0]*nums[1]*nums[2]+nums[3],
                    nums[0]+nums[1]+nums[2]*nums[3],
                    nums[0]*nums[1]+nums[2]+nums[3],
                    nums[0]+nums[1]*nums[2]+nums[3]
                ][operation]
                this.entities={players:[],walls:[]}
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.entities.players.push(new player(this.layer,this.layer.width/2+100-la*100+a*200,this.layer.height/2,1,1,a,this.operation.player[a]))
                }
                this.entities.walls.push(new wall(this.layer,this.layer.width/2,this.layer.height*0.2,260,65,9,{base:[[50,50,50],[225,225,225]],text:[0,0,0]}))
                last(this.entities.walls).text=[
                    `${nums[0]} + ${nums[1]} x ${nums[2]} x ${nums[3]}`,
                    `${nums[0]} x ${nums[1]} + ${nums[2]} x ${nums[3]}`,
                    `${nums[0]} x ${nums[1]} x ${nums[2]} + ${nums[3]}`,
                    `${nums[0]} + ${nums[1]} + ${nums[2]} x ${nums[3]}`,
                    `${nums[0]} x ${nums[1]} + ${nums[2]} + ${nums[3]}`,
                    `${nums[0]} + ${nums[1]} x ${nums[2]} + ${nums[3]}`
                ][operation]+' = ?'
                let num=8
                let correct=floor(random(0,num))
                let values=elementArray(0,num)
                values[correct]=this.control.result
                for(let a=correct-1;a>=0;a--){
                    values[a]=values[a+1]-floor(random(1,1+abs(a-(num/2-0.5))*2))
                }
                for(let a=correct+1,la=values.length;a<la;a++){
                    values[a]=values[a-1]+floor(random(1,1+abs(a-(num/2-0.5))*2))
                }
                for(let a=0,la=values.length;a<la;a++){
                    this.entities.walls.push(new wall(this.layer,this.layer.width/2-225+a%4*150,this.layer.height*(0.7+floor(a/4)*0.15),75,50,10,{base:[[50,50,50],[225,225,225]],text:[0,0,0]}))
                    last(this.entities.walls).text=values[a]
                }
                for(let a=0,la=8;a<la;a++){
                    for(let b=0,lb=this.entities.walls.length;b<lb;b++){
                        this.entities.walls[b].ladder(a,this.entities.walls)
                    }
                    for(let b=0,lb=this.entities.walls.length;b<lb;b++){
                        if(this.entities.walls[b].remove){
                            this.entities.walls.splice(b,1)
                            b--
                            lb--
                        }
                    }
                }
                this.control.bound={base:{x:0,y:0},width:this.layer.width,height:this.layer.height,radius:0}
            break
            case 20:
                this.graphics={main:[createGraphics(this.layer.width,this.layer.height)]}
                setupLayer(this.graphics.main[0])
                cellWidth=11
                cellHeight=7
                cells=[]
                let blockings=[]
                for(let a=0,la=cellHeight;a<la;a++){
                    cells.push([])
                    blockings.push([])
                    for(let b=0,lb=cellWidth;b<lb;b++){
                        cells[a].push(a*lb+b)
                        blockings[a].push((a==0||a==la-1?1:0)+(b==0||b==lb-1?1:0))
                    }
                }
                walls=[]
                for(let a=0,la=cellHeight;a<la;a++){
                    for(let b=0,lb=cellWidth-1;b<lb;b++){
                        walls.push([[a,b],[a,b+1]])
                    }
                }
                for(let a=0,la=cellHeight-1;a<la;a++){
                    for(let b=0,lb=cellWidth;b<lb;b++){
                        walls.push([[a,b],[a+1,b]])
                    }
                }
                survivorWalls=[]
                while(walls.length>0){
                    let index=floor(random(0,walls.length))
                    if(cells[walls[index][0][0]][walls[index][0][1]]==cells[walls[index][1][0]][walls[index][1][1]]){
                        if(floor(random(0,
                            walls[index][0][0]==0&&walls[index][1][0]==0||
                            walls[index][0][1]==0&&walls[index][1][1]==0||
                            walls[index][0][0]==cellHeight-1&&walls[index][1][0]==cellHeight-1||
                            walls[index][0][1]==cellWidth-1&&walls[index][1][1]==cellWidth-1
                            ?2:10))!=0){
                            survivorWalls.push(walls[index])
                            blockings[walls[index][0][0]][walls[index][0][1]]++
                            blockings[walls[index][1][0]][walls[index][1][1]]++
                        }
                    }else{
                        let setter=cells[walls[index][1][0]][walls[index][1][1]]
                        for(let a=0,la=cells.length;a<la;a++){
                            for(let b=0,lb=cells[a].length;b<lb;b++){
                                if(cells[a][b]==setter){
                                    cells[a][b]=cells[walls[index][0][0]][walls[index][0][1]]
                                }
                            }
                        }
                    }
                    walls.splice(index,1)
                }
                mapping=[]
                for(let a=0,la=cellHeight*4+1;a<la;a++){
                    mapping.push([])
                    for(let b=0,lb=cellWidth*4+1;b<lb;b++){
                        mapping[a].push(a==0||a==la-1||b==0||b==lb-1?1:0)
                    }
                }
                for(let a=0,la=survivorWalls.length;a<la;a++){
                    for(let b=0,lb=3;b<lb;b++){
                        if(survivorWalls[a][0][0]==survivorWalls[a][1][0]){
                            mapping[survivorWalls[a][0][0]*4+1+b][survivorWalls[a][0][1]*2+survivorWalls[a][1][1]*2+2]=1
                        }else{
                            mapping[survivorWalls[a][0][0]*2+survivorWalls[a][1][0]*2+2][survivorWalls[a][0][1]*4+1+b]=1
                        }
                    }
                }
                let mids=[]
                for(let a=0,la=cellHeight-1;a<la;a++){
                    for(let b=0,lb=cellWidth-1;b<lb;b++){
                        if(
                            mapping[a*4+3][b*4+4]==1||
                            mapping[a*4+5][b*4+4]==1||
                            mapping[a*4+4][b*4+3]==1||
                            mapping[a*4+4][b*4+5]==1
                        ){
                            mapping[a*4+4][b*4+4]=1
                        }else if(!(b>=3&&b<lb-3&&a<2)){
                            mids.push([a+0.5,b+0.5])
                        }
                    }
                }
                spent=[]
                for(let a=0,la=mapping.length;a<la;a++){
                    spent.push([])
                    for(let b=0,lb=mapping[a].length;b<lb;b++){
                        spent[a].push(false)
                    }
                }
                this.entities={players:[],walls:[[],[]],projectiles:[]}
                this.control.bound={base:{x:0,y:0},width:this.layer.width,height:this.layer.height,radius:0}
                for(let a=0,la=mapping.length;a<la;a++){
                    for(let b=0,lb=mapping[a].length;b<lb;b++){
                        if(!spent[a][b]){
                            spent[a][b]=true
                            switch(mapping[a][b]){
                                case 1:
                                    let total=1
                                    for(let c=0,lc=la-a-1;c<lc;c++){
                                        if(mapping[a][b]==mapping[a+c+1][b]){
                                            total++
                                            spent[a+c+1][b]=true
                                        }else{
                                            c=lc
                                        }
                                    }
                                    this.entities.walls[1].push(new wall(this.layer,20*(b+0.5+1.5),20*(a+total*0.5+0.5),20,20*total,0,{base:[100,100,100]}))
                                break
                            }
                        }
                    }
                }
                this.entities.walls[1].push(new wall(this.layer,15,this.layer.height*0.5,30,this.layer.height,0,{base:[100,100,100]}))
                this.entities.walls[1].push(new wall(this.layer,this.layer.width-15,this.layer.height*0.5,30,this.layer.height,0,{base:[100,100,100]}))
                this.entities.walls[1].push(new wall(this.layer,this.layer.width*0.5,5,this.layer.width-60,10,0,{base:[100,100,100]}))
                this.entities.walls[1].push(new wall(this.layer,this.layer.width*0.5,this.layer.height-5,this.layer.width-60,10,0,{base:[100,100,100]}))
                let ends=[]
                let boxes=[]
                for(let a=0,la=cellHeight;a<la;a++){
                    for(let b=0,lb=cellWidth;b<lb;b++){
                        if(!(b>=3&&b<lb-3&&a<2)){
                            if(blockings[a][b]>=3){
                                ends.push([a,b])
                            }else{
                                boxes.push([a,b])
                            }
                        }
                    }
                }
                this.control.box=floor(random(0,20))
                set=shuffleArray(range(0,20))
                let backBoxes=[]
                let lastBoxes=[]
                for(let a=0,la=20;a<la;a++){
                    if(ends.length>0){
                        let index=floor(random(0,ends.length))
                        this.entities.walls[0].push(new wall(this.layer,80+ends[index][1]*80,60+ends[index][0]*80,40,40,11,{base:[[160,100,40],[120,70,20]],text:[25,25,25]}))
                        last(this.entities.walls[0]).text=set[a]
                        for(let b=0,lb=boxes.length;b<lb;b++){
                            if(
                                boxes[b][0]==ends[index][0]-1&&boxes[b][1]==ends[index][1]||
                                boxes[b][0]==ends[index][0]+1&&boxes[b][1]==ends[index][1]||
                                boxes[b][0]==ends[index][0]&&boxes[b][1]==ends[index][1]-1||
                                boxes[b][0]==ends[index][0]&&boxes[b][1]==ends[index][1]+1
                            ){
                                backBoxes.push(boxes[b])
                                boxes.splice(b,1)
                                b--
                                lb--
                            }
                        }
                        ends.splice(index,1)
                    }else if(mids.length>0){
                        let index=floor(random(0,mids.length))
                        this.entities.walls[0].push(new wall(this.layer,80+mids[index][1]*80,60+mids[index][0]*80,40,40,11,{base:[[160,100,40],[120,70,20]],text:[25,25,25]}))
                        last(this.entities.walls[0]).text=set[a]
                        for(let b=0,lb=boxes.length;b<lb;b++){
                            if(abs(boxes[b][0]-mids[index][0]<1)&&abs(boxes[b][1]-mids[index][1]<1)){
                                lastBoxes.push(boxes[b])
                                boxes.splice(b,1)
                                b--
                                lb--
                            }
                        }
                        mids.splice(index,1)
                    }else if(boxes.length>0){
                        let index=floor(random(0,boxes.length))
                        this.entities.walls[0].push(new wall(this.layer,80+boxes[index][1]*80,60+boxes[index][0]*80,40,40,11,{base:[[160,100,40],[120,70,20]],text:[25,25,25]}))
                        last(this.entities.walls[0]).text=set[a]
                        boxes.splice(index,1)
                    }else if(backBoxes.length>0){
                        let index=floor(random(0,backBoxes.length))
                        this.entities.walls[0].push(new wall(this.layer,80+backBoxes[index][1]*80,60+backBoxes[index][0]*80,40,40,11,{base:[[160,100,40],[120,70,20]],text:[25,25,25]}))
                        last(this.entities.walls[0]).text=set[a]
                        backBoxes.splice(index,1)
                    }else if(lastBoxes.length>0){
                        let index=floor(random(0,lastBoxes.length))
                        this.entities.walls[0].push(new wall(this.layer,80+lastBoxes[index][1]*80,60+lastBoxes[index][0]*80,40,40,11,{base:[[160,100,40],[120,70,20]],text:[25,25,25]}))
                        last(this.entities.walls[0]).text=set[a]
                        lastBoxes.splice(index,1)
                    }
                }
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    switch(a){
                        case 0:
                            this.entities.players.push(new player(this.layer,this.layer.width/2,60,1,13,a,this.operation.player[a]))
                            last(this.entities.players).direction.main=45
                            last(this.entities.players).direction.goal=45
                        break
                        case 1:
                            this.entities.players.push(new player(this.layer,this.layer.width/2-80,60,1,13,a,this.operation.player[a]))
                            last(this.entities.players).direction.main=225
                            last(this.entities.players).direction.goal=225
                        break
                        case 2:
                            this.entities.players.push(new player(this.layer,this.layer.width/2+80,60,1,13,a,this.operation.player[a]))
                            last(this.entities.players).direction.main=135
                            last(this.entities.players).direction.goal=135
                        break
                        case 3:
                            this.entities.players.push(new player(this.layer,this.layer.width/2,140,1,13,a,this.operation.player[a]))
                            last(this.entities.players).direction.main=315
                            last(this.entities.players).direction.goal=315
                        break
                    }
                }
                for(let a=0,la=8;a<la;a++){
                    for(let b=0,lb=this.entities.walls.length;b<lb;b++){
                        for(let c=0,lc=this.entities.walls[b].length;c<lc;c++){
                            this.entities.walls[b][c].ladder(a,this.entities.walls[b])
                        }
                        for(let c=0,lc=this.entities.walls[b].length;c<lc;c++){
                            if(this.entities.walls[b][c].remove){
                                this.entities.walls[b].splice(c,1)
                                c--
                                lc--
                            }
                        }
                    }
                }
            break
            case 21:
                this.entities={players:[],projectiles:[]}
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.entities.players.push(new player(this.layer,this.layer.width/2-this.layer.height*0.2*lsin(a/la*360),this.layer.height/2-this.layer.height*0.2*lcos(a/la*360),1,14,a,this.operation.player[a]))
                    last(this.entities.players).direction.main=a/la*360
                    last(this.entities.players).direction.goal=a/la*360
                }
                this.control.bound={base:{x:0,y:0},width:this.layer.width,height:this.layer.height,radius:0,projectileRadius:this.layer.height*0.45}
            break
            case 22:
                this.entities={players:[],projectiles:[]}
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.entities.players.push(new player(this.layer,this.layer.width/2+this.layer.height*0.1*lsin(a/la*360),this.layer.height/2+this.layer.height*0.1*lcos(a/la*360),3,2,a,this.operation.player[a]))
                    last(this.entities.players).direction.main=a/la*360
                    last(this.entities.players).direction.goal=a/la*360
                }
                this.control.bound={base:{x:0,y:0},width:this.layer.width,height:this.layer.height,radius:0}
            break
            case 23:
                this.control.sender=0
                this.entities={players:[]}
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.entities.players.push(new player(this.layer,this.layer.width/2,this.layer.height/2+50-la*50+a*100,1,16,a,this.operation.player[a]))
                }
                this.control.bound={base:{x:0,y:0},width:this.layer.width,height:this.layer.height,radius:0}
            break
            case 24:
                this.entities={players:[],projectiles:[]}
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.entities.players.push(new player(this.layer,this.layer.width/2+100-la*100+a*200,this.layer.height/2,1,17,a,this.operation.player[a]))
                }
                this.control.bound={base:{x:0,y:0},width:this.layer.width,height:this.layer.height,radius:0}
            break
            case 25:
                this.entities={players:[],walls:[]}
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.entities.players.push(new player(this.layer,this.layer.width/2+100-la*100+a*200,this.layer.height*0.9,0,3,a,this.operation.player[a]))
                }
                this.entities.players[floor(random(0,this.operation.player.length))].timer.bomb=600
                this.entities.walls.push(new wall(this.layer,this.layer.width/2,15,this.layer.width,30,0,{base:[100,100,100]}))
                this.entities.walls.push(new wall(this.layer,this.layer.width/2,this.layer.height-15,this.layer.width,30,0,{base:[100,100,100]}))
                this.entities.walls.push(new wall(this.layer,15,this.layer.height/2,30,this.layer.height-30,0,{base:[100,100,100]}))
                this.entities.walls.push(new wall(this.layer,this.layer.width-15,this.layer.height/2,30,this.layer.height-30,0,{base:[100,100,100]}))
                this.entities.walls.push(new wall(this.layer,this.layer.width/2,this.layer.height-135,120,30,0,{base:[100,100,100]}))
                this.entities.walls.push(new wall(this.layer,this.layer.width/2-300,this.layer.height-135,120,30,0,{base:[100,100,100]}))
                this.entities.walls.push(new wall(this.layer,this.layer.width/2+300,this.layer.height-135,120,30,0,{base:[100,100,100]}))
                this.entities.walls.push(new wall(this.layer,this.layer.width/2-150,this.layer.height-255,120,30,0,{base:[100,100,100]}))
                this.entities.walls.push(new wall(this.layer,this.layer.width/2+150,this.layer.height-255,120,30,0,{base:[100,100,100]}))
                this.entities.walls.push(new wall(this.layer,this.layer.width/2-420,this.layer.height-255,60,30,0,{base:[100,100,100]}))
                this.entities.walls.push(new wall(this.layer,this.layer.width/2+420,this.layer.height-255,60,30,0,{base:[100,100,100]}))
                this.entities.walls.push(new wall(this.layer,this.layer.width/2-300,this.layer.height-375,120,30,0,{base:[100,100,100]}))
                this.entities.walls.push(new wall(this.layer,this.layer.width/2+300,this.layer.height-375,120,30,0,{base:[100,100,100]}))
                this.control.bound={base:{x:0,y:0},width:this.layer.width,height:this.layer.height,radius:0}
                for(let a=0,la=8;a<la;a++){
                    for(let b=0,lb=this.entities.walls.length;b<lb;b++){
                        this.entities.walls[b].ladder(a,this.entities.walls)
                    }
                    for(let b=0,lb=this.entities.walls.length;b<lb;b++){
                        if(this.entities.walls[b].remove){
                            this.entities.walls.splice(b,1)
                            b--
                            lb--
                        }
                    }
                }
            break
            case 26:
                this.control.cycle={phase:0,timer:0}
                this.entities={players:[],walls:[[],[]]}
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.entities.players.push(new player(this.layer,this.layer.width/2+60-la*60+a*120,this.layer.height*0.75-10,2,1,a,this.operation.player[a]))
                }
                set=[
                    [[0,1],[0,2],[1,2]],
                    [[1,2],[0,2],[0,1]],
                    [[1,2],[0,2],[1,2]],
                    [[0,1],[0,2],[0,1]],
                    [[0,2],[0,2],[0,0]],
                    [[0,0],[0,2],[0,2]],
                    [[0,1],[0,1],[0,2]],
                    [[0,2],[0,1],[0,1]],
                    [[1,2],[1,2],[0,2]],
                    [[0,2],[1,2],[1,2]],
                    [[0,3],[0,1],[0,0]],
                    [[0,3],[1,2],[0,0]],
                    [[0,3],[2,3],[0,0]],
                    [[0,0],[0,3],[0,1]],
                    [[0,0],[0,3],[1,2]],
                    [[0,0],[0,3],[2,3]],
                    [[0,1],[0,3],[0,0]],
                    [[1,2],[0,3],[0,0]],
                    [[2,3],[0,3],[0,0]],
                    [[0,0],[0,1],[0,3]],
                    [[0,0],[1,2],[0,3]],
                    [[0,0],[2,3],[0,3]]
                ]
                for(let a=0,la=this.operation.player.length+1;a<la;a++){
                    let index=floor(random(0,set.length))
                    this.entities.walls[1].push(new wall(this.layer,this.layer.width*0.5+a*120-la*60+60,this.layer.height*0.875,100,100,12,{base:[80,80,80],internal:[60,60,60],wire:[100,100,100],grid:[200,200,200],block:[160,120,200]}))
                    last(this.entities.walls[1]).set=set[index]
                    set.splice(index,1)
                }
            break
            case 27:
                this.entities={players:[],walls:[]}
                this.entities.walls.push(new wall(this.layer,this.layer.width/2,90,this.layer.width-60,30,1,{base:[[225,225,225],[50,50,50]]}))
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.entities.players.push(new player(this.layer,this.layer.width/2+100-la*100+a*200,this.layer.height*0.9,0,4,a,this.operation.player[a]))
                    last(this.entities.players).direction.main=0
                    last(this.entities.players).direction.goal=0
                    this.entities.walls.push(new wall(this.layer,this.layer.width/2+100-la*100+a*200,this.layer.height-150,40,40,14,{base:[160,160,200],over:[180,180,240],button:[120,120,140],success:[50,250,50],fail:[250,50,50]}))
                }
                this.entities.walls.push(new wall(this.layer,this.layer.width/2,this.layer.height-15,this.layer.width,30,0,{base:[100,100,100]}))
                this.entities.walls.push(new wall(this.layer,15,this.layer.height/2-7.5,30,this.layer.height-15,0,{base:[100,100,100]}))
                this.entities.walls.push(new wall(this.layer,this.layer.width-15,this.layer.height/2-7.5,30,this.layer.height-15,0,{base:[100,100,100]}))
                this.control.bound={base:{x:0,y:0},width:this.layer.width,height:this.layer.height,radius:0}
                for(let a=0,la=8;a<la;a++){
                    for(let b=0,lb=this.entities.walls.length;b<lb;b++){
                        this.entities.walls[b].ladder(a,this.entities.walls)
                    }
                    for(let b=0,lb=this.entities.walls.length;b<lb;b++){
                        if(this.entities.walls[b].remove){
                            this.entities.walls.splice(b,1)
                            b--
                            lb--
                        }
                    }
                }
            break
            case 28:
                this.entities={players:[],projectiles:[]}
                spawnable=[...range(1,5),...range(1,5),...range(1,5),...range(1,5),...range(1,6),...range(1,6),...range(1,6),...range(1,6)]
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.entities.players.push(new player(this.layer,this.layer.width/2-this.layer.height*0.4*lsin(a/la*360),this.layer.height/2-this.layer.height*0.4*lcos(a/la*360),1,18,a,this.operation.player[a]))
                    last(this.entities.players).scale(0.6)
                    last(this.entities.players).direction.main=a/la*360
                    last(this.entities.players).direction.goal=a/la*360
                }
                let pastR=0
                let firstR=0
                this.control.total=0
                for(let a=0,la=spawnable.length;a<la;a++){
                    let index=floor(random(0,spawnable.length))
                    let r=sqrt(random(80**2,190**2))
                    while(abs(r-pastR)<20||a==la-1&&abs(r-firstR)<20){
                        r=sqrt(random(80**2,190**2))
                    }
                    let dir=(a+random(0,0.5))/la*360
                    this.entities.projectiles.push(new projectile(this.layer,this.layer.width/2-r*lsin(dir),this.layer.height/2-r*lcos(dir),13,{direction:dir,value:spawnable[index]}))
                    last(this.entities.projectiles).size*=0.6
                    last(this.entities.projectiles).radius*=0.6
                    this.control.total+=spawnable[index]
                    spawnable.splice(index,1)
                    pastR=r
                    if(a==0){
                        firstR=r
                    }
                }
            break
            case 29:
                this.entities={players:[],walls:[],projectiles:[]}
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.entities.players.push(new player(this.layer,60,this.layer.height*0.5+30-la*30+a*60,1,19,a,this.operation.player[a]))
                    last(this.entities.players).direction.main=90
                    last(this.entities.players).direction.goal=90
                }
                this.entities.walls.push(new wall(this.layer,this.layer.width-60,this.layer.height/2,30,this.layer.height-180,1,{base:[[225,225,225],[50,50,50]]}))
                this.entities.walls.push(new wall(this.layer,this.layer.width/2,90,this.layer.width,180,0,{base:[100,100,100]}))
                this.entities.walls.push(new wall(this.layer,this.layer.width/2,this.layer.height-90,this.layer.width,180,0,{base:[100,100,100]}))
                this.entities.walls.push(new wall(this.layer,15,this.layer.height/2,30,this.layer.height-180,0,{base:[100,100,100]}))
                this.entities.walls.push(new wall(this.layer,this.layer.width-15,this.layer.height/2,30,this.layer.height-180,0,{base:[100,100,100]}))
                this.control.bound={base:{x:0,y:180},width:this.layer.width,height:this.layer.height-360,radius:0}
                for(let a=0,la=20;a<la;a++){
                    for(let b=0,lb=6-a%2;b<lb;b++){
                        //this.entities.projectiles.push(new projectile(this.layer,this.layer.width/2+(-la*10+10+a*20)*constants.sqrt3,this.layer.height*0.5-lb*20+20+b*40,14))
                    }
                }
                for(let a=0,la=8;a<la;a++){
                    for(let b=0,lb=this.entities.walls.length;b<lb;b++){
                        this.entities.walls[b].ladder(a,this.entities.walls)
                    }
                    for(let b=0,lb=this.entities.walls.length;b<lb;b++){
                        if(this.entities.walls[b].remove){
                            this.entities.walls.splice(b,1)
                            b--
                            lb--
                        }
                    }
                }
            break
            case 30:
                this.entities={players:[],walls:[],projectiles:[]}
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.entities.players.push(new player(this.layer,this.layer.width/2+100-la*100+a*200,this.layer.height/2,1,0,a,this.operation.player[a]))
                }
                this.entities.walls.push(new wall(this.layer,this.layer.width/2,0,200,0,16,{base:[[100,100,100],[225,225,225]]}))
                this.control.bound={base:{x:0,y:0},width:this.layer.width,height:this.layer.height,radius:0}
            break
            case 31:
                this.entities={players:[],walls:[]}
                switch(this.operation.player.length){
                    case 1:
                        this.control.pos=[
                            [this.layer.width/2,this.layer.height/2]
                        ]
                    break
                    case 2:
                        this.control.pos=[
                            [this.layer.width/2-140,this.layer.height/2],
                            [this.layer.width/2+140,this.layer.height/2]
                        ]
                    break
                    case 3:
                        this.control.pos=[
                            [this.layer.width/2-140,this.layer.height/2-140],
                            [this.layer.width/2+140,this.layer.height/2-140],
                            [this.layer.width/2,this.layer.height/2+140],
                        ]
                    break
                    case 4:
                        this.control.pos=[
                            [this.layer.width/2-140,this.layer.height/2],
                            [this.layer.width/2+140,this.layer.height/2]
                        ]
                        ticker=[floor(random(0,this.teams.split.length)),floor(random(0,this.operation.player.length-this.teams.split.length))]
                    break
                }
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    if(this.operation.player.length==4){
                        let pos=this.control.pos[this.teams.split.includes(a)?0:1]
                        if(this.teams.split.includes(a)){
                            this.entities.players.push(new player(this.layer,pos[0],pos[1]-50+ticker[0]*100,1,20,a,this.operation.player[a]))
                            last(this.entities.players).interact=0
                            ticker[0]=1-ticker[0]
                        }else{
                            this.entities.players.push(new player(this.layer,pos[0],pos[1]-50+ticker[1]*100,1,20,a,this.operation.player[a]))
                            last(this.entities.players).interact=1
                            ticker[1]=1-ticker[1]
                        }
                    }else{
                        let pos=this.control.pos[a]
                        this.entities.players.push(new player(this.layer,pos[0],pos[1],1,20,a,this.operation.player[a]))
                        last(this.entities.players).interact=a
                    }
                }
                for(let a=0,la=[0,1,2,3,2][this.operation.player.length];a<la;a++){
                    let pos=this.control.pos[a]
                    this.entities.walls.push([])
                    this.entities.walls[a].push(new wall(this.layer,pos[0]-100,pos[1]-100,50,50,17,{base:[[120,75,60],[180,125,100]]}))
                    this.entities.walls[a].push(new wall(this.layer,pos[0]+100,pos[1]-100,50,50,17,{base:[[120,75,60],[180,125,100]]}))
                    this.entities.walls[a].push(new wall(this.layer,pos[0]-100,pos[1]-50,50,50,18,{base:[[120,75,60],[180,125,100]],conveyor:[[75,75,75],[90,90,90],[50,150,250]]}))
                    last(this.entities.walls[a]).id=a
                    this.entities.walls[a].push(new wall(this.layer,pos[0]+100,pos[1]-50,50,50,20,{base:[[120,75,60],[180,125,100]],burner:[[180,180,180],[40,40,40]]}))
                    this.entities.walls[a].push(new wall(this.layer,pos[0]-100,pos[1],50,50,17,{base:[[120,75,60],[180,125,100]]}))
                    this.entities.walls[a].push(new wall(this.layer,pos[0]+100,pos[1],50,50,17,{base:[[120,75,60],[180,125,100]]}))
                    this.entities.walls[a].push(new wall(this.layer,pos[0]-100,pos[1]+50,50,50,19,{base:[[120,75,60],[180,125,100]],conveyor:[[75,75,75],[90,90,90],[50,150,250]]}))
                    this.entities.walls[a].push(new wall(this.layer,pos[0]+100,pos[1]+50,50,50,20,{base:[[120,75,60],[180,125,100]],burner:[[180,180,180],[40,40,40]]}))
                    this.entities.walls[a].push(new wall(this.layer,pos[0]-100,pos[1]+100,50,50,17,{base:[[120,75,60],[180,125,100]]}))
                    this.entities.walls[a].push(new wall(this.layer,pos[0]+100,pos[1]+100,50,50,17,{base:[[120,75,60],[180,125,100]]}))
                    this.entities.walls[a].push(new wall(this.layer,pos[0],pos[1]-100,50,50,17,{base:[[120,75,60],[180,125,100]]}))
                    last(this.entities.walls[a]).projectile=new projectile(this.layer,0,0,16,{variant:0})
                    this.entities.walls[a].push(new wall(this.layer,pos[0],pos[1]+100,50,50,17,{base:[[120,75,60],[180,125,100]]}))
                    last(this.entities.walls[a]).projectile=new projectile(this.layer,0,0,16,{variant:0})
                    this.entities.walls[a].push(new wall(this.layer,pos[0]-50,pos[1]-100,50,50,23,{base:[[120,75,60],[180,125,100],[180,220,220],[220,220,220],[180,200,200]]}))
                    this.entities.walls[a].push(new wall(this.layer,pos[0]-50,pos[1]+100,50,50,24,{base:[[120,75,60],[180,125,100],[200,200,200]],pin:[170,170,130]}))
                    this.entities.walls[a].push(new wall(this.layer,pos[0]+50,pos[1]-100,50,50,21,{base:[[120,75,60],[180,125,100],[70,60,50]]}))
                    this.entities.walls[a].push(new wall(this.layer,pos[0]+50,pos[1]+100,50,50,22,{base:[[120,75,60],[180,125,100],[70,60,50]]}))
                }
                this.control.bound={base:{x:0,y:0},width:this.layer.width,height:this.layer.height,radius:0}
            break
        }
    }
    setup(){
        switch(this.minigame){
            case 0: case 3: case 6: case 7: case 8: case 9: case 10: case 11: case 12: case 14:
            case 15: case 18: case 19: case 20: case 21: case 22: case 23: case 24: case 25: case 28:
            case 29: case 30:
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
            case 5: case 31:
                this.result.score=this.operation.player.length==3?[0,0,0]:[0,0]
                this.reset()
            break
            case 17:
                this.result.score=[]
                for(let a=0,la=this.operation.player.length;a<la;a++){
                    this.result.score.push(0)
                }
                this.result.timer=[]
                this.result.timer.push(3600)
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
                    case 0: case 10: case 24:
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
                        this.layer.rect(this.layer.width*0.5,this.layer.height*0.5,this.layer.width-200,this.layer.height-200)
                        if(this.operation.player.length==3){
                            this.layer.rect(this.layer.width*0.5,this.layer.height*0.5-50,150,this.layer.height-100)
                            this.layer.rect(this.layer.width*0.5,this.layer.height*0.5+60,this.layer.width,150)
                        }else{
                            this.layer.rect(this.layer.width*0.5,this.layer.height*0.5,this.layer.width,150)
                        }
                        this.layer.fill(150)
                        this.layer.rect(this.layer.width*0.5-250,this.layer.height*0.5,5,this.layer.height-200)
                        this.layer.rect(this.layer.width*0.5+250,this.layer.height*0.5,5,this.layer.height-200)
                        switch(this.operation.player.length){
                            case 3:
                                this.layer.rect(this.layer.width*0.5,this.layer.height*0.5-120,this.layer.width-200,5)
                            break
                            case 4:
                                this.layer.rect(this.layer.width*0.5-150,this.layer.height*0.5,5,this.layer.height-200)
                                this.layer.rect(this.layer.width*0.5+150,this.layer.height*0.5,5,this.layer.height-200)
                            break
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
                        if(this.operation.player.length<=3){
                            for(let a=0,la=this.control.playerSet.length;a<la;a++){
                                this.layer.text(types.player[this.operation.player[this.control.playerSet[a]]].name+`: `+this.result.score[a],5,12+this.control.playerSet[a]*16)
                            }
                        }else{
                            this.layer.text('Score: '+this.result.score[0],5,12)
                            this.layer.textAlign(RIGHT,CENTER)
                            this.layer.text('Score: '+this.result.score[1],this.layer.width-5,12)
                        }
                        this.layer.textAlign(CENTER,CENTER)
                    break
                    case 6:
                        this.layer.background(100)
                        this.layer.fill(0)
                        this.layer.ellipse(this.layer.width/2,this.layer.height/2,this.layer.height*max(0.9-this.control.timer/3600,0.4))
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
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].displayOver()
                        }
                        this.layer.fill(255)
                        this.layer.textAlign(LEFT,CENTER)
                        this.layer.textSize(12)
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.layer.text(types.player[this.operation.player[a]].name+`: `+this.result.score[a],5,12+a*16)
                        }
                        this.layer.textAlign(CENTER,CENTER)
                    break
                    case 11:
                        this.layer.background(0)
                        this.layer.fill(120)
                        this.layer.rect(this.layer.width*0.5,this.layer.height*0.5,500,96,4)
                        this.layer.rect(this.layer.width*0.5,this.layer.height*0.5-100,500,96,4)
                        this.layer.rect(this.layer.width*0.5,this.layer.height*0.5+100,500,96,4)
                        this.layer.fill(90)
                        let bump=this.control.turn%50
                        for(let a=0,la=10;a<la;a++){
                            if(a==0&&bump<5){
                                this.layer.rect(this.layer.width*0.5-250+a*50+2.5+bump*0.5,this.layer.height*0.5,bump+5,96,2)
                            }else if(a==la-1&&bump>45){
                                this.layer.rect(this.layer.width*0.5-250+a*50+22.5+bump*0.5,this.layer.height*0.5,55-bump,96,2)
                            }else{
                                this.layer.rect(this.layer.width*0.5-250+a*50+bump,this.layer.height*0.5,10,96,2)
                            }
                            if(a==0&&bump>45){
                                this.layer.rect(this.layer.width*0.5-275+a*50+2.5+bump*0.5,this.layer.height*0.5,bump-45,96,2)
                            }else if(a==la-1&&bump<5){
                                this.layer.rect(this.layer.width*0.5-225+a*50+22.5+bump*0.5,this.layer.height*0.5,5-bump,96,2)
                            }
                            for(let b=0,lb=2;b<lb;b++){
                                if(a==0&&bump<5){
                                    this.layer.rect(this.layer.width*0.5+250-a*50-2.5-bump*0.5,this.layer.height*0.5-100+b*200,bump+5,96,2)
                                }else if(a==la-1&&bump>45){
                                    this.layer.rect(this.layer.width*0.5+250-a*50-22.5-bump*0.5,this.layer.height*0.5-100+b*200,55-bump,96,2)
                                }else{
                                    this.layer.rect(this.layer.width*0.5+250-a*50-bump,this.layer.height*0.5-100+b*200,10,96,2)
                                }
                                if(a==0&&bump>45){
                                    this.layer.rect(this.layer.width*0.5+275-a*50-2.5-bump*0.5,this.layer.height*0.5-100+b*200,bump-45,96,2)
                                }else if(a==la-1&&bump<5){
                                    this.layer.rect(this.layer.width*0.5+225-a*50-22.5-bump*0.5,this.layer.height*0.5-100+b*200,5-bump,96,2)
                                }
                            }
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
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.layer.text(types.player[this.operation.player[a]].name+`: `+this.result.score[a],5,12+a*16)
                        }
                        this.layer.textAlign(CENTER,CENTER)
                    break
                    case 12: case 15: case 16:
                        this.layer.background(0)
                        for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                            this.entities.projectiles[a].display()
                        }
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].display()
                        }
                        for(let a=0,la=this.entities.walls.length;a<la;a++){
                            this.entities.walls[a].display()
                        }
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].displayOver()
                        }
                        this.layer.fill(255)
                        this.layer.textAlign(LEFT,CENTER)
                        this.layer.textSize(12)
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.layer.text(types.player[this.operation.player[a]].name+`: `+this.result.score[a],5,12+a*16)
                        }
                        this.layer.textAlign(CENTER,CENTER)
                    break
                    case 13:
                        this.layer.background(100)
                        this.layer.fill(0)
                        this.layer.ellipse(this.layer.width/2,this.layer.height*0.3,this.layer.height*0.4)
                        this.layer.rect(this.layer.width/2,this.layer.height*0.65,this.layer.height*0.4,this.layer.height*0.7)
                        this.layer.stroke(150)
                        this.layer.strokeWeight(50)
                        this.layer.ellipse(this.layer.width/2,this.layer.height*0.3,100)
                        this.layer.line(this.layer.width/2,this.layer.height*0.3+110,this.layer.width/2,this.layer.height)
                        this.layer.noStroke()
                        for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                            this.entities.projectiles[a].display()
                        }
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].display()
                        }
                    break
                    case 14:
                        this.layer.background(0)
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].display()
                        }
                    break
                    case 17:
                        this.layer.background(100)
                        this.layer.fill(200)
                        this.layer.ellipse(this.layer.width/2,this.layer.height/2,this.layer.height*0.9)
                        this.layer.push()
                        this.layer.translate(this.layer.width/2,this.layer.height/2)
                        this.layer.rotate(180/this.operation.player.length)
                        for(let a=0,la=this.operation.player.length;a<la;a++){
                            this.layer.fill(mergeColor(this.entities.players[a].color.skin.head,[0,0,0],0.2))
                            this.layer.quad(-2,-2/abs(tan(180/la)),-4,-4/abs(tan(180/la)),-4,-300,-2,-300)
                            this.layer.rotate(-360/la)
                            this.layer.quad(2,-2/abs(tan(180/la)),4,-4/abs(tan(180/la)),4,-300,2,-300)
                        }
                        this.layer.pop()
                        this.layer.noFill()
                        this.layer.stroke(100)
                        this.layer.strokeWeight(this.layer.height*0.1)
                        this.layer.ellipse(this.layer.width/2,this.layer.height/2,this.layer.height)
                        this.layer.noStroke()
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].display()
                        }
                        this.layer.fill(255)
                        this.layer.textAlign(LEFT,CENTER)
                        this.layer.textSize(12)
                        this.layer.text(formatTime(this.result.timer[0]),5,12)
                        for(let a=0,la=this.operation.player.length;a<la;a++){
                            this.layer.text(types.player[this.operation.player[a]].name+`: `+this.result.score[a],5,28+a*16)
                        }
                        this.layer.textAlign(CENTER,CENTER)
                    break
                    case 18:
                        this.layer.background(0)
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].display()
                        }
                        for(let a=0,la=this.entities.walls.length;a<la;a++){
                            this.entities.walls[a].display()
                        }
                        for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                            this.entities.projectiles[a].display()
                        }
                        this.layer.fill(255)
                        this.layer.textAlign(LEFT,CENTER)
                        this.layer.textSize(12)
                        for(let a=0,la=this.operation.player.length;a<la;a++){
                            this.layer.text(types.player[this.operation.player[a]].name+`: `+this.result.score[a],5,12+a*16)
                        }
                        this.layer.textAlign(CENTER,CENTER)
                    break
                    case 19: case 25:
                        this.layer.background(0)
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].display()
                        }
                        for(let a=0,la=this.entities.walls.length;a<la;a++){
                            this.entities.walls[a].display()
                        }
                        this.layer.fill(255)
                        this.layer.textAlign(LEFT,CENTER)
                        this.layer.textSize(12)
                        for(let a=0,la=this.operation.player.length;a<la;a++){
                            this.layer.text(types.player[this.operation.player[a]].name+`: `+this.result.score[a],5,12+a*16)
                        }
                        this.layer.textAlign(CENTER,CENTER)
                    break
                    case 20:
                        this.layer.background(0)
                        for(let a=0,la=this.entities.walls[0].length;a<la;a++){
                            this.entities.walls[0][a].display()
                        }
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].display()
                        }
                        for(let a=0,la=this.entities.walls[1].length;a<la;a++){
                            this.entities.walls[1][a].display()
                        }
                        this.graphics.main[0].background(0)
                        this.graphics.main[0].erase()
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.graphics.main[0].ellipse(this.entities.players[a].position.x,this.entities.players[a].position.y,150)
                        }
                        this.layer.image(this.graphics.main[0],this.layer.width/2,this.layer.height/2)
                        this.layer.fill(255)
                        this.layer.textAlign(LEFT,CENTER)
                        this.layer.textSize(12)
                        for(let a=0,la=this.operation.player.length;a<la;a++){
                            this.layer.text(types.player[this.operation.player[a]].name+`: `+this.result.score[a],5,12+a*16)
                        }
                        this.layer.textAlign(CENTER,CENTER)
                        this.layer.text(`Find Box ${this.control.box}`,this.layer.width/2,12)
                    break
                    case 21:
                        this.layer.background(0)
                        this.layer.fill(150,200,225)
                        this.layer.ellipse(this.layer.width/2,this.layer.height/2,this.layer.height*0.9)
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].display()
                        }
                        for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                            this.entities.projectiles[a].display()
                        }
                        this.layer.fill(255)
                        this.layer.textAlign(LEFT,CENTER)
                        this.layer.textSize(12)
                        for(let a=0,la=this.operation.player.length;a<la;a++){
                            this.layer.text(types.player[this.operation.player[a]].name+`: `+this.result.score[a],5,12+a*16)
                        }
                        this.layer.textAlign(CENTER,CENTER)
                    break
                    case 22:
                        this.layer.background(0)
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].display()
                        }
                        for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                            this.entities.projectiles[a].display()
                        }
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].displayOver()
                        }
                        this.layer.fill(255)
                        this.layer.textAlign(LEFT,CENTER)
                        this.layer.textSize(12)
                        for(let a=0,la=this.operation.player.length;a<la;a++){
                            this.layer.text(types.player[this.operation.player[a]].name+`: `+this.result.score[a],5,12+a*16)
                        }
                        this.layer.textAlign(CENTER,CENTER)
                    break
                    case 23:
                        this.layer.background(0)
                        this.layer.fill(100)
                        this.layer.rect(this.layer.width*0.6+10,this.layer.height/2,this.layer.width*0.8+20,this.layer.height*0.6,10)
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].display()
                        }
                        this.layer.fill(255)
                        this.layer.textAlign(LEFT,CENTER)
                        this.layer.textSize(12)
                        for(let a=0,la=this.operation.player.length;a<la;a++){
                            this.layer.text(types.player[this.operation.player[a]].name+`: `+this.result.score[a],5,12+a*16)
                        }
                        this.layer.textAlign(CENTER,CENTER)
                    break
                    case 26:
                        this.layer.background(100)
                        this.layer.fill(0)
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.layer.rect(this.layer.width/2+a*120-la*60+60,this.layer.height*0.375-5,90,this.layer.height*0.75+10,5)
                        }
                        this.layer.noFill()
                        this.layer.strokeWeight(2)
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.layer.stroke(mergeColor(this.entities.players[a].color.skin.head,[100,100,100],0.75))
                            this.layer.rect(this.layer.width/2+a*120-la*60+60,this.layer.height*0.375,20,this.layer.height)
                            this.layer.rect(this.layer.width/2+a*120-la*60+60,this.layer.height*0.375,60,this.layer.height)
                            for(let b=0,lb=11;b<lb;b++){
                                this.layer.rect(this.layer.width/2+a*120-la*60+60,this.layer.height*0.75-lb*20-10,60,20+b*40)
                            }
                        }
                        this.layer.noStroke()
                        this.layer.fill(100)
                        this.layer.rect(this.layer.width/2,this.layer.height*0.875,this.layer.width,this.layer.height*0.25)
                        this.layer.fill(200)
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.layer.rect(this.layer.width/2+a*120-la*60+60,this.layer.height*0.75-400,90,3)
                        }
                        for(let a=0,la=this.entities.walls.length;a<la;a++){
                            for(let b=0,lb=this.entities.walls[a].length;b<lb;b++){
                                this.entities.walls[a][b].display()
                            }
                        }
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].display()
                        }
                    break
                    case 27:
                        this.layer.background(0)
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].display()
                        }
                        for(let a=0,la=this.entities.walls.length;a<la;a++){
                            this.entities.walls[a].display()
                        }
                    break
                    case 28:
                        this.layer.background(100)
                        this.layer.fill(0)
                        this.layer.ellipse(this.layer.width/2,this.layer.height/2,this.layer.height*0.9)
                        this.layer.fill(100)
                        this.layer.translate(this.layer.width/2,this.layer.height/2)
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.layer.rect(0,-this.layer.height*0.4,60,80)
                            this.layer.rotate(360/la)
                        }
                        this.layer.translate(-this.layer.width/2,-this.layer.height/2)
                        this.layer.noFill()
                        this.layer.stroke(150)
                        this.layer.strokeWeight(150)
                        this.layer.ellipse(this.layer.width/2,this.layer.height/2,270)
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
                        this.layer.text(`${this.control.total} Cookies Left`,5,12)
                        for(let a=0,la=this.operation.player.length;a<la;a++){
                            this.layer.text(types.player[this.operation.player[a]].name+`: `+this.result.score[a],5,28+a*16)
                        }
                        this.layer.textAlign(CENTER,CENTER)
                    break
                    case 29:
                        this.layer.background(200)
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].display()
                        }
                        for(let a=0,la=this.entities.walls.length;a<la;a++){
                            this.entities.walls[a].display()
                        }
                        for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                            this.entities.projectiles[a].display()
                        }
                        this.layer.fill(255)
                        this.layer.textAlign(LEFT,CENTER)
                        this.layer.textSize(12)
                        for(let a=0,la=this.operation.player.length;a<la;a++){
                            this.layer.text(types.player[this.operation.player[a]].name+`: `+this.result.score[a],5,12+a*16)
                        }
                        this.layer.textAlign(CENTER,CENTER)
                    break
                    case 30:
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
                        for(let a=0,la=this.operation.player.length;a<la;a++){
                            this.layer.text(types.player[this.operation.player[a]].name+`: `+this.result.score[a],5,12+a*16)
                        }
                        this.layer.textAlign(CENTER,CENTER)
                    break
                    case 31:
                        this.layer.background(100)
                        this.layer.fill(200)
                        for(let a=0,la=this.control.pos.length;a<la;a++){
                            this.layer.rect(this.control.pos[a][0],this.control.pos[a][1],250)
                        }
                        for(let a=0,la=this.entities.walls.length;a<la;a++){
                            for(let b=0,lb=this.entities.walls[a].length;b<lb;b++){
                                this.entities.walls[a][b].display()
                            }
                        }
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].display()
                        }
                        this.layer.fill(255)
                        this.layer.textAlign(LEFT,CENTER)
                        this.layer.textSize(12)
                        if(this.operation.player.length<=3){
                            for(let a=0,la=this.operation.player.length;a<la;a++){
                                this.layer.text(types.player[this.operation.player[a]].name+`: `+this.result.score[a],5,12+a*16)
                            }
                        }else{
                            this.layer.text('Score: '+this.result.score[0],5,12)
                            this.layer.textAlign(RIGHT,CENTER)
                            this.layer.text('Score: '+this.result.score[1],this.layer.width-5,12)
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
                    this.layer.stroke(0,this.subResult.anim)
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
                                                this.payout.main.push((c==result[1]?1:0)*this.payout.root*this.payout.mult+this.payout.add[a])
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
                        if(this.operation.player.length==3&&!this.result.end){
                            let end=false
                            this.result.winner=[]
                            for(let a=0,la=this.result.score.length;a<la;a++){
                                if(this.result.score[a]>=5&&!this.result.end){
                                    end=true
                                    this.result.winner.push(this.control.playerSet.indexOf(a))
                                }
                            }
                            if(end){
                                this.result.end=true
                            }
                        }else{
                            if(this.result.score[0]>=5&&!this.result.end){
                                this.result.end=true
                                this.result.winner=[]
                                for(let a=0,la=this.teams.split.length;a<la;a++){
                                    this.result.winner.push(this.teams.split[a])
                                }
                            }else if(this.result.score[1]>=5&&!this.result.end){
                                this.result.end=true
                                this.result.winner=range(0,this.operation.player.length)
                                for(let a=0,la=this.teams.split.length;a<la;a++){
                                    if(this.result.winner.includes(this.teams.split[a])){
                                        this.result.winner.splice(this.result.winner.indexOf(this.teams.split[a]),1)
                                    }
                                }
                            }
                        }
                        if(this.result.end&&this.result.anim<1){
                            this.result.anim+=0.1
                        }
                    break
                    case 6:
                        survive=0
                        this.control.bound.radius=this.layer.height*max(0.45-this.control.timer/7200,0.2)
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
                        }else if(this.control.sender>0){
                            this.control.sender--
                            let dir=random(0,360)
                            let r=random(this.layer.width*max(0.3-this.control.timer/9000,0.1),this.layer.width)
                            this.entities.projectiles.push(new projectile(this.layer,this.layer.width/2+lcos(dir)*r-lsin(dir)*this.layer.width,this.layer.height/2-lsin(dir)*r-lcos(dir)*this.layer.width,6,{direction:dir}))
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
                    case 11:
                        let vel=1+this.control.timer/600
                        this.control.turn+=vel
                        survive=0
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            if(
                                this.entities.players[a].position.x<this.layer.width/2-250-this.entities.players[a].radius||
                                this.entities.players[a].position.x>this.layer.width/2+250+this.entities.players[a].radius||
                                this.entities.players[a].position.y<this.layer.height/2-150-this.entities.players[a].radius||
                                this.entities.players[a].position.y>this.layer.height/2+150+this.entities.players[a].radius
                            ){
                                if(this.entities.players[a].size>0){
                                    this.entities.players[a].size-=0.1
                                    this.entities.players[a].stasis()
                                }else{
                                    this.entities.players[a].size=0
                                    this.entities.players[a].active=false
                                }
                            }else{
                                this.entities.players[a].update(this)
                                if(
                                    this.entities.players[a].position.y<this.layer.height/2-50-this.entities.players[a].radius||
                                    this.entities.players[a].position.y>this.layer.height/2+50+this.entities.players[a].radius
                                ){
                                    this.entities.players[a].position.x-=vel
                                }else{
                                    this.entities.players[a].position.x+=vel
                                }
                            }
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
                    case 12: case 15:
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
                            for(let b=a+1,lb=this.entities.projectiles.length;b<lb;b++){
                                this.entities.projectiles[a].collide(1,this.entities.projectiles[b],this)
                            }
                        }
                        for(let a=0,la=this.entities.walls.length;a<la;a++){
                            this.entities.walls[a].update()
                            for(let b=0,lb=this.entities.players.length;b<lb;b++){
                                this.entities.walls[a].collide(1,this.entities.players[b],this)
                            }
                            for(let b=0,lb=this.entities.projectiles.length;b<lb;b++){
                                this.entities.walls[a].collide(2,this.entities.projectiles[b],this)
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
                    case 13:
                        survive=0
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].update(this)
                            if(this.entities.players[a].active){
                                survive++
                            }
                        }
                        for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                            this.entities.projectiles[a].update(this)
                            if(this.entities.projectiles[a].fade.main<=0){
                                this.entities.projectiles[a].remove=true
                            }
                            if(this.entities.projectiles[a].remove){
                                this.entities.projectiles.splice(a,1)
                                a--
                                la--
                            }
                        }
                        if(survive<=1){
                            this.result.end=true
                            this.result.winner=[]
                            for(let a=0,la=this.entities.players.length;a<la;a++){
                                if(this.entities.players[a].active){
                                    this.result.winner.push(a)
                                }
                                this.payout.main.push((this.entities.players[a].active?1:0)*this.payout.root*this.payout.mult+this.payout.add[a])
                            }
                        }
                        if(this.result.end&&this.result.anim<1){
                            this.result.anim+=0.1
                        }
                        if(!this.result.end){
                            switch(this.control.cycle.phase){
                                case 0:
                                    for(let a=0,la=this.entities.players.length;a<la;a++){
                                        if(dirDist(this.entities.players[a].direction.main,0)<1){
                                            this.entities.players[a].visible=true
                                            if(this.entities.players[a].choice>=1){
                                                this.control.cycle.id=this.entities.players[a].id
                                                this.control.cycle.phase=1
                                                this.control.cycle.time=0
                                                this.control.cycle.pushing=this.entities.players[a].choice
                                            }
                                        }else{
                                            this.entities.players[a].choice=0
                                        }
                                    }
                                break
                                case 1:
                                    this.control.cycle.time++
                                    if(this.control.cycle.time>30&&this.control.cycle.pushing>0){
                                        for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                                            this.entities.projectiles[a].position.y--
                                        }
                                        if(this.control.cycle.time>=75){
                                            this.control.cycle.pushing--
                                            this.entities.projectiles[0].fade.trigger=false
                                            if(this.entities.projectiles[0].value==-1){
                                                for(let a=0,la=this.entities.players.length;a<la;a++){
                                                    if(dirDist(this.entities.players[a].direction.main,0)<1){
                                                        this.entities.players[a].active=false
                                                        this.entities.players[a].fade.trigger=false
                                                    }
                                                }
                                                this.control.cycle.phase=2
                                                this.control.cycle.time=0
                                            }else if(this.control.cycle.pushing>0){
                                                this.control.cycle.time-=45
                                            }else{
                                                this.control.cycle.phase=2
                                                this.control.cycle.time=0
                                            }
                                            this.control.spawnTick--
                                            if(this.control.spawnTick>0){
                                                this.entities.projectiles.push(new projectile(this.layer,this.layer.width/2,this.layer.height*0.3+425,4,{direction:floor(random(0,8))*45,value:floor(random(1,5))}))
                                            }else{
                                                this.entities.projectiles.push(new projectile(this.layer,this.layer.width/2,this.layer.height*0.3+425,4,{direction:floor(random(0,8))*45,value:-1}))
                                                this.control.spawnTick=floor(random(6,11))
                                            }
                                        }
                                    }
                                break
                                case 2:
                                    this.control.cycle.time++
                                    if(this.control.cycle.time>=15){
                                        for(let a=0,la=this.entities.players.length;a<la;a++){
                                            if(dirDist(this.entities.players[a].direction.main,0)<1&&this.entities.players[a].id!=this.control.cycle.id&&this.entities.players[a].active){
                                                this.control.cycle.phase=0
                                            }
                                        }
                                        if(this.control.cycle.phase==2){
                                            for(let a=0,la=this.entities.players.length;a<la;a++){
                                                if(this.control.cycle.time==15){
                                                    this.entities.players[a].visible=false
                                                }
                                                this.entities.players[a].direction.goal-=2
                                                this.entities.players[a].position.x=this.layer.width/2+50*lsin(this.entities.players[a].direction.goal)
                                                this.entities.players[a].position.y=this.layer.height*0.3+50*lcos(this.entities.players[a].direction.goal)
                                            }
                                        }
                                    }
                                break
                            }
                        }
                    break
                    case 14:
                        survive=0
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].update(this)
                            for(let b=a+1,lb=this.entities.players.length;b<lb;b++){
                                this.entities.players[a].collide(0,this.entities.players[b],this)
                            }
                            if(this.entities.players[a].active&&a<this.operation.player.length){
                                survive++
                            }
                        }
                        if(survive<=1){
                            this.result.end=true
                            this.result.winner=[]
                            for(let a=0,la=this.operation.player.length;a<la;a++){
                                this.entities.players[a].reveal=true
                                if(this.entities.players[a].active){
                                    this.result.winner.push(a)
                                }
                                this.payout.main.push((this.result.score[a]>=5?1:0)*this.payout.root*this.payout.mult+this.payout.add[a])
                            }
                        }
                        if(this.result.end&&this.result.anim<1){
                            this.result.anim+=0.1
                        }
                    break
                    case 16:
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].update(this)
                            for(let b=a+1,lb=this.entities.players.length;b<lb;b++){
                                this.entities.players[a].collide(0,this.entities.players[b],this)
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
                        }
                        for(let a=0,la=this.entities.walls.length;a<la;a++){
                            this.entities.walls[a].update()
                            for(let b=0,lb=this.entities.players.length;b<lb;b++){
                                let result=this.entities.walls[a].collide(1,this.entities.players[b],this)
                                switch(result[0]){
                                    case 1:
                                        if(!this.result.end){
                                            this.result.end=true
                                            this.result.winner=[result[1]]
                                        }
                                    break
                                }
                            }
                            for(let b=0,lb=this.entities.projectiles.length;b<lb;b++){
                                this.entities.walls[a].collide(2,this.entities.projectiles[b],this)
                            }
                        }
                        if(this.result.end&&this.result.anim<1){
                            this.result.anim+=0.1
                        }
                    break
                    case 17:
                        for(let a=0,la=this.operation.player.length;a<la;a++){
                            this.result.score[a]=0
                        }
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].update(this)
                            for(let b=a+1,lb=this.entities.players.length;b<lb;b++){
                                this.entities.players[a].collide(0,this.entities.players[b],this)
                            }
                            if(this.entities.players[a].id==-1){
                                let valid=true
                                for(let b=0,lb=this.operation.player.length;b<lb;b++){
                                    if(
                                        abs(lcos((b+0.5)/lb*360)*(this.entities.players[a].position.x-this.layer.width/2)+lsin((b+0.5)/lb*360)*(this.entities.players[a].position.y-this.layer.height/2))<10&&
                                        lcos((b+0.5)/lb*360)*(this.entities.players[a].position.y-this.layer.height/2)-lsin((b+0.5)/lb*360)*(this.entities.players[a].position.x-this.layer.width/2)<10
                                    ){
                                        valid=false
                                    }
                                }
                                if(valid){
                                    this.entities.players[a].sideColor=types.player[floor((atan2(this.entities.players[a].position.x-this.layer.width/2,this.entities.players[a].position.y-this.layer.height/2)+(180+180/this.operation.player.length)+360)%360/(360/this.operation.player.length))].color
                                    this.result.score[floor((atan2(this.entities.players[a].position.x-this.layer.width/2,this.entities.players[a].position.y-this.layer.height/2)+(180+180/this.operation.player.length)+360)%360/(360/this.operation.player.length))]++
                                }else{
                                    this.entities.players[a].sideColor=types.color.duck[0]
                                }
                            }
                        }
                        if(this.result.timer[0]>0){
                            this.result.timer[0]--
                        }else if(!this.result.end){
                            this.result.end=true
                            let minimum=this.result.score[0]
                            for(let a=0,la=this.operation.player.length;a<la;a++){
                                minimum=min(minimum,this.result.score[a])
                            }
                            this.result.winner=[]
                            for(let a=0,la=this.entities.players.length;a<la;a++){
                                if(this.result.score[a]<=minimum){
                                    this.result.winner.push(a)
                                }
                                this.payout.main.push((this.result.score[a]<=minimum?1:0)*this.payout.root*this.payout.mult+this.payout.add[a])
                            }
                        }
                        if(this.result.end&&this.result.anim<1){
                            this.result.anim+=0.1
                        }
                    break
                    case 18:
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].update(this)
                        }
                        let resetter=[]
                        for(let a=0,la=this.entities.walls.length;a<la;a++){
                            this.entities.walls[a].update(this)
                            for(let b=0,lb=this.entities.players.length;b<lb;b++){
                                let result=this.entities.walls[a].collide(0,this.entities.players[b],this)
                                switch(result[0]){
                                    case 1:
                                        this.result.score[b]++
                                        this.entities.players[b].dead.trigger=true
                                        resetter.push(b)
                                    break
                                }
                            }
                        }
                        for(let a=0,la=resetter.length;a<la;a++){
                            let nudge=floor(random(0,4))
                            let ticker=0
                            for(let b=0,lb=this.entities.walls.length;b<lb;b++){
                                if(this.entities.walls[b].height<10&&this.entities.walls[b].position.x>this.layer.width*(0.5+resetter[a]/4-this.entities.players.length/8)&&this.entities.walls[b].position.x<this.layer.width*(0.75+resetter[a]/4-this.entities.players.length/8)){
                                    this.entities.walls[b].move(this.layer.width*(0.5+resetter[a]/4-this.entities.players.length/8)+[60-floor(random(0,3))*20,80+floor(random(0,5))*20,180+floor(random(0,3))*20,80+floor(random(0,5))*20][(ticker+nudge)%4]-this.entities.walls[b].position.x,0)
                                    this.entities.walls[b].width=20+floor(random(0,3))*5
                                    this.entities.walls[b].ladder(2,this.entities.walls)
                                    this.entities.walls[b].ladder(7,this.entities.walls)
                                    ticker++
                                }
                            }
                        }
                        for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                            this.entities.projectiles[a].update(this)
                            for(let b=a+1,lb=this.entities.projectiles.length;b<lb;b++){
                                this.entities.projectiles[a].collide(1,this.entities.projectiles[b],this)
                            }
                            for(let b=0,lb=this.entities.players.length;b<lb;b++){
                                this.entities.projectiles[a].collide(2,this.entities.players[b],this)
                            }
                            if(this.entities.projectiles[a].remove){
                                this.entities.projectiles.splice(a,1)
                                a--
                                la--
                            }
                        }
                        for(let a=0,la=this.result.score.length;a<la;a++){
                            if(this.result.score[a]>=5&&!this.result.end){
                                this.result.end=true
                                this.result.winner=[a]
                            }
                        }
                        if(this.result.end&&this.result.anim<1){
                            this.result.anim+=0.1
                        }
                    break
                    case 19:
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
                        for(let a=0,la=this.entities.walls.length;a<la;a++){
                            this.entities.walls[a].update(this)
                            for(let b=0,lb=this.entities.players.length;b<lb;b++){
                                let result=this.entities.walls[a].collide(1,this.entities.players[b],this)
                                switch(result[0]){
                                    case 1:
                                        if(!this.subResult.end){
                                            if(result[1]==this.control.result){
                                                this.subResult.end=true
                                                this.subResult.winner=[b]
                                            }else{
                                                this.entities.players[b].active=false
                                                this.entities.players[b].timer.dizzy=-100
                                            }
                                        }
                                    break
                                }
                            }
                        }
                        if(survive<=0){
                            this.subResult.end=true
                            this.subResult.winner=[]
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
                    case 20:
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
                        for(let a=0,la=this.entities.walls.length;a<la;a++){
                            for(let b=0,lb=this.entities.walls[a].length;b<lb;b++){
                                this.entities.walls[a][b].update(this)
                                for(let c=0,lc=this.entities.players.length;c<lc;c++){
                                    let result=this.entities.walls[a][b].collide(1,this.entities.players[c],this)
                                    switch(result[0]){
                                        case 1:
                                            if(!this.subResult.end&&result[1]==this.control.box){
                                                this.subResult.end=true
                                                this.subResult.winner=[c]
                                            }
                                        break
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
                                    for(let a=0,la=this.entities.players.length;a<la;a++){
                                        this.entities.players[a].dead.trigger=true
                                    }
                                    this.control.box=floor(random(0,20))
                                    this.subResult.end=false
                                    this.subResult.anim=0
                                }
                            }
                        }
                        if(this.result.end&&this.result.anim<1){
                            this.result.anim+=0.1
                        }
                    break
                    case 21:
                        survive=0
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            if(dist(this.layer.width/2,this.layer.height/2,this.entities.players[a].position.x,this.entities.players[a].position.y)>this.layer.height*0.45+this.entities.players[a].radius){
                                this.entities.players[a].active=false
                                if(this.entities.players[a].size>0){
                                    this.entities.players[a].size-=0.1
                                    this.entities.players[a].stasis()
                                }else{
                                    this.entities.players[a].size=0
                                }
                            }else{
                                this.entities.players[a].update(this)
                                for(let b=a+1,lb=this.entities.players.length;b<lb;b++){
                                    this.entities.players[a].collide(0,this.entities.players[b],this)
                                }
                                survive++
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
                    case 22:
                        survive=0
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].update(this)
                            for(let b=a+1,lb=this.entities.players.length;b<lb;b++){
                                this.entities.players[a].collide(2,this.entities.players[b],this)
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
                            for(let b=a+1,lb=this.entities.projectiles.length;b<lb;b++){
                                this.entities.projectiles[a].collide(1,this.entities.projectiles[b],this)
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
                    case 23:
                        survive=0
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            if(
                                this.entities.players[a].position.x<this.layer.width*0.2-this.entities.players[a].radius||
                                this.entities.players[a].position.y<this.layer.height*0.2-this.entities.players[a].radius||
                                this.entities.players[a].position.y>this.layer.height*0.8+this.entities.players[a].radius
                            ){
                                this.entities.players[a].active=false
                                if(this.entities.players[a].size>0){
                                    this.entities.players[a].size-=0.1
                                    this.entities.players[a].stasis()
                                }else{
                                    this.entities.players[a].size=0
                                    if(this.entities.players[a].id==-1){
                                        this.entities.players.splice(a,1)
                                        a--
                                        la--
                                    }
                                }
                            }else{
                                this.entities.players[a].update(this)
                                if(a<this.operation.player.length){
                                    survive++
                                    for(let b=a+1,lb=this.operation.player.length;b<lb;b++){
                                        this.entities.players[a].collide(0,this.entities.players[b],this)
                                    }
                                    for(let b=this.operation.player.length,lb=this.entities.players.length;b<lb;b++){
                                        this.entities.players[a].collide(6,this.entities.players[b],this)
                                    }
                                }else{
                                    for(let b=a+1,lb=this.entities.players.length;b<lb;b++){
                                        this.entities.players[a].collide(0,this.entities.players[b],this)
                                    }
                                }
                            }
                        }
                        this.control.sender+=min(0.15,0.1+this.control.timer/6000)
                        if(survive<=1){
                            this.subResult.end=true
                            this.subResult.winner=[]
                            for(let a=0,la=this.operation.player.length;a<la;a++){
                                if(this.entities.players[a].active){
                                    this.subResult.winner.push(a)
                                }
                            }
                        }else if(this.control.sender>0){
                            this.control.sender--
                            this.entities.players.push(new player(this.layer,this.layer.width+100,random(this.layer.height*0.2,this.layer.height*0.8),1,15,-1,-1))
                            let lim=max(1.25,3-this.control.timer/3000)
                            last(this.entities.players).scale((floor(random(0,lim))==0?(floor(random(0,lim))==0?(floor(random(0,lim))==0?(floor(random(0,lim))==0?3:2.5):2):1.5):1)*1.5)
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
                                    for(let a=0,la=this.operation.player.length;a<la;a++){
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
                    case 24:
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
                        }else if(this.control.timer%(540-this.operation.player.length*60)==60){
                            let loc=floor(random(0,(this.layer.width+this.layer.height)/this.layer.width))
                            if(loc==0){
                                this.entities.projectiles.push(new projectile(this.layer,this.layer.width*random(0,1),this.layer.height*(-0.1+floor(random(0,2))*1.2),12,{}))
                            }else{
                                this.entities.projectiles.push(new projectile(this.layer,this.layer.width*(-0.1+floor(random(0,2))*1.2),this.layer.height*random(0,1),12,{}))
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
                    case 25:
                        survive=0
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].update(this)
                            for(let b=a+1,lb=this.entities.players.length;b<lb;b++){
                                this.entities.players[a].collide(1,this.entities.players[b],this)
                            }
                            if(this.entities.players[a].active){
                                survive++
                            }
                        }
                        for(let a=0,la=this.entities.walls.length;a<la;a++){
                            this.entities.walls[a].update()
                            for(let b=0,lb=this.entities.players.length;b<lb;b++){
                                this.entities.walls[a].collide(0,this.entities.players[b],this)
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
                    case 26:
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
                                if(this.entities.walls[a][b].remove){
                                    this.entities.walls[a].splice(b,1)
                                    b--
                                    lb--
                                }
                            }
                        }
                        switch(this.control.cycle.phase){
                            case 0:
                                let done=true
                                for(let a=0,la=this.entities.players.length;a<la;a++){
                                    if(!this.entities.players[a].select.trigger){
                                        done=false
                                    }
                                }
                                if(done){
                                    this.control.cycle.phase=1
                                    this.control.cycle.timer=0
                                }
                            break
                            case 1:
                                this.control.cycle.timer++
                                if(this.control.cycle.timer==30){
                                    for(let a=0,la=this.entities.walls[1].length;a<la;a++){
                                        this.entities.walls[1][a].fade.trigger=false
                                        if(this.entities.walls[1][a].select.id>=0){
                                            let fall=100+this.layer.height*0.75
                                            for(let b=0,lb=this.entities.walls[0].length;b<lb;b++){
                                                if(this.entities.walls[0][b].select.id==this.entities.walls[1][a].select.id){
                                                    for(let c=0,lc=this.entities.walls[0][b].set.length;c<lc;c++){
                                                        if(
                                                            this.entities.walls[0][b].set[c][0]!=this.entities.walls[0][b].set[c][1]&&
                                                            this.entities.walls[1][a].set[c][0]!=this.entities.walls[1][a].set[c][1]
                                                        ){
                                                            fall=min(fall,this.entities.walls[1][a].set[c][0]*20-this.entities.walls[0][b].set[c][1]*20+100+this.entities.walls[0][b].position.y)
                                                        }
                                                    }
                                                }
                                            }
                                            this.entities.walls[0].push(new wall(this.layer,this.layer.width*0.5+this.entities.walls[1][a].select.id*120-this.operation.player.length*60+60,-100,100,100,13,{grid:[200,200,200],block:[160,120,200]}))
                                            last(this.entities.walls[0]).fall=fall
                                            last(this.entities.walls[0]).set=this.entities.walls[1][a].set
                                            last(this.entities.walls[0]).select.id=this.entities.walls[1][a].select.id
                                        }
                                    }
                                }else if(this.control.cycle.timer>30){
                                    let done=true
                                    for(let a=0,la=this.entities.walls[0].length;a<la;a++){
                                        if(this.entities.walls[0][a].fall>0){
                                            done=false
                                        }
                                    }
                                    if(done){
                                        this.result.winner=[]
                                        for(let a=0,la=this.entities.walls[0].length;a<la;a++){
                                            for(let b=0,lb=this.entities.walls[0][a].set.length;b<lb;b++){
                                                if(this.entities.walls[0][a].position.y-this.entities.walls[0][a].set[b][1]*20<=this.layer.height*0.75-390){
                                                    if(!this.result.winner.includes(this.entities.walls[0][a].select.id)){
                                                        this.result.winner.push(this.entities.walls[0][a].select.id)
                                                    }
                                                    this.result.end=true
                                                    b=lb
                                                }
                                            }
                                        }
                                        if(this.result.end){
                                            for(let a=0,la=this.entities.players.length;a<la;a++){
                                                this.payout.main.push((this.result.winner.includes(a)?1:0)*this.payout.root*this.payout.mult+this.payout.add[a])
                                            }
                                        }else{
                                            for(let a=0,la=this.entities.players.length;a<la;a++){
                                                this.entities.players[a].select.trigger=false
                                            }
                                            this.control.cycle.phase=0
                                            let set=[
                                                [[0,1],[0,2],[1,2]],
                                                [[1,2],[0,2],[0,1]],
                                                [[1,2],[0,2],[1,2]],
                                                [[0,1],[0,2],[0,1]],
                                                [[0,2],[0,2],[0,0]],
                                                [[0,0],[0,2],[0,2]],
                                                [[0,1],[0,1],[0,2]],
                                                [[0,2],[0,1],[0,1]],
                                                [[1,2],[1,2],[0,2]],
                                                [[0,2],[1,2],[1,2]],
                                                [[0,3],[0,1],[0,0]],
                                                [[0,3],[1,2],[0,0]],
                                                [[0,3],[2,3],[0,0]],
                                                [[0,0],[0,3],[0,1]],
                                                [[0,0],[0,3],[1,2]],
                                                [[0,0],[0,3],[2,3]],
                                                [[0,1],[0,3],[0,0]],
                                                [[1,2],[0,3],[0,0]],
                                                [[2,3],[0,3],[0,0]],
                                                [[0,0],[0,1],[0,3]],
                                                [[0,0],[1,2],[0,3]],
                                                [[0,0],[2,3],[0,3]]
                                            ]
                                            for(let a=0,la=this.operation.player.length+1;a<la;a++){
                                                let index=floor(random(0,set.length))
                                                this.entities.walls[1].push(new wall(this.layer,this.layer.width*0.5+a*120-la*60+60,this.layer.height*0.875,100,100,12,{base:[80,80,80],internal:[60,60,60],wire:[100,100,100],grid:[200,200,200],block:[160,120,200]}))
                                                last(this.entities.walls[1]).set=set[index]
                                                set.splice(index,1)
                                            }
                                        }
                                    }
                                }
                            break
                        }
                        if(this.result.end&&this.result.anim<1){
                            this.result.anim+=0.1
                        }
                    break
                    case 27:
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].update(this)
                        }
                        for(let a=0,la=this.entities.walls.length;a<la;a++){
                            this.entities.walls[a].update(this)
                            for(let b=0,lb=this.entities.players.length;b<lb;b++){
                                let result=this.entities.walls[a].collide(0,this.entities.players[b],this)
                                switch(result[0]){
                                    case 1:
                                        if(!this.result.end){
                                            this.result.end=true
                                            this.result.winner=[result[1]]
                                            for(let c=0,lc=this.entities.players.length;c<lc;c++){
                                                this.payout.main.push((c==result[1]?1:0)*this.payout.root*this.payout.mult+this.payout.add[a])
                                            }
                                        }
                                    break
                                }
                            }
                        }
                        if(this.result.end&&this.result.anim<1){
                            this.result.anim+=0.1
                        }
                    break
                    case 28:
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].update(this)
                        }
                        for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                            this.entities.projectiles[a].update()
                            for(let b=0,lb=this.entities.players.length;b<lb;b++){
                                this.entities.projectiles[a].collide(0,this.entities.players[b],this)
                            }
                            if(this.entities.projectiles[a].remove){
                                this.entities.projectiles.splice(a,1)
                                a--
                                la--
                            }
                        }
                        if(!this.result.end&&this.entities.projectiles.length==0){
                            this.result.end=true
                            let maximum=this.result.score[0]
                            for(let a=0,la=this.operation.player.length;a<la;a++){
                                maximum=max(maximum,this.result.score[a])
                            }
                            this.result.winner=[]
                            for(let a=0,la=this.entities.players.length;a<la;a++){
                                if(this.result.score[a]>=maximum){
                                    this.result.winner.push(a)
                                }
                                this.payout.main.push((this.result.score[a]>=maximum?1:0)*this.payout.root*this.payout.mult+this.payout.add[a])
                            }
                        }
                        if(this.result.end&&this.result.anim<1){
                            this.result.anim+=0.1
                        }
                    break
                    case 29:
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].update(this)
                            for(let b=a+1,lb=this.entities.players.length;b<lb;b++){
                                this.entities.players[a].collide(0,this.entities.players[b],this)
                            }
                        }
                        for(let a=0,la=this.entities.projectiles.length;a<la;a++){
                            this.entities.projectiles[a].update()
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
                        for(let a=0,la=this.entities.walls.length;a<la;a++){
                            this.entities.walls[a].update(this)
                            for(let b=0,lb=this.entities.projectiles.length;b<lb;b++){
                                this.entities.walls[a].collide(3,this.entities.projectiles[b],this)
                            }
                            for(let b=0,lb=this.entities.players.length;b<lb;b++){
                                let result=this.entities.walls[a].collide(1,this.entities.players[b],this)
                                switch(result[0]){
                                    case 1:
                                        if(!this.subResult.end){
                                            this.subResult.end=true
                                            this.subResult.winner=[result[1]]
                                            this.result.score[result[1]]++
                                        }
                                    break
                                }
                            }
                        }
                        if(this.subResult.end&&!this.result.end){
                            if(this.subResult.anim<9){
                                this.subResult.anim+=0.1
                            }else{
                                for(let a=0,la=this.entities.players.length;a<la;a++){
                                    if(this.result.score[a]>=5){
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
                    case 30:
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
                        for(let a=0,la=this.entities.walls.length;a<la;a++){
                            this.entities.walls[a].update(this)
                            for(let b=0,lb=this.entities.players.length;b<lb;b++){
                                this.entities.walls[a].collide(0,this.entities.players[b],this)
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
                    case 31:
                        for(let a=0,la=this.entities.players.length;a<la;a++){
                            this.entities.players[a].update(this)
                            if(this.operation.player.length==4){
                                for(let b=a+1,lb=this.entities.players.length;b<lb;b++){
                                    this.entities.players[a].collide(0,this.entities.players[b],this)
                                }
                            }
                        }
                        for(let a=0,la=this.entities.walls.length;a<la;a++){
                            for(let b=0,lb=this.entities.walls[a].length;b<lb;b++){
                                this.entities.walls[a][b].update(this)
                                if(this.operation.player.length==4){
                                    for(let c=0,lc=this.entities.players.length;c<lc;c++){
                                        if(this.entities.players[c].interact==a){
                                            this.entities.walls[a][b].collide(1,this.entities.players[c],this)
                                        }
                                    }
                                }else{
                                    this.entities.walls[a][b].collide(1,this.entities.players[a],this)
                                }
                            }
                        }
                        if(!this.result.end){
                            if(this.operation.player.length==4){
                                if(this.result.score[0]>=5&&!this.result.end){
                                    this.result.end=true
                                    this.result.winner=[]
                                    for(let a=0,la=this.teams.split.length;a<la;a++){
                                        this.result.winner.push(this.teams.split[a])
                                    }
                                }else if(this.result.score[1]>=5&&!this.result.end){
                                    this.result.end=true
                                    this.result.winner=range(0,this.operation.player.length)
                                    for(let a=0,la=this.teams.split.length;a<la;a++){
                                        if(this.result.winner.includes(this.teams.split[a])){
                                            this.result.winner.splice(this.result.winner.indexOf(this.teams.split[a]),1)
                                        }
                                    }
                                }
                            }else{
                                for(let a=0,la=this.entities.players.length;a<la;a++){
                                    if(this.result.score[a]>=5){
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