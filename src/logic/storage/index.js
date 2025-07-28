export const saveGametoStorage = ({ board, turn }) => {
  window.localStorage.setItem('board', JSON.stringify(board))
  window.localStorage.setItem('turn', turn)
}

export const resetGameStorage = () => {
  const board = window.localStorage.removeItem('board')
  const turn = window.localStorage.removeItem('turn')
}