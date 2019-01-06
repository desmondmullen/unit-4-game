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

    var theFighterHealth = 0;
    var theFighterAttack = 0;
    var theEnemyHealth = 0;

    // if (window.matchMedia("(max-width: 670px)").matches) {
    // };

    function resetPage() {
        location = location;
    };

    function initializePage() {
        if (typeof characters != "undefined") {
            for (let theCount = 0; theCount < Object.keys(characters).length; theCount++) {
                let theCharacter = Object.keys(characters)[theCount];
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
        let theFighter = Object.keys(characters)[x - 1];
        let theEnemy = Object.keys(characters)[y - 1];
        // subtract enemy's attack from fighter's hp
        let theEnemyAttack = eval("characters." + theEnemy + ".attackPower")
        theFighterHealth = theFighterHealth - theEnemyAttack
        // set fighter's attack to itself plus the base

        theFighterAttack = theFighterAttack + eval("characters." + theFighter + ".attackPower");
        // subtract fighter's attack from enemy hp
        thePreFightEnemyHealth = theEnemyHealth;
        theEnemyHealth = theEnemyHealth - theFighterAttack //post-fight
        console.log("enemy " + y + "'s attack: " + theEnemyAttack);
        console.log("fighter's post-fight hp: " + theFighterHealth);
        console.log("enemy " + y + "'s pre-fight hp: " + thePreFightEnemyHealth);
        console.log("fighter's attack: " + theFighterAttack);
        console.log("enemy " + y + "'s post-fight hp: " + theEnemyHealth);
        $("#results").append("<br>enemy " + y + "'s attack: " + theEnemyAttack);
        $("#results").append("<br>fighter's post-fight hp: " + theFighterHealth);
        $("#results").append("<br>enemy " + y + "'s pre-fight hp: " + thePreFightEnemyHealth);
        $("#results").append("<br>fighter's attack: " + theFighterAttack);
        $("#results").append("<br>enemy " + y + "'s post-fight hp: " + theEnemyHealth);
        $("#results").append("<br>--------------------------");
        // return theFighterHealth;
    };

    function runThisScenario() {
        let theScenario = "1234"; // the first of a list of scenarios
        let theFighter = theScenario.substring(0, 1); // fighter is the first character of theScenario
        theScenario = theScenario.substring(1); // delete the first character of theScenario
        theFighterHealth = eval("characters." + (Object.keys(characters)[theFighter - 1]
            + ".healthPoints"));
        theFighterAttack = eval("characters." + (Object.keys(characters)[theFighter - 1]
            + ".attackPower"));
        // console.log("check: " + theFighterAttack);
        console.log("fighter's initial hp: " + theFighterHealth);
        console.log("fighter's initial attack: " + theFighterAttack);
        console.log("*****************************");
        $("#results").html("fighter's initial hp: " + theFighterHealth);
        $("#results").append("<br>fighter's initial attack: " + theFighterAttack);
        $("#results").append("<br>*****************************");
        for (let n = 0; n < 3; n++) { // there are 3 enemies
            let theEnemy = theScenario.substring(0, 1); // enemy is the first character of theScenario
            theEnemyHealth = eval("characters." + (Object.keys(characters)[theEnemy - 1] + ".healthPoints"));
            // console.log("enemy's initial hp: " + theEnemyHealth);
            // console.log(Object.keys(characters)[theEnemy - 1] + "'s initial health: " + theEnemyHealth);
            theScenario = theScenario.substring(1); // delete the first character of theScenario
            while (theEnemyHealth > 0) { // while enemyStillAlive is true
                runOneRound(theFighter, theEnemy);
            }
        }
        // record whether the fighter and/or the enemy are still alive
    }

    $("#run-scenarios").click(function (event) {
        runThisScenario();
    });

    initializePage();

});