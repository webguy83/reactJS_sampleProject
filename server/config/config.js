const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default: {
        SECRET: 'secretpasswordhahahha6969',
        DATABASE: 'mongodb://localhost:27017/booksShelf'
    }
}

exports.get = (env) => {
    return config[env] || config.default;
}