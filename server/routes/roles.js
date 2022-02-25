const fetch = (...args) =>
    import ('node-fetch').then(({ default: fetch }) => fetch(...args));
require('dotenv').config();

// Realizar peticiones a api de neo
peticionesNeo = async(metodo_api, params) => {
    try {
        const response = await fetch(`${process.env.URL}/${metodo_api}?api_key=${process.env.API_KEY}&${params}`);
        const data = await response.json();
        return {
            status: true,
            data
        };
    } catch (err) {
        return {
            status: false,
            error: {
                error: err
            }
        };
    }
}

//retira el rol de estudiante a los docentes
cambiarRoles = async(arr) => {
    let cont_update = 0;
    let cont_error = 0;
    let users_update = [];
    let users_error = [];
    for (let i = 0; i < arr.length; i++) {
        const userUpdate = await peticionesNeo('update_user', `id=${arr[i].user_id}&account_types=${arr[i].account_types}`);
        if (userUpdate.status) {
            cont_update++;
            users_update.push(userUpdate);
        } else {
            cont_error++;
            users_error.push(arr[i])
        }
    }
    return {
        cont_update,
        cont_error,
        users_update,
        users_error
    };
}

module.exports = {
    cambiarRoles
}