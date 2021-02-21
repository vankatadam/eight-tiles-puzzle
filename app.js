//make an empty 3x3 array
var tileArr = new Array(3);
for (var i = 0; i < tileArr.length; i++) {
  tileArr[i] = new Array(3);
}

//To-Do: Shuffle the tiles in random

//fill the array with tile objects
//put them on the right position
//add event listeners
var tileNumber = 0;
for (var i = 0; i < tileArr.length; i++) {
  for (var j = 0; j < tileArr.length; j++) {
    tileNumber++;
    const positionX = j * 100;
    const positionY = i * 100;
    //for tiles
    if (tileNumber != 9) {
      const id = "tile" + tileNumber;

      tileArr[i][j] = id;

      const tileElement = document.getElementById(id);

      tileElement.style.transform =
        "translate(" + positionX + "px," + positionY + "px)";

      tileElement.addEventListener("click", select);

      //   console.log(tileArr[i][j], i, j);
      //for empty space
    } else {
      tileArr[i][j] = "empty";
      const emptyTile = document.getElementById("empty");
      emptyTile.style.transform =
        "translate(" + positionX + "px," + positionY + "px)";
      emptyTile.addEventListener("click", selectEmpty);

      //   console.log(tileArr[i][j], i, j);
    }
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
    console.log(this.id);
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
    console.log(this.id);

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
  }
}

console.log(tileArr);

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
