import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

export default class Index extends Component {

  static propTypes = {}
  static defaultProps = {}

  render() {
    return (
      <div className="container my-3">

        <h1 className="mb-3">
          Stackshirts for the People
        </h1>
        <Link href="/products">
          <a>
            Products
          </a>
        </Link>
      </div>
    )
  }
}
