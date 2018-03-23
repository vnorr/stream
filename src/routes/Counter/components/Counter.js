import React from 'react'
import MessageBoard from './MessageBoard'
import './counter.scss'

const stream = require('getstream')
const client = stream.connect('n2wcamdjmvt4', null, '35635')

export default class componentName extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      feed: {},
      form : {
        message: ''
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
    const ericFeed = client.feed('user', 'eric', 'du5zqrTMZ8fiJXdKt0JzYBVoyJs')
    // Isn't this getStream?
    ericFeed.get().then((data) => {
      this.setState({ feed: data })
    })

    ericFeed.subscribe((data) => {
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
    return (
      <div className='Container'>
        <div>
          <MessageBoard
            name='Activity'
            handleInputChange={this.handleInputChange}
            handleSendMessage={this.handleSendMessage}
            feed={feed}
          />
        </div>
      </div>
    )
  }
}
