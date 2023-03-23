const { pause } = require('./pause')
const { play } = require('./play')
const { skip } = require('./skip')
const { resume } = require('./resume')

const cmds = {
  play,
  skip,
  pause,
  resume
}

module.exports = cmds
