function getIndexOfId(arr, id) {
  for (var y = 0; y > arr.length; y++) {
    const x = arr[y].indexOf(id);
    if (x > -1) {
      return [y, x];
    }
  }
}

var selectedTileOld = "";
var selectedTile = "";
var emptyTile = "";

function select() {
  const arrIndex = getIndexOfId(tileArr, this.id);
  this.style.color = "red";
  console.log(this.id);
  selectedTile = this.id;

  //deselect old
  if (selectedTileOld != "") {
    document.getElementById(selectedTileOld).style.color = "black";
    selectedTileOld = this.id;
  } else {
    selectedTileOld = this.id;
  }
}

function selectEmpty() {
  //To-Do: Valid move? Than clear other selected fields and move tiles and set empty tile
}

//make an empty 3x3 array
var tileArr = new Array(3);
for (var i = 0; i < tileArr.length; i++) {
  tileArr[i] = new Array(3);
}

//fill the array with tile objects
//put them on the right position
//add event listeners
var tileNumber = 0;
for (var i = 0; i < tileArr.length; i++) {
  for (var j = 0; j < tileArr.length; j++) {
    tileNumber++;
    if (tileNumber != 9) {
      const id = "tile" + tileNumber;
      const positionX = j * 100;
      const positionY = i * 100;
      tileArr[i][j] = id;

      const tileElement = document.getElementById(id);

      tileElement.style.transform =
        "translate(" + positionX + "px," + positionY + "px)";

      tileElement.addEventListener("click", select);

      //   console.log(tileArr[i][j], i, j);
    } else {
      tileArr[i][j] = "empty";

      tileElement.addEventListener("click", selectEmpty);

      //   console.log(tileArr[i][j], i, j);
    }
  }
}

console.log(tileArr);
