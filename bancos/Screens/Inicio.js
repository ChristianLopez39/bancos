import React, { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import getBancos from '../Services/BancosServices';
import { Button, Card } from 'react-native-paper';
import {
    SkypeIndicator,
} from 'react-native-indicators';
import { initBancos, guardarBancos, recuperarBancosSql } from '../Sqlite/BancosSqlite';

const Inicio = () => {

    const [listBancos, setListBancos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        crearTablaYRecuperar();
    }, [])

    const crearTablaYRecuperar = async () => {
        await initBancos();
        await recuperarBancos();
    }

    const recuperarBancos = async () => {

        //recuperamos los datos de banco local
        let localBancos = await recuperarBancosSql()

        if (localBancos.length === 0) {
            //en caso de no haber datos en la tabla local se recuperaran de la API
            getBancos().then(async (resp) => {
                console.log('resp: ' + resp)

                //se guardan los datos en local
                for (var x = 0; x < resp.length; x++) {
                    let listaBancos = await guardarBancos(resp[x].url, resp[x].description, resp[x].age, resp[x].bankName)
                    console.log('lista de banco ' + listaBancos)
                }

                setListBancos(resp)
                setLoading(false)
            })
        } else {
            //si existen datos en local ya no es necesario internet
            let listTemp = []
            //agregamos los datos a la listTemp
            for (var x = 0; x < localBancos.length; x++) {
                listTemp.push({
                    bankName: localBancos[x].bankName,
                    url: localBancos[x].url,
                    age: localBancos[x].age,
                    description: localBancos[x].description
                })
            }
            setListBancos(listTemp)
            setLoading(false)
        }
    }

    function Item({ item }) {
        return (
            <View>
                <Card style={styles.card}>
                    <Card.Title titleStyle={styles.titleCard} title={item.item.bankName} />
                    <Card.Content>
                        <View style={styles.imagePosition}>
                            <Image
                                style={styles.imageCard}
                                source={{
                                    uri: item.item.url,
                                }}
                            />
                        </View>
                        <Text style={styles.textCard} variant="bodyMedium">{item.item.description}</Text>
                        <Text style={styles.textCard} variant="titleLarge">{item.item.age} Años</Text>
                    </Card.Content>
                </Card>
            </View>
        )
    }

    return (
        <View style={styles.content}>
            {loading == true ? (
                <SkypeIndicator size={100} color='#15671C' />
            ) : (
                <FlatList
                    data={listBancos}
                    renderItem={(item) => (
                        <Item
                            item={item}
                        />
                    )}
                >
                </FlatList>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EAEAEA'
    },
    card: {
        marginTop: 20,
        marginHorizontal: 20
    },
    imageCard: {
        height: 150,
        width: 280,
        borderRadius: 10,
        marginBottom: 20
    },
    imagePosition: {
        alignSelf: 'center'
    }, 
    titleCard: {
        textAlign:'center', 
        fontSize:17, 
        fontWeight:'bold'
    },
    textCard: {
        textAlign: 'center',
        color:'black'
    }

});

export default Inicio;
