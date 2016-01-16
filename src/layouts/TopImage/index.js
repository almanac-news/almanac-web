import React, { Component } from 'react'
import LoadingOrderAnimation from 'react-loading-order-with-animation'

/* utils */
import { setParallax } from '../../utils/parallax'

/* component styles */
import { styles } from './styles.scss'

export class TopImage extends Component {

  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll() {
    setParallax(this.refs.parallax, 10)
  }

  setParallax(elem, speed = 30) {
    const top = (window.pageYOffset - elem.offsetTop) / speed

    isMobileAndTablet
      ? elem.style.backgroundPosition = `0px ${ top }px`
      : null
  }

  render() {
    return (
      <section className={`${styles}`} ref='parallax'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center'>
              <LoadingOrderAnimation animation='fade-in'
                                     move='from-bottom-to-top'
                                     distance={30}
                                     speed={700}
                                     wait={700}>
                <h1 className='title'>
                  Almanac News
                </h1>
              </LoadingOrderAnimation>
              <LoadingOrderAnimation animation='fade-in'
                                     move='from-bottom-to-top'
                                     distance={60}
                                     speed={700}
                                     wait={900}>
                <p>
                  Your one source of truth for financial data
                </p>
              </LoadingOrderAnimation>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
