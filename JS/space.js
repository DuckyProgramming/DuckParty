class space extends entity{
    constructor(layer,x,y,type,variant,link){
        super(layer,x,y,{main:1,trigger:true,speed:5})
        this.type=type
        this.variant=variant
        this.link={
            hold:link,
            main:[],
            back:[],
        }
        this.press={anim:0,trigger:0}
    }
    display(layer=this.layer){
        layer.push()
        layer.translate(this.position.x,this.position.y)
        switch(this.type){
            case 0:
                switch(this.variant){
                    case 0:
                        layer.fill(200,200,25,this.fade.main)
                        layer.ellipse(0,0,50)
                        layer.fill(185,185,10,this.fade.main)
                        layer.ellipse(0,0,40)
                    break
                    case 1:
                        layer.fill(25,125,225,this.fade.main)
                        layer.ellipse(0,0,50)
                        layer.fill(10,110,210,this.fade.main)
                        layer.ellipse(0,0,40)
                    break
                    case 2:
                        layer.fill(200,50,25,this.fade.main)
                        layer.ellipse(0,0,50)
                        layer.fill(185,35,10,this.fade.main)
                        layer.ellipse(0,0,40)
                    break
                    case 5:
                        layer.fill(50,200,25,this.fade.main)
                        layer.ellipse(0,0,50)
                        layer.fill(35,185,10,this.fade.main)
                        layer.ellipse(0,0,40)
                    break
                    case 8:
                        layer.fill(75,25,25,this.fade.main)
                        layer.ellipse(0,0,50)
                        layer.fill(60,10,10,this.fade.main)
                        layer.ellipse(0,0,40)
                    break
                    case 9:
                        layer.fill(50,200,25,this.fade.main)
                        layer.ellipse(0,0,50)
                        layer.fill(35,185,10,this.fade.main)
                        layer.ellipse(0,0,40)
                    break
                    case 10:
                        layer.fill(50,200,25,this.fade.main)
                        layer.ellipse(0,0,50)
                        layer.fill(35,185,10,this.fade.main)
                        layer.ellipse(0,0,40)
                    break
                }
                layer.fill(255,this.fade.main*this.press.anim)
                layer.ellipse(0,0,50)
            break
            case 1:
                switch(this.variant){
                }
            break
        }
        layer.pop()
    }
    update(){
        super.update()
        if(this.press.trigger){
            this.press.anim=round(this.press.anim*10+1)/10
            if(this.press.anim>=1){
                this.press.trigger=false
            }
        }else if(this.press.anim>0){
            this.press.anim=round(this.press.anim*10-1)/10
        }
    }
}