var fs = require('fs');
var path = require('path');

module.exports = function (robot, scripts) {
  var scriptsPath = path.resolve(__dirname, 'src');
  console.log('path', scriptsPath);
  robot.loadFile(scriptsPath, 'hubot-humanity.js');
}
