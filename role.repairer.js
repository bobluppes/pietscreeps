const roleUpgrader = require('role.upgrader');

let roleRepairer = {
    /** @param {Creep} creep **/
    run:function(creep) {
        //creep.clearTargets();
        creep.identify();
        creep.fullState();

        if (creep.memory.repairTarget && creep.memory.full) {
            let target = Game.getObjectById(creep.memory.repairTarget)
            if (target.hits === target.hitsMax) {
                creep.clearTargets();
            } else if (creep.repair(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
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
                // for (let i = 0; i < targets.length; i++) {
                //     switch (targets[i].structureType) {
                //         case 'container':
                //             targets[i].priority = 1;
                //             break;
                //         case 'storage':
                //             targets[i].priority = 2;
                //             break;
                //         case 'road':
                //             targets[i].priority = 3;
                //             break;
                //         case 'rampart':
                //             targets[i].priority = 4;
                //             break;
                //         case 'constructedWall':
                //             targets[i].priority = 5;
                //             break;
                //         default:
                //             targets[i].priority = 6;
                //             break;
                //     }
                //     // console.log(creep.name + ' target: ' + targets[i] + ' | type: ' + targets[i].structureType + ' | priority: ' + targets[i].priority);
                // }

                // targets.sort(function (a, b) {
                //     return a.priority - b.priority
                // });
                prioritize(targets);

                //FIND CLOSEST INSTANCE OF HIGHEST PRIORITY STRUCTURETYPE (vaag als targets maar 1 object heeft)
                // targets = _.filter(targets, (t) => t.structureType === targets[0].structureType);

                findLowestHits(targets);

                let target = creep.pos.findClosestByPath(targets);
                if (!target) {
                    target = targets[0];
                }
                //console.log('target: ' + target + ' | targets: ' + targets);
                creep.memory.repairTarget = target.id;
            } else {
                roleUpgrader.run(creep);
            }
        } else {
            creep.getEnergy(true, true, true);
        }
    }
};

module.exports = roleRepairer;