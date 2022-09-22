import fs from 'fs';
import path from 'path';

function getAllFilesFromFolder(dir: string) {
  let results: any = [];
  fs.readdirSync(dir).forEach(function (file: any) {
    file = dir + '/' + file;
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFilesFromFolder(file));
    } else results.push(file);
  });

  return results;
}

function getFullPath(currentDir: string, dir: string) {
  return path.resolve(currentDir, dir);
}

function getFileExtension(file: string) {
  return path.extname(file).toLowerCase();
}

const exportObject = {
  getAllFilesFromFolder,
  getFullPath,
  getFileExtension,
};

export = exportObject;
