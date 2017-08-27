/* eslint-disable import/prefer-default-export */

import { Navigation } from 'react-native-navigation'
import CoursesScreen from '../Modules/Courses/CoursesScreen'
import InboxScreen from '../Modules/Inbox/InboxScreen'
import SingleCourseView from '../Modules/Courses/CoursesScreenSingle'
import SingleConversationView from '../Modules/Inbox/InboxScreenSingle'
import SingleConversationViewListParticipants from '../Modules/Inbox/InboxScreenSingleAllParticipants'
import CreateMessage from '../Modules/Inbox/CreateMessage'
import CreateMessageSelectCourse from '../Modules/Inbox/CreateMessageSelectCourse'

export function registerScreens (store, Provider) {
  Navigation.registerComponent('CoursesScreen', () => CoursesScreen, store, Provider)
  Navigation.registerComponent('InboxScreen', () => InboxScreen)
  Navigation.registerComponent('SingleCourseView', () => SingleCourseView)
  Navigation.registerComponent('SingleConversationView', () => SingleConversationView)
  Navigation.registerComponent('SingleConversationViewListParticipants', () => SingleConversationViewListParticipants)
  Navigation.registerComponent('CreateMessage', () => CreateMessage)
  Navigation.registerComponent('CreateMessageSelectCourse', () => CreateMessageSelectCourse)
}
