import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import xmlJs from 'xml-js';
import themeColor from '../constants';

const SOAP_URL = 'https://cors-anywhere.herokuapp.com/http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL';

const CONTINENTS_SOAP_MSG = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ListOfContinentsByName xmlns="http://www.oorsprong.org/websamples.countryinfo">
    </ListOfContinentsByName>
  </soap:Body>
</soap:Envelope>`;

export default function ContinentsScreen() {
  const [continents, setContinents] = useState([]);

  console.log('continents',continents)

  useEffect(() => {
    const fetchContinents = async () => {
      try {
        const response = await fetch(SOAP_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/xml;charset=UTF-8',
            'SOAPAction': 'http://www.oorsprong.org/websamples.countryinfo/ListOfContinentsByName'
          },
          body: CONTINENTS_SOAP_MSG
        });
        const xmlText = await response.text();
        const jsonData = xmlToJson(xmlText);
        console.log('jsonData',jsonData)
        const continentsArray = jsonData['soap:Envelope']['soap:Body']['m:ListOfContinentsByNameResponse']['m:ListOfContinentsByNameResult']['m:tContinent'];
        setContinents(continentsArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContinents();
  }, []);

  const xmlToJson = (xml) => {
    const options = {
      compact: true,
      ignoreAttributes: true,
      ignoreDeclaration: true
    };
    const result = xmlJs.xml2js(xml, options);
    return result;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Continents</Text>
      {continents.map((continent, index) => (
        <View key={`${continent.sCode}-${index}`} style={styles.continent}>
          <Text style={styles.code}>{continent['m:sCode']._text}</Text>
          <Text style={styles.name}>{continent['m:sName']._text}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: '',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingTop: 20,
  },
  continent: {
    flexDirection: 'row',
    alignItems: 'left',
    padding: 10,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
  },
  code: {
    fontWeight: 'bold',
    marginRight: 10,
    fontColor: '#000',
  },
  name: {
    fontSize: 16,
  },
});
