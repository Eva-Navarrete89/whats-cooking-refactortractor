const chai = require('chai');
const expect = chai.expect;

const Pantry = require('../src/Pantry');
const users = require('../data/users');
const recipes = require('../data/recipes');

describe('Pantry', () => {
    let pantry;

    beforeEach(function() {
        pantry = new Pantry(users[0].pantry)
    })

    it('should be a function', () => {
        expect(Pantry).to.be.a('function');
    })
})