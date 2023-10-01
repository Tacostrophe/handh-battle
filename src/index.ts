type Damage = {
  min: number;
  max: number;
};

// кубики
class Dice {
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

// существо
class Creature {
  name: string;
  attack: number;
  defense: number;
  maxHP: number;
  currentHP: number;
  protected damage: Damage;
  // protected dead: boolean = false;

  constructor (
    name: string,
    attack = 1,
    defense = 1,
    maxHP = 10,
    damage: Damage = { min: 1, max: 1 }
  ) {
    // накопитель сообщений ошибок
    const errors: string[] = [];

    this.name = name;

    // у существа есть параметры атака и защита
    // это целые числа от 1 до 30
    if (!Number.isInteger(attack) || attack > 30 || attack < 1) {
      errors.push('attack should be integer from 1 to 30');
    }
    if (!Number.isInteger(defense) || defense > 30 || defense < 1) {
      errors.push('defense should be integer from 1 to 30');
    }
    this.defense = defense; 
    this.attack = attack;

    // у существа есть здоровье
    // это натуральное число от 0 до N
    if (!Number.isInteger(maxHP) || maxHP <= 0) {
      errors.push('maxHP should be a natural number ');
    }
    this.maxHP = maxHP;
    this.currentHP = maxHP;
    
    // у существа есть параметр урон
    // это диапазон натуральных чисел
    Object.entries(damage).forEach(([key, value]) => {
      if (!Number.isInteger(value) || value <= 0) {
        errors.push(`${key} damage should be a natural number`);
      }
    });
    if (damage.min > damage.max) {
      errors.push('damage min can\'t be greater than damage max');
    }
    this.damage = damage;

    // выброс ошибки в случае наличия невалидных данных
    // ошибка содержит сообщение с описанием всех несоответствий
    if (errors.length) {
      throw new Error(
        ((errors.length === 1) ? 'Error: ' : 'Errors:\n- ')
        + errors.join('\n- ')
      );
    }
  }

  takeDamage(damageValue: number) {
    // получение существом урона
    // урон должен быть натуральным числом
    if (!Number.isInteger(damageValue) || damageValue < 1) {
      throw new Error('damage should be a natural number');
    }
    // уменьшение hp с проверкой, чтоб результат не стал меньше нуля
    this.currentHP = (this.currentHP > damageValue) ? this.currentHP - damageValue : 0;
  }

  hit (victim: Creature) {
    // одно существо может ударить другое

    // рассчет модификатора атаки
    // он равен разности атаки атакующего и защиты защищающегося ллюс 1
    const attackModifier = this.attack - victim.defense + 1;

    // успех опеределяется броском N кубиков с цифрами от 1 до 6,
    // где N - модификатор атаки, но не менее одного
    const rollsAmount = (attackModifier < 1) ? 1 : attackModifier;
    let success = false;
    let rollCounter = 0;
    let rollResult: number;
    const dice = new Dice(6);
    // бросаем кубик пока не выпадет 5 или 6 или не кончится количество бросков
    while ((rollCounter < rollsAmount) && !success) {
      rollResult = dice.roll();
      // удар считается успешным, если хотя бы на одном из кубиков выпадает 5 или 6
      success = (rollResult === 5 || rollResult === 6);
      rollCounter += 1;
    }
    
    // если удар успешен,
    if (success) {
      // то берется произвольное значение из параметра урон атакующего
      const damageValue = Math.floor(Math.random() * (this.damage.max - this.damage.min + 1)) + this.damage.min;
      // и вычитается из здоровья защищающегося
      victim.takeDamage(damageValue);
    }
  }

  toString() {
    return (
      `Creature "${this.name}"\n`
      + `attack: ${this.attack}\n`
      + `defense: ${this.defense}\n`
      + `HP: ${this.currentHP}/${this.maxHP}\n`
      + `damage: ${this.damage.min}-${this.damage.max}\n`
    );
  }
}

const person = new Creature('testPerson', 20);

console.log(`${person}`);