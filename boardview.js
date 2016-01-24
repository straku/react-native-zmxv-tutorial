import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native'

import Dimensions from 'Dimensions'

const {width, height} = Dimensions.get('window')

const SIZE = 4
const CELL_SIZE = Math.floor(width * 0.2)
const CELL_PADDING = Math.floor(CELL_SIZE * 0.05)
const BORDER_RADIUS = CELL_PADDING * 2
const TITLE_SIZE = CELL_SIZE - CELL_PADDING * 2
const LETTER_SIZE = Math.floor(TITLE_SIZE * 0.75)

export default class BoardView extends Component {
  render () {
    return <View style={styles.container}>
      {this.renderTiles()}
    </View>
  }

  renderTiles () {
    const result = []
    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
        const key = row * SIZE + col;
        const letter = String.fromCharCode(65 + key)
        const position = {
          left: col * CELL_SIZE + CELL_PADDING,
          top: row * CELL_SIZE + CELL_PADDING
        }
        result.push(
          <View key={key} style={[styles.title, position]}>
            <Text style={styles.letter}>{letter}</Text>
          </View>
        )
      }
    }
    return result
  }
}

const styles = StyleSheet.create({
  container: {
    width: CELL_SIZE * SIZE,
    height: CELL_SIZE * SIZE,
    backgroundColor: 'transparent'
  },
  title: {
    position: 'absolute',
    width: TITLE_SIZE,
    height: TITLE_SIZE,
    borderRadius: BORDER_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BEE1D2'
  },
  letter: {
    color: '#333',
    fontSize: LETTER_SIZE,
    fontFamily: 'Roboto',
    backgroundColor: 'transparent'
  }
})
