var keys = { 

    // Create Twitter Apps in `https://apps.twitter.com/` with Specific CallBackURL
    // e.g. -> Callback URL : `http://127.0.0.1:3000/auth/twitter/callback`
    TWITTER_CLIENTID: '',
    TWITTER_SECRET: '',

    // Create GitHub Apps in `https://github.com/settings/applications`
    GITHUB_CLIENTID: '',
    GITHUB_SECRET: ''
};

for (var key in keys ) if ( keys.hasOwnProperty(key) ) {
    if(!keys[key]) {
        var message = '  Set '+ key +' in config/env/keys.js';
        console.error('\n'+ message);
        console.error('  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n');
        throw new Error(message);
    };
}

module.exports = keys;
