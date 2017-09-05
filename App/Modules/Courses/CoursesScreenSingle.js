import _ from 'lodash'
import React from 'react'
import { ListItem } from 'react-native-elements'
import { TouchableOpacity, FlatList, ScrollView, Text, Dimensions } from 'react-native'
import API from '../../Services/Api'
import { styles } from './CourseScreenStyles'
import moment from 'moment'
import ScreenLadda from '../../Components/ScreenLadda'

import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'
const { width } = Dimensions.get('window')

export default class CoursesScreenSingle extends React.PureComponent {
  static navigatorStyle = {
    ...navigatorStyle,
    navBarHideOnScroll: false,
    statusBarHideWithNavBar: false
  }
  api = {}

  constructor (props) {
    super(props)
    this.props.navigator.setTitle({
      title: this.props.shortName
    })
    this.state = {
      loading: true,
      courseActivity: [],
      courseActivitySummary: []
    }
    this.api = API.create()
  }

  componentDidMount () {
    this._getCourseActivity()
  }

  _getCourseActivity = () => {
    this.api.getCourseActivity(this.props.id)
      .then((response) => {
        this.setState({ courseActivity: _.reject(response.data, { title: null, message: null }), loading: false })
      })
    this.api.getCourseActivitySummary(this.props.id)
      .then((response) => {
        this.setState({ courseActivitySummary: response.data })
      })
  }

  _formatDate = (date) => {
    return moment.utc(date).fromNow()
  }

  _formatCourseName = (fullName) => {
    return fullName.replace(`, ${this.props.fullName}`, '').replace(`: ${this.props.fullName}`, '')
  }

  _activityFull = (item) => {
    this.props.navigator.showLightBox({
      screen: 'CourseScreenActivitySingle',
      adjustSoftInput: 'resize',
      passProps: { item },
      style: {
        backgroundBlur: 'light',
        backgroundColor: '#00000030',
        tapBackgroundToDismiss: true
      }
    })
  }

  _activitySummary = ({ item }) => {
    return (
      <TouchableOpacity style={[styles.summaryBox, { width: width - 80 }]} onPress={() => { this._activityFull(item) }}>
        <Text style={styles.summaryBoxDate}>{this._formatDate(item.created_at)}</Text>
        <Text style={styles.summaryBoxTitle} numberOfLines={1}>
          {_.truncate(this._formatCourseName(item.title), { length: 60, seperator: '...' })}
        </Text>
        <Text style={styles.summaryBoxMessage} numberOfLines={4}>
          {_.truncate(item.message.replace(/<\/?[^>]+>/gi, '').replace(/\r?\n|\r/g, ' ').replace('           ', ''), { length: 90, seperator: '...' })}
        </Text>
      </TouchableOpacity>
    )
  }

  _toCourseAnnouncements = (id) => {
    this.props.navigator.push({
      screen: 'CoursesScreenSingleAnnouncements',
      backButtonTitle: '',
      passProps: {
        id
      }
    })
  }

  _toCourseParticipants = (id) => {
    this.props.navigator.push({
      screen: 'CoursesScreenSinglePeople',
      backButtonTitle: '',
      passProps: {
        id
      }
    })
  }

  _toCourseSyllabus = (id) => {
    this.props.navigator.push({
      screen: 'CoursesScreenSingleSyllabus',
      backButtonTitle: '',
      passProps: {
        id
      }
    })
  }

  render () {
    if (this.state.loading) {
      return (
        <ScreenLadda text={'Getting course info'} />
      )
    }
    // do api calls if the user click the screen
    // store that information asyncstorage
    // refresh calls every X minutes/hours
    // option to refresh it all -> deletes async storage, lets user fetch it all again?
    return (
      <ScrollView horizontal={false}>
        <FlatList
          horizontal
          data={this.state.courseActivity}
          keyExtractor={item => item.id}
          renderItem={this._activitySummary}
          decelerationRate='fast'
          snapToInterval={width - 60}
          snaptoAlignment={'center'}
        />
        {
          _.find(this.state.courseActivitySummary, { type: 'Announcement' })
          ? <ListItem
            title='Announcements'
            containerStyle={styles.listContainer}
            onPress={() => this._toCourseAnnouncements(this.props.id)}
            badge={{
              value: _.find(this.state.courseActivitySummary, { type: 'Announcement' }).count
            }}
            />
          : null
        }
        {
          _.find(this.state.courseActivitySummary, { notification_category: 'Due Date' })
            ? <ListItem
              title='Assignments'
              containerStyle={styles.listContainer}
              badge={{
                value: _.find(this.state.courseActivitySummary, { notification_category: 'Due Date' }).count
              }}
            />
            : null
        }
        {
          _.find(this.state.courseActivitySummary, { type: 'DiscussionTopic' })
            ? <ListItem
              title='Discussions'
              containerStyle={styles.listContainer}
              badge={{
                value: _.find(this.state.courseActivitySummary, { type: 'DiscussionTopic' }).count
              }}
            />
            : null
        }
        <ListItem
          title='Grades'
          containerStyle={styles.listContainer}
        />
        <ListItem
          title='People'
          containerStyle={styles.listContainer}
          onPress={() => this._toCourseParticipants(this.props.id)}
        />
        <ListItem
          title='Files'
          containerStyle={styles.listContainer}
        />
        <ListItem
          title='Outline'
          containerStyle={styles.listContainer}
          onPress={() => this._toCourseSyllabus(this.props.id)}
        />
      </ScrollView>
    )
  }
}
