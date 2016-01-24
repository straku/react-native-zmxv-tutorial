import React, {
  Animated,
  Easing,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native'

import Dimensions from 'Dimensions'
import _ from 'lodash'

const {width, height} = Dimensions.get('window')

const SIZE = 4
const CELL_SIZE = Math.floor(width * 0.2)
const CELL_PADDING = Math.floor(CELL_SIZE * 0.05)
const BORDER_RADIUS = CELL_PADDING * 2
const TITLE_SIZE = CELL_SIZE - CELL_PADDING * 2
const LETTER_SIZE = Math.floor(TITLE_SIZE * 0.75)

export default class BoardView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tilt: _.range(SIZE * SIZE).map(item => new Animated.Value(0))
    }
  }

  render () {
    return <View style={styles.container}>
      {this.renderTiles()}
    </View>
  }

  clickTile (id) {
    const tilt = this.state.tilt[id]
    tilt.setValue(1)  // -30 degrees
    Animated.timing(tilt, {
      toValue: 0, // 0 degrees
      duration: 250, // [ms]
      easing: Easing.quad // quadratic easing function: (t) => t * t
    }).start()
  }

  renderTiles () {
    return _.range(SIZE).map(row => {
      return _.range(SIZE).map(col => {
        const id = row * SIZE + col
        const letter = String.fromCharCode(65 + id)
        const tilt = this.state.tilt[id].interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '-30deg']
        })
        const style = {
          left: col * CELL_SIZE + CELL_PADDING,
          top: row * CELL_SIZE + CELL_PADDING,
          transform: [
            {perspective: CELL_SIZE * 8},
            {rotateX: tilt}
          ]
        }
        return this.renderTile(id, style, letter)
      })
    })
  }

  renderTile (id, position, letter) {
    return <Animated.View
      key={id}
      style={[styles.title, position]}
      onStartShouldSetResponder={() => this.clickTile(id)}
    >
      <Text style={styles.letter}>{letter}</Text>
    </Animated.View>
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
