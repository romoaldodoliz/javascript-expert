class Tax {
  static get taxesBasedOnAge() {
    return [
      {
        from: 18,
        to: 25,
        then: 1.1,
      },
      {
        from: 16,
        to: 20,
        then: 1.5,
      },
      {
        from: 31,
        to: 100,
        then: 1.3,
      },
    ];
  }
}

module.exports = Tax;
