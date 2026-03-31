const cell = document.querySelectorAll('.cell')
const statusText = document.getElementById('status')
const restartBtn = document.getElementById('restart')

let currentPlayer = 'X'
let board = ['', '', '', '', '', '', '', '', '']
let gameActive = true

const winConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
]

cell.forEach(cell => {
	cell.addEventListener('click', handleCellClick)
})

restartBtn.addEventListener('click', restartGame)

function handleCellClick(event) {
	const cell = event.target
	const index = cell.getAttribute('data-index')
	if (board[index] !== '' || !gameActive) {
		return
	}

	board[index] = currentPlayer
	cell.textContent = currentPlayer

	checkResult()
}

function checkResult() {
	let roundWon = false

	for (let i = 0; i < winConditions.length; i++) {
		const [a, b, c] = winConditions[i]

		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			roundWon = true
			break
		}
	}
	// Вообщем тут я решил чуть покакапаться в код и добавил задержку в 3 секунды перед перезапуском игры, чтобы игроки могли увидеть результат победы. Если раунд выигран, то отображается сообщение о победе текущего игрока, и игра становится неактивной. Если все клетки заполнены и нет победителя, то объявляется ничья. В противном случае, ход переходит к другому игроку, и отображается сообщение о том, чей ход сейчас.

	// офигеть x2 - коммент автоматом мой дополнился нейронкой, которая все мысли описала. Емаааа это имбуличка
	if (roundWon) {
		statusText.textContent = `Игрок ${currentPlayer} победил!`
		gameActive = false
		setTimeout(restartGame, 3000)
		return
	}

	if (!board.includes('')) {
		statusText.textContent = 'Ничья!'
		gameActive = false
		return
	}

	currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
	statusText.textContent = `Ход игрока: ${currentPlayer}`
}

function restartGame() {
	currentPlayer = 'X'
	board = ['', '', '', '', '', '', '', '', '']
	gameActive = true
	statusText.textContent = 'Ход игрока: X'

	cell.forEach(cell => {
		cell.textContent = ''
	})
}
