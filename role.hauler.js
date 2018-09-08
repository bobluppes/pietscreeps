const roleUpgrader = require('role.upgrader');

let roleHauler = {
	/** @param {Creep} creep **/
	run: function(creep) {
		creep.identify();
		creep.fullState();
		lg('ew' + Game.getObjectById(creep.memory.target));
		if (creep.memory.haulTarget && creep.memory.full) {
			let target = Game.getObjectById(creep.memory.haulTarget);
			// lg(target);

			if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
				creep.moveTo(target, {visualizePathStyle: {stroke: '#ff0009'}});
			} else if ( creep.transfer(target, RESOURCE_ENERGY) !== OK) {
				creep.clearTargets();
			}
		} else if (!creep.memory.haulTarget && creep.memory.full) {
			let targets = creep.room.find(FIND_MY_STRUCTURES, {
				filter: (s) => {
					return (
						(s.structureType === STRUCTURE_STORAGE
							&& s.storeCapacity - s.store.energy > 300)
						||
						((s.structureType === STRUCTURE_SPAWN || s.structureType === STRUCTURE_EXTENSION || s.structureType === STRUCTURE_TOWER)
							&& s.energy < s.energyCapacity)
					);
				}
			});
			if (targets.length) {
				targets = assignPriority(targets, 'tower', 'extension', 'spawn', 'storage');
				targets = prioritizeType(targets);
				let target = creep.findClosest(targets);
				creep.memory.haulTarget = target.id;
				creep.memory.targetName = target.structureType;
			} else {
				roleUpgrader.run(creep);
			}
		}
		if (!creep.memory.full) {
			// if (!creep.memory.noDropped) {
			//   creep.getDroppedEnergy()
			// } else {
				creep.getEnergy(false, true);
			//}
		}
	}
};

module.exports = roleHauler;
