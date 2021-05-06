// Status definitions
// craft = stepping stone material that is not the base material
// baseCraft = the base craft that is purchased from the marketplace
// buy = buy from market and used in production but not processing
// buy-craft = buy from market and used in processing
const itemDB = {
    'Balenos Timber Crate': {
        mats: ['Black Stone Powder', 'Ash Plywood', 'Maple Plywood'],
        matsReq: [1, 5, 5],
        status: ['buy', 'single', 'single']
    },
    'Calpheon Timber Crate': {
        mats: ['Black Stone Powder', 'Birch Plywood', 'Cedar Plywood', 'Fir Plywood'],
        matsReq: [1, 5, 5, 5],
        status: ['buy', 'single', 'single', 'single']
    },
    'Serendia Timber Crate': {
        mats: ['Black Stone Powder', 'Maple Plywood', 'Pine Plywood'],
        matsReq: [1, 5, 5],
        status: ['buy', 'single', 'single']
    },
    'Mediah Timber Crate': {
        mats: ['Black Stone Powder', 'Acacia Plywood', 'White Cedar Plywood'],
        matsReq: [1, 5, 5],
        status: ['buy', 'single', 'single']
    },
    'Brass Ingot Crate': {
        mats: ['Black Stone Powder', 'Brass Ingot'],
        matsReq: [1, 10],
        status: ['buy', 'single']
    },
    'Bronze Ingot Crate': {
        mats: ['Black Stone Powder', 'Bronze Ingot'],
        matsReq: [1, 10],
        status: ['buy', 'single']
    },
    'Mythril Ingot Crate': {
        mats: ['Black Stone Powder', 'Mythril Ingot'],
        matsReq: [1, 10],
        status: ['buy', 'single']
    },
    'Steel Ingot Crate': {
        mats: ['Black Stone Powder', 'Steel'],
        matsReq: [1, 10],
        status: ['buy', 'single']
    },
    'Titanium Ingot Crate': {
        mats: ['Black Stone Powder', 'Titanium Ingot'],
        matsReq: [1, 10],
        status: ['buy', 'single']
    },
    'Vanadium Ingot Crate': {
        mats: ['Black Stone Powder', 'Vanadium Ingot'],
        matsReq: [1, 10],
        status: ['buy', 'single']
    },
    'Noc Ingot Crate': {
        mats: ['Black Stone Powder', 'Noc Ingot'],
        matsReq: [1, 10],
        status: ['buy', 'single']
    },
    'Advanced Alchemy Tool': {
        mats: ['Black Stone Powder', 'Polished Stone', 'Usable Scantling', 'Melted Iron Shard'],
        matsReq: [20, 30, 15, 24],
        status: ['buy', 'single', 'single', 'single']
    },
    'Advanced Cooking Utensil': {
        mats: ['Black Stone Powder', 'Polished Stone', 'Usable Scantling', 'Melted Iron Shard'],
        matsReq: [14, 20, 5, 20],
        status: ['buy', 'single', 'single', 'single']
    },
    'Polished Stone': {
        mats: ['Rough Stone'],
        matsReq: [10],
        status: ['baseCraft']
    },
    'Usable Scantling': {
        mats: ['Log'],
        matsReq: [10],
        status: ['baseCraft'],
        proc: ['Standardized Timber Square']
    },
    'Brass Ingot': {
        mats: ['Melted Copper Shard', 'Melted Zinc Shard'],
        matsReq: [5, 5],
        status: ['craft', 'craft'],
        multiPart: [true, false]
    },
    'Bronze Ingot': {
        mats: ['Melted Copper Shard', 'Melted Tin Shard'],
        matsReq: [5, 5],
        status: ['craft', 'craft'],
        multiPart: [true, false]
    },
    'Mythril Ingot': {
        mats: ['Melted Mythril Shard'],
        matsReq: [10],
        status: ['craft'],
    },
    'Noc Ingot': {
        mats: ['Melted Noc Shard'],
        matsReq: [10],
        status: ['craft'],
    },
    'Steel': {
        mats: ['Melted Iron Shard', 'Coal'],
        matsReq: [5, 5],
        status: ['craft', 'buy-craft'],
        multiPart: [true, false]
    },
    'Titanium Ingot': {
        mats: ['Melted Titanium Shard'],
        matsReq: [10],
        status: ['craft']
    },
    'Vanadium Ingot': {
        mats: ['Melted Vanadium Shard'],
        matsReq: [10],
        status: ['craft']
    },
    'Melted Copper Shard': {
        mats: ['Copper Ore'],
        matsReq: [5],
        proc: ['Copper Ingot'],
        status: ['baseCraft']
    },
    'Melted Iron Shard': {
        mats: ['Iron Ore'],
        matsReq: [5],
        proc: ['Iron Ingot'],
        status: ['baseCraft']
    },
    'Melted Mythril Shard': {
        mats: ['Mythril'],
        matsReq: [5],
        proc: ['Mythril Ingot'],
        status: ['baseCraft']
    },
    'Melted Noc Shard': {
        mats: ['Noc Ore'],
        matsReq: [5],
        proc: ['Noc Ingot'],
        status: ['baseCraft']
    },
    'Melted Tin Shard': {
        mats: ['Tin Ore'],
        matsReq: [5],
        proc: ['Tin Ingot'],
        status: ['baseCraft']
    },
    'Melted Titanium Shard': {
        mats: ['Titanium Ore'],
        matsReq: [5],
        proc: ['Titanium Ingot'],
        status: ['baseCraft']
    },
    'Melted Vanadium Shard': {
        mats: ['Vanadium Ore'],
        matsReq: [5],
        proc: ['Vanadium Ingot'],
        status: ['baseCraft']
    },
    'Melted Zinc Shard': {
        mats: ['Zinc Ore'],
        matsReq: [5],
        proc: ['Zinc Ingot'],
        status: ['baseCraft']
    },
    'Acacia Plywood': {
        mats: ['Acacia Plank'],
        matsReq: [10],
        status: ['craft']
    },
    'Acacia Plank': {
        mats: ['Acacia Timber'],
        matsReq: [5],
        proc: ['Acacia Plywood'],
        status: ['baseCraft']
    },
    'Ash Plywood': {
        mats: ['Ash Plank'],
        matsReq: [10],
        status: ['craft']
    },
    'Ash Plank': {
        mats: ['Ash Timber'],
        matsReq: [5],
        proc: ['Ash Plywood'],
        status: ['baseCraft']
    },
    'Birch Plywood': {
        mats: ['Birch Plank'],
        matsReq: [10],
        status: ['craft']
    },
    'Birch Plank': {
        mats: ['Birch Timber'],
        matsReq: [5],
        proc: ['Birch Plywood'],
        status: ['baseCraft']
    },
    'Cedar Plywood': {
        mats: ['Cedar Plank'],
        matsReq: [10],
        status: ['craft']
    },
    'Cedar Plank': {
        mats: ['Cedar Timber'],
        matsReq: [5],
        proc: ['Cedar Plywood'],
        status: ['baseCraft']
    },
    'Fir Plywood': {
        mats: ['Fir Plank'],
        matsReq: [10],
        status: ['craft']
    },
    'Fir Plank': {
        mats: ['Fir Timber'],
        matsReq: [5],
        proc: ['Fir Plywood'],
        status: ['baseCraft']
    },
    'Maple Plywood': {
        mats: ['Maple Plank'],
        matsReq: [10],
        status: ['craft']
    },
    'Maple Plank': {
        mats: ['Maple Timber'],
        matsReq: [5],
        proc: ['Maple Plywood'],
        status: ['baseCraft']
    },
    'Pine Plywood': {
        mats: ['Pine Plank'],
        matsReq: [10],
        status: ['craft']
    },
    'Pine Plank': {
        mats: ['Pine Timber'],
        matsReq: [5],
        proc: ['Pine Plywood'],
        status: ['baseCraft']
    },
    'White Cedar Plywood': {
        mats: ['White Cedar Plank'],
        matsReq: [10],
        status: ['craft']
    },
    'White Cedar Plank': {
        mats: ['White Cedar Timber'],
        matsReq: [5],
        proc: ['White Cedar Plywood'],
        status: ['baseCraft']
    }
};

module.exports = itemDB;