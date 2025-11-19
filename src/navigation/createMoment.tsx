import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateMomentScreen from '../screens/createMoment';
import { MomentCreatingForm } from '../screens/createMoment/momentcreatingForm';
import { ChoosingSubCategory } from '../screens/createMoment/choosingSubCategory';

const Stack = createNativeStackNavigator();

export default function CreateMomentStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ChoosingSubCategory">
            <Stack.Screen name="CreateMomentMain" component={CreateMomentScreen} />
            <Stack.Screen name="MomentCreatingForm" component={MomentCreatingForm} />
            <Stack.Screen name="ChoosingSubCategory" component={ChoosingSubCategory} />
        </Stack.Navigator>
    );
}
