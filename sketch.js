let coords=[[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]];
let third;

// white and black have coords, e.g. 0, 0 is top left
let white=[[0, 2], [1, 2], [2, 2]];
let black=[[0, 0], [1, 0], [2, 0]];

let bPawn, wPawn;

// highlighted square (for moves) multiplied by third
let brit=[null, null];

let state=0; // 0 is before moving piece, 1 is before location

function preload() {
    bPawn=loadImage('assets/black.png');
    wPawn=loadImage('assets/white.png');
}

function setup() {
    createCanvas(400, 400);
    third=width/3;
}

function draw() {
    background('#dfa694');

    // squares
    fill('#aa5a47');
    noStroke();
    for (let i=0; i<coords.length; i++) {
        let coord=coords[i];
        square(coord[0]*third, coord[1]*third, third);
    }

    // highlighted square
    let coord=findSquare(mouseX, mouseY);
    fill(0, 255, 0, 30);
    square(coord[0], coord[1], third);

    if (state=='1') {
        fill(0, 255, 0, 50);
        square((brit[0] ?? width), (brit[1] ?? height), third);
    }

    // pawns
    for (let i=0; i<white.length; i++) {
        let coord=white[i];
        image(wPawn, coord[0]*third, coord[1]*third-5, third, third);
    }

    for (let i=0; i<black.length; i++) {
        let coord=black[i];
        image(bPawn, coord[0]*third, coord[1]*third-5, third, third);
    }
}

function mousePressed() {
    let wouldBBrit=findSquare(mouseX, mouseY);
    if (!(state==0 && whichPiece([wouldBBrit[0]/third, wouldBBrit[1]/third])==null)) {
        brit=wouldBBrit;
        state=(state+1)%2;
    }
}

// Takes in x pos, y pos, returns box- e.g. [0, 0]*third
function findSquare(x, y) {
    let newX, newY;
    newX=(newX!=width) ? floor(x*3/width) : 2;
    newY=(newY!=height) ? floor(y*3/height) : 2;
    return [newX*third, newY*third];
}

// coords- e.g. [0, 0]
function whichPiece(coords) {
    for (let i=0; i<white.length; i++) {
        if (isSame(coords, white[i])) {
            return `white${i}`;
        }
    }
    for (let i=0; i<black.length; i++) {
        if (isSame(coords, black[i])) {
            return `black${i}`;
        }
    }
    // automatically returns null if empty square
}

// for lists. peak silliness. come on, javascript.
// assuming both lists are the same length
function isSame(list1, list2) {
    for (let i=0; i<list1.length; i++) {
        if (list1[i]!=list2[i]) {
            return false;
        }
    }
    return true;
}