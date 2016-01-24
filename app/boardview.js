import React, {
  Animated,
  Easing,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native'

import _ from 'lodash'

import {
  SIZE,
  CELL_SIZE,
  CELL_PADDING
} from './constants'

import Tile from './tile'

export default class BoardView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tilt: _.range(SIZE * SIZE).map(item => new Animated.Value(0))
    }
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

  render () {
    return <View style={styles.container}>
      {this.renderTiles()}
    </View>
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
        return <Tile
          id={id}
          customStyle={style}
          onClick={this.clickTile.bind(this)}
        >
          {letter}
        </Tile>
      })
    })
  }
}

const styles = StyleSheet.create({
  container: {
    width: CELL_SIZE * SIZE,
    height: CELL_SIZE * SIZE,
    backgroundColor: 'transparent'
  }
})
