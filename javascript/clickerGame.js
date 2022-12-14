let money = 0;
let increaseValue = .1;
let upgradeWorth = 0;
let upgradePrice = 0;
let statementNum = 0;

let htmlMoney;
let increaseButton;
let upgradeButton;
let passButton;
let dialogue;

let isChoicePassed = false;
let enterPressed = false;
let isChoice = false;

let upgradeButtonText;
let incomeText;
let dayText;
let rebirthButton;


let dayTextNum = 0;
let numOfUpgrades = 0;
let clicks = 0;
let moneyLossPerDay = 0;
let upgradeLossPerDay = 0;
let moneyLostPerDayLabel;
let amountOfRebirths = 0;

let upgradeStack = [];
function setupGame() {
    rebirthButton = document.getElementById("rebirthButton");
    htmlMoney = document.getElementById("score");
    increaseButton = document.getElementById("button");
    upgradeButton = document.getElementById("buyingOption");
    dialogue = document.getElementById("dialogue");
    upgradeButtonText = document.getElementById("buyingOptionText");
    incomeText = document.getElementById("income");
    dayText = document.getElementById("dayCounter");
    moneyLostPerDayLabel = document.getElementById("moneyLostPerDayLabel");
    passButton = document.getElementById("passOption");
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
        rebirthCheck();
        passUpgrade();
    }
    else if (enterPressed) {
        upgradeCheck();
        increaseValue = increaseValue / 3
        money += increaseValue;
        money = Math.round(money*100)/100
        htmlMoney.innerHTML = (money).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        clicks++;
        if (clicks>=200) {checkMoneyPerDay();}
        checkForDialogue();
        rebirthCheck();
        passUpgrade();
        increaseValue = increaseValue * 3
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
        if (!isChoice){
            processClick()
        };
    }

    upgradeButton.onclick = function() {
        popUpgrade();
        passUpgrade();
        increaseValue = Math.round(increaseValue*100)/100;
        incomeText.innerHTML = `Income: $${increaseValue}`;
    }
}

function upgradeCheck() {
    // WATER BOTTLE
    if (moneyPassed(10) && numOfUpgrades == 0) {pushUpgrade({text: "Buy a nourishing meal! (+$0.02 income, -$7.00)", value: 0.02 * (amountOfRebirths + 1), price: 5})};
    // DRUMSTICK 
    if (moneyPassed(25) && numOfUpgrades == 1) {pushUpgrade({text: "Buy a bucket and drum sticks! (+$0.04 income, -$15.00)", value: 0.04 * (amountOfRebirths + 1), price: 15})}
    // VIOLIN
    if (moneyPassed(50) && numOfUpgrades == 2) {pushUpgrade({text: "Buy a cheap violin and some sheet music! (+$0.04 income, -$30.00)", value: 0.04 * (amountOfRebirths + 1), price: 30})}
    // CLOTHES
    if (moneyPassed(100) && numOfUpgrades == 3) {pushUpgrade({text: "Get some clothes and a pair of shoes! (+$0.05 income, -$60.00)", value: 0.05 * (amountOfRebirths + 1), price: 60})}
    // VIOLIN 2
    if (moneyPassed(300) && numOfUpgrades == 4) {pushUpgrade({text: "Get a better violin! (+$0.05 income, -$200.00)", value: 0.05 * (amountOfRebirths + 1), price: 190})}
    // KEYBOARD
    if (moneyPassed(650) && numOfUpgrades == 5) {pushUpgrade({text: "Get a electric piano! (+$0.10 income, -$400.00)", value: 0.10 * (amountOfRebirths + 1), price: 400})}
    // SPEAKERS
    if (moneyPassed(800) && numOfUpgrades == 6) {pushUpgrade({text: "Buy two high quality speakers for your piano! (+$0.15 income, -$450.00)", value: 0.15 * (amountOfRebirths + 1), price: 450})}
    // HAIRCUT
    if (moneyPassed(1100) && numOfUpgrades == 7) {pushUpgrade({text: "Get a haircut and better clothes! (+$0.05 income -$150.00)", value: 0.05 * (amountOfRebirths + 1), price: 150})}
    // LESSONS
    if (moneyPassed(1800) && numOfUpgrades == 8) {pushUpgrade({text: "Get piano lessons! (+$0.50 income -$80.00 per day)", value: 0.50 * (amountOfRebirths + 1), price: 0, pricePerDay: 80})}
    // WORKERS
    if (moneyPassed(3000) && numOfUpgrades == 9) {pushUpgrade({text: "Hire your homeless friends to play your violin in different locations! (+$60.00 per day)", value: 0, price: 0, pricePerDay: -60 * (amountOfRebirths + 1)})}
    // BAND
    if (moneyPassed(5500) && numOfUpgrades == 10) {pushUpgrade({text: "Make a band with your friends! (+$0.50 income - $2,000)", value: 0.50 * (amountOfRebirths + 1), price: 2000})}
    // TEACHING
    if (moneyPassed(10000) && numOfUpgrades == 11) {pushUpgrade({text: "Teach your friends to play their instruments better! (+$1.00 income - $4,000)", value: 1.00 * (amountOfRebirths + 1), price: 4000})}
    // OFFER
    if (moneyPassed(18000) && numOfUpgrades == 12) {
        isChoice = true;
        pushUpgrade({
            text: "You see that a club has a open jazz night every night for a week! Do you attend? (-$2.00 income -$0)", value: -2.0 * (amountOfRebirths + 1), price: 0})
    }
    if (moneyPassed(22000) && numOfUpgrades == 13 && isChoicePassed == false) {
        pushUpgrade({text: "You have been asked to join a band! (+$5.00 income -$500)", value: 5.0 * (amountOfRebirths + 1), price: 500})
    }
    // WORLD
    if (moneyPassed(100,000,000,000,000,000) && numOfUpgrades == 50) {pushUpgrade({text: "Buy the world and everyone on it! (+$100,000,000,000,000 income -$85,000,000,000,000,000)", value: 100000000000000 * (amountOfRebirths + 1), price:85000000000000000})}
}

