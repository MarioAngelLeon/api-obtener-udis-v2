import messages from '../commons/messages.json'

let data = {}

const createMessage = (id, template, description) => {
  data = {
    ...data,
    [id]: { template, description }
  }
}

messages.forEach(e => {
  createMessage(e.id, e.template, e.description)
})

export const MESSAGES = data

export default null