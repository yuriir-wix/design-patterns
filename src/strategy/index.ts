interface MoveBehavior {
  move: (distance: number) => string
}

class SwimBehavior implements MoveBehavior {
  move(distance: number){
    return `swims ${distance} meters`;
  }
}

class WalkBehavior implements MoveBehavior {
  move(distance: number){
    return `walks ${distance} meters`;
  }
}

class TeleportBehavior implements MoveBehavior {
  move(distance: number){
    return `teleports ${distance} meters`;
  }
}

interface AttackBehavior {
  attack: () => string
}

class HummerAttack implements AttackBehavior {
  attack(){
    return 'hummer attack';
  }
}

class BiteAttack implements AttackBehavior {
  attack(){
    return 'bite attack';
  }
}

class FireballAttack implements AttackBehavior {
  attack(){
    return 'fireball launch';
  }
}

//This is Java-like implementetion of strategy pattern. In TS strategy classes could be substituted with plain functions.
//But sometimes strategies may contain internal state - and that's when class usage is justified

class Character {
  private moveBehavior: MoveBehavior;
  private attackBehavior: AttackBehavior;
  private name: string;
  constructor(name: string, moveBehavior: MoveBehavior, attackBehavior: AttackBehavior){
    this.name = name;
    this.moveBehavior = moveBehavior;
    this.attackBehavior = attackBehavior;
  }

  setMoveBehavior(moveBehavior: MoveBehavior){
    this.moveBehavior = moveBehavior;
  }

  setAttackBehavior(AttackBehavior: AttackBehavior){
    this.attackBehavior = AttackBehavior;
  }

  attack(target: Character){
    console.log(this.name + ' hits ' + target.name + ' with ' + this.attackBehavior.attack());
  }

  move(distance: number){
    console.log(this.name + ' ' + this.moveBehavior.move(distance));
  }

  getName(){
    return this.name;
  }

}

const eatSpinach = (character: Character) => {
  console.log(`${character.getName()} got some spinach!`);
  character.setMoveBehavior(new TeleportBehavior());
  character.setAttackBehavior(new FireballAttack());
}

class Ragnarök {
  static start(){
    const hero = new Character('Thor', new WalkBehavior, new HummerAttack());
    const serpent = new Character('Jörmungandr', new SwimBehavior(), new BiteAttack());
    serpent.move(10000000);
    serpent.attack(hero);
    hero.move(50);
    hero.attack(serpent);
    serpent.attack(hero);
    eatSpinach(hero);
    hero.move(7000);
    hero.attack(serpent);
    serpent.attack(serpent);
  }
}

Ragnarök.start();


