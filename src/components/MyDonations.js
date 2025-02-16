import React from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, FlatList, Image, Button } from 'react-native'
import MyHeader from './headers/Header'
import MyFooter from './footers/Footer'
import styles from '../../assets/css/home.js'
import stylesProfile from '../../assets/styles/profilCusto'
import { Card, Avatar } from 'react-native-elements'

export default class MydDonations extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trocs: {},
      tickets: {}
    }
    this.navigation = this.props.navigation
  }


  componentDidMount = async () => {

    this.unsubscribe()
  }

  mydDonations = () => {
    let mydDonations = []
    for (const ticket of this.props.route.params.tickets) {
      if (ticket.type === 'donation') {
        mydDonations.push(ticket)
      }
    }
    this.setState({
      trocs: mydDonations
    })
  }


  unsubscribe = () => {
    this.props.navigation.addListener('focus', () => {
      this.mydDonations()
    })
  }

  async componentWillUnmount() {
    this.unsubscribe();
  }

  redirect(page, data) {
    if (data != '') {
      this.navigation.navigate(page, data)
    } else {
      this.navigation.navigate(page)
    }
  }


  render() {
    return (
      <SafeAreaView style={styles.bdy}>
        <MyHeader type='Return' navigation={this.navigation} />

        <View style={{ alignItems: "center", top: 40, position: 'absolute', zIndex: 1, alignSelf: 'center', justifyContent: 'center' }}>
          <Avatar
            rounded
            size={100}
            onPress={(() => this.props.navigation.navigate("Profil"))}
            source={{
              uri:
                "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
            }}
          />
        </View>

        <View style={styles.container}>
          <View >
            <View style={stylesProfile.lineRank}></View>
            <Text> MES DONS </Text>
            <View style={stylesProfile.lineRank}></View>
          </View>

          <FlatList
            data={this.state.trocs}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.redirect('ProductDetails', { product: item, isEdit:true })}>
                <Card>
                <View style={{flex:1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: 100,maxHeight:110}}>
                    <Image
                      style={{ width: 100, height: 100, borderRadius: 50 }}
                      resizeMode="cover"
                      source={{uri: item.imagesFiles.length != 0 ? item.imagesFiles[0] : 'https://www.fri.ch/site_2015/wp-content/plugins/ajax-search-pro/img/default.jpg'}}
                      />
                    <Text>{item.title}</Text>
                  </View>
                </Card>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            horizontal={false}
            numColumns={2}
          />
        </View>
        <MyFooter type='classic' navigation={this.navigation} />
      </SafeAreaView>
    )
  }
}