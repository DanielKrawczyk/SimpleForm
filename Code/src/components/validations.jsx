function get(id) {
    return document.getElementById(id);
}

// I want to make 100% sure nothing bad is gonna happen

export default function validate() {
    const name = get('name'),
    prep = get('prep'),
    type = get('type');

    if (name.value.length < 6) {
        name.classList.add('is-invalid');
        return false;
    } else {
        name.classList.remove('is-invalid');
    }

    if (prep.value.length !== 8) {
        prep.classList.add('is-invalid');
        return false;
    } else {
        prep.classList.remove('is-invalid');
    }

    if (type.value === 'info') {
        type.classList.add('is-invalid');
        return false;
    } else {
        type.classList.remove('is-invalid');
    }

    let post = {
        name: name.value,
        preparation_time: prep.value,
        type: type.value
    }

    switch(type.value) {
        case 'pizza':
            const slices = get('slices'),
            diameter = get('diameter');

            if (slices.value < 4 || slices.value > 16) {
                slices.classList.add('is-invalid');
                return false;
            } else {
                slices.classList.remove('is-invalid');
            }

            if (diameter.value < 25 || diameter.value > 60) {
                diameter.classList.add('is-invalid');
                return false;
            } else {
                diameter.classList.remove('is-invalid');
            }

            post = {
                ...post,
                no_of_slices: parseInt(slices.value),
                diameter: parseFloat(diameter.value)
            }

            break;
        case 'soup':
            const spicy = get('spiciness');

            if /* It's range input, but if somehow */ (spicy.value < 1 || spicy.value > 10) {
                spicy.classList.add('is-invalid');
                return false;
            } else {
                spicy.classList.remove('is-invalid');
            }

            post = {
                ...post,
                spiciness_scale: parseInt(spicy.value)
            }

            break;
        case 'sandwich':
            const bread = get('bread');

            if (bread.value < 1 || bread.value > 12) {
                bread.classList.add('is-invalid');
                return false;
            } else {
                bread.classList.remove('is-invalid');
            }

            post = {
                ...post,
                slices_of_bread: parseInt(bread.value)
            }

            break;
        default: 
            return false;
    }

    return post;
}