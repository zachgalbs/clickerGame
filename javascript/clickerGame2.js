let num = 0;
let increaseValue = 1
let upgradeWorth = 1
let rebirthMultiplier = 1;
let allowUpgrade = false;
let allowRebirth = false;

let htmlNum;
let increaseButton;
let decreaseButton;
let resetButton;
let upgradeButton;
let rebirthButton;

let upgradeStack = [];

function setupClickerGame() {
    htmlNum = document.getElementById("score");
    increaseButton = document.getElementById("increase");
    decreaseButton = document.getElementById("decrease");
    resetButton = document.getElementById("reset");
    upgradeButton = document.getElementById("buyingOption");
    rebirthButton = document.getElementById("rebirthButton");       

    attachFunctions();
}

function attachFunctions() {
    // This is all the code for making money
    increaseButton.onclick = function() {
        checkForBonusButton();

        num += increaseValue;
        htmlNum.innerHTML = num;
    }

    upgradeButton.onclick = function() {
        processUpgrade();
    }
}

function checkForBonusButton() {
    // VIOLIN BONUS
    if (scorePasses(180)) addUpgradeToStack({ text: "Buy a cheap violin! (+2 per click)", worth: 2 });

    // BUCKET AND DRUMSTICK
    if (scorePasses(60)) addUpgradeToStack({ text: "Buy a bucket and a drum stick! (+1 per click)", worth: 1 });

    // WATER BOTTLE
    if (scorePasses(30)) addUpgradeToStack({ text: "Buy a water bottle! (+$1 per click)", worth: 1 });
}

function scorePasses(newScore) {
    return ((num < newScore) && (num + increaseValue >= newScore));
}

function processUpgrade() {
    increaseValue += upgradeWorth;
    upgradeStack.pop();
    displayUpgradeStack();
}

function addUpgradeToStack(upgrade) {
    upgradeStack.push(upgrade);
    displayUpgradeStack();
}

function displayUpgradeStack() {
    if (upgradeStack.length > 0) {
        // get the last member of the stack
        let upgrade = upgradeStack[upgradeStack.length - 1];

        // SET THE VARIABLES
        upgradeButton.innerHTML = upgrade.text;
        upgradeWorth = upgrade.worth;
        
        // MAKE THE BUTTON VISIBLE
        upgradeButton.style.opacity = "1";
        upgradeButton.style.cursor = "pointer";
    } else {
        upgradeButton.style.opacity = "0";
        upgradeButton.style.cursor = "default";
    }
}