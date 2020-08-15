const streamSnipe = require('./index.js')

streamSnipe.ytChannelLive('UCajhBT4nMrg3DLS-bLL2RCg', (err, data) => {
    if (!err)
        console.log(data)
    else
        console.error("error")
})