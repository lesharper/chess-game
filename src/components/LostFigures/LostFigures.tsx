import styles from './lost_figures.module.scss'
import { Figure } from '../../models/figures/Figure.ts'

interface LostFiguresProps {
    title: string
    figures: Figure[]
}

const LostFigures = ({ title, figures }: LostFiguresProps) => {

    const figuresRender = figures.map(figure =>
        <div key={figure.id}>
            {figure.name} {figure.logo && <img src={figure.logo} alt="logo"/>}
        </div>)
    return (
        <div className={styles.lost}>
            <h3>{title}</h3>
            {figuresRender}
        </div>
    )
}

export { LostFigures }
