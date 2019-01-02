//ATTACKING: each click of the button inflicts damage on player and enemy. Each attack increases player's skills/damage inflicted. Enemy's skills do not increase.

//character objects: each has 3 attributes: `Health Points`, `Attack Power` and `Counter Attack Power` Player's attack power is increased by their base amount with each attack. Player uses `Attack Power` and enemy uses `Counter Attack Power`.

$(document).ready(function () {
    var theFighter = "";
    var theCurrentEnemy = "";
    var clickCheckString = "";

    characters = {
        luke: {
            name: "Luke Skywalker",
            healthPoints: 110,
            attackPower: 20,
            counterAttackPower: 0,
            winningPhrase: "\"I’ll never turn to the dark side.\"",
            losingPhrase: "\"I have a very bad feeling about this.\"",
        },
        vader: {
            name: "Darth Vader",
            healthPoints: 160,
            attackPower: 50,
            counterAttackPower: 0,
            winningPhrase: "\"Your powers are weak.\"",
            losingPhrase: "\"The Force is strong with this one.\"",
        },
        stormtrooper: {
            name: "Stormtrooper",
            healthPoints: 80,
            attackPower: 15,
            counterAttackPower: 0,
            winningPhrase: "\"Inform Lord Vader we have prisoners.\"",
            losingPhrase: "\"These aren't the droids we're looking for.\"",
        },
        compactor: {
            name: "Trash Compactor",
            healthPoints: 60,
            attackPower: 10,
            counterAttackPower: 0,
            winningPhrase: "[nom nom nom]",
            losingPhrase: "[sputter pffft]",
        }
    };

    function assembleClickCheckString() {
        for (x = 0; x < Object.keys(characters).length; x++) {
            clickCheckString = clickCheckString + Object.keys(characters)[x] + ", ";
        };
    };

    function resetGame() {
        $("#display").empty();
        assembleClickCheckString();
        for (x = 0; x < Object.keys(characters).length; x++) {
            updateSection(Object.keys(characters)[x], "#display", "append");
        };
        $("#heading").text("Choose your fighter");

    };

    function assembleToolTipText(theCharacter) {
        return "\nHealth Points: " + eval("characters." + theCharacter + ".healthPoints") + "\nAttack: " + eval("characters." + theCharacter + ".attackPower") + "\nCounterattack: " + eval("characters." + theCharacter + ".counterAttackPower");
    };

    function updateSection(theCharacter, theLocation, appendOrReplace) {
        let theCharacterName = eval("characters." + theCharacter + ".name");
        let theToolTipText = assembleToolTipText(theCharacter);
        theItemToAppend = $("<div>").attr({ "id": theCharacter, "class": "display-character tooltip" }).html("<span class=\"tooltiptext\">" + theToolTipText + "</span><section class=\"character-info\">" + theCharacterName + "</section>");
        if (appendOrReplace == "append") {
            $(theLocation).append(theItemToAppend);
        } else {
            $(theLocation).html(theItemToAppend);
        }
    };

    function updateSectionWithFadeIn(theCharacter, theLocation, appendOrReplace) {
        let theCharacterName = eval("characters." + theCharacter + ".name");
        let theToolTipText = assembleToolTipText(theCharacter);
        theItemToAppend = $("<div>").attr({ "id": theCharacter, "class": "display-character tooltip", "style": "opacity: 0" }).html("<span class=\"tooltiptext\">" + theToolTipText + "</span><section class=\"character-info\">" + theCharacterName + "</section>");
        if (appendOrReplace == "append") {
            $(theLocation).append(theItemToAppend);

        } else {
            $(theLocation).html(theItemToAppend);
        }
        eval(theItemToAppend).animate({ opacity: "1" }, 1500);

    };

    function doAttack() {
        let theFighterGrabString = eval("characters." + theFighter);
        let theCurrentEnemyGrabString = eval("characters." + theCurrentEnemy);
        // fighter's health = health - enemy's attack power
        theFighterGrabString.healthPoints = theFighterGrabString.healthPoints - theCurrentEnemyGrabString.attackPower;
        // fighter's counter attack power = counter attack power + attack power each round
        theFighterGrabString.counterAttackPower = theFighterGrabString.counterAttackPower + theFighterGrabString.attackPower;
        // enemy's health = health - theFighter's counter attack power
        theCurrentEnemyGrabString.healthPoints = theCurrentEnemyGrabString.healthPoints - theFighterGrabString.counterAttackPower;
        console.log("Your health points are: " + theFighterGrabString.healthPoints);
        console.log("Your attack power has grown to :" + theFighterGrabString.counterAttackPower + " per attack");
        console.log("Your enemy's health points are: " + theCurrentEnemyGrabString.healthPoints);
        // update stats
        let theToolTipText = assembleToolTipText(theFighter);
        $("#" + theFighter + " > span").text(theToolTipText);
        theToolTipText = assembleToolTipText(theCurrentEnemy);
        $("#" + theCurrentEnemy + " > span").text(theToolTipText);

    };

    $("#display").click(function (event) {
        // only accept clicks on character avatars
        if (clickCheckString.includes(event.target.id) && event.target.id !== "") {
            if ($("#heading").text() == "Choose the next enemy to fight" || $("#heading").text() == "Choose an enemy to fight") {
                //move your fighter from your fighter area to attack area
                updateSection(theFighter, "#display", "replace");
                //move the chosen enemy to attack area
                theCurrentEnemy = event.target.id;
                updateSection(theCurrentEnemy, "#display", "append");
                $("#heading").text("Click your fighter to attack!");
                $("#display > div").attr({ "class": "attack display-character tooltip" });
            } else {
                if ($("#heading").text() == "Click your fighter to attack!") {
                    doAttack();
                    if (eval("characters." + theCurrentEnemy).healthPoints < 1) { //if you win
                        clearTheEnemy(); //clears the enemy and the game continues
                    } else { //if you lose
                        if (eval("characters." + theFighter).healthPoints < 1) {
                            setTimeout(function () {
                                alert("You lose!");
                            }, 100);
                        }
                    };
                };
            };
            if ($("#heading").text() == "Choose your fighter") {
                theFighter = event.target.id;
                resetChooseEnemy();
                $("#heading").text("Choose an enemy to fight");
                $("#display > div").attr({ "class": "choose-enemy display-character tooltip" });
            };
        };
    });

    function resetChooseEnemy() {
        $("#heading").text("Choose the next enemy to fight");
        $("#display").empty();
        for (x = 0; x < Object.keys(characters).length; x++) {
            let theKey = Object.keys(characters)[x];
            var theIfStatement = "theFighter != theKey && theCurrentEnemy != theKey"
            //check if enemy is in defeated-enemies
            for (y = 0; y < $("#defeated-enemies > div").length; y++) {
                theIfStatement = theIfStatement + " && \"" + $("#defeated-enemies > div")[y].id + "\" != theKey";
            }
            if (eval(theIfStatement)) {
                updateSection(Object.keys(characters)[x], "#display", "append");
            };
        };
        $("#display > div").attr({ "class": "choose-enemy display-character tooltip" });
    };

    function clearTheEnemy() {
        let theFighterPosition = eval("$(\"#" + theFighter + "\")").position();
        eval("$(\"#" + theFighter + "\")").css({ top: theFighterPosition.top, left: theFighterPosition.left, position: "absolute" });
        let theCurrentEnemyPosition = eval("$(\"#" + theCurrentEnemy + "\")").position();
        eval("$(\"#" + theCurrentEnemy + "\")").css({ top: theCurrentEnemyPosition.top, left: (theCurrentEnemyPosition.left + 120), position: "absolute" });
        let theCharToAnimate = "$(\"#" + theCurrentEnemy + "\")";
        eval(theCharToAnimate).animate({ width: "0px", height: "0px", "top": "+=300px", "left": "+=80px", opacity: "0" });
        theCharToAnimate = "$(\"#" + theFighter + "\")";
        // eval(theCharToAnimate).animate({ opacity: "0" });
        updateSectionWithFadeIn(theCurrentEnemy, "#defeated-enemies", "append");
        $("#defeated-enemies > div").attr({ "style": "opacity: 1" });
        // make this happen only the first time
        if ($("#defeated-enemies > div").length === 1) {
            $("#defeated-enemies-heading").text("Defeated enemies").attr({ "style": "opacity: 0" });
            $("#defeated-enemies-heading").animate({ opacity: "1" }, 1500);
        };
        if ($("#defeated-enemies > div").length === 3) {//if all the enemies have been defeated then
            $("#heading").html("&nbsp;");
            setTimeout(function () {
                updateSectionWithFadeIn(theFighter, "#display", "replace");
                $("#heading").html("<em>You have defeated all the enemies!</em>").attr({ "style": "opacity: 0" });
                $("#heading").animate({ opacity: "1" }, 1500);
                theItemToAppend = ($("<span>").attr({ "class": "display-final-quote", "style": "opacity: 0" }).html(eval("characters." + theFighter + ".winningPhrase")));
                $("#display").append(theItemToAppend);
                eval(theItemToAppend).animate({ opacity: "1" }, 1500);
            }, 1000);
        } else {
            setTimeout(function () {
                resetChooseEnemy();
            }, 1000);
        };
    };
    resetGame();
});