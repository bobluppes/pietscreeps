const roleRepairer = require('role.repairer');

let roleBuilder = {
    target: false,

    /** @param {Creep} creep **/
    run: function(creep) {

        //Identification
        creep.identify();

        creep.fullState();

        if (creep.memory.buildTarget && creep.memory.full) {
            //console.log('build: ' + Game.getObjectById(creep.memory.buildTarget));
            if (creep.build(Game.getObjectById(creep.memory.buildTarget)) === ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.buildTarget), {visualizePathStyle: {stroke: '#fffe00'}});
            } else if (creep.build(Game.getObjectById(creep.memory.buildTarget)) !== OK) {
                creep.clearTargets();
            }
        } else if (!creep.memory.buildTarget && creep.memory.full) {
            let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            // Memory.constructionAvailable = targets.length;
            //console.log(' | targets: ' + targets);
            if (targets.length) {
                assignPriority(targets, 'tower', 'extension', 'container', 'road', 'constructedWall');
                //console.log('targets had een waarde');
                // for (let i = 0; i < targets.length; i++) {
                //     switch (targets[i].structureType) {
                //         case 'tower':
                //             targets[i].priority = 1;
                //             // console.log('extension');
                //             break;
                //         case 'extension':
                //             targets[i].priority = 2;
                //             // console.log('extension');
                //             break;
                //         case 'container':
                //             targets[i].priority = 3;
                //             // console.log('extension');
                //             break;
                //         case 'road':
                //             targets[i].priority = 4;
                //             break;
                //         case 'constructedWall':
                //             targets[i].priority = 5;
                //             break;
                //         default:
                //             targets[i].priority = 6;
                //             break;
                //     }
                //     // console.log('i: ' + targets[i] + ' | type: ' + targets[i].structureType + ' | priority: ' + targets[i].priority);
                // }
                prioritize(targets);
                //SORT BY PRIORITY
                // targets.sort(function (a, b) {
                //     return a.priority - b.priority
                // });
                // targets = _.filter(targets, (t) => t.structureType === targets[0].structureType);
                let target = creep.pos.findClosestByPath(targets);
                if (!target) {
                    target = targets[0];
                }
                //console.log('target: ' + target + ' | targets: ' + targets);
                creep.memory.buildTarget = target.id;

            } else {
                roleRepairer.run(creep);
            }
        } else {
            creep.getEnergy(true, true, true);
        }
    }
};

module.exports = roleBuilder;
