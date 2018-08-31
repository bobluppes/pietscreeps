let creepFactory = {
    run: function() {

        //screep population checking
        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
        let builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');

        let repairers = _.filter(Game.creeps, (creep) => creep.memory.role === 'repairer');
        let miners = _.filter(Game.creeps, (creep) => creep.memory.role === 'miner');
        let haulers = _.filter(Game.creeps, (creep) => creep.memory.role === 'hauler');
        let wallers = _.filter(Game.creeps, (creep) => creep.memory.role === 'waller');
        let remoteHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'remoteHarvester');

        //SETTINGS DEPENDING ON GAME STAGE
        let room = Game.spawns['Spawn1'].room;
        let MinEnergyToSpawn = Math.min((room.energyCapacityAvailable - 300),800);

        // //ENERGY DATA
        // var energyAvailable = Game.spawns['Spawn1'].room.energyAvailable;
        // var energyCap = Game.spawns['Spawn1'].room.energyCapacityAvailable;
        // var containers = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}})

        //SPAWNING
        if (harvesters.length < 2 && room.energyAvailable > 299) {
            Game.spawns['Spawn1'].createBalancedCreep(room.energyAvailable, 'harvester');
        }
        else if (miners.length < 2 && room.energyAvailable > 550) {
            Game.spawns['Spawn1'].createMinerCreep();
        }
        else if (upgraders.length < 3 && room.energyAvailable > MinEnergyToSpawn) {
            Game.spawns['Spawn1'].createBalancedCreep(room.energyAvailable, 'upgrader');
        }
        else if (builders.length < 2 && room.energyAvailable > MinEnergyToSpawn) {
            Game.spawns['Spawn1'].createBalancedCreep(room.energyAvailable, 'builder');
        }
        else if (repairers.length < 1 && room.energyAvailable > MinEnergyToSpawn) {
            Game.spawns['Spawn1'].createBalancedCreep(room.energyAvailable, 'repairer');
        }
        else if (miners.length < 2 && room.energyAvailable > MinEnergyToSpawn) {
            Game.spawns['Spawn1'].createMinerCreep();
        }
        else if (haulers.length < 2 && room.energyAvailable > MinEnergyToSpawn) {
            Game.spawns['Spawn1'].createHaulerCreep(room.energyAvailable);
        }
        else if (wallers.length < 2 && room.energyAvailable > MinEnergyToSpawn) {
            Game.spawns['Spawn1'].createBalancedCreep(room.energyAvailable, 'waller');
        }
        else if (remoteHarvesters.length < 4 && room.energyAvailable > MinEnergyToSpawn) {
            Game.spawns['Spawn1'].createRemoteHarvesterCreep(room.energyAvailable);
        }

        if(Game.spawns['Spawn1'].spawning) {
            let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        }
    }
};

module.exports = creepFactory;


// var creepFactory = {
//
//     /** @param {Creep} creep **/
//     run: function() {
//       //For every spawn (ToDo)
//       let spawn = Game.spawns['Spawn1'];
//
//       //Check if we need to spawn
//       if (spawn.spawnHarvesterIfNeeded() == 'NOT NEEDED') {
//         if (spawn.spawnUpgraderIfNeeded() == 'NOT NEEDED') {
//           if (spawn.spawnBuilderIfNeeded() == 'NOT NEEDED') {
//
//           }
//         }
//       }
//
//     }
//
// };
//
// module.exports = creepFactory;

// if(Game.spawns['Spawn1'].spawning) {
//     let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
//     Game.spawns['Spawn1'].room.visual.text(
//         '🛠️' + spawningCreep.memory.role,
//         Game.spawns['Spawn1'].pos.x + 1,
//         Game.spawns['Spawn1'].pos.y,
//         {align: 'left', opacity: 0.8});
// }