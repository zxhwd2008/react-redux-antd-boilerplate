import React from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export const Root = (props) =>
  <section>
    <Header routing={props.routing} />
    {React.cloneElement(props.children, {routing: props.routing})}
    <Footer routing={props.routing} />
  </section>
