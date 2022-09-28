class HomeController {
  index(req, res) {
    res.status(200).json({
      status: 'ok',
    });
  }
}

export default new HomeController();
