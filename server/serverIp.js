const networkInterfaces = require('os').networkInterfaces();

const serverIp = function() {
    let ip = ['localhost'];
    for (let i in networkInterfaces) {
        let inter = networkInterfaces[i];
        for (let j in inter)
            if (inter[j].family === 'IPv4')
                ip.push(inter[j].address)
    }
    return ip
};

module.exports = serverIp;
