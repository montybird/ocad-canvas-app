import EStyleSheet from 'react-native-extended-stylesheet'
import { Colors, Containers, Fonts, Metrics } from '../../Common/index'

const styles = EStyleSheet.create({
  courseBox: {
    backgroundColor: Colors.basicallyWhite,
    borderRadius: 20,
    minHeight: 150,
    marginLeft: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
    marginTop: Metrics.baseMargin,
    padding: Metrics.doubleBaseMargin
  },
  label: {
    fontSize: Fonts.size.regular,
    color: Colors.lightGrey,
    alignSelf: 'center'
  },
  courseCode: {
    fontSize: Fonts.size.regular,
    color: Colors.lightGrey,
    textAlign: 'left',
    fontWeight: '400',
    padding: 0,
    marginLeft: -2
  },
  courseName: {
    fontSize: Fonts.size.regular,
    color: Colors.ios,
    textAlign: 'left',
    fontWeight: '700',
    padding: 0,
    margin: 0
  },
  summaryContainer: {
    flex: 1,
    flexWrap: 'nowrap',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#000000'
  },
  summaryBox: {
    backgroundColor: Colors.white,
    margin: Metrics.baseMargin,
    borderWidth: 1,
    width: 300,
    height: 150,
    display: 'flex',
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    borderColor: Colors.basicallyWhite,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  summaryBoxRow: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10
  },
  summaryBoxDate: {
    paddingBottom: 5,
    color: Colors.lightGrey
  },
  summaryBoxTitle: {
    fontWeight: '500',
    fontSize: Fonts.size.button,
    alignItems: 'flex-start',
    marginTop: 5,
    marginBottom: 5
  },
  summaryBoxCategory: {},
  summaryBoxMessage: {
    paddingTop: 1
  },
  iconItem: {
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  iconItemText: {
    fontSize: Fonts.size.regular + 1,
    paddingLeft: 5
  },
  componentButton: {
    textAlign: 'center',
    color: Colors.primary,
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: Fonts.size.regular
  },
  pageTableContainer: {
    paddingLeft: 10,
    paddingRight: 20
  },
  assignmentName: {
    fontWeight: '600'
  },
  assignmentDueDate: {
    color: Colors.lightGrey
  },
  assignmentContent: {
    padding: 10
  },
  rubricContainer: {
    marginTop: 15
  },
  rubricHeader: {
    fontWeight: '500'
  },
  rubricCommentsHeader: {
    fontWeight: '500'
  },
  rubricComments: {
    marginTop: 5,
    color: Colors.error
  },
  attachmentContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 10
  },
  attachmentNameSizeContainer: {
    flexDirection: 'column',
    marginLeft: 5
  },
  attachmentIcon: {
    paddingRight: 20,
    marginLeft: 5
  },
  attachmentSize: {
    textAlign: 'left',
    color: Colors.lightGrey
  },
  ...Containers
})

EStyleSheet.build()

export { styles }
