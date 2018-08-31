const roleRepairer = require('role.repairer');

const roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {

        //Identification
        if (Game.time % 5 === 0) {
            creep.say('🔨');
        }

        if(creep.memory.full && creep.carry.energy === 0) {
            creep.memory.full = false;
            creep.say('🔄 get');
        }
        if(!creep.memory.full && creep.carry.energy === creep.carryCapacity) {
            creep.memory.full = true;
            creep.say('🚧 build');
            creep.clearGetEnergyTargets();
        }
        if(creep.memory.full) {
            let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            // Memory.constructionAvailable = targets.length;

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

            //SORT BY PRIORITY
            targets.sort(function (a, b) {
                return a.priority - b.priority
            });
            // console.log('sorted: ' + targets);

            //MOVE TO TARGET
            if (targets.length > 0) {
                // console.log('Construct: ' + targets[0]);
                if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#fffe00'}});
                }
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
