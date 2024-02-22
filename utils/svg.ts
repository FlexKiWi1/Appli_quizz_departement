

function resetSvgPathCoord(path: string): string {
    return path.replace(/(\d+(\.\d+)?)/g, '0');
}

export function resetPathCoordToZero(path: string): string {
    return path.replace(/(\d+(\.\d+)?)/g, '0');
}

// test
// import svgs from "../data/modules/french/data/departementsPath.json"
// svgs.map(svg => {
//     console.log(resetPathCoordToZero(svg.d));
// })
