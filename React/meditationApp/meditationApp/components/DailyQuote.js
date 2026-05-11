import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const DailyQuote = ({isDarkMode}) => {
    const [quote, setQuote] = useState('');
    const [loading, setLoading] = useState(false);

    const countWords = (text) => {
        // Trim extra spaces and count words
        const words = text.trim().split(/\s+/);
        return text.trim() === "" ? 0 : words.length;
    };

    const fetchQuote = async () => {
        setLoading(true);
        let data = { quote: '' };
        try {
            while(countWords(data.quote) === 0 || countWords(data.quote) > 15 ) {
                let response = await fetch('https://dummyjson.com/quotes/random');
                if (response.ok) {
                    data = await response.json();
                    setQuote(data.quote);
                } else {
                    console.error('Error fetching quote:', response.status);
                    break;
                }
            }
        } catch (error) {
            console.error('Error fetching quote:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="small" color="#0000ff" />
            ) : (
            <>
                <Text style={styles.quoteText(isDarkMode)}>"{quote}"</Text>
            </>
            )}
        </View>
    );
}
export default DailyQuote;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // border: '1px solid #ccc',
    // borderTopRightRadius: 10,
    // borderBottomLeftRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  quoteText: (isDarkMode) => ({
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 10,
    textAlign: 'center',
    color: isDarkMode ? '#f9f57eff' : '#000000',
  }),
});
