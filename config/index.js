const env = () => {
    return process.env.NODE_ENV === 'production' ? { endpoint : '/prod/v1', port : 5000 } : { endpoint : '/dev/v1', port : 6000 }
}

module.exports = {
    ...env()
}