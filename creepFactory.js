var creepFactory = {

    /** @param {Creep} creep **/
    run: function() {

        //Retrieve amount of creeps per role
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
        var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');

        //Energy data
        var energyAvailable = Game.spawns['Spawn1'].room.energyAvailable;
        var energyCap = Game.spawns['Spawn1'].room.energyCapacityAvailable;
        var containers = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});

        if (energyCap <= 600 || harvesters.length < 2) {
          if (harvesters.length < 2) {
            var newName = 'Harvester' + Game.time;
            var body = this.calcBody('harvester');
            Game.spawns['Spawn1'].spawnCreep(body, newName, {memory: {role:'harvester',building:false}});
          } else if (upgraders.length < 1) {
            console.log('should make upgrader');
            var newName = 'Upgrader' + Game.time;
            var body = this.calcBody('upgrader');
            Game.spawns['Spawn1'].spawnCreep(body, newName, {memory: {role:'upgrader',building:false}});
          } else if (builders.length < 1) {
            var newName = 'Builder' + Game.time;
            var body = this.calcBody('builder');
            Game.spawns['Spawn1'].spawnCreep(body, newName, {memory: {role:'builder',building:false}});
          } else if(repairers.length < 2) {
            var newName = 'Repairer' + Game.time;
            var body = this.calcBody('repairer');
            Game.spawns['Spawn1'].spawnCreep(body, newName, {memory: {role:'repairer',building:false}});
          } else {
            //Spawn is vol, alternate
            if (builders.length > upgraders.length) {
              var newName = 'Upgrader' + Game.time;
              var body = this.calcBody('upgrader');
              Game.spawns['Spawn1'].spawnCreep(body, newName, {memory: {role:'upgrader',building:false}});
            } else {
              var newName = 'Builder' + Game.time;
              var body = this.calcBody('builder');
              Game.spawns['Spawn1'].spawnCreep(body, newName, {memory: {role:'builder',building:false}});
            }
          }
        } else {
          //Build drop miners and haulers
          if (miners.length < 1) {
            var newName = 'Miner' + Game.time;
            var assignedSource = this.assignSource();
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, CARRY], newName, {memory: {role:'miner',building:false, source:assignedSource}});
          }  else if (haulers.length < 1 && containers.length >= 1) {
            var newName = 'Hauler' + Game.time;
            var body = this.calcBody('hauler');
            Game.spawns['Spawn1'].spawnCreep(body, newName, {memory: {role:'hauler',building:false}});
          } else if (upgraders.length < 1) {
            var newName = 'Upgrader' + Game.time;
            var body = this.calcBody('upgrader');
            Game.spawns['Spawn1'].spawnCreep(body, newName, {memory: {role:'upgrader',building:false}});
          } else if (builders.length < 1) {
            var newName = 'Builder' + Game.time;
            var body = this.calcBody('builder');
            Game.spawns['Spawn1'].spawnCreep(body, newName, {memory: {role:'builder',building:false}});
          } else if (repairers.length < 2) {
            var newName = 'Repairer' + Game.time;
            var body = this.calcBody('repairer');
            Game.spawns['Spawn1'].spawnCreep(body, newName, {memory: {role:'repairer',building:false}});
          } else if (miners.length < 2) {
            var newName = 'Miner' + Game.time;
            var assignedSource = this.assignSource();
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, CARRY], newName, {memory: {role:'miner',building:false, source:assignedSource}});
          } else if (haulers.length < 2 && containers.length >= 2) {
            var newName = 'Hauler' + Game.time;
            var body = this.calcBody('hauler');
            Game.spawns['Spawn1'].spawnCreep(body, newName, {memory: {role:'hauler',building:false}});
          } else {
            //Spawn is vol, alternate
            if (builders.length > upgraders.length) {
              var newName = 'Upgrader' + Game.time;
              var body = this.calcBody('upgrader');
              Game.spawns['Spawn1'].spawnCreep(body, newName, {memory: {role:'upgrader',building:false}});
            } else {
              var newName = 'Builder' + Game.time;
              var body = this.calcBody('builder');
              Game.spawns['Spawn1'].spawnCreep(body, newName, {memory: {role:'builder',building:false}});
            }
          }

        }

    },

    assignSource: function() {
      var sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);

      if (_.filter(Game.creeps, (creep) => creep.memory.source == sources[0].id).length == 0) {
        return sources[0].id;
      } else if (_.filter(Game.creeps, (creep) => creep.memory.source == sources[1].id).length == 0) {
        return sources[1].id;
      }
    },

    calcBody: function(role) {
      var energyAvailable = Game.spawns['Spawn1'].room.energyAvailable;
      var body = [];

      switch(role) {
        case 'harvester':
          body.push(WORK);
          body.push(WORK);
          body.push(MOVE);
          body.push(CARRY);
          var extraParts = Math.floor((energyAvailable - 300)/200);
          for (var i = 0; i < extraParts; i++) {
            body.push(WORK);
            body.push(MOVE);
            body.push(CARRY);
          }
          break;
        case 'hauler':
           body.push(CARRY);
           body.push(CARRY);
           body.push(CARRY);
           body.push(MOVE);
           body.push(MOVE);
           body.push(MOVE);
           var extraParts = Math.floor((energyAvailable - 300)/200);
           for (var i = 0; i < extraParts; i++) {
             body.push(CARRY);
             body.push(CARRY);
             body.push(MOVE);
             body.push(MOVE);
           }
          break;
        case 'upgrader':
        case 'builder':
        case 'repairer':
          body.push(WORK);
          body.push(WORK);
          body.push(MOVE);
          body.push(CARRY);
          var extraParts = Math.floor((energyAvailable - 300)/200);
          for (var i = 0; i < extraParts; i++) {
            body.push(WORK);
            body.push(MOVE);
            body.push(CARRY);
          }
          break;
      }

      return body;
    }
};

module.exports = creepFactory;