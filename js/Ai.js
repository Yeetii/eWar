class Ai {

    //Recruiting, only if still owns start square
	//TODO search after headquarters and recruit in them
	static turn(){
		Ai.recruit()

		for (let square of currentPlayer.ownedSquares){ //Counts up so it detecs squares more likely to be reserves first
			Ai.attack(square)
	        Ai.build(square)
		}
		//Move reserves to the weakest fronts
		Ai.moveReserves()
		Ai.mergeAllUnits()
	}
	static recruit(){
		if (currentPlayer.startSquare.owner === currentPlayer) {
			var newTroops = (currentPlayer.money - gameProperties.buildCosts.bunker) / gameProperties.buildCosts.troops
			currentPlayer.startSquare.recruitToWhom(newTroops)
		}
	}
	static build(square){
		if (currentPlayer.money >= gameProperties.buildCosts.bunker) {
			if (Math.random() > 0.5) {
				square.bunker.build()
			} else {
				square.railway.build()
			}
		}
	}
	static attack(selectedSquare, targetSquare){
		var hostileSquares = selectedSquare.getEnemies()
		var targetSquare
		if (hostileSquares.length > 0) {
			targetSquare = hostileSquares[game.rnd.integerInRange(0, hostileSquares.length - 1)]//TODO choose weakest enemy
			if (targetSquare.units[0].amount < selectedSquare.units[0].amount) {
				selectedSquare.units[0].attack(targetSquare)
				targetSquare.mergeUnits()
			}
		}
	}
	static moveReserves(){
		var reserves = Ai.getReserves()
		console.log(reserves);
		if (reserves.length > 0)
	        for (var i = reserves.length - 1; i >= 0; i--) {
	            var weakest = Ai.getWeakestFrontline()
	            console.log(weakest)
	            reserves[i].units[0].moveToward(weakest)
	            reserves.splice(i, 1)
	        }
	}
	static getWeakestFrontline() {
		var frontline = Ai.getFrontLine()
        var weakest = frontline[0];
        for (var i = 1; i < frontline.length; i++) {
            if (frontline[i].units[0].amount > weakest.units[0].amount)
                weakest = frontline[i]
        }
        return weakest
    }
	static getFrontLine() {
		var frontLine = []
		for (let square of currentPlayer.ownedSquares){
			if (square.getEnemies().length > 0){
				frontLine.push(square)
			}
		}
		console.log("Frontline size" + frontLine.length);
		return frontLine
	}
	static getReserves() {
		var reserves = []
		for (let square of currentPlayer.ownedSquares){
			if(square.getEnemies() <= 0 && square.units[0].amount > 0){
				reserves.push(square)
			}
		}
		return reserves
	}
	static mergeAllUnits(){
		for (let square of currentPlayer.ownedSquares){
			square.mergeUnits()
		}
	}
}
