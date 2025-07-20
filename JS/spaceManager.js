class spaceManager{
    constructor(layer,operation){
        this.layer=layer
        this.operation=operation
        this.board=0
        this.tileset={
            space:[],
        }
        this.spaces=[]
        this.edge={
            pos:[0,0,0,0],
            box:{position:{x:0,y:0},width:0,height:0},
        }
    }
    setup(base){
        this.tileset=base.tileset
        this.buildBoard(base.spaces)
    }
    buildBoard(spaces){
        for(let a=0,la=spaces.length;a<la;a++){
            this.spaces.push(new space(this.layer,spaces[a].pos[0]*this.tileset.space[0],spaces[a].pos[1]*this.tileset.space[1],spaces[a].type[0],spaces[a].type[1],spaces[a].link))
            this.edge.pos[0]=min(this.edge.pos[0],spaces[a].pos[0])
            this.edge.pos[1]=min(this.edge.pos[1],spaces[a].pos[1])
            this.edge.pos[2]=max(this.edge.pos[2],spaces[a].pos[0])
            this.edge.pos[3]=max(this.edge.pos[3],spaces[a].pos[1])
        }
        this.edge.box.position.x=(this.edge.pos[0]+this.edge.pos[2])/2*this.tileset.space[0]
        this.edge.box.position.y=(this.edge.pos[1]+this.edge.pos[3])/2*this.tileset.space[1]
        this.edge.box.width=abs(this.edge.pos[0]-this.edge.pos[2])*this.tileset.space[0]
        this.edge.box.height=abs(this.edge.pos[1]-this.edge.pos[3])*this.tileset.space[1]
        for(let a=0,la=this.spaces.length;a<la;a++){
            for(let b=0,lb=this.spaces[a].link.hold.length;b<lb;b++){
                if(this.spaces[a].link.hold[b]!=''){
                    if(this.spaces[a].link.hold[b]>=100){
                        this.spaces[a].link.main.push(this.spaces[a].link.hold[b]-100)
                        this.spaces[this.spaces[a].link.hold[b]-100].link.back.push(a)
                    }else{
                        this.spaces[a].link.main.push(a+this.spaces[a].link.hold[b])
                        this.spaces[a+this.spaces[a].link.hold[b]].link.back.push(a)
                    }
                }
            }
        }
    }
    display(scene){
        switch(scene){
            case 'board':
                for(let a=0,la=this.spaces.length;a<la;a++){
                    this.spaces[a].display()
                }
            break
        }
    }
    update(scene){
        switch(scene){
            case 'board':
                for(let a=0,la=this.spaces.length;a<la;a++){
                    this.spaces[a].update()
                }
            break
        }
    }
}