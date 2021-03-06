export const setObject = function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getObject = function (key) {
    let value = localStorage.getItem(key);
    if (value === "undefined") return {};
    try {
        value = JSON.parse(value);
    } catch (err) {
        console.log(err);
    }
    return value;
};
