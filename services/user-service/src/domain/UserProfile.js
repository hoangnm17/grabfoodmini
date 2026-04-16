class UserProfile {
  constructor({ id, userId, fullName, address, avatar }) {
    this.id = id;
    this.userId = userId;
    this.fullName = fullName || '';
    this.address = address || '';
    this.avatar = avatar || '';
  }

  validate() {
    if (!this.userId) {
      throw new Error('UserId is required for a profile');
    }
    if (this.fullName && this.fullName.length < 2) {
      throw new Error('Full Name must be at least 2 characters long');
    }
  }
}

module.exports = UserProfile;
