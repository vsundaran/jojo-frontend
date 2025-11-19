import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateMomentScreen from '../screens/createMoment';
import { MomentCreatingForm } from '../screens/createMoment/momentcreatingForm';

const Stack = createNativeStackNavigator();

export default function CreateMomentStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="CreateMomentMain">
            <Stack.Screen name="CreateMomentMain" component={CreateMomentScreen} />
            <Stack.Screen name="MomentCreatingForm" component={MomentCreatingForm} />
        </Stack.Navigator>
    );
}
