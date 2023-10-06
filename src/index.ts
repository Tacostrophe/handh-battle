import { Monster } from './classes/monster.class';
import { Player } from './classes/player.class';

const player = new Player('Bob', 25, 1, 200, {min: 100, max: 200});
const monster = new Monster(3, 23, 1000, {min: 500, max: 1000});

console.log(player.stats);
console.log(monster.stats);

player.receiveDamage(170);

for(let _ = 0; _ < 4; _++) {
  player.heal();
}

player.receiveDamage(50);

for(let _ = 0; _ < 2; _++) {
  player.heal();
}

for(let i = 0; i < 5; i++) {
  player.hit(monster);
}

monster.hit(player);

player.heal();

console.log(player.stats);
console.log(monster.stats);
