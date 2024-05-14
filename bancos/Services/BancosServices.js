const getBancos = () =>
    new Promise((resolve, reject) => {
        fetch('https://dev.obtenmas.com/catom/api/challenge/banks', {
            method: 'GET',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(response => {
                console.log('ESTATUS: ' + response.status)
                if (response.status == 404) {
                    reject({
                        mensajeError: 'Error al recuperar los bancos'
                    });
                    return response.status
                }else {
                    return  response.json()
                }

            }).then(responseJson => {
                console.log('responseJson:', JSON.stringify(responseJson) );

                resolve(responseJson)

            }).catch(function (error) {
                console.log('Request failed', error);
                reject({
                    mensajeError: 'error'
                });
            });
    });

module.exports = getBancos;