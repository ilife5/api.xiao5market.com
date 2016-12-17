var config = {
    NODE_ENV: "local",
    db: {
        database: "xiao5market",
        hostname: "127.0.0.1",
        port: "27017",
        orderGap: 100,
        username: "xiao5",
        pwd: "2187706"
    },
    query: {
        page: 10
    },
    http: {
        response: {
            error: {
                ret: false,
                data: {},
                message: ""
            }
        }
    },
    api: {
        hostname: "localhost",
        port: "3001"
    }
};

if(process.env.NODE_ENV && process.env.NODE_ENV == "production") {
    config.NODE_ENV = "prd";
    config.api.hostname = "api.xiao5market.com";
}

module.exports = config;