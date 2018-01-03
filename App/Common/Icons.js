import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const icons = {
  'compose': [Ionicons, 'ios-create-outline', 35, '#8E8E93'],
  // 'compose': [MaterialCommunityIcons, 'pencil-circle', 35, '#8E8E93'],
  'send': [Ionicons, 'ios-send-outline', 35, '#8E8E93'],
  'close': [Ionicons, 'ios-close', 45, '#8E8E93'],
  'reply': [Ionicons, 'ios-add', 40, '#8E8E93'],
  'options': [Ionicons, 'ios-options-outline', 30, '#8E8E93'],
  'type': [Ionicons, 'ios-calendar-outline', 30, '#8E8E93'],
  'people': [Ionicons, 'ios-people-outline', 35, '#8E8E93'],
  'delete': [Ionicons, 'ios-trash-outline', 30, '#8E8E93'],
  'share': [Ionicons, 'ios-share-outline', 35, '#8E8E93'],

  // Tabs
  'messages': [MaterialCommunityIcons, 'email', 30, '#8E8E93'],
  'courses': [MaterialCommunityIcons, 'book-open', 30, '#8E8E93'],
  'profile': [MaterialCommunityIcons, 'account-circle', 30, '#8E8E93']
}

let IconsMap = {}

let IconsLoaded = new Promise((resolve, reject) => {
  Promise.all(
    Object.keys(icons).map(iconName =>
      icons[iconName][0].getImageSource(
        icons[iconName][1],
        icons[iconName][2],
        icons[iconName][3]
      ))
  ).then(sources => {
    Object.keys(icons).forEach((iconName, idx) => (IconsMap[iconName] = sources[idx]))
    resolve(true)
  })
    .catch(err => reject(err))
    .done()
})

export {
  IconsMap,
  IconsLoaded
}
