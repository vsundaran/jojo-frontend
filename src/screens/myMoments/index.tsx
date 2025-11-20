import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { lightTheme } from '../../theme';
import { MomentCard, MomentVariant } from './components/MomentCard';

interface MomentData {
    id: string;
    title: MomentVariant;
    subTag: string;
    description: string;
    callCount: number;
    likeCount: number;
    isOn: boolean;
}

export default function MyMomentsScreen() {
    const [moments, setMoments] = useState<MomentData[]>([
        {
            id: '1',
            title: 'Wishes',
            subTag: 'Birthday',
            description: 'My 60th birthday ! I would like a heartfelt wishes.',
            callCount: 20,
            likeCount: 20,
            isOn: true,
        },
        {
            id: '2',
            title: 'Motivation',
            subTag: 'Interview',
            description: 'I have an interview tomorrow and I am bit nervous.',
            callCount: 20,
            likeCount: 20,
            isOn: false,
        },
        {
            id: '3',
            title: 'Song',
            subTag: 'Songs',
            description: 'I want to hear the song',
            callCount: 20,
            likeCount: 20,
            isOn: false,
        },
        {
            id: '4',
            title: 'Wishes',
            subTag: 'Birthday',
            description: 'My fifth wedding anniversary ! I would like a heartfelt wishes.',
            callCount: 20,
            likeCount: 20,
            isOn: false, // As per design, the third card has a grey toggle which implies off or disabled. Assuming off for now.
        },
        {
            id: '5',
            title: 'Celebration',
            subTag: 'Birthday',
            description: 'My fifth birthday ! I would like a heartfelt wishes.',
            callCount: 20,
            likeCount: 20,
            isOn: false, // As per design, the third card has a grey toggle which implies off or disabled. Assuming off for now.
        },
        {
            id: '6',
            title: 'Wishes',
            subTag: 'Birthday',
            description: 'My 60th birthday ! I would like a heartfelt wishes.',
            callCount: 20,
            likeCount: 20,
            isOn: true,
        },
        {
            id: '7',
            title: 'Motivation',
            subTag: 'Interview',
            description: 'I have an interview tomorrow and I am bit nervous.',
            callCount: 20,
            likeCount: 20,
            isOn: false,
        },
        {
            id: '8',
            title: 'Song',
            subTag: 'Songs',
            description: 'I want to hear the song',
            callCount: 20,
            likeCount: 20,
            isOn: false,
        },
        {
            id: '9',
            title: 'Wishes',
            subTag: 'Birthday',
            description: 'My fifth wedding anniversary ! I would like a heartfelt wishes.',
            callCount: 20,
            likeCount: 20,
            isOn: false, // As per design, the third card has a grey toggle which implies off or disabled. Assuming off for now.
        },
        {
            id: '10',
            title: 'Celebration',
            subTag: 'Birthday',
            description: 'My fifth birthday ! I would like a heartfelt wishes.',
            callCount: 20,
            likeCount: 20,
            isOn: false, // As per design, the third card has a grey toggle which implies off or disabled. Assuming off for now.
        },
    ]);

    const handleToggle = (id: string) => {
        setMoments((prevMoments) =>
            prevMoments.map((moment) =>
                moment.id === id ? { ...moment, isOn: !moment.isOn } : moment
            )
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {moments.map((moment) => (
                    <MomentCard
                        key={moment.id}
                        title={moment.title}
                        subTag={moment.subTag}
                        description={moment.description}
                        callCount={moment.callCount}
                        likeCount={moment.likeCount}
                        isOn={moment.isOn}
                        onToggle={() => handleToggle(moment.id)}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightTheme.colors.background,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 100, // Add padding for bottom navigation or other elements
    },
});
