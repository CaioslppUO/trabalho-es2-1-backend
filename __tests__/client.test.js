const axios = require("axios");

describe('Testes de inserir, consultar e alterar clientes', () => {
    test('teste inserir cliente', () => {
        const client = {
            "data":
            {
               "name": "Lucas22",
               "email": "luca2s@gmail.com",
               "cpf": "88463712931"
            }
        }
        return axios.post("http://localhost:1337/api/clients", client)
            .then((res) => {
                expect(res.status).toBe(200);
            })
            .catch((err) => {
                throw new Error('Error: ' + err.message);
            });
    });

    test('teste de consultar cliente', () => {
        return axios.get("http://localhost:1337/api/clients")
            .then((res) => {
                expect(res.status).toBe(200);
            })
            .catch((err) => {
                throw new Error('Error: ' + err.message);
            });
    });

    test('teste de alterar cliente', () => {
        let client = {
            "data":
            {
               "name": "Lucas44",
               "email": "luca3s@gmail.com",
               "cpf": "88163712931"
            }
        }
        return axios.post("http://localhost:1337/api/clients", client)
            .then((res) => {
                client = {
                    "data":
                    {
                       "name": "Lucas66",
                       "email": "luca15s@gmail.com",
                       "cpf": "88163712931"
                    }
                }
                let id = res.data.data.id;
                return axios.put(`http://localhost:1337/api/clients/${id}`, client)
                    .then((res_2) => {
                        expect(res_2.status).toBe(200);
                    })
                    .catch((err_2) => {
                        throw new Error(err_2);
                    })
            })
            .catch((err) => {
                throw new Error(err);
            });
    })
});