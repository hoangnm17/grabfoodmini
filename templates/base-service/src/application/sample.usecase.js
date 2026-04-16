class SampleUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async create(data) {
    return await this.repository.create(data);
  }

  async getAll() {
    return await this.repository.findAll();
  }
}

module.exports = SampleUseCase;