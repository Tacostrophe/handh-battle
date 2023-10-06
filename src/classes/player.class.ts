import { Damage } from '../types';
import { Creature } from './creature.class';

export class Player extends Creature {
  protected _species = 'Player';
  protected _name: string;
  protected _healingCharges = 4;

  constructor (
    name: string,
    attack = 1,
    defense = 1,
    maxHP = 10,
    damage: Damage = { min: 1, max: 1 }
  ) {
    super(attack, defense, maxHP, damage);
    this._name = name;
  }

  toString(){
    return `${this._species} "${this._name}"`;
  }

  heal(): void {
    // игрок может исцелить себя до 4-х раз на 30% от максимального здоровья.
    console.log(`${this} trying to heal`);
    if (this.isDead()) {
      console.log(`${this} can't heal while dead`);
      return;
    }
    if (this._healingCharges < 1) {
      console.log(`${this} has no healing charges left`);
      return;
    }
    if (this._currentHP === this.maxHP) {
      console.log(`${this} is already full`);
      return;
    }
    
    const healthToHeal = (0.3 * this.maxHP < 1) ? 1 : Math.floor(0.3 * this.maxHP);
    const hpBeforeHeal = this._currentHP;
    this._currentHP = (this.maxHP - this._currentHP > healthToHeal) ? this._currentHP + healthToHeal : this.maxHP;
    this._healingCharges -= 1;
    console.log(`${this} healed ${healthToHeal} HP\n`
    + `(${hpBeforeHeal}/${this.maxHP}=>${this._currentHP}/${this.maxHP})`);
  }
}
