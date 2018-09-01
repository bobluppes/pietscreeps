const roleRepairer = require('role.repairer');

let roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
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
                prioritizeType(targets);
                creep.findClosest(targets);
                //console.log('target: ' + target + ' | targets: ' + targets);
                creep.memory.buildTarget = target.id;
                creep.memory.targetName = target.structureType;

            } else {
                roleRepairer.run(creep);
            }
        } else {
            creep.getEnergy(true, true, true);
        }
    }
};

module.exports = roleBuilder;
