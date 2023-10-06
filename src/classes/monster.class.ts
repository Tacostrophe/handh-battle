import { Damage } from '../types';
import { Creature } from './creature.class';

export class Monster extends Creature {
  protected _species = 'Monster';
  
  constructor (
    attack = 1,
    defense = 1,
    maxHP = 10,
    damage: Damage = { min: 1, max: 1 }
  ) {
    super(attack, defense, maxHP, damage);
  }
}
