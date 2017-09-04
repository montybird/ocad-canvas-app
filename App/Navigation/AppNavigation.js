/* eslint-disable import/prefer-default-export */

import { Navigation } from 'react-native-navigation'
import CoursesScreen from '../Modules/Courses/CoursesScreen'

import InboxScreen from '../Modules/Inbox/InboxScreen'
import SingleCourseView from '../Modules/Courses/CoursesScreenSingle'
import CoursesScreenSinglePeople from '../Modules/Courses/CoursesScreenSinglePeople'
import CourseScreenActivitySingle from '../Modules/Courses/CourseScreenActivitySingle'
import SingleConversationView from '../Modules/Inbox/InboxScreenSingle'
import SingleConversationViewListParticipants from '../Modules/Inbox/InboxScreenSingleAllParticipants'

import CreateMessage from '../Modules/Inbox/CreateMessage'
import CreateMessageSelectCourse from '../Modules/Inbox/CreateMessageSelectCourse'
import CreateMessageSelectUser from '../Modules/Inbox/CreateMessageSelectUser'

export function registerScreens (store, Provider) {
  Navigation.registerComponent('CoursesScreen', () => CoursesScreen, store, Provider)
  Navigation.registerComponent('InboxScreen', () => InboxScreen)
  Navigation.registerComponent('SingleCourseView', () => SingleCourseView)
  Navigation.registerComponent('SingleConversationView', () => SingleConversationView)
  Navigation.registerComponent('CourseScreenActivitySingle', () => CourseScreenActivitySingle)
  Navigation.registerComponent('CoursesScreenSinglePeople', () => CoursesScreenSinglePeople)
  Navigation.registerComponent('SingleConversationViewListParticipants', () => SingleConversationViewListParticipants)
  Navigation.registerComponent('CreateMessage', () => CreateMessage, store, Provider)
  Navigation.registerComponent('CreateMessageSelectCourse', () => CreateMessageSelectCourse, store, Provider)
  Navigation.registerComponent('CreateMessageSelectUser', () => CreateMessageSelectUser, store, Provider)
}
