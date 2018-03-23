import React from 'react'
import './counter.scss'

import AuthView from './AuthView'

export default class componentName extends React.Component {
<<<<<<< Updated upstream
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

  handleSendMessage (e) {
    e.preventDefault()
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

=======
>>>>>>> Stashed changes
  render () {
    return (
      <div className='Container'>
        <AuthView />
      </div>
    )
  }
}
