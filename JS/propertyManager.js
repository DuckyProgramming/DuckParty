class propertyManager{
    constructor(layer,operation){
        this.layer=layer
        this.operation=operation
        this.initial()
    }
    initial(){
        this.shards={main:[]}
        this.bits={main:[]}
        this.items={main:[]}
        for(let a=0,la=this.operation.player.length;a<la;a++){
            this.shards.main.push(0)
            this.bits.main.push(0)
            this.items.main.push([])
            for(let b=0,lb=constants.itemSlots;b<lb;b++){
                this.items.main[a].push(new item(this.layer,-1))
            }
        }
    }
    addShards(amount,player){
        if(player>=0&&player<this.shards.main.length){
            this.shards.main[player]+=amount
        }
    }
    loseShards(amount,player){
        if(player>=0&&player<this.shards.main.length){
            this.shards.main[player]-=amount
        }
    }
    addBits(amount,player){
        if(player>=0&&player<this.bits.main.length){
            this.bits.main[player]+=amount
        }
    }
    loseBits(amount,player){
        if(player>=0&&player<this.bits.main.length){
            this.bits.main[player]-=amount
        }
    }
    addItem(type,player){
        if(player>=0&&player<this.items.main.length){
            for(let a=0,la=this.items[player].length;a<la;a++){
                if(this.items[player][a].type==-1){
                    this.items[player][a]=new item(this.layer,type)
                }
            }
        }
    }
}