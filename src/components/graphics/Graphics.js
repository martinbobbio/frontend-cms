import React, { Fragment } from 'react';
import GraphicClient from './GraphicClient';
import GraphicSeller from './GraphicSeller';

const Graphics = () => (
    <Fragment>
        <h2 className="text-success text-center display-4 mb-5">Graphics</h2>
        <GraphicClient/>
        <GraphicSeller/>
    </Fragment>
);

export default Graphics