const COLORS = require('./colors')
const TYPOG = require('./typography')
const MEDIA_QUERIES = require('./mediaQueries')
const BREAK_POINTS = require('./breakpoints')

module.exports = {
  // Fonts
  fontPrimary: `${TYPOG.helvetica}, ${TYPOG.sansSerif}`,

  // Modal
  priorityModalZIndex: 9999,
  modalPrimaryBg: COLORS.offsetWhite,

  // Menu
  menuFontColor: COLORS.gray,

  // SplashScreen
  splashScreenBg: COLORS.black,

  // font size
  fontSizeTitle: '45px',
  fontSizeMdTitle: '28px',
  fontSizeSmTitle: '24px',
  fontSizeSubTitle: '20px',
  fontSizeMdSubTitle: '18px',
  fontSizeSmSubTitle: '16px',
  fontSizeText: '14px',
  fontSizeMdText: '12px',
  fontSizeSmText: '10px',

  // Game
  game: {
    width: '480px',
    height: '240px',
    widthNoUnit: 480,
    heightNoUnit: 240
  },

  // Media Queries
  ...MEDIA_QUERIES,

  // Breakpoints
  ...BREAK_POINTS
}
