// import isScroll from './isScroll'
// import clickToggleClass from './clickToggleClass'

module.exports = (buttonClass, viewClass) => {

    const isScroll = require('./isScroll')
    const clickToggleClass = require('./clickToggleClass')

  const view = document.querySelector('.' + viewClass)
  if (view) {
    let scrollYes = () => {
      isScroll(true)
    }
    let scrollNo = () => {
      isScroll(false)
    }
    clickToggleClass(viewClass, buttonClass, scrollNo, scrollYes)
  }
}
