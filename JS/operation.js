class operation{
    constructor(layer){
        this.layer=layer
        this.scene=''
        this.player=[0,1]
        this.menu={phase:0,anim:0,subAnim:[]}
        this.initial()
        this.initialManagers()
    }
    initial(){
        for(let a=0,la=listing.minigame.length;a<la;a++){
            this.menu.subAnim.push(0)
        }
    }
    initialManagers(){
        this.boardManager=new boardManager(this.layer,this)
        this.minigameManager=new minigameManager(this.layer,this)
        this.propertyManager=new propertyManager(this.layer,this)
        this.transitionManager=new transitionManager(this.layer,this)
    }
    setup(scene,control){
        this.scene=scene
        switch(scene){
            case 'board':
                this.boardManager.board=control.board
                this.boardManager.setup()
            break
            case 'minigame':
                this.minigameManager.minigame=control.minigame
                this.minigameManager.arbitraryTeams()
                this.minigameManager.setup()
            break
        }
    }
    display(scene=this.scene){
        switch(scene){
            case 'menu':
                this.layer.image(graphics.menu,this.layer.width/2,this.layer.height/2)
                this.layer.noStroke()
                this.layer.fill(225,this.menu.anim*0.5)
                this.layer.rect(this.layer.width/2,this.layer.height/2,this.layer.width,this.layer.height)
                if(this.menu.anim<1){
                    this.layer.textSize(80)
                    for(let a=0,la=10;a<la;a++){
                        this.layer.fill(125+a*5,1-this.menu.anim)
                        this.layer.rect(this.layer.width/2+a*0.5,this.layer.height/2+25+a,200,50,10)
                        this.layer.rect(this.layer.width/2+a*0.5-135,this.layer.height/2+25+a,40,40,10)
                        this.layer.rect(this.layer.width/2+a*0.5+135,this.layer.height/2+25+a,40,40,10)
                        this.layer.rect(this.layer.width/2+a*0.5,this.layer.height/2+90+a,160,40,10)
                        this.layer.fill(25+a*5,1-this.menu.anim)
                        this.layer.text('DuckParty',this.layer.width/2+a*0.5,this.layer.height/2-60+a)
                    }
                    this.layer.fill(50,1-this.menu.anim)
                    this.layer.textSize(30)
                    this.layer.text(this.player.length+' Player'+(this.player.length>1?'s':''),this.layer.width/2+4.5,this.layer.height/2+34)
                    regTriangle(this.layer,this.layer.width/2-130.5,this.layer.height/2+34,10,10,30)
                    regTriangle(this.layer,this.layer.width/2+139.5,this.layer.height/2+34,10,10,-30)
                    this.layer.textSize(24)
                    this.layer.text('Begin',this.layer.width/2+4.5,this.layer.height/2+99)
                }
                if(this.menu.anim>0){
                    for(let a=0,la=10;a<la;a++){
                        this.layer.fill(125+a*5,this.menu.anim)
                        for(let b=0,lb=4;b<lb;b++){
                            for(let c=0,lc=8;c<lc;c++){
                                this.layer.rect(this.layer.width/2+a*0.5+b*180-lb*90+90,this.layer.height/2+a+c*60-lc*30+30,160,40,10)
                            }
                        }
                    }
                    for(let b=0,lb=4;b<lb;b++){
                        for(let c=0,lc=8;c<lc;c++){
                            this.layer.fill(50,this.menu.anim*(1-this.menu.subAnim[b+c*lb]))
                            this.layer.textSize(16)
                            this.layer.text(listing.minigame[b+c*lb],this.layer.width/2+b*180-lb*90+90+4.5,this.layer.height/2+c*60-lc*30+30+9)
                            this.layer.fill(50,this.menu.anim*this.menu.subAnim[b+c*lb])
                            this.layer.textSize(7)
                            this.layer.text(types.minigame[findName(listing.minigame[b+c*lb],types.minigame)].desc,this.layer.width/2+b*180-lb*90+90+4.5,this.layer.height/2+c*60-lc*30+30+6)
                        }
                    }
                }
            break
            case 'board':
                this.boardManager.display(scene)
                this.propertyManager.display(scene)
            break
            case 'minigame':
                this.minigameManager.display(scene)
            break
        }
        this.transitionManager.display(scene)
    }
    update(scene=this.scene){
        switch(scene){
            case 'menu':
                this.menu.anim=smoothAnim(this.menu.anim,this.menu.phase>0,0,1,5)
                for(let b=0,lb=4;b<lb;b++){
                    for(let c=0,lc=8;c<lc;c++){
                        this.menu.subAnim[b+c*lb]=smoothAnim(this.menu.subAnim[b+c*lb],inPointBox({position:inputs.mouse.rel},{position:{x:this.layer.width/2+b*180-lb*90+90+2.5,y:this.layer.height/2+c*60-lc*30+30+5},width:165,height:50}),0,1,5)
                    }
                }
            break
            case 'board':
                this.boardManager.display(scene)
            break
            case 'minigame':
                this.minigameManager.update(scene)
            break
        }
        this.transitionManager.update()
    }
    onClick(mouse){
        switch(this.scene){
            case 'menu':
                switch(this.menu.phase){
                    case 0:
                        if(inPointBox(mouse,{position:{x:this.layer.width/2-132.5,y:this.layer.height/2+30},width:45,height:50})&&this.player.length>2){
                            this.player.splice(this.player.length-1,1)
                        }
                        if(inPointBox(mouse,{position:{x:this.layer.width/2+137.5,y:this.layer.height/2+30},width:45,height:50})&&this.player.length<4){
                            this.player.push(last(this.player)+1)
                        }
                        if(inPointBox(mouse,{position:{x:this.layer.width/2+2.5,y:this.layer.height/2+100},width:205,height:60})){
                            this.menu.phase=1
                        }
                    break
                    case 1:
                        for(let b=0,lb=4;b<lb;b++){
                            for(let c=0,lc=9;c<lc;c++){
                                if(inPointBox(mouse,{position:{x:this.layer.width/2+b*180-lb*90+90+2.5,y:this.layer.height/2+c*60-lc*30+30+5},width:165,height:50})){
                                    this.transitionManager.begin('minigame',{minigame:findName(listing.minigame[b+c*lb],types.minigame)})
                                }
                            }
                        }
                    break
                }
            break
        }
    }
    onKey(key){
        switch(this.scene){
            case 'menu':
                switch(this.menu.phase){
                    case 0:
                        switch(key){
                            case 'ArrowLeft': case 'a': case 'A':
                                if(this.player.length>2){
                                    this.player.splice(this.player.length-1,1)
                                }
                            break
                            case 'ArrowRight': case 'd': case 'D':
                                if(this.player.length<4){
                                    this.player.push(last(this.player)+1)
                                }
                            break
                            case 'ArrowUp': case 'w': case 'W':
                            case 'ArrowDown': case 's': case 'S':
                                this.menu.phase=1
                            break
                        }
                    break
                }
            break
        }
    }
}