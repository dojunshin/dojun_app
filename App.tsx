/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
/** 
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
*/
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import styles from './src/style';

interface DataItem {
  PT_NO: string;
  HSP_CLS: string;
  ORD_DTE: string;
  ORD_SEQ: string;
}

const App = () => {
  const [param1, setParam1] = useState('123456789');
  const [param2, setParam2] = useState('61');
  const [param3, setParam3] = useState('REACT_NATIVE_CODE');
  const [data, setData] = useState<DataItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiUrl = `https://do-dul.kro.kr/api/api/data?in_ptno=${param1}&in_hspcls=${param2}&in_wkid=${param3}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }

        const json = await response.json();

        if (json && json.length === 1 && !json[0].PT_NO && !json[0].HSP_CLS && !json[0].ORD_DTE && !json[0].ORD_SEQ) {
           setData([]);
        } else {
            setData(json);
        }
      } catch (err: any) {
          if (err.response) {
            setError(`${err.message} - ${err.response.status} - ${JSON.stringify(err.response.data)}`);
          } else {
            setError(err.message);
          }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [param1, param2, param3]);

  const handleItemChange = (index: number, field: keyof DataItem, newValue: string) => {
    if (data) {
      const newData = [...data];
      newData[index][field] = newValue;
      setData(newData);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>데이터를 불러오는 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>에러 발생: {error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!data || data.length === 0) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>데이터가 없습니다.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <FlatList
          data={data}
          style={styles.listContainer}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.listItem}>
              <Text style={styles.listText}>PT_NO:</Text>
              <TextInput
                style={styles.itemInput}
                value={item.PT_NO}
                onChangeText={(text) => handleItemChange(index, 'PT_NO', text)}
              />
              <Text style={styles.listText}>HSP_CLS:</Text>
              <TextInput
                style={styles.itemInput}
                value={item.HSP_CLS}
                onChangeText={(text) => handleItemChange(index, 'HSP_CLS', text)}
              />
              <Text style={styles.listText}>ORD_DTE:</Text>
              <TextInput
                style={styles.itemInput}
                value={item.ORD_DTE}
                onChangeText={(text) => handleItemChange(index, 'ORD_DTE', text)}
              />
              <Text style={styles.listText}>ORD_SEQ:</Text>
              <TextInput
                style={styles.itemInput}
                value={item.ORD_SEQ}
                onChangeText={(text) => handleItemChange(index, 'ORD_SEQ', text)}
              />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;