function GetValuesByKey(obj, key) {
    let values = [];
    for (let i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            values = values.concat(GetValuesByKey(obj[i], key));
        } else if (i == key) {
            values.push(obj[i]);
        }
    }
    return values;
}

const data = {
    "id": 1,
    "name": "Item 1",
    "link": "/item-1",
    "relatedItems": [
        {
            "id": 2,
            "name": "Item 2",
            "link": "/item-2"
        },
        {
            "id": 3,
            "name": "Item 3",
            "link": "/item-3"
        },
        {
            "id": 4,
            "name": "Item 4",
            "link": "/item-4"
        }
    ]
}

var result = GetValuesByKey(data, "link");
render(JSON.stringify(result));