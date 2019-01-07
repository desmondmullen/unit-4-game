# Star Wars RPG, UNC Full Stack Bootcamp jQuery assignment, January 2018

For this - our first jQuery assignment - I chose the "Challenge" option. The instructions for the assignment can be found in my github repository for this game. It may be of interest to look at the instructions, I'm pleased that I was able to take this game far beyond the requirements. I was first introduced to JavaScript about three weeks ago but I have been fortunate to have a good head start on the language having been fluent in its antecedents HyperTalk and AppleScript 20-30 years ago.

**Features**

        * I added animations and other user prompts to make the game engaging, not just a
        useful coding exercise.
        * animations and color-coding of player "chips" lead player through the steps of
        the game with minimal-to-no instruction.
        * if needed, instructions can be accessed by clicking the "How to Play" button on
        the start screen.
        * responsive design plays well on mobile phones - even in portrait mode.
        * player sees his/her character's winning-phrase or losing-phrase on screen when
        the game is over.
        * gently blinking buttons and headings guide player through gameplay.

All animations have been carefully coordinated for consistency and logical sense. For example, when choosing an enemy to fight, the clicked enemy darts off to the right (in front of the other players thanks to z-index) to, in a sense, get ready to fight. The player then enters the attack stage from the left at the same time as the enemy enters from the right. They meet in the middle. Once an attack has commenced, the players collide with each other. The statistics display fades out and comes back to alert the user to the fact that it has been updated. Once player or enemy has been defeated, he "shrivels" away down to the defeated enemies area.

In developing this project, one of the requirements was that "...players should be able to win and lose the game no matter what character they choose. The challenge should come from picking the right enemies, not choosing the strongest player." This task was interesting because it's difficult to *truly* run through all the scenarios and make sure everyone can be a winner. I created the https://desmondmullen.com/unit-4-game/attackmath.html Attack Math Calculator to run every possible scenario based on health points and attack points inputs for four characters. To date, I have not found a combination of numbers that truly allows for every character to win (but I may just have not found it yet). I feel that the numbers I came up with for my game make for engaging and challenging gameplay.

If you enter the health and attack numbers in the Attack Math Calculator for a set of
characters you see in a pre-existing game, you can exactly predict the outcome of every
pairing assuming that game's developer followed the formula for the project:

        * Each time the player attacks, their Attack Power increases by its base Attack
        Power. For example, if the base Attack Power is 6, each attack will increase the
        Attack Power by 6 (12, 18, 24, 30 and so on).
        * When the player attacks, the enemy loses Health Points equalling the player's
        Attack Points and the player loses Health Points equalling the enemy's Attack
        Points.
        * The player's Attack Points increase with each attack, the enemy's Attack Points
        do not increase.

Thank you for looking at this project.

-Desmond Mullen desmond@desmondmullen.com