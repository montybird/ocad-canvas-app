import { StyleSheet } from 'react-native'
import { Containers, Colors, Fonts } from '../../Common/index'
import { width, height } from 'react-native-dimension'

export default StyleSheet.create({
  lightBoxContainer: {
    width: width(100),
    height: height(100),
    alignItems: 'center',
    justifyContent: 'center'
  },
  textError: {
    color: Colors.black,
    // fontSize: Fonts.size.input,
    marginLeft: 10
  },
  textLabel: {
    fontSize: Fonts.size.input,
    marginLeft: 0
  },
  textInput: {
    fontSize: Fonts.size.medium,
    width: width(100),
    height: height(100),
    paddingLeft: 10,
    paddingTop: 10
  },
  lightBoxListLabel: {
    // fontSize: Fonts.size.small,
    color: Colors.lightGrey,
    alignSelf: 'center'
  },
  lightBoxList: {
    marginTop: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 11,
    paddingLeft: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lighterGrey
  },
  lightBoxListWider: {
    paddingTop: 20,
    paddingBottom: 20
  },
  lightBoxContent: {
    marginTop: 0,
    backgroundColor: Colors.white,
    borderRadius: 5,
    width: width(90),
    minHeight: 10,
    maxHeight: 280
  },
  lightBoxIcon: {
    position: 'absolute',
    left: 15,
    top: 20
  },
  ...Containers
})
