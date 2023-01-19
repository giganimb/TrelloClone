module.exports = class UserDto{
    workspacesCounter;
    boardsCounter;
    listsCounter;
    cardsCounter;

    constructor(workspacesCounter, boardsCounter, listsCounter, cardsCounter){
        this.workspacesCounter = workspacesCounter;
        this.boardsCounter = boardsCounter;
        this.listsCounter = listsCounter;
        this.cardsCounter = cardsCounter;
    }
}