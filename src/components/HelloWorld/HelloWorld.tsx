import React, { FC } from 'react';
import { HelloWorldProps } from '../../types/components'
import './styles.css'

export const HelloWorld: FC<HelloWorldProps> = ({ name }) => (
	<>
		<h1>Hello {name ? name : 'World'}</h1>
    <p>PROFILE: {process.env.PROFILE}</p>
    <p>ENV: {process.env.ENV}</p>
		<p>APP_ENV: {process.env.APP_ENV}</p>
		<p>NODE_ENV: {process.env.NODE_ENV}</p>
	</>
);