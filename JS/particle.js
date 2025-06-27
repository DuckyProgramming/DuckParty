class particle extends entity{
    constructor(layer,x,y,type,control){
        this.type=type
        this.control=control
        switch(type){
            default:
                super(layer,x,y,{main:0,trigger:true,speed:5})
            break
        }
        this.setupValues(control)
    }
    setupValues(control){
    }
    display(layer=this.layer){
    }
    update(){
    }
}