class SampleController {
  constructor(useCase) {
    this.useCase = useCase;
  }

  create = async (req, res) => {
    const result = await this.useCase.create(req.body);
    res.status(201).json(result);
  };

  getAll = async (req, res) => {
    const result = await this.useCase.getAll();
    res.json(result);
  };
}

module.exports = SampleController;