import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import Geocoder from 'react-native-geocoding';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {ms, mvs} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {IcPin} from '../../assets';
import {colors, colorsDark, getData, mapStyle} from '../../utils';
import AddressDetail from './AddressDetail';
import Config from 'react-native-config';

const AddAddressPage = ({route}) => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  Geocoder.init(Config.GOOGLE_API_KEY);
  const [pin, setPin] = useState({
    latitude: null,
    longitude: null,
    latitudeDelta: 0.025,
    longitudeDelta: 0.025,
  });
  const [region, setRegion] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [userData, setUserData] = useState('');
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
      console.log('user Data', res);
      setUserData(res);
    });
  };
  useEffect(() => {
    getUserData();
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
  }, [pin]);

  return pin.latitude ? (
    <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
      <StatusBar
        barStyle={theme ? 'light-content' : 'dark-content'}
        backgroundColor={theme ? colorsDark.white : colors.white}
      />
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
            key: Config.GOOGLE_API_KEY,
            language: 'id',
            components: 'country:id',
            types: 'establishment',
            radius: 30000,
            location: `${pin.latitude}, ${pin.longitude}`,
          }}
          styles={styles.autoComplete}
        />
      </View>
      <MapView
        customMapStyle={theme ? mapStyle : null}
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        initialRegion={pin}
        region={region ? pin : null}
        showsUserLocation={true}
        onRegionChange={() => setLoading(true)}
        onRegionChangeComplete={e => {
          getAddress(e.latitude, e.longitude);
          setPin({
            ...pin,
            latitude: e.latitude,
            longitude: e.longitude,
          });
          setRegion(false);
          setLoading(false);
        }}>
        {/* <Marker coordinate={pin} /> */}
      </MapView>
      <View style={styles.marker}>
        <IcPin fill={colors.default} width={ms(48)} height={mvs(48)} />
      </View>
      <View style={{position: 'absolute', bottom: 0, right: 0, left: 0}}>
        <AddressDetail
          address={`${address.split(',', 3)}`}
          longAddress={address}
          userData={userData}
          loading={loading}
          params={route?.params}
        />
      </View>
    </View>
  ) : (
    <ActivityIndicator style={{flex: 1}} animating size="large" />
  );
};

export default AddAddressPage;

const getStyles = theme => ({
  marker: {
    position: 'absolute',
    top: mvs(305),
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  autoComplete: {
    container: {
      position: 'absolute',
      width: '90%',
      zIndex: 1,
      top: mvs(15),
    },
    textInputContainer: {
      flexDirection: 'row',
    },
    textInput: {
      backgroundColor: theme ? colorsDark.white : colors.white,
      borderRadius: ms(5),
      paddingVertical: mvs(5),
      paddingHorizontal: ms(10),
      fontSize: ms(16),
      flex: 1,
      fontFamily: 'Poppins-Medium',
    },
    poweredContainer: {
      height: 0,
      display: 'none',
    },
    powered: {},
    listView: {
      borderRadius: ms(5),
      backgroundColor: theme ? colorsDark.white : colors.white,
      paddingHorizontal: ms(15),
      paddingTop: mvs(5),
    },
    row: {
      backgroundColor: theme ? colorsDark.white : colors.white,
      alignItems: 'center',
      paddingHorizontal: 0,
      paddingVertical: mvs(10),
      flexDirection: 'row',
    },
    separator: {
      height: 1,
      backgroundColor: theme ? colorsDark.lightgrey : colors.lightgrey,
    },
    description: {
      fontFamily: 'Poppins-Regular',
      fontSize: ms(16),
      color: theme ? colorsDark.black : colors.black,
    },
  },
});
