const roleUpgrader = require('role.upgrader');

//REPAIR WALLS & RAMPARTS
const roleWaller = {
    /** @param {Creep} creep **/
    run:function(creep) {

        //IDENTIFICATION
        if (Game.time % 5 === 0) {
            creep.say('🛡️');
        }
        //CHECK INVENTORY
        if (creep.memory.full && creep.carry.energy === 0) {
            creep.memory.full = false;
            creep.memory.target = false;
            creep.say('🔄 get');
        }
        if (!creep.memory.full && creep.carry.energy === creep.carryCapacity) {
            creep.memory.full = true;
            creep.memory.target = false;
            creep.say('💯');

        }

        if (creep.memory.target && creep.memory.full) {
            // console.log('rep: ' + target);
            let target = Game.getObjectById(creep.memory.target);
            if (creep.repair(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#000000'}});
            }
        } else if (!creep.memory.target && creep.memory.full) {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => {
                    return (
                        (s.structureType === STRUCTURE_RAMPART && s.hits < creep.avgHits(STRUCTURE_RAMPART) + 5)
                        || (s.structureType === STRUCTURE_WALL && s.hits < creep.avgHits(STRUCTURE_WALL) + 5)
                    )
                }
            });
            let hp = Infinity;
            let target = false;
            // console.log('avg wall hits: ' + creep.avgHits(STRUCTURE_WALL) + ' wall targets: ' + targets);
            for (let i = 0; i < targets.length; i++) {
                // console.log(targets[i]);
                if (targets[i].hits < hp) {
                    hp = targets[i].hits;
                    target = targets[i];
                }
            }
            // console.log('waller target: ' + target + ' | type: ' + target.structureType + ' | hp: ' + hp);
            creep.memory.target = target.id;
        } else {
            // creep.say('+.gE');
            creep.getEnergy(true, true, false);
        }
    }
};

module.exports = roleWaller;