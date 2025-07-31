// User manager component
class UserManager {
    constructor() {
        this.currentUser = '';
        this.init();
    }
    
    init() {
        // Since this is called after cart is rendered, we can directly initialize
        this.loadCurrentUser();
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
        
        // Listen for input changes to update current user
        document.addEventListener('input', (e) => {
            if (e.target.id === 'user-name') {
                this.setCurrentUser(e.target.value.trim());
            }
        });
    }
    
    saveUser() {
        const userNameInput = document.getElementById('user-name');
        const userName = userNameInput.value.trim();
        
        if (!userName) return;
        
        if (StorageService.saveUser(userName)) {
            this.setCurrentUser(userName);
            userNameInput.value = userName;
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
                if (user === this.currentUser) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
        }
    }
    
    loadUser() {
        const select = document.getElementById('saved-users');
        const userNameInput = document.getElementById('user-name');
        
        if (select && userNameInput) {
            const selectedUser = select.value;
            this.setCurrentUser(selectedUser);
            userNameInput.value = selectedUser;
        }
    }
    
    loadCurrentUser() {
        const savedCurrentUser = StorageService.getCurrentUser();
        if (savedCurrentUser) {
            this.currentUser = savedCurrentUser;
            const userNameInput = document.getElementById('user-name');
            if (userNameInput) {
                userNameInput.value = savedCurrentUser;
            }
        }
    }
    
    setCurrentUser(userName) {
        this.currentUser = userName;
        StorageService.setCurrentUser(userName);
    }
    
    getCurrentUser() {
        return this.currentUser;
    }
}


