import React from 'react';
import Banner from '../Banner/Banner';
import Review from '../Review/Review';
import { Helmet } from 'react-helmet-async';
import PopularInstructor from '../PopularInstructor/PopularInstructor';
import TopClass from '../TopClass/TopClass';

const Home = () => {
    return (
        <div className='bg-violet-300'>
            <Helmet>
                <title>Music School-Home</title>
            </Helmet>
            <Banner></Banner>
            <TopClass></TopClass>
            <PopularInstructor></PopularInstructor>
            <Review></Review>
        </div>
    );
};

export default Home;