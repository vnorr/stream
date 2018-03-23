import React from 'react'
import PropTypes from 'prop-types'
import './MessageBoard.scss'

export default class MessageBoard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { handleInputChange, handleSendMessage, feed } = this.props

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
      <div className="MessageWrapper">
        <h3>{name}</h3>
        <div className="Messages">
          {messages}
        </div>
        <form onSubmit={handleSendMessage} className="MessageInput" action="">
          <input autoFocus onChange={handleInputChange} type='text' name='message' />
          <button type='submit'>Send</button>
        </form>

      </div>
    )
  }
}

MessageBoard.propTypes = {
  handleInputChange: PropTypes.func,
  handleSendMessage: PropTypes.func,
  feed: PropTypes.object
}
