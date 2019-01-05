$(document).ready(function () {
    var theFighter = "";
    var theCurrentEnemy = "";
    var clickCheckString = "";
    var zIndexNumber = 0;
    var gameIsOver = "";

    characters = {
        luke: {
            name: "Luke Skywalker",
            smallScreenName: "Luke Skywalker",
            healthPoints: 115,
            attackPower: 40,
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
            winningPhrase: "\"Your powers are weak, old man.\"",
            losingPhrase: "\"The Force is strong with this one.\"",
        },
        stormtrooper: {
            name: "Stormtrooper",
            smallScreenName: "Storm- trooper",
            healthPoints: 80,
            attackPower: 30,
            counterAttackPower: 0,
            winningPhrase: "\"Inform Lord Vader we have prisoners.\"",
            losingPhrase: "\"These aren't the droids we're looking for.\"",
        },
        compactor: {
            name: "Trash Compactor",
            smallScreenName: "Trash Compactor",
            healthPoints: 70,
            attackPower: 50,
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
        theCharacterGrabString = eval("characters." + theCharacter);
        if (theCharacter === theFighter) {
            return "\nHealth:" + processNumberToStandardLengthString(theCharacterGrabString.healthPoints) + "\nAttack:" + processNumberToStandardLengthString(theCharacterGrabString.counterAttackPower);
        } else {
            return "\nHealth:" + processNumberToStandardLengthString(theCharacterGrabString.healthPoints) + "\nAttack:" + processNumberToStandardLengthString(theCharacterGrabString.attackPower);
        };
    };

    function assembleAttackStatsString(includeText) {
        let theFighterGrabString = eval("characters." + theFighter);
        let theAttackStatsStringRight = "";
        $("#attack-stats").animate({ opacity: "0" }, 200);
        $("#attack-stats").empty();
        if (includeText === "grows3") {
            theAttackStatsString = "Your Health: " + theFighterGrabString.healthPoints;
        } else {
            var theCurrentEnemyGrabString = eval("characters." + theCurrentEnemy);
            theAttackStatsString = "Your Health: " + theFighterGrabString.healthPoints;
        };
        if (theFighterGrabString.counterAttackPower === 0) {
            theFighterGrabString.counterAttackPower = theFighterGrabString.attackPower
        };
        if (window.matchMedia("(max-width: 670px)").matches) {
            theAttackStatsString = theAttackStatsString + "<br>";
        } else {
            theAttackStatsString = theAttackStatsString + ", ";
        };
        if (includeText === "grows3") { //don't do this at end of game
            theAttackStatsString = theAttackStatsString + "Your Attack: " + theFighterGrabString.counterAttackPower + " (grows with each attack)<br><span class=\"hover-for-stats-notice text-pulse\">(Hover over an enemy's name to see Health and Attack)</span>";
        } else { // (grows2) after enemy is selected, we reformat as a table
            theAttackStatsString = "<section class=\"attack-stats-left\">Health: " + processNumberToStandardLengthString(theFighterGrabString.healthPoints) + "<br>Attack: " + processNumberToStandardLengthString(theFighterGrabString.counterAttackPower) + "</section>"
            theAttackStatsStringRight = "<section class=\"attack-stats-right\">Health: " + processNumberToStandardLengthString(theCurrentEnemyGrabString.healthPoints) + "<br>Attack: " + processNumberToStandardLengthString(theCurrentEnemyGrabString.attackPower) + "</section>"
        }
        setTimeout(function () {
            $("#attack-stats").html(theAttackStatsString);
            $("#attack-stats").append(theAttackStatsStringRight);
            $("#attack-stats").animate({ opacity: "1" }, 500);
        }, 500);
    };

    function processNumberToStandardLengthString(theNumber) {
        theNumberToReturn = parseInt(theNumber);
        let theSpacesToAdd = "";
        let theTempNumber = parseInt(theNumber);
        for (n = 0; n < 4; n++) {
            if (theTempNumber.toString().length < 4) {
                //add a preceding space
                theSpacesToAdd = "&nbsp;" + theSpacesToAdd;
                theTempNumber = " " + theTempNumber;
            };
        };
        theNumberToReturn = theSpacesToAdd + theNumberToReturn
        return (theNumberToReturn);
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
        // enemy's health = health - theFighter's counter attack power
        theCurrentEnemyGrabString.healthPoints = theCurrentEnemyGrabString.healthPoints - theFighterGrabString.counterAttackPower;
        // fighter's counter attack power = counter attack power + attack power each round
        theFighterGrabString.counterAttackPower = theFighterGrabString.counterAttackPower + theFighterGrabString.attackPower;
        // update stats
        assembleAttackStatsString("grows1"); // loads after an attack
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
        if (event.target.id !== "") {
            var theEventTarget = event.target.id;
            if (clickCheckString.includes(theEventTarget)) {
                if ($("#heading").text() == "Choose the next enemy to fight" || $("#heading").text() == "Choose an enemy to fight") {
                    //set z-index and animate the enemy off to the right
                    theEnemyToAnimate = "#" + theEventTarget;
                    zIndexNumber = zIndexNumber + 99;
                    $(theEnemyToAnimate).css('z-index', zIndexNumber);
                    $(theEnemyToAnimate).animate({ "left": 300, "opacity": 0 }, 400);
                    setTimeout(function () {
                        //move your fighter to attack area
                        updateSection(theFighter, "#display", "replace");
                        //move the chosen enemy to attack area
                        $("#heading").text("Click your fighter to attack!");
                        theCurrentEnemy = theEventTarget;
                        updateSection(theCurrentEnemy, "#display", "append");
                        animateAttack(theFighter, theCurrentEnemy);
                        assembleAttackStatsString("grows2"); //when you first choose enemy - before the first attack
                    }, 210);
                } else {
                    if ($("#heading").text() == "Click your fighter to attack!") {
                        doAttack();
                        if (eval("characters." + theCurrentEnemy).healthPoints < 1) { //if you win that round
                            clearTheEnemy("win"); //clears the enemy and the game continues
                        } else { //if you lose
                            if (eval("characters." + theFighter).healthPoints < 1) {
                                clearTheEnemy("loss");
                                processTheGameEnd("loss");
                                gameIsOver = "loss";
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
        };
    });

    function resetChooseEnemy(emptyDisplayOrNot) {
        if (emptyDisplayOrNot === "no") { //we only get "no" when the player wins
            $("#heading").html("&nbsp");
            $("#attack-stats").html("&nbsp");
        } else {
            $("#heading").text("Choose the next enemy to fight");
            $("#display").empty(); // this takes care of a problem when this empties at end of game
            assembleAttackStatsString("grows3"); //when first choosing enemy and after defeating an enemy
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
        // assembleAttackStatsString("grows3"); //when first choosing enemy and after defeating an enemy
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
                if (eval("characters." + theFighter).healthPoints < 1) {
                    gameIsOver = "loss";
                }
                processTheGameEnd("win");
            }, 1500);
        } else {
            if (winOrLoss !== "loss") {
                setTimeout(function () {
                    resetChooseEnemy("test");
                }, 1500);
            };
        };
    };

    function clearTheAttackArea(winOrLoss) {
        if (winOrLoss === "loss") { //then we switch them around so the animation is right
            theWinner = theCurrentEnemy;
            theLoser = theFighter;
            $("#" + theWinner).animate({ "left": "+=200", "opacity": "0" }, 300); //off to the right
        } else {
            theWinner = theFighter;
            theLoser = theCurrentEnemy;
            $("#" + theWinner).animate({ "left": "-=200", "opacity": "0" }, 300); //off to the left
        };
        $("#" + theLoser).animate({ "width": "0px", "height": "0px", "top": "+=200", "left": "-=60", "opacity": "0" }, 300); //shrivel away
        setTimeout(function () { //reset so the fighter (the player) is presentable!
            $("#" + theFighter).attr({ "class": "display-character winner", "width": "200px", "height": "150px", "top": "0", "left": "0", "style": "opacity: 0" });
        }, 2000);
        $("#" + theWinner).animate({ "opacity": "0" }, 300);
    };

    function processTheGameEnd(winOrLoss) {
        setTimeout(function () {
            $("#heading").animate({ opacity: "0" }, 500);
            $("#attack-stats").animate({ opacity: "0" }, 500);
        }, 1000);
        setTimeout(function () { // this timeout lets the last enemy get into the defeated enemies section before the fighter and phrase fade in
            // assembleAttackStatsString("end");
            // $("#attack-stats").html(assembleAttackStatsString("end"));
            // updateSectionWithFadeIn(theFighter, "#display", "replace");
            if (gameIsOver === "loss") {
                var theHeading = "<em>You have been defeated!</em>";
                var thePhrase = eval("characters." + theFighter + ".losingPhrase");
            } else {
                var theHeading = "<em>You have defeated all the enemies!</em>";
                var thePhrase = eval("characters." + theFighter + ".winningPhrase");
            }
            $("#" + theCurrentEnemy).attr({ "class": "display-character", "style": "display: none" });
            $("#heading").html(theHeading).attr({ "style": "opacity: 0" });
            theItemToAppend = ($("<section>").attr({ "class": "display-final-quote", "style": "opacity: 0" }).html(thePhrase));
            // theItemToAppend = ($("<span>").attr({ "class": "display-final-quote", "style": "opacity: 0" }).html(thePhrase));
            $("#heading").animate({ opacity: "1" }, 1000);
            $(".winner").animate({ opacity: "1" }, 1000);
            $("#display").append(theItemToAppend);
            $(".attack").animate({ opacity: "1" }, 1000);
            eval(theItemToAppend).animate({ opacity: "1" }, 1000);
        }, 2000);
        setTimeout(function () {
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