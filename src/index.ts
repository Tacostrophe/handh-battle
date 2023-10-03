import { Monster } from './monster.class';
import { Player } from './player.class';

const agressor = new Player('Player', 25, 1, 200, {min: 100, max: 200});
const victim = new Monster('Monster', 20, 23, 1000, {min: 500, max: 1000});

console.log(agressor.toString());
console.log(victim.toString());

agressor.heal();

for(let i = 0; i < 5; i++) {
  agressor.hit(victim);
}

victim.hit(agressor);

agressor.heal();

console.log(agressor.toString());
console.log(victim.toString());

// console.log(`${person}`);