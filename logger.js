let logger = {

    /** @param {Creep} creep **/
    run: function() {
        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
        let builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');

        let repairers = _.filter(Game.creeps, (creep) => creep.memory.role === 'repairer');
        let miners = _.filter(Game.creeps, (creep) => creep.memory.role === 'miner');
        let haulers = _.filter(Game.creeps, (creep) => creep.memory.role === 'hauler');
        let wallers = _.filter(Game.creeps, (creep) => creep.memory.role === 'waller');

        //Energy data
        let energyAvailable = Game.spawns['Spawn1'].room.energyAvailable;
        let energyCap = Game.spawns['Spawn1'].room.energyCapacityAvailable;

        //console info
        for(let name in Game.rooms) {
            console.log('>>Energy in room ' + name + ': ' + energyAvailable + "/" + energyCap);
            console.log('>>Harvesters: ' + harvesters.length,' | Upgraders: ' + upgraders.length, ' | Builders: ' + builders.length,' | Repairers: ' + repairers.length,' | Miners: ' + miners.length,' | Haulers: ' + haulers.length,' | Wallers: ' + wallers.length);
        }
        // console.log("Energy: " + energyAvailable + "/" + energyCap);

    }
};


module.exports = logger;
