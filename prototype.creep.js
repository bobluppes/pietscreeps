//Harvest the source with the source id saved in memory
//Creep -> memory -> source -> [#id]
//When full, drop all energy into nearby container
Creep.prototype.harvestOwnSource = function(creep) {
    //Find source object from id in creep memory
    let source = Game.getObjectById(creep.memory.source);

    //Harvest source or move to it if not in range
    if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
    //Dump energy into nearby container (will not move)
    if(creep.carry.energy == creep.carryCapacity) {
        var container = creep.pos.findInRange(FIND_STRUCTURES, 2, {
          filter: { structureType: STRUCTURE_CONTAINER }
        });
        creep.transfer(container[0], RESOURCE_ENERGY, creep.carry.energy);
    }
}

//Pop a container next to the source to dump energy
Creep.prototype.popContainer = function(creep) {
  if (creep.pos.findInRange(FIND_CONSTRUCTION_SITES, 2, {filter: {structureType: STRUCTURE_CONTAINER}}).length == 0) {
      if (creep.room.createConstructionSite(creep.pos, STRUCTURE_CONTAINER) == -7) {
        var obstruction = creep.pos.findInRange(FIND_CONSTRUCTION_SITES, 1);
        if (obstruction.length == 0) {
          obstruction = creep.pos.findInRange(FIND_STRUCTURES, 1);
        }
        obstruction.destroy();
      }
  }
  var container = creep.pos.findInRange(FIND_CONSTRUCTION_SITES, 2, {filter: {structureType: STRUCTURE_CONTAINER}});
  if (creep.build(container[0]) == -7) {
      creep.move(LEFT);
  }
}

//Harvest any given source object
Creep.prototype.harvestSource = function(creep, source) {

}

Creep.prototype.transferTarget = function(creep) {
  if (creep.transfer(creep.memory.target) == ERR_NOT_IN_RANGE) {
    creep.moveTo(creep.memory.target, {visualizePathStyle: {stroke: '#ffaa00'}});
  }
  creep.memory.target = NULL;
}

//----------
//TARGETING
//----------

Creep.prototype.targetTower = function(creep) {
  let towers = creep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
  towers.sort(function (a, b) {return a.energy - b.energy});
  creep.memory.target = towers[0];
}
