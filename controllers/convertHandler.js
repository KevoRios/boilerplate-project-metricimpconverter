function ConvertHandler() {

  const validUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];

  this.getNum = function(input) {
    const numMatch = input.match(/^[^a-zA-Z]*/); // todo antes de la primera letra
    const numStr = numMatch ? numMatch[0] : '';

    // sin número -> 1
    if (!numStr) return 1;

    // manejar fracciones
    const slashCount = (numStr.match(/\//g) || []).length;
    if (slashCount > 1) return 'invalid number';

    if (slashCount === 1) {
      const [n, d] = numStr.split('/');
      const num = parseFloat(n);
      const den = parseFloat(d);
      if (isNaN(num) || isNaN(den)) return 'invalid number';
      return num / den;
    }

    const num = parseFloat(numStr);
    if (isNaN(num)) return 'invalid number';

    return num;
  };

  this.getUnit = function(input) {
    const unitMatch = input.match(/[a-zA-Z]+$/);
    if (!unitMatch) return 'invalid unit';

    let unit = unitMatch[0];

    // normalizar
    const lower = unit.toLowerCase();
    if (lower === 'l') {
      unit = 'L';
    } else {
      unit = lower;
    }

    if (!validUnits.includes(unit)) {
      return 'invalid unit';
    }

    return unit;
  };

  this.getReturnUnit = function(initUnit) {
    const map = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    return map[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const names = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    return names[unit];
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        return null;
    }

    return Number(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initSpell = this.spellOutUnit(initUnit);
    const returnSpell = this.spellOutUnit(returnUnit);
    return `${initNum} ${initSpell} converts to ${returnNum} ${returnSpell}`;
  };

}

module.exports = ConvertHandler;
