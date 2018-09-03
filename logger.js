let logger = {
    /** @param {Creep} creep **/
    run: function() {

        let {claimers, harvesters, upgraders, builders, repairers, miners, haulers, wallers, remoteHarvesters} = unitCount();

        //ENERGY DATA
        let energyAvailable = Game.spawns['Spawn1'].room.energyAvailable;
        let energyCap = Game.spawns['Spawn1'].room.energyCapacityAvailable;

        //CONSOLE LOGGING
        for(let name in Game.rooms) {
            console.log('>>Energy in room ' + name + ': ' + energyAvailable + "/" + energyCap);
            console.log('>>Harvesters: ' + harvesters.length,' | Upgraders: ' + upgraders.length, ' | Builders: ' + builders.length,' | Repairers: ' + repairers.length,' | Miners: ' + miners.length,' | Haulers: ' + haulers.length,' | Wallers: ' + wallers.length, ' | remoteHarvesters: ' + remoteHarvesters.length,' | claimers: ' + claimers.length);
        }
    }
};


module.exports = logger;
