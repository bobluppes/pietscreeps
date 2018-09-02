let roleClaimer = {
    /** @param {Creep} creep **/
    run: function(creep) {
        let flag = Game.flags['remoteHarvest1'];

        creep.identify();

        let flagName = creep.memory.targetFlag;
        if (flagName) {
            let targetFlag = Game.flags[flagName];
            //console.log(flagName + ", " + targetFlag);
            if (targetFlag && creep.room !== targetFlag.room) {
                creep.moveTo(targetFlag);
            } else {
                creep.getEnergy(false, false, true);
            }


        if (target) {
            if (creep.claimController(Game.rooms[target].controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.rooms[target].controller, {visualizePathStyle: {stroke: '#ddefff'}})
            }
        }



    }

};

module.exports = roleClaimer;
