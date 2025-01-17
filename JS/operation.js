class operation{
    constructor(layer){
        this.layer=layer
        this.player=[0,1,2,3]
        this.initialManagers()
    }
    initialManagers(){
        this.minigameManager=new minigameManager(this.layer,this)
    }
    setup(scene,control){
        switch(scene){
            case 'minigame':
                this.minigameManager.minigame=control.minigame
                this.minigameManager.setup()
            break
        }
    }
    display(scene){
        switch(scene){
            case 'minigame':
                this.minigameManager.display(scene)
            break
        }
    }
    update(scene){
        switch(scene){
            case 'minigame':
                this.minigameManager.update(scene)
            break
        }
    }
}