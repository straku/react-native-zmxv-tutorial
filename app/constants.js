import Dimensions from 'Dimensions'

export const {width, height} = Dimensions.get('window')

export const SIZE = 4
export const CELL_SIZE = Math.floor(width * 0.2)
export const CELL_PADDING = Math.floor(CELL_SIZE * 0.05)
export const BORDER_RADIUS = CELL_PADDING * 2
export const TILE_SIZE = CELL_SIZE - CELL_PADDING * 2
export const LETTER_SIZE = Math.floor(TILE_SIZE * 0.75)
