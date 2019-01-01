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
        // updateSection(theFighter, "#your-fighter", "append");
        resetChooseEnemy()
        $("#choose-fighter").empty();
        $("#choose-fighter-heading").empty();
        $("#choose-enemy-heading").text("Choose an enemy to fight");
        $("#attack-area-heading").empty();
        $("#defeated-enemies-heading").empty();

    });

    $("#choose-enemy").click(function (event) {
        //move your fighter from your fighter area to attack area
        $("#defeated-enemies > div").attr({ "style": "opacity: 0" });
        updateSection(theFighter, "#attack-area", "append");
        $("#your-fighter").empty();
        //move the chosen enemy to attack area
        theCurrentEnemy = event.target.id;
        updateSection(theCurrentEnemy, "#attack-area", "append");
        resetChooseEnemy();
        $("#choose-enemy-heading").empty();
        $("#choose-enemy").empty();
        $("#attack-area-heading").text("Attack area");
        $("#defeated-enemies-heading").empty();
    });

    function resetChooseEnemy() {
        $("#choose-enemy").empty();
        $("#choose-enemy-heading").text("Choose the next enemy to fight");
        $("#attack-area-heading").empty();
        // $("#defeated-enemies > div").animate({ opacity: "1" });
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

    $("#attack-area").click(function (event) {
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
        $("#defeated-enemies > div").attr({ "style": "opacity: 1" });
        setTimeout(function () {
            $("#attack-area").empty();
        }, 1000);
        $("#defeated-enemies-heading").text("Defeated enemies");
        // updateSectionWithFadeIn(theFighter, "#your-fighter", "replace");
        if ($("#defeated-enemies > div").length === 3) {//if all the enemies have been defeated then
            $("#attack-area-heading").empty();
            setTimeout(function () {
                $("#choose-enemy").empty();
                alert("You won!");
                //do a big you-won thing
            }, 1000);
        } else {
            resetChooseEnemy()
        };
    };

    resetGame();
});