import * as React from 'react';
import '@fontsource/inter';
import Header from "./Header";
import Title from "./Title";
import Layout from './Layout';

function Home() {
    return (
        <div>
            <Header />
            <Title title={"General Queries"}/>
            <Layout type={"General"}/>

        </div>
    )
}

export default Home;