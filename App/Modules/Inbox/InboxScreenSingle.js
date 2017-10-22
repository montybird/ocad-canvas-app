import _ from 'lodash'
import React from 'react'
import Icon from 'react-native-vector-icons/Octicons'
import { stringify } from 'qs'
import { TouchableHighlight, Linking, ScrollView, View, Text } from 'react-native'
import { ListItem } from 'react-native-elements'
import moment from 'moment'
import API from '../../Services/Api'
import styles from './InboxScreenStyles'
import ScreenLadda from '../../Components/ScreenLadda'
import { Colors } from '../../Common/index'
import { IconsMap } from '../../Common/Icons'

import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'

export default class CoursesScreenSingle extends React.Component {
  static navigatorStyle = {
    ...navigatorStyle,
    navBarHideOnScroll: false,
    statusBarHideWithNavBar: false,
    tabBarHidden: true,
    navBarSubtitleFontSize: 11,
    navBarSubtitleColor: '#b0b0b0'
  }
  api = {}

  constructor (props) {
    super(props)
    this.state = {
      messages: {},
      loading: true
    }
    this.props.navigator.setStyle({
      navBarSubtitleFontSize: 11,
      navBarSubtitleColor: '#b0b0b0'
    })
    this.api = API.create()
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    this._renderNavComponents()
  }

  _renderNavComponents () {
    this.props.navigator.setButtons({
      rightButtons: [
        {
          title: 'Reply',
          id: 'reply',
          disabled: false,
          disableIconTint: false,
          showAsAction: 'ifRoom',
          icon: IconsMap['reply']
        }
      ]
    })
  }

  onNavigatorEvent (event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'reply') {
        this.props.navigator.showModal({
          screen: 'SingleConversationReply',
          title: 'Reply',
          passProps: { id: this.props.id }
        })
      }
    }
  }

  componentDidMount () {
    const queryParams = stringify({ conversation: { 'workflow_state': 'read' } }, { arrayFormat: 'brackets' })
    this.api.getUserConversationSingle(this.props.id)
      .then((response) => {
        this.setState({
          messages: response.data,
          loading: false
        })
      }).catch((e) => {
        console.log(e)
      })
    if (this.state.messages.workflow_state === 'unread') {
      this.api.editUserConversationSingle(this.props.id, queryParams)
    }
  }

  _showIcon = (type) => {
    switch (type) {
      case 'pdf':
        return (<Icon type='octicons' name='file-pdf' size={20} />)
      case 'image':
        return (<Icon type='octicons' name='file-media' size={20} />)
      case 'doc':
        return (<Icon type='octicons' name='file-text' size={20} />)
      default:
        return (<Icon type='octicons' name='file' size={20} />)
    }
  }

  _formatDate = (date) => {
    return moment.utc(date).fromNow()
  }

  _getConversationParticipants = (members) => {
    this.props.navigator.push({
      screen: 'SingleConversationViewListParticipants',
      passProps: {
        members
      }
    })
  }

  _showCourseName = (name) => {
    return _.truncate(name, { length: 30, seperator: '...' })
  }

  convertFromByte = (byte, decimals) => {
    if (byte > 0) {
      const k = 1024
      const dm = decimals || 2
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(byte) / Math.log(k))
      return parseFloat((byte / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    }
    return byte === 0 ? '0 Bytes' : null
  }

  _openAttachment = (url) => {
    Linking.openURL(url)
  }

  render () {
    if (this.state.loading) {
      return (
        <ScreenLadda text={'Getting conversation'} />
      )
    }
    return (
      <ScrollView>
        <View style={styles.seeAll}>
          <ListItem
            // title={this._showCourseName(this.state.messages.context_name)}
            title='See all in conversation'
            containerStyle={{ borderBottomWidth: 0.5, borderBottomColor: '#2C333F20' }}
            badge={{value: this.state.messages.participants.length, textStyle: styles.messageCountText, containerStyle: styles.messageCount}}
            onPress={() => this._getConversationParticipants(this.state.messages.participants)}
          />
        </View>
        <View>
          {this.state.messages.messages.map((messages, index) => (
            <View key={index}>
              <ListItem
                roundAvatar
                hideChevron
                avatar={{uri: _.find(this.state.messages.participants, ['id', messages.author_id]).avatar_url}}
                key={messages.id}
                title={_.find(this.state.messages.participants, ['id', messages.author_id]).name}
                rightTitle={this._formatDate(messages.created_at)}
                containerStyle={[styles.noBorderContainer, styles.authorContainer]}
              />
              <View style={_.isEqual(index, 0)
                ? [styles.messageContainer, styles.fullMessageText, styles.marginBottom]
                : [styles.messageContainer, styles.fullMessageText, styles.noMarginBottom, styles.conversationThread]}>
                <View style={styles.messageContentContainer}>
                  <View style={styles.messageTextContainer}>
                    <View>
                      {
                        this.state.messages.subject !== '' && this.state.messages.subject !== null
                        ? <Text style={styles.fullMessageTitle}>{this.state.messages.subject}</Text>
                        : <Text style={styles.fullMessageTitle}>No Subject</Text>
                      }
                    </View>
                    <Text key={messages.id}>
                      {messages.body}
                    </Text>
                    <View style={messages.attachments.length ? { marginTop: 15 } : { marginTop: 0 }}>
                      {
                        messages.attachments.length > 0 &&
                        messages.attachments.map((attachments, index) => (
                          <View style={{ marginTop: 5 }} key={attachments.id}>
                            {index === 0 &&
                            <View key={messages.attachments.length}>
                              <Text style={{ marginBottom: 5, fontWeight: '600' }}>Attachments ({messages.attachments.length})</Text>
                            </View>}
                            <TouchableHighlight onPress={() => this._openAttachment(attachments.url)} key={attachments.id} underlayColor={Colors.transparent}>
                              <View style={styles.attachmentContainer} key={attachments.id}>
                                <View style={styles.attachmentIcon}>{this._showIcon(attachments.mime_class)}</View>
                                <View style={styles.attachmentNameSizeContainer}>
                                  <Text style={styles.attachmentName}>{attachments.display_name}</Text>
                                  <Text style={styles.attachmentSize}>
                                    ({attachments.size !== null ? this.convertFromByte(attachments.size) : 'Unknown Size'})
                                  </Text>
                                </View>
                              </View>
                            </TouchableHighlight>
                          </View>
                        ))
                      }
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    )
  }
}
