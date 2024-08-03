const crc32 = require('crc-32');
require('dotenv').config();

const verifySecureKey = (req, res, next) => {
    const secureKey = req.headers['securekey'] ||req.headers.securekey;
    const payload = req.body;
    const paramdata = req.query;

    if (!secureKey) {
        return res.status(400).json({ status: false, message: 'Secure key missing' });
    }

    if (!process.env.CRC_KEY) {
        return res.status(500).json({ status: false, message: 'Server configuration error' });
    }

    let jsonString;
    if (req.method === 'GET' || req.method === 'DELETE') {
        jsonString = JSON.stringify(paramdata); 
    } else {
        jsonString = JSON.stringify(payload);
    }

    const dataWithSecret = jsonString + process.env.CRC_KEY;
    console.log(dataWithSecret);
    const calculatedSecureKey = crc32.str(dataWithSecret).toString(16);
    console.log(calculatedSecureKey,secureKey)

    if (secureKey !== calculatedSecureKey) {
        return res.status(403).json({ status: false, message: 'Invalid secure key' });
    }

    next();
};

module.exports = verifySecureKey;
