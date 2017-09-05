import Colors from './Colors'
import Metrics from './Metrics'

const Containers = {
  messageContainer: {
    backgroundColor: Colors.white,
    borderTopWidth: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.iosLight,
    paddingBottom: 10
  },
  mainContainer: {
    justifyContent: 'flex-start',
    // margin: Metrics.section,
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1
  },
  section: {
    backgroundColor: Colors.transparent,
    padding: Metrics.baseMargin,
    margin: Metrics.section,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: Colors.transparent,
    paddingTop: Metrics.baseMargin
  },
  centeredContainer: {
    flex: 1,
    backgroundColor: Colors.transparent,
    paddingTop: Metrics.baseMargin
  },
  groupContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center'
  },
  homeContainer: {
    backgroundColor: Colors.white
  },
  noBorderContainer: {
    borderBottomWidth: 0,
    borderTopWidth: 0
  },
  listContainer: {
    backgroundColor: Colors.white,
    borderTopWidth: 0.5,
    borderBottomWidth: 0,
    borderBottomColor: Colors.iosLight,
    borderTopColor: Colors.iosLight
  }
}

export default Containers
