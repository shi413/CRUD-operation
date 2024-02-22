const bcrypt = require('bcrypt')

const hassPass = async(simplePassword)=>{
    let saltRound = 10;
    let hassPassword = await bcrypt.hashSync(simplePassword,saltRound)
    return hassPassword
}
const comparePassword = async(simplePassword,hassPassword)=>{
    let compare = await bcrypt.compare(simplePassword,hassPassword)
    return compare
}

module.exports = {hassPass,comparePassword}
