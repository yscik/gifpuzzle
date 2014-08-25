var chai = require('chai');
var expect = chai.expect;

import {px} from '../src/visual/utils';

describe('utils', function() {
    it('px', function() {
        expect(px(10)).to.equal('10px');
    });
});