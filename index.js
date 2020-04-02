let workers = 2
const { fork } = require('child_process')
let lookFor = process.argv.slice(2).map(f => { 
  return f.toLowerCase().replace(/[^a-zA-Z0-9]/g, '') 
})

if (lookFor[0].match(/^[0-9]+$/)) {
  workers = parseInt(lookFor[0])
  lookFor = lookFor.slice(1)
}

console.log('\x1b[36m%s\x1b[0m', 'XRP Vanity Wallet Generator')
console.log('\x1b[36m%s\x1b[0m', '   by @WietseWind (Twitter) /u/pepperew (Reddit)')
console.log('')

const re = '^(r.)(' + lookFor.join('|') + ')(.+)$|^(r.+)(' + lookFor.join('|') + ')$'
let count = 0

if (lookFor.length > 0) {
  console.log(`Parent is running with PID ${process.pid}`)

  console.log()
  console.log('\x1b[33m%s\x1b[0m', '-- Press Control C to quit --');

  console.log()
  console.log('Looking for wallet addresses with keywords at the start/end:')
  lookFor.forEach(function (k) {
    console.log('   - ', k)
  })
  console.log()
  console.log('For the geeks: testing regular expression: ')
  console.log('  ', re)

  const children = []

  console.log()
  for (let i=0;i<workers;i++) {
    console.log(`Starting worker ${i+1}/${workers}`)
    children[i] = fork('./xrpwallet.js')

    children[i].on('message', (msg, cld) => {
      // console.log(` > Message from child ${i}`, msg)
      if (typeof msg.counter !== 'undefined') {
        count += msg.counter
      } else if (typeof msg.match !== 'undefined') {
        console.log(`> Match @${msg.child}: [ ${msg.match.raddress} (${msg.match.address}) ] with secret [ ${msg.match.secret} ]`)
      }
    })
    
    children[i].on('exit', (code, signal) => {
      console.log(`Child ${i} exited with code ${code} and signal ${signal}`)
    })
    
    children[i].send({ lookFor, id: i })
  }
  console.log()
} else {
  console.log('Please enter one or more keywords after the script to search for.')
  console.log('Eg. "node ' + process.argv[1] + ' johndoe mywallet pepper"')
  console.log()
  process.exit(1) 
}
