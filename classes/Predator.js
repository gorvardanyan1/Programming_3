class Predator {
    constructor(x, y, id) {
        this.x = x
        this.y = y
        this.id = id
        this.energy = 5
        this.getNewCoordinates()
        this.multiply = 4
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooselCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }

    mul() {
        var emptyCells = this.chooselCell(0);
        var newCell = random(emptyCells)

        if (this.energy > 12 && newCell) {
            var newX = newCell[0];
            var newY = newCell[1]

            var newPredator = new Predator(newX, newY, this.id)
            predatorArr.push(newPredator)

            matrix[newY][newX] = this.id;
        }
    }

    move() {
        var emptyCells = this.chooselCell(0);
        var newCell = random(emptyCells)

        if (this.energy > 0 && newCell) {
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = this.id
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            this.multiply--


            this.energy--

        }
        this.die();
    }

    eat() {
        var emptyCells = this.chooselCell(2);
        var emptyCellsBird = this.chooselCell(5)
        for (var i in emptyCellsBird) {
            emptyCells.push(emptyCellsBird[i])
        }
        var newCell = random(emptyCells)

        if (this.energy > 0 && newCell) {
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = this.id
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY

            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                    grassEaterArr.splice(i, 1)
                }
            }
            for (var i in birdArr) {
                if (birdArr[i].x == newX && birdArr[i].y == newY) {
                    birdArr.splice(i, 1)
                    break;
                }
            }
            this.energy++;
            this.mul();
        } else {
            this.move();
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 1
            var x = this.x
            var y = this.y
            var newGrass = new Grass(x, y, 1);
            grassArr.push(newGrass)

            for (var i in predatorArr) {
                if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}
