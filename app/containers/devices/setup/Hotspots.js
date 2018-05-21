import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {FlatList} from 'react-native'
import {
  ListItem,
  Icon,
  Body,
  Right,
  Text,
} from 'native-base'
import styles from '../../../styles'
import FadeIn from '../../../components/FadeIn'

class Hotspots extends Component {
  render () {
    const {hotspots, onSelect} = this.props

    const item = ({item}) => <ListItem
      onPress={e => onSelect(item, e)}
      style={{backgroundColor: 'transparent'}}
    >
      <Body>
        <Text>{item.ssid}</Text>
      </Body>
      <Right>
        {item.sec > 0 && <Icon name="lock" />}
      </Right>
    </ListItem>

    return (
      <FadeIn style={[styles.flexGrow, styles.flexShrink]}>
        <FlatList
          keyExtractor={(item, index) => index}
          data={hotspots}
          extraData={hotspots}
          renderItem={item}
        />
      </FadeIn>
    )
  }
}

Hotspots.propTypes = {
  style: PropTypes.any,
  hotspots: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
}

export default Hotspots
