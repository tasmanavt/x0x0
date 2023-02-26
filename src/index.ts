import * as Phaser from "phaser";

class TicTacToe extends Phaser.Scene {
  private board: number[][] = [];
  private playerTurn!: number;

  constructor() {
    super({ key: "ticTacToe" });
  }

  create() {
    // Создаем игровое поле
    this.board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    this.playerTurn = 1;

    const graphics = this.add.graphics();
    graphics.lineStyle(2, 0xffffff);
    graphics.strokeRect(100, 100, 300, 300);

    // Добавляем обработчики кликов
    this.input.on("pointerdown", (pointer: { x: number; y: number }) => {
      if (
        pointer.x > 100 &&
        pointer.x < 400 &&
        pointer.y > 100 &&
        pointer.y < 400
      ) {
        const row = Math.floor((pointer.y - 100) / 100);
        const col = Math.floor((pointer.x - 100) / 100);
        if (this.board[row][col] === 0) {
          this.board[row][col] = this.playerTurn;
          this.add.text(
            125 + col * 100,
            125 + row * 100,
            this.playerTurn === 1 ? "X" : "O",
            { font: "96px Arial", color: "#ffffff" }
          );
          this.playerTurn = this.playerTurn === 1 ? 2 : 1;
          this.checkForWinner();
        }
      }
    });
  }

  private checkForWinner() {
    // Проверяем, есть ли победитель
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i][0] !== 0 &&
        this.board[i][0] === this.board[i][1] &&
        this.board[i][1] === this.board[i][2]
      ) {
        this.showWinner(this.board[i][0]);
        return;
      }
      if (
        this.board[0][i] !== 0 &&
        this.board[0][i] === this.board[1][i] &&
        this.board[1][i] === this.board[2][i]
      ) {
        this.showWinner(this.board[0][i]);
        return;
      }
    }
    if (
      this.board[0][0] !== 0 &&
      this.board[0][0] === this.board[1][1] &&
      this.board[1][1] === this.board[2][2]
    ) {
      this.showWinner(this.board[0][0]);
      return;
    }
    if (
      this.board[0][2] !== 0 &&
      this.board[0][2] === this.board[1][1] &&
      this.board[1][1] === this.board[2][0]
    ) {
      this.showWinner(this.board[0][2]);
      return;
    }
    if (this.isBoardFull()) {
      this.showWinner(0);
      return;
    }
  }

  private isBoardFull(): boolean {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (this.board[row][col] === 0) {
          return false;
        }
      }
    }
    return true;
  }

  private showWinner(player: number) {
    let message: string;
    if (player === 0) {
      message = "Ничья!";
    } else {
      message = "Игрок ${player} победил!";
    }
    this.add.text(250, 450, message, { font: "48px Arial", color: "#ffffff" });
  }
}

// Создаем экземпляр игры
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 500,
  height: 600,
  scene: TicTacToe,
};

const game = new Phaser.Game(config);
