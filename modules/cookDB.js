// Status definitions
// craft = stepping stone material that is not the base material
// baseCraft = the base craft that is purchased from the marketplace
// buy = buy from market and used in production but not processing
// buy-craft = buy from market and used in processing
const cookDB = {
    'Beer': {
        mats: ['Leavening Agent', 'Mineral Water', 'Grain', 'Sugar'],
        matsReq: [2, 6, 5, 1],
        status: ['buy', 'buy', 'buy', 'buy'],
        proc: ['Cold Draft Beer'],
    },
    'Essence of Liquor': {
        mats: ['Flour', 'Strawberry', 'Leavening Agent'],
        matsReq: [1, 1, 1],
        status: ['single', 'buy', 'buy']
    },
    'Flour': {
        mats: ['Grain'],
        matsReq: [10],
        status: ['baseCraft']
    },
};

module.exports = cookDB;