function Player(color) {
    this.money = 100;
    this.income = 20;
    this.color = color;
    this.ownedSquares = [];
    this.startSquare;
    this.isAi = false;
}
Player.prototype = {
    setStartSquare: function (startSquare){
        this.startSquare = startSquare
        this.startSquare.changeOwner(this);
        //In order to make the troops belong to the right player

        this.startSquare.units.push(new Troops(startSquare))
        this.startSquare.units[0].killObject()
        this.startSquare.units[0].setAmount(3)
        this.startSquare.spawnHeadquarters();
    },

    changeMoney: function (amount){
        this.money += amount;
        if (this == currentPlayer){
            lblMoney.text = 'Money: ' + this.money;
        }
    },
    changeIncome: function(amount){
        this.income += amount;
    },
    changeOwnedSqrs: function(amount){
        if (this === unowned) {
            return
        }
        this.ownedSquares += amount

    },
    addOwnedSquare: function(square){
        this.ownedSquares.push(square)
    },
    removeOwnedSquare: function(square){
        if (this === unowned) {
            return
        }
        var index = this.ownedSquares.indexOf(square)
        if (index > -1){
            this.ownedSquares.splice(index, 1)
        }
        //Calls game over if player runs out of squares
        if (this.ownedSquares.length <= 0){
            game.state.start("gameOverState", true, false, currentPlayer)
        }
    }
}
