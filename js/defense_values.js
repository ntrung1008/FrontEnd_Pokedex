let typeLocationMap = {
    'normal':0,
    'fight':1,
    'flying':2,
    'poison':3,
    'ground':4,
    'rock':5,
    'bug':6,
    'ghost':7,
    'steel':8,
    'fire':9,
    'water':10,
    'grass':11,
    'electric':12,
    'psychic':13,
    'ice':14,
    'dragon':15,
    'dark':16,
    'fairy':17
};

let defMatrix = [
    [1,1,1,1,1,.5,1,0,.5,1,1,1,1,1,1,1,1,1],
    [2,1,.5,.5,1,2,.5,0,2,1,1,14,1,.5,2,1,2,.5],
    [1,2,1,1,1,.5,2,1,.5,1,1,2,.5,1,1,1,1,1],
    [1,1,1,.5,.5,.5,1,.5,0,1,1,2,1,1,1,1,1,2],
    [1,1,0,2,1,2,.5,1,2,2,1,.5,2,1,1,1,1,1],
    [1,.5,2,1,.5,1,2,1,.5,2,1,1,1,1,2,1,1,1],
    [1,.5,.5,.5,1,1,1,.5,.5,.5,1,2,1,2,1,1,2,.5],
    [0,1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,.5,1],
    [1,1,1,1,1,2,1,1,.5,.5,.5,1,.5,1,2,1,1,2],
    [1,1,1,1,1,.5,2,1,2,.5,.5,2,1,1,2,.5,1,1],
    [1,1,1,1,2,2,1,1,1,2,.5,.5,1,1,1,.5,1,1],
    [1,1,.5,.5,2,2,.5,1,.5,.5,2,.5,1,1,1,.5,1,1],
    [1,1,2,1,0,1,1,1,1,1,2,.5,.5,1,1,.5,1,1],
    [1,2,1,2,1,1,1,1,.5,1,1,1,1,.5,1,1,0,1],
    [1,1,2,1,2,1,1,1,.5,.5,.5,2,1,1,.5,2,1,1],
    [1,1,1,1,1,1,1,1,.5,1,1,1,1,1,1,2,1,0],
    [1,.5,1,1,1,1,1,2,1,1,1,1,1,2,1,1,.5,.5],
    [1,2,1,.5,1,1,1,1,.5,.5,1,1,1,1,1,2,2,1]
]

function buildDefenseStats(types) {
    var defenseStatsMap = new Map();
    for (let i = 0; i < types.length; ++i) {
        typeName = types[i].type.name;
        typeRow = defMatrix[typeLocationMap.typeName];
        for (const [key, value] of typeLocationMap.entries()) {
            let multiplier = typeRow[value];
            if (defenseStatsMap.get(key)) {
                defenseStatsMap.set(key, (defenseStatsMap.get(key) * multiplier));
            }
            else {
                if (multiplier != 1) {
                    defenseStatsMap.set(key, multiplier);
                }
            }
        }     
    }
    return defenseStatsMap;
}

export {
    buildDefenseStats as buildDefenseStats
};