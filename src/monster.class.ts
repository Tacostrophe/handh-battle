import { Damage } from './types';
import { Creature } from './creature.class';

export class Monster extends Creature {
  protected species = 'Monster';
  
  constructor (
    name: string,
    attack = 1,
    defense = 1,
    maxHP = 10,
    damage: Damage = { min: 1, max: 1 }
  ) {
    super(name, attack, defense, maxHP, damage);
  }
}
