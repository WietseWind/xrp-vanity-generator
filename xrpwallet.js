const rippleLib = require('ripple-lib').RippleAPI
const api = new rippleLib()
const isSubprocess = typeof process.send !== 'undefined'
const lookFor = process.argv.slice(2).map(function(f) {
    return f.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')
})

if (!isSubprocess) {
    console.log('\x1b[36m%s\x1b[0m', 'XRP Vanity Wallet Generator')
    console.log('\x1b[36m%s\x1b[0m', '   by @WietseWind (Twitter) /u/pepperew (Reddit)')
    console.log()
}


const run = (id, match) => {

    var re = '^(r)(' + match.join('|') + ')(.+)$|^(r.+)(' + match.join('|') + ')$'
    const regexp = new RegExp(re, 'i')

    if (match.length > 0) {
        if (!isSubprocess) {
            console.log('Looking for wallet addresses with keywords at the start/end:')
            match.forEach(function(k) {
                console.log('   - ', k)
            })

            console.log(' ')
            console.log('For the geeks: testing regular expression: ')
            console.log('  ', re)



            console.log('')
            console.log('\x1b[33m%s\x1b[0m', '-- Press Control C to quit --');
            console.log('')
        }

        for (let i = 0;; i++) {
            account = api.generateAddress();
            var test = regexp.exec(account.address)
            if (test) {

                const matchedAddress = test[1] === undefined ?
                    test[4] + '\x1b[32m' + test[5] + '\x1b[0m' :
                    test[1] + '\x1b[32m' + test[2] + '\x1b[0m' + test[3]

                if (!isSubprocess) {
                    process.stdout.write("\n");
                    console.log(' > Match: [ ' + account.address + ' ] with secret [ ' + account.secret + ' ]')
                } else {
                    process.send({
                        match: {
                            raddress: matchedAddress,
                            address: account.address,
                            secret: account.secret
                        },
                        child: id,
                        pid: process.pid
                    })
                }
            } else {
                if (!isSubprocess) {
                    if (i % 100 === 0) process.stdout.write('.')
                    if (i % 1000 === 0) process.stdout.write("\r" + i + ' ')
                } else {
                    if (i % 100 === 0) process.send({
                        counter: 100,
                        child: id,
                        pid: process.pid
                    })
                }
            }
        }

    } else {
        console.log('Please enter one or more keywords after the script to search for.')
        console.log('Eg. "node ' + process.argv[1] + ' johndoe mywallet pepper"')
        console.log('')
        process.exit(0)
    }
}

if (!isSubprocess) {
    run(null, lookFor)
} else {
    process.on('message', msg => {
        run(msg.id, msg.lookFor)
    })
}
