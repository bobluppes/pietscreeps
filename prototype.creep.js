Creep.prototype.lg = function(a) {
	console.log(this.name + ' :::: ' + a)
};


/** @function
 @param {boolean} useStorage
 @param {boolean} useContainer */
//TODO: dropped energy for remote harvesters
Creep.prototype.getEnergy = 	function (useStorage, useContainer) {
  //this.clearTargets();
	if (this.memory.target) {
    //console.log(this.name + ' gets E from: ' + Game.getObjectById(this.memory.target));
		let target = Game.getObjectById(this.memory.target);
		if (target instanceof  Resource) {
      console.log(this.name + ' gets E from: ' + Game.getObjectById(this.memory.target));
      if (this.pickup(target) === ERR_NOT_IN_RANGE) {
        this.moveTo(target, {reusePath: 10, visualizePathStyle: {stroke: '#0bff00'}});
      } else if (this.pickup(target) !== OK) {
        this.clearTargets();
        console.log('hauler clear energy target');
      }
		} else if (target instanceof  Structure && (target.structureType === STRUCTURE_STORAGE || target.structureType === STRUCTURE_CONTAINER)) {
      if (this.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        this.moveTo(target, {reusePath: 10, visualizePathStyle: {stroke: '#0bff00'}});
      } else if (this.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_ENOUGH_RESOURCES) {
        this.clearTargets();
      }
		} else {
      if (this.harvest(target) === ERR_NOT_IN_RANGE) {
        this.moveTo(target, {reusePath: 10, visualizePathStyle: {stroke: '#00ff23'}});
      } else if (this.harvest(target) === ERR_NOT_ENOUGH_RESOURCES) {
        this.clearTargets();
      }
		}
  } else if (useStorage && this.room.storage && this.room.storage.store.energy > this.carryCapacity) {
		this.memory.target = this.room.storage.id;
    console.log(this.name + ' chose: ' + Game.getObjectById(this.memory.target));
  } else {
		let target = false;
		if (useContainer) {
      switch (this.memory.role) {
        case 'hauler':
          let containers = this.room.find(FIND_STRUCTURES, {
            filter: s => (s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > this.carryCapacity)
          });
          target = containers.sort(function (a, b) {
            return b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]
          })[0];
          if (target) {
            let foundEnergy = target.pos.lookFor(LOOK_ENERGY);
            if (foundEnergy.length) {
              console.log('there is left over energy on my container');
              target = foundEnergy[0];
            }
					}
          break;
        default:
          target = this.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: s => (s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0)});
          break;
      }
    }
		if (target) {
			this.memory.target = target.id;
      console.log(this.name + ' chose: ' + Game.getObjectById(this.memory.target));
		} else {
      let source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
      if (source) {
        this.memory.target = source.id;
        console.log(this.name + ' chose: ' + Game.getObjectById(this.memory.target));
      }
		}
	}

};

Creep.prototype.getDroppedEnergy =
	function () {
		if (this.memory.target) {
			if (this.pickup(Game.getObjectById(this.memory.target)) === ERR_NOT_IN_RANGE) {
				this.moveTo(Game.getObjectById(this.memory.target));
			}
		} else {
			let dropped = this.pos.findClosestByPath(FIND_DROPPED_ENERGY, {
				filter: s => ( s.amount > this.carryCapacity)
			});
			if (dropped){
				this.memory.target = dropped.id;
			}
			if (!this.memory.target) {
				this.memory.noDropped = true;
			}
		}
	};

Creep.prototype.fullState =
	function () {
		if (this.memory.full && this.carry.energy === 0) {
			this.memory.full = false;
			this.clearTargets();
			this.say('🔄');
		}
		if (!this.memory.full && this.carry.energy === this.carryCapacity) {
			this.memory.full = true;
			this.clearTargets();
			this.say('💯');
		}
	};

/** @function
 */
Creep.prototype.clearTargets =
	function () {
		this.memory.target = false;
		this.memory.targetName = false;
		delete this.memory.targetFlag;
		delete this.memory.noDropped;

		delete  this.memory.buildTarget;
		delete  this.memory.haulTarget;
		delete  this.memory.repairTarget;
		this.say('clear');
	};

/** @function
 @param {string} structureType
 */
Creep.prototype.structureTypeAvgHits =
	function (structureType) {

		let hitsTot = 0;
		let structures = this.room.find(FIND_STRUCTURES, {
			filter: (s) => (s.structureType === structureType)
		});
		// console.log('found ' + structures);
		for(let structure in structures) {
			// console.log('la ' + structures[structure].hits);
			hitsTot += structures[structure].hits
		}
		return hitsTot/structures.length
	};

Creep.prototype.findMostProgressed = function (targets) {
  targets.sort(function (a, b) {
    return a.progress - b.progress
  });
	if (targets.length > 3) {
		targets = targets.splice(2)
	}
  return this.pos.findClosestByPath(targets)
};


Creep.prototype.identify =
	function () {
		if (Game.time % 5 === 0) {
			switch (this.memory.role) {
				case 'builder':
					this.say('🔨');
					break;
				case 'harvester':
					this.say('🌾');
					break;
				case 'hauler':
					this.say('🚛');
					break;
				case 'miner':
					this.say('⛏');
					break;
				case 'remoteHarvester':
					this.say('🚛 🌾');
					break;
				case 'repairer':
					this.say('🔧️');
					break;
				case 'upgrader':
					this.say('⚡');
					break;
				case 'waller':
					this.say('🛡️');
					break;
			}
		}
	};

/** @function
 @param {object} targets
 */
Creep.prototype.findClosest =
	function (targets) {
		let target = this.pos.findClosestByPath(targets);
		//pos.findClosestByPath acts weird if it's only 1 long
		if (!target) {
			target = targets[0];
		}
		return target
	};





// BOBSHITE

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
//HEB HIER MET CAS EVEN AAN ZITTEN KLOOIEN MAAR BEETJE VAAG
Creep.prototype.popContainer = function(creep) {
	if (creep.pos.findInRange(FIND_CONSTRUCTION_SITES, 2, {filter: {structureType: STRUCTURE_CONTAINER}}).length == 0) {
		if (creep.room.createConstructionSite(creep.pos, STRUCTURE_CONTAINER) === ERR_INVALID_TARGET) {
		let obstruction = creep.pos.findInRange(FIND_CONSTRUCTION_SITES, 1);
		if (obstruction.length == 0) {
			obstruction = creep.pos.findInRange(FIND_STRUCTURES, 1);
		}
		obstruction[0].destroy();
		}
	}
	let container = creep.pos.findInRange(FIND_CONSTRUCTION_SITES, 2, {filter: {structureType: STRUCTURE_CONTAINER}});
	if (creep.build(container[0]) == -7) {
		creep.move(LEFT);
	}
};

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
