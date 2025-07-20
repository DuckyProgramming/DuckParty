class boardManager{
    constructor(layer,operation){
        this.layer=layer
        this.operation=operation
        this.entities={players:[]}
        this.turn={main:0}
        this.view={
            main:{x:0,y:0,scale:1},
            hold:{x:0,y:0,scale:1},
            target:{x:0,y:0,scale:1},
            anim:0
        }
        this.initialManagers()
    }
    initialManagers(){
        this.spaceManager=new spaceManager(this.layer,this.battle)
    }
    manageView(){
        if(this.view.anim>0||this.view.hold.x!=this.view.target.x||this.view.hold.y!=this.view.target.y||this.view.hold.scale!=this.view.target.scale){
            this.anim.view+=0.025
            let merge=0.5-lcos(this.anim.view*180)
            this.view.main.x=map(merge,0,1,this.view.hold.x,this.view.target.x)
            this.view.main.y=map(merge,0,1,this.view.hold.y,this.view.target.y)
            this.view.main.target=map(merge,0,1,this.view.hold.target,this.view.target.target)
            if(this.anim.view>=1){
                this.anim.view=0
                this.view.hold.x=this.view.target.x
                this.view.hold.y=this.view.target.y
                this.view.hold.scale=this.view.target.scale
            }
        }
    }
    setup(){
        this.spaceManager.setup(types.board[this.board])
        this.view.main.x=this.spaceManager.edge.box.position.x
        this.view.main.y=this.spaceManager.edge.box.position.y
        this.view.main.scale=min(this.layer.width/(this.spaceManager.edge.box.width+150),this.layer.height/(this.spaceManager.edge.box.height+150))
        this.view.hold.x=this.view.main.x
        this.view.hold.y=this.view.main.y
        this.view.hold.scale=this.view.main.scale
    }
    display(scene){
        switch(scene){
            case 'board':
                this.layer.background(0)
                this.layer.push()
                this.layer.translate(this.layer.width/2,this.layer.height/2)
                this.layer.scale(this.view.main.scale)
                this.layer.translate(-this.view.main.x,-this.view.main.y)
                this.spaceManager.display(scene)
                for(let a=0,la=this.entities.players.length;a<la;a++){
                    this.entities.players[a].display()
                }
                this.layer.pop()
            break
        }
    }
    update(scene){
        switch(scene){
            case 'board':
                this.manageView()
                this.spaceManager.update(scene)
                for(let a=0,la=this.entities.players.length;a<la;a++){
                    this.entities.players[a].update()
                }
            break
        }
    }
}