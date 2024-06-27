new Vue({
    el: '#app',
    data: {
        cells: ['', '', '', '', '', '', '', '', ''],
        currentPlayer: 'X',
        player1Name: '',
        player2Name: '',
        gameStarted: false,
        winner: '',
        isDraw: false
    },
    computed: {
        currentPlayerName() {
            return this.currentPlayer === 'X' ? this.player1Name : this.player2Name;
        }
    },
    methods: {
        startOrResetGame() {
            this.cells = ['', '', '', '', '', '', '', '', ''];
            this.currentPlayer = 'X';
            this.gameStarted = false;
            this.winner = '';
            this.isDraw = false;
            
            if (this.player1Name && this.player2Name) {
                this.gameStarted = true;
            }
        },
        clickCell(index) {
            if (!this.gameStarted || this.cells[index] !== '' || this.winner || this.isDraw) {
                return;
            }
            this.$set(this.cells, index, this.currentPlayer);
            if (this.checkWinner()) {
                this.winner = this.currentPlayerName;
                this.gameStarted = false;
            } else if (this.checkDraw()) {
                this.isDraw = true;
                this.gameStarted = false;
            } else {
                this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            }
        },
        checkWinner() {
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            return winningCombinations.some(combination => {
                const [a, b, c] = combination;
                return this.cells[a] && this.cells[a] === this.cells[b] && this.cells[a] === this.cells[c];
            });
        },
        checkDraw() {
            return this.cells.every(cell => cell !== '');
        }
    }
});
