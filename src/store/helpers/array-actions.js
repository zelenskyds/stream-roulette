function updateOrRemove(array, element, update=false) {
    const index = array.findIndex( el => el.id === element.id );

    if(index === -1) {
        return array;
    }
    const result = [...array];

    if(update) {
        result.splice(index, 1, { ...element });
    } else {
        result.splice(index, 1);
    }

    return result;
}

export function addElement(array, element) {
    return [
        ...array,
        { ...element }
    ];
}

export function removeElement(array, element) {
    return updateOrRemove(array, element);
}

export function updateElement(array, element) {
    return updateOrRemove(array, element, true);
}