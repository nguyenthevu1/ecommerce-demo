import React from 'react';
import Header from './../compnents/Header';
import Footer from './../compnents/Footer';
import ShopSection from './../compnents/homeComponents/ShopSection';
import Contactinfo from './../compnents/homeComponents/Contactinfo';
import CalltoActionSection from './../compnents/homeComponents/CalltoActionSection';
import { useParams } from 'react-router-dom';

const HomeScreen = () => {
    const search = useParams()
    window.scrollTo(0, 0)
    return (
        <div>
            <Header />
            <ShopSection keyword={search.keyword} pagenumber={search.pagenumber} />
            <CalltoActionSection />
            <Contactinfo />
            <Footer />
        </div>
    );
};

export default HomeScreen;
