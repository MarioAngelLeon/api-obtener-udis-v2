/*import { createLogger, format, transports } from 'winston'
import newrelicFormatter from '@newrelic/winston-enricher'
import time from 'moment-timezone'

const { combine, printf } = format

const timezoned = () =>
  time(new Date())
    .tz(process.env.TZ || 'America/Mexico_City')
    .format('YYYY-MM-DD HH:mm:SS')

const myFormat = printf(
  ({ level, message, timestamp }) =>
    `[${timestamp}] - [${level.padEnd(5, ' ')}] - ${message}`
)

const LOG = createLogger({
  level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL.toLowerCase() : 'debug',
  format: combine(
    newrelicFormatter(),
    format.timestamp({ format: timezoned }),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.Http({
      host: 'log-api.newrelic.com',
      path: '/log/v1',
      headers: {
        'Api-Key': process.env.NEW_RELIC_LICENSE_KEY
      },
      ssl: true
    })
  ]
})

LOG.debugJSON = (message, json) => {
  if (LOG.isDebugEnabled()) {
    LOG.debug(`${message}: ${JSON.stringify(json)}`)
  }
}

LOG.error = message => {
  if (message instanceof Object) {
    LOG.log({
      level: 'error',
      message: JSON.stringify(message)
    })
  } else {
    LOG.log({
      level: 'error',
      message
    })
  }
}

module.exports = LOG
*/