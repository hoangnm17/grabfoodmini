class GetMyProfileUseCase {
  constructor(userProfileRepository) {
    this.userProfileRepository = userProfileRepository;
  }

  async execute(userId) {
    if (!userId) throw new Error('User ID is missing');

    const profile = await this.userProfileRepository.findByUserId(userId);
    
    if (!profile) {
       return {
         userId,
         fullName: '',
         address: '',
         avatar: ''
       };
    }

    return {
      userId: profile.userId,
      fullName: profile.fullName,
      address: profile.address,
      avatar: profile.avatar,
    };
  }
}

module.exports = GetMyProfileUseCase;
