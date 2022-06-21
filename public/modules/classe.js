class Boss {
        static enigmes = [
            {
                question: "Qui fume de l'eau",
                reponse: "une baleine",
            },
            {
                question: "Qu'est ce qui porte des feuilles",
                reponse: "un portefeuil",
            },
            {
                question: "Qu'est-ce qui est jaune et qui attend?",
                reponse: "Jonathan",
            },
        ];
        constructor(nom, pv, pa) {
            this.nom = nom;
            this.pv = this.mtnpv = pv;
            this.pa = pa;
    
        }
        pickEnigmes() {
            const random = Math.floor(Math.random() * Boss.enigmes.length)
            return Boss.enigmes[random];
        }
        attack() {
            return this.pa;
        }
    
    }
class Heros {
    constructor(nom,pv, pa) {
        this.nom = nom;
        this.pv = this.mtnpv = pv;
        this.pa = pa;
    }
    attack() {
        Math.floor(this.pa *= 1.30);
        Math.floor(this.mtnpv *= 0.20);
    }
    defense() {
        Math.floor(this.pa *= 0.20);
        Math.floor(this.mtnpv *= 1.30);
    }
}
class Guerrier extends Heros {
    constructor(nom, pv, pa) {
        super(nom, pv, pa)
        this.rage = 0;
    }
    attack() {
        super.attack();
        if (this.rage === 4) {
            return this.pa *= 1.80
        } else {
            return this.pa;
        }
    }
}
class Mage extends Heros {
    static mana = [7, 9, 11];
    constructor(nom, pv, pa) {
        super(nom, pv, pa);
        this.manaforce = this.randomMana();
    }
    randomMana() {
        const random = Math.floor(Math.random() * Mage.mana.length);
        return Mage.mana[random];
    }
attack() {
        super.attack();
        if (this.manaforce < 2) {
            this.manaforce = 7;
        } else {
            this.manaforce -= 2;
            return this.pa;
        }
    }
}
class Archer extends Heros {
    //carquois de flèches
    static Fleche = [7, 8, 9, 10, 11];
    constructor(nom, pv, pa) {
        super(nom, pv, pa);
        this.fleches = this.randomFleche();
    }
    //choisir en random le nombre de flèches
    randomFleche() {
        const random = Math.floor(Math.random() * Archer.Fleche.length);
        return Archer.Fleche[random];
    }
    attack() {
        super.attack();
        if (this.fleches < 2) {
            this.fleches = 6;
        } else {
            this.fleches -= 2;
            return this.pa;
        }
    }
}
let Maxpv = 1000;
const Questions = (question) => {
    let joueur;
    do {
        joueur = +prompt(question);
    }
    while (Number.isNaN(joueur) || joueur <= 0)
    return joueur;
}
const creertonHeros = (tonHero) => {
    const nom = prompt(`Donnez un nom à votre ${tonHero}`);
    alert(`Sachez que vous avez 1000 points a repartir entre personnage il vous reste ${Maxpv} points à répartir`);
    const pv = Questions(`Combien de points de vie lui accordez-vous ?`);
    const pa = Questions(`Combien de points d'attaque lui accordez-vous ?`);
    Maxpv -= (pv + pa);
    switch (tonHero) {
        case 'guerrier':
            return new Guerrier(nom, pv, pa);
        case 'mage':
            return new Mage(nom, pv, pa);
        case 'archer':
            return new Archer(nom, pv, pa);
    }

}

//repartir points entre persos

const pointsRepartition = () => {
    let archer;
    let guerrier;
    let mage;

    do {
        archer = creertonHeros('archer')
        guerrier = creertonHeros('guerrier')
        mage = creertonHeros('mage')
    }
    while (Maxpv > 0)
    return { archer, guerrier, mage }

}

//choisir boss en random

const selectBoss = () => {
    const random = Math.floor(Math.random() * boss.length);
    return boss[random];
}

//determiner si Heros sont KO
const areHerosDead = (heros) => {
    return heros.archer.mtnpv <= 0
        && heros.mage.mtnpv <= 0
        && heros.guerrier.mtnpv <= 0
}
//determiner si boss est KO
const IlesDead = (bossSelected) => {
    return bossSelected.mtnpv <= 0;
}

//instancer les boss && Heros

const heros = pointsRepartition();
const Ata = new Boss("Ata", 3000, 60);
const Issam = new Boss("Issam", 3500, 50);
const Abdel = new Boss("Abdel", 5000, 20);
const boss = [Ata, Issam, Abdel];
const bossSelected = selectBoss();

alert(`Vous allez affronter ${bossSelected.nom}`)
let isHerosTurn = true;
let ResolvedRiddle = false

//combat par tour
while ((!IlesDead(bossSelected) && !ResolvedRiddle) && !areHerosDead(heros)) {
    const bossjoueur = ['archer', 'guerrier', 'mage'];
    if (isHerosTurn) {
        const Choix = confirm(`Clique ok pour attaquer ou clique annuler pour défendre`);
        if (Choix) {
            console.log("Tu as décidé d'attaqué")
            if(bossSelected.mtnpv >= 0)
            {
                bossSelected.mtnpv = bossSelected.mtnpv - Math.floor(heros.archer.attack() + heros.guerrier.attack() + heros.mage.attack());
            }
           
            console.log("Voici la vie actuelle du boss " + bossSelected.mtnpv)
            console.log("Voici les dégats qu'il te fait " + bossSelected.pa)

            if (bossSelected.mtnpv <= bossSelected.pv * 0.2) {
                bossSelected.mtnpv = bossSelected.pv * 0.2;}
            heros.guerrier.ragePoints += 1;
            heros.archer.fleches += 1;

        } else{
            console.log("Tu as décidé de défendre")
            heros.archer.defense();
            console.log("L'archer s'est défendu et tu as autant de vie " + heros.archer.mtnpv);
            heros.guerrier.defense();
            console.log("Le guerrier s'est défendu et tu as autant de vie " + heros.guerrier.mtnpv);
            heros.mage.defense();
            console.log("Le mage est défendu et tu as autant de vie " + heros.mage.mtnpv);

            bossjoueur.push("archer", "archer", "guerrier", "guerrier", "mage", "mage")
        }

    } else {
         const currentTarget = Math.floor(Math.random() * bossjoueur.length);

            switch (bossjoueur[currentTarget]) {
                case 'archer':
                    heros.archer.mtnpv -= bossSelected.pa
                    break;
                case 'guerrier':
                    heros.guerrier.mtnpv -= bossSelected.pa
                    break;
                case 'mage':
                    heros.mage.mtnpv -= bossSelected.pa
                    break;
            }
            console.log(bossjoueur[currentTarget])
            console.table(heros);
            console.table(bossSelected)
        }

        if(areHerosDead(heros)){
            toto()
            alert("Vous avez perdu!")
        }
    isHerosTurn = !isHerosTurn;
}
function toto(){
        const finalAttack = bossSelected.pickEnigmes();
    
        let tentatives = 3;
        while (tentatives > 0 && !ResolvedRiddle) {
            let userAnswer = prompt(finalAttack.question);
    
            if (userAnswer === finalAttack.reponse) {
                ResolvedRiddle = true;
                alert(`Vous avez vaincu le boss`);
            } else {
                tentatives--;
            }
            if (tentatives === 0) {
                heros.archer.mtnpv = 0
                heros.guerrier.mtnpv = 0
                heros.mage.mtnpv = 0
            }
        }
}
