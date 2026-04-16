const asyncHandleError = require('../../utils/asyncHandleError');

class UserController {
  constructor(getMyProfileUseCase, updateMyProfileUseCase) {
    this.getMyProfileUseCase = getMyProfileUseCase;
    this.updateMyProfileUseCase = updateMyProfileUseCase;
  }

  getProfile = asyncHandleError(async (req, res) => {
    const profile = await this.getMyProfileUseCase.execute(req.user.id);
    res.status(200).json(profile);
  });

  updateProfile = asyncHandleError(async (req, res) => {
    const profile = await this.updateMyProfileUseCase.execute(req.user.id, req.body);
    res.status(200).json(profile);
  });
}

module.exports = UserController;
