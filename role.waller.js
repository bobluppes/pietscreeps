//REPAIR WALLS & RAMPARTS
const roleWaller = {
	/** @param {Creep} creep **/
	run:function(creep) {
		creep.identify();
		creep.fullState();

		if (creep.memory.repairTarget && creep.memory.full) {
			let target = Game.getObjectById(creep.memory.repairTarget);
			if (target.hits === target.hitsMax) {
				creep.clearTargets();
			} else if (creep.repair(target) === ERR_NOT_IN_RANGE) {
				creep.moveTo(target , {visualizePathStyle: {stroke: '#000000'}});
			}
		} else if (!creep.memory.repairTarget && creep.memory.full) {
			let targets = creep.room.find(FIND_STRUCTURES, {
				filter: (s) => {
					return (
						(s.structureType === STRUCTURE_RAMPART && s.hits < creep.structureTypeAvgHits(STRUCTURE_RAMPART) + 5)
						|| (s.structureType === STRUCTURE_WALL && s.hits < creep.structureTypeAvgHits(STRUCTURE_WALL) + 5)
					)
				}
			});
			let target = creep.pos.findClosestByPath(targets);
			creep.memory.repairTarget = target.id;
			creep.memory.targetName = target.structureType;

		} else {
			creep.getEnergy(true, true);
		}
	}
};

module.exports = roleWaller;