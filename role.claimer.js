let roleClaimer = {
    /** @param {Creep} creep **/
    run: function(creep) {
        creep.identify();

        let targetFlag = Game.flags[creep.memory.targetFlag];
        if (targetFlag) {
            if (creep.room !== targetFlag.room) {
                creep.moveTo(targetFlag);
            } else if (creep.room === targetFlag.room) {
                let target = targetFlag.room.controller;
                if (creep.claimController(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ddefff'}})
                }
            }
        }
    }
};

module.exports = roleClaimer;
