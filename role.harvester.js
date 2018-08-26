const roleUpgrader = require('role.upgrader');

const roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {

        // let avgHits = creep.avgHits(STRUCTURE_WALL);
        // console.log('bieb ' + avgHits);

        //Identification
        if (Game.time % 5 === 0) {
            creep.say('🌾');
        }

        if(creep.memory.full && creep.carry.energy === 0) {
            creep.memory.full = false;
            creep.say('🔄 get');
        }
        if(!creep.memory.full && creep.carry.energy === creep.carryCapacity) {
            creep.memory.full = true;
            creep.say('💯');
        }

        if(creep.memory.full) {
            // let priority = ['spawn', 'extension', 'container', ]
            let targets = creep.room.find(FIND_MY_STRUCTURES, {
                filter: (s) => {
                    return (
                        ((s.structureType === STRUCTURE_SPAWN || s.structureType === STRUCTURE_EXTENSION || s.structureType === STRUCTURE_TOWER)
                            && s.energy < s.energyCapacity)
                    );
                }
            });

            for (let i = 0; i < targets.length; i++) {
                // console.log('targett: ' + targets[target].structureType);
                if (targets[i].energy < targets[i].energyCapacity) {
                    switch (targets[i].structureType) {
                        case 'spawn':
                            targets[i].priority = 1;
                            // console.log('extension');
                            break;
                        case 'extension':
                            targets[i].priority = 2;
                            break;
                        case 'tower':
                            targets[i].priority = 3;
                            break;
                    }
                }
                // console.log('target: ' + targets[i] + ' | type: ' + targets[i].structureType + ' | priority: ' + targets[i].priority);
            }

            //SORT BY PRIORITY
            targets.sort(function (a, b) {
                return a.priority - b.priority
            });

            //MOVE TO TARGET
            if(targets.length) {
                // console.log('typeOf ' + typeof targets + ' : ' + targets);
                let target = creep.pos.findClosestByPath(targets.slice(0,2)); // kies the closest target
                // console.log('target ' + target + ' targets ' + targets);
                // console.log(creep.name + 'target: ' + target + ' | type: ' + target.structureType + ' | priority: ' + target.priority);
                if(creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#0000ff'}});
                }
            } else {
                roleUpgrader.run(creep);
            }
        }
        if (!creep.memory.full) {
            // creep.say('haul.gE');
            creep.getEnergy(true, true, true);
        }
    }
};

module.exports = roleHarvester;