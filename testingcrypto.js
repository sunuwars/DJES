const crypto = require("crypto");


function random(length = 24){
    return new Promise((resolve, reject) => {
        crypto.randomBytes(48, (err, buffer) => {
            if (err) {
                reject(err);
            } else {
                resolve (buffer.toString("hex"))
            }
        })
    })
}




var sessionID = random()
.then(dsdsfd => console.log(dsdsfd))

