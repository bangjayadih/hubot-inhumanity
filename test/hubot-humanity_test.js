var chai = require('chai');
var sinon = require('sinon');

chai.use(require('sinon-chai'));

var expect = chai.expect;

describe('hello-world', function () {

  beforeEach(function() {
    this.robot = {
      respond: sinon.spy(),
      hear: sinon.spy(),
      brain: {
        set: sinon.spy(),
        get: sinon.spy()
      }
    };
    require('../src/hubot-humanity')(this.robot)
  });


  // it('registers a respond listener for "cah draw"', function () {
  //   expect(this.robot.respond).to.have.been.calledWithMatch(sinon.match(function (val) {
  //     val.test('cah draw');
  //   }));
  // });

  // it('registers a respond listener for "cah show sets"', function () {
  //   expect(this.robot.respond).to.have.been.calledWithMatch(sinon.match(function (val) {
  //     val.test('cah show sets');
  //   }));
  // });

  // it('registers a respond listener for "q card"', function () {
  //   expect(this.robot.respond).to.have.been.calledWithMatch(sinon.match(function (val) {
  //     val.test('q card');
  //   }));
  // });

});
