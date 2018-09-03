//noob code die ik online gevonden heb om onze remote unit op te basen

const roleRemoteHarvester = {

    /** @param {Creep} creep */
    run: function(creep) {
        //INIT
        //creep.clearTargets();
        creep.memory.home = Game.spawns['Spawn1'].room.name;
        let flag = Game.flags['remoteHarvest1'];
        // console.log('target rH: ' + flag + ", " + flag.name);
        if (flag && !creep.memory.targetFlag) {
            creep.memory.targetFlag = flag.name;
        }

        // if creep is bringing energy to a structure but has no energy left
        if (creep.memory.full && creep.carry.energy === 0) {
            // switch state
            creep.memory.full = false;
            creep.memory.targetFlag = false;
            creep.clearTargets();
        }
        // if creep is harvesting energy but is full
        else if (!creep.memory.full && creep.carry.energy === creep.carryCapacity) {
            // switch state
            creep.memory.full = true;
            creep.memory.targetFlag = false;
            creep.clearTargets();
        }

        if (creep.memory.full) {
            // Go back to home room & store energy
            // find exit to home room
            if (creep.room.name === creep.memory.home) {
                let structure = creep.room.storage;
                if (structure && creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            } else {
                // find exit to home room
                let exit = creep.room.findExitTo(creep.memory.home);
                // and move to exit
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        } else {
            let flagName = creep.memory.targetFlag;
            if (flagName) {
                let targetFlag = Game.flags[flagName];
                //console.log(flagName + ", " + targetFlag);
                if (targetFlag && creep.room !== targetFlag.room) {
                    creep.moveTo(targetFlag);
                } else {
                    creep.getEnergy(false, false, true);
                }
            }
        }
    }
};
module.exports = roleRemoteHarvester;
