const isValid = (rule, input) => {
    return rule.test(input);
}

export const validate = (vinfo) => {
    const data = new FormData(vinfo.ref.current);
    const inputdatas = Object.fromEntries(data.entries());
    let tmperrors = {};
    for (const key in vinfo.rules) {
        if (!isValid(vinfo.rules[key], inputdatas[key])) tmperrors[key] = vinfo.messages[key];
    }
    return tmperrors;
}