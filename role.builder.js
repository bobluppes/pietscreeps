const roleRepairer = require('role.repairer');

let roleBuilder = {
    target: false,

    /** @param {Creep} creep **/
    run: function(creep) {

        //Identification
        if (Game.time % 5 === 0) {
            creep.say('🔨');
        }

        if (creep.memory.full && creep.carry.energy === 0) {
            creep.memory.full = false;
            creep.clearGetEnergyTargets();
            creep.say('🔄 get');
        }
        if (!creep.memory.full && creep.carry.energy === creep.carryCapacity) {
            creep.memory.full = true;
            creep.clearGetEnergyTargets();
            creep.say('🚧 build');
        }

        if (creep.memory.target && creep.memory.full) {
            //console.log('build: ' + Game.getObjectById(creep.memory.target));
            if (creep.build(Game.getObjectById(creep.memory.target)) === ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.target), {visualizePathStyle: {stroke: '#fffe00'}});
            }
        } else if (!creep.memory.target && creep.memory.full) {
            let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            // Memory.constructionAvailable = targets.length;
            //console.log(' | targets: ' + targets);
            if (targets.length) {
                //console.log('targets had een waarde');
                for (let i = 0; i < targets.length; i++) {
                    switch (targets[i].structureType) {
                        case 'tower':
                            targets[i].priority = 1;
                            // console.log('extension');
                            break;
                        case 'extension':
                            targets[i].priority = 2;
                            // console.log('extension');
                            break;
                        case 'container':
                            targets[i].priority = 3;
                            // console.log('extension');
                            break;
                        case 'road':
                            targets[i].priority = 4;
                            break;
                        case 'constructedWall':
                            targets[i].priority = 5;
                            break;
                        default:
                            targets[i].priority = 6;
                            break;
                    }
                    // console.log('i: ' + targets[i] + ' | type: ' + targets[i].structureType + ' | priority: ' + targets[i].priority);
                }
                //console.log(targets)
                //SORT BY PRIORITY
                targets.sort(function (a, b) {
                    return a.priority - b.priority
                });
                targets = _.filter(targets, (t) => t.structureType === targets[0].structureType);
                let target = creep.pos.findClosestByPath(targets);
                if (!target) {
                    target = targets[0];
                }
                //console.log('target: ' + target + ' | targets: ' + targets);
                creep.memory.target = target.id;

            } else {
                roleRepairer.run(creep);
                // creep.say('rep.role');
            }
        } else {
            // creep.say('b.gE');
            creep.getEnergy(true, true, true);
        }
    }
};

module.exports = roleBuilder;
