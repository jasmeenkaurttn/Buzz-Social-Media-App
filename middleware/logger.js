function log(req, res, next) {
    // console.log('Logging...');
    next(); // call to next MF in pieline
}

module.exports = log;