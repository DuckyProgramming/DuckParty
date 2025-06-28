class operation{
    constructor(layer){
        this.layer=layer
        this.player=[0,1,2,3]
        this.initialManagers()
    }
    initialManagers(){
        this.boardManager=new boardManager(this.layer,this)
        this.minigameManager=new minigameManager(this.layer,this)
        this.propertyManager=new propertyManager(this.layer,this)
    }
    setup(scene,control){
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
    display(scene){
        switch(scene){
            case 'board':
            break
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