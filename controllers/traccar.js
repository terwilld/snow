const axios = require('axios');
require('dotenv').config()

traccarusername = process.env.traccarusername
traccarpassword = process.env.traccarpassword


module.exports.index = async (req, res) => {
    const axiosRes = await axios.get('http://3.89.108.223:8082/api/devices',
        {
            auth: {
                username: traccarusername,
                password: traccarpassword
            }
        });
    console.log(axiosRes.data)
    res.render("traccar/index.ejs", { devices: axiosRes.data })
}

module.exports.createDevice = async (req, res) => {
    const axiosRes = await axios.post('http://3.89.108.223:8082/api/devices',
        {
            "name": "David Laptop from node",
            "uniqueId": "David Laptop  from node",
            "status": "online",
            "disabled": false,
            "lastUpdate": "2024-09-08T14:15:22Z",
            "positionId": 0,
            "groupId": 0,
            "phone": "617 610 7740",
            "model": "macbook",
            "contact": "terwilld@gmail.com",
            "category": "string",
            "attributes": {}
        },
        {
            auth: {
                username: traccarusername,
                password: traccarpassword
            }
        });

    console.log(axiosRes)
    res.send("sent data")
}


module.exports.newDevice = async (req, res) => {

    res.render('traccar/newdevice.ejs')
}

module.exports.createdeviceui = async (req, res) => {
    console.log(req.body)

    try {
        const axiosRes = await axios.post('http://3.89.108.223:8082/api/devices',
            {
                "name": req.body.device.name,
                "uniqueId": req.body.device.unique_id,
                "status": "online",
                "disabled": false,
                "lastUpdate": "2024-09-08T14:15:22Z",
                "positionId": 0,
                "groupId": 0,
                "phone": "617 610 7740",
                "model": req.body.device.model,
                "contact": req.body.device.email,
                "category": "string",
                "attributes": {}
            },
            {
                auth: {
                    username: traccarusername,
                    password: traccarpassword
                }
            });
        res.redirect('/traccar')
    }

    catch (e) {
        res.send(e)
    }
}

module.exports.addgpxform = async (req, res) => {
    console.log(req.params)
    console.log(req.body)
    res.render('traccar/gpxform.ejs', { uniqueID: req.params.uniqueid })

}

module.exports.addgpxdata = async (req, res) => {
    console.log(req.body)
    let now = Date.now(); // Unix timestamp in milliseconds
    console.log(now);
    //res.send(req.body)
    axios.get(`http://3.89.108.223:5055/?id=${req.body.gpxdata.uniqueid}&lat=${req.body.gpxdata.latitude}&lon=${req.body.gpxdata.longitude}&timestamp=${now}`,
        {
            auth: {
                username: traccarusername,
                password: traccarpassword
            }
        });
    res.redirect('/traccar')
}