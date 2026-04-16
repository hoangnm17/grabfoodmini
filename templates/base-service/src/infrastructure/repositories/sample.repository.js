const mongoose = require("mongoose");

const SampleSchema = new mongoose.Schema({
  name: String
});

const SampleModel = mongoose.model("Sample", SampleSchema);

class SampleRepository {
  async create(data) {
    return await SampleModel.create(data);
  }

  async findAll() {
    return await SampleModel.find();
  }
}

module.exports = new SampleRepository();