import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from '../Screens/Inicio';

const Stack = createNativeStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Inicio' component={Inicio} options={{headerShown: true, headerStyle:{backgroundColor:'#005603'}, headerTitleStyle:{color:'white'}}}/>
        </Stack.Navigator>
    );
}

export default MyStack;