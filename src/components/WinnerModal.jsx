import { Square } from './Square'

export function WinnerModal ( { winner, handleButton }) {
    if (winner === null) return null

    const texth2 = winner === false ? "Empate!" : "Ganó:"

    return(
        <section className="winner">
          <div className="text">
            <h2>{texth2}</h2>

            <header className="win">
              {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button onClick={handleButton}>Volver a jugar</button>
            </footer>
          </div>
        </section>
    )
}