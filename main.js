// Global Variable
let animationID;
let wheel;
let giftCode = [];
let lever;
let rotation = (10 * Math.PI / 180);
let friction = (Math.random() * (0.09 - 0.01) + 0.01) * (Math.PI / 180);
let totalRotation = 0;

// Game Area
let GameArea = {
    canvas: document.querySelector('#wheeloffortune'),
    start: function () {
        this.canvas.width = 800;
        this.canvas.height = 800;
        this.context = this.canvas.getContext('2d');
        this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        cancelAnimationFrame(animationID);
    }
}

// Class In Game
function Wheel() {
    this.x = - GameArea.canvas.width * 0.8 / 2;
    this.y = - GameArea.canvas.height * 0.8 / 2;
    this.width = GameArea.canvas.width * 0.8;
    this.height = GameArea.canvas.height * 0.8;
    this.spin = 0;

    this.draw = function () {
        let ctx = GameArea.context;
        let imageObj = new Image();
        imageObj.src = './image/spin-wheel.png';
        ctx.save();
        ctx.rotate(this.spin);
        ctx.drawImage(imageObj, this.x, this.y, this.width, this. height);
        ctx.restore();
    }
    this.update = function () {
        this.draw();
        this.spin += rotation;
    }
}
function GiftCode(index, text) {
    this.index = index;
    this.text = text;
    this.spin = 0;

    this.draw = function () {
        let ctx = GameArea.context;
        let angle = (index * 30 * Math.PI / 180) - (15 * Math.PI / 180) + this.spin;
        ctx.font = 0.03 * GameArea.canvas.width + "px Arial";
        ctx.textBaseline = 'middle';
        ctx.save();
        ctx.rotate(angle);
        ctx.fillText(this.text, 0.16 * GameArea.canvas.width, 0);
        ctx.restore();
    }
    this.update = function () {
        this.draw();
        this.spin += rotation;
    }
}
function Lever() {
    this.x = GameArea.canvas.width * 0.3;
    this.y = - GameArea.canvas.height * 0.075;
    this.width = GameArea.canvas.width * 0.15;
    this.height = GameArea.canvas.height * 0.15;
    this.spin = 0;

    this.draw = function () {
        let ctx = GameArea.context;
        let imageObj = new Image();
        imageObj.src = './image/location.png';
        ctx.drawImage(imageObj, this.x, this.y, this.width, this. height);
    }
}

// Start Game
function startGame() {
    GameArea.start();
    wheel = new Wheel();
    giftCode.push(new GiftCode(1, "Discount 01%"));
    giftCode.push(new GiftCode(2, "Discount 02%"));
    giftCode.push(new GiftCode(3, "Discount 03%"));
    giftCode.push(new GiftCode(4, "Discount 04%"));
    giftCode.push(new GiftCode(5, "Discount 05%"));
    giftCode.push(new GiftCode(6, "Discount 06%"));
    giftCode.push(new GiftCode(7, "Discount 07%"));
    giftCode.push(new GiftCode(8, "Discount 08%"));
    giftCode.push(new GiftCode(9, "Discount 09%"));
    giftCode.push(new GiftCode(10, "Discount 10%"));
    giftCode.push(new GiftCode(11, "Discount 11%"));
    giftCode.push(new GiftCode(12, "Discount 12%"));
    lever = new Lever();
    
    wheel.draw();
    for (let i = 0; i < giftCode.length; i++) {
        giftCode[i].draw();
    }
    lever.draw();
}
window.onload(startGame);

// Update Game
function updateGame() {
    animationID = requestAnimationFrame(updateGame);
    GameArea.clear();
    wheel.update();
    for (let i = 0; i < giftCode.length; i++) {
        giftCode[i].update();
    }
    lever.draw();
    totalRotation += rotation;
    if (rotation >= friction) {
        rotation -= friction;
    } else {
        rotation = 0;
        GameArea.stop();
    }
    console.log(checkGiftCode());
}

function checkGiftCode() {
    let giftCodeIndex =  Math.floor(((totalRotation * 180 / Math.PI) % 360) / 30);
    let result;
    switch (giftCodeIndex) {
        case 0:
            result = giftCode[11];
            break;
        case 1:
            result = giftCode[10];
            break;
        case 2:
            result = giftCode[9];
            break;
        case 3:
            result = giftCode[8];
            break;
        case 4:
            result = giftCode[7];
            break;
        case 5:
            result = giftCode[6];
            break;
        case 6:
            result = giftCode[5];
            break;
        case 7:
            result = giftCode[4];
            break;
        case 8:
            result = giftCode[3];
            break;
        case 9:
            result = giftCode[2];
            break;
        case 10:
            result = giftCode[1];
            break;
        case 11:
            result = giftCode[0];
            break;
    }
    return result.text;
}