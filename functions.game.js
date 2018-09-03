lg = function (a) {
    console.log('log:::' + a)
};

pry = function () {
    console.log('>>>>>>>>>TOT HIER')
};

/** @function
 @param {string} targetFlag
 */
bouwClaimer = function (targetFlag = 'claimFlag1') {
    Game.spawns['Spawn2'].createClaimerCreep(targetFlag);
};

/** @function
 @param {object} targets
 @param {string} een
 @param {string} twee
 @param {string} drie
 @param {string} vier
 @param {string} vijf */
assignPriority = function (targets, een, twee, drie='', vier='', vijf='') {
    for (let i = 0; i < targets.length; i++) {
        switch (targets[i].structureType) {
            case een:
                targets[i].priority = 1;
                break;
            case twee:
                targets[i].priority = 2;
                break;
            case drie:
                targets[i].priority = 3;
                break;
            case vier:
                targets[i].priority = 4;
                break;
            case vijf:
                targets[i].priority = 5;
                break;
            default:
                targets[i].priority = 6;
                break;
        }
        // console.log(creep.name + ' target: ' + targets[i] + ' | type: ' + targets[i].structureType + ' | priority: ' + targets[i].priority);
    }
    return targets
};

/** @function
 @param {object} targets
 */
prioritizeType = function (targets) {
    targets.sort(function (a, b) {
        return a.priority - b.priority
    });
    //FIND CLOSEST INSTANCE OF HIGHEST PRIORITY STRUCTURETYPE (vaag als targets maar 1 object heeft)
    targets = _.filter(targets, (t) => t.structureType === targets[0].structureType);
    return targets
};

/** @function
 @param {object} targets
 */
findLowestHits = function (targets) {
    let hp = Infinity;
    // console.log('avg wall hits: ' + creep.structureTypeAvgHits(STRUCTURE_WALL) + ' wall targets: ' + targets);
    for (let i = 0; i < targets.length; i++) {
        // console.log(targets[i]);
        if (targets[i].hits < hp) {
            hp = targets[i].hits;
            target = targets[i];
        }
    }
    return target
};

unitCount = function() {
    let claimers = _.filter(Game.creeps, (creep) => creep.memory.role === 'claimer');
    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
    let builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');

    let repairers = _.filter(Game.creeps, (creep) => creep.memory.role === 'repairer');
    let miners = _.filter(Game.creeps, (creep) => creep.memory.role === 'miner');
    let haulers = _.filter(Game.creeps, (creep) => creep.memory.role === 'hauler');
    let wallers = _.filter(Game.creeps, (creep) => creep.memory.role === 'waller');
    let remoteHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'remoteHarvester');
    return {claimers, harvesters, upgraders, builders, repairers, miners, haulers, wallers, remoteHarvesters}
};