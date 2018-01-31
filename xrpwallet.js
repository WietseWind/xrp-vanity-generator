const rippleLib  = require('ripple-lib').RippleAPI
const api        = new rippleLib()
const lookFor    = process.argv.slice(2).map(function (f) { return f.toLowerCase().replace(/[^a-zA-Z0-9]/g, '') })

console.log('\x1b[36m%s\x1b[0m', 'XRP Vanity Wallet Generator')
console.log('\x1b[36m%s\x1b[0m', '   by @WietseWind (Twitter) /u/pepperew (Reddit)')
console.log('')

if (lookFor.length > 0) {

  console.log('Looking voor wallet addresses with keywords at the start/end:')
  lookFor.forEach(function (k) {
    console.log('   - ', k)
  })
  var re = '^(r)(' + lookFor.join('|') + ')(.+)$|^(r.+)(' + lookFor.join('|') + ')$'
  console.log(' ')
  console.log('For the geeks: testing regular expression: ')
  console.log('  ', re)

  const regexp = new RegExp(re, 'i')

  console.log('')
  console.log('\x1b[33m%s\x1b[0m', '-- Press Control C to quit --');
  console.log('')

  for (let i = 0;;i++) {
    account = api.generateAddress();
    var test = regexp.exec(account.address)
    if (test) {
      var address = ''
      if (test[1] === undefined) {
        address = test[4] + '\x1b[32m' + test[5] + '\x1b[0m'
      } else {
        address = test[1] + '\x1b[32m' + test[2] + '\x1b[0m' + test[3]
      }
      process.stdout.write("\n");
      console.log(' > Match: [ ' + address + ' ] with secret [ ' + account.secret + ' ]')
    } else {
      if (i % 100 === 0) process.stdout.write('.')
      if (i % 1000 === 0) process.stdout.write("\r" + i + ' ')
    }
  }

} else {
  console.log('Please enter one or more keywords after the script to search for.')
  console.log('Eg. "node ' + process.argv[1] + ' johndoe mywallet pepper"')
  console.log('')
  process.exit(0)
}
