const roleUpgrader = require('role.upgrader');

//REPAIR WALLS & RAMPARTS
const roleWaller = {
    /** @param {Creep} creep **/
    run:function(creep) {
        creep.clearTargets();
        creep.identify();
        creep.fullState();

        if (creep.memory.wallTarget && creep.memory.full) {
            //console.log('rep: ' + Game.getObjectById(creep.memory.wallTarget );
            if (creep.repair(Game.getObjectById(creep.memory.wallTarget)) === ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.wallTarget) , {visualizePathStyle: {stroke: '#000000'}});
            }
        } else if (!creep.memory.wallTarget && creep.memory.full) {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => {
                    return (
                        (s.structureType === STRUCTURE_RAMPART && s.hits < creep.structureTypeAvgHits(STRUCTURE_RAMPART) + 5)
                        || (s.structureType === STRUCTURE_WALL && s.hits < creep.structureTypeAvgHits(STRUCTURE_WALL) + 5)
                    )
                }
            });
            let target = false;
            findLowestHits(targets);
            // let hp = Infinity;
            // let target = false;
            // // console.log('avg wall hits: ' + creep.structureTypeAvgHits(STRUCTURE_WALL) + ' wall targets: ' + targets);
            // for (let i = 0; i < targets.length; i++) {
            //     // console.log(targets[i]);
            //     if (targets[i].hits < hp) {
            //         hp = targets[i].hits;
            //         target = targets[i];
            //     }
            // }
            // console.log('waller target: ' + target + ' | type: ' + target.structureType + ' | hp: ' + hp);
            creep.memory.wallTarget = target.id;
        } else {
            // creep.say('+.gE');
            creep.getEnergy(true, true, false);
        }
    }
};

module.exports = roleWaller;