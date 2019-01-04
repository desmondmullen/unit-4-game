$(document).ready(function () {
    var theFighter = "";
    var theCurrentEnemy = "";
    var clickCheckString = "";

    characters = {
        luke: {
            name: "Luke Skywalker",
            smallScreenName: "Luke Skywalker",
            healthPoints: 110,
            attackPower: 20,
            counterAttackPower: 0,
            winningPhrase: "\"I’ll never turn to the dark side.\"",
            losingPhrase: "\"I have a very bad feeling about this.\"",
        },
        vader: {
            name: "Darth Vader",
            smallScreenName: "Darth Vader",
            healthPoints: 160,
            attackPower: 50,
            counterAttackPower: 0,
            winningPhrase: "\"Your powers are weak.\"",
            losingPhrase: "\"The Force is strong with this one.\"",
        },
        stormtrooper: {
            name: "Stormtrooper",
            smallScreenName: "Storm- trooper",
            healthPoints: 80,
            attackPower: 15,
            counterAttackPower: 0,
            winningPhrase: "\"Inform Lord Vader we have prisoners.\"",
            losingPhrase: "\"These aren't the droids we're looking for.\"",
        },
        compactor: {
            name: "Trash Compactor",
            smallScreenName: "Trash Compactor",
            healthPoints: 60,
            attackPower: 10,
            counterAttackPower: 0,
            winningPhrase: "[nom nom nom]",
            losingPhrase: "[sputter pffft]",
        }
    };

    if (window.matchMedia("(max-width: 670px)").matches) {
        for (x = 0; x < Object.keys(characters).length; x++) {
            let theCharacterGrabString = eval("characters." + Object.keys(characters)[x])
            theCharacterGrabString.name = theCharacterGrabString.smallScreenName;
        };
    };

    function resetGame() {
        location = location;
    };

    function assembleClickCheckString() {
        for (x = 0; x < Object.keys(characters).length; x++) {
            clickCheckString = clickCheckString + Object.keys(characters)[x] + ", ";
        };
    };

    function initializeGame() {
        $("#defeated-enemies-heading").empty();
        $("#display").empty();
        assembleClickCheckString();
        for (x = 0; x < Object.keys(characters).length; x++) {
            updateSection(Object.keys(characters)[x], "#display", "append");
        };
        $("#heading").text("Choose your fighter");
    };

    function assembleToolTipText(theCharacter) {
        if (theCharacter === theFighter) {
            return "\nHealth: " + eval("characters." + theCharacter + ".healthPoints") + "\nAttack: " + eval("characters." + theCharacter + ".counterAttackPower");
        } else {
            return "\nHealth: " + eval("characters." + theCharacter + ".healthPoints") + "\nAttack: " + eval("characters." + theCharacter + ".attackPower");
        };
    };

    function assembleAttackStatsString(includeText) {
        let theFighterGrabString = eval("characters." + theFighter);
        theAttackStatsString = "Health points: " + theFighterGrabString.healthPoints;
        if (theFighterGrabString.counterAttackPower === 0) {
            theFighterGrabString.counterAttackPower = theFighterGrabString.attackPower
        };
        if (window.matchMedia("(max-width: 670px)").matches) {
            theAttackStatsString = theAttackStatsString + "<br>";
        } else {
            theAttackStatsString = theAttackStatsString + ", ";
        };
        if (includeText === "grows1" || includeText === "grows2" || includeText === "grows3") {
            theAttackStatsString = theAttackStatsString + "Attack power: " + theFighterGrabString.counterAttackPower + " (grows with each attack)";
        } else {
            theAttackStatsString = theAttackStatsString + "Attack power:" + theFighterGrabString.counterAttackPower;
        }
        if ($("#heading").text() == "Click your fighter to attack!") {
            theAttackStatsString = theAttackStatsString + "<br>Your enemy's health points: " + eval("characters." + theCurrentEnemy).healthPoints;
        }
        return theAttackStatsString;
    };

    function updateSection(theCharacter, theLocation, appendOrReplace) {
        let theCharacterName = eval("characters." + theCharacter + ".name");
        let theToolTipText = assembleToolTipText(theCharacter);
        theItemToAppend = $("<div>").attr({ "id": theCharacter, "class": "display-character" }).html("<section class=\"character-info tooltip\">" + theCharacterName + "<span class=\"tooltiptext\">" + theToolTipText + "</span></section>");
        if (appendOrReplace == "append") {
            $(theLocation).append(theItemToAppend);
        } else {
            $(theLocation).html(theItemToAppend);
        }
    };

    function updateSectionWithFadeIn(theCharacter, theLocation, appendOrReplace) {
        let theCharacterName = eval("characters." + theCharacter + ".name");
        let theToolTipText = assembleToolTipText(theCharacter);
        theItemToAppend = $("<div>").attr({ "id": theCharacter, "class": "display-character", "style": "opacity: 0" }).html("<section class=\"character-info tooltip\">" + theCharacterName + "<span class=\"tooltiptext\">" + theToolTipText + "</span></section>");
        setTimeout(function () { // waits to reveal characters in defeated enemies
            $(theLocation).append(theItemToAppend);
            eval(theItemToAppend).animate({ opacity: "1" }, 1500);
        }, 1000);
    };

    function doAttack() {
        $(".left-side-fighter").animate({ "left": -50 }, 200);
        $(".right-side-enemy").animate({ "left": +50 }, 200);
        $(".left-side-fighter").animate({ "left": +20 }, 200);
        $(".right-side-enemy").animate({ "left": -20 }, 200);
        $(".left-side-fighter").animate({ "left": 0 }, 400);
        $(".right-side-enemy").animate({ "left": 0 }, 400);
        let theFighterGrabString = eval("characters." + theFighter);
        let theCurrentEnemyGrabString = eval("characters." + theCurrentEnemy);
        // fighter's health = health - enemy's attack power
        theFighterGrabString.healthPoints = theFighterGrabString.healthPoints - theCurrentEnemyGrabString.attackPower;
        // fighter's counter attack power = counter attack power + attack power each round
        theFighterGrabString.counterAttackPower = theFighterGrabString.counterAttackPower + theFighterGrabString.attackPower;
        // enemy's health = health - theFighter's counter attack power
        theCurrentEnemyGrabString.healthPoints = theCurrentEnemyGrabString.healthPoints - theFighterGrabString.counterAttackPower;
        // update stats
        $("#attack-stats").html(assembleAttackStatsString("grows1")); // when you attack
        let theToolTipText = assembleToolTipText(theFighter);
        $("#" + theFighter + " span").text(theToolTipText);
        theToolTipText = assembleToolTipText(theCurrentEnemy);
        $("#" + theCurrentEnemy + " span").text(theToolTipText);
    };

    function animateAttack(fighter, enemy) {
        let fighterName = eval("characters." + fighter + ".name");
        let theToolTipText = assembleToolTipText(fighter);
        theItemToAppend = $("<div>").attr({ "id": fighter, "class": "attack display-character left-side-fighter" }).html("<section class=\"character-info tooltip\">" + fighterName + "<span class=\"tooltiptext\">" + theToolTipText + "</span></section>");
        $("#display").html(theItemToAppend);
        let enemyName = eval("characters." + enemy + ".name");
        theToolTipText = assembleToolTipText(enemy);
        theItemToAppend = $("<div>").attr({ "id": enemy, "class": "attack display-character right-side-enemy" }).html("<section class=\"character-info tooltip\">" + enemyName + "<span class=\"tooltiptext\">" + theToolTipText + "</span></section>");
        $("#display").append(theItemToAppend);
        $(".left-side-fighter").animate({ "opacity": 1, "left": 0 }, 600);
        $(".right-side-enemy").animate({ "opacity": 1, "left": 0 }, 600);

    };

    $("#display").click(function (event) {
        // only accept clicks on character avatars
        if (event.target.id === "") {
            var theEventTarget = event.target.parentNode.id;
        } else {
            var theEventTarget = event.target.id;
        };
        if (clickCheckString.includes(theEventTarget)) {
            if ($("#heading").text() == "Choose the next enemy to fight" || $("#heading").text() == "Choose an enemy to fight") {
                //move your fighter to attack area
                updateSection(theFighter, "#display", "replace");
                //move the chosen enemy to attack area
                $("#heading").text("Click your fighter to attack!");
                theCurrentEnemy = theEventTarget;
                updateSection(theCurrentEnemy, "#display", "append");
                animateAttack(theFighter, theCurrentEnemy);
                $("#attack-stats").html(assembleAttackStatsString("grows2")); //when you choose enemy
            } else {
                if ($("#heading").text() == "Click your fighter to attack!") {
                    doAttack();
                    if (eval("characters." + theCurrentEnemy).healthPoints < 1) { //if you win that round
                        clearTheEnemy("win"); //clears the enemy and the game continues
                    } else { //if you lose
                        if (eval("characters." + theFighter).healthPoints < 1) {
                            clearTheEnemy("loss");
                            processTheGameEnd("loss");
                        }
                    };
                };
            };
            if ($("#heading").text() == "Choose your fighter") {
                if (event.target.id === "") {
                    theFighter = event.target.parentNode.id;
                } else {
                    theFighter = event.target.id;
                };
                $("#display > div").attr({ "class": "choose-enemy display-character" });
                resetChooseEnemy();
                $("#heading").text("Choose an enemy to fight");
            };
        };
    });

    function resetChooseEnemy(emptyDisplayOrNot) {
        if (emptyDisplayOrNot !== "no") {
            $("#heading").text("Choose the next enemy to fight");
            $("#display").empty(); // this takes care of a problem when this empties at end of game
            // } else {
            //     $("#heading").animate({ opacity: "0" }, 500);
            //     $("#display").animate({ opacity: "0" }, 500);
        };
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
        $("#display > div").attr({ "class": "choose-enemy display-character" });
        $("#attack-stats").html(assembleAttackStatsString("grows3")); //when first choosing enemy and after defeating an enemy
    };

    function clearTheEnemy(winOrLoss) {
        clearTheAttackArea(winOrLoss)
        if (winOrLoss !== "loss") {
            updateSectionWithFadeIn(theCurrentEnemy, "#defeated-enemies", "append");
        };
        $("#defeated-enemies > div").attr({ "style": "opacity: 1" });
        // make this happen only the first time, but *not* at the end game (in case no one was defeated)
        if ($("#defeated-enemies > div").length === 0 && winOrLoss !== "loss") {
            setTimeout(function () {
                $("#defeated-enemies-heading").text("Defeated enemies").attr({ "style": "opacity: 0" });
                $("#defeated-enemies-heading").animate({ opacity: "1" }, 1500);
            }, 1000);
        };
        if ($("#defeated-enemies > div").length === 2) {// if all the enemies have been defeated then
            setTimeout(function () {
                resetChooseEnemy("no");
                processTheGameEnd("win");
            }, 1500);
        } else {
            if (winOrLoss !== "loss") {
                setTimeout(function () {
                    resetChooseEnemy();
                }, 1500);
            };
        };
    };

    function clearTheAttackArea(winOrLoss) {
        // var theWinner = theFighter;
        // var theLoser = theCurrentEnemy;
        // let theWinnerPosition = eval("$(\"#" + theFighter + "\")").position();
        // let theLoserPosition = eval("$(\"#" + theCurrentEnemy + "\")").position();
        // eval("$(\"#" + theWinner + "\")").css({ top: theWinnerPosition.top, left: theWinnerPosition.left, position: "static" });
        // eval("$(\"#" + theLoser + "\")").css({ top: theLoserPosition.top, left: (theLoserPosition.left + 120), position: "static" });
        let theCharToAnimate = "$(\"#" + theCurrentEnemy + "\")";
        eval(theCharToAnimate).animate({ "width": "0px", "height": "0px", "top": "+=100px", "left": "-=60px", "opacity": "0" }, 300);
        setTimeout(function () { //reset so the winner is presentable!
            $("#" + theFighter).attr({ "class": "display-character winner", "width": "200px", "height": "150px", "top": "0", "left": "0", "style": "opacity: 0" });
        }, 2000);
        theCharToAnimate = "$(\"#" + theFighter + "\")";
        eval(theCharToAnimate).animate({ "opacity": "0" }, 300);
    };

    function processTheGameEnd(winOrLoss) {
        setTimeout(function () {
            $("#heading").animate({ opacity: "0" }, 500);
            $("#attack-stats").animate({ opacity: "0" }, 500);
        }, 1000);
        setTimeout(function () { // this timeout lets the last enemy get into the defeated enemies section before the fighter and phrase fade in
            $("#attack-stats").html(assembleAttackStatsString("end"));
            // updateSectionWithFadeIn(theFighter, "#display", "replace");
            if (winOrLoss === "win") {
                var theHeading = "<em>You have defeated all the enemies!</em>";
                var thePhrase = eval("characters." + theFighter + ".winningPhrase");
            } else {
                var theHeading = "<em>You have been defeated!</em>";
                var thePhrase = eval("characters." + theFighter + ".losingPhrase");
            }
            $("#" + theCurrentEnemy).attr({ "class": "display-character", "style": "display: none" });
            $("#heading").html(theHeading).attr({ "style": "opacity: 0" });
            theItemToAppend = ($("<span>").attr({ "class": "display-final-quote", "style": "opacity: 0" }).html(thePhrase));
            $("#heading").animate({ opacity: "1" }, 1000);
            $(".winner").animate({ opacity: "1" }, 1000);
            $("#display").append(theItemToAppend);
            $(".attack").animate({ opacity: "1" }, 1000);
            eval(theItemToAppend).animate({ opacity: "1" }, 1000);
            $("#attack-stats").animate({ opacity: "1" }, 1000);
        }, 2000);
        setTimeout(function () {
            $("#attack-stats").animate({ opacity: "0" }, 1500);
            $("#defeated-enemies").animate({ opacity: "0" }, 1500);
            $("#defeated-enemies-heading").animate({ opacity: "0" }, 1500);
            setTimeout(function () {
                $("#defeated-enemies-heading").attr({ "class": "smaller-heading-text" });
                $("#defeated-enemies-heading").text("Click the button to play again");
                $("#defeated-enemies-heading").animate({ opacity: "1" }, 1500);
            }, 2000);
            setTimeout(function () {
                if (window.matchMedia("(max-width: 670px)").matches) {
                    $("#attack-stats").attr({ "style": "display: none" });
                };
                $("#defeated-enemies").attr({ "style": "display: none" });
                $("#play-again").attr({ "style": "opacity: 1" });
            }, 3000);
        }, 4000);
    };

    $("#play-again").click(function (event) {
        resetGame();
    });

    initializeGame();
});