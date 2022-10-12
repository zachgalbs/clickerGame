let money = 0;
let increaseValue = .1
let upgradeWorth = 0
let upgradePrice = 0

let htmlMoney;
let increaseButton;
let upgradeButton;
let dialogue;


let upgradeStack = [];

function setupGame() {
    htmlMoney = document.getElementById("score");
    increaseButton = document.getElementById("increase");
    upgradeButton = document.getElementById("buyingOption");
    dialogue = document.getElementById("dialogue");
    runGame()
}

function runGame() {
    increaseButton.onclick = function() {
        upgradeCheck();
        money += increaseValue;
        money = Math.round(money*100)/100
        htmlMoney.innerHTML = money;
        htmlMoney.innerHTML = "$" + money;
        checkForDialogue();
    }
    upgradeButton.onclick = function() {
        popUpgrade();
    }
}

function upgradeCheck() {
    // WATER BOTTLE
    if (moneyPassed(10) && increaseValue == 0.1) {pushUpgrade({text: "Buy a nourishing meal! (+$0.02 per click, -$7.00)", value: 0.02, price: 7})};
    // DRUMSTICK 
    console.log(increaseValue);
    if (moneyPassed(25) && increaseValue == 0.12) {pushUpgrade({text: "Buy a Bucket and Drum Sticks! (+$0.04 per click, -$15.00)", value: 0.04, price: 15})}
    // VIOLIN
    if (moneyPassed(50) && increaseValue == 0.16) {pushUpgrade({text: "Buy a cheap violin and some sheet music! (+$0.04 per click, -$45.00)", value: 0.04, price: 45})}
}

function moneyPassed(neededMoney) {
    return (money < neededMoney) && (money + increaseValue >= neededMoney)
}

function pushUpgrade(upgrade) {
    upgradeStack.push(upgrade);
    showUpgradeStack();
}

function popUpgrade() {
    if (upgradeStack.length > 0) {
        increaseValue += upgradeWorth;
        money -= upgradePrice;
        htmlMoney.innerHTML = "$" + money.toLocaleString("en-US");
    }
    upgradeStack.pop();
    showUpgradeStack();
}

function showUpgradeStack() {
    if (upgradeStack.length > 0) {
        let recentUpgrade = upgradeStack[upgradeStack.length -1];
        //Set the text and upgrade worth
        upgradeButton.innerHTML = recentUpgrade.text;
        upgradeWorth = recentUpgrade.value;
        upgradePrice = recentUpgrade.price;
        // Reveal the Button
        upgradeButton.style.opacity = "1";
        upgradeButton.style.cursor = "pointer";
    }
    else {
        //Hide the button
        upgradeButton.style.opacity = "0";
        upgradeButton.style.cursor = "default";
    }
}

function checkForDialogue() {
    console.log(money);
    if (money >= 120) {
        dialogue.innerHTML = "Your homeless buddies start asking you for advice on making money!";
    }
    else if (money >= 40) {
        dialogue.innerHTML = "You know some people around the city that come to your performances!";
    }
    else if (money >= 6) {
        dialogue.innerHTML = "You've found some homeless buddies!";
    }
    else if (moneyPassed) {
        dialogue.innerHTML = "You're now very poor on the streets of Palo Alto, California";
    }
}