let num = 0;
let increaseValue = 1
let upgradeWorth = 1
const htmlNum = document.getElementById("score");
const increaseButton = document.getElementById("increase");
const decreaseButton = document.getElementById("decrease");
const resetButton = document.getElementById("reset");
const upgradeButton = document.getElementById("buyingOption");
const rebirthButton = document.getElementById("rebirthButton");
let rebirthMultiplier = 1;
let allowUpgrade = false;
let allowRebirth = false;

// This is all the code for making money
increaseButton.onclick = function() {
    if (num < 180 && (num + increaseValue >= 180)) {
        upgradeButton.style.opacity = "1";
        upgradeButton.style.cursor = "pointer";
        allowUpgrade = true
        upgradeButton.innerHTML = "Buy a cheap violin! (+2 per click)"
        upgradeWorth = 2;
    }
    else if (num < 60 && (num + increaseValue >= 60)) {
        upgradeButton.style.opacity = "1";
        upgradeButton.style.cursor = "pointer";
        allowUpgrade = true
        upgradeButton.innerHTML = "Buy a bucket and a drum stick! (+1 per click)"
    }
    else if (num < 30 && (num + increaseValue >= 30)) {
        upgradeButton.style.opacity = "1";
        upgradeButton.style.cursor = "pointer";
        allowUpgrade = true
        upgradeButton.innerHTML = "Buy a water bottle! (+$1 per click)"
    }
    num += increaseValue;
    htmlNum.innerHTML = num;
    // This is all the code for the rebirth feature:
    if (num >= 500 * rebirthMultiplier) {
        rebirthButton.style.opacity = "1";
        rebirthButton.style.cursor = "pointer";
        allowRebirth = true;
    }
}

upgradeButton.onclick = function() {
    checkUpgrade()
}
rebirthButton.onclick = function() {
    if (allowRebirth) {
    rebirthMultiplier += .2;
    rebirthButton.style.opacity = "0";
    rebirthButton.style.cursor = "default";
    }
}
function checkUpgrade() {
    if (allowUpgrade){
        upgradeButton.style.opacity = "0";
        upgradeButton.style.cursor = "default";
        increaseValue += upgradeWorth * rebirthMultiplier;
        console.log("upgraded!")
    }
    allowUpgrade = false;
}