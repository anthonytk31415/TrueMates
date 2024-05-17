const {MESSAGES} = require('../config/message.constants');

async function sendResp (res, data) {
    try {
        return res.status(data.statusCode).json(data);     
    } catch (er) {
        return res.status(500).json(data || {});
    }
}



module.exports = {
    sendResp: sendResp
};
