 function TroopLbl(x, y, color, amount, troop){
    this.troopStyle = {font: '27px Arial', align: 'center', fill: 'black', stroke: '#000000', strokeThickness: 4};
    //Find better way, only needed for selecting
    this.troop = troop
    this.lbl = game.add.text(x + gameProperties.squareSide / 2, y + gameProperties.squareSide / 4, amount, this.troopStyle)
    
    this.isSelected = false;
    
    this.lbl.fill = color;
    this.lbl.anchor.set(0.5, 0.5);
    this.lbl.events.onInputDown.add(this.listener, this);
    this.lbl.inputEnabled = true
    this.lbl.input.enableDrag(true)
    this.lbl.events.onDragStart.add(this.onDragStart, this)
    this.lbl.events.onDragStop.add(this.onDragStop, this)
    
    this.dragStartX
    this.dragStartY
}
TroopLbl.prototype = {
    select: function (){
        this.lbl.stroke = '#AAA'
        this.isSelected = true
    },
    unselect: function (){
        this.lbl.stroke = '#000'
        this.isSelected = false
        if (selectedUnit === this){
            selectedUnit = null
        }
        this.updatePosition(this.troop.square.x, this.troop.square.y)
    },
    update: function (newAmount){
        var amount = 0
        if (newAmount != null){
            amount = newAmount
        }
        this.lbl.text = amount;
    },
    updateColor: function (newColor){
        this.lbl.color = newColor
    },
    updatePosition: function (x, y) {
        this.lbl.x = x + gameProperties.squareSide / 2
        this.lbl.y = y + gameProperties.squareSide / 4
    },
    setPosition: function (x, y){
        this.lbl.x = x
        this.lbl.y = y
    },
    listener: function(){
        //Check if already selected
        if (!this.isSelected)
            this.troop.select()

    },
    onDragStart: function(){
        //Store start position
        this.dragStartX = this.lbl.x
        this.dragStartY = this.lbl.y
    },
    onDragStop: function(){
        var releasedOnSquare = this.troop.square.findSquareUnderInput()
        //If released on own square
        if (releasedOnSquare === this.troop.square){
            //If released on another lbl merge

        }
        //If released on another square
        else{
        //If released on another square perform move or attack
        //Return label to start position in case the attack fails
        this.setPosition(this.dragStartX, this.dragStartY)
        this.troop.moveOrAttack(releasedOnSquare)
        }
        
    },
    destroy: function(){
        this.lbl.destroy()
    }
}