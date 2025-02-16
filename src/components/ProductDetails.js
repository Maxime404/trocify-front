import React from 'react'
import { Text, View, SafeAreaView, YellowBox, AsyncStorage, Image } from 'react-native'
import MyHeader from './headers/Header'
import MyFooter from './footers/Footer'
import styles from '../../assets/css/details.js'
import { SliderBox } from "react-native-image-slider-box"
import MapView, { Marker, Callout } from 'react-native-maps'
import { Button, Card } from 'react-native-paper'
import PropTypes from 'prop-types'
import { Avatar } from 'react-native-elements'

const moment = require('moment')
const now = moment().format('YYYY-MM-DD hh:mm:ss')
import _ from 'lodash'

YellowBox.ignoreWarnings(['componentWillReceiveProps'])
const _console = _.clone(console)
console.warn = message => {
    if (message.indexOf('componentWillReceiveProps') <= -1) {
        _console.warn(message);
    }
}

export default class Product extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            images: [
                "https://www.fri.ch/site_2015/wp-content/plugins/ajax-search-pro/img/default.jpg"
            ],
            isVisibleNotifs: false,
            isVisibleFilters: false,
            product: this.props.route.params.product,
            isEdit: '',
            iSent: false,
            latitude: 48.8582602,
            longitude: 2.2944991
        }
        this.navigation = this.props.navigation
    }

    mapStyle = [
        { "elementType": "geometry", "stylers": [{ "color": "#242f3e" }] },
        { "elementType": "labels.text.fill", "stylers": [{ "color": "#746855" }] },
        { "elementType": "labels.text.stroke", "stylers": [{ "color": "#242f3e" }] },
        { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },
        { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },
        { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#263c3f" }] },
        { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#6b9a76" }] },
        { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#38414e" }] },
        { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#212a37" }] },
        { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#9ca5b3" }] },
        { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#746855" }] },
        { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#1f2835" }] },
        { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#f3d19c" }] },
        { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#2f3948" }] },
        { "featureType": "transit.station", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },
        { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#17263c" }] },
        { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#515c6d" }] },
        { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "color": "#17263c" }] }
    ]



    async setDataStorage() {
        let user = await AsyncStorage.getItem('data')
        if (!user) {
            this.props.navigation.navigate("SignIn")
        }
        else {
            let data = JSON.parse(user)
            this.setState({ user: data, token: data.meta.token, })
            data.customer ? this.setState({ typeUser: "customer", id: data.customer.id }) : this.setState({ typeUser: "association", id: data.association.id })
        }
    }


    async componentDidMount() {

        await this.setDataStorage()
        this.setState({
            isEdit: this.props.route.params.isEdit,
        })

        if (this.props.route.params.product.user.latitude && this.props.route.params.product.user.longitude) {
            this.setState({
                latitude: this.props.route.params.product.user.latitude,
                longitude: this.props.route.params.product.user.longitude,
            })
        }
        this.checkParams()
        this.getMoment()
        this.unsubscribe()
        console.log(this.props.route.params.isEdit)
    }


    unsubscribe = () => {
        this.props.navigation.addListener('focus', async () => {
            await this.setDataStorage()
            this.setState({
                isEdit: this.props.route.params.isEdit,
                product: this.props.route.params.product,
                iSent: false,
            })
            if (this.props.route.params.product.user.latitude && this.props.route.params.product.user.longitude) {
                this.setState({
                    latitude: this.props.route.params.product.user.latitude,
                    longitude: this.props.route.params.product.user.longitude,
                })
            }
            this.checkParams()
            this.getMoment()
        })
    }

    async componentWillUnmount() {
        this.unsubscribe();

    }


    getMoment() {
        const { product } = this.state
        const date = product.createdAt
        const newDate = date.replace('T', ' ').split('.')[0]
        const ms = moment(now, "YYYY-MM-DD HH:mm:ss").diff(moment(newDate, "YYYY-MM-DD HH:mm:ss"))
        const d = moment.duration(ms)

        if (d.days() != 0) {
            if (Math.abs(d.days()) > 1) {
                this.setState({ time: Math.abs(d.days()) + ' jours' })
            } else {
                this.setState({ time: Math.abs(d.days()) + ' jour' })
            }
        }
        else if (d.hours() != 0) {
            if (Math.abs(d.hours()) > 1) {
                this.setState({ time: Math.abs(d.hours()) + ' heures' })
            } else {
                this.setState({ time: Math.abs(d.hours()) + ' heure' })
            }
        }
        else if (d.minutes() != 0) {
            if (Math.abs(d.minutes()) > 1) {
                this.setState({ time: Math.abs(d.minutes()) + ' minutes' })
            } else {
                this.setState({ time: Math.abs(d.minutes()) + ' minute' })
            }
        }
        else if (d.seconds() != 0) {
            if (Math.abs(d.seconds()) > 1) {
                this.setState({ time: Math.abs(d.seconds()) + ' secondes' })
            } else {
                this.setState({ time: Math.abs(d.seconds()) + ' seconde' })
            }
        }
        else if (d.months() != 0) {
            this.setState({ time: Math.abs(d.months()) + ' mois' })
        }
        else if (d.years() != 0) {
            if (Math.abs(d.years()) > 1) {
                this.setState({ time: Math.abs(d.years()) + ' ans' })
            } else {
                this.setState({ time: Math.abs(d.years()) + ' an' })
            }
        }
        else {
            this.setState({ time: 'à l\'instant' })
        }
    }

    checkParams() {
        if (this.props.route.params.product == undefined || this.props.route.params.product == '') {
            this.navigation.goBack()
        }
    }

    static navigationOptions = {
        header: {
            visible: false
        }
    }

    footerType = () => {
        if (this.state.typeUser === 'customer') {
            return <MyFooter type='classic' navigation={this.navigation} />
        } else {
            return <MyFooter type='association' navigation={this.navigation} />
        }
    }

    askTicket = () => {
        const { token, id, product } = this.state
        const obj = {
            content: "Salut, je voudrais te proposer un échange :)",
            recipient: product.user.id
        }
        return fetch(`https://trocify.herokuapp.com/api/users/${id}/messages`, {
            method: 'POST',
            headers:
                new Headers({
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }),
            body: JSON.stringify(obj)
        })
            .then((response) => response.json())
            .then(() => {
                this.setState({ iSent: true })
                // console.log('Message sent !')
            })
            .catch((error) => {
                console.error(error);
            })
    }

    displayButton = () => {
        if (this.state.iSent === true) {
            return (
                <Button icon="check" mode="outlined" color='rgb(63, 81, 181)'>
                    Demande envoyée
                </Button>
            )
        } else {
            return (
                <Button icon="autorenew" mode="outlined" onPress={() => this.askTicket()} color='rgb(63, 81, 181)'>
                    Proposer un échange
                </Button>
            )
        }
    }

    render() {
        const { product, isEdit } = this.state
        return (
            <SafeAreaView style={styles.bdy}>
                {isEdit === true ? <MyHeader type='EditTicket' data={this.props.route.params.product} navigation={this.navigation} /> : <MyHeader type='back' navigation={this.navigation} />
                }

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
                    <View style={styles.slider}>
                        <SliderBox
                            images={ product.imagesFiles.length != 0 ? product.imagesFiles : this.state.images}
                            sliderBoxHeight={200}
                            onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                            dotColor="#fff"
                            inactiveDotColor="#90A4AE"
                            autoplay
                            dotStyle={{
                                width: 10,
                                height: 10,
                                borderRadius: 15,
                                marginHorizontal: 10,
                                padding: 0,
                                margin: 0,
                            }}
                        />
                    </View>

                    <View>
                        <View style={styles.detailsContainer}>
                            <View style={styles.headerContainer}>
                                {/* <Text style={styles.italic}>Posté par <Text style={styles.bold}>{product.customer.firstname}</Text></Text> */}
                                <Text style={styles.italic}>{this.state.time}</Text>
                            </View>

                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>{product.title}</Text>
                                {/* <Text>{product.category.title}</Text> */}
                            </View>

                            <View style={styles.descContainer}>
                                <Text style={styles.italic}>"{product.description}"</Text>
                            </View>

                        </View>
                    </View>

                    <View style={styles.mapContainer}>
                        <MapView
                            style={styles.mapStyle}
                            region={
                                {
                                    latitude: this.state.latitude,
                                    longitude: this.state.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }
                            }
                            customMapStyle={this.mapStyle}
                        >
                            <Marker
                                draggable
                                coordinate={
                                    {
                                        latitude: this.state.latitude,
                                        longitude: this.state.longitude
                                    }
                                }
                                // onDragEnd={() => console.log('closed')}
                                title={product.title}
                                description={product.description}
                            >
                                <View style={styles.markView}>
                                    <Image
                                        style={styles.tinyLogo}
                                        source={{ uri: product.imagesFiles.length != 0 ? product.imagesFiles[0] : 'https://www.fri.ch/site_2015/wp-content/plugins/ajax-search-pro/img/default.jpg' }}
                                    />
                                </View>
                                <Callout style={{ minWidth: 300, minHeight: 50 }}>
                                    <Card>
                                        <Card.Title title={product.title} subtitle={product.description} />
                                        <Card.Cover style={{ height: 100, margin: 5 }} source={{ uri: product.imagesFiles[0] }} />
                                    </Card>
                                </Callout>
                            </Marker>
                        </MapView>
                    </View>

                    <View style={styles.buttonContainer}>
                        {this.displayButton()}
                    </View>

                </View>
                {this.footerType()}
            </SafeAreaView>
        )
    }
}

Product.propTypes = { product: PropTypes.object }