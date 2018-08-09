const roleUpgrader = require('role.upgrader');

//REPAIR WALLS & RAMPARTS
const roleWaller = {
    /** @param {Creep} creep **/
    run:function(creep) {

        //IDENTIFICATION
        if (Game.time % 5 === 0) {
            creep.say('🛡️');
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
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => {
                    return (
                        (s.structureType === STRUCTURE_RAMPART && s.hits < creep.avgHits() + 5)
                        || (s.structureType === STRUCTURE_WALL && s.hits < creep.avgHits(STRUCTURE_WALL)+ 5)
                    )
                }
            });
            let hp = Infinity;
            let target = false;
            // console.log('wall targets ' + targets);
            for (let i = 0; i < targets.length; i++) {
                // console.log(targets[i]);
                if (targets[i].hits < hp) {
                    hp = targets[i].hits;
                    target = targets[i];
                }
            }
            // console.log('waller target: ' + target + ' | type: ' + target.structureType + ' | hp: ' + hp);

            //MOVE TO TARGET
            if (target) {
                // console.log('rep: ' + target);
                if (creep.repair(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#000000'}});
                }
            } else {
                roleUpgrader.run(creep);
                creep.say('upg.rol');
            }
        } else {
            // creep.say('+.gE');
            creep.getEnergy(true, true, false);
        }

    }
};

module.exports = roleWaller;