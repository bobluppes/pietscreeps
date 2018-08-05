const roleUpgrader = require('role.upgrader');

const roleHauler = {
    /** @param {Creep} creep **/
    run: function(creep) {

        //Identification
        if (Game.time % 5 === 0) {
            creep.say('🚛');
        }

        if(creep.memory.full && creep.carry.energy === 0) {
            creep.memory.full = false;
            creep.say('🔄 filling');
        }
        if(!creep.memory.full && creep.carry.energy === creep.carryCapacity) {
            creep.memory.full = true;
            creep.say('💯');
        }
        if(creep.memory.full) {
            // console.log('full hauler');

            let targets = creep.room.find(FIND_MY_STRUCTURES, {
                filter: (s) => {
                    return (
                        ((s.structureType === STRUCTURE_STORAGE || s.structureType === STRUCTURE_CONTAINER)
                            && s.storeCapacity - s.store.energy > 300)
                        ||
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
                        case 'tower':
                            targets[i].priority = 2;
                            break;
                        case 'extension':
                            targets[i].priority = 3;
                            break;
                        case 'container':
                            targets[i].priority = 4;
                            break;
                        case 'storage':
                            targets[i].priority = 5;
                            break;
                    }
                }
                // console.log('target: ' + targets[i] + ' | type: ' + targets[i].structureType + ' | priority: ' + targets[i].priority);
            }
            //sort by priority
            targets.sort(function (a, b) {
                return a.priority - b.priority
            });

            //TRANSFER
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ff0009'}});
                }
            } else {
                roleUpgrader.run(creep);
            }
        }
        if (!creep.memory.full) {
            let droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: (drop) => {
                    return (drop.resourceType === RESOURCE_ENERGY && drop.amount > 50)
                }
            });
            // PICKUP DROPPED ENERGY FIRST
            if(droppedEnergy.length > 0) {
                console.log('dropped: ' + droppedEnergy);
                if (creep.pickup(droppedEnergy[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedEnergy[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
                //THEN COME CONTAINERS
            } else {
            // creep.say('haul.gE');
            creep.getEnergy(false, true, false);
            }
        }
    }
};

module.exports = roleHauler;