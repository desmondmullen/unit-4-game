$(document).ready(function () {
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

    // if (window.matchMedia("(max-width: 670px)").matches) {
    // };

    function resetPage() {
        location = location;
    };

    function initializePage() {
        if (typeof characters != "undefined") {
            for (let theCount = 0; theCount < Object.keys(characters).length; theCount++) {
                let theCharacter = Object.keys(characters)[theCount]
                initializeFields(theCharacter, theCount);
            };
        };
    };

    function initializeFields(theCharacter, x) {
        $("#player" + (x + 1) + "-name").attr({ "value": eval("characters." + theCharacter + ".name") });
        $("#player" + (x + 1) + "-health").attr({ "value": eval("characters." + theCharacter + ".healthPoints") });
        $("#player" + (x + 1) + "-attack").attr({ "value": eval("characters." + theCharacter + ".attackPower") });
    };

    function runOneRound(x, y) {
        let theNumber = 0;
        console.log("fighter's (" + x + ") hp: " + theNumber)
        console.log("fighter's (" + x + ") health: " + theNumber)
        console.log("enemy's (" + y + ") hp: " + theNumber)
        // subtract enemy's attack from fighter's hp
        // subtract fighter's attack from enemy hp
        // set fighter's attack to itself plus the base
    };

    function runThisScenario() {
        let theScenario = "1234"; // the first of a list of scenarios
        let theFighter = theScenario.substring(0, 1); // fighter is the first character of theScenario
        theScenario = theScenario.substring(1); // delete the first character of theScenario
        for (let n = 0; n < 3; n++) { // there are 3 enemies
            let theEnemy = theScenario.substring(0, 1); // enemy is the first character of theScenario
            theScenario = theScenario.substring(1); // delete the first character of theScenario
            // console.log("the fighter: " + theFighter);
            // console.log("the enemy: " + theEnemy);
            // console.log("the remaining scenario: " + theScenario);
            let enemyStillAlive = true;
            while (enemyStillAlive) { // while enemyStillAlive is true
                runOneRound(theFighter, theEnemy);
                // if enemy's health < 1 then set enemyStillAlive to false
                enemyStillAlive = false;
            }
            // delete the first number of theScenario
        }
        // record whether the fighter and/or the enemy are still alive
    }

    // $("").click(function (event) {
    // });

    initializePage();
    runThisScenario();

});