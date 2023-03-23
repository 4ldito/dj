const { pause } = require('./pause')
const { play } = require('./play')
const { skip } = require('./skip')
const { resume } = require('./resume')
const { currentSong } = require('./currentSong')
const { lyrics } = require('./lyrics')

const cmds = {
  play,
  p: play,
  skip,
  s: skip,
  pause,
  resume,
  r: resume,
  currentSong,
  c: currentSong,
  song: currentSong,
  lyrics
}

module.exports = cmds
