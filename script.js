const hero = createKnight ('GaWarrior');

const monster = createSkeleton ();

stage.start(
    hero,
    monster,
    document.querySelector('#hero'),
    document.querySelector('#monster')
);