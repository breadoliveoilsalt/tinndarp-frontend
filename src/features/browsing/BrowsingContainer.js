import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchItems } from './itemsToBrowseSlice'

import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import CurrentItemContainer from './CurrentItemContainer'
import Loader from '../../components/Loader'

export class BrowsingContainer extends Component {

  constructor(props) {
     super(props);
  }

  componentDidMount() {
    if (!this.props.items) {
      this.props.fetchItems()
      // fetchItems()
      // this.props.dispatch(fetchItems())
    }
  }

  render() {

    if (!this.props.items) {
      return (<Loader />)
    } else {
      return <CurrentItemContainer currentItem={this.props.currentItem}/>
    }
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.itemsToBrowse.items,
    currentItem: state.itemsToBrowse.currentItem,
    fetchingItems: state.itemsToBrowse.fetchingItems
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchItems: fetchItems}, dispatch)
}
// function mapDispatchToProps(dispatch) {
//     return ({
//         fetchItems: () => dispatch(fetchItems())
//     })
// }
// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchItems: () => dispatch(fetchItems())
//     // loadItems: (items) => dispatch(loadItems(items)),
//     // updateFetchingStatus: (bool) => dispatch(updateFetchingStatus(bool))
//   }
// }

export default connect(mapStateToProps, mapDispatchToProps)(BrowsingContainer)
// export default connect(mapStateToProps, null)(BrowsingContainer)
