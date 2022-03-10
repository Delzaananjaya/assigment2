import React ,{useState, useEffect} from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import Currency from '../Currency/Currency';
import './RateCurrency.css';

const RateCurrency = () => {
    const currencyFreaksAPILink = 'https://api.currencyfreaks.com/latest?apikey=83f15a4ac4f546868a5d62c7f05496f9&symbols=CAD,IDR,JPY,CHF,EUR,GBP';
    const [isLoading, setIsLoading] = useState(true);
    const [currencies, setCurrencies] = useState([]);

    const calculatePercentation = (value, percent) => {
        return value * (percent/100);
    }

    const formatData = (data) => {
        let result = [];
        const currencyRates = data.rates;
        const currencyNames = Object.keys(data.rates);
        
        currencyNames.forEach((c => {
            let currencyName = c;
            let currencyExchangeRate = parseFloat(currencyRates[c]);
            let currencyBuy = currencyExchangeRate + calculatePercentation(currencyExchangeRate, 5);
            let currencySell = currencyExchangeRate - calculatePercentation(currencyExchangeRate, 5);
            
            result.push({
                name: currencyName,
                buy: (Math.round((currencyBuy + Number.EPSILON) * 1000) / 1000),
                exchangeRate: currencyExchangeRate,
                sell: (Math.round((currencySell + Number.EPSILON) * 1000) / 1000)
            }, []
            );

        }));
        setCurrencies(result);
    }

    useEffect(() => {
        const fetchCurrency = () => {
            return fetch(currencyFreaksAPILink)
            .then((res) => res.json())
            .then((data) => {
                formatData(data);
                
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));   
        };
        fetchCurrency();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const showTable = () => {
        if (!isLoading) {
            return (
                <table>
                    <thead>
                        <tr>
                            <th> Currency </th>
                            <th> We Buy </th>
                            <th> Exchange Rate </th>
                            <th> We Sells </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currencies.map(c => {
                            return <Currency key={c.name} currency={c} />
                        })}
                    </tbody>
                </table> 
            )
        }
        else {
            return <p></p>
        }
    }

    return (
        <Fragment>
            {showTable()}
        </Fragment>
    )
}

export default RateCurrency;