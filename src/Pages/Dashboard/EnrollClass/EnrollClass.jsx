import React from 'react';
import { Helmet } from 'react-helmet-async';
import Title from '../../../components/Title/Title';

const EnrollClass = () => {
    return (
        <div>
            <Helmet>
                <title>Music School - Enroll Class</title>
            </Helmet>
            <Title heading={'My Enroll Classes'}></Title>
        </div>
    );
};

export default EnrollClass;