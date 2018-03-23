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
          messages.push(<span className='Tweet' key={key}> {message.tweet}</span>)
        }
      })
    }

    return (
      <div>
        <h3>{name}</h3>
        <div className='ContainerWrap'>
          {messages}
        </div>
        <input onChange={handleInputChange} type='text' name='message' />
        <button onClick={handleSendMessage} type='submit'>Send</button>
      </div>
    )
  }
}

MessageBoard.propTypes = {
  handleInputChange: PropTypes.func,
  handleSendMessage: PropTypes.func,
  feed: PropTypes.object
}
