import React, { useEffect } from 'react';
import QuoteList from '../components/quotes/QuoteList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api';
import NoQuotesFound from '../components/quotes/NoQuotesFound';

// const DUMMY_QUOTES = [
//   { id: 'q1', author: 'Adarsh', text: 'Understand the concept.' },
//   { id: 'q2', author: 'Sandeep sir', text: 'Aasan hei!' },
//   {
//     id: 'q3',
//     author: 'Uncle Ben',
//     text: 'With great power comes great responsibility',
//   },
// ];

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className='centered focused'>{error}</p>;
  }

  if (status === 'completed' && (!loadedQuote || loadedQuote.length === 0)) {
    return <NoQuotesFound />;
  }

  return <QuoteList quotes={loadedQuote} />;
};

export default AllQuotes;
