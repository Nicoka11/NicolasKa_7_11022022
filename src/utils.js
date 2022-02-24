export const matchAllString = (string, comparedString) => {
    const strArr = [...string]
    for (let i in strArr) {
        if (!comparedString && comparedString.match(/./g)) {
            console.log(comparedString);
        }
    }
};

