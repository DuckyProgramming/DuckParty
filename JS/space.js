class space extends entity{
    constructor(layer,x,y,type){
        super(layer,x,y,{main:1,trigger:true,speed:5})
        this.type=type
    }
}