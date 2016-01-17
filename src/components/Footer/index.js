import React from 'react'
import 'styles/footer.scss'

export const Footer = () => {
  return (
    <footer>
      <div className='container'>
        <div className='footer-container row'>
          <div className='footer-text'>
            An Open Source project made with <span id='footer-heart'>♥</span> in San Francisco, CA.
          </div>
        </div>
      </div>
    </footer>
  )
}
