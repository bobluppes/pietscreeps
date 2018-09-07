const roleUpgrader = require('role.upgrader');

const roleHarvester = {
	/** @param {Creep} creep **/
	run: function(creep) {
		creep.identify();
		creep.fullState();
		creep.pos.x
		if (creep.memory.target && creep.memory.full) {
			let target = Game.getObjectById(creep.memory.target);
			if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
				creep.moveTo(target, {visualizePathStyle: {stroke: '#0000ff'}});
			} else if (creep.transfer(target, RESOURCE_ENERGY) !== OK) {
				creep.clearTargets();
			}
		} else if (!creep.memory.target && creep.memory.full) {
			let targets = creep.room.find(FIND_MY_STRUCTURES, {
				filter: (s) => {
					return (
						((s.structureType === STRUCTURE_SPAWN || s.structureType === STRUCTURE_EXTENSION || s.structureType === STRUCTURE_TOWER)
							&& s.energy < s.energyCapacity)
					);
				}
			});
			//MOVE TO TARGET
			if (targets.length) {
				targets = assignPriority(targets, 'extension', 'spawn', 'tower');
				targets = prioritizeType(targets);
				let target = creep.findClosest(targets);
				creep.memory.target = target.id;
				creep.memory.targetName = target.structureType;
			} else {
				roleUpgrader.run(creep);
			}
		}
		if (!creep.memory.full) {
			creep.getEnergy(true, true, true);
		}
	}
};

module.exports = roleHarvester;