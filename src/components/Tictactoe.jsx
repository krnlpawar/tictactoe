import React, { useEffect, useState } from "react";

export default function Tictactoe() {
	const [data, setData] = useState(Array(9).fill(null))
	const nextPlayer = data.filter(Boolean).length % 2 === 0 ? "X" : "O";
	const [winningTiles, setWinningTiles] = useState([]);

	const reset = () => {
		setData(Array(9).fill(null))
		setWinner(null)
		setWinningTiles([])
	}

	const handleTileClick = (index) => {
		if (winner) return;
		const newData = [...data];
		if (newData[index]) return;
		newData[index] = nextPlayer;
		setData(newData);
	}

	useEffect(() => {
		calculateWinner();
	}, [data])

	const calculateWinner = () => {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (
				data[a] &&
				data[a] === data[b] &&
				data[a] === data[c]
			) {
				setWinningTiles([a, b, c]);
				setWinner(data[a]);
				setTimeout(() => {
					reset()
				}, 2000)
				return;
			}
		}
	}

	const [winner, setWinner] = useState(null);
  return (
    <div className="game-container">
      <div className="game-board">
		{
			data.map((item, index) => {
				return (
					<div className={`cell ${winningTiles.includes(index) ? "winning-cell" : ""}`} key={index} onClick={(e) => handleTileClick(index)}>
						{data[index]}
					</div>
				)
			})
		}
      </div>
      <div className="game-controls">
        <button className="btn" id="new-game-btn" onClick={reset}>
          New Game
        </button>
        <button className="btn" id="reset-btn" onClick={reset}>
          Reset
        </button>
      </div>

	  {winner && (
		<div className="game-winner">
		  <span>{winner}</span>
		  <span> Wins!</span>
		</div>
	  )}
    </div>
  );
}
