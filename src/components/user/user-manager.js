// User manager component
class UserManager {
    constructor() {
        this.currentUser = '';
        this.init();
    }
    
    init() {
        this.loadSavedUsers();
        this.attachEventListeners();
    }
    
    attachEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'save-user') {
                this.saveUser();
            }
        });
        
        document.addEventListener('change', (e) => {
            if (e.target.id === 'saved-users') {
                this.loadUser();
            }
        });
    }
    
    saveUser() {
        const userNameInput = document.getElementById('user-name');
        const userName = userNameInput.value.trim();
        
        if (!userName) return;
        
        if (StorageService.saveUser(userName)) {
            this.currentUser = userName;
            userNameInput.value = '';
            this.loadSavedUsers();
        }
    }
    
    loadSavedUsers() {
        const savedUsers = StorageService.getSavedUsers();
        const select = document.getElementById('saved-users');
        
        if (select) {
            select.innerHTML = '<option value="">Select saved user</option>';
            savedUsers.forEach(user => {
                const option = document.createElement('option');
                option.value = user;
                option.textContent = user;
                select.appendChild(option);
            });
        }
    }
    
    loadUser() {
        const select = document.getElementById('saved-users');
        const userNameInput = document.getElementById('user-name');
        
        if (select && userNameInput) {
            const selectedUser = select.value;
            this.currentUser = selectedUser;
            userNameInput.value = selectedUser;
        }
    }
    
    getCurrentUser() {
        return this.currentUser;
    }
}