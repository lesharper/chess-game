import styles from './board.module.scss'
import { Board } from '../../models/Board.ts'
import { CellComponent } from '../Cell/CellComponent.tsx'
import React, { useEffect, useState } from 'react'
import { Cell } from '../../models/Cell.ts'
import { Player } from '../../models/Player.ts'

interface BoardCProps {
    board: Board
    setBoard: (board: Board) => void
    currentPlayer: Player | null
    swapPlayer: () => void
}

const BoardComponent = ({ board, setBoard, currentPlayer, swapPlayer }: BoardCProps) => {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

    useEffect(() => {
        highlightCells()
    }, [selectedCell])

    const handleClick = (cell: Cell) => {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell)
            swapPlayer()
            setSelectedCell(null)
            updateBoard()
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell)
            }
        }
    }

    const highlightCells = () => {
        board.highlightCells(selectedCell)
        updateBoard()
    }

    const updateBoard = () => {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }
    return (
        <div>
            <h3 className={styles.title}>{currentPlayer?.color} step</h3>
            <div className={styles.board}>
                {board.cells.map((row, index) =>
                    <React.Fragment key={index}>
                        {row.map(cell =>
                            <CellComponent
                                onClick={handleClick}
                                cell={cell}
                                key={cell.id}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            />,
                        )}
                    </React.Fragment>,
                )}
            </div>
        </div>

    )
}

export { BoardComponent }
