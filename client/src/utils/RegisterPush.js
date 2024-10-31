import { subscribeNotification } from "../services/notification";

export const registerPush = async (registration) => {
    try {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'BAfrLSCcIiP5wzRWQ4PnNC4XgvMVeNjJ5feffe4ez_VkFXN1rK8fnLnWFkpXvWCIQ7X8JmJSpucIl1vL7E4cWq4' 
      });
    subscribeNotification({subscription})
    return subscription
    } catch (error) {
      console.error('Failed to subscribe for push:', error);
    }
  };