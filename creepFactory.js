var creepFactory = {

    /** @param {Creep} creep **/
    run: function() {
      //For every spawn (ToDo)
      let spawn = Game.spawns['Spawn1'];

      //Check if we need to spawn
      if (spawn.spawnHarvesterIfNeeded() == 'NOT NEEDED') {
        if (spawn.spawnUpgraderIfNeeded() == 'NOT NEEDED') {
          if (spawn.spawnBuilderIfNeeded() == 'NOT NEEDED') {
            
          }
        }
      }

    }

};

module.exports = creepFactory;

// if(Game.spawns['Spawn1'].spawning) {
//     let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
//     Game.spawns['Spawn1'].room.visual.text(
//         '🛠️' + spawningCreep.memory.role,
//         Game.spawns['Spawn1'].pos.x + 1,
//         Game.spawns['Spawn1'].pos.y,
//         {align: 'left', opacity: 0.8});
// }