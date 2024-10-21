const defaultCharacter = {
    name: '',
    life: 1,
    maxLife: 1,
    attack: 0,
    defense: 0
}

const createKnight = (name) => {
    return {
        ...defaultCharacter,
        name,
        life: 100,
        maxLife: 100,
        attack: 10,
        defense: 8
    }

}

const createSorcerer = (name) => {
    return {
        ...defaultCharacter,
        name,
        life: 80,
        maxLife: 80,
        attack: 15,
        defense: 3
    }
}

const createSkeleton = () => {
    return{
        ...defaultCharacter,
        name: 'Skeleton',
        life: 40,
        maxLife: 40,
        attack: 4,
        defense: 4
    }
}

const createDragon = () => {
    return{
        ...defaultCharacter,
        name: 'Red Dragon',
        life: 120,
        maxLife: 120,
        attack: 12,
        defense: 8
    }
}

const stage = {
    hero: null,
    monster: null,
    heroEl: null,
    monsterEl: null,

    start (hero, monster, heroEl, monsterEl){
        this.hero = hero;
        this.monster = monster;
        this.heroEl = heroEl;
        this.monsterEl = monsterEl;

        this.heroEl.querySelector('.attackButton').addEventListener('click', () => {
            if (hero.life <= 0){
                log.addMessage(`${hero.name} está morto`);
            } else{
                this.doAttack(this.hero, this.monster);
            }
        });

        this.monsterEl.querySelector('.attackButton').addEventListener('click', () => {
            if (monster.life <= 0){
                log.addMessage(`${monster.name} está morto`);
            } else{
                this.doAttack(this.monster, this.hero);
            }
        });

        this.update();
    },

    update(){
        //hero
        this.heroEl.querySelector('.name').innerHTML = `${this.hero.name} - ${this.hero.life.toFixed(1)}HP`;
        let heroPercent = (this.hero.life / this.hero.maxLife ) * 100;
        this.heroEl.querySelector('.bar').style.width = `${heroPercent}%`;

        // Muda a cor da barra de vida do herói com base no percentual de vida
        if (heroPercent <= 30) {
            this.heroEl.querySelector('.bar').style.backgroundColor = 'red';
        } else {
            this.heroEl.querySelector('.bar').style.backgroundColor = '#35c95d'; // Verde
        }

        //monster
        this.monsterEl.querySelector('.name').innerHTML = `${this.monster.name} - ${this.monster.life.toFixed(1)}HP`;
        let monsterPercent = (this.monster.life / this.monster.maxLife ) * 100;
        this.monsterEl.querySelector('.bar').style.width = `${monsterPercent}%`;

        // Muda a cor da barra de vida do monstro com base no percentual de vida
        if (monsterPercent <= 30) {
            this.monsterEl.querySelector('.bar').style.backgroundColor = 'red';
        } else {
            this.monsterEl.querySelector('.bar').style.backgroundColor = '#35c95d'; // Verde
        }
        
    },

    doAttack(attacking, attacked){
        if (attacked.life <= 0) {
            log.addMessage(`${attacked.name} está morto.`);
            return;
        }

        const attackFactor = (Math.random() * 2).toFixed(2);
        const defenseFactor = (Math.random() * 2).toFixed(2);

        const actualAttack = attacking.attack * attackFactor;
        const actualDefense = attacked.defense * defenseFactor;

        if(actualAttack > actualDefense){
            attacked.life -= actualAttack;
            attacked.life = attacked.life < 0 ? 0 : attacked.life;  
            log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`);
        }else{
            log.addMessage(`${attacked.name} conseguiu defender...`)
        }

        this.update();
    }
}

const log = {
    list:[],
    addMessage(msg){
        this.list.push(msg);
        this.render();
    },
    render(){
        const logEl = document.querySelector('.log');
        logEl.innerHTML = '';

        for (let i in this.list){
            logEl.innerHTML += `<li>${this.list[i]}</li>`;
        }
    }
}