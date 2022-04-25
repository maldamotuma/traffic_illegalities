export const formdataGenerator = formObject => {
    const formdata = new FormData();
    for (const key in formObject) {
        if (Array.isArray(formObject[key])) {
            formObject[key].forEach(photo => {
                formdata.append(`${key}[]`, photo);
            });
        } else if (typeof (formObject[key]) === "object" && key !== "profilePicture") {
            formdata.append(key, JSON.stringify(formObject[key]));
        } else {
            formdata.append(key, formObject[key]);
        }
    }

    return formdata;
}