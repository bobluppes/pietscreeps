const roleUpgrader = require('role.upgrader');

let roleRepairer = {
    /** @param {Creep} creep **/
    run:function(creep) {
        creep.identify();
        creep.fullState();

        if (creep.memory.repairTarget && creep.memory.full) {
            let target = Game.getObjectById(creep.memory.repairTarget);
            //lg(Game.getObjectById(creep.memory.repairTarget));
            if (target) {
                if (target.hits === target.hitsMax) {
                    creep.clearTargets();
                } else if (creep.repair(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                creep.clearTargets();
            }

        } else if (!creep.memory.repairTarget && creep.memory.full) {
            //SETTINGS: HP FALLS BELOW X FROM MAX TO START REPAIRS
            let roadHP = 1000;
            let containerHP = 1000;
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => {
                    return (
                        ((s.structureType === 'container' || s.structureType === 'storage') && s.hitsMax - s.hits > containerHP)
                        || (s.structureType === 'road' && s.hitsMax - s.hits > roadHP)
                        || (s.structureType === 'rampart' && creep.structureTypeAvgHits(STRUCTURE_RAMPART) - s.hits > 2000)
                        || (s.structureType === 'constructedWall' && s.hits < creep.structureTypeAvgHits(STRUCTURE_WALL))
                    )   // DIT FILTER MOET ONDERSCHEID MAKEN TUSSEN CONTAINERS, WALL en RAMPARTS VOOR HOEVEEL HITS HIJ GEREPT MOET WORDEN
                }
            });
            if (targets.length) {
                assignPriority(targets, 'container', 'storage', 'road', 'rampart', 'constructedWall');
                prioritizeType(targets);
                let target = findLowestHits(targets);
                // if (!target) {
                //     target = targets[0];
                // }
                //console.log('target: ' + target + ' | targets: ' + targets);
                creep.memory.repairTarget = target.id;
                creep.memory.targetName = target.structureType;
            } else {
                roleUpgrader.run(creep);
            }
        } else {
            creep.getEnergy(true, true, true);
        }
    }
};

module.exports = roleRepairer;