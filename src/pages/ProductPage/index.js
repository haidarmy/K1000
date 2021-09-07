import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {
  IcCartInactive,
  IcWishlistInactive,
  IcBack,
  IcHeartRed,
  IcClose,
  ProductDummy1,
} from '../../assets';
import {SubmitButton, Gap} from '../../components';
import {colors} from '../../utils';

const pict = [
  {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
    url: 'https://firebasestorage.googleapis.com/v0/b/k-1000-de337.appspot.com/o/Product%20Image%2FProductDummy5.jpg?alt=media&token=fd4e46e4-cc4b-44e0-9126-75042c5127ca',
    props: {
      // headers: ...
      source: ''
    },
    freeHeight: false,
  },
];

const ProductPage = ({navigation, route}) => {
  const {image, name, price, weight, description} = route.params;
  const images = image.map(img => {
      return {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2,
        url: `${img}`,
        freeHeight: false,
      }
  });

  const [isFavourite, setIsFavourite] = useState(false);
  const [dialog, setDialog] = useState(null);
  const [isActive, setIsActive] = useState(0);
  let change = ({nativeEvent}) => {
    const slide = Math.round(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== isActive) {
      setIsActive(slide);
    }
  };

  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);

  return (
    <View style={styles.page}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="rgba(0,0,0,0)"
        animated
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setDialog(true)}
          style={styles.imageContainer}>
          <ScrollView
            pagingEnabled
            horizontal
            onScroll={change}
            showsHorizontalScrollIndicator={false}>
            {images.map((image, index) => (
              <Image
                key={index}
                source={{uri: image.url}}
                style={styles.image}
              />
            ))}
          </ScrollView>
          <View style={styles.pagination}>
            {images.map((image, index) => (
              <Text
                key={index}
                style={
                  index == isActive
                    ? styles.pagingActiveText
                    : styles.pagingText
                }>
                ⬤
              </Text>
            ))}
          </View>
          <View
            style={{
              width: Dimensions.get('window').width,
              justifyContent: 'space-between',
              flexDirection: 'row',
              position: 'absolute',
              paddingTop: 40,
              paddingHorizontal: 20,
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('HomePage')}
              style={styles.backButton}>
              <IcBack width={30} height={30} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loveButton}
              onPress={() => {
                setIsFavourite(toggle => !toggle);
              }}
              activeOpacity={0.7}>
              {isFavourite ? <IcHeartRed /> : <IcWishlistInactive />}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <Modal
          onRequestClose={() => setDialog(false)}
          visible={dialog}
          transparent={true}
          style={styles.imageContainer}>
          <View style={{flex: 1}}>
            <StatusBar barStyle="dark-content" backgroundColor="rgb(0,0,0)" />
            <ImageViewer
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height / 2,
              }}
              index={isActive}
              onCancel={() => setDialog(false)}
              menus={() => null}
              enableSwipeDown={true}
              imageUrls={images}></ImageViewer>
            <View
              style={{
                flexDirection: 'row-reverse',
                position: 'absolute',
                top: 15,
                right: 15,
              }}>
              <IcClose
                width={30}
                height={30}
                onPress={() => setDialog(false)}
              />
            </View>
          </View>
        </Modal>
        <View style={styles.content}>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>Rp {price}</Text>
            <Text style={styles.weight}>{weight} kg</Text>
          </View>
          <View>
            <Text style={styles.desc}>Deskripsi</Text>
            <Text
              onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 4}
              style={styles.detail}>
              {description}
            </Text>

            {lengthMore ? (
              <Text
                onPress={toggleNumberOfLines}
                style={{
                  lineHeight: 21,
                  marginTop: 10,
                  color: colors.default,
                  fontFamily: 'Poppins-Bold',
                }}>
                {textShown ? 'Baca lebih sedikit...' : 'Baca selengkapnya...'}
              </Text>
            ) : null}
            <Gap height={20} />
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.footerWrapper}>
          <TouchableOpacity activeOpacity={0.7} style={styles.cart}>
            <IcCartInactive
              width={24}
              height={24}
              onPress={() => navigation.navigate('CartPage')}
            />
          </TouchableOpacity>
          <View style={styles.button}>
            <SubmitButton
              label="Tambah ke Keranjang"
              onPress={() => navigation.replace('SuccessAddToCartPage')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    width: undefined,
    height: 375,
  },
  backButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loveButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 35,
  },
  infoContainer: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    color: colors.black,
    fontFamily: 'Poppins-SemiBold',
  },
  price: {
    fontSize: 24,
    color: colors.default,
    fontFamily: 'Poppins-SemiBold',
  },
  weight: {
    marginTop: -5,
    fontSize: 14,
    color: colors.grey,
    fontFamily: 'Poppins-SemiBold',
  },
  desc: {
    fontSize: 20,
    color: colors.black,
    fontFamily: 'Poppins-Medium',
  },
  detail: {
    fontSize: 16,
    color: colors.grey,
    fontFamily: 'Poppins-Regular',
    lineHeight: 21,
    textAlign: 'justify',
  },
  footer: {
    height: 122,
    backgroundColor: colors.lightgrey,
  },
  footerWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cart: {
    width: 58,
    height: 58,
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 58,
    width: 280,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 375,
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: 15,
  },
  pagingText: {
    color: colors.black,
  },
  pagingActiveText: {
    color: colors.lightgrey,
  },
});

export default ProductPage;
