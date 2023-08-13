import styles from './cell.module.scss'
import {Cell} from '../../models/Cell.ts'
import {Colors} from '../../models/Colors.ts'

interface CellCProps {
    cell: Cell
    selected: boolean
    onClick: ( cell: Cell ) => void
}

const CellComponent = ( {cell, selected, onClick}: CellCProps ) => {
    const cellColor = cell.color === Colors.WHITE ? styles.white : styles.black
    const selectedColor = selected ? styles.selected : ''
    return (
        <div className={`${styles.cell} ${cellColor} ${selectedColor}`}
             onClick={() => onClick( cell )}
             style={{background: cell.available && cell.figure ? 'green' : ''}}
        >
            {cell.available && !cell.figure && <div className={styles.available}/>}
            {cell.figure?.logo && <img src={cell.figure.logo} alt="chessman"/>}
        </div>
    )
}

export {CellComponent}
