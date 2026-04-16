const UserProfile = require('../domain/UserProfile');

class UpdateMyProfileUseCase {
  constructor(userProfileRepository) {
    this.userProfileRepository = userProfileRepository;
  }

  async execute(userId, payload) {
    const profileEntity = new UserProfile({
      userId,
      ...payload
    });

    profileEntity.validate();

    const updatedProfile = await this.userProfileRepository.updateByUserId(userId, {
      fullName: profileEntity.fullName,
      address: profileEntity.address,
      avatar: profileEntity.avatar
    });

    return {
      userId: updatedProfile.userId,
      fullName: updatedProfile.fullName,
      address: updatedProfile.address,
      avatar: updatedProfile.avatar,
    };
  }
}

module.exports = UpdateMyProfileUseCase;
