import React from 'react'
import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native'
import { SearchBar, ProductCard, Header, EmptyPage } from '../../components'
import { ProductDummy1, ProductDummy2, ProductDummy3, ProductDummy4, ProductDummy5 } from '../../assets'
import { colors } from '../../utils'

const WishlistPage = () => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <Header label="Favorit"/>
            <SearchBar/>
            {/* <EmptyPage illustration="EmptyWishlist" text="Wishlist Anda Kosong"/> */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                <ProductCard image={ProductDummy1} name="Kerapu Cantang" price="Rp.80.000" weight="1000 g"/>
                <ProductCard image={ProductDummy2} name="Kepiting" price="Rp.120.000" weight="1000 g"/>
                <ProductCard image={ProductDummy3} name="Tuna" price="Rp.150.000" weight="1000 g"/>
                <ProductCard image={ProductDummy4} name="Lobster" price="Rp.240.000" weight="1000 g"/>
                <ProductCard image={ProductDummy5} name="Kakap" price="Rp.40.000" weight="1000 g"/>
            </ScrollView>
        </View>
    )
}

export default WishlistPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 20
    },
    content:{
        // height:698,
        paddingHorizontal: 8,
        backgroundColor: colors.white, 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between',
    }
})
