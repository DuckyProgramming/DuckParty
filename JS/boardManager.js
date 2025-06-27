class boardManager{
    constructor(layer,operation){
        this.layer=layer
        this.operation=operation
        this.board=0
        this.spaces=[]
    }
    setup(){
        this.buildBoard(types.board[this.board].spaces)
    }
    buildBoard(spaces){
    }
}