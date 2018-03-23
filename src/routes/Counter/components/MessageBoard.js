import React from 'react'
import PropTypes from 'prop-types'
import './MessageBoard.scss'

const stream = require('getstream')
const client = stream.connect('n2wcamdjmvt4', null, '35635')
export default class MessageBoard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      feed: {},
      form : {
        message: ''
      },
      streamData: {
        name: '',
        token: ''
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSendMessage = this.handleSendMessage.bind(this)
  }

  handleInputChange (e) {
    const { form } = this.state
    const input = e.target.value
    const index = e.target.name

    form[index] = input
    this.setState({ form })
  }

  handleSendMessage () {
    const stream = client.feed('user', 'eric', 'du5zqrTMZ8fiJXdKt0JzYBVoyJs')
    const { form, feed } = this.state
    stream.addActivity({
      actor: 'eric',
      verb: 'tweet',
      tweet: form.message,
      object: feed.results.length + 1
    }).then(() => {
      this.getStream()
    })
  }

  connectStream () {
    const stream = client.feed('user', 'eric', 'du5zqrTMZ8fiJXdKt0JzYBVoyJs')
    console.log(stream)
    stream.get().then((data) => {
      this.setState({ feed: data })
    })

    stream.subscribe((data) => {
      const { feed } = this.state
      if (data.new.length > 0) {
        data.new.forEach((msg) => {
          feed.results.unshift(msg)
          this.setState({ feed })
        })
      }
    })
  }

  componentDidMount () {
    this.connectStream()
  }

  render () {
    const { feed } = this.state

    let messages = []

    if (feed.results) {
      feed.results.forEach((message, i) => {
        if (message.verb === 'tweet') {
          const key = `tweet_${i}`
          messages.push(<div className='Message' key={key}> {message.tweet}</div>)
        }
      })
    }

    return (
<<<<<<< Updated upstream
      <div className="MessageWrapper">
        <h3>{name}</h3>
        <div className="Messages">
          {messages}
        </div>
        <form onSubmit={handleSendMessage} className="MessageInput" action="">
          <input autoFocus onChange={handleInputChange} type='text' name='message' />
          <button type='submit'>Send</button>
        </form>

=======
      <div>
        <h3>Activity</h3>
        <div className='ContainerWrap'>
          {messages}
        </div>
        <input onChange={this.handleInputChange} type='text' name='message' />
        <button onClick={this.handleSendMessage} type='submit'>Send</button>
>>>>>>> Stashed changes
      </div>
    )
  }
}

MessageBoard.propTypes = {
  handleInputChange: PropTypes.func,
  handleSendMessage: PropTypes.func,
  feed: PropTypes.object
}
