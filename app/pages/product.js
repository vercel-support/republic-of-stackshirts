import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { withRouter } from 'next/router'
import { products } from 'src'
import _values from 'lodash/values'

export default withRouter(class Product extends Component {

  static propTypes = {}
  static defaultProps = {}

  renderProduct = () => {

    const {
      router: {
        query,
      },
    } = this.props

    if (!query.id) {
      return null
    }

    const product = products[query.id]

    if (!product) {
      return `No product found with id: ${query.id}`
    }

    const color = product.attributes.colors[0]
    const logos = _values(product.attributes.logos)

    return (

      <div>
        <div className="form-group">
          <label>
            Name
          </label>
          <h1>
            {product.attributes.name}
          </h1>
        </div>
        <div className="form-group">
          <label>
            Id
          </label>
          <div>
            {product.id}
          </div>
        </div>
        <div className="form-group">
          <label>
            Colors
          </label>
          <div>
            {
              color.hex ? (
                <div
                  style={{
                    background: color.hex,
                    width: 80,
                    height: 80,
                    borderRadius: 4,
                  }}
                />
              ) : (
                <div>
                  None
                </div>
              )
            }
          </div>
        </div>
        <div className="form-group">
          <label>
            Logos
          </label>
          <div>
            {
              logos.length ? logos.map(logo => {
                return (
                  <img key={logo.id} src={logo.relativeUrl} height={80} />
                )
              }) : (
                <div>
                  None
                </div>
              )
            }
          </div>
        </div>

        {/* language=CSS */}
        <style jsx>{`
          label {
            font-size: .75rem;
            text-transform: uppercase;
            font-weight: bold;
            margin-bottom: 4px;
          }
        `}
        </style>
      </div>

    )

  }

  render() {

    const {
      router,
    } = this.props

    return (
      <div className="container mt-3">

        {this.renderProduct()}

      </div>
    )
  }
})
