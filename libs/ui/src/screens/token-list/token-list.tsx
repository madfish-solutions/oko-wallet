import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
// @ts-ignore
import CaverExtKAS from 'caver-js-ext-kas';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';

import { TokenListStyles } from './token-list.styles';

type Token = {
    balance: string;
    extras: {
        symbol: string;
        formattedValue: string;
    }
}

const chainId = 8217;
const accessKeyId = 'KASKN7Y8N105H07DA1KHTQKG';
const secretAccessKey = '1jg91tCdx6y3C4bF08i0GsgA7A1ejiqWuhbrhKD4';

const ownerAddress = '0x84757a438E06631f34b2199B5D92e6865cE47D50';

const caver = new CaverExtKAS(chainId, accessKeyId, secretAccessKey);

const getTokens = async () => {
    try {
        const tokens = await caver.kas.tokenHistory.getTokenListByOwner(ownerAddress);
        return tokens?.items || [];
    } catch (ex) {
        console.error('getting list of tokens error: ' + ex);
    }
}

const getBalance = async () => {
    try {
        const balance = await caver.klay.getBalance(ownerAddress);
        return caver.utils.convertFromPeb(balance, 'KLAY');
    } catch (ex) {
        console.error('balance getting error: ' + ex);
    }
}

export const TokenList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [KLAYBalance, setKLAYBalance] = useState(0);
    const [tokenList, setTokenList] = useState<Token[]>([]);

    useEffect(() => {
        const getTokensBalances = async () => {
            setIsLoading(true);
            setKLAYBalance(await getBalance());
            setTokenList(await getTokens());
            setIsLoading(false);
        }

        getTokensBalances();
    }, []);

    return (
        <View style={TokenListStyles.container}>
            <NavigationBar/>
            <View style={TokenListStyles.tokensList}>
                {isLoading ?
                <ActivityIndicator/> :
                <>
                    <View style={TokenListStyles.token}>
                        <Text>KLAY:</Text>
                        <Text style={TokenListStyles.tokenBalance}>
                            {KLAYBalance}
                        </Text>
                    </View>
                    {tokenList.map(({extras}) => (
                        <View key={extras.symbol} style={TokenListStyles.token}>
                            <Text>{extras.symbol}:</Text>
                            <Text style={TokenListStyles.tokenBalance}>
                                {extras.formattedValue}
                            </Text>
                        </View>
                    ))}
                </>}
            </View>
        </View>
)};
