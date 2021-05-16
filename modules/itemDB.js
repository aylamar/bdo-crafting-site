// Status definitions
// craft = stepping stone material that is not the base material
// baseCraft = the base craft that is purchased from the marketplace
// buy = buy from market and used in production but not processing
const itemDB = {
    "Guru's Cooking Box - Balenos Meal": {
        mats: ['Balenos Meal'],
        status: ['single'],
        matsReq: [24],
        multiPart: [false]
    },
    "Guru's Cooking Box - Calpheon Meal": {
        mats: ['Calpheon Meal'],
        status: ['single'],
        matsReq: [18],
        multiPart: [false]
    },
    "Guru's Cooking Box - Kamasylvia Meal": {
        mats: ['Kamasylvia Meal'],
        status: ['single'],
        matsReq: [33],
        multiPart: [false]
    },
    "Guru's Cooking Box - Mediah Meal": {
        mats: ['Mediah Meal'],
        status: ['single'],
        matsReq: [15],
        multiPart: [false]
    },
    "Guru's Cooking Box - O'dyllita Meal": {
        mats: ["O'dyllita Meal"],
        status: ['single'],
        matsReq: [15],
        multiPart: [false]
    },
    "Guru's Cooking Box - Serendia Meal": {
        mats: ['Serendia Meal'],
        status: ['single'],
        matsReq: [21],
        multiPart: [false]
    },
    "Guru's Cooking Box - Valencia Meal": {
        mats: ['Valencia Meal'],
        status: ['single'],
        matsReq: [18],
        multiPart: [false]
    },
    'Balenos Meal': {
        mats: ['Beer', 'Cheese Gratin', 'Meat Croquette', 'Smoked Fish Steak', 'Stir-Fried Vegetables'],
        matsReq: [2, 1, 1, 1, 2],
        status: ['single', 'single', 'single', 'single', 'single'],
        proc: ['Special Balenos Meal'],
        multiPart: [true, true, true, true, false]
    },
    'Calpheon Meal': {
        mats: ['Cheese Pie', 'Fish Fillet Salad', 'Meat Pasta', 'Milk Tea', 'Soft Bread'],
        matsReq: [1, 1, 1, 1, 2],
        status: ['single', 'single', 'single', 'single', 'single'],
        proc: ['Special Calpheon Meal'],
        multiPart: [true, true, true, true, false]
    },
    'Kamasylvia Meal': {
        mats: ['Rainbow Button Mushroom Sandwich', 'Coconut Pasta', 'Fig Pie', 'Fruit Wine', 'Rainbow Button Mushroom Cheese Melt'],
        matsReq: [1, 1, 1, 2, 1],
        status: ['single', 'single', 'single', 'single', 'single'],
        proc: ['Special Kamasylvia Meal'],
        multiPart: [true, true, true, true, false]
    },
    'Margoria Seafood Meal': {
        mats: ['Butter-Roasted Lobster', 'Fruit Wine', 'Prawn Salad', 'Steamed Prawn', 'Pan-Fried Oyster'],
        matsReq: [1, 2, 1, 1, 1],
        status: ['single', 'single', 'single', 'single', 'single'],
        multiPart: [true, true, true, true, false]
    },
    'Mediah Meal': {
        mats: ['Dark Pudding', 'Exotic Herbal Wine', 'Grilled Sausage', 'Lean Meat Salad', 'Oatmeal'],
        matsReq: [1, 2, 2, 1, 1],
        status: ['single', 'single', 'single', 'single', 'single'],
        proc: ['Special Mediah Meal'],
        multiPart: [true, true, true, true, false]
    },
    "O'dyllita Meal": {
        mats: ['Delotia Pudding', 'Stir-Fried Bracken and Meat', 'Delotia Juice', 'Chicken Breast Salad', 'Stir-Fried Bird'],
        matsReq: [1, 1, 2, 2, 2],
        status: ['single', 'single', 'single', 'single', 'single'],
        proc: ["Special O'dyllita Meal"],
        multiPart: [true, true, true, true, false]
    },
    'Serendia Meal': {
        mats: ['Honeycomb Cookie', 'Boiled Bird Eggs', 'Fruit Wine', 'Ham Sandwich', 'Meat Pie'],
        matsReq: [1, 2, 2, 1, 1],
        status: ['single', 'single', 'single', 'single', 'single'],
        proc: ['Special Serendia Meal'],
        multiPart: [true, true, true, true, false]
    },
    'Valencia Meal': {
        mats: ['Couscous', 'Date Palm Wine', 'Fig Pie', 'King of Jungle Hamburg', 'Teff Sandwich'],
        matsReq: [1, 2, 2, 1, 1],
        status: ['single', 'single', 'single', 'single', 'single'],
        proc: ['Special Valencia Meal'],
        multiPart: [true, true, true, true, false]
    },
    'Pan-Fried Oyster': {
        mats: ['Egg', 'Olive Oil', 'Oyster', 'Vinegar', 'Flour'],
        matsReq: [2, 3, 3, 2, 5],
        status: ['buy', 'buy', 'buy', 'single', 'craft'],
        proc: ['Aromatic Pan-Fried Oyster'],
        multiPart: [true, true, true, true, false],
    },
    'Steamed Prawn': {
        mats: ['Cooking Wine', 'Hot Pepper', 'Mineral Water', 'Paprika', 'Shrimp'],
        matsReq: [3, 2, 4, 6, 4],
        status: ['buy', 'buy', 'buy', 'buy', 'buy'],
        proc: ['Hearty Steamed Prawn'],
        multiPart: [true, true, true, true, false],
    },
    'Prawn Salad': {
        mats: ['Egg', 'Fruit And Vegetable Salad', 'Olive Oil', 'Salt', 'Shrimp'],
        matsReq: [3, 2, 3, 2, 2],
        status: ['buy', 'single', 'buy', 'buy', 'buy'],
        proc: ['Sweet and Sour Prawn Salad'],
        multiPart: [true, true, true, true, false],
    },
    'Fruit And Vegetable Salad': {
        mats: ['Vinegar', 'Strawberry', 'Paprika', 'Shrimp'],
        matsReq: [1, 4, 4, 2],
        status: ['single', 'buy', 'buy', 'buy'],
        proc: ['Fresh Fruit and Vegetable Salad'],
        multiPart: [true, true, true, false],
    },
    'Butter-Roasted Lobster': {
        mats: ['Butter', 'Garlic', 'Dried Lobster', 'Olive Oil', 'Salt'],
        matsReq: [4, 3, 2, 5, 5],
        status: ['craft', 'buy', 'buy', 'buy', 'buy'],
        proc: ['Golden Butter-Roasted Lobster'],
        multiPart: [true, true, true, true, false],
    },
    'Dark Pudding': {
        mats: ['Chicken Meat', 'Wolf Blood', 'Oatmeal', 'Pickled Vegetables'],
        matsReq: [5, 7, 1, 1],
        status: ['buy', 'buy', 'single', 'single'],
        proc: ['Bloody Dark Pudding'],
        multiPart: [true, true, true, false],
    },
    'Lean Meat Salad': {
        mats: ['Dressing', 'Pepper', 'Wolf Meat', 'Vinegar'],
        matsReq: [4, 3, 8, 2],
        status: ['single', 'buy', 'buy', 'single'],
        proc: ['Top Grade Lean Meat Salad'],
        multiPart: [true, true, true, false],
    },
    'Grilled Bird Meat': {
        mats: ['Chicken Meat', 'Deep Frying Oil', 'Cooking Wine', 'Salt'],
        matsReq: [2, 6, 2, 1],
        status: ['buy', 'buy', 'buy', 'buy'],
        proc: ['Steaming Hot Grilled Bird Meat'],
        multiPart: [true, true, true, false],
    },
    'Delotia Juice': {
        mats: ['Delotia', 'Strawberry', 'Sugar', 'Purified Water'],
        matsReq: [4, 5, 3, 3],
        status: ['buy', 'buy', 'buy', 'buy'],
        proc: ['Chilled Delotia Juice'],
        multiPart: [true, true, true, false],
    },
    'Stir-Fried Bracken and Meat': {
        mats: ['Bracken', 'Garlic', 'Mineral Water', 'Olive Oil', 'Wolf Meat'],
        matsReq: [3, 3, 5, 2, 6],
        status: ['buy', 'buy', 'buy', 'buy', 'buy'],
        proc: ['Light Stir-Fried Bracken and Meat'],
        multiPart: [true, true, true, true, false],
    },
    'Chicken Breast Salad': {
        mats: ['Chicken Meat', 'Strawberry', 'Paprika', 'Cooking Wine', 'Vinegar'],
        matsReq: [5, 5, 5, 2, 1],
        status: ['buy', 'buy', 'buy', 'buy', 'single'],
        proc: ['Fresh Chicken Breast Salad'],
        multiPart: [true, true, true, true, false],
    },
    'Stir-Fried Bird': {
        mats: ['Chicken Meat', 'Grain', 'Onion', 'Olive Oil'],
        matsReq: [5, 5, 3, 2],
        status: ['buy', 'buy', 'buy', 'buy'],
        proc: ['Savory Stir-Fried Bird'],
        multiPart: [true, true, true, false],
    },
    'Delotia Pudding': {
        mats: ['Delotia', 'Wolf Blood', 'Honey Wine', 'Oatmeal', 'Purified Water'],
        matsReq: [5, 7, 2, 1, 3],
        status: ['buy', 'buy', 'single', 'single', 'buy'],
        proc: ['Blood Red Delotia Pudding'],
        multiPart: [true, true, true, true, false],
    },
    'Honey Wine': {
        mats: ['Essence of Liquor', 'Cooking Honey', 'Mineral Water', 'Sugar'],
        matsReq: [2, 3, 6, 2],
        status: ['single', 'buy', 'buy', 'buy'],
        proc: ['Tangy Honey Wine'],
        multiPart: [true, true, true, false],
    },
    'Oatmeal': {
        mats: ['Flour', 'Cooking Honey', 'Milk', 'Onion'],
        matsReq: [9, 2, 3, 3],
        status: ['craft', 'buy', 'buy', 'buy'],
        proc: ['Refined Oatmeal'],
        multiPart: [true, true, true, false],
    },
    'Couscous': {
        mats: ['Freekeh Snake Stew', 'Nutmeg', 'Teff Flour Dough', 'Paprika'],
        matsReq: [1, 3, 6, 4],
        status: ['single', 'buy', 'craft', 'buy'],
        proc: ['Classic Couscous'],
        multiPart: [true, true, true, false]
    },
    'Date Palm Wine': {
        mats: ['Date Palm', 'Essence of Liquor', 'Leavening Agent', 'Sugar'],
        matsReq: [5, 2, 4, 1],
        status: ['buy', 'single', 'buy', 'buy'],
        proc: ['Mild Date Palm Wine'],
        multiPart: [true, true, true, false]
    },
    'King of Jungle Hamburg': {
        mats: ['Lion Meat', 'Nutmeg', 'Pickled Vegetables', 'Teff Bread'],
        matsReq: [4, 3, 2, 4],
        status: ['buy', 'buy', 'single', 'single'],
        proc: ['Jumbo King of Jungle Hamburg'],
        multiPart: [true, true, true, false]
    },
    'Pickled Vegetables': {
        mats: ['Leavening Agent', 'Sugar', 'Paprika', 'Vinegar'],
        matsReq: [2, 2, 8, 4],
        status: ['buy', 'buy', 'buy', 'single'],
        proc: ['Sweet and Sour Pickled Vegetable'],
        multiPart: [true, true, true, false]
    },
    'Teff Sandwich': {
        mats: ['Freekeh Snake Stew', 'Grilled Scorpion', 'Red Sauce', 'Teff Bread'],
        matsReq: [1, 1, 3, 1],
        status: ['single', 'single', 'single', 'single'],
        proc: ['Spicy Teff Sandwich'],
        multiPart: [true, true, true, false]
    },
    'Freekeh Snake Stew': {
        mats: ['Freekeh', 'Mineral Water', 'Snake Meat', 'Star Anise'],
        matsReq: [6, 5, 3, 2],
        status: ['buy', 'buy', 'buy', 'buy'],
        proc: ['Thick Freekeh Snake Stew'],
        multiPart: [true, true, true, false]
    },
    'Grilled Scorpion': {
        mats: ['Butter', 'Hot Pepper', 'Nutmeg', 'Scorpion Meat'],
        matsReq: [2, 3, 3, 3],
        status: ['craft', 'buy', 'buy', 'buy'],
        proc: ['Crispy Grilled Scorpion'],
        multiPart: [true, true, true, false]
    },
    'Teff Bread': {
        mats: ['Leavening Agent', 'Mineral Water', 'Salt', 'Teff Flour'],
        matsReq: [2, 3, 2, 5],
        status: ['buy', 'buy', 'buy', 'craft'],
        proc: ['Spongy Teff Bread'],
        multiPart: [true, true, true, false]
    },
    'Honeycomb Cookie': {
        mats: ['Dough', 'Egg', 'Cooking Honey', 'Milk'],
        matsReq: [1, 3, 6, 1],
        status: ['craft', 'buy', 'buy', 'buy'],
        proc: ['Crispy Honeycomb Cookie'],
        multiPart: [true, true, true, false]
    },
    'Boiled Bird Eggs': {
        mats: ['Cooking Wine', 'Egg', 'Mineral Water', 'Salt'],
        matsReq: [1, 3, 6, 1],
        status: ['buy', 'buy', 'buy', 'buy'],
        proc: ['Appealing Boiled Bird Eggs'],
        multiPart: [true, true, true, false]
    },
    'Ham Sandwich': {
        mats: ['Egg', 'Grilled Sausage', 'Soft Bread', 'Paprika'],
        matsReq: [4, 2, 2, 5],
        status: ['buy', 'single', 'single', 'buy'],
        proc: ['High-Quality Ham Sandwich'],
        multiPart: [true, true, true, false]
    },
    'Meat Pie': {
        mats: ['Dough', 'Olive Oil', 'Wolf Meat', 'Sugar'],
        matsReq: [6, 2, 4, 2],
        status: ['craft', 'buy', 'buy', 'buy'],
        proc: ['Lean Meat Pie'],
        multiPart: [true, true, true, false]
    },
    'Rainbow Button Mushroom Sandwich': {
        mats: ['Rainbow Button Mushroom', 'Soft Bread', 'Cream', 'Onion', 'Olive Oil'],
        matsReq: [1, 1, 2, 2, 4],
        status: ['buy', 'single', 'craft', 'buy', 'buy'],
        proc: ['Sweet Rainbow Button Mushroom Sandwich'],
        multiPart: [true, true, true, true, false]
    },
    'Coconut Pasta': {
        mats: ['Coconut', 'Dough', 'Garlic', 'Onion', 'White Sauce'],
        matsReq: [2, 5, 4, 2, 1],
        status: ['buy', 'craft', 'buy', 'buy', 'single'],
        proc: ['Sweet Coconut Pasta'],
        multiPart: [true, true, true, true, false]
    },
    'White Sauce': {
        mats: ['Base Sauce', 'Cooking Wine', 'Strawberry', 'Milk'],
        matsReq: [1, 2, 1, 1],
        status: ['buy', 'buy', 'buy', 'buy'],
        multiPart: [true, true, true, false]
    },
    'Fig Pie': {
        mats: ['Dough', 'Fig', 'Olive Oil', 'Sugar'],
        matsReq: [3, 5, 2, 3],
        status: ['craft', 'buy', 'buy', 'buy'],
        proc: ['Sweet Fig Pie'],
        multiPart: [true, true, true, false]
    },
    'Fruit Wine': {
        mats: ['Essence of Liquor', 'Exotic Herbal Wine', 'Strawberry', 'Mineral Water'],
        matsReq: [3, 1, 5, 2],
        status: ['single', 'single', 'buy', 'buy'],
        proc: ['Luscious Fruit Wine'],
        multiPart: [true, true, true, false]
    },
    'Exotic Herbal Wine': {
        mats: ['Dough', 'Essence of Liquor', 'Leavening Agent', 'Mineral Water'],
        matsReq: [3, 1, 2, 5],
        status: ['craft', 'single', 'buy', 'buy'],
        proc: ['Full-Bodied Exotic Herbal Wine'],
        multiPart: [true, true, true, false]
    },
    'Rainbow Button Mushroom Cheese Melt': {
        mats: ['Rainbow Button Mushroom', 'Wolf Meat', 'Cheese', 'Salt', 'Olive Oil'],
        matsReq: [1, 2, 2, 3, 4],
        status: ['buy', 'buy', 'craft', 'buy', 'buy'],
        proc: ['Mild Rainbow Button Mushroom Cheese Melt'],
        multiPart: [true, true, true, true, false]
    },
    'Cheese Pie': {
        mats: ['Butter', 'Cheese', 'Dough', 'Egg'],
        matsReq: [3, 7, 5, 3],
        status: ['craft', 'craft', 'craft', 'buy'],
        proc: ['High-Quality Cheese Pie'],
        multiPart: [true, true, true, false]
    },
    'Fish Fillet Salad': {
        mats: ['Cheese', 'Dressing', 'Dried Mullet', 'Onion'],
        matsReq: [2, 2, 2, 3],
        status: ['craft', 'single', 'buy', 'buy'],
        proc: ['Fresh Fish Fillet Salad'],
        multiPart: [true, true, true, false]
    },
    'Dressing': {
        mats: ['Egg', 'Mineral Water', 'Olive Oil', 'Salt'],
        matsReq: [1, 1, 1, 2],
        status: ['buy', 'buy', 'buy', 'buy'],
        multiPart: [true, true, true, false]
    },
    'Meat Pasta': {
        mats: ['Dough', 'Garlic', 'Pepper', 'Wolf Meat'],
        matsReq: [4, 2, 3, 5],
        status: ['craft', 'buy', 'buy', 'buy'],
        proc: ['Spaghetti alla Bolognese'],
        multiPart: [true, true, true, false]
    },
    'Milk Tea': {
        mats: ['Flour', 'Cooking Honey', 'Milk', 'Tea With Fine Scent'],
        matsReq: [2, 3, 3, 2],
        status: ['craft', 'buy', 'buy', 'single'],
        proc: ['Smooth Milk Tea'],
        multiPart: [true, true, true, false]
    },
    'Tea With Fine Scent': {
        mats: ['Special Sunflower', 'Strawberry', 'Cooking Honey', 'Mineral Water'],
        matsReq: [2, 4, 3, 7],
        status: ['buy', 'buy', 'buy', 'buy'],
        proc: ['Tea With Strong Scent'],
        multiPart: [true, true, true, false]
    },
    'Soft Bread': {
        mats: ['Dough', 'Egg', 'Leavening Agent', 'Milk'],
        matsReq: [6, 2, 2, 3],
        status: ['craft', 'buy', 'buy', 'buy'],
        proc: ['Moist Milk Bread'],
        multiPart: [true, true, true, false]
    },
    'Cheese Gratin': {
        mats: ['Cheese', 'Dough', 'Grilled Sausage', 'Red Sauce', 'Paprika'],
        matsReq: [3, 5, 1, 3, 4],
        status: ['craft', 'craft', 'single', 'single', 'buy'],
        proc: ['Chewy Cheese Gratin'],
        multiPart: [true, true, true, true, false]
    },
    'Grilled Sausage': {
        mats: ['Onion', 'Pepper', 'Wolf Meat', 'Salt'],
        matsReq: [1, 2, 6, 2],
        status: ['buy', 'buy', 'buy', 'buy'],
        proc: ['Smoked Sausage'],
        multiPart: [true, true, true, false]
    },
    'Red Sauce': {
        mats: ['Base Sauce', 'Mineral Water', 'Wolf Meat', 'Sugar'],
        matsReq: [1, 2, 1, 2],
        status: ['buy', 'buy', 'buy', 'buy'],
        multiPart: [true, true, true, false]
    },
    'Meat Croquette': {
        mats: ['Cheese', 'Deep Frying Oil', 'Egg', 'Flour', 'Wolf Meat'],
        matsReq: [2, 4, 2, 5, 8],
        status: ['craft', 'buy', 'buy', 'craft', 'buy'],
        proc: ['Crispy Meat Croquette'],
        multiPart: [true, true, true, true, false]
    },
    'Butter': {
        mats: ['Cream', 'Salt'],
        matsReq: [1, 1],
        status: ['craft', 'buy'],
        multiPart: [true, false]
    },
    'Cream': {
        mats: ['Milk', 'Sugar'],
        matsReq: [1, 1],
        status: ['buy', 'buy'],
        multiPart: [true, false]
    },
    'Cheese': {
        mats: ['Milk'],
        matsReq: [1],
        status: ['baseCraft'],
        multiPart: [false]
    },
    'Smoked Fish Steak': {
        mats: ['Dried Mullet', 'Olive Oil', 'Salt'],
        matsReq: [2, 1, 2],
        status: ['buy', 'buy', 'buy'],
        proc: ['Golden Smoked Fish Steak'],
        multiPart: [true, true, false]
    },
    'Stir-Fried Vegetables': {
        mats: ['Hot Pepper', 'Olive Oil', 'Salt', 'Paprika'],
        matsReq: [2, 2, 1, 5],
        status: ['buy', 'buy', 'buy', 'buy'],
        proc: ['Crispy Stir-Fried Vegetables'],
        multiPart: [true, true, true, false]
    },
    'Beer': {
        mats: ['Leavening Agent', 'Mineral Water', 'Grain', 'Sugar'],
        matsReq: [2, 6, 5, 1],
        status: ['buy', 'buy', 'buy', 'buy'],
        proc: ['Cold Draft Beer'],
        multiPart: [true, true, true, false]
    },
    'Vinegar': {
        mats: ['Strawberry', 'Leavening Agent', 'Grain', 'Sugar'],
        matsReq: [1, 1, 1, 1],
        status: ['buy', 'buy', 'buy', 'buy'],
        multiPart: [true, true, true, false]
    },
    'Essence of Liquor': {
        mats: ['Flour', 'Strawberry', 'Leavening Agent'],
        matsReq: [1, 1, 1],
        status: ['single', 'buy', 'buy'],
        multiPart: [true, true, false]
    },
    'Dough': {
        mats: ['Flour', 'Mineral Water'],
        matsReq: [1, 1],
        status: ['craft', 'buy'],
        multiPart: [true, false]
    },
    'Flour': {
        mats: ['Grain'],
        matsReq: [1],
        status: ['baseCraft'],
    },
    'Teff Flour Dough': {
        mats: ['Teff Flour', 'Mineral Water'],
        matsReq: [1, 1],
        status: ['craft', 'buy'],
        multiPart: [true, false]
    },
    'Teff Flour': {
        mats: ['Teff'],
        matsReq: [1],
        status: ['baseCraft'],
    },
    'Balenos Timber Crate': {
        mats: ['Black Stone Powder', 'Ash Plywood', 'Maple Plywood'],
        matsReq: [1, 5, 5],
        status: ['buy', 'single', 'single'],
        multiPart: [true, true, false]
    },
    'Calpheon Timber Crate': {
        mats: ['Black Stone Powder', 'Birch Plywood', 'Cedar Plywood', 'Fir Plywood'],
        matsReq: [1, 5, 5, 5],
        status: ['buy', 'single', 'single', 'single'],
        multiPart: [true, true, true, false]
    },
    'Serendia Timber Crate': {
        mats: ['Black Stone Powder', 'Maple Plywood', 'Pine Plywood'],
        matsReq: [1, 5, 5],
        status: ['buy', 'single', 'single'],
        multiPart: [true, true, false]
    },
    'Mediah Timber Crate': {
        mats: ['Black Stone Powder', 'Acacia Plywood', 'White Cedar Plywood'],
        matsReq: [1, 5, 5],
        status: ['buy', 'single', 'single'],
        multiPart: [true, true, false]
    },
    'Brass Ingot Crate': {
        mats: ['Black Stone Powder', 'Brass Ingot'],
        matsReq: [1, 10],
        status: ['buy', 'single'],
        multiPart: [true, false]
    },
    'Bronze Ingot Crate': {
        mats: ['Black Stone Powder', 'Bronze Ingot'],
        matsReq: [1, 10],
        status: ['buy', 'single'],
        multiPart: [true, false]
    },
    'Mythril Ingot Crate': {
        mats: ['Black Stone Powder', 'Mythril Ingot'],
        matsReq: [1, 10],
        status: ['buy', 'single'],
        multiPart: [true, false]
    },
    'Steel Ingot Crate': {
        mats: ['Black Stone Powder', 'Steel'],
        matsReq: [1, 10],
        status: ['buy', 'single'],
        multiPart: [true, false]
    },
    'Titanium Ingot Crate': {
        mats: ['Black Stone Powder', 'Titanium Ingot'],
        matsReq: [1, 10],
        status: ['buy', 'single'],
        multiPart: [true, false]
    },
    'Vanadium Ingot Crate': {
        mats: ['Black Stone Powder', 'Vanadium Ingot'],
        matsReq: [1, 10],
        status: ['buy', 'single'],
        multiPart: [true, false]
    },
    'Noc Ingot Crate': {
        mats: ['Black Stone Powder', 'Noc Ingot'],
        matsReq: [1, 10],
        status: ['buy', 'single'],
        multiPart: [true, false]
    },
    'Alchemy Tool': {
        mats: ['Black Stone Powder', 'Rough Stone', 'Melted Iron Shard'],
        matsReq: [3, 18, 3],
        status: ['buy', 'buy', 'single'],
        multiPart: [true, true, false]
    },
    'Advanced Alchemy Tool': {
        mats: ['Black Stone Powder', 'Polished Stone', 'Usable Scantling', 'Melted Iron Shard'],
        matsReq: [20, 30, 15, 24],
        status: ['buy', 'single', 'single', 'single'],
        multiPart: [true, true, true, false]
    },
    'Balenos Traditional Alchemy Tool': {
        mats: ['Black Stone Powder', 'Rough Stone', 'Melted Iron Shard'],
        matsReq: [12, 18, 12],
        status: ['buy', 'buy', 'single'],
        multiPart: [true, true, false]
    },
    'Calpheon Traditional Alchemy Tool': {
        mats: ['Black Stone Powder', 'Polished Stone', 'Birch Plywood', 'Melted Iron Shard'],
        matsReq: [40, 20, 5, 40],
        status: ['buy', 'single', 'single', 'single'],
        multiPart: [true, true, true, false]
    },
    'Serendia Traditional Alchemy Tool': {
        mats: ['Black Stone Powder', 'Rough Stone', 'Log', 'Melted Iron Shard'],
        matsReq: [20, 20, 15, 20],
        status: ['buy', 'buy', 'buy', 'single'],
        multiPart: [true, true, true, false]
    },
    'Cooking Utensil': {
        mats: ['Black Stone Powder', 'Rough Stone', 'Melted Iron Shard'],
        matsReq: [2, 15, 10],
        status: ['buy', 'buy', 'single'],
        multiPart: [true, true, false]
    },
    'Advanced Cooking Utensil': {
        mats: ['Black Stone Powder', 'Polished Stone', 'Usable Scantling', 'Melted Iron Shard'],
        matsReq: [14, 20, 5, 20],
        status: ['buy', 'single', 'single', 'single'],
        multiPart: [true, true, true, false]
    },
    'Balenos Traditional Cooking Utensil': {
        mats: ['Black Stone Powder', 'Rough Stone', 'Melted Iron Shard'],
        matsReq: [10, 8, 10],
        status: ['buy', 'buy', 'single'],
        multiPart: [true, true, false]
    },
    'Calpheon Traditional Cooking Utensil': {
        mats: ['Black Stone Powder', 'Polished Stone', 'Maple Plywood', 'Melted Iron Shard'],
        matsReq: [30, 15, 8, 30],
        status: ['buy', 'single', 'single', 'single'],
        multiPart: [true, true, true, false]
    },
    'Serendia Traditional Cooking Utensil': {
        mats: ['Black Stone Powder', 'Rough Stone', 'Log', 'Melted Iron Shard'],
        matsReq: [15, 15, 20, 15],
        status: ['buy', 'buy', 'buy', 'single'],
        multiPart: [true, true, true, false]
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
    'Copper Ingot': {
        mats: ['Melted Copper Shard'],
        matsReq: [10],
        status: ['craft'],
        multiPart: [false]
    },
    'Gold Ingot': {
        mats: ['Melted Gold Shard'],
        matsReq: [10],
        status: ['craft'],
        multiPart: [false]
    },
    'Iron Ingot': {
        mats: ['Melted Iron Shard'],
        matsReq: [10],
        status: ['craft'],
        multiPart: [false]
    },
    'Lead Ingot': {
        mats: ['Melted Lead Shard'],
        matsReq: [10],
        status: ['craft'],
        multiPart: [false]
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
    'Platinum Ingot': {
        mats: ['Melted Platinum Shard'],
        matsReq: [10],
        status: ['craft'],
    },
    'Silver Ingot': {
        mats: ['Melted Silver Shard'],
        matsReq: [10],
        status: ['craft'],
    },
    'Steel': {
        mats: ['Melted Iron Shard', 'Coal'],
        matsReq: [5, 5],
        status: ['craft', 'buy'],
        multiPart: [true, false]
    },
    'Tin Ingot': {
        mats: ['Melted Tin Shard'],
        matsReq: [10],
        status: ['craft']
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
    'Zinc Ingot': {
        mats: ['Melted Zinc Shard'],
        matsReq: [10],
        status: ['craft']
    },
    'Melted Copper Shard': {
        mats: ['Copper Ore'],
        matsReq: [5],
        proc: ['Copper Ingot'],
        status: ['baseCraft']
    },
    'Melted Gold Shard': {
        mats: ['Gold Ore'],
        matsReq: [5],
        proc: ['Gold Ingot'],
        status: ['baseCraft']
    },
    'Melted Iron Shard': {
        mats: ['Iron Ore'],
        matsReq: [5],
        proc: ['Iron Ingot'],
        status: ['baseCraft']
    },
    'Melted Lead Shard': {
        mats: ['Lead Ore'],
        matsReq: [5],
        proc: ['Lead Ingot'],
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
    'Melted Platinum Shard': {
        mats: ['Platinum Ore'],
        matsReq: [5],
        proc: ['Platinum Ingot'],
        status: ['baseCraft']
    },
    'Melted Silver Shard': {
        mats: ['Silver Ore'],
        matsReq: [5],
        proc: ['Silver Ingot'],
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
    'Elder Tree Plywood': {
        mats: ['Elder Tree Plank'],
        matsReq: [10],
        status: ['craft']
    },
    'Elder Tree Plank': {
        mats: ['Elder Tree Timber'],
        matsReq: [5],
        proc: ['Elder Tree Plywood'],
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
    'Loopy Tree Plywood': {
        mats: ['Elder Tree Plank'],
        matsReq: [10],
        status: ['craft']
    },
    'Loopy Tree Plank': {
        mats: ['Loopy Tree Timber'],
        matsReq: [5],
        proc: ['Loopy Tree Plywood'],
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
    'Thuja Plywood': {
        mats: ['Thuja Plank'],
        matsReq: [10],
        status: ['craft']
    },
    'Thuja Plank': {
        mats: ['Thuja Timber'],
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