const chai = require('chai');
let assert = chai.assert;

const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

  // 1) whole number
  test('convertHandler should correctly read a whole number input', function () {
    assert.equal(convertHandler.getNum('32L'), 32);
  });

  // 2) decimal number
  test('convertHandler should correctly read a decimal number input', function () {
    assert.equal(convertHandler.getNum('3.2mi'), 3.2);
  });

  // 3) fractional input
  test('convertHandler should correctly read a fractional input', function () {
    assert.equal(convertHandler.getNum('1/2km'), 0.5);
  });

  // 4) fractional input with decimal
  test('convertHandler should correctly read a fractional input with a decimal', function () {
    const val = convertHandler.getNum('5.4/3lbs');
    assert.approximately(val, 5.4 / 3, 0.00001);
  });

  // 5) double-fraction error
  test('convertHandler should correctly return an error on a double-fraction', function () {
    assert.equal(convertHandler.getNum('3/2/3kg'), 'invalid number');
  });

  // 6) default to 1 when no numerical input
  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function () {
    assert.equal(convertHandler.getNum('kg'), 1);
  });

  // 7) read each valid input unit
  test('convertHandler should correctly read each valid input unit', function () {
    const inputs  = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const samples = ['32gal', '4L', '3.1mi', '2km', '5lbs', '7kg'];
    samples.forEach((s, idx) => {
      assert.equal(convertHandler.getUnit(s), inputs[idx]);
    });
  });

  // 8) error for invalid input unit
  test('convertHandler should correctly return an error for an invalid input unit', function () {
    assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
  });

  // 9) correct return unit for each valid input unit
  test('convertHandler should return the correct return unit for each valid input unit', function () {
    const inputUnits  = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const returnUnits = ['L',   'gal','km','mi', 'kg',  'lbs'];
    inputUnits.forEach((u, idx) => {
      assert.equal(convertHandler.getReturnUnit(u), returnUnits[idx]);
    });
  });

  // 10) spelled-out string unit for each valid input unit
  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function () {
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.equal(convertHandler.spellOutUnit('L'),   'liters');
    assert.equal(convertHandler.spellOutUnit('mi'),  'miles');
    assert.equal(convertHandler.spellOutUnit('km'),  'kilometers');
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.equal(convertHandler.spellOutUnit('kg'),  'kilograms');
  });

  // 11) gal to L
  test('convertHandler should correctly convert gal to L', function () {
    const val = convertHandler.convert(1, 'gal');
    assert.approximately(val, 3.78541, 0.00001);
  });

  // 12) L to gal
  test('convertHandler should correctly convert L to gal', function () {
    const val = convertHandler.convert(3.78541, 'L');
    assert.approximately(val, 1, 0.00001);
  });

  // 13) mi to km
  test('convertHandler should correctly convert mi to km', function () {
    const val = convertHandler.convert(1, 'mi');
    assert.approximately(val, 1.60934, 0.00001);
  });

  // 14) km to mi
  test('convertHandler should correctly convert km to mi', function () {
    const val = convertHandler.convert(1.60934, 'km');
    assert.approximately(val, 1, 0.00001);
  });

  // 15) lbs to kg
  test('convertHandler should correctly convert lbs to kg', function () {
    const val = convertHandler.convert(1, 'lbs');
    assert.approximately(val, 0.453592, 0.00001);
  });

  // 16) kg to lbs
  test('convertHandler should correctly convert kg to lbs', function () {
    const val = convertHandler.convert(0.453592, 'kg');
    assert.approximately(val, 1, 0.00001);
  });

});
