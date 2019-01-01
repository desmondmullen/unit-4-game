//ATTACKING: each click of the button inflicts damage on player and enemy. Each attack increases player's skills/damage inflicted. Enemy's skills do not increase.

//character objects: each has 3 attributes: `Health Points`, `Attack Power` and `Counter Attack Power` Player's attack power is increased by their base amount with each attack. Player uses `Attack Power` and enemy uses `Counter Attack Power`.

$(document).ready(function () {
    var theFighter;
    var theCurrentEnemy;
    characters = {
        luke: {
            name: "Luke Skywalker",
            avatar: "assets/images/luke.jpg",
            healthPoints: 0,
            attackPower: 0,
            counterAttackPower: 0,
            winningPhrase: "",
            losingPhrase: ""
        },
        vader: {
            name: "Darth Vader",
            avatar: "assets/images/vader.jpg",
            healthPoints: 0,
            attackPower: 0,
            counterAttackPower: 0,
            winningPhrase: "",
            losingPhrase: ""
        },
        stormtrooper: {
            name: "Stormtrooper",
            avatar: "assets/images/stormtrooper.jpg",
            healthPoints: 0,
            attackPower: 0,
            counterAttackPower: 0,
            winningPhrase: "",
            losingPhrase: ""
        },
        compactor: {
            name: "Trash Compactor",
            avatar: "assets/images/compactor.jpg",
            healthPoints: 0,
            attackPower: 0,
            counterAttackPower: 0,
            winningPhrase: "",
            losingPhrase: ""
        }
    };

    function resetGame() {
        for (x = 0; x < Object.keys(characters).length; x++) {
            updateSection(Object.keys(characters)[x], "#choose-fighter", "append");
        };
        $("#choose-fighter-heading").text("Choose your fighter");

    };

    function updateSection(theCharacter, theLocation, appendOrReplace) {
        theItemToAppend = ($("<div>").attr({ "id": theCharacter, "class": "display-character", }).html(eval("characters." + theCharacter + ".name")));
        if (appendOrReplace == "append") {
            $(theLocation).append(theItemToAppend);
        } else {
            $(theLocation).html(theItemToAppend);
        }
    };

    function updateSectionWithFadeIn(theCharacter, theLocation, appendOrReplace) {
        theItemToAppend = ($("<div>").attr({ "id": theCharacter, "class": "display-character", "style": "opacity: 0" }).html(eval("characters." + theCharacter + ".name")));
        if (appendOrReplace == "append") {
            $(theLocation).append(theItemToAppend);

        } else {
            $(theLocation).html(theItemToAppend);
        }
        eval(theItemToAppend).animate({ opacity: "1" }, 1500);

    };

    $("#choose-fighter").click(function (event) {
        theFighter = event.target.id
        updateSection(theFighter, "#your-fighter", "append");
        resetChooseEnemy()
        $("#choose-fighter").empty();
        $("#choose-fighter-heading").empty();
    });

    $("#choose-enemy").click(function (event) {
        let yourFighter = $("#your-fighter > div").attr("id");
        //move your fighter from your fighter area to attack area
        updateSection(yourFighter, "#attack-area", "append");
        $("#your-fighter").empty();
        //move the chosen enemy to attack area
        theCurrentEnemy = event.target.id;
        updateSection(theCurrentEnemy, "#attack-area", "append");
        resetChooseEnemy();
    });

    function resetChooseEnemy() {
        $("#choose-enemy").empty();
        for (x = 0; x < Object.keys(characters).length; x++) {
            let theKey = Object.keys(characters)[x];
            var theIfStatement = "theFighter != theKey && theCurrentEnemy != theKey"
            //check if enemy is in defeated-enemies
            for (y = 0; y < $("#defeated-enemies > div").length; y++) {
                theIfStatement = theIfStatement + " && \"" + $("#defeated-enemies > div")[y].id + "\" != theKey";
            }
            if (eval(theIfStatement)) {
                updateSection(Object.keys(characters)[x], "#choose-enemy", "append");
            };
        };
    };

    $("#attack-button, #attack-area").click(function (event) {
        //do some attacking
        if (1 === 1) { //if you win
            clearTheEnemy(); //clears the enemy and the game continues
        } else {
            //do a game-over thing
        };
    });

    function clearTheEnemy() {
        let theCharToAnimate = "$(\"#" + theCurrentEnemy + "\")";
        eval(theCharToAnimate).animate({ width: "0px", height: "0px", "margin-top": "+=150px", opacity: "0" });
        theCharToAnimate = "$(\"#" + theFighter + "\")";
        eval(theCharToAnimate).animate({ opacity: "0" });
        updateSectionWithFadeIn(theCurrentEnemy, "#defeated-enemies", "append");
        $("#attack-area").empty();
        updateSectionWithFadeIn(theFighter, "#your-fighter", "replace");
        if ($("#defeated-enemies > div").length === 3) {//if all the enemies have been defeated then
            setTimeout(function () {
                alert("You won!");
                //do a big you-won thing
            }, 1000);
        };
    };

    resetGame();
});