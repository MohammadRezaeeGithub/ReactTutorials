export default function GameBoard({ onSelectSquare, board }) {
  // const [gameBoard, setgameBoard] = useState(initialGameBoard);

  // const handleSelectSqure = (rowIndex, colIndex) => {
  //   setgameBoard((prevGameBoard) => {
  //     //when we want update our state, and it is an object or array: first we have to make a copy of our array and then change it
  //     const updatedGameBoard = [
  //       ...prevGameBoard.map((innerArray) => [...innerArray]),
  //     ];
  //     updatedGameBoard[rowIndex][colIndex] = activePlayerSybole;
  //     return updatedGameBoard;
  //   });

  //   onSelectSquare();
  // };
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((col, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => {
                    onSelectSquare(rowIndex, colIndex);
                  }}
                  disabled={col !== null}
                >
                  {col}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
