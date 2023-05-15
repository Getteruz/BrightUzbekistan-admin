import React from 'react';
import { Outlet } from 'react-router-dom';
import ComponentsWrapper from '../../components/ComponentsWrapper';
import LeftAside from './components/LeftAside';

const ReklamaLayout = () => {
    return (
        <ComponentsWrapper>
            <LeftAside />
            <Outlet />
            <span></span>
        </ComponentsWrapper>
    );
}

export default ReklamaLayout;
