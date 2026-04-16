const UserProfileModel = require('../db/userProfile.model');
const UserProfile = require('../../domain/UserProfile');

class UserProfileRepository {
  async findByUserId(userId) {
    const profileDoc = await UserProfileModel.findOne({ userId });
    if (!profileDoc) return null;

    return new UserProfile({
      id: profileDoc._id.toString(),
      userId: profileDoc.userId,
      fullName: profileDoc.fullName,
      address: profileDoc.address,
      avatar: profileDoc.avatar,
    });
  }

  async updateByUserId(userId, updateData) {
    const profileDoc = await UserProfileModel.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true, upsert: true }
    );

    return new UserProfile({
      id: profileDoc._id.toString(),
      userId: profileDoc.userId,
      fullName: profileDoc.fullName,
      address: profileDoc.address,
      avatar: profileDoc.avatar,
    });
  }
  
  async findAll() {
    const docs = await UserProfileModel.find();
    return docs.map(doc => new UserProfile({
       id: doc._id.toString(),
       userId: doc.userId,
       fullName: doc.fullName,
       address: doc.address,
       avatar: doc.avatar
    }));
  }
}

module.exports = UserProfileRepository;