function moneyPassed(neededMoney) {
    return (money < neededMoney) && (money + increaseValue >= neededMoney)
}

function pushUpgrade(upgrade) {
    numOfUpgrades++;
    upgradeStack.push(upgrade);
    showUpgradeStack();
}

function passUpgrade() {
    if (isChoice == true){
        passButton.style.opacity = '1';
        passButton.style.cursor = 'pointer';
        passButton.onclick = function() {
        if (passButton.style.opacity == '1'){
            passButton.style.opacity = '0';
            passButton.style.cursor = 'default';
            upgradeWorth = 0;
            upgradePrice = 0;
            isChoicePassed = true;
            popUpgrade();
            increaseValue = Math.round(increaseValue*100)/100;
            incomeText.innerHTML = `Income: $${increaseValue}`;
            isChoice = false;
        }
        }
    }
    else {
        passButton.style.opacity = '0';
        passButton.style.cursor = 'default';
    }
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
    isChoice = false;
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
    else if (money >= 20000) {
        checkMoneyDialogue("You notice notes are being taken by important people")
    }
    else if (money >= 8000) {
        checkMoneyDialogue("You are widely reguarded as the best musician among the homeless in your city!")
    }
    else if (money >= 3500) {
        checkMoneyDialogue("You are now known by a few people as the 'Homeless Entreprenuer'")
    }
    else if (money >= 2000) {
        checkMoneyDialogue("You are known throughout the homeless community for your rapid gain of cash!")
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
    else if (money >= 8) {
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
    moneyLossPerDay <= 0 ? moneyLostPerDayLabel.style.color = 'green' : moneyLostPerDayLabel.style.color = 'red';
    moneyLostPerDayLabel.innerHTML = `$${Math.abs(moneyLossPerDay)}`;
    
    moneyLostPerDayLabel.style.animation = 'simpleFadeIn 1.5s';
    setTimeout(function() { moneyLostPerDayLabel.style.animationName = 'none'; }, 2000);
    money -= moneyLossPerDay;
    htmlMoney.innerHTML = (money).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
}   
function runRebirth() {
    rebirthButton.onclick = function() {
        if (rebirthButton.style.opacity == '1') {
            amountOfRebirths++;
            money = 0;
            htmlMoney.innerHTML = (money).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            });
            numOfUpgrades = 0;
            increaseValue = 0.1;
            incomeText.innerHTML = `Income: $${increaseValue}`;
            statementNum = 0;
            upgradeStack = [];
            moneyLossPerDay = 0;
            upgradeLossPerDay = 0;
            upgradeCheck();
            showUpgradeStack();
            dialogue.innerHTML = "You're broke on the streets of Downtown Palo Alto, California.";
            rebirthCheck();
        }
    }
}

function rebirthCheck() {
    if (money > 1000 * (amountOfRebirths + 1)) {
        rebirthButton.style.opacity = '1';
        runRebirth();
    }
    else {
        rebirthButton.style.opacity = '0.5';
    }
}

//This code here is to nerf the enter key
document.addEventListener("keydown", function(event) {
    if (event.keyCode == 13) {
        enterPressed = true;
    }
});