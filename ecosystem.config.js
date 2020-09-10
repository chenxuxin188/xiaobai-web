module.exports = {
    apps: [
        {
            name: 'WEB',
            script: 'node ./bin/www',
            instances: 1,
            autorestart: false,
            max_restarts: 5,
            min_uptime: '10s',
            restart_delay: 5000,
            watch: false,
            out_file: './logs/normal.log',
            error_file: './logs/error.log',
        },
    ],
};
