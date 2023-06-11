const axios = require('axios');

exports.getAllFilm = async (req, res) => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api.themoviedb.org/3/discover/movie?api_key=3ad20806dd6673838f3398e667ddb5fa',
            headers: { }
        };

        axios.request(config)
            .then((response) => {
                return(JSON.stringify(response.data));
            })
            .catch((error) => {
                return(error);
            });

}