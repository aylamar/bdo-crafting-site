# Lamar's BDO Crafting Site

This is my version of a BDO crafting calculator.

[![Node.js CI](https://github.com/aylamar/bdo-crafting-site/actions/workflows/node.js.yml/badge.svg)](https://github.com/aylamar/bdo-crafting-site/actions/workflows/node.js.yml)

## Installation

```bash
npm install
npm run start
```

## Accessing the site locally

Head to `localhost` in your browser, no port needed. Just wait ~60 seconds while all of the initial API calls are made before attempting to run any functions.

## Adding a new item to the crafting pages

1. Add to the `itemDB.js` file, along with any sub recipes if they don't exist already.
2. Import imges to the `/type/img` directory following the `lower-case-name.png` convention.
3. Add to `cookList.js` or `itemList.js`.

### itemDB.js definitions

- `mats` should contain all of the materials with capital letters as needed.
- `matsReq` should contain the quantity of each item above to craft or cook.
- `status` should be `buy`, `single`, `craft`, `buy-craft`, or `baseCraft`.
- `proc` should list the proc if there is any.
- `multiPart` should contain `true` for every required material minus one, the last should be `false`.

### Status definitions

- `buy`: used when buying the material straight from the market or a vendor
- `single` used when the item comes from a recipe or is used for crates, but not crafting.
- `craft` used when an item is made via crafting.
- `buy-craft` used when something should be bought from the marketplace, but is immediately used in a crafting recipe. IE: Steel.
- `baseCraft` used when this is the final step in a crafting recipe with no further crafting options.

### Example itemDB entry

```javascript
    'Item Name': {
        mats: ['Item One', 'Item Two', 'Item Three'],
        matsReq: [2, 1, 4],
        status: ['single', 'buy', 'craft'],
        proc: ['Item Proc Here If Any'],
        multiPart: [true, true, false]
    },
```

### cookList.js & itemList.js definitions

- `name` should be the item's name with capital letters as needed.
- `img` should be `img/item-name.png`, replacing `item-name` with the item's name in all lower case with dashes instead of slashes.
- `link` should be `/location/calc?item=Item_Name`, replace `Item_Name` with the item's name, replacing spaces with underscores.

### Example cookList.js & itemList.js entry

```javascript
    'Item Name' : {
        name: 'Item Name',
        img: "img/item-name.png",
        link: "/production/calc?item=Item_Name",
    },
```
