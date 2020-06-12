import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native'
import styles from '../../../assets/styles/profilCusto'


export default class Profil extends Component {


  render() {
    return (
      <View style={styles.safeArea}>

        {/* Header */}

        <View style={styles.header}>
          <Text style={{ color: "white" }}>Header</Text>
        </View>

        <View style={styles.view}>
          {/* View */}
          <View style={styles.infosProfile}>
            <Text> Steven Renault</Text>
            <Text> Fruit du Dragon</Text>
            <Text> Note</Text>
            <Text>4/5</Text>
          </View>

          <View style={styles.card}>
            <Image
              style={styles.cardLogo}
              source={require('../../../assets/img/yen.png')}
            />
            <TouchableOpacity>
              <Text>MES TROCS</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Image
              style={styles.cardLogo}
              source={require('../../../assets/img/gift.png')}
            />
            <TouchableOpacity>
              <Text>MES DONS</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Image
              style={styles.cardLogo}
              source={require('../../../assets/img/cup.png')}
            />
            <TouchableOpacity>
              <Text>MON RANK</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Image
              style={styles.cardLogoClock}
              source={require('../../../assets/img/clock.png')}
            />
            <TouchableOpacity>
              <Text>HISTORIQUE</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Image
              style={styles.cardLogoRelation}
              source={require('../../../assets/img/relationship.png')}
            />
            <TouchableOpacity>
              <Text>LES ASSOCIATIONS</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.param}>
            <TouchableOpacity>
              <Text>PARAMETRES</Text>
            </TouchableOpacity>

          </View>
        </View>

        {/* Footer  */}

        <View style={styles.footer}>
          <Text style={{ color: "white" }}>Footer</Text>
        </View>

      </View>
    )
  }
}
