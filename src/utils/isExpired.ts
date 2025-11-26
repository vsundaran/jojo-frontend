export const isExpired = (expiryTime: string) => {
    const currentTime = new Date();
    const expiresAt = new Date(expiryTime);

    return currentTime >= expiresAt;
}

