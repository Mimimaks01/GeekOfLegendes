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
}
