const roleUpgrader = require('role.upgrader');

let roleHauler = {
    /** @param {Creep} creep **/
    run: function(creep) {
        creep.identify();
        creep.fullState();

        if (creep.memory.haulTarget && creep.memory.full) {
            let target = Game.getObjectById(creep.memory.haulTarget);
            if (creep.transfer(target, RESOURCE_ENERGY) === ERR_FULL) {
                creep.memory.haulTarget = false;
            } else if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ff0009'}});
            }
        } else if (!creep.memory.haulTarget && creep.memory.full) {
            let targets = creep.room.find(FIND_MY_STRUCTURES, {
                filter: (s) => {
                    return (
                        (s.structureType === STRUCTURE_STORAGE
                            && s.storeCapacity - s.store.energy > 300)
                        ||
                        ((s.structureType === STRUCTURE_SPAWN || s.structureType === STRUCTURE_EXTENSION || s.structureType === STRUCTURE_TOWER)
                            && s.energy < s.energyCapacity)
                    );
                }
            });
            if (targets.length) {
                assignPriority(targets, 'tower', 'extension', 'spawn', 'storage');
                prioritizeType(targets);

                let target = creep.pos.findClosestByPath(targets);
                if (!target) {
                    target = targets[0];
                }
                //console.log('target: ' + target + ' | targets: ' + targets);
                creep.memory.haulTarget = target.id;
                creep.memory.targetName = target.structureType;

            } else {
                roleUpgrader.run(creep);
            }
        }
        if (!creep.memory.full) {
            creep.getEnergy(false, true, false);
        }
    }
};

module.exports = roleHauler;