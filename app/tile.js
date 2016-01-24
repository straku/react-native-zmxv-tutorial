import React, {
  Component,
  PropTypes,
  Animated,
  StyleSheet,
  Text
} from 'react-native'

import {
  TILE_SIZE,
  BORDER_RADIUS,
  LETTER_SIZE
} from './constants'

class Tile extends Component {
  render () {
    const {id, customStyle, children, onClick} = this.props
    return <Animated.View
      key={id}
      style={[styles.tile, customStyle]}
      onStartShouldSetResponder={() => onClick(id)}
    >
      <Text style={styles.letter}>{children}</Text>
    </Animated.View>
  }
}

const styles = StyleSheet.create({
  tile: {
    position: 'absolute',
    width: TILE_SIZE,
    height: TILE_SIZE,
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

Tile.propTypes = {
  id: PropTypes.number,
  customStyle: PropTypes.object,
  children: PropTypes.string,
  onClick: PropTypes.func
}

export default Tile
