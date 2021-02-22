//make an empty 3x3 array
var tileArr = new Array(3);
for (var i = 0; i < tileArr.length; i++) {
  tileArr[i] = new Array(3);
}

//To-Do: Shuffle the tiles in random
const winCondition = [
  ["tile1", "tile2", "tile3"],
  ["tile4", "tile5", "tile6"],
  ["tile7", "tile8", "empty"],
];

//fill the array with tile objects
//put them on the right position
//add event listeners
var tileArrShuffled = [
  "tile1",
  "tile2",
  "tile3",
  "tile4",
  "tile5",
  "tile6",
  "tile7",
  "tile8",
  "empty",
];
const tmp = [...tileArrShuffled];
shuffle(tileArrShuffled);

var tileNumber = 0;
for (var i = 0; i < tileArr.length; i++) {
  for (var j = 0; j < tileArr.length; j++) {
    tileNumber++;
    const positionX = j * 100;
    const positionY = i * 100;

    // const id = tileArrShuffled[tileNumber - 1];
    const id = tmp[tileNumber - 1];

    tileArr[i][j] = id;
    const tileElement = document.getElementById(id);

    if (id === "empty") {
      tileElement.addEventListener("click", selectEmpty);
    } else {
      tileElement.addEventListener("click", select);
    }

    tileElement.style.transform =
      "translate(" + positionX + "px," + positionY + "px)";
  }
}

//vars for selecting and moving tiles
var selectedTileOldId = "";
var selectedTileId = "";
var selectedTileIndex = [];
var emptyTileIndex = getIndexOfId(tileArr, "empty");

/**
 * Triggers after selecting a tile to refresh the selected vars
 * (this refers to the <div> HTML Element)
 */
function select() {
  const selectedTileIndexTmp = getIndexOfId(tileArr, this.id);
  //Game Rules in this if statement: can only select neighbour tile to an empty tile
  if (
    (selectedTileIndexTmp[0] + 1 === emptyTileIndex[0] &&
      selectedTileIndexTmp[1] == emptyTileIndex[1]) ||
    (selectedTileIndexTmp[0] - 1 === emptyTileIndex[0] &&
      selectedTileIndexTmp[1] == emptyTileIndex[1]) ||
    (selectedTileIndexTmp[1] + 1 === emptyTileIndex[1] &&
      selectedTileIndexTmp[0] == emptyTileIndex[0]) ||
    (selectedTileIndexTmp[1] - 1 === emptyTileIndex[1] &&
      selectedTileIndexTmp[0] == emptyTileIndex[0])
  ) {
    selectedTileIndex = getIndexOfId(tileArr, this.id);
    this.style.color = "red";
    selectedTileId = this.id;

    //deselect old
    if (selectedTileOldId != "") {
      document.getElementById(selectedTileOldId).style.color = "black";
      selectedTileOldId = this.id;
    } else {
      selectedTileOldId = this.id;
    }
  }
}

/**
 * Triggers after selecting an empty space, checking if a move is valid and if valid, than moving the tile (this refers to the <div> HTML Element)
 */
function selectEmpty() {
  if (selectedTileId !== "") {
    //swap positions (transform props), change array positions, null selecting variables
    emptyTileIndex = getIndexOfId(tileArr, this.id);

    const emptyTransform = document.getElementById(this.id).style.transform;
    const tileTransform = document.getElementById(selectedTileId).style
      .transform;

    //To-Do: make the transform as an animation
    document.getElementById(this.id).style.transform = tileTransform;
    document.getElementById(selectedTileId).style.transform = emptyTransform;

    tileArr[emptyTileIndex[0]][emptyTileIndex[1]] = selectedTileId;
    tileArr[selectedTileIndex[0]][selectedTileIndex[1]] = this.id;

    emptyTileIndex = getIndexOfId(tileArr, this.id);
    selectedTileIndex = getIndexOfId(tileArr, selectedTileId);

    //To-Do: Check win Condition
    if (JSON.stringify(tileArr) === JSON.stringify(winCondition)) {
      document.getElementById("modal").style.display = "flex";
      console.log("WOOON");
    }
  }
}

/**
 * Searches for an specific id in two dimenstional array
 */
function getIndexOfId(arr, id) {
  for (var y = 0; y < arr.length; y++) {
    const x = arr[y].indexOf(id);
    if (x > -1) {
      return [y, x];
    }
  }
}

/**
 * Shuffles array in place
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
