const update = require('immutability-helper')

update.extend('$auto', (value, object) => {
  return object ?
    update(object, value) :
    update({}, value)
})

module.exports = update
