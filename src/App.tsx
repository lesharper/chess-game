import styles from './app.module.scss'
import { BoardComponent } from './components/Board/BoardComponent.tsx'
import { useEffect, useState } from 'react'
import { Board } from './models/Board.ts'
import { Player } from './models/Player.ts'
import { Colors } from './models/Colors.ts'
import { LostFigures } from './components/LostFigures/LostFigures.tsx'

const App = () => {
    const [board, setBoard] = useState(new Board())
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

    useEffect(() => {
        restart()
    }, [])


    const restart = () => {
        const newBoard = new Board()
        newBoard.initCells()
        newBoard.addFigures()
        setBoard(newBoard)
        setCurrentPlayer(whitePlayer)
    }

    const swapPlayer = () => {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }
    return (
        <div className={styles.container}>
            <LostFigures title="Белые фигуры" figures={board.lostWhiteFigures}/>
            <BoardComponent board={board} setBoard={setBoard} currentPlayer={currentPlayer} swapPlayer={swapPlayer}/>
            <LostFigures title="Черные фигуры" figures={board.lostBlackFigures}/>
        </div>
    )
}

export { App }
