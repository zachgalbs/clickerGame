let money = 0;
let increaseValue = .1;
let upgradeWorth = 0;
let upgradePrice = 0;
let statementNum = 0;

let htmlMoney;
let increaseButton;
let upgradeButton;
let dialogue;
let enterPressed = false;
let upgradeButtonText;
let incomeText;
let dayText;
let dayTextNum = 0;
let numOfUpgrades = 0;
let clicks = 0;
let moneyLossPerDay = 0;
let upgradeLossPerDay = 0;
let moneyLostPerDayLabel;

let upgradeStack = [];
function setupGame() {
    htmlMoney = document.getElementById("score");
    increaseButton = document.getElementById("button");
    upgradeButton = document.getElementById("buyingOption");
    dialogue = document.getElementById("dialogue");
    upgradeButtonText = document.getElementById("buyingOptionText");
    incomeText = document.getElementById("income");
    dayText = document.getElementById("dayCounter");
    moneyLostPerDayLabel = document.getElementById("moneyLostPerDayLabel");
    runGame()
}

function processClick() {
    if (!enterPressed) {
        upgradeCheck();
        money += increaseValue;
        money = Math.round(money*100)/100
        htmlMoney.innerHTML = (money).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        clicks++;
        if (clicks>=200) {checkMoneyPerDay();}
        checkForDialogue();
    }
    
    enterPressed = false;
}

function bulkClick(clicks) {
    for (let click = 0; click < clicks; click++) {
        processClick();
    }
}

function runGame() {
    increaseButton.onclick = function() {
        processClick();
    }

    upgradeButton.onclick = function() {
        popUpgrade();
        increaseValue = Math.round(increaseValue*100)/100;
        incomeText.innerHTML = `Income: $${increaseValue}`;
    }
}

function upgradeCheck() {
    // WATER BOTTLE
    if (moneyPassed(10) && numOfUpgrades == 0) {pushUpgrade({text: "Buy a nourishing meal! (+$0.02 income, -$7.00)", value: 0.02, price: 7})};
    // DRUMSTICK 
    if (moneyPassed(25) && numOfUpgrades == 1) {pushUpgrade({text: "Buy a bucket and drum sticks! (+$0.04 income, -$15.00)", value: 0.04, price: 15})}
    // VIOLIN
    if (moneyPassed(50) && numOfUpgrades == 2) {pushUpgrade({text: "Buy a cheap violin and some sheet music! (+$0.04 income, -$30.00)", value: 0.04, price: 30})}
    // CLOTHES
    if (moneyPassed(100) && numOfUpgrades == 3) {pushUpgrade({text: "Get some clothes and a pair of shoes! (+$0.05 income, -$80.00)", value: 0.05, price: 80})}
    // BETTER VIOLIN
    if (moneyPassed(300) && numOfUpgrades == 4) {pushUpgrade({text: "Get a better violin! (+$0.05 income, -$200.00)", value: 0.05, price: 200})}
    // KEYBOARD
    if (moneyPassed(650) && numOfUpgrades == 5) {pushUpgrade({text: "Get a electric piano! (+$0.10 income, -$499.00)", value: 0.10, price: 499})}
    // SPEAKERS
    if (moneyPassed(800) && numOfUpgrades == 6) {pushUpgrade({text: "Buy two high quality speakers for your piano! (+$0.15 income, -$450.00)", value: 0.15, price: 450})}
    // HAIRCUT
    if (moneyPassed(1100) && numOfUpgrades == 7) {pushUpgrade({text: "Get a haircut and better clothes! (+$0.05 income -$150.00)", value: 0.05, price: 150})}
    // LESSONS
    if (moneyPassed(1800) && numOfUpgrades == 8) {pushUpgrade({text: "Get piano lessons! (+$0.50 income -$80.00 per day)", value: 0.50, price: 0, pricePerDay: 80})}
    // WORKERS
    if (moneyPassed(3000) && numOfUpgrades == 9) {pushUpgrade({text: "Hire your homeless friends to play your violin in different locations! (+$60.00 per day)", value: 0, price: 0, pricePerDay: -60})}
    // WORLD
    if (moneyPassed(100,000,000,000,000,000) && numOfUpgrades == 50) {pushUpgrade({text: "Buy the world and everyone on it! (+$100,000,000,000,000 income -$85,000,000,000,000,000)", value: 100000000000000, price:85000000000000000})}
}

function moneyPassed(neededMoney) {
    return (money < neededMoney) && (money + increaseValue >= neededMoney)
}

function pushUpgrade(upgrade) {
    numOfUpgrades++;
    upgradeStack.push(upgrade);
    showUpgradeStack();
}

function popUpgrade() {
    if (upgradeStack.length > 0) {
        increaseValue += upgradeWorth;
        money -= upgradePrice;
        moneyLossPerDay = upgradeLossPerDay; //100
        clicks = 0;
        htmlMoney.innerHTML = (money).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        upgradeCheck();
    }
    upgradeStack.pop();
    showUpgradeStack();
}

function showUpgradeStack() {
    if (upgradeStack.length > 0) {
        let recentUpgrade = upgradeStack[upgradeStack.length -1];
        //Set the text and upgrade worth
        upgradeButtonText.innerHTML = recentUpgrade.text;
        upgradeWorth = recentUpgrade.value;
        upgradePrice = recentUpgrade.price;
        if (typeof recentUpgrade.pricePerDay !== 'undefined') {upgradeLossPerDay += recentUpgrade.pricePerDay;}
        // Reveal the Button
        upgradeButton.style.opacity = "1";
        upgradeButtonText.style.opacity = "1";
        upgradeButton.style.cursor = "pointer";
    }
    else {
        //Hide the button
        upgradeButton.style.opacity = "0";
        upgradeButtonText.style.opacity = "0";
        upgradeButton.style.cursor = "default";
    }
}

function checkForDialogue() {
    if (money >= 85,000,000,000,000,000) {
        checkMoneyDialogue("Your net worth is greater than that of the entire world and everyone on it!", 30)
    }
    else if (money >= 900) {
        checkMoneyDialogue("You start building up a reputation throughout the city with your piano skills!", 5)
    }
    else if (money >= 500) {
        checkMoneyDialogue("You start teaching your homeless buddies a few songs on the violin!", 4)
    }
    else if (money >= 120) {
        checkMoneyDialogue("Your homeless buddies start asking you for advice on making money!", 3)
    }
    else if (money >= 40) {
        checkMoneyDialogue("You know some people around the city that come to your performances!", 2)
    }
    else if (money >= 6) {
        checkMoneyDialogue("You've found some homeless buddies!", 1);
    }
    else if (moneyPassed) {
        checkMoneyDialogue("You're now very poor on the streets of Downtown Palo Alto, California", 0);
    }
}

function checkMoneyDialogue(text, num) {
    if (statementNum == num) {
        statementNum++;
        dialogue.innerHTML = text;
    }
}

function checkMoneyPerDay() {
    clicks = 0;
    dayTextNum++;
    dayText.innerHTML = `Day: ${dayTextNum}`;
    console.log("this has ran");
    moneyLostPerDayLabel.innerHTML = `-$${moneyLossPerDay}`;
    //moneyLostPerDayLabel.style.animation = 'example 1.5s';
    moneyLostPerDayLabel.classList.add('tryingToMakeWork');

    if (moneyLossPerDay > 0) {
        console.log(moneyLossPerDay)
        money -= moneyLossPerDay;
        htmlMoney.innerHTML = (money).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
    }
}

//This code here is to nerf the enter key
document.addEventListener("keydown", function(event) {
    if (event.keyCode == 13) {
        enterPressed = true;
    }
});