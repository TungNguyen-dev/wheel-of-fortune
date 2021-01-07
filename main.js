// Global Variable
let animationID;
let frameNo = 0;
let wheel;
let lever;
let giftCode = [];
let rotation = 10 * Math.PI / 180;
let totalRotation = 0;
let friction = (Math.random() * (0.1 - 0.05) + 0.05) * Math.PI / 180;

// Class In Game
function Wheel(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rotationSpeed = 0;

    this.draw = function () {
        let ctx = GameArea.context;
        let angle = this.rotationSpeed;
        let imageObj = new Image();
        imageObj.src = './image/spin-wheel.png';

        ctx.save();
        ctx.translate(GameArea.canvas.width / 2, GameArea.canvas.height / 2);
        ctx.rotate(angle);
        ctx.drawImage(imageObj, - this.width / 2, - this.height / 2, width, height);
        ctx.restore();
    }
    this.update = function () {
        this.draw();
        this.rotationSpeed += rotation;
    }
}

function Lever(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.draw = function () {
        let ctx = GameArea.context;
        let imageObj = new Image();
        imageObj.src = './image/location.png';
        ctx.drawImage(imageObj, this.x, this.y, this.width, this.height);
    }
}

function Giftcode(index, text) {
    this.index = index;
    this.text = text;
    this.rotationSpeed = 0;

    this.draw = function () {
        let ctx = GameArea.context;
        let angle = this.rotationSpeed + (index * 30 * Math.PI / 180) - (15 * Math.PI / 180);
        ctx.font = "14px Arial";
        ctx.textBaseline = "middle";

        ctx.save();
        ctx.translate(GameArea.canvas.width / 2, GameArea.canvas.height / 2);
        ctx.rotate(angle);
        ctx.fillText(this.text, 80, 0);
        ctx.restore();
    }
    this.update = function () {
        this.draw();
        this.rotationSpeed += rotation;
    }
}
    
// Game Area
let GameArea = {
    canvas: document.createElement('canvas'),
    start: function () {
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.canvas.style.backgroundImage = 'url(./image/background.png)';
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        cancelAnimationFrame(animationID);
    }
}

// Start Game
function startGame() {
    GameArea.start();
    wheel = new Wheel(50, 50, 400, 400);
    lever = new Lever(GameArea.canvas.width - 100, GameArea.canvas.height/2 - 50, 100, 100);
    giftCode.push(new Giftcode(1, "Discount 01%"));
    giftCode.push(new Giftcode(2, "Discount 02%"));
    giftCode.push(new Giftcode(3, "Discount 03%"));
    giftCode.push(new Giftcode(4, "Discount 04%"));
    giftCode.push(new Giftcode(5, "Discount 05%"));
    giftCode.push(new Giftcode(6, "Discount 06%"));
    giftCode.push(new Giftcode(7, "Discount 07%"));
    giftCode.push(new Giftcode(8, "Discount 08%"));
    giftCode.push(new Giftcode(9, "Discount 09%"));
    giftCode.push(new Giftcode(10, "Discount 10%"));
    giftCode.push(new Giftcode(11, "Discount 11%"));
    giftCode.push(new Giftcode(12, "Discount 12%"));
    wheel.draw();
    for (let i = 0; i < 12; i++) {
        giftCode[i].draw();
    }
    lever.draw();
}

// Update Game
function updateGame() {
    animationID = requestAnimationFrame(updateGame);
    frameNo++;
    GameArea.clear();
    wheel.update();
    for (let i = 0; i < 12; i++) {
        giftCode[i].update();
    }
    lever.draw();
    totalRotation += rotation;
    if (rotation >= friction) {
        rotation -= friction;
    } else {
        rotation = 0;
    }

    checkGift();
    if (rotation == 0) {
        GameArea.stop();
    }
}
function checkGift() {
    let giftCodeIndex = Math.floor(((totalRotation * 180 / Math.PI) % 360) / 30) + 1;
    let win;
    switch (giftCodeIndex) {
        case 1:
            win = giftCode[11];
            break;
        case 2:
            win = giftCode[10];
            break;
        case 3:
            win = giftCode[9];
            break;
        case 4:
            win = giftCode[8];
            break;
        case 5:
            win = giftCode[7];
            break;
        case 6:
            win = giftCode[6];
            break;
        case 7:
            win = giftCode[5];
            break;
        case 8:
            win = giftCode[4];
            break;
        case 9:
            win = giftCode[3];
            break;
        case 10:
            win = giftCode[2];
            break;
        case 11:
            win = giftCode[1];
            break;
        case 12:
            win = giftCode[0];
            break;
    }
    console.log(win.text);
}

window.onload(startGame);