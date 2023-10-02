import { Damage } from './types';
import { Creature } from './creature.class';

export class Player extends Creature {
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
