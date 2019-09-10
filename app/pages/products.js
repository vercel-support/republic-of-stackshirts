import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WindowScroller, AutoSizer, Table, Column } from 'react-virtualized'
import ImageZoom from 'react-medium-image-zoom'
import _values from 'lodash/values'
import _get from 'lodash/get'
import Link from 'next/link'
import classnames from 'classnames'
import { withRouter } from 'next/router'
import { products } from 'src'


export default withRouter(class Products extends Component {

  state = {
    isBrowser: null,
  }

  componentDidMount() {
    this.setState({
      isBrowser: true,
    })
  }

  render() {

    const {
      router,
    } = this.props

    const {
      isBrowser,
    } = this.state

    if (!isBrowser) {
      return null
    }

    let productsList = _values(products)

    switch (router.query.needs) {

      case 'color': {
        productsList = productsList.filter(product => {
          return !_get(product, 'attributes.colors[0].hex')
        })
        break
      }
      default: {
        break
      }

    }

    const rowGetter = ({ index }) => {
      return productsList[index]
    }
    const rowCount = productsList.length

    const renderSvg = (asset, product, as) => {

      return (
        <ImageZoom
          className="colorSvg"
          key={asset.id}
          image={{
            src: asset.relativeUrl,
            alt: asset.id,
            style: {
              height: '100%',
              maxWidth: 100,
              marginRight: 8,
              lineHeight: '79px',
            },
          }}
          defaultStyles={{
            overlay: {
              background: as === 'icon' ? 'black' : 'white',
            },
            zoomImage: {
              lineHeight: '79px',
            }
          }}
          zoomImage={{
            src: asset.relativeUrl,
            alt: asset.id,
          }}
        />
      )
    }


    return (

      <div className="container my-3">

        <h1 className="mb-3">
          Products
        </h1>

        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link href="/products">
              <a
                className={classnames('nav-link', {
                  active: !router.query.needs
                })}
              >
                All
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/products?needs=color">
              <a
                className={classnames('nav-link', {
                  active: router.query.needs === 'color'
                })}
              >
                No color
              </a>
            </Link>
          </li>
        </ul>


        <WindowScroller>
          {({
            height,
            isScrolling,
            onChildScroll,
            scrollTop,
          }) => {

            return (
              <AutoSizer disableHeight>
                {({ width }) => {
                  return (
                    <Table
                      headerHeight={60}
                      headerRowRenderer={({ style, columns, className }) => {
                        return (
                          <div
                            className={className}
                            role="row"
                            style={{
                              ...style,
                              overflow: 'visible',
                            }}
                          >
                            {columns}
                          </div>
                        )
                      }}

                      rowStyle={{
                        borderBottom: '1px solid #999',
                        padding: '5px 0',
                        overflow: 'visible',
                      }}

                      autoHeight
                      height={height}
                      isScrolling={isScrolling}
                      onScroll={onChildScroll}
                      scrollTop={scrollTop}

                      gridStyle={{
                        outline: 'none'
                      }}

                      width={width}
                      overscanRowCount={2}

                      rowHeight={100}
                      rowGetter={rowGetter}
                      rowCount={rowCount}
                    >

                      <Column
                        dataKey="name"
                        width={210}
                        disableSort
                        cellRenderer={({ dataKey, rowData }) => {
                          return (
                            <div
                              data-row={rowData}
                            >
                              <Link href={`/product?id=${rowData.id}`}>
                                <a>
                                  {rowData.attributes.name}
                                </a>
                              </Link>
                            </div>
                          )
                        }}
                        headerRenderer={({ dataKey, sortBy, sortDirection }) => {
                          return (
                            <div>
                              Name
                            </div>
                          )
                        }}
                      />

                      <Column
                        dataKey="color"
                        width={210}
                        disableSort
                        cellRenderer={({ dataKey, rowData }) => {

                          const hex = _get(rowData, 'attributes.colors[0].hex')
                          return (
                            <div
                              style={{
                                background: hex || 'none',
                                width: 60,
                                position: 'absolute',
                                top: 5,
                                bottom: 5,
                                borderRadius: 4,
                              }}
                            />
                          )
                        }}
                        headerRenderer={() => {
                          return (
                            <div>
                              Color
                            </div>
                          )
                        }}
                      />


                      <Column
                        dataKey="logos"
                        width={210}
                        disableSort
                        className="colorSvgCell"
                        style={{
                          height: '100%',
                          position: 'relative',
                        }}
                        cellRenderer={({ dataKey, rowData }) => {

                          return (
                            <div
                              style={{
                                position: 'absolute',
                                top: 5,
                                bottom: 5,
                                left: 0,
                                right: 0,
                              }}
                            >
                              <span>
                                <style jsx>{`
                                span {
                                  line-height: 79px;
                                }
                                span :global(img) {
                                  outline: none;
                                }
                              `}
                                </style>
                                {
                                  _values(rowData.attributes.logos).map(logo => {
                                    return renderSvg(logo, rowData)
                                  })
                                }
                              </span>
                            </div>
                          )
                        }}
                        headerRenderer={() => {
                          return (
                            <div>
                              Logos
                            </div>
                          )
                        }}
                        flexGrow={1}
                      />

                      <Column
                        dataKey="logos"
                        width={210}
                        disableSort
                        className="colorSvgCell"
                        style={{
                          height: '100%',
                          position: 'relative',
                        }}
                        cellRenderer={({ rowData }) => {
                          return (
                            <div
                              style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                bottom: 0,
                                top: 0,
                              }}
                            >
                              <div className="ImgContainer">
                                <style jsx>{`
                                .ImgContainer {
                                  line-height: 79px;
                                  background: black;
                                  padding: 5px;
                                  height: 100%;
                                  border-radius: 4px;
                                }
                                .ImgContainer :global(img) {
                                  outline: none;
                                }
                              `}
                                </style>
                                {
                                  _values(rowData.attributes.icons).map(logo => {
                                    return renderSvg(logo, rowData, 'icon')
                                  })
                                }
                              </div>
                            </div>
                          )
                        }}
                        headerRenderer={() => {
                          return (
                            <div>
                              Icons
                            </div>
                          )
                        }}
                        flexGrow={1}
                      />


                    </Table>
                  )
                }}
              </AutoSizer>
            )
          }}
        </WindowScroller>


      </div>

    )


  }
})
