import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, StatusBar} from 'react-native';
import {IcPin} from '../../assets';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {colors, getData} from '../../utils';
import AddressDetail from './AddressDetail';

const AddAddressPage = () => {
  Geocoder.init('AIzaSyD4FwkBipsAqdlu-HiWgSWfmoxirTNjDMc');
  const [pin, setPin] = useState({
    latitude: null,
    longitude: null,
    latitudeDelta: 0.025,
    longitudeDelta: 0.025,
  });
  const [region, setRegion] = useState(false);
  const [address, setAddress] = useState('');
  const [userData, setUserData] = useState('')
  const getAddress = (lat, lng) => {
    Geocoder.from(lat, lng)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        console.log(addressComponent);
        setAddress(addressComponent);
      })
      .catch(error => console.warn(error));
  };
  const getUserData = () => {
    getData('user').then(res => {
      console.log('user Data', res)
      setUserData(res)
    });
  };
  useEffect(() => {
    getUserData()
    Geolocation.getCurrentPosition(
      position => {
        // alert(JSON.stringify(position));
        const {longitude, latitude} = position.coords;
        setPin({
          ...pin,
          latitude,
          longitude,
        });
      },
      error => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);
  return pin.latitude ? (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <View style={{alignItems: 'center'}}>
        <GooglePlacesAutocomplete
          fetchDetails={true}
          GooglePlacesSearchQuery={{
            rankby: 'distance',
          }}
          placeholder="Search"
          onPress={(data, details = null) => {
            console.log(
              `Lat ${details.geometry.location.lat} Long ${details.geometry.location.lng}`,
            );
            setPin({
              ...pin,
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });
            setRegion(true);
          }}
          query={{
            key: 'AIzaSyD4FwkBipsAqdlu-HiWgSWfmoxirTNjDMc',
            language: 'id',
            components: 'country:id',
            types: 'establishment',
            radius: 30000,
            location: `${pin.latitude}, ${pin.longitude}`,
          }}
          styles={{
            container: {
              flex: 0,
              position: 'absolute',
              width: '90%',
              zIndex: 1,
              top: 15,
            },
            listView: {backgroundColor: 'white'},
          }}
        />
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        initialRegion={pin}
        region={region ? pin : null}
        showsUserLocation={true}
        // onRegionChange={e => {
        //   // console.log('latitude', e.latitude);
        //   // console.log('longitude', e.longitude);
        //   getAddress(e.latitude, e.longitude);
        //   setPin({
        //     ...pin,
        //     latitude: e.latitude,
        //     longitude: e.longitude,
        //   });
        //   setRegion(false);
        // }}
        onRegionChangeComplete={e => {
          getAddress(e.latitude, e.longitude);
          setPin({
            ...pin,
            latitude: e.latitude,
            longitude: e.longitude,
          });
          setRegion(false);
        }}>
        {/* <Marker coordinate={pin}/> */}
      </MapView>
      <View style={styles.marker}>
        <IcPin fill={colors.default} width={48} height={48} />
      </View>
      <AddressDetail address={`${address.split(',', 3)}`} longAddress={address} userData={userData}/>
    </View>
  ) : (
    <ActivityIndicator style={{flex: 1}} animating size="large" />
  );
};

export default AddAddressPage;

const styles = StyleSheet.create({
  marker: {
    position: 'absolute',
    top: 200,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
