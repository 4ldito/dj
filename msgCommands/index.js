const { pause } = require('./pause')
const { play } = require('./play')
const { skip } = require('./skip')
const { resume } = require('./resume')

const cmds = {
  play,
  p: play,
  skip,
  s: skip,
  pause,
  resume,
  r: resume
}

module.exports = cmds
