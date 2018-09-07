const roleMiner = {
	/** @param {Creep} creep **/
	run: function (creep) {
		creep.identify();

		if (!creep.memory.source) {
      assignSource = function () {
        let sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
        console.log(sources);

        if (_.filter(Game.creeps, (creep) => creep.memory.source == sources[0].id).length == 0) {
          return sources[0].id;
        } else if (_.filter(Game.creeps, (creep) => creep.memory.source == sources[1].id).length == 0) {
          return sources[1].id;
        }
      };
      creep.memory.source = assignSource();
		}

		let source = Game.getObjectById(creep.memory.source);
		// console.log(source);
		let container;
		// find container next to source
		let containers = source.pos.findInRange(FIND_STRUCTURES, 1, {
			filter: s => s.structureType === STRUCTURE_CONTAINER
		});
		if (containers.length === 0) {
			container = source.pos.findInRange(FIND_CONSTRUCTION_SITES, 1, {
				filter: s => s.structureType === STRUCTURE_CONTAINER
			})[0];
		} else {
			container = containers[0];
		}
		if (container) {
			if (creep.pos.isEqualTo(container.pos)) {
				creep.harvest(source);
			} else {
				creep.moveTo(container);
			}
		}

	}
};

module.exports = roleMiner;
