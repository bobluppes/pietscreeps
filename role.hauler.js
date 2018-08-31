const roleUpgrader = require('role.upgrader');

const roleHauler = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // creep.memory.home = Game.creeps[creep.name].room.name;

        //Identification
        if (Game.time % 5 === 0) {
            creep.say('🚛');
        }

        if(creep.memory.full && creep.carry.energy === 0) {
            creep.memory.full = false;
            creep.memory.target = false;
            creep.say('🔄 filling');
        }
        if(!creep.memory.full && creep.carry.energy === creep.carryCapacity) {
            creep.memory.full = true;

            creep.say('💯');
        }

        if (creep.memory.target && creep.memory.full) {
            // console.log('rep: ' + target);
            let target = Game.getObjectById(creep.memory.target);
            if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ff0009'}});
            }
            if (creep.transfer(target, RESOURCE_ENERGY) === ERR_FULL) {
                creep.memory.target = false;
            }
        } else if (!creep.memory.target && creep.memory.full) {
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
            if (targets) {
                for (let i = 0; i < targets.length; i++) {
                    // console.log('targett: ' + targets[target].structureType);
                    if (targets[i].energy < targets[i].energyCapacity) {
                        switch (targets[i].structureType) {
                            case 'tower':
                                targets[i].priority = 1;
                                break;
                            case 'extension':
                                targets[i].priority = 2;
                                break;
                            case 'spawn':
                                targets[i].priority = 3;
                                break;
                            case 'storage':
                                targets[i].priority = 4;
                                break;
                        }
                    }
                    //console.log(creep.name + ' target: ' + targets[i] + ' | type: ' + targets[i].structureType + ' | priority: ' + targets[i].priority);
                }
                //SORT BY PRIORITY
                targets.sort(function (a, b) {
                    return a.priority - b.priority
                });

                //FIND CLOSEST INSTANCE OF HIGHEST PRIORITY STRUCTURETYPE (vaag als targets maar 1 object heeft)
                targets = _.filter(targets, (t) => t.structureType === targets[0].structureType);
                //console.log(targets.length);
                let target = creep.pos.findClosestByPath(targets);
                if (!target) {
                    target = targets[0];
                }
                //console.log('target: ' + target + ' | targets: ' + targets);
                creep.memory.target = target.id;
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