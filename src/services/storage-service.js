// Local storage service
class StorageService {
    static get(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error getting from localStorage:', error);
            return null;
        }
    }
    
    static set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error setting to localStorage:', error);
            return false;
        }
    }
    
    static remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    }
    
    static getSavedUsers() {
        return this.get(APP_CONFIG.STORAGE_KEYS.SAVED_USERS) || [];
    }
    
    static saveUser(userName) {
        const savedUsers = this.getSavedUsers();
        if (!savedUsers.includes(userName)) {
            savedUsers.push(userName);
            return this.set(APP_CONFIG.STORAGE_KEYS.SAVED_USERS, savedUsers);
        }
        return true;
    }
    
    static getCurrentUser() {
        return this.get(APP_CONFIG.STORAGE_KEYS.CURRENT_USER) || '';
    }
    
    static setCurrentUser(userName) {
        return this.set(APP_CONFIG.STORAGE_KEYS.CURRENT_USER, userName);
    }
    
    static clearCurrentUser() {
        return this.remove(APP_CONFIG.STORAGE_KEYS.CURRENT_USER);
    }
}
