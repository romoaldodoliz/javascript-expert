const { rejects, deepStrictEqual } = require('assert');
const { error } = require('./src/constants');
const File = require('./src/file');

(async () => {
  {
    const filePath = './mocks/empty-file-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = './mocks/four-items-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);
    await rejects(result, rejection);
  }
  {
    Date.prototype.getFullYear = () => 2022;
    const filePath = './mocks/three-items-valid.csv';
    const result = await File.csvToJSON(filePath);
    const expected = [
      {
        id: 123,
        name: 'Erick Wendel',
        profession: 'JavaScript Expert',
        birthDay: 1997,
      },
      {
        id: 321,
        name: 'Xuxa da Silva',
        profession: 'JavaScript Specialist',
        birthDay: 1942,
      },
      {
        id: 231,
        name: 'Joaozinho',
        profession: 'Java Developer',
        birthDay: 1992,
      },
    ];

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
