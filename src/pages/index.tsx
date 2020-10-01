import React, { useState } from 'react';
import Layout from '../layout';
import Head from 'next/head';
import { v4 as uuidv4 } from 'uuid';
import { useQuery } from 'react-query';
import fetch from '../utils/fetch';

const Home = () => {
    const fetchWordCount = async () => {
        const data = await fetch('./api/count', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: uuidv4(),
                message: value,
            }),
        });
        console.log('data-in-call', data);
        return data;
    };

    const [value, setValue] = useState('');
    const { isLoading, error, data, refetch } = useQuery(
        'getCount',
        fetchWordCount,
        {
            refetchOnWindowFocus: false,
            enabled: false, // turned off by default, manual refetch is needed
        }
    );

    const getWordCount = async (e) => {
        e.preventDefault();
        await refetch();
    };

    return (
        <>
            <Head>
                <title>Word Count Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <div className="container mx-auto flex flex-col align-center items-center pt-8">
                    <h1 className="text-6xl font-bold">Word Count</h1>
                    <p>Enter a sentence and we will count the total words. (Punctuation is limited to commas and periods)</p>
                    <form
                        className="flex flex-col w-full lg:w-1/2 mt-4"
                        onSubmit={(e) => getWordCount(e)}
                    >
                        <textarea
                            className="border border-black p-2 h-15 text-black"
                            placeholder="Type a sentence"
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <button
                            className="border border-black py-2 px-4 bg-purple-600 text-white mt-6 text-xl font-bold"
                            type="submit"
                        >
                            Start counting
                        </button>
                    </form>
                    {data && data.count ? <div className="p-4 border border-dashed border-white mt-8 w-full lg:w-1/2">Total word count: {data.count}</div> : null}
                    {isLoading ? <div>Loading.......</div> : null}
                    {data && data.status ? <div className="p-2 bg-white text-red-800 mt-6 w-full lg:w-1/2">{data.message}</div> : null}
                </div>
            </Layout>
        </>
    );
};

export default Home;
