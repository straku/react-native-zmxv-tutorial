import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native'

import BoardView from './boardview'

class AlphaReflex extends Component {
  render() {
    return <View style={styles.container}>
      <BoardView/>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#644B62'
  }
})

export default AlphaReflex
