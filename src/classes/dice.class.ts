export class Dice {
  // кубики
  sidesAmount: number;

  constructor (
    sidesAmount = 6,
  ) {
    // накопитель сообщений ошибок
    const errors: string[] = [];

    // количество граней - натуральное число, не менее 4
    if (!Number.isInteger(sidesAmount) || sidesAmount < 4) {
      errors.push('amount of sides of dice should be integer and greater than 3');
    }
    this.sidesAmount = sidesAmount;

    // выброс ошибки в случае наличия невалидных данных
    // ошибка содержит сообщение с описанием всех несоответствий
    if (errors.length) {
      throw new Error(
        ((errors.length === 1) ? 'Error: ' : 'Errors:\n- ')
        + errors.join('\n- ')
      );
    }
  }

  roll() :number {
    // возвращает результат броска кубика
    return Math.floor(Math.random() * (this.sidesAmount - 1 + 1)) + 1;

  }

  toString() :string {
    return `D${this.sidesAmount}`;
  }
}
  