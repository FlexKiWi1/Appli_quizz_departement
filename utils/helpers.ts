export function getRandomInt(min: number, max: number) {
    return min + Math.floor(Math.random() * (max - min));
}


type getRandomElementsArgs<T> = {
    array: T[],
    n: number,
    exclude: [],
    key?: keyof T,
}

export function getRandomElements<T>({ array, n, exclude, key }: getRandomElementsArgs<T>) {
    let results: [] = [];
    let i = 0;
    let randomElement;
    while (i < n) {
        if (key) {
            randomElement = array.at(getRandomInt(0, array.length - 1))?.[key];
        } else {
            randomElement = array.at(getRandomInt(0, array.length - 1));
        }
        while (exclude.includes(randomElement)) {
            if (key) {
                randomElement = array.at(getRandomInt(0, array.length - 1))?.[key];
            } else {
                randomElement = array.at(getRandomInt(0, array.length - 1));
            }
        }
        results.push(randomElement);
        exclude.push(randomElement)
        i++;
    }
    return results;
}

export function shuffleArray(array: []) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}