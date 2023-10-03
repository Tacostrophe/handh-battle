import { Damage } from './types';
import { Creature } from './creature.class';

export class Player extends Creature {
  protected species = 'Player';
  protected healingCharges = 4;

  constructor (
    name: string,
    attack = 1,
    defense = 1,
    maxHP = 10,
    damage: Damage = { min: 1, max: 1 }
  ) {
    super(name, attack, defense, maxHP, damage);
  }

  heal(): void {
    // игрок может исцелить себя до 4-х раз на 30% от максимального здоровья.
    if (this.isDead()) {
      console.log(`${this.species} "${this.name}" can't heal while dead`);
      return;
    }
    if (this.healingCharges < 1) {
      console.log(`${this.species} "${this.name}" has no healing charges left`);
      return;
    }
    if (this.currentHP === this.maxHP) {
      console.log(`${this.species} "${this.name}" is already full`);
      return;
    }
    
    const healthToHeal = (0.3 * this.maxHP < 1) ? 1 : Math.floor(0.3 * this.maxHP);
    const hpBeforeHeal = this.currentHP;
    this.currentHP = (this.maxHP - this.currentHP > healthToHeal) ? this.currentHP + healthToHeal : this.maxHP;
    this.healingCharges -= 1;
    console.log(`${this.species} "${this.name}" healed ${healthToHeal} HP\n`
    + `(${hpBeforeHeal}/${this.maxHP}=>${this.currentHP}/${this.maxHP})`);
  }
}
