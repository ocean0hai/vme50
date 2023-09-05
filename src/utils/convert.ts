function rendArr(charges: Array<any>) {
    const arr: Array<string> = [];
    let str = '';
    charges.map((item) => {
        item.tags.map((it: any) => {
            if (it.checked) {
                if (item.isMultipleChoice === 0) {
                    str += it.name + '|';
                } else {
                    arr.push(it.name);
                }
            }
        });
    });
    arr[arr.length - 1] = arr[arr.length - 1] + `(${str.slice(0, -1)})`;
    return arr;
}
export { rendArr };
