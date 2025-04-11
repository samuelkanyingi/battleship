const Dom = (() => {
    const renderBoard = (board, container, isEnemy = false) => {
        container.innerHTML = '';
        const grid = board.getGrid();
        grid.forEach((row, x) => {
            row.forEach((cell, y) => {
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('cell');
                cellDiv.dataset.x = x;
                cellDiv.dataset.y = y;

                if (cell) {
                    // if the cell has a ship and has been hit
                    if (cell.ship && cell.ship.isHit) {
                        cellDiv.classList.add('hit');
                    }
                    // if the cell has been hit but no ship
                    else if (cell.isHit) {
                        cellDiv.classList.add('miss');
                    }
                    // if the cell has a ship and it's not an enemy board
                    else if (cell.ship && !isEnemy) {
                        cellDiv.classList.add('ship');
                    }
                }
                container.appendChild(cellDiv);
            });
        });
    };

    const bindEnemyBoard = (callback) => {
        const container = document.querySelector('#computer-board');
        container.addEventListener('click', (e) => {
            const cell = e.target;
            const x = parseInt(cell.dataset.x);
            const y = parseInt(cell.dataset.y);

            if (!Number.isInteger(x) || !Number.isInteger(y)) return;
            callback(x, y);
        });
    };

    return { renderBoard, bindEnemyBoard };
})();
export default Dom;
